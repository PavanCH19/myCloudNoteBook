const nodemailer = require('nodemailer');

// Setup email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pavandvh27@gmail.com',
        pass: 'gtby qvua qkcr fwgv'  // Use your generated App Password from Google
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
    console.log(to, subject, text, html)
    const mailOptions = {
        from: 'pavandvh27@gmail.com',
        to,
        subject,
        text,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        if (error.response) {
            console.error("Error Response:", error.response);
        }
    }
};

module.exports = sendEmail;
