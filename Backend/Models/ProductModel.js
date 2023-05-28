const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product name."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter description."]
  },
  brand: {
    type: String,
    required: [true, "Please Enter brand."]
  },
  price: {
    type: Number,
    required: [true, "Please Enter product price."],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      Public_id: {
        type: String,
        default: () => Date.now().toString(),
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  colors: {
    type: [String], // Array of strings representing the available colors
    required: true,
  },
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
      user: {
        type: String,
        ref: "User",
        required: true,
      },
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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
