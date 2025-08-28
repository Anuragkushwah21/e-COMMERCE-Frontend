import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import StarBorderIcon from "@mui/icons-material/StarBorder"; // Optional: Replace with your preferred icon lib

function OrderDetails() {
  return (
    <div className="px-5 lg:px-20 py-6 lg:py-10 space-y-10 ">
      {/* Delivery Address Section */}
      <div className="bg-white rounded-md shadow p-6 lg:p-10">
        <h1 className="font-bold text-xl lg:text-2xl pb-6 border-b">
          Delivery Address
        </h1>
        <AddressCard />
      </div>

      {/* Order Tracker Section */}
      <div>
        <OrderTracker activeStep={3} />
      </div>

      <div className="shadow border px-4 py-2 space-y-4">
        {[1, 1, 1, 1, 1].map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center shadow border"
          >
            {/* Product Info (Image + Text) */}
            <div className="md:col-span-10 flex gap-4 ">
              <img
                src="https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/g/6/k/m-sksh-dt1105-pcbl-fubar-original-imafux247zhqym2z-bb.jpeg?q=70"
                alt="product"
                className="w-16 h-20 object-cover rounded"
              />
              <div>
                <p className="font-medium text-gray-800">
                  Men Slim Mid Rise Black Jeans
                </p>
                <div className="text-sm text-gray-600 space-x-4">
                  <span>Color: Pink</span>
                  <span>Size: M</span>
                </div>
                <p className="text-sm text-gray-500">Seller: Linaria</p>
                <p className="font-semibold">₹1099</p>
              </div>
            </div>

            {/* Rate & Review Button */}
            <div className="md:col-span-2 flex justify-end items-center lg:mr-2">
              <div className="text-purple-600 text-sm flex items-center gap-1 cursor-pointer hover:underline">
                <StarBorderIcon fontSize="small" />
                <span>Rate & Review Product</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderDetails;
