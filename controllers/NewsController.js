const { StatusCodes } = require("http-status-codes");
const News = require("../model/news");

const getNews = async (req, res) => {
  const news = await News.find({}).sort("createdAt");
  res.status(StatusCodes.OK).json({ news });
};

const getNew = async (req, res) => {
  const { id } = req.params;
  const news = await News.findOne({ _id: id });
  if (!news) {
    throw new NotFoundError("news Not Found");
  }
  res.status(StatusCodes.OK).json({
    news,
  });
};

const createNews = async (req, res) => {
  await News.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "sucess" });
};

module.exports = { getNews, createNews, getNew };
