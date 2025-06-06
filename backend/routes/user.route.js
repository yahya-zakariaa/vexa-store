import express from "express";
import {  check_auth } from "../middleware/auth.middleware.js";

import { getUserData } from "../controllers/user.controller.js";
const router = express.Router();
router.get("/:id", check_auth, getUserData);

export default router;
