const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const { logger } = require('../helpers/logger');

class ErrorHandler extends Error {
  constructor(statusCode, msg) {
    super();
    this.statusCode = statusCode;
    this.message = msg;
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err;
  if (statusCode) {
    logger.error(message);
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message
    });
    return;
  }

  logger.error(getStatusText(INTERNAL_SERVER_ERROR));
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
};

module.exports = { ErrorHandler, handleError };
