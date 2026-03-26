import Product from "../models/Product.js";
import sendLowStockEmail from "../utils/emailService.js";

// Add Product
export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Send response immediately
    res.json(updatedProduct);

    // LOW STOCK CHECK (background)
    if (updatedProduct.stock <= 5) {

      console.log("Low stock detected:", updatedProduct.name, updatedProduct.stock);

      sendLowStockEmail(updatedProduct.name, updatedProduct.stock)
        .then(() => console.log("Email sent"))
        .catch(err => console.log("Email failed:", err.message));

    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};