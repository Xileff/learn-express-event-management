const BadRequestError = require('./bad-request');
const NotFoundError = require('./not-found');
const UnauthenticatedError = require('./unauthenticated');
const ForbiddenError = require('./forbidden');

module.exports = {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  ForbiddenError,
};
