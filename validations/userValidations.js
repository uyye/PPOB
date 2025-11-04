const Joi = require("joi");
const messages = require("./joiMassages");

const userCreateSchema = Joi.object({
  email: Joi.string().email().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  password: Joi.string().required().min(8),
}).messages(messages);

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
}).messages(messages);

const userUpdateSchema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
}).messages(messages);

module.exports = {
  userCreateSchema,
  userLoginSchema,
  userUpdateSchema,
};
