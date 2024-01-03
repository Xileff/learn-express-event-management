const { StatusCodes } = require('http-status-codes');
const { createImages, generateImageUrl } = require('../../../services/mongoose/images');

const create = async (req, res, next) => {
  try {
    const result = await createImages(req);
    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

const generate = async (req, res, next) => {
  try {
    const result = await generateImageUrl(req);
    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { create, generate };
