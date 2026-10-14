import logger from "../utils/logger.js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const adminDataContext = createContext();
const AdminContext = ({ children }) => {
  let [adminData, setAdminData] = useState(null);
  let { serverUrl } = useContext(authDataContext);

  const getAdmin = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/user/admin", {
        withCredentials: true,
      });
      setAdminData(result.data);
      logger.log(result.data);
    } catch (error) {
      setAdminData(null);
      logger.log(error);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  let value = {
    adminData,
    setAdminData,
    getAdmin,
  }; 
  return (
    <div>
      <adminDataContext.Provider value={value}>
        {children}
      </adminDataContext.Provider>
    </div>
  );
};

export default AdminContext;
