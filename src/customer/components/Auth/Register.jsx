import { Alert, Snackbar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser, register } from "../../../State/Auth/Action";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  const formRef = useRef(null);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  useEffect(() => {
    if (auth.user) {
      handleCloseSnackBar();
    }
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate(-1);
    }
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(register(userData));
    console.log("user data", userData);

    setOpenSnackBar(true);
    formRef.current.reset(); // Reset the form
  };

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  return (
    <>
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-500 text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </button>
        </p>
      </div>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {auth.error ? auth.error : auth.user ? "Register Success" : ""}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Register;
