import Note from "./Note";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../componentCSS/home.css"; // Import the CSS file

const Home = () => {
    const [isLoggedIn] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [submittedQuery, setSubmittedQuery] = useState("");

    // Function to handle search submission
    const handleSearch = () => {
        setSubmittedQuery(searchQuery); // Set submitted query when button is clicked
    };

    return (
        <div className="home-container">
            {
                isLoggedIn ? (
                    <>
                        {/* Introduction Section */}
                        <h1 className="title">Stay Organized with MyCloudNoteBook</h1>
                        <p className="description">
                            MyCloudNoteBook is your personal cloud-based note manager. Quickly jot down important thoughts,
                            organize them into categories, and access them anytime, anywhere.
                        </p>

                        {/* Search Box */}
                        <div className="search-container">
                            <input
                                type="text"
                                className="search-box"
                                placeholder="Search notes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="search-btn" onClick={handleSearch}>Search</button>
                        </div>

                        {/* Notes Section */}
                        <h2 className="section-title">My Notes</h2>
                        <p className="section-description">
                            Here you can create, edit, and manage your personal notes securely.
                        </p>
                        {/* Notes Component (Pass Submitted Search Query to Filter Notes) */}
                        <Note searchQuery={submittedQuery} />
                    </>
                ) : (
                    <>
                        {/* Welcome Section */}
                        <h1 className="title">Welcome to MyCloudNoteBook</h1>
                        <p className="description">
                            MyCloudNoteBook is a cloud-based note-taking application designed to help you organize your thoughts, ideas, and tasks efficiently. Whether you are a student, professional, or just someone who loves to jot down notes, MyCloudNoteBook provides a seamless and intuitive experience.
                        </p>
                        <div className="login-container">
                            <Link to="/login" className="login-btn">Login</Link>
                        </div>
                    </>
                )}
        </div>
    );
};

export default Home;
