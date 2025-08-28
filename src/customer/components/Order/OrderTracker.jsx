import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";

const steps = [
  "Order Placed",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered"
];

function OrderTracker({ activeStep }) {
  return (
    <div className="w-full py-6">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default OrderTracker;
