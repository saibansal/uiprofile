export default function Hero({ hero }) {
    const iconMap = {
        linkedin: 'fab fa-linkedin-in',
        github: 'fab fa-github',
        globe: 'fas fa-globe',
        twitter: 'fab fa-twitter',
        instagram: 'fab fa-instagram',
        dribbble: 'fab fa-dribbble',
        behance: 'fab fa-behance'
    };

    return (
        <header id="home" className="hero">
            <div className="container hero-container">
                <div className="hero-content reveal">
                    <h2 className="subtitle">{hero.subtitle}</h2>
                    <h1 className="title">
                        <span className="text-gradient">{hero.titlePrefix}</span><br />
                        {hero.titleSuffix}
                    </h1>
                    <p className="description">
                        {hero.description}
                    </p>
                    <div className="hero-cta">
                        <a href="#work" className="btn btn-primary">View My Work <i className="fas fa-arrow-right"></i></a>
                        <div className="social-links">
                            {Object.entries(hero.socials).map(([key, url]) => {
                                if (url) {
                                    return <a key={key} href={url} target="_blank" rel="noreferrer"><i className={iconMap[key] || 'fas fa-link'}></i></a>;
                                }
                                return null;
                            })}
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
                            <p>{hero.yearsExperience} Years Experience</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
