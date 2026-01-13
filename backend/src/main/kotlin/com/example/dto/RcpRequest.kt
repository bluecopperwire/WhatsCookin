package com.example.dto
import kotlinx.serialization.Serializable

@Serializable
data class RecipeRequest(
	val accID: String,
	val recipeName: String,
  val recipeIngredients: List<String>,
	val recipeSteps: List<String>,
	val recipeImg: String,
	val recipeGenre: String
)