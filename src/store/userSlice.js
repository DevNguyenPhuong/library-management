import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  authenticated: false,
  id: "",
  username: "",
  name: "",
  phone: "",
  dob: "",
  gender: "",
  roles: [],
  expiresIn: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearData(state) {
      return {
        ...initialState,
      };
    },
  },
});

export const { setUser, clearData } = userSlice.actions;

export default userSlice.reducer;
