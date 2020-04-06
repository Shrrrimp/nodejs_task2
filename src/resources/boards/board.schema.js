const Joi = require('@hapi/joi');

const postColumns = Joi.object().keys({
  title: Joi.string().required(),
  order: Joi.number().required()
});

const putColumns = Joi.object().keys({
  id: Joi.string(),
  title: Joi.string().required(),
  order: Joi.number().required()
});

const postBoard = Joi.object().keys({
  title: Joi.string().required(),
  columns: Joi.array().items(postColumns)
});

const putBoard = Joi.object().keys({
  id: Joi.string(),
  title: Joi.string().required(),
  columns: Joi.array().items(putColumns)
});

module.exports = { postBoard, putBoard };
