const router = require("express").Router();

const authenticate = require("../middleware/authenticate");
const isAdmin = require("../middleware/isAdmin");
const isInstructor = require("../middleware/isInstructor");

const authRoutes = require("./auth");
const userRoutes = require("./user");
const adminRoutes = require("./admin");
const instructorRoutes = require("./instructor");
const courseRoutes = require("./course");

router.use("/auth", authRoutes);
router.use("/user", userRoutes); //authenticate
router.use("/admin", isAdmin, adminRoutes); //authenticate
router.use("/instructor", isInstructor, instructorRoutes); //authenticate

router.use("/course", courseRoutes);

module.exports = router;
