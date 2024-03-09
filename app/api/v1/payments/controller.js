const { StatusCodes } = require("http-status-codes");
const { createPayment, getAllPayments, getOnePayment, updatePayment, deletePayment } = require("../../../services/mongoose/payments");

const create = async (req, res, next) => {
  try {
    const result = await createPayment(req);
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
    const result = await getAllPayments(req);
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
    const result = await getOnePayment(req);
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
    const result = await updatePayment(req);
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
    const result = await deletePayment(req);
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
};
