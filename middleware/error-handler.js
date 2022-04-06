const { CustomApiError } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");
const errorHandler = async (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  console.log(err.message);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    msg: `Something went wrong`,
  });
};

module.exports = errorHandler;
