import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const shopDataContext = createContext();

const ShopContext = ({ children }) => {
  let [products, setProducts] = useState([]);
  let { serverUrl } = useContext(authDataContext);
  let currency = "₹";
  let delivery_Fee = 50;
  let [cartItem, setCartItem] = useState({});

  const getProducts = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list");
      console.log(result.data);
      setProducts(result.data.product);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      console.log("Select product size");
      return;
    }
    let cartData = structuredClone(cartItem);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItem(cartData);
    console.log(cartData)
  };
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  useEffect(() => {
    getProducts();
  }, []);

  let value = {
    products,
    currency,
    delivery_Fee,
    getProducts,
    cartItem,
    addToCart,
    getCartCount,
    setCartItem,
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
