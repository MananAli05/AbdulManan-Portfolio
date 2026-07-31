/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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

export default function App() {
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
