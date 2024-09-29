import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    exampleReducer(state, action) {
      return {
        ...state,
      };
    },
  },
});

export const { exampleReducer } = userSlice.actions;

export default userSlice.reducer;
