import { useContext, useState } from "react";
import "../componentCSS/login.css";

import context from "../contaxtApi/context";
import { useNavigate } from "react-router-dom";

function Login() {
    const { handleLogin, handleCreateUser } = useContext(context);
    const [isActive, setIsActive] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();


    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRegistrationSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        handleCreateUser(formData);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (handleLogin(formData)) {
            navigate("/");
        }
    };

    return (
        <div className="body">
            <div className={`containers ${isActive ? 'active' : ''}`} id="container">
                {/* Sign-up form */}
                <div className="form-container sign-up">
                    <form onSubmit={handleRegistrationSubmit}>
                        <h1>Create Account</h1>
                        <div className="social-icons">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fa-brands fa-google"></i></a>
                            <a href="#" className="social"><i className="fa-brands fa-github"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>

                {/* Sign-in form */}
                <div className="form-container sign-in">
                    <form onSubmit={handleLoginSubmit}>
                        <h1>Sign In</h1>
                        <div className="social-icons">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fa-brands fa-google"></i></a>
                            <a href="#" className="social"><i className="fa-brands fa-github"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email password</span>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <a href="#">Forgot your password?</a>
                        <button type="submit">Sign In</button>
                    </form>
                </div>

                {/* Toggle container */}
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className="hidden" id="login" onClick={handleLoginClick}>Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button className="hidden" id="register" onClick={handleRegisterClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
