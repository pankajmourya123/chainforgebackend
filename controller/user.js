import User from "../model/user.js";
import bcrypt from "bcrypt";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js"; // Ensure ErrorHandler is imported

// Register User
export const registerUser = catchAsyncError(async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return next(new ErrorHandler("All fields are required", 400));
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        let user = new User({
            name,
            email,
            password: hashedPassword,
        });

        let result = await user.save();
        result = result.toObject();
        delete result.password;

        res.status(201).json({ success: true, message: "User registered successfully", user: result });
    } catch (error) {
        console.error(error); // Log the error for debugging
        next(error); // Pass the error to the error handling middleware
    }
});

// Login User
export const loginUser = catchAsyncError(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ErrorHandler("Email and password are required", 400));
        }

        let user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new ErrorHandler("Invalid credentials", 401));
        }

        user = user.toObject();
        delete user.password;

        res.status(200).json({ success: true, message: "Login successful", user });
    } catch (error) {
        console.error(error); // Log the error for debugging
        next(error); // Pass the error to the error handling middleware
    }
});
