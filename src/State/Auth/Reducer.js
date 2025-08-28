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
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return { ...state, isLoading: true, error: null };

    case REGISTER_SUCCESS:
      return { ...state, isLoading: false };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwt: action.payload.token,
        user: action.payload.user || null,
      };

    case GET_USER_SUCCESS:
      return { ...state, isLoading: false, user: action.payload };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case LOGOUT:
      return { ...state, jwt: null, user: null };

    default:
      return state;
  }
};

export default authReducer;
