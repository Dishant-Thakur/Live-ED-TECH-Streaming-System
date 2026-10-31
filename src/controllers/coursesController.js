const Course = require("../models/courses");
const createCourses = async (req, res) => {
  try {
    const { title, description, thumbnail, price, originalPrice } = req.body;
    if (
      !title ||
      !description ||
      !thumbnail ||
      price === undefined ||
      originalPrice === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newCourse = await Course.create({
      title,
      description,
      thumbnail,
      price,
      originalPrice,
    });

    await newCourse.save();
    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error("Create course error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      isPublished: true,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalCourses: courses.length,
      courses,
    });
  } catch (error) {
    console.error("Get courses error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { createCourses, getAllCourses };
