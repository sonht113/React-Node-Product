const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  categoryId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CategorySchema'
  }],
  brand: {
    type: String,
  },
});

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
    }
  },
  { timestamps: true }
);

const Category = mongoose.model('CategorySchema', categorySchema);
const Brand = mongoose.model('BrandSchema', brandSchema);

module.exports = {Category, Brand};
