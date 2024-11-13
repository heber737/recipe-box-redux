import { createSlice } from "@reduxjs/toolkit";
import initialRecipes from "../../initial-recipes";
import { storageAvailable } from "../../functions.js";

// LOCAL STORAGE AVAILABILITY TEST

if (
  storageAvailable("localStorage") &&
  !localStorage.getItem("storedRecipes")
) {
  localStorage.setItem("storedRecipes", JSON.stringify(initialRecipes));
}

const initialState = {
  recipes: JSON.parse(localStorage.getItem("storedRecipes")),
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.recipes = [...state.recipes, action.payload];
    },
    editRecipe: (state, action) => {
      state.recipes = state.recipes.toSpliced(
        action.payload.currentRecipe,
        1,
        action.payload.formInput
      );
    },
    deleteRecipe: (state, action) => {
      state.recipes = state.recipes.toSpliced(action.payload, 1);
    },
  },
});

export const { addRecipe, editRecipe, deleteRecipe } = recipesSlice.actions;

export default recipesSlice.reducer;
