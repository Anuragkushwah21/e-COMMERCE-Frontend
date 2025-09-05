import {
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
} from "./ActionType";
import { api } from "../../config/api";

export const findProducts =
  (reqData = {}) =>
  async (dispatch) => {
    dispatch({ type: FIND_PRODUCTS_REQUEST });

    const {
      colors,
      sizes,
      minPrice,
      maxPrice,
      minDiscount,
      category,
      stock,
      sort,
      pageNumber,
      pageSize,
    } = reqData;

    try {
      const queryParams = new URLSearchParams();

      if (Array.isArray(colors)) {
        colors.forEach((color) => queryParams.append("color", color));
      } else if (colors) queryParams.append("color", colors);

      if (Array.isArray(sizes)) {
        sizes.forEach((size) => queryParams.append("size", size));
      } else if (sizes) queryParams.append("size", sizes);

      if (minPrice) queryParams.append("minPrice", minPrice);
      if (maxPrice) queryParams.append("maxPrice", maxPrice);
      if (minDiscount) queryParams.append("minDiscount", minDiscount);
      if (category) queryParams.append("category", category);
      if (stock) queryParams.append("stock", stock);
      if (sort) queryParams.append("sort", sort);
      if (pageNumber) queryParams.append("pageNumber", pageNumber);
      if (pageSize) queryParams.append("pageSize", pageSize);

      const { data } = await api.get(`/api/products?${queryParams.toString()}`);
      console.log("✅ products data", data);

      dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data?.data ?? [] });
    } catch (error) {
      console.error("❌ FIND_PRODUCTS_ERROR", error);
      dispatch({
        type: FIND_PRODUCTS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const findProductById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  const { productId } = reqData;
  try {
    const { data } = await api.get(`/api/products/id/${productId}`);
    console.log("✅ Product detail", data.data);
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data?.data ?? [] });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCT_BY_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
// ✅ Fixed createProduct Action
export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    // remove .data, send the product object directly
    const { data } = await api.post(
      `/api/admin/products/`,
      product.data
    );

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });

    console.log("✅ Product created successfully:", data);
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAILURE,
      payload:
        error.response?.data?.message || error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  console.log("delete product action", productId);
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await api.delete(`/api/admin/products/${productId}`);

    console.log("delete product ", data);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: productId,
    });

    console.log("product delete ", data);
  } catch (error) {
    console.log("catch error ", error);
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
