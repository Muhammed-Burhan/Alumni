const { NotFoundError, BadRequestError } = require("../errors/index");
const Alumni = require("../model/alumni");

const getAlumnis = async (req, res) => {
  const alumnis = await Alumni.find({}).sort("name createdAt");
  res.status(200).json({
    data: alumnis,
  });
};

const getAlumni = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const alumni_ = await Alumni.findOne({ _id: id });
  if (!alumni_) {
    throw new NotFoundError("Alumni Not Found");
  }
  res.status(200).json({
    alumni_,
  });
};
// //
const createAlumni = async (req, res) => {
  const newAlumni = await Alumni.create(req.body);
  res.status(201).json({ newAlumni });
};

const updateAlumni = async (req, res) => {
  const { id } = req.params;
  const alumni = await Alumni.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!alumni) {
    throw new NotFoundError(`no alumni with ID: ${id} was found`);
  }
  res.status(200).json({ alumni });
};

const deleteAlumni = async (req, res) => {
  const { id } = req.params;
  const alumni = await Alumni.findByIdAndDelete({ _id: id });
  if (!alumni) {
    throw new NotFoundError(`no alumni with ID: ${id} was found`);
  }
  res.status(200).json({ msg: "delted" });
};

module.exports = {
  getAlumnis,
  getAlumni,
  createAlumni,
  updateAlumni,
  deleteAlumni,
};
