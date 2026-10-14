import mongoose from "mongoose";
import logger from "../utils/logger.js";


const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    logger.log("DB connected");
  } catch (error) {
    logger.error("DB connection error:", error.message);
  }
}

export default connectDb;