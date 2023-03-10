const express = require("express");
const router = new express.Router();
const postRegister = require("../controller/register");
const postLogin = require("../controller/login");

router.post("/register", postRegister);
router.post("/login", postLogin);

module.exports = router;
