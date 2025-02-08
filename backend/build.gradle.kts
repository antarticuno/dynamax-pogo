// backend/build.gradle.kts

plugins {
    id("org.springframework.boot") version "2.7.8"
    id("io.spring.dependency-management") version "1.0.15.RELEASE"
    kotlin("jvm") version "1.8.0" apply false // For Java-based Spring Boot, Kotlin plugin is applied for other cases
    id("java")
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-test")
    implementation("mysql:mysql-connector-java:8.0.27")
    testImplementation("org.junit.jupiter:junit-jupiter-api:5.7.0")
    testImplementation("org.junit.jupiter:junit-jupiter-engine:5.7.0")
}

springBoot {
    mainClass.set("com.antarticuno.MainApplication") // Replace with your main class path
}

tasks.register<Exec>("buildFrontend") {
    workingDir = file("../frontend")
    commandLine = listOf("npm", "run", "build")
}

tasks.bootJar {
    dependsOn("buildFrontend")
}