'use client';
import { useState } from 'react';

export default function Contact({ contact }) {
  const [status, setStatus] = useState('idle'); // idle, sending, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      e.target.reset();
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="contact section">
        <div className="container">
            <div className="contact-wrapper glass-card reveal">
                <div className="contact-info">
                    <h2>Let's build something <span className="text-gradient">amazing</span> together.</h2>
                    <p>Currently available for freelance opportunities. If you have a project that needs some creative magic, I'd love to hear about it.</p>
                    
                    <div className="contact-details">
                        <div className="contact-item">
                            <i className="fas fa-envelope"></i>
                            <div>
                                <h4>Email</h4>
                                <p>{contact.email}</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-phone-alt"></i>
                            <div>
                                <h4>Phone</h4>
                                <p>{contact.phone}</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <div>
                                <h4>Location</h4>
                                <p>{contact.location}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" id="name" placeholder="Your Name" required />
                    </div>
                    <div className="form-group">
                        <input type="email" id="email" placeholder="Your Email" required />
                    </div>
                    <div className="form-group">
                        <textarea id="message" rows="5" placeholder="Your Message" required></textarea>
                    </div>
                    <button type="submit" className={`btn w-100 ${status === 'success' ? 'btn-outline' : 'btn-primary'}`} style={{opacity: status === 'sending' ? 0.8 : 1}}>
                        {status === 'idle' && <>Send Message <i className="fas fa-paper-plane"></i></>}
                        {status === 'sending' && <><i className="fas fa-spinner fa-spin"></i> Sending...</>}
                        {status === 'success' && <><i className="fas fa-check"></i> Message Sent!</>}
                    </button>
                </form>
            </div>
        </div>
    </section>
  );
}
