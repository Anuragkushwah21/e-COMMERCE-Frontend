import { api } from "../../config/api"; // ✅ adjust path if different
import {
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_FAILURE,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAILURE,
} from "./ActionType"; // ✅ make sure you have these constants

// 🔥 Thunk Action
export const createPayment = (orderId) => async (dispatch) => {
  dispatch({ type: CREATE_PAYMENT_REQUEST });
  try {
    const { data } = await api.post(`/api/payments/${orderId}`, {});

    if (data.payment_link_url) {
      // ✅ Success
      dispatch({ type: CREATE_PAYMENT_SUCCESS, payload: data });

      // Redirect user to Razorpay hosted payment link
      window.location.href = data.payment_link_url;
    } else {
      // In case API responds but no payment link
      dispatch({
        type: CREATE_PAYMENT_FAILURE,
        payload: "Payment link not received from server",
      });
    }
  } catch (error) {
    dispatch({
      type: CREATE_PAYMENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updatePayment = (paymentId, updateData) => async (dispatch) => {
  dispatch({ type: UPDATE_PAYMENT_REQUEST });
  try {
    const { data } = await api.put(`/api/payments/${paymentId}`, updateData);

    dispatch({
      type: UPDATE_PAYMENT_SUCCESS,
      payload: data,
    });

    console.log("Payment updated:", data);
  } catch (error) {
    dispatch({
      type: UPDATE_PAYMENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
