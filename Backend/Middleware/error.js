const ErrorHandler = require("../Utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //MongoDB id error
  if (err.name === "CastError") {
    const message = `Resource are not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 404);
  }
  res.status(err.statusCode).json({
    status: "fail",
    message: err.message,
  });
};
