package com.example

import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import com.example.model.HealthResponse
import com.example.routes.*

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("Hello World!")
        }

        get("/health") {
            call.respond(
                HealthResponse(
                    status = "OK",
                    service = "ktor-backend"
                )
            )
        }

        //login signup routes
        authRoutes()
        route("/users") {
            post { 
                // user registration
            }
            get("/{id}") { 
                // get user by id
            }
        }

        route("/recipes") {
            recipeRoutes()
        }
        
        route("/ratings") {
            post {
                // add rating
            }
        }

        //images
        imageRoutes()

        route("/collections") {
            post {
                // add recipe to collection
            }
        }
    }
}

