const router = require("express").Router();

const userRoutes = require("./user");
const registerRoutes = require("./register");

router.use("/register", registerRoutes);

router.use("/user", userRoutes);

module.exports = router;
