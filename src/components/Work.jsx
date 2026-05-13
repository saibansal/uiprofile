export default function Work({ projects }) {
  return (
    <section id="work" className="work section">
        <div className="container">
            <div className="section-header reveal">
                <h2 className="section-title">Featured <span className="text-gradient">Projects</span></h2>
                <p className="section-subtitle">A selection of my recent work spanning design and development.</p>
            </div>
            
            <div className="projects-grid">
                {projects.length > 0 ? projects.map(project => (
                  <div key={project.id} className="project-card glass-card reveal">
                      <div className="project-img">
                          <img src={project.image || "https://via.placeholder.com/600x400?text=Project"} alt={project.title} />
                          <div className="project-overlay">
                              <a href="#" className="btn btn-primary">View Project</a>
                          </div>
                      </div>
                      <div className="project-info">
                          <div className="project-tags">
                              {project.tags.map(tag => (
                                <span key={tag}>{tag}</span>
                              ))}
                          </div>
                          <h3>{project.title}</h3>
                          <p>{project.description}</p>
                      </div>
                  </div>
                )) : (
                  <p>Loading projects...</p>
                )}
            </div>
        </div>
    </section>
  );
}
