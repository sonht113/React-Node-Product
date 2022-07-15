const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    category: Joi.string().required(),
    brand: Joi.string().required(),
    price: Joi.number().integer().positive().required().min(10000).max(1000000000),
    description: Joi.string().max(500).allow('', null),
    product_pic: Joi.any().empty(),
  }),
};

const queryProduct = {
  query: Joi.object().keys({
    page: Joi.number().integer(),
    limit: Joi.number().integer(),
    category: Joi.string().allow('', null),
    brand: Joi.string().allow('', null),
    keyword: Joi.string().allow('', null).trim(true),
  }),
};

const getProductSuggestion = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    category: Joi.string().allow('', null),
    brand: Joi.string().allow('', null),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().empty(' '),
      category: Joi.string().empty(' '),
      brand: Joi.string().empty(' '),
      price: Joi.number().integer().positive().empty(' ').min(10000).max(1000000000),
      description: Joi.string().allow('', null).max(500),
      product_pic: Joi.any().allow(),
      slide_pic1: Joi.any().allow(),
      slide_pic2: Joi.any().allow(),
      slide_pic3: Joi.any().allow(),
      slide_pic4: Joi.any().allow(),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProduct,
  queryProduct,
  getProductSuggestion,
  getProduct,
  updateProduct,
  deleteProduct,
};
