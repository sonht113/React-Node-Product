const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    avatarProduct: {
      type: String,
      required: true,
    },
    slideImage: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const product = mongoose.model('product', productSchema);

module.exports = product;
