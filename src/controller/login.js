const express = require("express");
const model = require("../model/schema");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
  try {
    // console.log(req.body);s
    // console.log(req.files);
    const password = req.body.password;
    // console.log(password);
    // const user = req.body.email;
    // console.log(user);
    const read = await model.findOne({
      $or: [
        {
          email: req.body.userName,
        },
        {
          userName: req.body.userName,
        },
        {
          phone: req.body.userName,
        },
      ],
    });
    // console.log(read);
    if (read != null) {
      const encPass = await bcrypt.compare(password, read.password);
      // console.log("encPass", encPass);
      const token = jwt.sign(
        { _id: read._id.toString() },
        process.env.SECRET_KEY
      );
      if (encPass) {
        // console.log("the token:" + token);
        // console.log("3");
        res.send({
          status: true,
          statusCode: 401,
          message: "logged in successfully ",
          data: { token: token },
        });
      } else {
        // console.log("4");
        res.send({
          status: false,
          statusCode: 401,
          message: "invalid password",
          data: [],
        });
      }
    } else {
      res.send({
        status: false,
        statusCode: 401,
        message: "not a user",
        data: [],
      });
    }
  } catch (error) {
    res.send({
      status: false,
      statusCode: 400,
      message: "there is problem while logging " + error,
      data: [],
    });

    console.log(error);
  }
};

module.exports = postLogin;
