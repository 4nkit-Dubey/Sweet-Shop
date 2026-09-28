import React, { useContext, useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import logo from "../assets/favicon.png";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext.jsx";
import { adminDataContext } from "../context/AdminContext.jsx";
import axios from "axios";

const ADMIN_LOGIN_ENDPOINT = "/api/auth/adminLogin";
const ADMIN_HOME = "/";

// Jaali (lattice) pattern for the left panel — pure SVG, no extra image needed
const jaaliSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'><g fill='none' stroke='#e3b566' stroke-opacity='0.16' stroke-width='1'><path d='M28 2 54 28 28 54 2 28Z'/><circle cx='28' cy='28' r='9'/><path d='M0 0H6L0 6ZM56 0H50L56 6ZM0 56H6L0 50ZM56 56H50L56 50Z'/></g></svg>`;
const jaaliPattern = `url("data:image/svg+xml,${encodeURIComponent(jaaliSvg)}")`;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();
  const { adminData, getAdmin } = useContext(adminDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + ADMIN_LOGIN_ENDPOINT,
        { email, password },
        { withCredentials: true },
      );
      console.log(result.data);
      await getAdmin();
      navigate(ADMIN_HOME);
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message ||
          "Could not sign in. Check your email and password, then try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      {/* ================= LEFT : BRAND PANEL ================= */}
      <div
        className="relative hidden flex-col justify-between overflow-hidden bg-[#2b0b0b] p-12 text-[#f5e9d3] lg:flex"
        style={{ backgroundImage: jaaliPattern }}
      >
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 overflow-hidden rounded-full bg-[#7f1d1d] ring-1 ring-[#e3b566]/50">
            <img src={logo} alt="logo" className="h-full w-full" />
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-tight">
              Maa Vindhyavasini Sweets
            </h2>
            <p className="text-xs text-[#f5e9d3]/60">Admin console</p>
          </div>
        </div>

        <div className="max-w-md">
          <h1 className="font-serif text-4xl leading-[1.15] tracking-tight xl:text-5xl">
            Everything behind the counter, in one place.
          </h1>
          <p className="mt-5 text-sm leading-6 text-[#f5e9d3]/70">
            Manage orders, menu items, reservations and customers for the shop.
          </p>
        </div>

        <p className="text-xs text-[#f5e9d3]/50">Authorized staff only.</p>
      </div>

      {/* ================= RIGHT : LOGIN FORM ================= */}
      <div className="flex items-center justify-center bg-[#faf8f5] px-6 py-10 sm:px-12">
        <div className="w-full max-w-sm">
          {/* Brand (mobile only — desktop pe left panel me hai) */}
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-[#7f1d1d]">
              <img src={logo} alt="logo" className="h-full w-full" />
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-gray-900">
                Maa Vindhyavasini Sweets
              </h2>
              <p className="text-xs text-gray-500">Admin console</p>
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-[-0.03em] text-gray-900">
            Admin sign in
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Use your admin email and password to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="admin-email"
                className="mb-2 block text-xs font-medium text-gray-700"
              >
                Admin email
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                placeholder="admin@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#7f1d1d] focus:ring-2 focus:ring-[#7f1d1d]/15"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-xs font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#7f1d1d] focus:ring-2 focus:ring-[#7f1d1d]/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-md p-2 text-gray-400 transition hover:bg-stone-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7f1d1d]/30"
                >
                  {showPassword ? <VscEye /> : <VscEyeClosed />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs leading-5 text-red-800"
              >
                {error}
              </div>
            )}

            {/* Sign in */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#7f1d1d] px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#681818] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7f1d1d] focus-visible:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              )}
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-8 cursor-pointer text-xs font-medium text-gray-500 transition hover:text-[#7f1d1d] hover:underline"
          >
            ← Back to website
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
