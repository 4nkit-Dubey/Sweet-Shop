import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AuthContext from "./contexts/AuthContext.jsx";
import UserContext from "./contexts/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContext>
      <UserContext>
        <App />
      </UserContext>
    </AuthContext>
  </BrowserRouter>,
);
