const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// Routers
const categoriesRouter = require('./app/api/v1/categories/router');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const v1 = '/api/v1/cms';
app.use(v1, categoriesRouter);

module.exports = app;
