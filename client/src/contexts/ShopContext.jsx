import logger from "../utils/logger.js";
import { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import { userDataContext } from "./UserContext";
import axios from "axios";

export const shopDataContext = createContext();

const ShopContext = ({ children }) => {
  let [products, setProducts] = useState([]);
  let { serverUrl } = useContext(authDataContext);
  let { userData } = useContext(userDataContext);
  let currency = "₹";
  let delivery_Fee = 50;
  let [cartItem, setCartItem] = useState({});

  const getProducts = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list");
      logger.log(result.data);
      setProducts(result.data.product);
    } catch (error) {
      logger.log("Error fetching products:", error);
    }
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      logger.log("Select product size");
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
    if (userData) {
      try {
        let result = await axios.post(
          serverUrl + "/api/cart/add",
          { itemId, size },
          { withCredentials: true },
        );
        logger.log(result.data);
      } catch (error) {
        logger.log(error);
      }
    } else {
      logger.log("User not logged in. Cart data will not be saved to server.");
    }
  };

  const getUserCart = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/cart/get",
        {},
        { withCredentials: true },
      );
      setCartItem(result.data.cartData);
    } catch (error) {
      logger.log("Error fetching user cart:", error);
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);
    if (userData) {
      try {
        await axios.post(
          serverUrl + "/api/cart/update",
          { itemId, size, quantity },
          { withCredentials: true },
        );
      } catch (error) {
        logger.log("Error updating cart quantity:", error);
      }
    }
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

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] >0) {
            totalAmount += itemInfo.price * cartItem[items][item]; 
          }
        } catch (error) {
          
        }
      }
    }
    return totalAmount;
  }

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    if (userData) {
      getUserCart();
    }
  }, [userData]);

  let value = {
    products,
    currency,
    delivery_Fee,
    getProducts,
    cartItem,
    addToCart,
    getCartCount,
    setCartItem,
    updateQuantity,
    getCartAmount
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
