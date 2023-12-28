const mongoose = require('mongoose');
const { urlDb } = require('../config');

mongoose.connect(urlDb, { family: 4 });
const db = mongoose.connection;

module.exports = db;