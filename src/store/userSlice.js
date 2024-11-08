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
    logout(state) {
      return {
        ...initialState,
      };
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
