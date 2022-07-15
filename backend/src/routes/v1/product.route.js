const express = require('express');
const { productController } = require('../../controllers');
const upload = require('../../middlewares/multer');
const validate = require('../../middlewares/validate');
const { productValidation } = require('../../validations');

const router = express.Router();

const uploadMultiple = upload.fields([
  { name: 'product_pic', maxCount: 1 },
  { name: 'slide_pic1', maxCount: 1 },
  { name: 'slide_pic2', maxCount: 1 },
  { name: 'slide_pic3', maxCount: 1 },
  { name: 'slide_pic4', maxCount: 1 },
]);

router
  .route('/add-product')
  .post(upload.single('product_pic'), validate(productValidation.createProduct), productController.createProduct);

router.route('/all-product').get(validate(productValidation.queryProduct), productController.getAllProduct);

router
  .route('/product-suggestion')
  .get(validate(productValidation.getProductSuggestion), productController.getProductSuggestion);

router.route('/product-detail/:productId').get(validate(productValidation.getProduct), productController.getProduct);

router
  .route('/update-product/:productId')
  .put(uploadMultiple, validate(productValidation.updateProduct), productController.updateProduct);

router
  .route('/delete-product/:productId')
  .delete(validate(productValidation.deleteProduct), productController.deleteProduct);

module.exports = router;
