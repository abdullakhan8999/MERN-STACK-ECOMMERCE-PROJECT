const Product = require("../Models/Product.Model");
const ErrorHandler = require("../Utils/ErrorHandler");
const catchAsyncError = require("../Middleware/catchAsyncError");

//Create Product --Admin only
exports.createProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
  // try {
  //   const product = await Product.create(req.body);
  //   res.status(201).json({
  //     success: true,
  //     product,
  //   });
  // } catch (err) {
  //   console.log(`Error: Product creation failed. Reason: ${err.message}`);
  //   res.status(400).json({
  //     success: false,
  //     error: err.message,
  //   });
  // }
});

//Update product by id --Admin only
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });

  // try {
  //   let product = await Product.findById(req.params.id);
  //   if (!product) {
  //     return next(new ErrorHandler("Product not found", 404));
  //   }

  //   product = await Product.findByIdAndUpdate(req.params.id, req.body, {
  //     new: true,
  //     runValidators: true,
  //     useFindAndModify: false,
  //   });
  //   res.status(200).json({
  //     success: true,
  //     product,
  //   });
  // } catch (err) {
  //   console.log(`Error: Product update failed. Reason: ${err.message}`);
  //   res.status(400).json({
  //     success: false,
  //     error: err.message,
  //   });
  // }
});

//Delete product by id --Admin only
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: `${product.name} Product deleted successfully.`,
  });
  // try {
  //   let product = await Product.findById(req.params.id);
  //   if (!product) {
  //     return next(new ErrorHandler("Product not found", 404));
  //   }

  //   product = await Product.findByIdAndDelete(req.params.id);
  //   res.status(200).json({
  //     success: true,
  //     message: `${product.name} Product deleted successfully.`,
  //   });
  // } catch (err) {
  //   console.log(`Error: Product delete failed. Reason: ${err.message}`);
  //   res.status(400).json({
  //     success: false,
  //     error: err.message,
  //   });
  // }
});

//get Product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
  // try {
  //   let product = await Product.findById(req.params.id);
  //   if (!product) {
  //     return next(new ErrorHandler("Product not found", 404));
  //   }

  //   res.status(200).json({
  //     success: true,
  //     product,
  //   });
  // } catch (err) {
  //   console.log(`Error: Product fetch failed. Reason: ${err.message}`);
  //   res.status(400).json({
  //     success: false,
  //     error: err.message,
  //   });
  // }
});

// Get all product
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const product = await Product.find();
  res.status(200).json({
    success: true,
    product,
  });
  // try {
  //   const product = await Product.find();
  //   res.status(200).json({
  //     success: true,
  //     product,
  //   });
  // } catch (err) {
  //   console.log(`Error: Product fetch failed. Reason: ${err.message}`);
  //   res.status(400).json({
  //     success: false,
  //     error: err.message,
  //   });
  // }
});
