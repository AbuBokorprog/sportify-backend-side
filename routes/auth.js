const router = require("express").Router();
const user = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const data = req.body;

  try {
    if (!data.name || !data.email || !data.photoURL || !data.gender) {
      return res.status(400).json({
        message: "Please provide name, email, photoURL and gender!",
      });
    }

    data.role = "student";

    const result = await user.post(data);

    if (result) {
      res.status(201).json({message: "User created successfully!", result});
    } else {
      res.status(500).json({message: "Failed to create user!"});
    }
  } catch (err) {
    res.status(500).json({message: "Failed to create user!"});
  }
});

router.post("/login", async (req, res) => {
  const data = req.body;

  try {
    if (!data.name || !data.email) {
      return res.status(400).json({
        message: "Please provide name and email!",
      });
    }

    const token = jwt.sign(data, process.env.AUTH_SECRET_KEY);

    return res.status(200).json({message: "Login successfully!", token});
  } catch (e) {
    res.status(500).json({message: "Failed to login!"});
  }
});

module.exports = router;
