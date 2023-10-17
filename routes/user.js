const router = require("express").Router();
const user = require("../models/User");

router.get("/", async (req, res) => {
  const email = req.query.email;

  try {
    const result = await user.getByEmail(email);
    res.json(result);
  } catch (error) {
    res.status(500).json({message: "Failed to fetch documents"});
  }
});

module.exports = router;
