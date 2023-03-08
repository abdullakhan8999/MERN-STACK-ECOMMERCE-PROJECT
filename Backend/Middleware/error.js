const ErrorHandler = require("../Utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //MongoDB id error
  if (err.name === "CastError") {
    const message = `Resource are not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 404);
  }

  //Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate entry ${Object.keys(err.keyValue)}.`;
    err = new ErrorHandler(message, 400);
  }

  //MongoDB JWTToken error
  if (err.name === "jsonWebTokenError") {
    const message = `Invalid Json web token, try again.`;
    err = new ErrorHandler(message, 400);
  }

  //MongoDB JWTToken expired error
  if (err.name === "TokenExpiredError") {
    const message = `Invalid Json web expired, try again.`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    status: "fail",
    message: err.message,
  });
};
