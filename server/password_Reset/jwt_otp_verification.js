const express = require('express');
const sendEmail = require('./nodeMail');
const { generateOTP, generateJWTToken } = require('./jwt_otp_generation');
const jwt = require('jsonwebtoken');

const router = express.Router();

// In-memory storage for OTP (use Redis or DB in production)
let otpStore = {};
let resetTokenStore = {};

// Password Reset Request Endpoint
router.post('/password-reset-request', async (req, res) => {
    let { email } = req.body;
    email = "pavandvh27@gmail.com"

    // Generate OTP
    const otp = generateOTP();

    // Store OTP temporarily (for demonstration, you should use a DB or cache in production)
    otpStore[email] = otp;

    // Generate JWT Token for password reset link
    const resetToken = generateJWTToken(email);
    resetTokenStore[email] = resetToken;


    // Send email with OTP and reset link
    const resetLink = `http://yourapp.com/reset-password?token=${resetToken}`;
    const htmlContent = `
        <p>Hi,</p>
        <p>Click the link below to reset your password:</p>
        <p><a href="${resetLink}">Reset Password</a></p>
        <p>Alternatively, use this OTP: <strong>${otp}</strong></p>
        <p>This OTP is valid for 10 minutes.</p>
    `;

    try {
        await sendEmail(email, 'Password Reset Request', 'Password Reset Instructions', htmlContent);
        res.status(200).send({ msg: 'Reset link and OTP sent to email.' });
    } catch (error) {
        res.status(500).send({ msg: 'Eprror sending email.' });
    }
});

// OTP Verification Endpoint
router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    if (otpStore[email] && otpStore[email] === otp) {
        // OTP valid, allow password reset
        delete otpStore[email];  // Remove OTP after verification
        res.status(200).send({ msg: 'OTP verified. Proceed to reset password.' });
    } else {
        res.status(400).send({ msg: 'Invalid OTP.' });
    }
});

// JWT Token Verification Endpoint (for Password Reset)
router.post('/reset-password', (req, res) => {
    const { token, newPassword } = req.body;

    // Verify the JWT token
    jwt.verify(token, 'your-jwt-secret', (err, decoded) => {
        if (err) {
            return res.status(400).send({ msg: 'Invalid or expired token.' });
        }

        const { email } = decoded;

        // Check if the token exists for this email (i.e., the user requested a reset)
        if (resetTokenStore[email] !== token) {
            return res.status(400).send({ msg: 'Invalid reset request.' });
        }

        // Update the user's password in the database (here, just log it)
        console.log(`Password for ${email} has been reset to ${newPassword}`);

        // Delete the token after use
        delete resetTokenStore[email];

        res.status(200).send({ msg: 'Password successfully reset.' });
    });
});

// Export the router
module.exports = router;
