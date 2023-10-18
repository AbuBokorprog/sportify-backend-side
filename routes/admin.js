const user = require("../models/User");

const router = require("express").Router();

router.get("/user", async (req, res, next) => {
  try {
    const users = await user.getUser();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/", (req, res) => {
  res.send("admin");
});

module.exports = router;
