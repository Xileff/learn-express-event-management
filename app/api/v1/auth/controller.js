const { StatusCodes } = require('http-status-codes');
const { signin } = require('../../../services/mongoose/auth');

const signinCms = async (req, res, next) => {
  try {
    const result = await signin(req);

    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { signinCms };
