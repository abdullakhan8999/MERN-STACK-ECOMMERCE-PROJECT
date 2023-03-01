const express = require("express");
const app = express();
app.use(express.json());

// router import
const productRouter = require("./Router/ProductRouter");

app.use("/api/v1", productRouter);

module.exports = app;
