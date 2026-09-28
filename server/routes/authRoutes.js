import express from "express";
import { adminLogin, googleSignup, login, logout, registration } from "../controllers/authController.js";


const authRoutes = express.Router();
authRoutes.post("/registration", registration);
authRoutes.post("/login", login);
authRoutes.get("/logout", logout);
authRoutes.post("/googleSignup", googleSignup);
authRoutes.post("/adminLogin", adminLogin);

export default authRoutes;