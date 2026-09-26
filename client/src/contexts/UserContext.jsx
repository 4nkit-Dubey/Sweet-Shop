import React from "react";
import { createContext, useContext, useState } from "react";
import { authDataContext } from "./AuthContext.jsx";
import axios from "axios";
import { useEffect } from "react";

export const userDataContext = createContext();

function UserContext ({ children }) {
  const [userData, setUserData] = useState("");
  const {serverUrl} = useContext(authDataContext);
  const getCurrentUser = async () => {
    try {
      const response = await axios.get(serverUrl + "/api/user/currentUser", {
        withCredentials: true,
      });
      setUserData(response.data);
      // console.log(response.data);
    } catch (error) {
      setUserData(null);
      if (error.response?.status !== 401) {
        console.error("Error fetching current user:", error);
      }
    }
  };


  useEffect(() => {
    getCurrentUser();
  }, []);
  let value = {
    userData,setUserData,getCurrentUser
  };
  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  );
};

export default UserContext;
