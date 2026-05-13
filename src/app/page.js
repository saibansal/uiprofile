'use client';

import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Expertise from '../components/Expertise';
import Experience from '../components/Experience';
import Work from '../components/Work';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Background from '../components/Background';

export default function Home() {
  const [data, setData] = useState(null);
  
  // This hook needs to re-run after data loads, so we call it conditionally inside or adjust it.
  // We'll just call it and it will observe elements once they render.
  useScrollReveal();

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(d => setData(d));
  }, []);

  if (!data) return <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading Portfolio...</div>;

  return (
    <>
      <Background />
      <Navbar settings={data.settings} />
      <Hero hero={data.hero} />
      <Expertise expertise={data.expertise} />
      <Experience experience={data.experience} />
      <Work projects={data.projects} />
      <Contact contact={data.contact} />
      <Footer settings={data.settings} socials={data.hero.socials} />
    </>
  );
}
