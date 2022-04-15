const mongoos = require("mongoose");

const alumniSchema = new mongoos.Schema({
  name: { type: String, required: [true, "Please Enter Name"] },
  personal_email: {
    type: String,
    required: [true, "Personal Email is required"],
    math: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  college_email: {
    type: String,
    required: [true, "College email Email is required"],
    match: [
      /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(student.su.edu.krd)/,
      "pleae enter college domain",
    ],
  },
  phone_no: {
    type: Number,
    required: [true, "Phone number required"],
    // max: [14, "Phone number cannot be more than 14 digits "],
    // match: [
    //   /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{4}[-\s\.]?[0-9]{4,7}$/,
    //   "Wrong phone number",
    // ],
  },
  address: { type: String },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "Male", "Female"],
      message: "${VALUE} is not vailed",
    },
  },
  work_startus: {
    type: String,
    enum: {
      values: ["employed", "unemployed"],
      message: "${VALUE} is not vailed",
    },
    default: "unemployed",
  },
  years_of_work: { type: Number, default: 0 },
  gradute_year: {
    type: Number,
    default: 2022,
    // required: [true, "Gradution Year is required"],
  },
  cv: { type: String, default: "Null" },
  photo: {
    type: String,
    default: "https://180dc.org/wp-content/uploads/2016/08/default-profile.png",
  },
  birthday: { type: Date, required: [true, "Date of brith is required"] },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date },
});

module.exports = mongoos.model("Alumni", alumniSchema);
