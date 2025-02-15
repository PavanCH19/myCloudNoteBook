import { useContext, useState } from "react";
import context from "../contaxtApi/context";
import { useNavigate, Link } from "react-router-dom";

function UserDashboard() {
    const { user, handleLogout, handleUpdateUser, isLoggedIn } = useContext(context);
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        password: "",
        confirmPassword: "",
        profileImage: user.profileImage || ""
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            profileImage: URL.createObjectURL(file),
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        handleUpdateUser(formData);
    };

    const handleLogoutClick = () => {
        handleLogout();
        navigate("/login");
    };

    return (
        <div className="container mt-5">
            {isLoggedIn ? (
                <>
                    <h1 className="text-center mb-4">Welcome, {user.name}!</h1>
                    <p className="text-center mb-4">
                        We are thrilled to have you on MyCloudNoteBook. Our platform is designed to help you organize your thoughts, ideas, and tasks efficiently. Whether you are a student, professional, or just someone who loves to jot down notes, MyCloudNoteBook provides a seamless and intuitive experience.
                    </p>
                    <div className="user-details mb-4">
                        <h2>User Details</h2>
                        <div className="d-flex align-items-center">
                            <div className="me-3"> {/* Adds spacing between image and details */}
                                {formData.profileImage && (
                                    <img
                                        src={formData.profileImage}
                                        alt="Profile"
                                        className="img-fluid rounded-circle"
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    />
                                )}
                            </div>
                            <div>
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="update-form mb-4">
                        <h2>Update Your Details</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="update-name">Name</label>
                                <input
                                    type="text"
                                    id="update-name"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    autoComplete="name"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="update-email">Email</label>
                                <input
                                    type="email"
                                    id="update-email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    autoComplete="email"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="update-password">Password</label>
                                <input
                                    type="password"
                                    id="update-password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    autoComplete="new-password"
                                />
                                <Link to="/password-reset" className="d-block mt-2">Forgot your password?</Link>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="update-confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="update-confirmPassword"
                                    name="confirmPassword"
                                    className="form-control"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    autoComplete="new-password"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="update-profileImage">Profile Image</label>
                                <input
                                    type="file"
                                    id="update-profileImage"
                                    name="profileImage"
                                    className="form-control"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    </div>
                    <div className="text-center">
                        <button onClick={handleLogoutClick} className="btn btn-danger">Logout</button>
                    </div>
                </>
            ) : (
                <div className="alert alert-warning text-center" role="alert">
                    Please login to access your dashboard.<Link to="/login" className="btn btn-primary">Login</Link>
                </div>
            )}
        </div>
    );
}

export default UserDashboard;
