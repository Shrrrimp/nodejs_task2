const Joi = require('@hapi/joi');

const postSchema = Joi.object().keys({
  login: Joi.string().required(),
  password: Joi.string().required()
});

module.exports = { postSchema };
