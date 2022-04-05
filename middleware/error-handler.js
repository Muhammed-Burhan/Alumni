const { CustomApiError } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");
const errorHandler = async (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("<h1>Something went wrong</h1><br>try again later");
};

module.exports = errorHandler;
