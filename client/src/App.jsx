import { Route, Routes, useLocation } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import NavBar from "../src/components/navBar";


function App() {
  const location = useLocation();
  const hideNavBar = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </>
  );
}

export default App;
