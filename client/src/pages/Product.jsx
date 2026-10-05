import React from "react";
import LatestCollections from "../components/LatestCollections";
import BestSeller from "../components/BestSeller";

const Product = () => {
  return (
    <div className="w-full bg-gradient-to-b from-[#0c2025] to-[#141414]">
      <LatestCollections />
      <BestSeller />
    </div>
  );
};

export default Product;
