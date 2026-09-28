import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "No token provided" })
    }
    let verifytoken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifytoken) {
      return res.status(400).json({ message: "Invalid token" })
    }
    req.adminEmail = process.env.ADMIN_EMAIL;
    next();

  } catch (error) {
    console.error("Error in adminAuth:", error);
    return res.status(500).json({
      message: `adminAuth error: ${error.message}`,
    });
  }
}

export default adminAuth;