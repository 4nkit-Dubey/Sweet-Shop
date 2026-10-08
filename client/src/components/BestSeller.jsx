import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { shopDataContext } from "../contexts/ShopContext";
import Card from "./Card";

const BestSeller = () => {
  const { products } = useContext(shopDataContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    // Show the next 4 products after LatestCollections (index 8-11) as best sellers
    // In future, filter by a `bestseller` flag from backend
    const filtered = products.filter((p) => p.bestseller).slice(0, 4);
    setBestSellers(filtered.length > 0 ? filtered : products.slice(8, 12));
  }, [products]);

  if (bestSellers.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-7xl py-12 px-4 sm:px-6 md:py-16 lg:px-8">
      {/* Thin separator */}
      <div className="w-full max-w-4xl mx-auto mb-12 h-px bg-gradient-to-r from-transparent via-[#a5faf7]/30 to-transparent" />

      {/* Section header */}
      <div className="text-center mb-10">
        <Title text1="BEST" text2="SELLERS" />
        <p className="max-w-xl mx-auto text-sm md:text-base text-blue-200/80 leading-relaxed mt-3">
          Our customers' all-time favourites — tried, tested & loved!
        </p>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 lg:gap-8">
        {bestSellers.map((item, index) => (
          <Card
            key={item._id ?? index}
            name={item.name}
            image={item.image1}
            id={item._id}
            price={item.price}
          />
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
