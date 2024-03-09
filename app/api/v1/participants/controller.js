const { StatusCodes } = require("http-status-codes");
const { signUpParticipant, activateParticipant, signinParticipant, getAllEvents, getOneEvent, getAllOrders } = require("../../../services/mongoose/participants");

const signup = async (req, res, next) => {
  try {
    const result = await signUpParticipant(req);
    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
}

const activate = async (req, res, next) => {
  try {
    const result = await activateParticipant(req);
    return res.status(StatusCodes.OK).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
}

const signin = async (req, res, next) => {
  try {
    const result = await signinParticipant(req);
    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: {
        token: result,
      },
    });
  } catch (err) {
    return next(err);
  }
}

const getAllLandingPage = async (req, res, next) => {
  try {
    const result = await getAllEvents(req);
    return res.status(StatusCodes.OK).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

const getDetailLandingPage = async (req, res, next) => {
  try {
    const result = await getOneEvent(req);
    return res.status(StatusCodes.OK).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

const getDashboard = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);
    return res.status(StatusCodes.OK).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  signup,
  activate,
  signin,
  getAllLandingPage,
  getDetailLandingPage,
  getDashboard,
};
