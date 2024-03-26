const Payments = require('../../api/v1/payments/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkImage } = require('./images');

const getAllPayments = async (req) => {
  let condition = { organizer: req.user.organizer };

  const result = await Payments.find(condition)
    .populate({
      path: 'image',
      select: '_id url',
    })
    .select('_id type status image');

  return result;
};

const createPayment = async (req) => {
  const { type, image } = req.body;

  await checkImage(image);

  const check = await Payments.findOne({ type, organizer: req.user.organizer });

  if (check) throw new BadRequestError('Payment method already exists.');

  const result = await Payments.create({
    image,
    type,
    organizer: req.user.organizer,
  });

  return result;
};

const getOnePayment = async (req) => {
  const { id } = req.params;

  const result = await Payments.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate({
      path: 'image',
      select: '_id url',
    })
    .select('_id type status image');

  if (!result) throw new NotFoundError(`Payment with id ${id} not found`);

  return result;
};

const updatePayment = async (req) => {
  const { id } = req.params;
  const { type, image } = req.body;

  await checkImage(image);

  const check = await Payments.findOne({
    type,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError('Payment already exists.');

  const result = await Payments.findOneAndUpdate(
    { _id: id },
    { type, image, organizer: req.user.organizer },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Payment with id ${id} not found.`);

  return result;
};

const deletePayment = async (req) => {
  const { id } = req.params;

  const result = await Payments.findOneAndDelete({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result) throw new NotFoundError(`Payment with id ${id} not found.`);

  return result;
};

module.exports = {
  getAllPayments,
  createPayment,
  getOnePayment,
  updatePayment,
  deletePayment,
};
