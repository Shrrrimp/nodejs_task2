const { logger } = require('./logger');

const errorResponse = schemaErrors => {
  const errors = schemaErrors.map(error => {
    const { path, message } = error;
    return { path, message };
  });
  return {
    status: 'failed',
    errors
  };
};

const validateSchema = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    });

    if (error) {
      logger.error('Bad Request');
      res.status(400).json(errorResponse(error.details));
    } else {
      // eslint-disable-next-line callback-return
      next();
    }
  };
};

module.exports = { validateSchema };
