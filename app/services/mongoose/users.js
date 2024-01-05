/* eslint-disable no-underscore-dangle */
const Users = require('../../api/v1/users/model');
const Organizers = require('../../api/v1/organizers/model');
const { BadRequestError } = require('../../errors');

const createOrganizer = async (req) => {
  const {
    email,
    name,
    password,
    confirmPassword,
    role,
    organizer,
  } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError('Passwords do not match');
  }

  const result = await Organizers.create({ organizer });

  const user = await Users.create({
    email,
    name,
    password,
    role,
    organizer: result._id,
  });

  delete user._doc.password;

  return user;
};

const createUser = async (req) => {
  const {
    name, password, role, confirmPassword, email,
  } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError('Passwords do not match');
  }

  const user = await Users.create({
    name,
    email,
    organizer: req.user.organizer,
    password,
    role,
  });

  delete user._doc.password;

  return user;
};

module.exports = { createOrganizer, createUser };
