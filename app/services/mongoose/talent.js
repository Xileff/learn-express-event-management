const Talents = require('../../api/v1/talents/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkImage } = require('./images');

const createTalent = async (req) => {
  const { name, role, image } = req.body;

  await checkImage(image);

  const check = await Talents.findOne({ name });
  if (check) throw new BadRequestError('Duplicate talent name');

  const result = await Talents.create({ name, role, image });
  return result;
};

const getAllTalents = async (req) => {
  const { keyword } = req.query;

  let condition = {};

  if (keyword) {
    condition = { name: { $regex: keyword, $options: 'i' } };
  }

  const result = await Talents.find(condition)
    .populate({
      path: 'image',
      select: '_id url',
    })
    .select('_id name role image');

  return result;
};

const getOneTalent = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({ _id: id })
    .populate({
      path: 'image',
      select: '_id url',
    })
    .select('_id name role image');

  if (!result) throw new NotFoundError(`Talent with id : ${id} not found`);

  return result;
};

const updateTalent = async (req) => {
  const { id } = req.params;
  const { name, role, image } = req.body;

  await checkImage(image);

  const isNameExists = await Talents.exists({ _id: { $ne: id }, name });
  if (isNameExists) throw new BadRequestError(`Name ${name} is already used`);

  const result = await Talents.findByIdAndUpdate(
    id,
    { name, image, role },
    { new: true, runValidators: true },
  );

  if (!result) throw new NotFoundError(`Talent with id : ${id} not found`);

  return result;
};

const deleteTalent = async (req) => {
  const { id } = req.params;
  const result = await Talents.findByIdAndDelete(id);
  if (!result) throw new NotFoundError(`Talent with id : ${id} not found`);
  return result;
};

module.exports = {
  createTalent,
  getAllTalents,
  getOneTalent,
  updateTalent,
  deleteTalent,
};
