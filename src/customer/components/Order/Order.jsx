import React, { useState } from "react";
import OrderCard from "./OrderCard";

export default function Order() {
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const handleStatusChange = (value) => {
    setSelectedStatuses((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

//   const filteredOrders =
//     selectedStatuses.length === 0
//       ? orders
//       : orders.filter((order) => selectedStatuses.includes(order.status));

  const orderStatus = [
    { label: "On The Way", value: "onTheWay" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Returned", value: "returned" },
  ];
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-white rounded shadow p-4">
        <h2 className="font-semibold text-lg mb-4">Filters</h2>
        <h2 className="font-semibold mb-1">Order Status</h2>
        <div className="space-y-2 text-sm">
          {orderStatus.map((status) => (
            <div key={status.value}>
              <input
                type="checkbox"
                id={status.value}
                className="mr-2"
                checked={selectedStatuses.includes(status.value)}
                onChange={() => handleStatusChange(status.value)}
              />
              <label htmlFor={status.value}>{status.label}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Order List */}
      <div className="flex-1 space-y-4">
       
          <OrderCard />
        
      </div>
      {/* <OrderCard/> */}
    </div>
  );
}
