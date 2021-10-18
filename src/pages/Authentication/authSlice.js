/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
/* eslint-disable no-empty-pattern */
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: "",
    email: "",
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.username = action.payload;
    },
    loginFailed: (state, action) => {
      state.username = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.user = null;
    },
    logoutFailed: (state, action) => {
      state.user = null;
    },
  },
});

const { actions, reducer } = authSlice;
export const { loginSuccess, logoutSuccess } = actions;
export default reducer;
