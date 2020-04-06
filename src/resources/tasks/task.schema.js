const Joi = require('@hapi/joi');

const postSchema = Joi.object().keys({
  title: Joi.string().required(),
  order: Joi.number(),
  description: Joi.string(),
  userId: Joi.string().allow(null),
  boardId: Joi.string().allow(null),
  columnId: Joi.string().allow(null)
});

const putSchema = Joi.object().keys({
  id: Joi.string(),
  title: Joi.string(),
  order: Joi.number(),
  description: Joi.string(),
  userId: Joi.string().allow(null),
  boardId: Joi.string().allow(null),
  columnId: Joi.string().allow(null)
});

module.exports = { postSchema, putSchema };
