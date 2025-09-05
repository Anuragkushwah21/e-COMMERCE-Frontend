import {
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  DELETE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_SUCCESS,
} from "./ActionType";

const initialState = {
  products: [],
  product: null,
  isLoading: false,
  error: null,
  
};

const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_PRODUCTS_REQUEST:
    case FIND_PRODUCT_BY_ID_REQUEST:
      return { ...state, isLoading: true, error: null };

    case FIND_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        products: action.payload,
      };
    case FIND_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        product: action.payload,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        deleteProduct:action.payload,
      };
      case CREATE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          products: [...state.products, action.payload],
        };

    case FIND_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: null,
        product: action.payload,
      };
    case FIND_PRODUCT_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: null,
        product: action.payload,
      };

    default:
      return state;
  }
};

export default customerProductReducer;
