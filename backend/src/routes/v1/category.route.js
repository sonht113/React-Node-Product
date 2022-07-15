const express = require('express');
const { Category } = require('../../models/category.model');
const catchAsync = require('../../utils/catchAsync');
const router = express.Router();

router.route('/all-category').get(
  catchAsync(async (req, res) => {
    const categories = await Category.find();
    res.send(categories);
  })
);

module.exports = router;
