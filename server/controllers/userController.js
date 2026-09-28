import User from "../models/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return res.status(500).json({
      message: `getCurrentUser error: ${error.message}`,
    });
  }
}

export const getAdmin = async (req, res) => {
  try {
    let adminEmail = req.adminEmail;
    if (!adminEmail) {
      return res.status(404).json({
        message: "Admin email not found",
      });
    }
    return res.status(201).json({ email: adminEmail, role: "admin" });
  } catch (error) {
    console.error("Error in getAdmin:", error);
    return res.status(500).json({
      message: `getAdmin error: ${error.message}`,
    });
  }
}