const Product = require("../Models/Product.Model");

//Create Product
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      message: true,
      product,
    });
  } catch (err) {
    console.log(`Error: Product creation failed. Reason: ${err.message}`);
    res.status(400).json({
      message: false,
      error: err.message,
    });
  }
};



exports.getAllProducts = (req, res, next) => {
  res.json({ message: "Get all products" });
};
