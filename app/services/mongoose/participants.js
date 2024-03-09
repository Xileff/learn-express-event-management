const Participant = require('../../api/v1/participants/model');
const Events = require('../../api/v1/events/model');
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require('../../errors');
const { createParticipantPayload } = require('../../utils/createUserPayload');
const { createJwt } = require('../../utils/jwt');

const { otpMail } = require('../mail');

const signUpParticipant = async (req) => {
  const { firstName, lastName, email, password, role } = req.body;

  let result = await Participant.findOne({
    email,
    status: 'inactive',
  });

  if (result) {
    result.firstName = firstName;
    result.lastName = lastName;
    result.role = role;
    result.email = email;
    result.password = password;
    result.otp = Math.floor(Math.random() * 9999);
    await result.save();
  } else {
    result = await Participant.create({
      firstName,
      lastName,
      email,
      password,
      role,
      otp: Math.floor(Math.random() * 9999),
    });
  }

  await otpMail(email, result);

  delete result._doc.password;
  delete result._doc.otp;

  return result;
}

const activateParticipant = async (req) => {
  const { otp, email } = req.body;
  const check = await Participant.findOne({ email });

  if (!check) throw new NotFoundError('Participant not registered.');

  if (check && check.otp !== otp) throw new BadRequestError('Wrong OTP');

  const result = await Participant.findByIdAndUpdate(check._id, {
    status: 'active',
  }, { new: true });

  delete result._doc.password;

  return result;
}

const signinParticipant = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password.');
  }

  const result = await Participant.findOne({ email: email });

  if (!result) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  if (result.status === 'inactive') {
    throw new UnauthenticatedError('Account must be activated first.');
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  const token = createJwt({ payload: createParticipantPayload(result) });

  return token;
}

const getAllEvents = async (req) => {
  const result = await Events.find({ status: 'Published' })
    .populate('category')
    .populate('image')
    .select('_id title date tickets venueName');
  
  console.log(result);

  return result;
};

const getOneEvent = async (req) => {
  const  { id } = req.params;
  const result = await Events.findOne({ _id: id })
    .populate('category')
    .populate('talent')
    .populate('image');
  
  if (!result) throw new NotFoundError(`Event with id ${id} not found.`);
  
  return result;
}

const getAllOrders = async (req) => {
  const result = await Events.findOne({ _id: req.participant.id });
  return result;
};

module.exports = {
  signUpParticipant,
  activateParticipant,
  signinParticipant,
  getAllEvents,
  getOneEvent,
  getAllOrders,
};
