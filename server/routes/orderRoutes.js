import express from "express";
import { PlaceOrder, userOrders } from "../controllers/orderController.js";
import isAuth from "../middlewares/isAuth.js";

const orderRoutes = express.Router();

orderRoutes.post("/placeorder",isAuth, PlaceOrder);
orderRoutes.post("/userorder",isAuth, userOrders);







export default orderRoutes;