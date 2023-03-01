const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product name."],
    trim: true,
  },
  description: { type: String, required: [true, "Please Enter description."] },
  price: {
    type: Number,
    required: [true, "Please Enter product price."],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      Public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter category."],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter product stock."],
    maxLength: [4, "Price cannot exceed 4 characters"],
    default: 1,
  },
  numberOfReview: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
