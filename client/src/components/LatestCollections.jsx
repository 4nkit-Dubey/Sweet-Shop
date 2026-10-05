import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { shopDataContext } from "../contexts/ShopContext";
import Card from "./Card";

const LatestCollections = () => {
  const { products } = useContext(shopDataContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 8));
  }, [products]);

  return (
    <section className="w-full py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      {/* Section header */}
      <div className="text-center mb-10">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="max-w-xl mx-auto text-sm md:text-base text-blue-200/80 leading-relaxed mt-3">
          Pure ingredients, authentic flavor. Order our latest sweets and snacks today!
        </p>
      </div>

      {/* Products grid */}
      {latestProducts.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <p className="text-blue-200/50 text-sm">Loading products...</p>
        </div>
      ) : (
        <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-6 lg:gap-8">
          {latestProducts.map((item, index) => (
            <Card
              key={item._id ?? index}
              name={item.name}
              image={item.image1}
              id={item._id}
              price={item.price}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestCollections;
