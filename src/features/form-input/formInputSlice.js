import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  ingredients: "",
  steps: "",
};

export const formInputSlice = createSlice({
  name: "form-input",
  initialState,
  reducers: {
    inputReset: (state) => {
      state.name = "";
      state.ingredients = "";
      state.steps = "";
    },
    updateAll: (state, action) => {
        state.name = action.payload.name;
        state.ingredients = action.payload.ingredients;
        state.steps = action.payload.steps;
      },
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
    updateSteps: (state, action) => {
      state.steps = action.payload;
    },
  },
});

export const { inputReset, updateAll, updateName, updateIngredients, updateSteps } =
  formInputSlice.actions;

export default formInputSlice.reducer;
