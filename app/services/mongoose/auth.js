const Users = require('../../api/v1/users/model');
const { BadRequestError, ForbiddenError } = require('../../errors');
const { createUserPayload } = require('../../utils/createUserPayload');
const { createJwt } = require('../../utils/jwt');

const signin = async (req) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError('Email and password are mandatory');

  const user = await Users.findOne({ email });

  if (!user) throw new ForbiddenError('Invalid credentials');

  const isPasswordCorrect = await user.comparePassword(password); // method yg ada di model
  if (!isPasswordCorrect) {
    throw new ForbiddenError('Invalid credentials');
  }

  const token = createJwt({ payload: createUserPayload(user) });
  return token;
};

module.exports = { signin };

// yg penting buat jwt ada di sini dan utils/createUserPayload, utils/jwt, middleware/jwt
