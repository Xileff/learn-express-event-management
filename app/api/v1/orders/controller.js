const { StatusCodes } = require('http-status-codes');
const { getAllOrders } = require('../../../services/mongoose/orders');

const index = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);
    return res.status(StatusCodes.OK).json({
      status: 'success',
      data: {
        order: result.data,
        pages: result.pages,
        total: result.total,
      },
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { index };
