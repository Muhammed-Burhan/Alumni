const { default: mongoose } = require("mongoose");
const mongoos = require("mongoose");

const blogSchema = new mongoos.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description required for the news"],
    maxlength: [450, "the description is to long"],
  },
  author_id: mongoos.Types.ObjectId,
  author: { type: String, required: [true, "the author name is required"] },
  cover_image: {
    type: String,
    default:
      "https://3.bp.blogspot.com/-59LSnbaW6PU/UeL_8RLHBhI/AAAAAAAABZM/RFY7QwobMq8/s1600/IMAG0503.jpg",
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
