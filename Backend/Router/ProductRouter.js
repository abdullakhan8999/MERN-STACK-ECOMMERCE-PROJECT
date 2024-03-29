const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAllReviewOfProduct,
  deleteReviewOfProduct,
  addCarouselItem
} = require("../Controller/ProductController");
const { isAuthenticatedUser, authorizedRoles } = require("../Middleware/auth");

const router = express.Router();

//User and Admin routes
//Products Details Routes
router.route("/products").get(getAllProducts);

//Product Details Routes
router.route("/product/:id").get(getProductDetails);

//Admin routes
//Product Create, Details, delete and update Routes
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);

// Add product review
router.route("/product/review").put(isAuthenticatedUser, createProductReview);

// get All Review Of Product
router
  .route("/review")
  .get(isAuthenticatedUser, getAllReviewOfProduct)
  .delete(isAuthenticatedUser, deleteReviewOfProduct);


module.exports = router;
