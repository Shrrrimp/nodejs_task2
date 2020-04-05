const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  title: Joi.string().required(),
  columns: Joi.object().keys({
    title: Joi.string().required(),
    order: Joi.number().required()
  })
});
