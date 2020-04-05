const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  name: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required()
});
