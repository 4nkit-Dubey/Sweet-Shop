import { useContext, useState } from "react";
import logo from "../assets/1.png";
import { LuSearch, LuMenu, LuX, LuShoppingBag, LuHouse, LuCandy, LuCookie } from "react-icons/lu";
import { FaCircleUser } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { MdOutlineContactSupport } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../contexts/UserContext";
import SearchModal from "./SearchModal";
import { FiLogIn } from "react-icons/fi";
import { CgLogOut } from "react-icons/cg";
import { TiInfoLargeOutline } from "react-icons/ti";
import { authDataContext } from "../contexts/AuthContext";
import axios from "axios";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { getCurrentUser, userData } = useContext(userDataContext);
  const navigate = useNavigate();
  const closeSearch = () => setIsSearchOpen(false);
  const { serverUrl } = useContext(authDataContext);

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(result.data);
      getCurrentUser();
    } catch (error) {
      console.log(error);
    }
  };
  const openMobileSearch = () => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
    navigate("/search");
  };

  return (
    <div>
      <nav className="fixed left-0 top-0 z-40 h-[12%] min-h-[80px] w-full border-b-2 border-dashed border-yellow-300 bg-[#ecfafaec]">
        <div className="absolute left-0 top-0 flex h-full items-center px-4 sm:px-8">
          <ul className="hidden items-center gap-[10px] lg:flex">
            <li className="cursor-pointer rounded-2xl bg-[#faae33] px-[12px] py-[10px] text-[12px] font-bold text-[#823513] hover:bg-[#ffcb78]" onClick={() => navigate("/")}>
              HOME
            </li>

            <li className="cursor-pointer rounded-2xl bg-[#faae33] px-[10px] py-[10px] text-[12px] font-bold text-[#823513] hover:bg-[#ffcb78]" onClick={() => navigate("/sweets")}>
              SWEETS
            </li>

            <li className="cursor-pointer rounded-2xl bg-[#faae33] px-[10px] py-[10px] text-[12px] font-bold text-[#823513] hover:bg-[#ffcb78]" onClick={() => navigate("/snacks")}>
              SNACKS
            </li>

            <li className="cursor-pointer rounded-2xl bg-[#faae33] px-[10px] py-[10px] text-[12px] font-bold text-[#823513] hover:bg-[#ffcb78]" onClick={() => navigate("/about")}>
              ABOUT
            </li>
          </ul>

          <button
            type="button"
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
              setIsProfileMenuOpen(false);
            }}
            className="cursor-pointer rounded-2xl bg-[#faae33] p-[10px] text-[18px] text-[#823513] hover:bg-[#ffcb78] lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <LuX /> : <LuMenu />}
          </button>
        </div>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-label="Go to home"
        >
          <img
            src={logo}
            alt="Logo"
            className="h-[4rem] w-[4rem] object-contain sm:h-[5rem] sm:w-[5rem]"
          />
        </button>

        <div className="absolute right-0 top-0 flex h-full items-center gap-[10px] px-4 sm:gap-[17px] sm:px-8">
          <button
            type="button"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            className="hidden cursor-pointer items-center justify-center rounded-2xl bg-[#faae33] p-[10px] text-[18px] text-[#823513] hover:bg-[#ffcb78] lg:flex"
            aria-label={isSearchOpen ? "Close search" : "Open search"}
            title={isSearchOpen ? "Close search" : "Search"}
          >
            {isSearchOpen ? <LuX /> : <LuSearch />}
          </button>

          <button
            type="button"
            onClick={openMobileSearch}
            className="flex cursor-pointer items-center justify-center rounded-2xl bg-[#faae33] p-[10px] text-[18px] text-[#823513] hover:bg-[#ffcb78] lg:hidden"
            aria-label="Search"
            title="Search"
          >
            <LuSearch />
          </button>

          <div className="relative hidden lg:block">
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="flex cursor-pointer items-center justify-center rounded-2xl bg-[#faae33] p-[10px] text-[18px] text-[#823513] hover:bg-[#ffcb78]"
              aria-label="Cart"
              title="Cart"
            >
              <BsCart4 />
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#ffcb78] text-[11px] font-bold text-[#823513]">
                10
              </span>
            </button>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsProfileMenuOpen((prev) => !prev);
                setIsMenuOpen(false);
              }}
              className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#faae33] text-[#823513] hover:bg-[#ffcb78]"
              aria-label="Profile"
              title="Profile"
            >
              {!userData || !userData.name ? (
                <FaCircleUser className="text-[18px]" />
              ) : (
                <span className="text-[16px] font-bold leading-none sm:text-[22px]">
                  {userData.name.charAt(0).toUpperCase()}
                </span>
              )}
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 top-full mt-3 flex w-[190px] flex-col gap-2 rounded-2xl bg-[#ecfafaec] shadow-lg p-3">
                {!userData && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      navigate("/login");
                    }}
                    className="flex w-full items-center gap-2 rounded-2xl bg-[#faae33] px-4 py-3 text-left text-[14px] font-bold text-[#823513] hover:bg-[#ffcb78]"
                  >
                    <FiLogIn className="text-[17px]" />
                    Login
                  </button>
                )}

                {userData && (
                  <button
                    type="button"
                    onClick={() => {
                      (setIsProfileMenuOpen(false), handleLogout());
                    }}
                    className="flex w-full items-center gap-2 rounded-2xl bg-[#faae33] px-4 py-3 text-left text-[14px] font-bold text-[#823513] hover:bg-[#ffcb78]"
                  >
                    <CgLogOut className="text-[17px]" />
                    Logout
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {setIsProfileMenuOpen(false); navigate("/cart");}}
                  className="flex w-full items-center gap-2 rounded-2xl bg-[#faae33] px-4 py-3 text-left text-[14px] font-bold text-[#823513] hover:bg-[#ffcb78]"
                >
                  <LuShoppingBag className="text-[17px]" />
                  My Cart
                </button>

                <button
                  type="button"
                  onClick={() => {setIsProfileMenuOpen(false); navigate("/about");}}
                  className="flex w-full items-center gap-2 rounded-2xl bg-[#faae33] px-4 py-3 text-left text-[14px] font-bold text-[#823513] hover:bg-[#ffcb78]"
                >
                  <TiInfoLargeOutline className="text-[17px]" />
                  About
                </button>
                <button
                  type="button"
                  onClick={() => {setIsProfileMenuOpen(false); navigate("/contact");}}
                  className="flex w-full items-center gap-2 rounded-2xl bg-[#faae33] px-4 py-3 text-left text-[14px] font-bold text-[#823513] hover:bg-[#ffcb78]"
                >
                  <MdOutlineContactSupport className="text-[17px]" />
                  Contact
                </button>
              </div>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="absolute left-4 top-full mt-2 w-[220px] rounded-2xl bg-[#ecfafaec] shadow-lg p-3 lg:hidden">
            <ul className="flex flex-col gap-2 font-semibold">
              <li
                onClick={() => {setIsMenuOpen(false); navigate("/");}}
                className="cursor-pointer rounded-2xl bg-[#faae33] px-[20px] py-[10px] text-[15px] text-[#823513] hover:bg-[#ffcb78]"
              >
                HOME
              </li>

              <li
                onClick={() => {setIsMenuOpen(false); navigate("/sweets");}}
                className="cursor-pointer rounded-2xl bg-[#faae33] px-[20px] py-[10px] text-[15px] text-[#823513] hover:bg-[#ffcb78]"
              >
                SWEETS
              </li>

              <li
                onClick={() => {setIsMenuOpen(false); navigate("/snacks");}}
                className="cursor-pointer rounded-2xl bg-[#faae33] px-[20px] py-[10px] text-[15px] text-[#823513] hover:bg-[#ffcb78]"
              >
                SNACKS
              </li>

              <li
                onClick={() => {setIsMenuOpen(false); navigate("/about");}}
                className="cursor-pointer rounded-2xl bg-[#faae33] px-[20px] py-[10px] text-[15px] text-[#823513] hover:bg-[#ffcb78]"
              >
                ABOUT
              </li>
              <li
                onClick={() => {setIsMenuOpen(false); navigate("/contact");}}
                className="cursor-pointer rounded-2xl bg-[#faae33] px-[20px] py-[10px] text-[15px] text-[#823513] hover:bg-[#ffcb78]"
              >
                CONTACT
              </li>

              <li
                onClick={() => {setIsMenuOpen(false); navigate("/cart");}}
                className="cursor-pointer rounded-2xl bg-[#faae33] px-[20px] py-[10px] text-[15px] text-[#823513] hover:bg-[#ffcb78] "
              >
                CART
              </li>
            </ul>
          </div>
        )}
      </nav>

      {isSearchOpen && <SearchModal onClose={closeSearch} />}

      {/* ================= MOBILE BOTTOM NAVIGATION BAR ================= */}
      <nav className="fixed bottom-0 left-0 z-40 flex h-[10%] min-h-[64px] w-full items-center justify-center border-t-2 border-dashed border-yellow-300 bg-[#ecfafaec] px-2 lg:hidden">
        <ul className="flex w-full max-w-md items-center justify-around gap-1">
          <li className="flex cursor-pointer flex-col items-center justify-center gap-0.5 rounded-2xl bg-[#faae33] px-[12px] py-[6px] text-[10px] font-bold text-[#823513] hover:bg-[#ffcb78]" onClick={() => navigate("/")}>
            <LuHouse className="text-[18px]" />
            <span>HOME</span>
          </li>

          <li className="flex cursor-pointer flex-col items-center justify-center gap-0.5 rounded-2xl bg-[#faae33] px-[10px] py-[6px] text-[10px] font-bold text-[#823513] hover:bg-[#ffcb78]" onClick={() => navigate("/sweets")}>
            <LuCandy className="text-[18px]" />
            <span>SWEETS</span>
          </li>

          <li className="flex cursor-pointer flex-col items-center justify-center gap-0.5 rounded-2xl bg-[#faae33] px-[10px] py-[6px] text-[10px] font-bold text-[#823513] hover:bg-[#ffcb78]" onClick={() => navigate("/snacks")}>
            <LuCookie className="text-[18px]" />
            <span>SNACKS</span>
          </li>

          <li className="relative flex cursor-pointer flex-col items-center justify-center gap-0.5 rounded-2xl bg-[#faae33] px-[12px] py-[6px] text-[10px] font-bold text-[#823513] hover:bg-[#ffcb78]" onClick={() => navigate("/cart")}>
            <div className="relative">
              <BsCart4 className="text-[18px]" />
              <span className="absolute -right-2.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ffcb78] text-[9px] font-bold text-[#823513]">
                10
              </span>
            </div>
            <span>CART</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
