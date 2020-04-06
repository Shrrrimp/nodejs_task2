const Joi = require('@hapi/joi');

const postSchema = Joi.object().keys({
  name: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required()
});

const putSchema = Joi.object().keys({
  id: Joi.string(),
  name: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required()
});

module.exports = { postSchema, putSchema };
