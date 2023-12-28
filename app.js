const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routers
const categoriesRouter = require('./app/api/v1/categories/router');

// Middlewares
const notFoundMiddleWare = require('./app/middleware/not-found');
const errorHandlerMiddleWare = require('./app/middleware/error-handler');

const v1 = '/api/v1/cms';
app.use(v1, categoriesRouter);
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);

module.exports = app;
