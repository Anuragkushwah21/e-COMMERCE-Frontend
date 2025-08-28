import {
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  ADD_ITEM_TO_CART_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
} from "./ActionType";

const initialState = {
  cartItems: [],
  isLoading: false,
  error: null,
  cart: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get Cart
    case GET_CART_REQUEST:
      return { ...state, isLoading: true, error: null };
    case GET_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cartItems: action.payload.cartItems,
        cart: action.payload,
      };
    case GET_CART_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    // Add Item
    case ADD_ITEM_TO_CART_REQUEST:
      return { ...state, isLoading: true, error: null };
    case ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cartItems: [...state.cartItems, action.payload.cartItems],
      };
    case ADD_ITEM_TO_CART_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    // Update Item
    case UPDATE_CART_ITEM_REQUEST:
      return { ...state, isLoading: true, error: null };
    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updateCartItem: action.payload,
        // cartItems: state.cartItems.map((item) =>
        //   item._id === action.payload._id ? action.payload : item
        // ),
      };
    case UPDATE_CART_ITEM_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    // Remove Item
    case REMOVE_CART_ITEM_REQUEST:
      return { ...state, isLoading: true, error: null };
    case REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteCartItem: action.payload,
        // cartItems: state.cartItems.filter((item) => item._id !== action.payload),
      };
    case REMOVE_CART_ITEM_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export default cartReducer;
