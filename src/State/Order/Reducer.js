import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAILURE,
} from "./ActionType";

const initialState = {
  order: null,        // single order (details)
  orders: [],         // list of orders (user orders)
  isLoading: false,
  error: null,
  success: false,     // for create order success flag
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    // ---------------- CREATE ORDER ----------------
    case CREATE_ORDER_REQUEST:
      return { ...state, isLoading: true, error: null, success: false };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        order: action.payload,
      };

    case CREATE_ORDER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    // ---------------- GET ORDER BY ID ----------------
    case GET_ORDER_BY_ID_REQUEST:
      return { ...state, isLoading: true, error: null };

    case GET_ORDER_BY_ID_SUCCESS:
      return { ...state, isLoading: false, order: action.payload };

    case GET_ORDER_BY_ID_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    // ---------------- GET USER ORDERS ----------------
    case GET_USER_ORDERS_REQUEST:
      return { ...state, isLoading: true, error: null };

    case GET_USER_ORDERS_SUCCESS:
      return { ...state, isLoading: false, orders: action.payload };

    case GET_USER_ORDERS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export default orderReducer;
