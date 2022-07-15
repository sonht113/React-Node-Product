const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  let avatarProduct;
  if (req.file && req.file.filename) {
    avatarProduct = `upload/images/${req.file.filename}`;
  }
  const {name, category, brand, price, description} = req.body;
  const product = {
    name: name,
    category: category,
    brand: brand,
    price: price,
    description: description,
    avatarProduct,
    slideImage: [null, null, null, null],
  };
  await productService.createProduct(product);
  res.status(httpStatus.CREATED).send(product);
});

const getAllProduct = catchAsync(async (req, res) => {
  const {page, limit, category, brand, keyword} = req.query;
  const products = await productService.queryProduct(page, limit, category, brand, keyword);
  res.send(products);
});

const getProductSuggestion = catchAsync(async (req, res) => {
  const products = await productService.getProductSuggestion(req.query.limit, req.query.category, req.query.brand);
  res.send(products);
});

const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(product);
});

const updateProduct = catchAsync(async (req, res) => {
  const productHistory = await productService.getProductById(req.params.productId);
  if (!productHistory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  let avatarProduct;
  let slideImage = [];

  const handleCheckImage = (file, pictures, index) => {
    if (file) {
      return `upload/images/${file[0].filename}`;
    }
    if (pictures === 'null') {
      return (slideImage[index] = null);
    }
    return (slideImage[index] = pictures);
  };

  if (req.files.product_pic) {
    avatarProduct = `upload/images/${req.files.product_pic[0].filename}`;
  } else {
    avatarProduct = productHistory.avatarProduct;
  }

  slideImage = [
    handleCheckImage(req.files.slide_pic1, req.body.slide_pic1, 0),
    handleCheckImage(req.files.slide_pic2, req.body.slide_pic2, 1),
    handleCheckImage(req.files.slide_pic3, req.slide_pic3, 2),
    handleCheckImage(req.files.slide_pic4, req.body.slide_pic4, 3),
  ];

  const {name, category, brand, price, description} = req.body;

  const product = {
    name: name,
    category: category,
    brand: brand,
    price: price,
    description: description,
    avatarProduct,
    slideImage,
  };
  await productService.updateProductById(req.params.productId, product);
  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  const productHistory = await productService.getProductById(req.params.productId);
  if (!productHistory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await productService.deleteProductById(req.params.productId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProduct,
  getAllProduct,
  getProductSuggestion,
  getProduct,
  updateProduct,
  deleteProduct,
};
