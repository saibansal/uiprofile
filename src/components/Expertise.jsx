export default function Expertise({ expertise }) {
  return (
    <section id="expertise" className="expertise section">
        <div className="container">
            <div className="section-header reveal">
                <h2 className="section-title">My <span className="text-gradient">Expertise</span></h2>
                <p className="section-subtitle">A multidisciplinary approach to building the web.</p>
            </div>
            <div className="services-grid">
                {expertise.map(exp => (
                  <div key={exp.id} className="service-card glass-card reveal">
                      <div className="service-icon"><i className={exp.icon}></i></div>
                      <h3>{exp.title}</h3>
                      <p>{exp.description}</p>
                      <ul className="service-list">
                          {exp.skills.map((skill, index) => (
                              <li key={index}><i className="fas fa-check"></i> {skill}</li>
                          ))}
                      </ul>
                  </div>
                ))}
            </div>
        </div>
    </section>
  );
}
