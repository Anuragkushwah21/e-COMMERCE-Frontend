import React, { useEffect } from "react";
import CartItems from "./CartItems";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getCart());
  }, [cart.updateCartItem, cart.deleteCartItem]);

  const handleCheckOut = () => {
    navigate("/checkout?step=2");
  };

  const cartData = cart?.cart || {};
  const cartItems = cartData.cartItems || [];

  const {
    totalItem = 0,
    totalPrice = 0,
    discount = 0,
    totalDiscountedPrice = 0,
  } = cartData;

  return (
    <div>
      <div className="lg:grid grid-cols-3 lg:px-16 relative m-1">
        {/* Left Section */}
        <div className="col-span-2">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => <CartItems key={item._id} item={item} />)
          )}
        </div>

        {/* Right Section */}
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="border rounded-md p-5 shadow-sm">
            <p className="uppercase font-bold opacity-70 pb-4">
              Price Details
            </p>
            <hr />

            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black">
                <span>Price ({totalItem} items)</span>
                <span>₹{totalPrice}</span>
              </div>

              <div className="flex justify-between pt-3 text-black">
                <span>Discount</span>
                <span className="text-green-600">-₹{discount}</span>
              </div>

              <div className="flex justify-between pt-3 text-black">
                <span>Delivery Charges</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between pt-3 text-black font-bold">
                <span>Total Amount</span>
                <span>₹{totalDiscountedPrice}</span>
              </div>
            </div>

            <hr className="my-3" />

            <p className="text-green-600 text-sm pb-4">
              You will save ₹{discount} on this order
            </p>

            {/* Checkout Button */}
            <button
              onClick={handleCheckOut}
              disabled={cartItems.length === 0}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md text-sm font-semibold transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
