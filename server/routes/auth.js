const express = require('express');
const app = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../modules/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
const fetchUser = require('../middleware/fetchUser');
env.config();

app.post('/createUser', [
    //body('id', "Id must be 6 digits and unique").isLength({ min: 6 }),
    body('name', "User name must be 3 characters or more").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be 8 characters or more").isLength({ min: 8 })
], async (req, res) => {
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        } else {

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hashSync(req.body.password, salt);

            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword
            });

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.status(200).json({ msg: "User created", user: newUser, token });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
});

//login endpoint
app.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password is required").exists()
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        } else {
            const isMatch = await bcrypt.compare(req.body.password, user.password);

            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid credentials" });
            } else {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

                return res.status(200).json({ msg: "User logged in", user, token });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
});

//getUser
app.post('/getUser', fetchUser, async (req, res) => {
    console.log(req.user)
    try {
        const user = await User.findById(req.user.id).select('-password');
        return res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
})

module.exports = app;
