const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const User = require("../modules/User");
const fetchUser = require("../middleware/fetchUser");

dotenv.config(); // Load environment variables

const app = express(); // Initialize Express app

// =======================================
// Route: Create a New User
// =======================================
app.post("/createUser", [
    body("name", "User name must be at least 3 characters").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 8 characters").isLength({ min: 8 }),
],
    async (req, res) => {
        // Validate user input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Check if user already exists
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ msg: "User already exists" });
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            // Create a new user
            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            });

            // Generate JWT token
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.status(201).json({ msg: "User created successfully", user: newUser, token });
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ msg: "Server error" });
        }
    }
);

// =======================================
// Route: User Login
// =======================================
app.post("/login", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password is required").exists(),
],
    async (req, res) => {
        // Validate user input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Check if user exists
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }

            // Compare passwords
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }

            // Generate JWT token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.status(200).json({ msg: "User logged in successfully", user, token });
        } catch (error) {
            console.error("Error logging in:", error);
            res.status(500).json({ msg: "Server error" });
        }
    }
);

// =======================================
// Route: Get User Details
// =======================================
app.post("/getUser", fetchUser, async (req, res) => {
    try {
        // Fetch user details excluding the password
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = app; // Export the app
