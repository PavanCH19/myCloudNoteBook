const jwt = require('jsonwebtoken');

// Generate OTP (6-digit)
const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    return otp;
};

// Generate JWT Token
const generateJWTToken = (email) => {
    const payload = { email };
    const secretKey = 'your-jwt-secret';  // You should store this securely, not hardcoded
    const options = { expiresIn: '1h' }; // Token valid for 1 hour

    const token = jwt.sign(payload, secretKey, options);
    return token;
};

module.exports = { generateOTP, generateJWTToken };
