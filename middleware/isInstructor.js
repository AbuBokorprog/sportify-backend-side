const error = require("../utils/error");

const isInstructor = (req, res, next) => {
  try {
    if (req.user.role !== "INSTRUCTOR") {
      throw error("You are not allowed to this route!", 403);
    }
    next();
  } catch (err) {
    next(err);
  }
};
module.exports = isInstructor;
