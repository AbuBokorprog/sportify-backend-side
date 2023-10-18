const error = require("../utils/error");

const router = require("express").Router();

router.get("/:email", (req, res, next) => {
  try {
    const email = req.params.email;
    if (!email) {
      throw error("Please enter a valid email address", 404);
    }

    if (email !== req.user.email) {
      throw error("Invalid User!", 404);
    }
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
