const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const v1 = '/api/v1/cms';

// Routers
const categoriesRouter = require('./app/api/v1/categories/router');
const imagesRouter = require('./app/api/v1/images/router');

app.use(v1, categoriesRouter);
app.use(v1, imagesRouter);

// Middlewares
const notFoundMiddleWare = require('./app/middleware/not-found');
const errorHandlerMiddleWare = require('./app/middleware/error-handler');

app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);

module.exports = app;
