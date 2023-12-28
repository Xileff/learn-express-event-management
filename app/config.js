const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT,
  urlDb: process.env.URL_MONGODB_DEV,
}