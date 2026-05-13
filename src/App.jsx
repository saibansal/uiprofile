import { useScrollReveal } from './hooks/useScrollReveal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Expertise from './components/Expertise'
import Experience from './components/Experience'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Background from './components/Background'

function App() {
  useScrollReveal();

  return (
    <>
      <Background />
      <Navbar />
      <Hero />
      <Expertise />
      <Experience />
      <Work />
      <Contact />
      <Footer />
    </>
  )
}

export default App
