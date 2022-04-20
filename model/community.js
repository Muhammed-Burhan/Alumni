const mongoos = require("mongoose");

const communitySchma = new mongoos.Schema({
  title: {
    type: String,
    required: [true, "title of the community is required"],
  },
  typeofCommunity: {
    type: String,
    enum: {
      values: ["Discord", "Slack", "Facebook", "Telegram"],
      message: "${VALUE} is not valid",
    },
  },
  description: {
    type: String,
    required: [true, "you have to provide info about the community"],
    maxlength: [150, "only a short explaining is required"],
  },
  cover_image: { type: String, default: "https://i.ibb.co/ssdYw7g/Alumni.png" },
  link: {
    type: String,
    required: [true, "link for the community is required"],
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date },
});

module.exports = mongoos.model("Community", communitySchma);
