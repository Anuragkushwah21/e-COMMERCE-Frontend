import axios from "axios";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAILURE,
} from "./ActionType";

import { API_BASE_URL } from "../../config/api";

const token = localStorage.getItem("jwt");
// Register action creators
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/signup`,
      // "http://localhost5456/api/auth/signup",
      userData
    );
    const user = response.data;
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    console.log("user data", user);
    dispatch(registerSuccess(user.jwt));
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/signin`,
      userData
    );
    const user = response.data;
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    console.log("login ", user);
    dispatch(loginSuccess(user.jwt));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

//  get user from token
const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const user = response.data;
    dispatch(getUserSuccess(user));
    console.log("req User ", user);
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT, payload: null });
  localStorage.clear();
};

const getAllUserRequest = () => ({ type: GET_ALL_USER_REQUEST });
const getAllUserSuccess = (users) => ({
  type: GET_ALL_USER_SUCCESS,
  payload: users,
});
const getAllUserFailure = (error) => ({
  type: GET_ALL_USER_FAILURE,
  payload: error,
});

export const getAllUser = (jwt) => async (dispatch) => {
  dispatch(getAllUserRequest());
  try {
    const response = await axios.get(`${API_BASE_URL}/api/user/`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const users = response.data;
    dispatch(getAllUserSuccess(users));
    console.log("All Users: ", users);
  } catch (error) {
    dispatch(getAllUserFailure(error.message));
  }
};
