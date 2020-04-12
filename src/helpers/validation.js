const { ErrorHandler } = require('../helpers/error-handler');

const errorResponse = schemaErrors => {
  const errors = schemaErrors.map(error => {
    const { message } = error;
    return message;
  });
  return errors;
};

const validateSchema = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    });

    if (error) {
      throw new ErrorHandler(400, errorResponse(error.details));
    } else {
      // eslint-disable-next-line callback-return
      next();
    }
  };
};

module.exports = { validateSchema };
