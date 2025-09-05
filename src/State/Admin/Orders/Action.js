import { api } from "../../../config/api";
import {
  CONFIRMED_ORDER_FAILURE,
  CONFIRMED_ORDER_REQUEST,
  CONFIRMED_ORDER_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  SHIP_ORDER_REQUEST,
  SHIP_ORDER_SUCCESS,
  SHIP_ORDER_FAILURE,
  DELIVERED_ORDER_REQUEST,
  DELIVERED_ORDER_SUCCESS,
  DELIVERED_ORDER_FAILURE,
  CANCELED_ORDER_REQUEST,
  CANCELED_ORDER_SUCCESS,
  CANCELED_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
} from "./ActionType";

// ----------------- GET ALL ORDERS -----------------
export const getOrders = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ORDERS_REQUEST });
    try {
      const { data } = await api.get(`/api/admin/orders/`);
      console.log("get all orders ", data);
      dispatch({ type: GET_ORDERS_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error ", error);
      dispatch({
        type: GET_ORDERS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

// ----------------- CONFIRM ORDER -----------------
export const confirmOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CONFIRMED_ORDER_REQUEST });
  try {
    const { data } = await api.put(`/api/admin/orders/${orderId}/confirmed`);
    console.log("confirm_order ", data);
    dispatch({ type: CONFIRMED_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONFIRMED_ORDER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ----------------- SHIP ORDER -----------------
export const shipOrder = (orderId) => async (dispatch) => {
  dispatch({ type: SHIP_ORDER_REQUEST });
  try {
    const { data } = await api.put(`/api/admin/orders/${orderId}/ship`);
    console.log("shipped order", data);
    dispatch({ type: SHIP_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SHIP_ORDER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ----------------- DELIVERED ORDER -----------------
export const deliveredOrder = (orderId) => async (dispatch) => {
  dispatch({ type: DELIVERED_ORDER_REQUEST });
  try {
    const { data } = await api.put(`/api/admin/orders/${orderId}/deliver`);
    console.log("delivered order ", data);
    dispatch({ type: DELIVERED_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELIVERED_ORDER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ----------------- CANCEL ORDER -----------------
export const cancelOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CANCELED_ORDER_REQUEST });
  try {
    const { data } = await api.put(`/api/admin/orders/${orderId}/cancel`);
    console.log("canceled order ", data);
    dispatch({ type: CANCELED_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CANCELED_ORDER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ----------------- DELETE ORDER -----------------
export const deleteOrder = (orderId) => async (dispatch) => {
  dispatch({ type: DELETE_ORDER_REQUEST });
  try {
    const { data } = await api.delete(`/api/admin/orders/${orderId}/delete`);
    console.log("delete order ", data);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: orderId });
  } catch (error) {
    console.log("catch error ", error);
    dispatch({
      type: DELETE_ORDER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
