const Talents = require('../../api/v1/talents/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkImage } = require('./images');

const createTalent = async (req) => {
  const { name, role, image } = req.body;
  const { organizer } = req.user;

  await checkImage(image);

  const check = await Talents.findOne({ name, organizer });
  if (check) throw new BadRequestError('Duplicate talent name');

  const result = await Talents.create({
    name, role, image, organizer,
  });
  return result;
};

const getAllTalents = async (req) => {
  const { keyword, role } = req.query;
  const { organizer } = req.user;

  let condition = { organizer };

  if (keyword) {
    condition = { ...condition, name: { $regex: keyword, $options: 'i' } };
  }

  if (role) {
    condition = { ...condition, role: { $regex: role, $options: 'i' } };
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
  const { organizer } = req.user;

  const result = await Talents.findOne({ _id: id, organizer })
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
  const { organizer } = req.user;

  await checkImage(image);

  const isNameExists = await Talents.exists({ _id: { $ne: id }, name, organizer });
  if (isNameExists) throw new BadRequestError(`Name ${name} is already used`);

  const result = await Talents.findByIdAndUpdate(
    id,
    {
      name, image, role, organizer,
    },
    { new: true, runValidators: true },
  );

  if (!result) throw new NotFoundError(`Talent with id : ${id} not found`);

  return result;
};

const deleteTalent = async (req) => {
  const { id } = req.params;
  const { organizer } = req.user;

  const result = await Talents.findOneAndDelete({ _id: id, organizer });
  if (!result) throw new NotFoundError(`Talent with id : ${id} not found`);

  return result;
};

const checkTalent = async (id) => {
  const result = await Talents.exists({ _id: id });
  if (!result) throw new NotFoundError(`Talent with id : ${id} not found`);
};

module.exports = {
  createTalent,
  getAllTalents,
  getOneTalent,
  updateTalent,
  deleteTalent,
  checkTalent,
};
