import { useState } from "react";
import { motion } from "framer-motion";

export default function ResetPassword() {
    const [step, setStep] = useState(1);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 body">
            <style>
                {`
                    .body {
                        font-family: 'Arial', sans-serif;
                    }
                    .card {
                        background: white;
                        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                        border-radius: 16px;
                        padding: 32px;
                        width: 450px;
                        text-align: center;
                        transition: 0.3s;
                    }
                    .card h2 {
                        font-size: 24px;
                        font-weight: 700;
                        color: #333;
                        margin-bottom: 24px;
                    }
                    .card p {
                        font-size: 16px;
                        color: #555;
                        margin-bottom: 24px;
                    }
                    .input-field {
                        width: 100%;
                        padding: 14px;
                        margin: 12px 0;
                        border-radius: 10px;
                        border: 1px solid #ccc;
                        outline: none;
                        font-size: 16px;
                        transition: 0.3s;
                    }
                    .input-field:focus {
                        border-color: #6c5ce7;
                        box-shadow: 0 0 8px rgba(108, 92, 231, 0.5);
                    }
                    .btn {
                        width: 100%;
                        padding: 14px;
                        background: linear-gradient(to right, #6c5ce7, #a29bfe);
                        color: white;
                        font-weight: bold;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                        transition: 0.3s;
                    }
                    .btn:hover {
                        background: linear-gradient(to right, #a29bfe, #6c5ce7);
                    }
                    .link-text {
                        font-size: 14px;
                        color: #6c5ce7;
                        cursor: pointer;
                    }
                    .link-text:hover {
                        text-decoration: underline;
                    }
                `}
            </style>

            <motion.div
                className="card"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2>
                    {step === 1 ? "Reset Your Password" : step === 2 ? "Enter OTP" : "Set New Password"}
                </h2>

                <p>Welcome to myCloudNoteBook, the most secure and flexible way to store your notes and files in the cloud. To ensure the safety of your account, please reset your password.</p>

                {step === 1 && (
                    <>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input-field"
                        />
                        <button className="btn" onClick={() => setStep(2)}>
                            Send OTP
                        </button>
                        <p className="link-text">Remember your password? <span onClick={() => setStep(1)}>Go back</span></p>
                    </>
                )}

                {step === 2 && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            className="input-field"
                        />
                        <button className="btn" onClick={() => setStep(3)}>
                            Verify OTP
                        </button>
                        <p className="link-text">Didnt receive an OTP? <span>Resend</span></p>
                    </>
                )}

                {step === 3 && (
                    <>
                        <input
                            type="password"
                            placeholder="New Password"
                            className="input-field"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="input-field"
                        />
                        <button className="btn">
                            Reset Password
                        </button>
                    </>
                )}
            </motion.div>
        </div>
    );
}
