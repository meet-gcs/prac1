// require("dotenv").config();
require("./src/db/conn");
const express = require("express");
const app = express();
const port = "8000";
const bodyParser = require("body-parser");
const path = require("path");
const fileUpload = require("express-fileupload");
const router = require("./src/router/router");
app.use(express.static(__dirname + "./public/"));
// const model = require("./src/model/schema");
app.use(fileUpload());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
    parameterLimit: 1000000,
  })
);
app.use(router);

// console.log(__dirname + "/public/upload/");

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
