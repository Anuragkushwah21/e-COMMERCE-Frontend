import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  //   GET_ORDER_HISTORY_REQUEST,
  //   GET_ORDER_HISTORY_SUCCESS,
  //   GET_ORDER_HISTORY_FAILURE,
} from "./ActionType";

const initialState = {
  order: null,
  orders: [],
  //   orderHistory: [],
  isLoading: false,
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    // Create Order
    case CREATE_ORDER_REQUEST:
      return { ...state, isLoading: true, error: null };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        order: action.payload,
      };
    case CREATE_ORDER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    // Get Order By ID
    case GET_ORDER_BY_ID_REQUEST:
      return { ...state, isLoading: true, error: null };
    case GET_ORDER_BY_ID_SUCCESS:
      return { ...state, isLoading: false, order: action.payload };
    case GET_ORDER_BY_ID_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    // // Get Order History
    // case GET_ORDER_HISTORY_REQUEST:
    //   return { ...state, isLoading: true, error: null };
    // case GET_ORDER_HISTORY_SUCCESS:
    //   return { ...state, isLoading: false, orderHistory: action.payload };
    // case GET_ORDER_HISTORY_FAILURE:
    //   return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export default orderReducer;
