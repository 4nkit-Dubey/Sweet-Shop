import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Razorpay from "razorpay";
import {
  isCapturedPaymentForOrder,
  verifyRazorpayPaymentSignature,
  verifyRazorpayWebhookSignature,
} from "../utils/razorpayVerification.js";

const DELIVERY_FEE = 50;

const getRazorpayInstance = () => {
  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    const error = new Error("Razorpay is not configured on the server.");
    error.status = 503;
    throw error;
  }

  return new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
  });
};

const buildOrderDetails = async (items, address) => {
  if (
    !Array.isArray(items) ||
    items.length === 0 ||
    !address ||
    typeof address !== "object"
  ) {
    const error = new Error("Order items and delivery address are required.");
    error.status = 400;
    throw error;
  }

  const orderItems = [];
  let subtotal = 0;
  for (const item of items) {
    if (
      !item?._id ||
      !item.size ||
      !Number.isSafeInteger(Number(item.quantity)) ||
      Number(item.quantity) < 1
    ) {
      const error = new Error("The order contains an invalid item.");
      error.status = 400;
      throw error;
    }

    const product = await Product.findById(item._id);
    if (!product || !product.quantity.includes(item.size)) {
      const error = new Error("A product or selected size is no longer available.");
      error.status = 400;
      throw error;
    }

    const quantity = Number(item.quantity);
    subtotal += product.price * quantity;
    orderItems.push({
      ...product.toObject(),
      size: item.size,
      quantity,
    });
  }

  return {
    items: orderItems,
    amount: subtotal + DELIVERY_FEE,
    address,
  };
};

const getErrorResponse = (error, fallbackMessage) => ({
  status: error.status || 500,
  message: error.status ? error.message : fallbackMessage,
});

// for user
export const PlaceOrder = async (req, res) => {
  try {
    const orderDetails = await buildOrderDetails(req.body.items, req.body.address);
    const order = await Order.create({
      ...orderDetails,
      userId: req.userId,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    });

    await User.findByIdAndUpdate(req.userId, { cartData: {} });
    return res.status(201).json({ message: "Order placed successfully.", orderId: order._id });
  } catch (error) {
    console.error("Failed to place cash-on-delivery order:", error);
    const response = getErrorResponse(error, "Order placement failed.");
    return res.status(response.status).json({ message: response.message });
  }
};

export const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId });
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Failed to get user orders:", error);
    return res.status(500).json({ message: "Failed to get orders." });
  }
};

export const placeOrderRazorpay = async (req, res) => {
  let savedOrder;
  try {
    const orderDetails = await buildOrderDetails(req.body.items, req.body.address);
    const razorpayInstance = getRazorpayInstance();

    savedOrder = await Order.create({
      ...orderDetails,
      userId: req.userId,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    });

    const razorpayOrder = await razorpayInstance.orders.create({
      amount: Math.round(orderDetails.amount * 100),
      currency: "INR",
      receipt: savedOrder._id.toString(),
    });

    savedOrder.razorpayOrderId = razorpayOrder.id;
    await savedOrder.save();

    return res.status(201).json({
      order: razorpayOrder,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    if (savedOrder) {
      try {
        await Order.findByIdAndDelete(savedOrder._id);
      } catch (cleanupError) {
        console.error("Failed to clean up incomplete Razorpay order:", cleanupError);
      }
    }
    console.error("Failed to create Razorpay order:", error);
    const response = getErrorResponse(error, "Unable to start Razorpay checkout.");
    return res.status(response.status).json({ message: response.message });
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      razorpay_signature: razorpaySignature,
    } = req.body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({ message: "Payment verification details are incomplete." });
    }

    const razorpayInstance = getRazorpayInstance();
    const order = await Order.findOne({
      razorpayOrderId,
      userId: req.userId,
    });
    if (!order) {
      return res.status(404).json({ message: "Payment order not found." });
    }
    if (
      !verifyRazorpayPaymentSignature({
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
        secret: process.env.RAZORPAY_KEY_SECRET,
      })
    ) {
      return res.status(400).json({ message: "Payment signature verification failed." });
    }
    if (order.payment) {
      if (order.paymentId !== razorpayPaymentId) {
        return res.status(400).json({ message: "A different payment has already been verified." });
      }
      await User.findByIdAndUpdate(req.userId, { cartData: {} });
      return res.status(200).json({ message: "Payment already verified." });
    }

    let payment = await razorpayInstance.payments.fetch(razorpayPaymentId);
    if (payment.status === "authorized") {
      payment = await razorpayInstance.payments.capture(
        razorpayPaymentId,
        payment.amount,
        "INR",
      );
    }
    if (!isCapturedPaymentForOrder(payment, order)) {
      return res.status(400).json({ message: "The Razorpay payment is not fully captured." });
    }

    order.payment = true;
    order.paymentId = razorpayPaymentId;
    await order.save();
    await User.findByIdAndUpdate(req.userId, { cartData: {} });

    return res.status(200).json({ message: "Payment verified successfully." });
  } catch (error) {
    console.error("Failed to verify Razorpay payment:", error);
    return res.status(500).json({ message: "Unable to verify payment. Please contact support." });
  }
};

export const razorpayWebhook = async (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.get("x-razorpay-signature");
  if (
    !webhookSecret ||
    !verifyRazorpayWebhookSignature({
      body: req.rawBody,
      signature,
      secret: webhookSecret,
    })
  ) {
    return res.status(400).json({ message: "Invalid Razorpay webhook signature." });
  }

  try {
    const event = req.body?.event;
    if (event !== "payment.captured" && event !== "order.paid") {
      return res.status(200).json({ message: "Event ignored." });
    }

    const payment = req.body?.payload?.payment?.entity;
    const razorpayOrderId =
      payment?.order_id || req.body?.payload?.order?.entity?.id;
    if (!payment?.id || !razorpayOrderId) {
      return res.status(400).json({ message: "Webhook payment details are incomplete." });
    }

    const order = await Order.findOne({ razorpayOrderId });
    if (!order) {
      return res.status(404).json({ message: "Matching order not found." });
    }
    if (!isCapturedPaymentForOrder(payment, order)) {
      return res.status(400).json({ message: "Webhook payment does not match the order." });
    }
    if (order.payment && order.paymentId === payment.id) {
      await User.findByIdAndUpdate(order.userId, { cartData: {} });
      return res.status(200).json({ message: "Payment already recorded." });
    }
    if (order.payment) {
      return res.status(409).json({ message: "A different payment is already recorded." });
    }

    order.payment = true;
    order.paymentId = payment.id;
    await order.save();
    await User.findByIdAndUpdate(order.userId, { cartData: {} });
    return res.status(200).json({ message: "Payment recorded successfully." });
  } catch (error) {
    console.error("Failed to process Razorpay webhook:", error);
    return res.status(500).json({ message: "Failed to process Razorpay webhook." });
  }
};

// for admin
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Failed to get orders:", error);
    return res.status(500).json({ message: "Failed to get orders." });
  }
};

export const updateSatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { status });
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    return res.status(200).json({ message: "Order status updated successfully." });
  } catch (error) {
    console.error("Failed to update order status:", error);
    return res.status(500).json({ message: "Failed to update order status." });
  }
};
