import { TextField, Button } from "@mui/material";
import AddressCard from "../AddressCard/AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../State/Order/Action";

export default function DeliveryAddressForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  // ✅ Handle new form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const address = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      street: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      pinCode: formData.get("pinCode"),
      mobile: formData.get("phoneNumber"),
    };

    const orderData = { address, navigate };
    dispatch(createOrder(orderData));
    console.log("new address order", orderData);

    // clear form
    e.target.reset();
  };

  // ✅ Handle saved address delivery
  const handleDeliverHere = (address) => {
    const orderData = { address, navigate };
    dispatch(createOrder(orderData));
    console.log("saved address order", orderData);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel - Saved Addresses */}
        <div className="lg:col-span-5">
          <div className="h-[32rem] overflow-y-scroll border rounded-md shadow-md p-6 space-y-6">
            {auth.user?.addresses?.map((item, index) => (
              <div key={index} className="space-y-2">
                <AddressCard address={item} />
                <Button
                  onClick={() => handleDeliverHere(item)} // ✅ attach handler
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "#1976d2",
                    "&:hover": { bgcolor: "#115293" },
                  }}
                >
                  Deliver Here
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Shipping Form */}
        <div className="lg:col-span-7">
          <div className="border rounded-md shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  required
                  name="firstName"
                  label="First Name"
                  fullWidth
                  autoComplete="given-name"
                />
                <TextField
                  required
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  autoComplete="family-name"
                />
              </div>

              <TextField
                required
                name="address"
                label="Street Address"
                fullWidth
                multiline
                rows={4}
                autoComplete="shipping address-line1"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  required
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                />
                <TextField name="state" label="State / Province" fullWidth />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  required
                  name="pinCode"
                  label="Zip / Postal Code"
                  fullWidth
                  autoComplete="shipping postal-code"
                />
                <TextField
                  required
                  name="phoneNumber"
                  label="Phone Number"
                  fullWidth
                  autoComplete="tel"
                />
              </div>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#1976d2",
                  "&:hover": { bgcolor: "#115293" },
                  py: 1.5,
                }}
              >
                Deliver Here
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
