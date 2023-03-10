const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/prac1")
  .then(() => {
    console.log("connection success");
  })
  .catch((err) => {
    console.log(err);
  });
