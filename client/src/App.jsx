import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import NavBar from "../src/components/navBar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Sweets from "./pages/Sweets";
import Snacks from "./pages/Snacks";
import Product from "./pages/Product";
import { useContext } from "react";
import { userDataContext } from "./contexts/UserContext";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import NotFound from "./pages/NotFound";
import Ai from "./components/Ai";

function App() {
  let { userData } = useContext(userDataContext);
  const location = useLocation();
  const hideNavBar = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      <Toaster theme="dark" position="top-right" className="hidden md:block" />
      <Toaster theme="dark" position="bottom-center" className="md:hidden" />
      {!hideNavBar && <NavBar />}
      <Routes>
        <Route
          path="/login"
          element={
            userData ? <Navigate to={location.state?.from || "/"} /> : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            userData ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <Registration />
            )
          }
        />
        <Route
          path="/"
          element={
            userData ? (
              <Home />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/search"
          element={
            userData ? (
              <SearchPage />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/about"
          element={
            userData ? (
              <About />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/contact"
          element={
            userData ? (
              <Contact />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/sweets"
          element={
            userData ? (
              <Sweets />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/product"
          element={
            userData ? (
              <Product />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/snacks"
          element={
            userData ? (
              <Snacks />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/productdetail/:productId"
          element={
            userData ? (
              <ProductDetails />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/cart"
          element={
            userData ? (
              <Cart />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/placeorder"
          element={
            userData ? (
              <PlaceOrder />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/order"
          element={
            userData ? (
              <Order />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Ai />
    </>
  );
}

export default App;
