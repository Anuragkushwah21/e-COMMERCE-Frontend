import {
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
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
  const {productId}=reqData
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
