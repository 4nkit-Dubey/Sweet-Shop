import React, { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import logo from "../assets/favicon.png";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { authDataContext } from "../contexts/AuthContext.jsx";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/FireBase";
import { userDataContext } from "../contexts/UserContext";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {serverUrl} = useContext(authDataContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {getCurrentUser} = useContext(userDataContext);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(serverUrl + '/api/auth/registration', {
        name,
        email,
        password,
      },{withCredentials: true}); 
      console.log(result.data);
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignup = async (e) => {
    e.preventDefault();
    try {
      if (!auth) {
        console.error("Google signup is unavailable: Firebase API key is missing.");
        return;
      }
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const name = user.displayName;
      const email = user.email;
      const firebaseUid = user.uid;
      

      const result = await axios.post(serverUrl + "/api/auth/googleSignup", {
        name,
        email,
        firebaseUid,
      },{withCredentials: true});
      console.log(result.data);
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-4 py-8">

      {/* Main Container */}
      <div className="w-full max-w-6xl min-h-162.5 overflow-hidden rounded-[28px] bg-[#eeeeec] shadow-sm">

        <div className="grid min-h-162.5rid-cols-1 lg:grid-cols-2">

          {/* ================= LEFT : REGISTER FORM ================= */}
          <div className="flex flex-col justify-center px-8 py-10 sm:px-12 lg:px-16">

            {/* Brand */}
            <div className="mb-8">
              <div className="flex items-center gap-3">

                {/* Logo */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#7f1d1d] text-xl shadow-sm cursor-pointer" onClick={() => navigate("/")}>
                  <img src={logo} alt="logo" className="h-full w-full" /> 
                </div>

                <div>
                  <h2 className="text-sm font-semibold tracking-tight text-gray-900">
                    Maa Vindhyavasini
                  </h2>

                  <p className="text-xs text-gray-500">
                    Sweets & Restaurant
                  </p>
                </div>

              </div>
            </div>


            {/* Heading */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold leading-tight tracking-[-0.03em] text-gray-900 sm:text-4xl">
                Create your
                <br />
                account
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Join Maa Vindhyavasini Sweets and enjoy a sweeter experience.
              </p>
            </div>


            {/* Registration Form */}
            <form
              onSubmit={handleSubmit}
              className="max-w-md space-y-3.5"
            >

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-xs font-medium text-gray-600"
                >
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-transparent
                    bg-[#e5e4e8]
                    px-4
                    py-3
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-[#7f1d1d]
                    focus:bg-white
                    focus:ring-2
                    focus:ring-[#7f1d1d]/10
                  "
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>


              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-medium text-gray-600"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-transparent
                    bg-[#e5e4e8]
                    px-4
                    py-3
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-[#7f1d1d]
                    focus:bg-white
                    focus:ring-2
                    focus:ring-[#7f1d1d]/10
                  "
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>


              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-xs font-medium text-gray-600"
                >
                  Password
                </label>

                <div className="relative">

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                    className="
                      w-full
                      rounded-xl
                      border
                      border-transparent
                      bg-[#e5e4e8]
                      px-4
                      py-3
                      pr-11
                      text-sm
                      text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-[#7f1d1d]
                      focus:bg-white
                      focus:ring-2
                      focus:ring-[#7f1d1d]/10
                    "
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                      absolute
                      right-2.5
                      top-1/2
                      -translate-y-1/2
                      rounded-lg
                      p-1.5
                      text-gray-400
                      transition
                      hover:bg-gray-200
                      hover:text-gray-700
                      cursor-pointer
                    "
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <VscEye /> : <VscEyeClosed />}
                  </button>

                </div>
              </div>

              {/* Create Account */}
              <button
                type="submit"
                className="
                  w-full
                  rounded-xl
                  bg-[#7f1d1d]
                  px-5
                  py-3.5
                  text-sm
                  font-medium
                  text-white
                  shadow-sm
                  transition
                  hover:bg-[#681818]
                  active:scale-[0.99]
                  cursor-pointer
                "
              >
                Create account
              </button>


              {/* Divider */}
              <div className="flex items-center gap-4 py-1">

                <div className="h-px flex-1 bg-gray-300" />

                <span className="text-xs text-gray-400">
                  Or
                </span>

                <div className="h-px flex-1 bg-gray-300" />

              </div>


              {/* Google */}
              <button
                type="button"
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-white
                  px-5
                  py-3.5
                  text-sm
                  font-medium
                  text-gray-700
                  shadow-sm
                  transition
                  hover:bg-gray-50
                  active:scale-[0.99]
                  cursor-pointer
                "
                onClick={handleGoogleSignup}
              >

                <span className="font-bold text-base">
                  <FcGoogle />
                </span>

                Continue with Google

              </button>

            </form>


            {/* Login */}
            <p className="mt-6 max-w-md text-center text-xs text-gray-500">
              Already have an account?{" "}
              <button
                type="button"
                className="font-semibold text-[#7f1d1d] hover:underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
            </p>

          </div>


          {/* ================= RIGHT : VISUAL ================= */}
          <div className="relative hidden overflow-hidden bg-[#e5e3df] lg:block">

            {/* Background Decorations */}
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#d8c5a5]/40" />

            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#c7a77b]/20" />


            {/* Visual Area */}
            <div className="absolute inset-0 flex items-center justify-center p-12">

              <div className="relative h-117.5 w-117.5">

                {/* Main Food Image */}
                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    h-87.5
                    w-87.5
                    -translate-x-1/2
                    -translate-y-1/2
                    rotate-[-5deg]
                    overflow-hidden
                    rounded-[35px]
                    shadow-2xl
                  "
                >

                  <img
                    src="/images/sweets-login.jpg"
                    alt="Maa Vindhyavasini Sweets"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

                </div>


                {/* Floating Sweet */}
                <div
                  className="
                    absolute
                    left-2
                    top-12
                    flex
                    h-28
                    w-28
                    -rotate-12
                    items-center
                    justify-center
                    rounded-3xl
                    bg-white
                    text-5xl
                    shadow-xl
                  "
                >
                  🍮
                </div>


                {/* Floating Sweet */}
                <div
                  className="
                    absolute
                    right-0
                    top-24
                    flex
                    h-24
                    w-24
                    rotate-12
                    items-center
                    justify-center
                    rounded-3xl
                    bg-white
                    text-4xl
                    shadow-xl
                  "
                >
                  🍰
                </div>


                {/* Floating Sweet */}
                <div
                  className="
                    absolute
                    bottom-8
                    left-12
                    flex
                    h-24
                    w-24
                    rotate-[8deg]
                    items-center
                    justify-center
                    rounded-3xl
                    bg-[#7f1d1d]
                    text-4xl
                    shadow-xl
                  "
                >
                  🍬
                </div>


                {/* Brand Badge */}
                <div
                  className="
                    absolute
                    bottom-12
                    right-2
                    max-w-47.5
                    rounded-2xl
                    bg-white/90
                    px-5
                    py-4
                    shadow-xl
                    backdrop-blur
                  "
                >

                  <p className="text-xs font-medium text-gray-400">
                    Taste of tradition
                  </p>

                  <p className="mt-1 text-sm font-bold text-gray-900">
                    Made with love & mithaas
                  </p>

                </div>

              </div>

            </div>


            {/* Bottom Branding */}
            <div className="absolute bottom-8 left-12 right-12 flex items-center justify-between">

              <span className="text-xs font-medium text-gray-500">
                Maa Vindhyavasini Sweets
              </span>

              <span className="text-xs text-gray-400">
                Pure • Fresh • Traditional
              </span>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Registration;