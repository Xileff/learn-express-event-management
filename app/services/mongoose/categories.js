const Categories = require('../../api/v1/categories/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllCategories = async () => {
  const result = await Categories.find();
  return result;
};

const createCategory = async (req) => {
  const { name } = req.body;

  const isDuplicate = await Categories.exists({ name });
  if (isDuplicate) throw new BadRequestError('duplicate category name');
  // error dithrow di sini (service), kemudian alurnya spt di bawah
  // dilempar ke controller -> routes -> app -> diintervensi middleware

  const result = await Categories.create({ name });
  return result;
};

const getOneCategory = async (req) => {
  const { id } = req.params;
  const result = await Categories.findOne({ _id: id });
  if (!result) throw new NotFoundError('Category not found');
  return result;
};

module.exports = { getAllCategories, createCategory, getOneCategory };
