const { StatusCodes } = require('http-status-codes');
const {
  createTalent,
  getAllTalents,
  getOneTalent,
  updateTalent,
  deleteTalent,
} = require('../../../services/mongoose/talent');

const create = async (req, res, next) => {
  try {
    const result = await createTalent(req);
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
    const result = await getAllTalents(req);
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
    const result = await getOneTalent(req);
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
    const result = await updateTalent(req);
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
    const result = await deleteTalent(req);
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
