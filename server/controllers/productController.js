import uploadOnCloudinary from "../configs/cloudinary.js";
import Product from "../models/productModel.js";

export const addProduct = async (req, res) => {
  try {
    let { name, description, price, category, subCategory, quantity, bestSeller } = req.body;
    const imageFields = ["image1", "image2", "image3", "image4"];

    if (imageFields.some((field) => !req.files?.[field]?.[0])) {
      return res.status(400).json({ message: "All four product images are required" });
    }

    if (!name?.trim() || !description?.trim() || !category || !subCategory) {
      return res.status(400).json({ message: "Product details are incomplete" });
    }

    const parsedPrice = Number(price);
    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      return res.status(400).json({ message: "Price must be a valid non-negative number" });
    }

    let parsedQuantity;
    try {
      parsedQuantity = JSON.parse(quantity);
    } catch {
      return res.status(400).json({ message: "Quantity must be a JSON array of sizes" });
    }

    if (!Array.isArray(parsedQuantity) || parsedQuantity.length === 0 || parsedQuantity.some((item) => typeof item !== "string" || !item.trim())) {
      return res.status(400).json({ message: "Select at least one valid product quantity" });
    }

    const [image1, image2, image3, image4] = await Promise.all(
      imageFields.map((field) => uploadOnCloudinary(req.files[field][0].path)),
    );

    let productData = {
      name,
      description,
      price: parsedPrice,
      category,
      subCategory,
      quantity: parsedQuantity,
      bestSeller: bestSeller === "true" ? true : false,
      date: Date.now(),
      image1,
      image2,
      image3,
      image4
    }

    const product = await Product.create(productData);
    return res.status(201).json({
      message: "Product added successfully",
      product
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({
      message: "Error adding product",
      error: error.message
    });
  }
}

export const listProduct = async (req, res) => {
  try {
    const product = await Product.find({});
    return res.status(200).json({
      product
    })
  } catch (error) {
    console.log("ListProduct error")
    return res.status(500).json({
      message : `ListProduct error ${error}`
    })
  }
}


export const removeProduct = async(req, res) =>{
  try {
    let {id} = req.params;
    const product = await Product.findByIdAndDelete(id)
    return res.status(200).json(product)
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message : `Remove Product error ${error}`
    })
  }
}