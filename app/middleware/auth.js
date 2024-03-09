const { ForbiddenError, UnauthenticatedError } = require('../errors');
const { isTokenValid } = require('../utils/jwt');

const authenticateUser = (req, res, next) => {
  try {
    // check token
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      [, token] = authHeader.split(' ');
    }

    if (!token) {
      throw new UnauthenticatedError('Unauthenticated');
    }

    const payload = isTokenValid({ token });

    /* Attach the user payload to the req object
    and pass it to the controller using authenticateUser */
    req.user = {
      email: payload.email,
      role: payload.role,
      name: payload.name,
      organizer: payload.organizer,
      id: payload.userId, // payload dapet dari createUserPayload pas signin
    };

    return next();
  } catch (err) {
    return next(err);
  }
};

const authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    throw new ForbiddenError('Unauthorized access to this route.');
  }
  next();
};

const authenticateParticipant = (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      throw new UnauthenticatedError('Authentication invalid');
    }

    const payload = isTokenValid({ token });

    req.participant = {
      id: payload.participantId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      role: payload.role,
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = { authenticateUser, authorizeRoles, authenticateParticipant };
