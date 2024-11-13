import { configureStore } from "@reduxjs/toolkit";
import currentRecipeReducer from "./features/current-recipe/currentRecipeSlice.js";
import modalTypeReducer from "./features/modal-type/modalTypeSlice.js";
import formInputSlice from "./features/form-input/formInputSlice.js";
import recipesSlice from "./features/recipes/recipesSlice.js";

export const store = configureStore({
  reducer: {
    currentRecipe: currentRecipeReducer,
    modalType: modalTypeReducer,
    formInput: formInputSlice,
    recipes: recipesSlice,
  },
});
