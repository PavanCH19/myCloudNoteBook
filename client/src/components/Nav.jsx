import { Link, useLocation } from "react-router-dom";
// import { FaSearch } from "react-icons/fa"; // Importing the FaSearch icon
import "../componentCSS/nav.css"; // Importing the external CSS file

const Nav = () => {
    const location = useLocation();

    const user = {
        username: "JohnDoesssssssssssssssssssssssssssssssssssssss",
        profileImage: "https://via.placeholder.com/40"
    };

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
                            <Link className={getNavLinkClass("/Login")} to="/Login">
                                Login
                            </Link>
                        </li>
                    </ul>

                    {/* Right-aligned Section for Search Bar & User Profile */}
                    <div className="navbar-right">

                        {/* Search Bar (visible on large screens)
                        <div className="input-group input-group-custom d-none d-lg-flex me-3">
                            <input
                                type="search"
                                className="form-control rounded-pill border-0 py-2 ps-3 text-dark"
                                placeholder="Search..."
                                aria-label="Search"
                            />
                            <button
                                className="btn btn-search ms-2"
                                type="button"
                            >
                                <FaSearch />
                            </button>
                        </div> */}

                        {/* Mobile Search Bar (visible on small screens)
                        <div className="d-lg-none">
                            <button
                                className="mobile-search-button"
                                data-bs-toggle="collapse"
                                data-bs-target="#searchBar"
                            >
                                <FaSearch />
                            </button>
                            <div id="searchBar" className="collapse">
                                <input
                                    type="search"
                                    className="form-control mobile-search-bar"
                                    placeholder="Search..."
                                />
                            </div>
                        </div> */}

                        {/* User Profile or Login Button */}
                        {user ? (
                            <>
                                <span className="text-light me-2 fs-5">{user.username}</span>
                                <img
                                    src={user.profileImage}
                                    alt="Profile"
                                    className="profile-image"
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
