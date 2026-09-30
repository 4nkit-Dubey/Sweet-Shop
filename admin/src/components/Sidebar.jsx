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
    <div className="w-16 md:w-[18%] min-h-screen py-20 fixed left-0 top-0 z-30">
      <div className="w-full h-screen border-r-2 border-dashed border-[#e3b566]">


        {/* Menu Items */}
        <div className="flex flex-col gap-3 pt-4 pl-[20%]  md:pt-10 md:pl-[20%] text-[15px]">
          {menuItems.map((item) => (
            <div
              key={item.path}
              title={item.label}
              className="flex items-center justify-center md:justify-start gap-3 border-2 border-gray-200 border-r-0 px-2 md:px-3 py-2 cursor-pointer hover:bg-[#2c7b89] text-white font-bold transition-colors duration-200"
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span className="hidden md:inline whitespace-nowrap">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
