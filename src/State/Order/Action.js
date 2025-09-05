import { api } from "../../config/api"; // Your Axios instance

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

// -------------------- CREATE ORDER --------------------
export const createOrder = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });

  try {
    const { data } = await api.post(`/api/orders/`, reqData.address);

    if (data._id) {
      reqData.navigate({ search: `step=3&order_id=${data._id}` });
      console.log("Order ID:", data._id);
    }

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    console.log("✅ Order Created Successfully:", data);
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// -------------------- GET ORDER BY ID --------------------
export const getOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/orders/${orderId}`);
    console.log("✅ Order Fetched by ID:", data);
    dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ORDER_BY_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// -------------------- GET USER ORDERS --------------------
const getUserOrdersRequest = () => ({ type: GET_USER_ORDERS_REQUEST });
const getUserOrdersSuccess = (orders) => ({
  type: GET_USER_ORDERS_SUCCESS,
  payload: orders,
});
const getUserOrdersFailure = (error) => ({
  type: GET_USER_ORDERS_FAILURE,
  payload: error,
});

export const getUserOrders = (userId, jwt) => async (dispatch) => {
  dispatch(getUserOrdersRequest());
  try {
    const { data } = await api.get(`/api/orders/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log("✅ User Orders:", data);
    dispatch(getUserOrdersSuccess(data));
  } catch (error) {
    dispatch(
      getUserOrdersFailure(error.response?.data?.message || error.message)
    );
  }
};
