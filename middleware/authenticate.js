const jwt = require("jsonwebtoken");
const user = require("../models/User");

async function authenticate(req, res, next) {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({message: "Unauthorized"});
    }

    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.AUTH_SECRET_KEY);

    const isUser = await user.getByEmail(decoded.email);

    if (!isUser) {
      return res.status(404).json({message: "User not found"});
    }

    req.user = isUser;

    next();
  } catch (error) {
    return res.status(500).json({message: "Unauthorized"});
  }
}

module.exports = authenticate;
