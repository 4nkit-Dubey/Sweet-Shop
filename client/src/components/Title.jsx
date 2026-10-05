import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="flex flex-col items-center gap-2 mb-4">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide text-blue-100">
        {text1}{" "}
        <span className="text-[#a5faf7]">{text2}</span>
      </h2>
      {/* Decorative gradient divider */}
      <div className="h-[3px] w-24 rounded-full bg-gradient-to-r from-transparent via-[#a5faf7] to-transparent" />
    </div>
  );
};

export default Title;