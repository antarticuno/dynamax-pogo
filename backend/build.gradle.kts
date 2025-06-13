// backend/build.gradle.kts

plugins {
    id("org.springframework.boot") version "2.7.8"
    id("io.spring.dependency-management") version "1.0.15.RELEASE"
    kotlin("jvm") version "1.8.0" apply false // For Java-based Spring Boot, Kotlin plugin is applied for other cases
    id("java")
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(11)) // or any desired version
    }
}

repositories {
    mavenCentral()
}

dependencies {
    compileOnly("org.projectlombok:lombok:1.18.36")
    implementation("org.json:json:20250107")
    implementation("org.apache.commons:commons-collections4:4.4")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-test")
    implementation("org.apache.commons:commons-lang3:3.17.0")
    implementation("mysql:mysql-connector-java:8.0.27")
    annotationProcessor("org.projectlombok:lombok:1.18.36")
    testCompileOnly("org.projectlombok:lombok:1.18.36")
    testAnnotationProcessor("org.projectlombok:lombok:1.18.36")
    testImplementation("org.junit.jupiter:junit-jupiter-api:5.7.0")
    testImplementation("org.junit.jupiter:junit-jupiter-engine:5.7.0")
}

springBoot {
    mainClass.set("com.antarticuno.dmax.MainApplication") // Replace with your main class path
}
