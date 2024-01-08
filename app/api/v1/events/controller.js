const { StatusCodes } = require('http-status-codes');
const {
  createEvent,
  getAllEvents,
  getOneEvent,
  updateEvent,
  deleteEvent,
  changeStatus,
} = require('../../../services/mongoose/events');

const create = async (req, res, next) => {
  try {
    const result = await createEvent(req);
    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllEvents(req);
    return res.status(StatusCodes.OK).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneEvent(req);
    return res.status(StatusCodes.OK).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateEvent(req);
    return res.status(StatusCodes.OK).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteEvent(req);
    return res.status(StatusCodes.OK).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const result = await changeStatus(req);
    return res.status(StatusCodes.OK).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  create,
  index,
  find,
  update,
  destroy,
  updateStatus,
};
