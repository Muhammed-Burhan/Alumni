const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
//security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
//package for limiting request
const rateLimiter = require("express-rate-limit");
//connect to Database
const connectDB = require("./db/connect");
//routes
const mainRouter = require("./routes/main");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
//security
app.use(helmet());
app.use(cors());
app.use(xss());

//middleware
app.use("/api/v1", mainRouter);
app.use(notFound);
app.use(errorHandler);
//port
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () => console.log(`server listeing on ${port}`));
  } catch (error) {
    console.log(error);
  }
};

//to start the server
start();
