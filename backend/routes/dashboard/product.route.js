import express from "express";

import {
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProducts,
  deleteReview,
  deleteReviews,
  getReviews,
  getProducts,
  getProduct,
  searchProducts,
} from "../../controllers/dashboard/product.controller.js";
import { validateProductFields } from "../../middleware/verify_product_fields.js";
import { check_auth } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.use(check_auth("admin"));

// Main Product Routes
router
  .route("/")
  .post(validateProductFields, createProduct)
  .get(getProducts)
  .delete(deleteProducts);

router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

// Search Routes
router.route("/search").get(searchProducts);

// // Reviews Sub-Routes
// router
//   .route("/:id/reviews")
//   .get(getReviews) /reviews
//   .delete(deleteReviews);

// router.route("/:productId/reviews/:reviewId").delete(deleteReview);

export default router;
