const router = require("express").Router();

const authenticate = require("../middleware/authenticate");
const isAdmin = require("../middleware/isAdmin");

const authRoutes = require("./auth");
const adminRoutes = require("./admin");
const userRoutes = require("./user");

router.use("/auth", authRoutes);
router.use("/admin", authenticate, isAdmin, adminRoutes);
router.use("/user", authenticate, userRoutes);

module.exports = router;
