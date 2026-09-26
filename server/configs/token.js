import jwt from "jsonwebtoken";

export const generateToken = async (userId) => {
    try{
      const token = await jwt.sign({userId}, process.env.JWT_SECRET);
      return token;
    }catch(error){
        console.log("Error in generating token");
    }
}