const { StatusCodes } = require('http-status-codes');
const {
  getAllCategories,
  createCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
} = require('../../../services/mongoose/categories');

const create = async (req, res, next) => {
  try {
    const result = await createCategory(req);
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
    const result = await getAllCategories(req);
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
    const result = await getOneCategory(req);
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
    const result = await updateCategory(req);
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
    const result = await deleteCategory(req);
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
