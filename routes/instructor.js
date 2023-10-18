const {ObjectId} = require("mongodb");
const course = require("../models/Course");
const error = require("../utils/error");

const router = require("express").Router();

router.get("/course/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await course.getById(id);

    if (!result) {
      throw error("Course not found!", 404);
    }

    const instructorId = new ObjectId(result.instructorId);
    const userId = new ObjectId(req.user._id);

    if (!instructorId.equals(userId)) {
      throw error("Can not access this course!", 404);
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.put("/course/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const value = req.body;

    if (Object.keys(value).length === 0) {
      throw error("Please provide updated values.", 404);
    }

    const isAbleCourse = await course.getById(id);

    if (!isAbleCourse) {
      throw error("Course not found!", 404);
    }

    const instructorId = new ObjectId(isAbleCourse.instructorId);
    const userId = new ObjectId(req.user._id);

    if (!instructorId.equals(userId)) {
      throw error("Can not access this course!", 404);
    }

    const result = await course.updateById(id, value);

    if (!result.modifiedCount) {
      throw error("Failed to update!", 404);
    }

    res.json({message: "Course updated successfully!"});
  } catch (err) {
    next(err);
  }
});

router.delete("/course/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const isAbleCourse = await course.getById(id);

    if (!isAbleCourse) {
      throw error("Course not found!", 404);
    }

    const instructorId = new ObjectId(isAbleCourse.instructorId);
    const userId = new ObjectId(req.user._id);

    if (!instructorId.equals(userId)) {
      throw error("Can not access this course!", 404);
    }

    const result = await course.deleteById(id);

    if (!result.deletedCount) {
      throw error("Failed to delete!", 404);
    }

    res.json({message: "Deleted course successfully!"});
  } catch (err) {
    next(err);
  }
});

router.get("/course", async (req, res, next) => {
  try {
    const instructorCourse = await course.getByInstructorId(req.user._id);

    if (instructorCourse.length === 0) {
      throw error("Course not found!", 404);
    }

    res.json(instructorCourse);
  } catch (err) {
    next(err);
  }
});

router.post("/course", async (req, res, next) => {
  const data = req.body;
  try {
    if (
      !data.thumbnail ||
      !data.title ||
      !data.description ||
      !data.availableSeat ||
      !data.price
    ) {
      throw error("Please provide course data", 404);
    }

    data.status = "PENDING";
    data.instructorId = req.user._id;

    const result = await course.post(data);

    if (!result.insertedId) {
      throw error("Failed to create new course", 404);
    }

    res.status(201).json({...result, message: "Course created successfully!"});
  } catch (err) {
    next(err);
  }
});

router.get("/", (req, res, next) => {
  res.send("instructor");
});

module.exports = router;
