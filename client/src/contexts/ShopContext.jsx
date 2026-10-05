import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const shopDataContext = createContext();

const ShopContext = ({ children }) => {
  let [products, setProducts] = useState([]);
  let { serverUrl } = useContext(authDataContext);
  let currency = "₹";
  let delivery_Fee = 50;

  const getProducts = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list");
      console.log(result.data);
      setProducts(result.data.product);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  let value = {
    products,
    currency,
    delivery_Fee,
    getProducts,
  };
  return (
    <div>
      <shopDataContext.Provider value={value}>
        {children}
      </shopDataContext.Provider>
    </div>
  );
};

export default ShopContext;
