// frontend/build.gradle.kts

plugins {
    id("com.github.node-gradle.node") version "3.0.1"
}

node {
    version.set("16.14.0")
    npmVersion.set("8.5.0")
    download.set(true)
}

task("installFrontendDependencies") {
    doLast {
        exec {
            commandLine("npm", "install")
            workingDir = file("frontend")
        }
    }
}

task("buildFrontend") {
    dependsOn("installFrontendDependencies")
    doLast {
        exec {
            commandLine("npm", "run", "build")
        }
    }
}

tasks.register<Exec>("startFrontend") {
    commandLine("npm", "run", "preview")
}
