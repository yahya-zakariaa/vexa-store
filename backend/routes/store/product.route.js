import express from "express";
const router = express.Router();
import {
  getProducts,
  getProduct,
  addReview,
  getSearchSuggestions,
} from "../../controllers/store/product.controller.js";
import { check_auth } from "../../middleware/auth.middleware.js";

// Main Product Routes
router.route("/").get(getProducts); // GET    /api/products
router.route("/search-suggestions").get(getSearchSuggestions);
router.route("/:id").get(getProduct); // GET    /api/products/:productId

// Reviews Sub-Routes
router.route("/:id/reviews").post(check_auth, addReview); // POST   /api/products/:productId/reviews

export default router;
