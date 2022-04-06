const CustomApiError = require("./custom-error-class");
const UnauthenticatedError = require("./unauthenticated");
const BadRequestError = require("./bad-request");
const NotFoundError = require("./not-found");
module.exports = {
  CustomApiError,
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
};
