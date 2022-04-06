const jwt = require("jsonwebtoken");

const { UnauthenticatedError } = require("../errors/index");

const authnticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Your Not Authorized");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    throw new UnauthenticatedError(" Not allowed to access data ");
  }
};

module.exports = authnticationMiddleware;
