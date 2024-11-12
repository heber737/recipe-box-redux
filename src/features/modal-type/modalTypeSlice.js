import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const modalTypeSlice = createSlice({
  name: "modal-type",
  initialState,
  reducers: {
    setToAdd: (state) => {
      state.value = "add";
    },
    setToEdit: (state) => {
      state.value = "edit";
    },
  },
});

export const { setToAdd, setToEdit } = modalTypeSlice.actions;

export default modalTypeSlice.reducer;
