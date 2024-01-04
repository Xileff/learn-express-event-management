const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT,
  urlDb: process.env.URL_MONGODB_DEV,
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtExpiration: process.env.JWT_EXPIRATION,
};
