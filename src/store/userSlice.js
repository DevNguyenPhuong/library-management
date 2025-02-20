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
  cartItems: null,
  shoppingSessionId: "",
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
    setCartItems(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setUser, clearData, setCartItems } = userSlice.actions;

export default userSlice.reducer;
