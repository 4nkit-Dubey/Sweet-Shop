import Order from "../models/orderModel.js";
import User from "../models/userModel.js";



// for user
export const PlaceOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;
    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now()
    }
    const newOrder = new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });
    res.status(201).json({ message: "Order Placed Successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Order Placed Failed" });

  }
}

export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId });
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get orders" });
  }
}


//for admin
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get orders" });
  }
}

export const updateSatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { status });
    return res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update order status" });
  }
}