import Order from "../models/orderModel.js";
import User from "../models/userModel.js";




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