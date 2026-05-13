export default function Footer({ settings, socials }) {
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
    <footer>
        <div className="container footer-container">
            <div className="footer-logo" dangerouslySetInnerHTML={{__html: settings.logoName.replace('.', '<span>.</span>')}}></div>
            <p>&copy; 2026 Designed & Developed by Vishal Bansal <i className="fas fa-heart text-gradient"></i></p>
            <div className="social-links">
                {Object.entries(socials).map(([key, url]) => {
                    if (url) {
                        return <a key={key} href={url} target="_blank" rel="noreferrer"><i className={iconMap[key] || 'fas fa-link'}></i></a>;
                    }
                    return null;
                })}
            </div>
        </div>
    </footer>
  );
}
