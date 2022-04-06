const { StatusCodes } = require("http-status-codes");
const notFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send("<h1>ERROR 404 NOT FOUND</h1>");
};

module.exports = notFound;
