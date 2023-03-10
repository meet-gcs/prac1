const express = require("express");
const model = require("../model/schema");
const path = require("path");
const postLogin = async (req, res) => {
  try {
    console.log(req.body);
    const password = req.body.password;
    console.log(password);
    const user = req.body.email;
    console.log(user);
    // const read = await regModel.findOne({ email: user });
  } catch (error) {}
};

module.exports = postLogin;
