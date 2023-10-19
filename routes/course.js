const course = require("../models/Course");
const error = require("../utils/error");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await course.get();
    if (!result) {
      throw error("Course not found!", 404);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
