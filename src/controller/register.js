const express = require("express");
const model = require("../model/schema");
const path = require("path");
const iPath = "/Users/CS014/prac1/public/upload/image/";
const dPath = "/Users/CS014/prac1/public/upload/document/";
const jwt = require("jsonwebtoken");

var path1 = "";
var path2 = "";

const postRegister = async (req, res) => {
  try {
    console.log("body", req.body);
    // console.log("files", req.files);

    const user = req.body.email;
    const eCheck = await model.findOne({ email: user });
    // console.log("eCheck", eCheck);
    const user1 = req.body.userName;
    const uCheck = await model.findOne({ userName: user1 });
    // console.log("uCheck", uCheck);
    const user2 = req.body.phone;
    const pCheck = await model.findOne({ phone: user2 });
    // console.log("pCheck", pCheck);

    const image = req.files.image;
    const document = req.files.document;
    // console.log(image);
    // console.log(document);

    // console.log(image.image.name);

    const ext = path.extname(image.name);
    console.log("extention is " + ext);
    const extD = path.extname(document.name);
    console.log("extention is " + extD);

    // image path genrating
    path1 = path.join("img_" + Date.now() + ext);
    // console.log(path1);
    path2 = path.join("doc_" + Date.now() + extD);
    // console.log(path2);

    // console.log("123");
    if (eCheck === null) {
      // console.log("1");
      if (pCheck === null) {
        // console.log("1");

        if (uCheck === null) {
          // console.log("2");

          if (ext == ".jpeg" || ext == ".jpg" || ext == ".png") {
            // console.log("3");

            // console.log(1);
            if (extD == ".pdf") {
              // console.log("4");
              //image uploaded
              image.mv(iPath + path1);
              //pdf upload
              document.mv(dPath + path2);
              //setting values
              const regData = new model({
                ...req.body,
                image: path1,
                document: path2,
              });
              // console.log("abc", regData);
              const done = await regData.save();

              const token = jwt.sign(
                { _id: regData._id.toString() },
                process.env.SECRET_KEY
              );

              res.send({
                status: true,
                statusCode: 201,
                message: " new user registered",
                data: { token: token },
              });
            } else {
              res.send({
                status: false,
                statusCode: 400,
                message: "please select a valid file with .pdf extention",
                data: [],
              });
            }
          } else {
            res.send({
              status: false,
              statusCode: 400,
              message: "enter a valid image with a jpeg ,png or jpg formate ",
              data: [],
            });
          }
        } else {
          res.send({
            status: false,
            statusCode: 400,
            message: "user with this username already there ",
            data: [],
          });
        }
      } else {
        res.send({
          status: false,
          statusCode: 400,
          message: "user with this phone number  already there ",
          data: [],
        });
      }
    } else {
      res.send({
        status: false,
        statusCode: 400,
        message: "user with this email already there ",
        data: [],
      });
    }
  } catch (error) {
    res.send({
      status: false,
      statusCode: 400,
      message: error,
      data: [],
    });
  }
};

module.exports = postRegister;
