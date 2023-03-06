const express = require("express");
const app = express();
const errorMiddleware = require("./Middleware/error");

//Express middleware
app.use(express.json());

// router import
app.use("/api/v1", require("./Router/ProductRouter"));
app.use("/api/v1", require("./Router/UserRouter"));

//Middleware for error
app.use(errorMiddleware);

module.exports = app;
