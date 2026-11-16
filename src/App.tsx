import { useState, useEffect } from 'react';
import MotionProvider from './components/motion/MotionProvider';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Bento from './components/sections/Bento';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import SocialSidebar from './components/layout/SocialSidebar';
import CaseStudyPage from './components/case-study/CaseStudyPage';
import { CASE_STUDIES } from './data/case-studies';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const slug = currentPath.match(/^\/projects\/([^/]+)\/?$/)?.[1];
  const study = slug ? CASE_STUDIES[slug] : undefined;

  if (study) {
    return (
      <>
        <MotionProvider />
        <CaseStudyPage key={study.slug} study={study} />
      </>
    );
  }

  return (
    <>
      <MotionProvider />
      <Navbar />
      <SocialSidebar />
      <main>
        <Hero />
        <Bento />
        <About />
        <Projects />
        <Services />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
