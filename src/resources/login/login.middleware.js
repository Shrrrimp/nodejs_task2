const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../../helpers/error-handler');
const { catchErrors } = require('../../helpers/catch-errors');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const checkToken = catchErrors((req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;

  if (!token) {
    throw new ErrorHandler(401, 'Access token is missing or invalid');
  }

  token = token.replace('Bearer ', '');
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      throw new ErrorHandler(401, 'Access token is missing or invalid');
    }

    req.decoded = decoded;
    next();
  });
});

module.exports = checkToken;
