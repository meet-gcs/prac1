const express = require("express");
const model = require("../model/schema");
const path = require("path");
const iPath = "/Users/CS014/prac1/public/upload/image/";
const dPath = "/Users/CS014/prac1/public/upload/document/";

var path1 = "";
var path2 = "";

const postRegister = async (req, res) => {
  try {
    // console.log(req.body);
    //image upload
    const user = req.body.email;
    const eCheck = await model.findOne({ email: user });
    const user1 = req.body.userName;
    const uCheck = await model.findOne({ userName: user1 });
    // console.log(read);

    const image = req.files.image;
    const doc = req.files.doc;
    // console.log(image);

    // console.log(image.image.name);

    const ext = path.extname(image.name);
    // console.log("extention is " + ext);
    const extD = path.extname(doc.name);
    // console.log("extention is " + extD);

    // image path genrating
    path1 = path.join("img_" + Date.now() + ext);
    // console.log(path1);
    path2 = path.join("doc_" + Date.now() + extD);
    // console.log(path2);
    if (eCheck === null) {
      if (uCheck === null) {
        if (ext == ".jpeg" || ext == ".jpg" || ext == ".png") {
          // console.log(1);
          if (extD == ".pdf") {
            //setting values
            const regData1 = new model({
              ...req.body,
              image: path1,
              doc: path2,
            });
            const done2 = await regData1.save();

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
              // password: req.body.password,
              image: path1,
              doc: path2,
            });

            //image uploaded
            image.mv(iPath + path1);

            //pdf upload
            doc.mv(dPath + path2);

            res.status(201).send(regData);
          } else {
            res.send("please select a valid file with .pdf extention");
          }
        } else {
          res.send("enter a valid image with a jpeg ,png or jpg formate ");
        }
      } else {
        res.send("userName already exisit ");
      }
    } else {
      res.send("email already exisit ");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = postRegister;
