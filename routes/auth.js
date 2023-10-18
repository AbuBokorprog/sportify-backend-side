const router = require("express").Router();
const user = require("../models/User");
const jwt = require("jsonwebtoken");
const error = require("../utils/error");

router.post("/register", async (req, res, next) => {
  const data = req.body;

  try {
    if (!data.name || !data.email || !data.photoURL || !data.gender) {
      throw error("Please provide name, email, photoURL and gender!", 400);
    }

    data.role = "student";

    const result = await user.post(data);

    res.status(201).json({message: "User created successfully!", result});
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const data = req.body;

  try {
    if (!data.name || !data.email) {
      throw error("Please provide name and email!", 404);
    }

    const token = jwt.sign(data, process.env.AUTH_SECRET_KEY);

    return res.status(200).json({message: "Login successfully!", token});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
