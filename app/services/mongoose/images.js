const Images = require('../../api/v1/images/model');
const { NotFoundError } = require('../../errors');

// Cara 1
const generateImageUrl = async (req) => {
  const result = `uploads/${req.file.filename}`;
  return result;
};

// Cara 2
const createImages = async (req) => {
  const result = await Images.create({
    url: `uploads/${req.file ? req.file.filename : 'avatar/default.jpeg'}`,
  });

  return result;
};

const checkImage = async (id) => {
  const result = await Images.findOne({ _id: id });
  if (!result) throw new NotFoundError(`Image with id : ${id} not found`);
};

module.exports = { createImages, generateImageUrl, checkImage };
