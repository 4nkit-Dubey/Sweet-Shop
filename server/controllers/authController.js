import bcrypt from "bcrypt";
import validator from "validator";
import User from "../models/userModel.js";
import { generateAdminToken, generateToken } from "../configs/token.js";



export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("User registered successfully");

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in registering user:", error);

    return res.status(500).json({
      message: `Register error: ${error.message}`,
    });
  }
};

export const login = async (req, res) => {


  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });



    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }



    let isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }


    let token = await generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
    console.log("User logged in successfully");


  } catch (error) {
    console.error("Error in login:", error);

    return res.status(500).json({
      message: `Login error: ${error.message}`,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logout successful",
    });

    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error in logout:", error);

    return res.status(500).json({
      message: `Logout error: ${error.message}`,
    });
  }
};

export const googleSignup = async (req, res) => {
  try {
    const { name, email, firebaseUid } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        firebaseUid,
        authProvider: "google",
      });
    }
    const token = await generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(user)
  }
  catch (error) {
    console.error("Error in googleSignup:", error);

    return res.status(500).json({
      message: `googleSignup error: ${error.message}`,
    });
  }
}

export const adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = await generateAdminToken(email);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000
      })
      return res.status(200).json(token);
    }
    return res.status(400).json({
      message: "Invalid admin credentials"
    })
  } catch (error) {
    console.log("Admin login error");
    return res.status(500).json({
      message: "Admin login error"
    })
  }
}