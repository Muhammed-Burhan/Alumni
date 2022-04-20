const { StatusCodes } = require("http-status-codes");
const Blog = require("../model/blog");

const getBlogs = async (req, res) => {
  let result = Blog.find({});
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const blog = await result;
  res.status(StatusCodes.OK).json({ blog });
};

const getBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findOne({ _id: id });
  if (!blog) {
    throw new NotFoundError("blog Not Found");
  }
  res.status(StatusCodes.OK).json({
    blog,
  });
};

const createBlog = async (req, res) => {
  await Blog.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "sucess" });
};

module.exports = { getBlogs, createBlog, getBlog };
