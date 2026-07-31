import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import SocialSidebar from './components/SocialSidebar';
import ShaderBackground from './components/ShaderBackground';
import MedicareCaseStudy from './components/MedicareCaseStudy';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const isMedicareCaseStudy = currentPath === '/projects/medicare' || currentPath === '/projects/medicare/';

  if (isMedicareCaseStudy) {
    return (
      <>
        <ShaderBackground />
        <MedicareCaseStudy />
      </>
    );
  }

  return (
    <>
      <ShaderBackground />
      <Navbar />
      <SocialSidebar />
      <Hero />
      <About />
      <Expertise />
      <TechStack />
      <Projects />
      <Experience />
      <Education />
      <ContactSection />
      <Footer />
    </>
  );
}

