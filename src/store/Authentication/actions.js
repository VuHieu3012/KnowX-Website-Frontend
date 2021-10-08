/* eslint-disable import/prefer-default-export */
import * as types from "./constants";

export const postLogin = (username, password) => ({
  type: types.LOGIN,
  payload: {
    username,
    password,
  },
});
export const loginSuccess = (data) => ({
  type: types.LOGIN_SUCCESS,
  payload: data,
});
export const loginFailed = (error) => ({
  type: types.LOGIN_FAILED,
  payload: error,
});
export const setLogged = (data) => ({
  type: types.SET_LOGGED,
  payload: data,
});
