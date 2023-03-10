const express = require("express");
const router = new express.Router();
const postRegister = require("../controller/post");

router.post("/register", postRegister);

module.exports = router;
