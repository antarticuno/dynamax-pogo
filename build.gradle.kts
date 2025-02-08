// Root build.gradle.kts

plugins {
    id("org.springframework.boot") version "2.7.8"
    id("io.spring.dependency-management") version "1.0.15.RELEASE"
    id("com.github.node-gradle.node") version "3.0.1"  // For managing React build
}

repositories {
    mavenCentral()
}

subprojects {
    group = "com.antarticuno"
    version = "0.0.1-SNAPSHOT"

    repositories {
        mavenCentral()
    }
}

tasks.register<Delete>("delete") {
    delete(rootProject.buildDir)
}