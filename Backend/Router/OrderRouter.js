const express = require("express");
const { isAuthenticatedUser, authorizedRoles } = require("../Middleware/auth");
const router = express.Router();
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  UpdateOrder,
  deleteOrder,
} = require("../Controller/OrderController");

//user
//create order
router.route("/order/new").post(isAuthenticatedUser, newOrder);

//get user order
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

//get all user order
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

//get all users orders  --admin
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllOrders);

//update and Delete orders  --admin
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), UpdateOrder)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteOrder);

module.exports = router;
