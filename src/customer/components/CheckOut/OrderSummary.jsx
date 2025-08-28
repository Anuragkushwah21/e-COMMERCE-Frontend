import React, { useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import CartItems from "../Cart/CartItems";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getOrderById } from "../../../State/Order/Action";
import { createPayment } from "../../../State/Payment/Action";

function OrderSummary() {
  const dispatch = useDispatch();
  const location = useLocation();
  const order = useSelector((store) => store.order.order);
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [orderId]);

  const handleCheckout = () => {
    dispatch(createPayment(orderId));
  };

  if (!order) {
    return (
      <div className="p-6 text-center text-gray-600 font-medium">
        Loading order summary...
      </div>
    );
  }

  return (
    <>
      {/* Address Section */}
      <div className="p-5 shadow-lg rounded-md border mb-4 bg-white">
        <AddressCard address={order?.shippingAddress} />
      </div>

      {/* Main Layout */}
      <div className="lg:grid grid-cols-3 gap-4 m-1">
        {/* Left: Cart Items */}
        <div className="col-span-2 space-y-4">
          {order?.orderItems?.map((item) => (
            <CartItems key={item._id} item={item} />
          ))}
        </div>

        {/* Right: Price Summary */}
        <div className="px-4 lg:pl-8 sticky top-4">
          <div className="border rounded-lg p-5 shadow-sm bg-white">
            <p className="uppercase font-bold opacity-70 pb-4">Price Details</p>
            <hr />

            <div className="space-y-3 font-semibold text-sm">
              <div className="flex justify-between pt-3 text-black">
                <span>Price ({order.totalItem})</span>
                <span>₹{order.totalPrice.toLocaleString()}</span>
              </div>

              <div className="flex justify-between pt-3 text-black">
                <span>Discount</span>
                <span className="text-green-600">
                  -₹{order.discount.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between pt-3 text-black">
                <span>Delivery Charges</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between pt-3 text-black text-base">
                <span className="font-bold">Total Amount</span>
                <span className="font-bold">
                  ₹{order.totalDiscountedPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <hr className="my-4" />

            <p className="text-green-600 text-xs pb-4">
              You will save ₹{order.discount.toLocaleString()} on this order
            </p>

            <button
              type="submit"
              disabled={!order}
              onClick={handleCheckout}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md text-sm font-semibold transition duration-300 disabled:opacity-50"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderSummary;
