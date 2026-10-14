import React from 'react'
import {createContext} from 'react'
export const authDataContext = createContext()

function AuthContext({children}) {
  let serverUrl = "https://sweet-shop-backend-8srb.onrender.com"
  let value = {
    serverUrl: serverUrl,
  }
  return (
    <div>
      <authDataContext.Provider value = {value}>
        {children}
      </authDataContext.Provider>
    </div>
  )
}

export default AuthContext
