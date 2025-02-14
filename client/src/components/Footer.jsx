import { Link } from "react-router-dom";
import "../componentCSS/footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-row">
                    {/* Column 1: Branding */}
                    <div className="footer-col">
                        <h4 className="footer-brand">myCloudNoteBook</h4>
                        <p>Your cloud-based digital notebook for all your ideas, notes, and thoughts. Stay organized with us.</p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="footer-col">
                        <h5 className="footer-title">Quick Links</h5>
                        <ul className="footer-links">
                            <li>
                                <Link to="/" className="footer-link">Home</Link>
                            </li>
                            <li>
                                <Link to="/About" className="footer-link">About</Link>
                            </li>
                            <li>
                                <Link to="/Contact" className="footer-link">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Social Media */}
                    <div className="footer-col">
                        <h5 className="footer-title">Follow Us</h5>
                        <ul className="social-links">
                            <li>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                    <i className="fab fa-facebook"></i> Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                    <i className="fab fa-twitter"></i> Twitter
                                </a>
                            </li>
                            <li>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                    <i className="fab fa-linkedin"></i> LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-feedback">
                    <h5 className="footer-feedback-title">Wed Love to Hear Your Feedback!</h5>
                    <form className="mt-3">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Your Name</label>
                            <input type="text" className="form-input" id="name" placeholder="Enter your name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Your Email</label>
                            <input type="email" className="form-input" id="email" placeholder="Enter your email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="feedback" className="form-label">Your Feedback</label>
                            <textarea className="form-input" id="feedback" rows="4" placeholder="Share your thoughts with us..."></textarea>
                        </div>
                        <button type="submit" className="submit-btn">Submit Feedback</button>
                    </form>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} myCloudNoteBook. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
