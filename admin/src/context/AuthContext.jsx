import React, { createContext } from "react";






export const authDataContext = createContext();


const AuthContext = ({ children }) => {
  let serverUrl = "https://sweet-shop-backend-8srb.onrender.com";
  let value = {
    serverUrl,
  };
  return (
    <div>
      <authDataContext.Provider value={ value }>
        {children}
      </authDataContext.Provider>
    </div>
  );
};

export default AuthContext;
