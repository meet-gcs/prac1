const model = require("../model/schema");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    console.log(req.headers.token);
    const token = req.headers.token;
    const verParser = await jwt.verify(token, process.env.SECRET_KEY);
    // console.log(verParser);
    req.body.id = verParser._id;

    next();
  } catch (error) {
    res.send({
      status: false,
      statusCode: 401,
      message: "user not found",
      data: error,
    });
  }
};

module.exports = auth;
