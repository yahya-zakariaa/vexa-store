import { validationResult } from "express-validator";
import { Category } from "../models/category.model.js";

export const validateProductFields = async (req, res, next) => {
  console.log("verify product");

  if (!req.body)
    return res
      .status(400)
      .json({ status: "error", message: "Missing required fields" });

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ status: "Failed", message: errors.array() || "Invalid input" });
    }
    let {
      name,
      description,
      price,
      category,
      images,
      stock,
      gender,
      availability,
    } = req.body;

    if (!category || typeof category !== "string") {
      return res.status(400).json({ message: "Invalid Category" });
    }
    if (!["Male", "Women", "Unisex"].includes(gender)) {
      return res
        .status(400)
        .json({ message: "gender must be one of Male, Women, or Unisex" });
    }

    let categoryId = await Category.findOne({ name: category }).select("_id ");
    console.log(categoryId);

    if (!categoryId) {
      const newCategory = await Category.create({ name: category });
      await newCategory.save();
      category = newCategory._id.toString();
    } else {
      category = categoryId._id.toString();
    }

    const validations = [
      { field: name, type: "string", message: "Name must be a string" },
      { field: category, type: "string", message: "Category must be a string" },
      {
        field: description,
        type: "string",
        message: "Description must be a string",
      },
      {
        field: price,
        type: "number",
        message: "Price must be a number",
        min: 0,
      },
      {
        field: stock,
        type: "number",
        message: "Count in stock must be a number",
        min: 0,
      },
      {
        field: availability,
        type: "boolean",
        message: "Availability must be a boolean",
      },
    ];
    console.log(images);

    for (const validation of validations) {
      if (typeof validation.field !== validation.type) {
        return res.status(400).json({ message: validation.message });
      }
      if (validation.min !== undefined && validation.field < validation.min) {
        return res.status(400).json({
          message: `${validation.message} and must be at least ${validation.min}`,
        });
      }
    }

    if (typeof images === "string") {
      images = images.split(",").map((img) => img.trim());
    }

    if (!Array.isArray(images)) {
      return res.status(400).json({ message: "Images must be an array" });
    }

    if (images.length < 1) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }
    req.body.category = category;
    req.body.images = images;
    next();
  } catch (error) {
    next(error);
  }
};
