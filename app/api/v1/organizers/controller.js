const { StatusCodes } = require('http-status-codes');
const {
  createOrganizer,
} = require('../../../services/mongoose/users');

const createCMSOrganizer = async (req, res, next) => {
  try {
    const result = await createOrganizer(req);
    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createCMSOrganizer,
};
