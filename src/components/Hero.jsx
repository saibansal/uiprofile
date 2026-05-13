export default function Hero() {
    return (
        <header id="home" className="hero">
            <div className="container hero-container">
                <div className="hero-content reveal">
                    <h2 className="subtitle">Hello, I am Vishal Bansal</h2>
                    <h1 className="title">
                        <span className="text-gradient">Senior UI/UX</span><br />
                        + WordPress Developer
                    </h1>
                    <p className="description">
                        Senior UI/UX Developer with 8+ years of experience creating user-focused digital solutions. Adept at building intuitive interfaces using React JS, Ionic, and WordPress.
                    </p>
                    <div className="hero-cta">
                        <a href="#work" className="btn btn-primary">View My Work <i className="fas fa-arrow-right"></i></a>
                        <div className="social-links">
                            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a>
                            <a href="https://github.com" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
                            <a href="#" target="_blank" rel="noreferrer"><i className="fas fa-globe"></i></a>
                        </div>
                    </div>
                </div>
                <div className="hero-visual reveal">
                    <div className="glass-card profile-card">
                        <div className="card-content">
                            <div className="skill-badge react"><i className="fab fa-react"></i></div>
                            <div className="skill-badge wp"><i className="fab fa-wordpress"></i></div>
                            <div className="skill-badge figma"><i className="fab fa-figma"></i></div>
                            <div className="profile-image-placeholder">
                                <i className="fas fa-user-astronaut"></i>
                            </div>
                            <h3>Senior UI/UX Dev</h3>
                            <p>8+ Years Experience</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
