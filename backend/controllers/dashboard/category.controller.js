import { Category } from "../../models/category.model.js";

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: "success",
      data: categories,
      total: categories?.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};

const createCategory = async (req, res) => {
  const { name, image, isActive, slug } = req.body;
  if (!name || !slug) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields",
    });
  }

  try {
    const category = await Category.create({
      name,
      image,
      isActive: isActive !== "undefined" ? isActive : true,
      slug,
    });
    res.status(201).json({
      status: "success",
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};

const updateCategory = async (req, res) => {
  const { name, image, isActive, slug, isFutered } = req.body;
  const { id } = req.params;
  let updateData = {};
  if (name) updateData.name = name;
  if (image) updateData.image = image;
  if (slug) updateData.slug = slug;
  if (typeof isActive !== "undefined") updateData.isActive = isActive;
  if (typeof isFutered !== "undefined") updateData.isFutered = isFutered;
  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      status: "fail",
      message: "No fields provided to update",
    });
  }
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedCategory) {
      return res.status(404).json({
        status: "error",
        message: "Category not found or invalid ID",
      });
    }
    res.status(201).json({
      status: "success",
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields",
    });
  }
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Category not found or invalid ID",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};

export { createCategory, updateCategory, deleteCategory, getCategories };
