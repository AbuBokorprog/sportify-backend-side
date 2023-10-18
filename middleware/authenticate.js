const jwt = require("jsonwebtoken");
const user = require("../models/User");
const error = require("../utils/error");

async function authenticate(req, res, next) {
  try {
    let token = req.headers.authorization;
    if (!token) {
      throw error("Unauthorized", 401);
    }

    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.AUTH_SECRET_KEY);

    const isUser = await user.getByEmail(decoded.email);

    if (!isUser) {
      throw error("User not found", 400);
    }

    req.user = isUser;

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authenticate;
