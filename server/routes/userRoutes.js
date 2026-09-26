import express from "express";
import { getCurrentUser } from "../controllers/userController.js"; 
import isAuth from "../middlewares/isAuth.js";


const userRoutes = express.Router();
userRoutes.get("/currentUser",isAuth, getCurrentUser);

export default userRoutes;