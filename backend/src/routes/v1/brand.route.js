const express = require('express');
const { Brand } = require('../../models/category.model');
const catchAsync = require('../../utils/catchAsync');
const router = express.Router();

router.route('/all-brand').get(
  catchAsync(async (req, res) => {
    const brands = await Brand.find();
    res.send(brands);
  })
);

router.route('/brand-detail/:categoryId').get(
  catchAsync(async (req, res) => {
    const brands = await Brand.find({categoryId: req.params.categoryId});
    res.send(brands);
  })
);
module.exports = router;
