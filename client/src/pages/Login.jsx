import React, { useContext, useState } from "react";
import { VscEye, VscEyeClosed} from "react-icons/vsc";
import logo from "../assets/favicon.png";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../contexts/AuthContext.jsx";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/FireBase";
import { userDataContext } from "../contexts/UserContext";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const {serverUrl} = useContext(authDataContext);
  const {getCurrentUser} = useContext(userDataContext);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(serverUrl + '/api/auth/login', {
        email,
        password,
      },{withCredentials: true});
      console.log(result.data);
      getCurrentUser();
      navigate("/");
    }
    catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!auth) {
        console.error("Google login is unavailable: Firebase API key is missing.");
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
    <div
      className="
        flex
        min-h-screen
        px-4 py-8
        bg-[#f7f7f5]
        items-center justify-center
      "
    >
      {/* Main Login Container */}
      <div
        className="
          overflow-hidden
          w-full max-w-6xl min-h-162.5
          bg-[#eeeeec]
          rounded-[28px]
          shadow-sm
        "
      >
        <div
          className="
            grid grid-cols-1
            min-h-162.5
            lg:grid-cols-2
          "
        >
          {/* ================= LEFT : LOGIN FORM ================= */}
          <div
            className="
              flex flex-col
              px-8 py-12
              justify-center
              sm:px-12
              lg:px-16
            "
          >
            {/* Brand */}
            <div
              className="
                mb-12
              "
            >
              <div
                className="
                  flex
                  items-center gap-3
                "
              >
                {/* Logo */}
                <div
                  className="
                    flex
                    h-11 w-11
                    text-xl
                    bg-[#7f1d1d]
                    rounded-full
                    shadow-sm
                    items-center justify-center
                    cursor-pointer
                  "
                  onClick={() => navigate("/")}
                >
                  <img src={logo} alt="logo" className="h-full w-full" /> 
                </div>

                <div>
                  <h2
                    className="
                      text-sm font-semibold tracking-tight text-gray-900
                    "
                  >
                    Maa Vindhyavasini Sweets
                  </h2>

                  <p
                    className="
                      text-xs text-gray-500
                    "
                  >
                    Sweets & Restaurant
                  </p>
                </div>
              </div>
            </div>

            {/* Heading */}
            <div
              className="
                mb-7
              "
            >
              <h1
                className="
                  max-w-md
                  text-3xl font-bold leading-tight tracking-[-0.03em] text-gray-900
                  sm:text-4xl
                "
              >
                Welcome back to
                <br />
                Maa Vindhyavasini Sweets
              </h1>

              <p
                className="
                  mt-3
                  text-sm leading-6 text-gray-500
                "
              >
                Login to manage your account, orders and reservations.
              </p>
            </div>

            {/* Login Form */}
            <form
              onSubmit={handleSubmit}
              className="
                max-w-md
                space-y-4
              "
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="
                    block
                    mb-2
                    text-xs font-medium text-gray-600
                  "
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="
                    w-full
                    px-4 py-3.5
                    text-sm text-gray-900
                    bg-[#e5e4e8]
                    rounded-xl border border-transparent
                    outline-none transition placeholder:text-gray-400 focus:border-[#7f1d1d] focus:bg-white focus:ring-2 focus:ring-[#7f1d1d]/10
                  "
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div>
                <div
                  className="
                    flex
                    mb-2
                    items-center justify-between
                  "
                >
                  <label
                    htmlFor="password"
                    className="
                      block
                      text-xs font-medium text-gray-600
                    "
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="
                      text-xs font-medium text-[#7f1d1d]
                      hover:underline
                      cursor-pointer
                    "
                  >
                    Forgot password?
                  </button>
                </div>

                <div
                  className="
                    relative
                  "
                >
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    className="
                      w-full
                      px-4 py-3.5 pr-12
                      text-sm text-gray-900
                      bg-[#e5e4e8]
                      rounded-xl border border-transparent
                      outline-none transition placeholder:text-gray-400 focus:border-[#7f1d1d] focus:bg-white focus:ring-2 focus:ring-[#7f1d1d]/10
                    "
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {/* Show / Hide Password */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                    className="
                      p-2
                      text-gray-400
                      rounded-lg
                      absolute right-3 top-1/2 -translate-y-1/2 transition hover:bg-gray-200 hover:text-gray-700
                      cursor-pointer
                    "
                  >
                    {showPassword ? <VscEye /> : <VscEyeClosed />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="
                  w-full
                  px-5 py-3.5
                  text-sm font-medium text-white
                  bg-[#7f1d1d]
                  rounded-xl
                  shadow-sm
                  cursor-pointer
                  transition hover:bg-[#681818] active:scale-[0.99]
                "
              >
                Login to your account
              </button>

              {/* Divider */}
              <div
                className="
                  flex
                  py-2
                  items-center gap-4
                "
              >
                <div
                  className="
                    flex-1
                    h-px
                    bg-gray-300
                  "
                />

                <span
                  className="
                    text-xs text-gray-400
                  "
                >
                  Or
                </span>

                <div
                  className="
                    flex-1
                    h-px
                    bg-gray-300
                  "
                />
              </div>

              {/* Google */}
              <button
                type="button"
                className="
                  flex
                  w-full
                  px-5 py-3.5
                  text-sm font-medium text-gray-700
                  bg-white
                  rounded-xl
                  shadow-sm
                  items-center justify-center gap-3 transition hover:bg-gray-50 active:scale-[0.99]
                  cursor-pointer
                "
                onClick={handleGoogleLogin}
              >
                {/* Google-style icon */}
                <span
                  className="
                    font-bold text-base
                  "
                >
                  <FcGoogle />
                </span>
                Continue with Google
              </button>
            </form>

            {/* Create Account */}
            <p
              className="
                max-w-md
                mt-8
                text-center text-xs text-gray-500
              "
            >
              Don't have an account?{" "}
              <button
                type="button"
                className="
                  font-semibold text-[#7f1d1d]
                  hover:underline 
                  cursor-pointer
                "
                onClick={() => navigate("/signup")}
              >
                Create one
              </button>
            </p>
          </div>

          {/* ================= RIGHT : VISUAL ================= */}
          <div
            className="
              hidden overflow-hidden
              bg-[#e5e3df]
              relative
              lg:block
            "
          >
            {/* Decorative background circles */}
            <div
              className="
                h-72 w-72
                bg-[#d8c5a5]/40
                rounded-full
                absolute -right-20 -top-20
              "
            />

            <div
              className="
                h-80 w-80
                bg-[#c7a77b]/20
                rounded-full
                absolute -bottom-32 -left-20
              "
            />

            {/* Main Food Image */}
            <div
              className="
                flex
                p-12
                absolute inset-0 items-center justify-center
              "
            >
              <div
                className="
                  h-117.5 w-117.5
                  relative
                "
              >
                {/* Main image */}
                <div
                  className="
                    overflow-hidden
                    h-87.5 w-87.5
                    rounded-[35px]
                    shadow-2xl
                    absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-5deg]
                  "
                >
                  <img
                    src="/images/sweets-login.jpg"
                    alt="Maa Vindhyavasini Sweets"
                    className="
                      object-cover
                      h-full w-full
                    "
                  />

                  {/* Image overlay */}
                  <div
                    className="
                      bg-linear-to-t from-black/30 via-transparent to-transparent
                      absolute inset-0
                    "
                  />
                </div>

                {/* Floating Sweet Card */}
                <div
                  className="
                    flex
                    h-28 w-28
                    text-5xl
                    bg-white
                    rounded-3xl
                    shadow-xl
                    absolute left-2 top-12 -rotate-12 items-center justify-center
                  "
                >
                  🍮
                </div>

                {/* Floating Sweet Card */}
                <div
                  className="
                    flex
                    h-24 w-24
                    text-4xl
                    bg-white
                    rounded-3xl
                    shadow-xl
                    absolute right-0 top-24 rotate-12 items-center justify-center
                  "
                >
                  🍰
                </div>

                {/* Floating Sweet Card */}
                <div
                  className="
                    flex
                    h-24 w-24
                    text-4xl
                    bg-[#7f1d1d]
                    rounded-3xl
                    shadow-xl
                    absolute bottom-8 left-12 rotate-[8deg] items-center justify-center
                  "
                >
                  🍬
                </div>

                {/* Brand badge */}
                <div
                  className="
                    max-w-47.5
                    px-5 py-4
                    bg-white/90
                    rounded-2xl
                    shadow-xl
                    absolute bottom-12 right-2 backdrop-blur
                  "
                >
                  <p
                    className="
                      text-xs font-medium text-gray-400
                    "
                  >
                    Taste of tradition
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm font-bold text-gray-900
                    "
                  >
                    Made with love & mithaas
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Brand */}
            <div
              className="
                flex
                absolute bottom-8 left-12 right-12 items-center justify-between
              "
            >
              <span
                className="
                  text-xs font-medium text-gray-500
                "
              >
                Maa Vindhyavasini Sweets
              </span>

              <span
                className="
                  text-xs text-gray-400
                "
              >
                Pure • Fresh • Traditional
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
