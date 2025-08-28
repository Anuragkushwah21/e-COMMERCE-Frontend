import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

function OrderCard() {
  const orders = [
    {
      id: 1,
      image:
        "https://rukminim1.flixcart.com/image/612/612/l5h2xe80/kurta/x/6/n/xl-kast-tile-green-majestic-man-original-imagg4z33hu4kzpv.jpeg?q=70", // replace with actual image path
      title: "Men Slim Mid Rise Black Jeans",
      size: "M",
      price: 1099,
      deliveryDate: "Mar 03",
      status: "Delivered",
    },
    {
      id: 2,
      image:
        "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/l/f/r/xl-k-spl668-yellow-sg-leman-original-imagznqcrahgq9rf.jpeg?q=70",
      title: "Women Bodycon Yellow Dress",
      size: "M",
      price: 499,
      deliveryDate: "Mar 03",
      status: "Delivered",
    },
    {
      id: 3,
      image:
        "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/g/6/k/m-sksh-dt1105-pcbl-fubar-original-imafux247zhqym2z-bb.jpeg?q=70",
      title: "Women Skater Yellow Dress",
      size: "M",
      price: 1099,
      deliveryDate: "Mar 03",
      status: "Delivered",
    },
  ];
const navigate=useNavigate()
  const handleOrderDetails=(orderId)=>{
    navigate(`/account/order/${orderId}`)
  }
  return (
    <>
      <div onClick={handleOrderDetails} className="flex flex-col lg:flex-row gap-6 p-6 rounded border ">
        <div className="flex-1 space-y-4 ">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded flex flex-col md:flex-row items-center md:items-start p-4 gap-4 shadow-lg hover:shadow-2xl"
            >
              <img
                src={order.image}
                alt={order.title}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-base">{order.title}</h3>
                <p className="text-gray-600 text-sm">Size: {order.size}</p>
              </div>
              <p className="font-semibold">₹{order.price}</p>

              <Grid item xs={4}>
                {true ? (
                  <div className="flex items-start gap-2 text-sm">
                    <AdjustIcon sx={{ width: "15px", color: "#22c55e" }} />
                    <div>
                      <p className="font-medium text-gray-800">
                        Delivered On March 03
                      </p>
                      <p className="text-xs text-gray-500">
                        Your item has been delivered
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-800">
                    <span className="font-medium">
                      Expected Delivery On March 03
                    </span>
                  </div>
                )}
              </Grid>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default OrderCard;
