import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "user doesn't have token",
      });
    }
    const verifytoken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifytoken) {
      return res.status(401).json({
        message: "user doesn't have a valid token",
      });
    }

    req.userId = verifytoken.userId;
    next();

  } catch (error) {
    console.error("Error in isAuth:", error);
    return res.status(500).json({
      message: `isAuth error: ${error.message}`,
    });
  }
}

export default isAuth;