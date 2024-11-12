import { configureStore } from '@reduxjs/toolkit'
import currentRecipeReducer from './features/current-recipe/currentRecipeSlice.js'
import modalTypeReducer from './features/modal-type/modalTypeSlice.js'

export const store = configureStore({
  reducer: {
    currentRecipe: currentRecipeReducer,
    modalType: modalTypeReducer,
  },
})