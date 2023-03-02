const express = require("express");
const app = express();
const errorMiddleware = require("./Middleware/error");

app.use(express.json());
// router import
const productRouter = require("./Router/ProductRouter");

app.use("/api/v1", productRouter);

//Middleware for error
app.use(errorMiddleware);

module.exports = app;
