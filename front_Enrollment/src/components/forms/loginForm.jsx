// src/pages/LoginForm.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import API from "../../api/api";
import { useAuth } from "../../api/authContext";
import logo from "../../assets/react.svg";

const LoginForm = ({ role = "students" }) => {
  const isAdmin = role === "admins";
  const navigate = useNavigate();
  const { login } = useAuth();

  const [values, setValues] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const endpoint = isAdmin ? "/admins/login" : "/students/login";
    console.log("Logging in...", values);
    const res = await API.post(endpoint, values);
    console.log("Login response:", res.data);

    // Make sure login() doesn't throw
    try {
      login(res.data.students || res.data.admins, res.data.token, res.data.role);
    } catch (err) {
      console.error("Login context error:", err);
      toast.error("Something went wrong with login context.");
      return; // Stop execution if login context fails
    }

    // Only toast + navigate if login() is successful
    toast.success("Login successful!");

    // Use safe route navigation
    if (res.data.role === "students") {
      navigate("/students/dashboard");
    } else if (res.data.role === "admins") {
      navigate("/admins/dashboard");
    } else {
      console.warn("Unknown role:", res.data.role);
      toast.error("Unknown role, cannot navigate.");
    }

  } catch (err) {
    console.error("Login failed:", err);
    toast.error("Login failed. Please check your credentials.");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3DFBF] p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-16 h-16" />
        </div>
        <h2 className="text-2xl font-bold text-[#07004D] text-center mb-6 capitalize">
          {role} Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#07004D] mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-[#2D82B7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D82B7]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#07004D] mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2 border border-[#2D82B7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D82B7]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2/4 transform -translate-y-1/2 text-sm text-[#2D82B7] hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2D82B7] hover:bg-[#256ba0] text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginForm;
