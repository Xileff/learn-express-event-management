const Images = require('../../api/v1/images/model');

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

module.exports = { createImages, generateImageUrl };
