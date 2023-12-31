const Categories = require('../../api/v1/categories/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const createCategory = async (req) => {
  const { organizer } = req.user;
  const { name } = req.body;

  const isDuplicate = await Categories.exists({ name, organizer });
  if (isDuplicate) throw new BadRequestError('duplicate category name');
  // error dithrow di sini (service), kemudian alurnya spt di bawah
  // dilempar ke controller -> routes -> app -> diintervensi middleware

  const result = await Categories.create({ name, organizer });
  return result;
};

const getAllCategories = async (req) => {
  const { organizer } = req.user;
  const result = await Categories.find({ organizer });
  return result;
};

const getOneCategory = async (req) => {
  const { id } = req.params;
  const { organizer } = req.user;
  const result = await Categories.findOne({ _id: id, organizer });
  if (!result) throw new NotFoundError(`Category with id : ${id} not found`);
  return result;
};

const updateCategory = async (req) => {
  const { id } = req.params;
  const { name } = req.body;
  const { organizer } = req.user;

  // Cari apakah nama sudah terpakai data lain (dengan id beda)
  const isNameExists = await Categories.exists({ _id: { $ne: id }, name, organizer });
  if (isNameExists) throw new BadRequestError(`Category with name ${name} already exists.`);

  const result = await Categories.findOneAndUpdate(
    { _id: id, organizer },
    { name },
    { new: true, runValidators: true },
  );

  if (!result) throw new NotFoundError(`Category with id ${id} not found`);
  return result;
};

const deleteCategory = async (req) => {
  const { id } = req.params;
  const { organizer } = req.user;
  const result = await Categories.findOneAndDelete({ _id: id, organizer });
  if (!result) throw new NotFoundError(`Category with id ${id} not found`);
  return result;
};

const checkCategory = async (id) => {
  const result = await Categories.exists({ _id: id });
  if (!result) throw new NotFoundError(`Category with id ${id} not found`);
};

module.exports = {
  getAllCategories,
  createCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
  checkCategory,
};
