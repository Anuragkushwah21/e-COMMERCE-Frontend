import React, { useEffect } from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../../State/Order/Action";

function OrderCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jwt = localStorage.getItem("jwt");
  const user = useSelector((store) => store.auth.user); // assuming you keep logged-in user in auth reducer
  const { orders, isLoading, error } = useSelector((store) => store.order);

  useEffect(() => {
    if (user?._id && jwt) {
      dispatch(getUserOrders(user._id, jwt));
    }
  }, [dispatch, user, jwt]);

  const handleOrderDetails = (orderId) => {
    navigate(`/account/order/${orderId}`);
  };

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col gap-6 p-6 rounded border">
      {orders?.length > 0 ? (
        orders.map((order) => (
          <div
            key={order._id}
            onClick={() => handleOrderDetails(order._id)}
            className="bg-white rounded flex flex-col md:flex-row items-center md:items-start p-4 gap-4 shadow-lg hover:shadow-2xl cursor-pointer"
          >
            {/* Show first product image from order */}
            <img
              alt={order?.orderItems?.[0]?.product?.title || "Product"}
              src={order?.orderItems?.[0]?.product?.imageUrl}
              className="w-24 h-24 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-base">
                {order?.orderItems?.[0]?.product?.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {order?.orderItems?.length} item(s)
              </p>
            </div>

            <p className="font-semibold">₹{order.totalPrice}</p>

            <Grid item xs={4}>
              {order.status === "Delivered" ? (
                <div className="flex items-start gap-2 text-sm">
                  <AdjustIcon sx={{ width: "15px", color: "#22c55e" }} />
                  <div>
                    <p className="font-medium text-gray-800">
                      Delivered on {new Date(order.deliveredAt).toDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Your item has been delivered
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-800">
                  <span className="font-medium">
                    Expected Delivery on{" "}
                    {new Date(order.expectedDelivery).toDateString()}
                  </span>
                </div>
              )}
            </Grid>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default OrderCard;
