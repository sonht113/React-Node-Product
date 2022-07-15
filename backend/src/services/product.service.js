const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a product
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const createProduct = async (productBody) => {
  const product = await Product.create(productBody);
  return product;
};

/**
 * Get all product
 * Pagination
 * @return {Promise<Product>}
 */
const queryProduct = async (page, limit, category, brand, keyword) => {
  const pageNumber = page || 1;
    let productQuery = Product.find();
    if (category) {
      productQuery = productQuery.find({ category });
    }
    if (brand) {
      productQuery = productQuery.find({ brand });
    }
    if (keyword) {
      productQuery = productQuery.find({ name: { $regex: new RegExp(keyword, 'i') } });
    }
    const allProduct = await productQuery.find();
    const products = await productQuery
      .find()
      .select('_id name category brand price description avatarProduct slideImage')
      .limit(parseInt(limit))
      .sort({ updatedAt: -1 })
      .skip(parseInt(pageNumber * limit - limit));

    const totalPage = Math.ceil(allProduct.length / limit);
    return {
      products,
      pagination: {
        page,
        limit,
        totalPage,
      },
    };
};

/**
 * Get product in suggestions
 * @return {Promise<Product>}
 */

const getProductSuggestion = async (limit, category, brand) => {
  let productQuery = Product.find();
  if (category) {
    productQuery = productQuery.find({ category });
  }
  if (brand) {
    productQuery = productQuery.find({ brand });
  }
  const product = await productQuery
    .find()
    .select('_id name category brand price description avatarProduct slideImage')
    .limit(parseInt(limit));

  return product;
};

/**
 * Get product by id
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const getProductById = async (productId) => {
  return Product.findById(productId).select('_id name category brand price description avatarProduct slideImage');
};

/**
 * Update product by id
 * @param {ObjectId} productId
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const updateProductById = async (productId, productBody) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  Object.assign(product, productBody);
  await product.save();
  return product;
};

/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await product.remove();
  return product;
};

module.exports = {
  createProduct,
  queryProduct,
  getProductSuggestion,
  getProductById,
  updateProductById,
  deleteProductById,
};
