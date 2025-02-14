import '../componentCSS/about.css'; // Make sure to import the custom CSS file

const About = () => {
    return (
        <div className="about-container container mt-5 py-5">
            <h1 className="text-center mb-4 text-primary">About MyCloudNoteBook</h1>
            <p className="text-center mb-4 text-muted">
                MyCloudNoteBook is a cloud-based note-taking application designed to help you organize your thoughts, ideas, and tasks efficiently. Whether you are a student, professional, or just someone who loves to jot down notes, MyCloudNoteBook provides a seamless and intuitive experience. With our modern UI and secure cloud storage, you can access your notes from anywhere at any time.
            </p>

            {/* Purpose Section */}
            <div className="purpose-section mb-5">
                <h2 className="mb-3 text-success">Our Purpose</h2>
                <p className="text-muted">
                    In today’s fast-paced world, staying organized and managing your ideas is essential. MyCloudNoteBook was created with the goal of simplifying the way you store, access, and organize your notes. We believe in offering a simple yet powerful solution that suits everyone is needs.
                </p>
            </div>

            {/* Features Section */}
            <div className="features-section mb-5">
                <h2 className="mb-3 text-info">Features</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item feature-item">Create and manage notes with ease</li>
                    <li className="list-group-item feature-item">Organize notes into customizable notebooks</li>
                    <li className="list-group-item feature-item">Search, filter, and sort notes quickly</li>
                    <li className="list-group-item feature-item">Access your notes from any device, anywhere</li>
                    <li className="list-group-item feature-item">Secure your notes with state-of-the-art encryption</li>
                </ul>
            </div>

            {/* Technologies Section */}
            <div className="technologies-section mb-5">
                <h2 className="mb-3 text-info">Technologies Used</h2>
                <p className="mb-4">
                    We use the latest web technologies to ensure the highest performance, responsiveness, and security for our users. The core technologies powering MyCloudNoteBook include:
                </p>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item tech-item">React for the frontend, ensuring a dynamic and responsive user interface</li>
                    <li className="list-group-item tech-item">Node.js and Express for the backend, enabling efficient server-side processing</li>
                    <li className="list-group-item tech-item">MongoDB for secure, scalable database management</li>
                    <li className="list-group-item tech-item">CSS for beautiful and intuitive styling</li>
                </ul>
            </div>

            {/* New Section: Community Impact */}
            <div className="community-impact-section mb-5">
                <h2 className="mb-3 text-warning">Community Impact</h2>
                <p className="text-muted">
                    MyCloudNoteBook isn’t just about notes—it is about making a positive impact on individuals and communities. Our goal is to provide users with the tools they need to stay organized, productive, and inspired. We’re committed to continuously enhancing our platform to meet the diverse needs of our growing user base, empowering people to take charge of their thoughts and ideas.
                </p>
            </div>

            {/* Testimonials Section */}
            <div className="testimonials-section mb-5">
                <h2 className="mb-3 text-danger">What Users Are Saying</h2>
                <div className="testimonial">
                    <p><em>MyCloudNoteBook is a game changer! The interface is so simple to use and my notes are always accessible. The cloud sync is flawless.</em></p>
                    <strong>- Alex T., Student</strong>
                </div>
                <div className="testimonial">
                    <p><em>I love how organized my notes are. The search functionality is amazing, and I can access everything instantly from any device.</em></p>
                    <strong>- Jessica K., Professional</strong>
                </div>
            </div>

            {/* Contact Section */}
            <div className="contact-section text-center">
                <h2 className="mb-3 text-info">Contact Us</h2>
                <p>
                    If you have any questions or feedback, feel free to reach out to us at{' '}
                    <a href="mailto:support@mycloudnotebook.com" className="contact-link">support@mycloudnotebook.com</a>.
                </p>
            </div>
        </div>
    );
}

export default About;
