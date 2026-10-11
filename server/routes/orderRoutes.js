import express from "express";
import { allOrders, PlaceOrder, updateSatus, userOrders } from "../controllers/orderController.js";
import isAuth from "../middlewares/isAuth.js";
import adminAuth from "../middlewares/adminAuth.js";

const orderRoutes = express.Router();


// for user
orderRoutes.post("/placeorder",isAuth, PlaceOrder);
orderRoutes.post("/userorder",isAuth, userOrders);


//for admin
orderRoutes.get("/list",adminAuth, allOrders);
orderRoutes.post("/status",adminAuth, updateSatus);






export default orderRoutes;