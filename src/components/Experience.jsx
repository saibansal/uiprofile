export default function Experience({ experience }) {
  return (
    <section id="experience" className="section">
        <div className="container">
            <div className="section-header reveal">
                <h2 className="section-title">My <span className="text-gradient">Experience</span></h2>
                <p className="section-subtitle">A timeline of my professional journey.</p>
            </div>
            
            <div className="experience-list">
                {experience.jobs.map(job => (
                  <div key={job.id} className="experience-item glass-card reveal">
                      <div className="experience-header">
                          <h3>{job.title}</h3>
                          <span className="experience-date">{job.date}</span>
                      </div>
                      <h4>{job.company}</h4>
                      {job.bullets && job.bullets.length > 0 && (
                        <ul>
                            {job.bullets.map((bullet, idx) => (
                                <li key={idx}>{bullet}</li>
                            ))}
                        </ul>
                      )}
                  </div>
                ))}
            </div>
            
            <div className="section-header reveal" style={{marginTop: '5rem'}}>
                <h2 className="section-title">Education & <span className="text-gradient">Volunteering</span></h2>
            </div>
            
            <div className="services-grid" style={{marginBottom: '3rem'}}>
                <div className="service-card glass-card reveal">
                    <div className="service-icon"><i className="fas fa-graduation-cap"></i></div>
                    <h3>Education</h3>
                    {experience.education.map(edu => (
                      <div key={edu.id} style={{marginBottom: '1rem'}}>
                        <p style={{fontWeight: 600, color: 'var(--text-primary)', margin: 0}}>{edu.title}</p>
                        <p style={{margin: 0}}>{edu.school}</p>
                      </div>
                    ))}
                    
                    <h3 style={{marginTop: '2rem'}}>Certifications</h3>
                    {experience.certifications.map(cert => (
                      <p key={cert.id}>{cert.title}</p>
                    ))}
                </div>
                <div className="service-card glass-card reveal">
                    <div className="service-icon"><i className="fas fa-hands-helping"></i></div>
                    <h3>Volunteering</h3>
                    {experience.volunteering.map(vol => (
                      <div key={vol.id}>
                        <p style={{fontWeight: 600, color: 'var(--text-primary)', margin: 0}}>{vol.title}</p>
                        <p style={{margin: 0}}>{vol.organization}</p>
                        <ul className="service-list" style={{marginTop: '1.5rem'}}>
                            {vol.bullets.map((b, idx) => (
                              <li key={idx}><i className="fas fa-heart" style={{fontSize: '0.8rem'}}></i> {b}</li>
                            ))}
                        </ul>
                      </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
}
