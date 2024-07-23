const Joi = require('joi');

const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  isbn: Joi.string().required(),
  quantity: Joi.number().integer().min(0).default(1)
});

const computerSchema = Joi.object({
  serialNumber: Joi.string().required(),
  brand: Joi.string().required(),
  model: Joi.string().required(),
  available: Joi.boolean().default(true)
});

const borrowerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  borrowedBooks: Joi.array().items(Joi.string()),
  borrowedComputer: Joi.string()
});

module.exports = {
  bookSchema,
  computerSchema,
  borrowerSchema
};