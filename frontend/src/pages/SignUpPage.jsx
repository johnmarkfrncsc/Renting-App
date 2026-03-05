import React, { useState, useContext } from "react";
import api from "../api/axios.js";
import { AuthContext } from "../context/AuthContext.jsx";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const SignUpPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setPasswordError("");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPasswordError("");

    if (formData.password != formData.confirmPassword) {
      setPasswordError("Password do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role === "property owner" ? "admin" : "user",
      });

      if (response?.data?.success) {
        const userData = login(
          response.data.token,
          response.data.role,
          response.data.id,
        );
        if (userData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setError(response?.data?.message || "Sign up failed. Try again.");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Server Error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSignUp}>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className={`text-black block w-full px-3 py-2 border rounded-md ${
                    error ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`text-black block w-full px-3 py-2 border rounded-md ${
                    error ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className={`text-black block w-full px-3 py-2 border rounded-md pr-10 ${
                    error ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-600 hover:text-gray-900"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className={`text-black block w-full px-3 py-2 border rounded-md pr-10 ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-600 hover:text-gray-900"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="mt-2 text-sm text-red-600">{passwordError}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                I am a...
              </label>
              <div className="mt-1">
                <select
                  id="role"
                  name="role"
                  required
                  className={`text-black block w-full px-3 py-2 border rounded-md bg-white ${
                    error ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="">Select your role</option>
                  <option value="property owner">Property Owner</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>

            {/* Error */}
            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </div>
          </form>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
