const Joi = require("joi");
const messages = require("./joiMassages");

const topUpSchema = Joi.object({
  top_up_amount: Joi.number().strict().min(0).required(),
}).messages(messages);

module.exports = { topUpSchema };
    
