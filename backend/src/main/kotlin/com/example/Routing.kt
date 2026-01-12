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
            get { 
                // return all recipes
            }
            post { 
                // add new recipe
            }
            get("/{id}") { 
                // get recipe by id
            }
        }
        
        route("/ratings") {
            post {
                // add rating
            }
        }

        route("/images") {
            post {
                // upload image
            }
        }

        route("/collections") {
            post {
                // add recipe to collection
            }
        }
    }
}

