import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaSearch } from "react-icons/fa"; // Importing the FaSearch icon
import "../componentCSS/nav.css"; // Importing the external CSS file
import context from "../contaxtApi/context";
import { useContext } from "react";

const Nav = () => {
    const location = useLocation();
    const { isLoggedIn, handleLogout, user } = useContext(context)
    const navigate = useNavigate();


    const getNavLinkClass = (path) => {
        return location.pathname === path ? "nav-link nav-link-custom active" : "nav-link nav-link-custom";
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-custom">
            <div className="container-fluid">
                <Link className="navbar-brand navbar-brand-custom" to="/">
                    📝 myCloudNoteBook
                </Link>

                {/* Toggle Button for Small Screens */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Collapsing Navbar Items */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav navbar-nav-custom mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={getNavLinkClass("/")} to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={getNavLinkClass("/About")} to="/About">
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            {isLoggedIn ? <Link className={getNavLinkClass("/Login")} onClick={handleLogout} to="/Login">
                                Logout
                            </Link> : ""}
                        </li>
                    </ul>

                    {/* Right-aligned Section for Search Bar & User Profile */}
                    <div className="navbar-right">
                        {/* User Profile or Login Button */}
                        {user ? (
                            <>
                                <span className="text-light me-2 fs-5" onClick={() => navigate('/userDashboard')}>{user.name}</span>
                                <img
                                    src={user.profileImage}
                                    alt="Profile"
                                    className="profile-image"
                                    onClick={() => navigate('/userDashboard')}
                                />
                            </>
                        ) : (
                            <Link to="/login" className="btn btn-warning text-light px-3 py-2 rounded-pill">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
