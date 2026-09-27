import React from "react";
import bannerImage1 from "../assets/1.jpg";
import bannerImage2 from "../assets/2.jpg";
import bannerImage3 from "../assets/3.jpg";
import bannerImage4 from "../assets/4.jpg";
import bannerImage5 from "../assets/5.jpg";

const Background = ({ heroCount }) => {
  if (heroCount === 0) {
    return (
      <img
        src={bannerImage5}
        alt="banner5"
        className="w-[100%] h-[80%] float-left overflow-auto object-cover"
      />
    );
  }
  if (heroCount === 1) {
    return (
      <img
        src={bannerImage2}
        alt="banner2"
        className="w-[100%] h-[80%] float-left overflow-auto object-cover"
      />
    );
  }
  if (heroCount === 2) {
    return (
      <img
        src={bannerImage3}
        alt="banner3"
        className="w-[100%] h-[80%] float-left overflow-auto object-cover"
      />
    );
  }
  if (heroCount === 3) {
    return (
      <img
        src={bannerImage4}
        alt="banner4"
        className="w-[100%] h-[80%] float-left overflow-auto object-cover"
      />
    );
  }
  if (heroCount === 4) {
    return (
      <img
        src={bannerImage1}
        alt="banner1"
        className=" relative  h-[80%] float-left overflow-auto object-cover"
      />
    );
  }
};

export default Background;
