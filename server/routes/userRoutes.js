import express from "express";
import { getAdmin, getCurrentUser } from "../controllers/userController.js"; 
import isAuth from "../middlewares/isAuth.js";
import adminAuth from "../middlewares/adminAuth.js";


const userRoutes = express.Router();
userRoutes.get("/currentUser",isAuth, getCurrentUser);
userRoutes.get("/admin", adminAuth, getAdmin);

export default userRoutes;