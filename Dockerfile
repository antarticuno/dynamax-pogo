# Stage 1: Build React frontend
FROM node:20 AS frontend-builder
WORKDIR /app
COPY frontend/ ./frontend/
WORKDIR /app/frontend
RUN npm install && npm run build

# Stage 2: Build Spring Boot backend (with React build included)
FROM gradle:8.7-jdk11 AS backend-builder
WORKDIR /app
COPY backend/ ./backend/
COPY --from=frontend-builder /app/frontend/dist ./backend/src/main/resources/static/
WORKDIR /app/backend
RUN gradle bootJar

# Stage 3: Final runtime image using Java 11
FROM eclipse-temurin:11-jre
WORKDIR /app
COPY --from=backend-builder /app/backend/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
