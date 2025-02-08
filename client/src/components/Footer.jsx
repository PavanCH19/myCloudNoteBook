import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4 mt-5 rounded-3 mx-3 mt-2 p-2">
            <div className="container">
                <div className="row">
                    {/* Column 1: Branding */}
                    <div className="col-md-4 mb-4">
                        <h4 className="fw-bold text-warning">myCloudNoteBook</h4>
                        <p>Your cloud-based digital notebook for all your ideas, notes, and thoughts. Stay organized with us.</p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="col-md-4 mb-4">
                        <h5 className="fw-bold text-warning">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/" className="text-light text-decoration-none">Home</Link>
                            </li>
                            <li>
                                <Link to="/About" className="text-light text-decoration-none">About</Link>
                            </li>
                            <li>
                                <Link to="/Contact" className="text-light text-decoration-none">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Social Media */}
                    <div className="col-md-4 mb-4">
                        <h5 className="fw-bold text-warning">Follow Us</h5>
                        <ul className="list-unstyled d-flex">
                            <li className="me-3">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                                    <i className="fab fa-facebook"></i> Facebook
                                </a>
                            </li>
                            <li className="me-3">
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                                    <i className="fab fa-twitter"></i> Twitter
                                </a>
                            </li>
                            <li>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                                    <i className="fab fa-linkedin"></i> LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12">
                        <h5 className="fw-bold text-warning text-center">Wed Love to Hear Your Feedback!</h5>
                        <form className="mt-3">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Your Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Your Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="feedback" className="form-label">Your Feedback</label>
                                <textarea className="form-control" id="feedback" rows="4" placeholder="Share your thoughts with us..."></textarea>
                            </div>
                            <button type="submit" className="btn btn-warning w-100">Submit Feedback</button>
                        </form>
                    </div>
                </div>



                <div className="row mt-4">
                    <div className="col-12 text-center">
                        <p className="mb-0">&copy; {new Date().getFullYear()} myCloudNoteBook. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
