const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  dateOfJoin: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "email already exist"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email is invalid");
      }
    },
  },
  phoneNum: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  doc: {
    type: String,
    required: true,
  },
});
schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    console.log("done");
  }
  next();
});

const model = new mongoose.model("regData", schema);
module.exports = model;
