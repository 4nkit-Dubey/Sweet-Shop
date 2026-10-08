import React, { useContext } from "react";
import { shopDataContext } from "../contexts/ShopContext";
import { useNavigate } from "react-router-dom";

const Card = ({ name, image, id, price }) => {
  const { currency } = useContext(shopDataContext);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/productdetail/${id}`)}
      className="group flex h-full w-full flex-col bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#a5faf7]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(165,250,247,0.15)] hover:-translate-y-1"
    >
      {/* Image container */}
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Card footer */}
      <div className="p-3 md:p-4 flex flex-col gap-1">
        <p className="text-[#c3f6fa] text-sm md:text-base font-semibold leading-tight line-clamp-2">
          {name}
        </p>
        <p className="text-[#a5faf7] text-sm md:text-base font-bold">
          {currency}{price}
        </p>
      </div>
    </div>
  );
};

export default Card;
