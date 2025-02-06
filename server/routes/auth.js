const express = require('express');
const app = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../modules/User");

app.post('/', [
    body('id', "Id must be 6 digits and unique").isLength({ min: 6 }),
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
            const newUser = await User.create(req.body);
            return res.status(200).json({ msg: "User created", user: newUser });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
});

module.exports = app;
