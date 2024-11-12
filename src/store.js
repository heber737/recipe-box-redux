import { configureStore } from '@reduxjs/toolkit'
import currentRecipeReducer from './features/current-recipe/currentRecipeSlice.js'

export const store = configureStore({
  reducer: {
    currentRecipe: currentRecipeReducer,
  },
})