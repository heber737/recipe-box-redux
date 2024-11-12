import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  index: 0,
}

export const currentRecipeSlice = createSlice({
    name: 'current-recipe',
    initialState,
    reducers: {
      reset: (state) => {
        state.index = 0;
      },
      decrement: (state) => {
        state.index -= 1
      },
      selectRecipe: (state, action) => {
        state.index = action.payload
      }
    },
  })


export const { reset, decrement, selectRecipe } = currentRecipeSlice.actions

export default currentRecipeSlice.reducer