const Order = require("../Models/OrderModel");
const Product = require("../Models/ProductModel");
const ErrorHandler = require("../Utils/ErrorHandler");
const catchAsyncError = require("../Middleware/catchAsyncError");

//Create new order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  //get all user input for new order from req body
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  //creating  order
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  //response
  res.status(201).json({
    status: "success",
    order,
  });
});

//get single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  //find order
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  //if not order
  if (!order)
    return next(
      new ErrorHandler(`Order not found with this Id: ${req.params.id}`, 404)
    );

  //if find order
  res.status(200).json({
    status: "success",
    order,
  });
});

// get logged in user orders
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//Get all user orders  --admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  // Also send total amount of orders
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});

//update order --admin
exports.UpdateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  //if not order
  if (!order)
    return next(
      new ErrorHandler(`Order not found with this Id: ${req.params.id}`, 404)
    );

  if (order.orderStatus === "Delivered")
    return next(
      new ErrorHandler("You have already delivered this order.", 400)
    );

  //update the stock and send res
  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity);
  });

  //changing order status
  order.orderStatus = req.body.status;

  //checking order status
  if (req.body.status === "Delivered") order.deliveredAt = Date.now();

  //save order
  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//product stock updater
async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

//Delete user orders - admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  //if not order
  if (!order)
    return next(
      new ErrorHandler(`Order not found with this Id: ${req.params.id}`, 404)
    );
    
  res.status(200).json({
    success: true,
    message: `Order deleted successfully.`,
  });
});
