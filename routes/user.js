import express from "express";
import { registerUser, loginUser } from "../controller/user.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";

const router = express.Router();

// Apply catchAsyncError middleware to the route handlers
router.post("/register", catchAsyncError(registerUser));
router.post("/login", catchAsyncError(loginUser));

export default router;
