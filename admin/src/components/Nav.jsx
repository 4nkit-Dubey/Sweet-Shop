import React, { useContext } from 'react'
import logo from '../assets/favicon.png';
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';


const Nav = () => {
  let navigate = useNavigate(); 
  const {serverUrl} = useContext(authDataContext);
  let {adminData, getAdmin} = useContext(adminDataContext);
  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      console.log(result.data);
      await getAdmin();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }
  return (
    <nav className="fixed left-0 top-0 z-40 flex h-20 w-full items-center justify-between gap-4 border-b-2 border-dashed border-[#e3b566] px-4 sm:px-8">
          {/* ================= LEFT : LOGO + NAME ================= */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#7f1d1d] ring-1 ring-[#e3b566]/60 sm:h-12 sm:w-12">
              <img
                src={logo}
                alt="Maa Vindhyavasini Sweets logo"
                className="h-full w-full object-contain"
              />
            </div>
    
            <div className="min-w-0 leading-tight">
              <span className="block truncate font-serif text-base font-bold tracking-tight text-white sm:text-xl">
                Maa Vindhyavasini Sweets
              </span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-white /70 sm:text-xs">
                Admin panel
              </span>
            </div>
          </div>
    
          {/* ================= RIGHT : LOGOUT ================= */}
          <button
            type="button"
            aria-label="Logout"
            title="Logout"
            className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-[#7f1d1d] px-3 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#681818] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7f1d1d] focus-visible:ring-offset-2 active:scale-[0.98] sm:px-4"
            onClick={handleLogout}
          >
            <CgLogOut className="text-[18px]" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </nav>
  )
}

export default Nav
