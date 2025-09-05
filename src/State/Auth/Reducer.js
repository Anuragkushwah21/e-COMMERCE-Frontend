import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAILURE,
  LOGOUT,
} from "./ActionType";

const initialState = {
  user: null,
  jwt: localStorage.getItem("jwt") || null,
  isLoading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // 🔹 Common loading
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case GET_ALL_USER_REQUEST:
      return { ...state, isLoading: true, error: null };

    // 🔹 Register
    case REGISTER_SUCCESS:
      return { ...state, isLoading: false };

    // 🔹 Login
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwt: action.payload.token,
        user: action.payload.user || null,
      };

    // 🔹 Get single user
    case GET_USER_SUCCESS:
      return { ...state, isLoading: false, user: action.payload };

    // 🔹 Get all users
    case GET_ALL_USER_SUCCESS:
      return { ...state, isLoading: false, users: action.payload };

    // 🔹 Failures
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case GET_ALL_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    // 🔹 Logout
    case LOGOUT:
      return { ...state, jwt: null, user: null, users: [] };

    default:
      return state;
  }
};

export default authReducer;
