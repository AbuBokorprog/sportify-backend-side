const user = require("../models/User");
const error = require("../utils/error");

const router = require("express").Router();

router.get("/user/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const isUser = await user.getById(id);

    if (!isUser) {
      throw error("User not found", 404);
    }
    res.json(isUser);
  } catch (err) {
    next(err);
  }
});

router.delete("/user/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const isUser = await user.getById(id);

    if (!isUser) {
      throw error("User not Found!", 404);
    }

    const isDelete = await user.deleteById(id);

    if (!isDelete.deletedCount) {
      throw error("Failed to delete user.", 404);
    }

    res.json({message: "User deleted successfully!"});
  } catch (err) {
    next(err);
  }
});

router.put("/user/:id", async (req, res, next) => {
  const role = {
    student: "STUDENT",
    instructor: "INSTRUCTOR",
    admin: "ADMIN",
  };

  try {
    const id = req.params.id;
    const value = req.body;

    if (Object.keys(value).length === 0) {
      throw error("Please provide updated values.", 404);
    }

    if (value.email) {
      throw error("Email can not be editable.");
    }

    if (value.role) {
      if (!role[value.role.toLowerCase()]) {
        throw error("Roles must be STUDENT, INSTRUCTOR or ADMIN.", 404);
      }
      value.role = role[value.role.toLowerCase()];
    }

    let isUser = await user.getById(id);

    if (!isUser) {
      throw error("User not Found!", 404);
    }

    const updatedValue = await user.updateById(id, value);

    if (!updatedValue.modifiedCount) {
      throw error("Failed to update user.", 404);
    }

    isUser = await user.getById(id);

    res.json({message: "User updated successfully!", user: isUser});
  } catch (err) {
    next(err);
  }
});

router.get("/user", async (req, res, next) => {
  try {
    const users = await user.getUser();

    if (!users) {
      throw error("User not found!", 404);
    }

    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/", (req, res) => {
  res.send("admin");
});

module.exports = router;
