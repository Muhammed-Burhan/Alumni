const { StatusCodes } = require("http-status-codes");

const Community = require("../model/community");

const getCommunities = async (req, res) => {
  const community = await Community.find({}).sort("createdAt");
  res.status(StatusCodes.OK).json({ community });
};

const createCommunity = async (req, res) => {
  await Community.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "success" });
};

module.exports = { createCommunity, getCommunities };
