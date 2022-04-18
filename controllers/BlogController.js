const { StatusCodes } = require("http-status-codes");
const Blog = require("../model/blog");

const getBlogs = async (req, res) => {
  const blog = await Blog.find({}).sort("createdAt");
  res.status(StatusCodes.OK).json({ blog });
};

const createBlog = async (req, res) => {
  await Blog.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "sucess" });
};

module.exports = { getBlogs, createBlog };
