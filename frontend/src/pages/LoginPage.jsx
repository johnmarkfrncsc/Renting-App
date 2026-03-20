import React, { useContext, useState } from "react";
import api from "../api/axios.js";
import { AuthContext } from "../context/AuthContext.jsx";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", { email, password });
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
        setError(response?.data?.message || "Login Failed");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Server Error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await api.post("/auth/google", {
          token: tokenResponse.access_token,
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
          setError(response?.data?.message || "Google sign in failed.");
        }
      } catch (error) {
        setError("Google sign in failed, Please try again");
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="w-16 h-16 rounded-full bg-gray-300 mb-4" />

      <div className="bg-white w-full max-w-sm rounded-2xl border border-gray-200 shadow-sm px-8 py-8">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
          Sign in
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 text-center">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-gray-600 mb-1 font-semibold"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="password"
                className="block text-sm text-gray-600 font-semibold"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-full text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 transition-colors disabled:opacity-50 mt-2 hover:cursor-pointer"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div className="flex justify-center gap-2 mt-4  **:whitespace-nowrap">
          <p className="text-sm text-gray-600 hover:text-gray-900">
            Forget your password?
          </p>
          <a href="" className="text-sm text-indigo-500">
            Reset Password
          </a>
        </div>
      </div>

      <div className="flex items-center w-full max-w-sm my-5 gap-3">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="text-sm text-gray-500">Or</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      <Link
        to="/signup"
        className="w-full max-w-sm py-2.5 rounded-full border border-gray-300 text-sm font-semibold text-gray-800 text-center bg-white 
        hover:bg-gray-50 hover:text-indigo-500 hover:border-indigo-600 transition-colors block"
      >
        Create an account
      </Link>
      <button
        type="button"
        className="w-full max-w-sm mt-3 py-2.5 rounded-full border border-gray-300 text-sm font-semibold text-gray-800 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
        onClick={() => handleGoogleLogin()}
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
  );
};

export default LoginPage;
