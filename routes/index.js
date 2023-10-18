const router = require("express").Router();

const authenticate = require("../middleware/authenticate");
const authRoutes = require("./auth");
const userRoutes = require("./user");

router.use("/auth", authRoutes);
router.use("/user", authenticate, userRoutes);

module.exports = router;
