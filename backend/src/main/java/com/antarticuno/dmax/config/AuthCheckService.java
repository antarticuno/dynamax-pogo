package com.antarticuno.dmax.config;

import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

/**
 * Service to perform the auth check before an annotated method.
 */
@Aspect
@Component
@Log4j2
public class AuthCheckService {

    // The auth token to use - can rotate and needs to be established via the environment variable
    @Value("${AUTH_TOKEN}")
    protected String serverToken;

    // The request containing the body, headers, etc.
    @Autowired
    private HttpServletRequest request;

    // This will intercept methods with the @AuthCheck annotation
    @Before("@annotation(AuthCheck)")
    public void checkAuth() {
        // Access the "Authorization" header
        final String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new SecurityException("Missing or invalid Authorization header");
        }

        final String token = authorizationHeader.substring(7); // Extract the token (after "Bearer ")
        if (StringUtils.isBlank(token) || !token.equals(serverToken)) {
            log.info(String.format("Invalid attempt with token: %s", token));
            throw new SecurityException("Invalid token received.");
        }
    }
}
