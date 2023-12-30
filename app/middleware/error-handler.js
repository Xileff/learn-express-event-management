const { StatusCodes } = require('http-status-codes');

// eslint-disable-next-line no-unused-vars
const errorHandlerMiddleware = (err, req, res, next) => {
  // default
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Sorry, something went wrong...Try again later',
  };

  // mongoose
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
    customError.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
    customError.statusCode = 400;
  }

  // gagal casting, misalnya _id melebihi 100 digit atau semacamnya
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ status: 'fail', message: customError.msg });
};

module.exports = errorHandlerMiddleware;
