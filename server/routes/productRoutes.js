import express from "express";
import upload from "../middlewares/multer.js";
import { addProduct, listProduct, removeProduct } from "../controllers/productController.js";
import adminAuth from "../middlewares/adminAuth.js";


let productRoutes = express.Router();

productRoutes.post("/addproduct", upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 }]),
  addProduct
)
productRoutes.get("/list", listProduct);
productRoutes.post("/remove/:id", adminAuth, removeProduct);


export default productRoutes