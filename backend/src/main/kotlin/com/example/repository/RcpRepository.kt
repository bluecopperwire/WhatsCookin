package com.example.repository

import com.example.db.RecipeTable
import com.example.dto.RecipeResponse
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import java.util.UUID

class RecipeRepository {

  fun addRecipe(
    recipeName: String,
    accID: String,
    recipeIngredients: String,
    recipeSteps: String,
    recipeImg: String,
    recipeGenre: String
  ) {
    transaction {
    RecipeTable.insert {
        it[RecipeTable.recipeID] = "rcp-"+ UUID.randomUUID().toString().take(6)
        it[RecipeTable.accID] = accID
        it[RecipeTable.recipeName] = recipeName
        it[RecipeTable.recipeIngredients] = recipeIngredients
        it[RecipeTable.recipeSteps] = recipeSteps
        it[RecipeTable.recipeImg] = recipeImg
        it[RecipeTable.recipeGenre] = recipeGenre
      }
    }
  }

  fun getRecipesByIngredients(
      recipeIngredients: List<String>
  ): List<RecipeResponse> {
      if (recipeIngredients.isEmpty()) return emptyList()

      return transaction {
          RecipeTable
              .selectAll()
              .mapNotNull { row ->
                  val dbIngredients = row[RecipeTable.recipeIngredients]
                      .lowercase()
                      .split(",")
                      .map { it.trim() }

                  val matchesAll = recipeIngredients.all { ingredient ->
                      dbIngredients.contains(ingredient.lowercase().trim())
                  }

                  if (matchesAll) {
                      RecipeResponse(
                          recipeID = row[RecipeTable.recipeID] ?: "",
                          accID = row[RecipeTable.accID],
                          recipeName = row[RecipeTable.recipeName],
                          recipeIngredients = dbIngredients,
                          recipeSteps = row[RecipeTable.recipeSteps]
                              .split("\n")
                              .map { it.trim() },
                          recipeImg = row[RecipeTable.recipeImg] ?: "",
                          recipeGenere = row[RecipeTable.recipeGenre] ?: ""
                      )
                  } else {
                      null
                  }
              }
      }
  }

  fun getRecipeByID(
      recipeID: String,
  ): RecipeResponse? {
      return transaction {
          RecipeTable
              .select { 
                  (RecipeTable.recipeID eq recipeID) 
              }
              .mapNotNull { row ->
                  RecipeResponse(
                      recipeID = row[RecipeTable.recipeID] ?: "",
                      accID = row[RecipeTable.accID],
                      recipeName = row[RecipeTable.recipeName],
                      recipeIngredients = row[RecipeTable.recipeIngredients]
                          .split(",")
                          .map { it.trim() },
                      recipeSteps = row[RecipeTable.recipeSteps]
                          .split("\n")
                          .map { it.trim() },
                      recipeImg = row[RecipeTable.recipeImg] ?: "",
                      recipeGenere = row[RecipeTable.recipeGenre] ?: ""
                  )
              }
              .firstOrNull()
      }
  }


}