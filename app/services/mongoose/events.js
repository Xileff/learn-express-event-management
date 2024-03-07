const Events = require('../../api/v1/events/model');
const { checkImage } = require('./images');
const { checkCategory } = require('./categories');
const { checkTalent } = require('./talent');
const { BadRequestError, NotFoundError } = require('../../errors');

const createEvent = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    keyPoints,
    venueName,
    status,
    tickets,
    image,
    category,
    talent,
  } = req.body;
  const { organizer } = req.user;

  await checkImage(image);
  await checkCategory(category);
  await checkTalent(talent);

  const check = await Events.findOne({ title });
  if (check) throw new BadRequestError(`Event with title : ${title} already exists`);

  const result = await Events.create({
    title,
    date,
    about,
    tagline,
    keyPoints,
    venueName,
    status,
    tickets,
    image,
    category,
    talent,
    organizer,
  });

  return result;
};

const getAllEvents = async (req) => {
  const { keyword, category, talent, status } = req.query;
  const { organizer } = req.user;
  let conditions = { organizer };

  if (keyword) {
    conditions = { ...conditions, title: { $regex: keyword, $options: 'i' } };
  }

  if (category) {
    conditions = { ...conditions, category };
  }

  if (talent) {
    conditions = { ...conditions, talent };
  }

  if (status) {
    conditions = { ...conditions, status };
  }

  const result = await Events.find(conditions)
    .populate({ path: 'image', select: '_id name' })
    .populate({ path: 'category', select: '_id name' })
    .populate({
      path: 'talent',
      select: '_id name role image',
      populate: {
        path: 'image',
        select: '_id name',
      },
    });

  return result;
};

const getOneEvent = async (req) => {
  const { id } = req.params;
  const { organizer } = req.user;

  const result = await Events.findOne({ _id: id, organizer })
    .populate({ path: 'image', select: '_id name' })
    .populate({ path: 'category', select: '_id name' })
    .populate({
      path: 'talent',
      select: '_id name role image',
      populate: {
        path: 'image',
        select: '_id name',
      },
    });

  if (!result) throw new NotFoundError(`Event with id : ${id} not found`);

  return result;
};

const updateEvent = async (req) => {
  const { id } = req.params;
  const { organizer } = req.user;
  const {
    title,
    date,
    about,
    tagline,
    keyPoints,
    venueName,
    status,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  await checkImage(image);
  await checkCategory(category);
  await checkTalent(talent);

  const isTitleExists = await Events.findOne({ _id: { $ne: id }, title });
  if (isTitleExists) throw new BadRequestError(`Event with title : ${title} already exists`);

  const result = await Events.findOneAndUpdate(
    { _id: id, organizer },
    {
      title,
      date,
      about,
      tagline,
      keyPoints,
      venueName,
      status,
      tickets,
      image,
      category,
      talent,
      organizer,
    },
    { new: true, runValidators: true },
  );

  if (!result) throw new NotFoundError(`Event with id : ${id} not found`);

  return result;
};

const deleteEvent = async (req) => {
  const { id } = req.params;
  const { organizer } = req.user;

  const result = await Events.findOneAndDelete({ _id: id, organizer });

  if (!result) throw new NotFoundError(`Event with id : ${id} not found`);

  return result;
};

const changeStatus = async (req) => {
  const { id } = req.params;
  const { organizer } = req.user;
  const { status } = req.body;

  const event = await Events.findOne({ _id: id, organizer });
  if (!event) throw new NotFoundError(`Event with id : ${id} not found`);

  event.status = status;
  await event.save();

  return event;
};

module.exports = {
  createEvent,
  getAllEvents,
  getOneEvent,
  updateEvent,
  deleteEvent,
  changeStatus,
};
