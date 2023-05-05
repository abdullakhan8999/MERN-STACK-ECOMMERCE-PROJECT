const Product = require("../Models/ProductModel");
const ErrorHandler = require("../Utils/ErrorHandler");
const catchAsyncError = require("../Middleware/catchAsyncError");
const ApiFeatures = require("../Utils/apiFeatures");

//Create Product --Admin only
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    product,
  });
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
    status: "success",
    product,
  });
});

//Delete product by id --Admin only
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: `${product.name} Product deleted successfully.`,
  });
});

//get Product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    status: "success",
    product,
  });
});

// Get all product
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  // Api take query , request parameters, Pagination
  const resultPerPage = 5;
  const productsCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({
    status: "success",
    productsCount,
    products,
  });
});

//Product review controllers
//create review or update review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  //get input
  const { rating, comment, productId } = req.body;

  //review details
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  // reviewed product
  if (!productId) return next(new ErrorHandler("Please enter productId", 400));
  const product = await Product.findById(productId);
  if (!product) return next(new ErrorHandler("Product doesn't exits!", 404));

  //find review of user and updating
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  //if product is reviewed then update review else add new review
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numberOfReview = product.reviews.length;
  }

  //calcu rating on product
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
  });
});

//get all review of a product
exports.getAllReviewOfProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    status: "success",
    ratings: product.ratings,
    reviews: product.reviews,
  });
});

//delete product reviews of product
exports.deleteReviewOfProduct = catchAsyncError(async (req, res, next) => {
  const productId = req.query.productId;
  const reviewId = req.query.id;

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== reviewId.toString()
  );

  let avgRating = 0;
  let numberOfReviews = reviews.length;

  reviews.forEach((review) => {
    avgRating += review.rating;
  });

  const ratings = numberOfReviews > 0 ? avgRating / numberOfReviews : 0;

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { reviews, ratings, numberOfReviews },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({
    status: "success",
    data: `Product name: ${updatedProduct.name}`,
  });
});

