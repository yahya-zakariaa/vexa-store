import { Category } from "../../models/category.model.js";
import { Product } from "../../models/product.model.js";

const createProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    images,
    stock,
    sizes,
    gender,
    discount,
    discountType,
    availability,
  } = req.body;

  try {
    const existingProduct = await Product.findOne({ name, description });

    if (existingProduct) {
      return res.status(409).json({
        status: "fail",
        message: "Product with this name or description is exist",
      });
    }

    const validatedDiscount = Math.min(Math.max(discount || 0, 0), 100);

    const product = await Product.create({
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price).toFixed(2),
      category,
      images: images.map((img) => img.trim()),
      stock: parseInt(stock),
      discount: validatedDiscount,
      gender,
      sizes,
      discountType,
      availability: !!availability,
    });
    if (!product)
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    product.totalPrice = product.calculateTotalPrice(
      product.price,
      validatedDiscount
    );
    await product.save();
    console.log(product);

    return res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .sort({ avgReting: -1 });
    return res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("category");

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let {
      name,
      description,
      price,
      category,
      images,
      stock,
      sizes,
      gender,
      discount,
      discountType,
      availability,
    } = req.body;

    console.log(req.body);

    const validatedDiscount = Math.min(Math.max(discount || 0, 0), 100);

    if (category) {
      let existingCategory = await Category.findOne({ name: category });
      if (!existingCategory) {
        const newCategory = await Category.create({ name: category });
        category = newCategory._id.toString();
      } else {
        category = existingCategory._id.toString();
      }
    }

    const updateData = {};

    if (name !== undefined) updateData.name = name.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (price !== undefined)
      updateData.price = Number(parseFloat(price).toFixed(2));
    if (category) updateData.category = category;
    if (images !== undefined)
      updateData.images = Array.isArray(images)
        ? images.map((img) => img.trim())
        : [];
    if (stock !== undefined) updateData.stock = parseInt(stock);
    if (sizes !== undefined) updateData.sizes = sizes;
    if (gender !== undefined) updateData.gender = gender;
    updateData.discount = validatedDiscount;
    if (discountType !== undefined) updateData.discountType = discountType;
    if (availability !== undefined) updateData.availability = !!availability;

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    updatedProduct.totalPrice = updatedProduct.calculateTotalPrice(
      updatedProduct.price,
      validatedDiscount
    );
    await updatedProduct.save();

    return res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: "fail",
        message: "Product ID is required",
      });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};

const searchProducts = async (req, res) => {};
const getReviews = async (req, res) => {};
const getRatings = async (req, res) => {};
const deleteProducts = async (req, res) => {};
const deleteReview = async (req, res) => {};
const deleteReviews = async (req, res) => {};

export {
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProducts,
  deleteReview,
  deleteReviews,
  getReviews,
  getRatings,
  getProducts,
  getProduct,
  searchProducts,
};
