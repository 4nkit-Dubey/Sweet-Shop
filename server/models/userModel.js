import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String, required: function () {
      return this.authProvider === "local";
    }
  },

  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local"
  },
  firebaseUid: {
    type: String,
    unique: true,
    sparse: true
  },
  cartData: {
    type: Object,
    default: {},
  },
}, { timestamps: true, minimize: false })

const User = mongoose.model("User", userschema)

export default User;