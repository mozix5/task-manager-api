const jwt = require("jsonwebtoken");
const SECRET_KEY = "TASK_APP";
const dotenv = require("dotenv");
const auth = (req, res, next) => {
  console.log(SECRET_KEY);
  try {
    let token = req.headers.authorization;

    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);
      req.userId = user.id;
    } else {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized User" });
  }
};
module.exports = auth;
