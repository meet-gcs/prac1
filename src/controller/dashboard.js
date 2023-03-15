const model = require("../model/schema");

const express = require("express");

const dashboard = async (req, res) => {
  try {
    // console.log("1");
    // console.log("req.body", req.body);
    // console.log(req.body.id);
    const data = await model.findOne({ _id: req.body.id }, { password: 0 });
    res.body = data;
    // console.log(res.body);

    res.send({
      status: true,
      statusCode: 200,
      message: " new user data",
      data: res.body,
    });
  } catch (error) {
    res.send({
      status: false,
      statusCode: 401,
      message: "user not found",
      data: error,
    });
  }
};

module.exports = dashboard;
