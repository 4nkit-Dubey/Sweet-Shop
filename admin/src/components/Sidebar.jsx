import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import logo from "../assets/favicon.png";
import { TiHomeOutline } from "react-icons/ti";

const Sidebar = () => {
  let navigate = useNavigate();

  const menuItems = [
    {
      icon: <TiHomeOutline className="w-5 h-5 shrink-0" />,
      label: "Home",
      path: "/",
    },
    {
      icon: <IoMdAddCircleOutline className="w-5 h-5 shrink-0" />,
      label: "Add Items",
      path: "/add",
    },
    {
      icon: <FaRegListAlt className="w-5 h-5 shrink-0" />,
      label: "List Items",
      path: "/lists",
    },
    {
      icon: <SiTicktick className="w-5 h-5 shrink-0" />,
      label: "View Order",
      path: "/order",
    },
  ];

  return (
    <>
      {/* ── DESKTOP SIDEBAR (md and above) ── */}
      <div className="hidden md:block w-[18%] min-h-screen py-20 fixed left-0 top-0 z-30">
        <div className="w-full h-screen border-r-2 border-dashed border-[#e3b566]">
          <div className="flex flex-col gap-3 pt-10 pl-[20%] text-[15px]">
            {menuItems.map((item) => (
              <div
                key={item.path}
                title={item.label}
                className="flex items-center justify-start gap-3 border-2 border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89] text-white font-bold transition-colors duration-200"
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                <span className="whitespace-nowrap">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE BOTTOM BAR (below md) ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t-2 border-dashed border-[#e3b566] bg-[#ecfafaec]">
        <div className="flex items-center justify-around py-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              title={item.label}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl text-[#3b0d0d] cursor-pointer hover:text-[#7f1d1d] hover:bg-[#e3b566]/15 active:bg-[#e3b566]/25 transition-all duration-200"
            >
              {item.icon}
              <span className="text-[9px] font-semibold tracking-wide">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
