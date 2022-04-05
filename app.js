const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
//connect to Database
const connectDB = require("./db/connect");
//routes
const mainRouter = require("./routes/main");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
app.use(express.json());

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
