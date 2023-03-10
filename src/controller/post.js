const express = require("express");
const model = require("../model/schema");
const path = require("path");
const uPath = "/Users/CS014/prac1/public/upload/";
var path1 = "";

const postRegister = async (req, res) => {
  try {
    const pass = req.body.password;
    console.log(pass);
    const conPass = req.body.conformPassword;
    console.log(conPass);

    if (pass == conPass) {
      //image upload
      const image = req.files;
      console.log(image);
      console.log(image.image.name);

      const ext = path.extname(image.image.name);
      console.log("extention is " + ext);

      // image path genrating
      path1 = path.join(uPath + Date.now() + ext);

      if (ext == ".jpeg" || ext == ".jpg" || ext == ".png") {
        console.log(path1);
        //image uploaded
        image.image.mv(path1);

        //setting values
        const regData = new model({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          dateOfBirth: req.body.dateOfBirth,
          dateOfJoin: req.body.dateOfJoin,
          gender: req.body.gender,
          bloodGroup: req.body.bloodGroup,
          email: req.body.email,
          phoneNum: req.body.phoneNum,
          userName: req.body.userName,
          password: req.body.password,
          image: path1,
        });

        // console.log(image);
        const done = await regData.save();
        res.status(201).render("login");
      } else {
        res.send("enter a valid image with a jpeg ,png or jpg formate ");
      }
    } else {
      res.send("password not matching please enter same pass ");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = postRegister;
