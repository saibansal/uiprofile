'use client';
import { useState, useEffect } from 'react';

export default function Navbar({ settings }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
            <a href="#" className="logo" dangerouslySetInnerHTML={{__html: settings.logoName.replace('.', '<span>.</span>')}}></a>
            <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                <li><a href="#home" onClick={closeMenu}>Home</a></li>
                <li><a href="#expertise" onClick={closeMenu}>Expertise</a></li>
                <li><a href="#experience" onClick={closeMenu}>Experience</a></li>
                <li><a href="#work" onClick={closeMenu}>Work</a></li>
                <li><a href="#contact" className="btn btn-outline" onClick={closeMenu}>Let's Talk</a></li>
            </ul>
            <div className="menu-toggle" onClick={toggleMenu}>
                <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </div>
        </div>
    </nav>
  );
}
