import express from "express";
import {
  allOrders,
  PlaceOrder,
  placeOrderRazorpay,
  razorpayWebhook,
  updateSatus,
  userOrders,
  verifyRazorpayPayment,
} from "../controllers/orderController.js";
import isAuth from "../middlewares/isAuth.js";
import adminAuth from "../middlewares/adminAuth.js";

const orderRoutes = express.Router();

orderRoutes.post("/razorpay/webhook", razorpayWebhook);

// for user
orderRoutes.post("/placeorder",isAuth, PlaceOrder);
orderRoutes.post("/razorpay",isAuth, placeOrderRazorpay);
orderRoutes.post("/razorpay/verify",isAuth, verifyRazorpayPayment);
orderRoutes.post("/userorder",isAuth, userOrders);


//for admin
orderRoutes.get("/list",adminAuth, allOrders);
orderRoutes.post("/status",adminAuth, updateSatus);






export default orderRoutes;