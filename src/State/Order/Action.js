import { api } from "../../config/api"; // Your Axios instance

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

// Create Order
export const createOrder = (reqData) => async (dispatch) => {
  // console.log("req data",reqData);
  dispatch({ type: CREATE_ORDER_REQUEST });

  try {
    const { data } = await api.post(`/api/orders/`, reqData.address); // ✅ send full data

    if (data._id) {
      reqData.navigate({ search: `step=3&order_id=${data._id}` });
      console.log("orderId",data._id);
    }
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    console.log("Order Created Successfully:", data);
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error.response?.data?.message || error.message, // ✅ better error handling
    });
  }
};

// Get Order By ID
export const getOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/orders/${orderId}`);
    console.log("Order Fetched Details by ID:", data);
    dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_ORDER_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};

// Get Order History for User
// export const getOrderHistory = () => async (dispatch) => {
//   dispatch({ type: GET_ORDER_HISTORY_REQUEST });
//   try {
//     const { data } = await api.get("/api/orders/history");
//     dispatch({ type: GET_ORDER_HISTORY_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: GET_ORDER_HISTORY_FAILURE,
//       payload: error.response?.data?.message || error.message,
//     });
//   }
// };
