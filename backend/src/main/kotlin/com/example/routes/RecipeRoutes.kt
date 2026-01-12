package com.example.routes

import com.example.dto.RecipeRequest
import com.example.repository.RecipeRepository
import io.ktor.server.routing.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.http.*
import io.ktor.server.sessions.*

fun Route.recipeRoutes {
  val recRepository = RecipeRepository()

  post {
    val req = call.receive<RecipeRequest>()

    recRepository.addRecipe(
      req.recipeName, 
      req.accID, 
      req.recipeIngredients.joinToString(","), 
      req.recipeSteps.joinToString("."), 
      req.recipeImg, 
      req.recipeGenre,
    )

    call.respond(HttpStatusCode.Created, "Recipe added successfully")
  }

  // url looks like  GET /recipes/{id}
  get("{id}") {
    val recipeID = call.request.queryParameters["id"]

    if (recipeID == null) {
        call.respond(HttpStatusCode.BadRequest, "Missing recipeID")
        return@get
    }

    val recipe = recRepository.getRecipeByID(recipeID)
    if (recipe == null) {
        call.respond(HttpStatusCode.NotFound, "Recipe not found")
    } else {
        call.respond(recipe)
    }
  }

  // url looks like  GET /recipes?ingredients=tomato,onion
  get {
    val ingrs = call.request.queryParameters["ingredients"].toString().split(",")
    if (ingrs.isEmpty()) {
      call.respond(HttpStatusCode.BadRequest, "Missing ingredients")
      return@get
    }

    val recipes = recRepository.getRecipesByIngredients(ingrs)
    if (recipes.isEmpty()) {
      call.respond(HttpStatusCode.NotFound, "No Recipes with such ingredients!")
    } else {
      call.respond(recipes)
    }
  }

}