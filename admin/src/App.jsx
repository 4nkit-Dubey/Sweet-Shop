import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Lists from "./pages/Lists";
import Login from "./pages/Login";
import Order from "./pages/Order";
import NotFound from "./pages/NotFound";
import { adminDataContext } from "./context/AdminContext";

const App = () => {
  let { adminData } = useContext(adminDataContext);
  return (
    <>
      <Toaster theme="dark" position="top-right" className="hidden md:block" />
      <Toaster theme="dark" position="bottom-center" className="md:hidden" />
      {!adminData ? (
        <Login />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/login" element={<Login />} />
            <Route path="/order" element={<Order />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
