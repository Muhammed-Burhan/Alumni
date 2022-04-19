const { StatusCodes } = require("http-status-codes");

const Event = require("../model/event");

const getEvents = async (req, res) => {
  const event = await Event.find({}).sort("presenter createdAt");
  res.status(StatusCodes.OK).json({ event });
};

const createEvent = async (req, res) => {
  await Event.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "sucess" });
};

module.exports = { createEvent, getEvents };
