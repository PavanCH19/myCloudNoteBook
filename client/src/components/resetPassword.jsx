import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
    const [step, setStep] = useState(1);
    const [resetData, setResetData] = useState({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
        resetLink: ""
    });
    const navigate = useNavigate();
    const location = useLocation();

    // Set default base URL and headers from environment variables
    axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['auth-token'] = localStorage.getItem("auth-token") || import.meta.env.VITE_AUTH_TOKEN;

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const stepParam = queryParams.get('step');
        if (stepParam) {
            setStep(Number(stepParam));  // Set the step based on the query parameter
        }
    }, [location.search]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResetData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSendMail = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/password-reset-request', { email: resetData.email });
            if (res.status === 200) {
                setStep(2);
            }
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        console.log({ email: resetData.email, otp: resetData.otp })
        try {
            const res = await axios.post('/verify-otp', { email: resetData.email, otp: resetData.otp });
            if (res.status === 200) {
                setStep(3);
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (resetData.newPassword !== resetData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const res = await axios.post('/reset-password', {
                email: resetData.email,
                newPassword: resetData.newPassword
            });
            if (res.status === 200) {
                alert("Password reset successful!");
                navigate('/Login');
            }
        } catch (error) {
            console.error("Error resetting password:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 body">
            <style>
                {`
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

            <div className="card">
                <h2>
                    {step === 1 ? "Reset Your Password" : step === 2 ? "Enter OTP" : "Set New Password"}
                </h2>

                {step === 1 && (
                    <>
                        <form onSubmit={handleSendMail}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input-field"
                                value={resetData.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                            />
                            <button className="btn">
                                Send password reset link
                            </button>
                        </form>
                        <p className="link-text">Remember your password? <span onClick={() => navigate('/Login')}><b>Go back</b></span></p>
                    </>
                )}

                {step === 2 && (
                    <>
                        <form onSubmit={handleVerifyOtp}>
                            <input
                                type="text"
                                name="otp"
                                placeholder="Enter OTP"
                                className="input-field"
                                value={resetData.otp}
                                onChange={handleChange}
                                required
                                autoComplete="one-time-code"
                            />
                            <button className="btn">
                                Verify OTP
                            </button>
                        </form>
                        <p className="link-text">Did not receive an OTP? <span onClick={handleSendMail}>Resend</span></p>
                    </>
                )}

                {step === 3 && (
                    <>
                        <form onSubmit={handleResetPassword}>
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="New Password"
                                className="input-field"
                                value={resetData.newPassword}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className="input-field"
                                value={resetData.confirmPassword}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                            />
                            <button className="btn">
                                Reset Password
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
