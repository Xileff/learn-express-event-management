const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const config = require('./app/config');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: config.urlFrontEnd,
    optionsSuccessStatus: 200,
  })
);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

const v1 = '/api/v1';

// Routers
const categoriesRouter = require('./app/api/v1/categories/router');
const imagesRouter = require('./app/api/v1/images/router');
const talentsRouter = require('./app/api/v1/talents/router');
const eventsRouter = require('./app/api/v1/events/router');
const organizersRouter = require('./app/api/v1/organizers/router');
const authCMSRouter = require('./app/api/v1/auth/router');
const ordersRouter = require('./app/api/v1/orders/router');
const participantRouter = require('./app/api/v1/participants/router');
const paymentsRouter = require('./app/api/v1/payments/router');

app.use(`${v1}/cms`, categoriesRouter);
app.use(`${v1}/cms`, imagesRouter);
app.use(`${v1}/cms`, talentsRouter);
app.use(`${v1}/cms`, eventsRouter);
app.use(`${v1}/cms`, organizersRouter);
app.use(`${v1}/cms`, authCMSRouter);
app.use(`${v1}/cms`, ordersRouter);
app.use(`${v1}/cms`, paymentsRouter);
app.use(v1, participantRouter);

// Middlewares to catch error before sending response
const notFoundMiddleWare = require('./app/middleware/not-found');
const errorHandlerMiddleWare = require('./app/middleware/error-handler');

app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);

module.exports = app;
