import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

export const generateToken = async (userId) => {
    try{
      const token = await jwt.sign({userId}, process.env.JWT_SECRET);
      return token;
    }catch(error){
        logger.log("Error in generating token");
    }
}
export const generateAdminToken = async (email) => {
    try{
      const token = await jwt.sign({email}, process.env.JWT_SECRET);
      return token;
    }catch(error){
        logger.log("Error in generating token");
    }
}