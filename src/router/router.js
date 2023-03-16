const express = require("express");
const router = new express.Router();
const postRegister = require("../controller/register");
const postLogin = require("../controller/login");
const auth = require("../middleware/auth");
const dashboard = require("../controller/dashboard");
const fcm = require("../middleware/fcm");

router.post("/register", postRegister);
// router.get("/register", (req, res) => {
//   res.send("register page ");
// });
router.post("/login", postLogin);
// router.get("/login", (req, res) => {
//   res.send("login page ");
// });
router.get("/dashboard", auth, dashboard);
// router.get("/dashboard", (req, res) => {
//   res.send("dashboard page ");
// });

module.exports = router;
