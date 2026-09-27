import React from "react";
import { FaCircle } from "react-icons/fa6";

const Hero = ({ heroCount, setHeroCount }) => {
  return (
    <div className="absolute bottom-2.5 sm:bottom-3.5 md:bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-row items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3 bg-black/35 backdrop-blur-xs px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full shadow-md">
      {[0, 1, 2, 3, 4].map((index) => (
        <FaCircle
          key={index}
          className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5 cursor-pointer transition-all duration-300 drop-shadow-md ${
            heroCount === index
              ? "fill-white scale-125"
              : "fill-gray-400 hover:fill-gray-200"
          }`}
          onClick={() => setHeroCount(index)}
        />
      ))}
    </div>
  );
};

export default Hero;
