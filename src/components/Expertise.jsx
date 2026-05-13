export default function Expertise() {
  return (
    <section id="expertise" className="expertise section">
        <div className="container">
            <div className="section-header reveal">
                <h2 className="section-title">My <span className="text-gradient">Expertise</span></h2>
                <p className="section-subtitle">A multidisciplinary approach to building the web.</p>
            </div>
            <div className="services-grid">
                <div className="service-card glass-card reveal">
                    <div className="service-icon"><i className="fas fa-layer-group"></i></div>
                    <h3>UI/UX Design</h3>
                    <p>Creating intuitive interfaces and improving user journeys through wireframing, prototyping, user research, and usability testing.</p>
                    <ul className="service-list">
                        <li><i className="fas fa-check"></i> Wireframing & Prototyping</li>
                        <li><i className="fas fa-check"></i> User-Centered Design</li>
                        <li><i className="fas fa-check"></i> Usability Testing</li>
                    </ul>
                </div>
                <div className="service-card glass-card reveal">
                    <div className="service-icon"><i className="fas fa-code"></i></div>
                    <h3>Front-End Development</h3>
                    <p>Writing clean, semantic, and highly performant HTML5, CSS3, and JavaScript. Specializing in modern frameworks like React JS and Ionic 4.</p>
                    <ul className="service-list">
                        <li><i className="fas fa-check"></i> React JS & Ionic</li>
                        <li><i className="fas fa-check"></i> Responsive Web Design</li>
                        <li><i className="fas fa-check"></i> Accessibility Standards</li>
                    </ul>
                </div>
                <div className="service-card glass-card reveal">
                    <div className="service-icon"><i className="fab fa-wordpress-simple"></i></div>
                    <h3>WordPress Solutions</h3>
                    <p>Building scalable, manageable, and secure CMS. Experienced in custom theme development, SEO best practices, and Ecommerce integration.</p>
                    <ul className="service-list">
                        <li><i className="fas fa-check"></i> Custom Theme Dev</li>
                        <li><i className="fas fa-check"></i> CMS Management</li>
                        <li><i className="fas fa-check"></i> Performance Optimization</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
  );
}
