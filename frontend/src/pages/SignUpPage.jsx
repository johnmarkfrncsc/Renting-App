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
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    if (currentStep === 1 && !formData.email) {
      setError("Please enter your email");
      return;
    }
    if (currentStep === 2 && (!formData.name || !formData.role)) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    setCurrentStep((prev) => prev + 1);
  };

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
      <div className="mb-10 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-lightbold text-gray-600">
          Create your account
        </h2>
        <p className="pt-2 text-center text-xs text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium underline text-indigo-600 hover:text-indigo-500"
          >
            Log in here
          </Link>
        </p>
      </div>

      <div className="mb-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="flex gap-2 items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`size-6 rounded-full text-center text-white 
                ${currentStep > 1 ? "bg-indigo-600" : currentStep === 1 ? "bg-indigo-500" : "bg-gray-600 text-gray-200"}`}
            >
              1
            </div>
            <span
              className={`text-xs ${currentStep === 1 ? "text-gray-600" : "text-gray-400"}`}
            >
              Enter your email address
            </span>
          </div>
          <div
            className={`flex-1 h-px ${currentStep > 1 ? "bg-indigo-600" : "bg-gray-300"}`}
          />

          <div className="flex flex-col items-center gap-1">
            <div
              className={`size-6 rounded-full text-center text-white 
                ${currentStep > 2 ? "bg-indigo-600" : currentStep === 2 ? "bg-indigo-500" : "bg-gray-600 text-gray-200"}`}
            >
              2
            </div>
            <span
              className={`text-xs ${currentStep === 2 ? "text-gray-600" : "text-gray-400"}`}
            >
              Provide your basic info
            </span>
          </div>
          <div
            className={`flex-1 h-px ${currentStep > 2 ? "bg-indigo-600" : "bg-gray-300"}`}
          />

          <div className="flex flex-col items-center gap-1">
            <div
              className={`size-6 rounded-full text-center text-white 
                ${currentStep === 3 ? "bg-indigo-500" : "bg-gray-600 text-gray-200"}`}
            >
              3
            </div>
            <span
              className={`text-xs ${currentStep === 3 ? "text-gray-600" : "text-gray-400"}`}
            >
              Create your password
            </span>
          </div>
        </div>
      </div>

      {/* FormData */}
      <div className="bg-gray-100 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className=" py-8 px-4  sm:px-10">
          <form className="space-y-6" onSubmit={handleSignUp}>
            {currentStep === 1 && (
              <div>
                {/* Email */}
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  What's your email address?
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
            )}

            {currentStep === 2 && (
              <div>
                {/* Name */}
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter your full name
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
                {/* Select Role */}
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 pt-2"
                  >
                    I am a...
                  </label>
                  <div className="mt-1">
                    <select
                      id="role"
                      name="role"
                      required
                      className={`text-black block w-full px-4 py-2 border rounded-md bg-white cursor-pointer ${
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
              </div>
            )}

            {currentStep === 3 && (
              <div>
                {/* Password */}
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Create password
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
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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

                {/* Confirm pass */}
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 pt-2"
                >
                  Confirm password
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
            )}

            {/* Error */}
            {error && <p className="text-sm text-red-600">{error}</p>}

            {/*Next or Submit*/}
            <div className="flex justify-evenly md:justify-normal md:gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                disabled={currentStep === 1}
                className={`w-fit flex justify-center py-2 px-10 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600
                    ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                Back
              </button>
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-fit flex justify-center py-2 px-10 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600  cursor-pointer"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-fit flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 cursor-pointer "
                >
                  {loading ? "Creating account..." : "Create account"}
                </button>
              )}
            </div>
          </form>

          {/* Login link */}
          <div className="flex items-center w-full pt-8 my-5 gap-3">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-gray-500">Or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>
          <button
            type="button"
            className="w-full mt-3 py-2.5 rounded-full border border-gray-300 text-sm font-semibold text-gray-800 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.14 0 5.95 1.08 8.17 2.86l6.1-6.1C34.46 3.05 29.5 1 24 1 14.82 1 7.07 6.48 3.64 14.22l7.1 5.52C12.4 13.67 17.73 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.52 24.5c0-1.64-.15-3.22-.42-4.74H24v9.01h12.68c-.55 2.94-2.2 5.43-4.67 7.1l7.18 5.58C43.35 37.26 46.52 31.35 46.52 24.5z"
              />
              <path
                fill="#FBBC05"
                d="M10.74 28.26A14.5 14.5 0 0 1 9.5 24c0-1.48.25-2.91.74-4.26l-7.1-5.52A23.93 23.93 0 0 0 0 24c0 3.86.92 7.5 2.54 10.72l8.2-6.46z"
              />
              <path
                fill="#34A853"
                d="M24 47c5.5 0 10.12-1.82 13.5-4.94l-7.18-5.58c-1.82 1.22-4.15 1.94-6.32 1.94-6.27 0-11.6-4.17-13.26-9.76l-8.2 6.46C7.07 41.52 14.82 47 24 47z"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
