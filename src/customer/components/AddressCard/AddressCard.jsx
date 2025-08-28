import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";

function AddressCard({ address }) {
  return (
    <div className="border rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300 bg-white">
      {/* Name */}
      <div className="flex items-center space-x-3 mb-3">
        <PersonIcon className="text-indigo-600" />
        <h2 className="text-xl font-semibold">
          {address.firstName + " " +address.lastName}
          {/* Anurag */}
        </h2>
      </div>

      {/* Address */}
      <div className="flex items-start space-x-3 text-gray-700">
        <LocationOnIcon className="mt-1 text-red-500" />
        <div className="space-y-1 text-sm">
          <p className="font-medium">{address.street},</p>
          {/* Gwalior */}
          <p>
            {address.city}, {address.state} - {address.pinCode}
            {/* 474006 */}
          </p>
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-center space-x-3 text-gray-700 mt-4">
        <PhoneIcon className="text-green-600" />
        <p className="text-sm font-medium">{address.mobile}</p>
        {/* 9669907552 */}
      </div>
    </div>
  );
}

export default AddressCard;
