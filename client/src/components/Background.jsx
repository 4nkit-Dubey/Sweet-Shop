import React from "react";
import bannerImage1 from "../assets/1.jpg";
import bannerImage2 from "../assets/2.jpg";
import bannerImage3 from "../assets/3.jpg";
import bannerImage4 from "../assets/4.jpg";
import bannerImage5 from "../assets/5.jpg";

const bannerImages = [
  bannerImage5,
  bannerImage2,
  bannerImage3,
  bannerImage4,
  bannerImage1,
];

const Background = ({ heroCount }) => {
  return (
    <img
      src={bannerImages[heroCount] ?? bannerImages[0]}
      alt={`banner-${heroCount + 1}`}
      className="w-full h-auto max-h-[calc(100vh-100px)] sm:max-h-[calc(100vh-120px)] object-contain select-none transition-all duration-300 drop-shadow-md rounded-xl sm:rounded-2xl"
    />
  );
};

export default Background;
