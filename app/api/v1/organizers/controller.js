const { StatusCodes } = require('http-status-codes');
const {
  createOrganizer, createUser, getUsers,
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

const createCMSUser = async (req, res, next) => {
  try {
    const result = await createUser(req);
    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

const indexUsers = async (req, res, next) => {
  try {
    const result = await getUsers(req);
    return res.status(StatusCodes.OK).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createCMSOrganizer,
  createCMSUser,
  indexUsers,
};
