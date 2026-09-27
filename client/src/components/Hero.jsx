import React from "react";
import { FaCircle } from "react-icons/fa6";

const Hero = ({ heroData, heroCount, setHeroCount }) => {
  return (
    <div className="w-[40%] h-[100%] relative">

      {/* Doted slider code */}
      <div className="absolute display-flex md:top-[400px] lg:top-[500px] top-[160px] left-[10%] flex-items-center justify-center gap-[10px] flex-direction-row">
        <FaCircle
          className={`w-[14px] ${heroCount === 0 ? "fill-white" : "fill-gray-400"}`}
          onClick={() => {
            setHeroCount(0);
          }}
        />

        <FaCircle
          className={`w-[14px] ${heroCount === 1 ? "fill-white" : "fill-gray-400"}`}
          onClick={() => {
            setHeroCount(1);
          }}
        />

        <FaCircle
          className={`w-[14px] ${heroCount === 2 ? "fill-white" : "fill-gray-400"}`}
          onClick={() => {
            setHeroCount(2);
          }}
        />

        <FaCircle
          className={`w-[14px] ${heroCount === 3 ? "fill-white" : "fill-gray-400"}`}
          onClick={() => {
            setHeroCount(3);
          }}
        />

        <FaCircle
          className={`w-[14px] ${heroCount === 4 ? "fill-white" : "fill-gray-400"}`}
          onClick={() => {
            setHeroCount(4);
          }}
        />
      </div>
    </div>
  );
};

export default Hero;
