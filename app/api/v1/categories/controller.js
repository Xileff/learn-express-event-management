const Categories = require('./model');
const { getAllCategories, createCategory, getOneCategory } = require('../../../services/mongoose/categories');

const create = async (req, res, next) => {
  try {
    const result = await createCategory(req);
    return res.status(201).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllCategories();
    return res.status(200).json({
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
    return res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const result = await Categories.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true },
    );

    return res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Categories.findByIdAndDelete(id);
    return res.status(200).json({
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
