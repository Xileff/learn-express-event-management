/* eslint-disable no-underscore-dangle */
const Users = require('../../api/v1/users/model');
const Organizers = require('../../api/v1/organizers/model');
const { BadRequestError } = require('../../errors');

// Owner create Organizer
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
  // Relasi antara user dengan organizer adalah 1:1. Makanya,
  // ketika create seorang user dengan role organizer, maka dia akan
  // di-binding dengan 1 organizer yaitu dirinya sendiri

  const user = await Users.create({
    name,
    email,
    password,
    role,
    organizer: result._id,
  });

  delete user._doc.password;

  return user;
};

// Organizer create Admin
const createUser = async (req) => {
  const {
    name, password, role, confirmPassword, email,
  } = req.body;
  const { organizer } = req.user;

  if (password !== confirmPassword) {
    throw new BadRequestError('Passwords do not match');
  }

  const user = await Users.create({
    name,
    email,
    password,
    role,
    organizer,
  });

  delete user._doc.password;

  return user;
};

module.exports = { createOrganizer, createUser };
