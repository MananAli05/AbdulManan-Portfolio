import React, { useEffect, useState } from 'react';

// Reusable Phone Frame Container with sleek device bezel
function PhoneFrame({
  src,
  alt,
  caption,
  aspectRatio = 'aspect-[9/19.5]',
  className = '',
  onImageClick,
}: {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: string;
  className?: string;
  onImageClick?: (src: string, alt: string) => void;
}) {
  return (
    <div className={`flex flex-col items-center group ${className}`}>
      {/* Device Body */}
      <div
        onClick={() => onImageClick && onImageClick(src, alt)}
        className={`relative w-full ${aspectRatio} max-w-[260px] sm:max-w-[280px] rounded-[24px] bg-[#0A0F0B] p-2 border border-[#8E9B4D]/35 shadow-[0_15px_35px_rgba(0,0,0,0.6)] group-hover:border-[#8E9B4D]/60 group-hover:shadow-[0_0_25px_rgba(142,155,77,0.18)] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between`}
      >
        {/* Subtle top notch / speaker speaker bar */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-[#182416] border border-[#8E9B4D]/20 z-20 pointer-events-none" />

        {/* Screenshot Container */}
        <div className="relative w-full h-full rounded-[18px] overflow-hidden bg-[#070C08]">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="w-full h-full object-cover rounded-[18px] transition-transform duration-500 group-hover:scale-[1.02]"
          />
          {/* Faint hover overlay hint */}
          <div className="absolute inset-0 bg-[#8E9B4D]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
            <span className="bg-[#070C08]/80 text-[#E9E5DF] text-[10px] font-mono px-2.5 py-1 rounded border border-[#8E9B4D]/30 backdrop-blur-sm">
              Click to view
            </span>
          </div>
        </div>
      </div>

      {/* Caption if provided */}
      {caption && (
        <p className="mt-2.5 text-[11px] font-mono text-[#9EA298] text-center max-w-[240px]">
          {caption}
        </p>
      )}
    </div>
  );
}

export default function MedicareCaseStudy() {
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBackToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/#projects');
    window.dispatchEvent(new Event('popstate'));
    setTimeout(() => {
      const projectsEl = document.getElementById('projects');
      if (projectsEl) {
        const yOffset = -76;
        const y = projectsEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        window.scrollTo(0, 0);
      }
    }, 50);
  };

  const handleImageClick = (src: string, alt: string) => {
    setActiveImage({ src, alt });
  };

  return (
    <div className="min-h-screen w-full bg-[#070C08] text-[#F3F3EE] selection:bg-[#8E9B4D] selection:text-[#070C08] relative isolate font-sans">
      {/* Subtle ambient gradient background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_-5%,rgba(142,155,77,0.07)_0%,transparent_70%)] pointer-events-none -z-10" />

      {/* TOP STICKY NAVIGATION BAR */}
      <header className="sticky top-0 z-40 w-full bg-[#070C08]/90 backdrop-blur-md border-b border-[#8E9B4D]/20 px-4 sm:px-6 lg:px-12 py-3.5">
        <div className="max-w-[1140px] mx-auto flex items-center justify-between">
          <a
            href="/#projects"
            onClick={handleBackToProjects}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#8E9B4D] hover:text-[#A7B45C] transition-colors group cursor-pointer"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>Back to Projects</span>
          </a>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8E9B4D]" />
            <span className="font-mono text-[11px] text-[#9EA298] tracking-wide">
              MediCare Project
            </span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12 pb-20 space-y-16 sm:space-y-24">

        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#8E9B4D]/15 pb-12 sm:pb-16">
          
          {/* Left Column: Hero Text & Stack Pills */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121B10] border border-[#8E9B4D]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8E9B4D]" />
              <span className="font-mono text-[11px] text-[#8E9B4D] font-medium tracking-wider uppercase">
                AI HEALTHCARE PROJECT
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#E9E5DF]">
              MediCare
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[#8E9B4D]">
              Multilingual AI-Powered Medical Assistant
            </p>

            <p className="text-[#9EA298] text-sm sm:text-base leading-relaxed max-w-[580px]">
              A mobile health assistant that combines machine learning, computer vision, OCR and multilingual voice AI to make health information easier to understand in English and Urdu.
            </p>

            {/* Compact Tech Stack Pills */}
            <div className="pt-2 flex flex-wrap gap-2">
              {['Flutter', 'FastAPI', 'Python', 'TensorFlow', 'Groq', 'Supabase'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-[5px] bg-[#0E150D] border border-[#8E9B4D]/25 font-mono text-xs text-[#E9E5DF]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Product Visual inside Phone Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Subtle Olive Glow Ring */}
              <div className="absolute -inset-4 bg-radial from-[#8E9B4D]/15 via-transparent to-transparent opacity-75 blur-xl pointer-events-none" />
              <PhoneFrame
                src="/app-images/Dashboard.jpeg"
                alt="MediCare App Dashboard Screen"
                caption="MediCare Mobile Application Dashboard"
                onImageClick={handleImageClick}
              />
            </div>
          </div>

        </section>

        {/* QUICK OVERVIEW BAR */}
        <section className="p-5 sm:p-6 rounded-[12px] bg-[#0E150D] border border-[#8E9B4D]/25 shadow-lg">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#8E9B4D]/20">
            <div className="pr-3">
              <span className="font-mono text-[10px] text-[#8E9B4D] uppercase tracking-wider block mb-1">
                ROLE
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#E9E5DF]">
                AI / ML Developer
              </span>
            </div>
            <div className="pt-3 sm:pt-0 sm:px-4">
              <span className="font-mono text-[10px] text-[#8E9B4D] uppercase tracking-wider block mb-1">
                PLATFORM
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#E9E5DF]">
                Flutter Mobile App
              </span>
            </div>
            <div className="pt-3 sm:pt-0 sm:px-4">
              <span className="font-mono text-[10px] text-[#8E9B4D] uppercase tracking-wider block mb-1">
                BACKEND
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#E9E5DF]">
                FastAPI Server
              </span>
            </div>
            <div className="pt-3 sm:pt-0 sm:pl-4">
              <span className="font-mono text-[10px] text-[#8E9B4D] uppercase tracking-wider block mb-1">
                FOCUS
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#E9E5DF]">
                Multilingual AI Healthcare
              </span>
            </div>
          </div>
        </section>

        {/* THE CHALLENGE */}
        <section className="p-6 sm:p-8 rounded-[14px] bg-[#0E150D] border border-[#8E9B4D]/25 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E9E5DF] tracking-tight">
            The Challenge
          </h2>
          <p className="text-sm sm:text-base text-[#9EA298] leading-relaxed max-w-[820px]">
            Medical information is often difficult for everyday users to understand, especially when reports are written in technical English. MediCare was designed to make symptom screening, chest X-ray analysis and lab report interpretation more accessible while supporting both English and Urdu interaction.
          </p>
          <div className="pt-3 border-t border-[#8E9B4D]/15 flex items-center gap-2 text-xs text-[#9EA298]">
            <span className="text-[#8E9B4D] font-mono">ⓘ</span>
            <span>
              MediCare is an AI-assisted screening project and is not intended to replace professional medical diagnosis.
            </span>
          </div>
        </section>

        {/* THE SOLUTION */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#E9E5DF] tracking-tight">
              The Solution
            </h2>
            <p className="text-sm text-[#9EA298]">
              MediCare brings multiple AI-powered health tools into one mobile experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1 */}
            <div className="p-6 rounded-[12px] bg-[#0E150D] border border-[#8E9B4D]/25 hover:border-[#8E9B4D]/45 transition-colors space-y-3">
              <div className="w-9 h-9 rounded-[6px] bg-[#142012] border border-[#8E9B4D]/30 flex items-center justify-center text-[#8E9B4D] font-bold">
                🩺
              </div>
              <h3 className="text-lg font-bold text-[#E9E5DF]">Symptom Checker</h3>
              <p className="text-xs text-[#9EA298] leading-relaxed">
                AI-assisted symptom screening with voice input and follow-up severity questions.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-[12px] bg-[#0E150D] border border-[#8E9B4D]/25 hover:border-[#8E9B4D]/45 transition-colors space-y-3">
              <div className="w-9 h-9 rounded-[6px] bg-[#142012] border border-[#8E9B4D]/30 flex items-center justify-center text-[#8E9B4D] font-bold">
                🩻
              </div>
              <h3 className="text-lg font-bold text-[#E9E5DF]">X-Ray Analysis</h3>
              <p className="text-xs text-[#9EA298] leading-relaxed">
                CNN-based chest X-ray screening for Normal and Pneumonia classifications.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-[12px] bg-[#0E150D] border border-[#8E9B4D]/25 hover:border-[#8E9B4D]/45 transition-colors space-y-3">
              <div className="w-9 h-9 rounded-[6px] bg-[#142012] border border-[#8E9B4D]/30 flex items-center justify-center text-[#8E9B4D] font-bold">
                📄
              </div>
              <h3 className="text-lg font-bold text-[#E9E5DF]">Lab Report Reader</h3>
              <p className="text-xs text-[#9EA298] leading-relaxed">
                OCR-based extraction and interpretation of supported medical test values.
              </p>
            </div>
          </div>
        </section>

        {/* REAL PRODUCT EXPERIENCE */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#E9E5DF] tracking-tight">
              Inside MediCare
            </h2>
            <p className="text-sm text-[#9EA298]">
              Key application screens designed for clean navigation and patient accessibility.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-[16px] bg-[#0E150D] border border-[#8E9B4D]/25 flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12">
            <PhoneFrame
              src="/app-images/Dashboard.jpeg"
              alt="MediCare Dashboard Screen"
              caption="Dashboard — Access AI health tools, history and emergency actions from one place."
              onImageClick={handleImageClick}
            />
            <PhoneFrame
              src="/app-images/profile.jpeg"
              alt="MediCare User Profile Screen"
              caption="Profile — Manage user information, language preferences and account settings."
              onImageClick={handleImageClick}
            />
          </div>
        </section>

        {/* SMARTER SYMPTOM SCREENING */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#E9E5DF] tracking-tight">
              Smarter Symptom Screening
            </h2>
            <p className="text-sm text-[#9EA298] max-w-[720px] leading-relaxed">
              Users can provide symptoms manually or through voice. Follow-up questions capture severity before the ML model generates ranked predictions and supporting guidance.
            </p>
          </div>

          {/* Visual Sequence Grid */}
          <div className="p-6 rounded-[16px] bg-[#0E150D] border border-[#8E9B4D]/25 space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
              <PhoneFrame
                src="/app-images/symtom-checker.jpeg"
                alt="Symptom Checker Landing"
                caption="1. Enter Profile Data"
                onImageClick={handleImageClick}
              />
              <PhoneFrame
                src="/app-images/symtoms.jpeg"
                alt="Select or Speak Symptoms"
                caption="2. Select or Speak Symptoms"
                onImageClick={handleImageClick}
              />
              <PhoneFrame
                src="/app-images/symtom-mcq.jpeg"
                alt="Follow-up MCQ Severity Questions"
                caption="3. Answer Severity Questions"
                onImageClick={handleImageClick}
              />
              <PhoneFrame
                src="/app-images/symtom-result.jpeg"
                alt="Ranked AI Symptom Predictions"
                caption="4. View AI Predictions"
                onImageClick={handleImageClick}
              />
            </div>
          </div>
        </section>

        {/* AI CHEST X-RAY ANALYSIS */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#E9E5DF] tracking-tight">
              AI Chest X-Ray Analysis
            </h2>
          </div>

          <div className="p-6 sm:p-8 rounded-[16px] bg-[#0E150D] border border-[#8E9B4D]/25 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Prominent X-Ray Result Phone Frame */}
            <div className="md:col-span-5 flex justify-center">
              <PhoneFrame
                src="/app-images/x-ray result.jpeg"
                alt="Chest X-Ray Analysis Result Screen"
                caption="Chest X-Ray Classification Result"
                onImageClick={handleImageClick}
              />
            </div>

            {/* Right: Technical Explanation & Compact Specs */}
            <div className="md:col-span-7 space-y-5">
              <p className="text-sm sm:text-base text-[#9EA298] leading-relaxed">
                A TensorFlow/Keras CNN analyzes uploaded chest X-rays and classifies them as Normal or Pneumonia with a confidence score.
              </p>

              {/* Compact Technical Badges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded bg-[#121B10] border border-[#8E9B4D]/20 text-center">
                  <span className="font-mono text-[10px] text-[#8E9B4D] uppercase block">MODEL</span>
                  <span className="text-xs font-semibold text-[#E9E5DF]">Keras CNN</span>
                </div>
                <div className="p-3 rounded bg-[#121B10] border border-[#8E9B4D]/20 text-center">
                  <span className="font-mono text-[10px] text-[#8E9B4D] uppercase block">INPUT</span>
                  <span className="text-xs font-semibold text-[#E9E5DF]">150 × 150 RGB</span>
                </div>
                <div className="p-3 rounded bg-[#121B10] border border-[#8E9B4D]/20 text-center">
                  <span className="font-mono text-[10px] text-[#8E9B4D] uppercase block">CLASSES</span>
                  <span className="text-xs font-semibold text-[#E9E5DF]">Normal / Pneumonia</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* LAB REPORT READER */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#E9E5DF] tracking-tight">
              From Lab Report to Clear Results
            </h2>
            <p className="text-sm text-[#9EA298] max-w-[720px]">
              EasyOCR extracts text from uploaded reports, identifies supported medical tests and presents values with Normal, Low or High status.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-[16px] bg-[#0E150D] border border-[#8E9B4D]/25 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-12">
            
            {/* Step 1: Uploaded Report */}
            <div className="flex flex-col items-center">
              <PhoneFrame
                src="/app-images/report.jpeg"
                alt="Uploaded Lab Report Document"
                caption="1. Uploaded Lab Report"
                onImageClick={handleImageClick}
              />
            </div>

            {/* Connector Badge */}
            <div className="flex flex-col items-center justify-center p-3 rounded-full bg-[#142012] border border-[#8E9B4D]/30 text-[#8E9B4D] font-mono text-xs font-bold my-auto">
              <span>EasyOCR + Matching →</span>
            </div>

            {/* Step 2: Interpreted Result */}
            <div className="flex flex-col items-center">
              <PhoneFrame
                src="/app-images/Lab-result.jpeg"
                alt="Interpreted Lab Values Result Screen"
                caption="2. Interpreted Result & Status"
                onImageClick={handleImageClick}
              />
            </div>

          </div>
        </section>

        {/* MULTILINGUAL VOICE AI */}
        <section className="p-6 sm:p-8 rounded-[16px] bg-[#0E150D] border border-[#8E9B4D]/30 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E9E5DF] tracking-tight">
            Built for English &amp; Urdu
          </h2>
          <p className="text-sm sm:text-base text-[#9EA298] leading-relaxed max-w-[800px]">
            Users can speak symptoms in English, Urdu or Roman Urdu. Groq Whisper handles speech transcription while LLaMA supports symptom understanding, translation and Urdu result generation.
          </p>

          {/* Clean Horizontal Voice Flow */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center pt-2">
            {[
              { step: '01', title: 'Speak', desc: 'Voice input in English/Urdu' },
              { step: '02', title: 'Transcribe', desc: 'Groq Whisper STT' },
              { step: '03', title: 'Understand', desc: 'LLaMA symptom mapping' },
              { step: '04', title: 'Result', desc: 'ML Disease Inference' },
              { step: '05', title: 'Urdu Voice', desc: 'Spoken Urdu TTS output' },
            ].map((item) => (
              <div key={item.step} className="p-3.5 rounded-[8px] bg-[#121B10] border border-[#8E9B4D]/20 space-y-1">
                <span className="font-mono text-[10px] text-[#8E9B4D] font-bold block">{item.step}</span>
                <span className="text-xs font-bold text-[#E9E5DF] block">{item.title}</span>
                <span className="text-[10px] text-[#9EA298] block">{item.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* TECHNOLOGY SECTION */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E9E5DF] tracking-tight">
            Technology Behind MediCare
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Group 1 */}
            <div className="p-5 rounded-[12px] bg-[#0E150D] border border-[#8E9B4D]/25 space-y-2">
              <span className="font-mono text-[10px] text-[#8E9B4D] uppercase font-bold tracking-wider block">
                MOBILE
              </span>
              <ul className="space-y-1 text-xs text-[#E9E5DF] font-mono">
                <li>Flutter</li>
                <li>Dart</li>
              </ul>
            </div>

            {/* Group 2 */}
            <div className="p-5 rounded-[12px] bg-[#0E150D] border border-[#8E9B4D]/25 space-y-2">
              <span className="font-mono text-[10px] text-[#8E9B4D] uppercase font-bold tracking-wider block">
                AI &amp; ML
              </span>
              <ul className="space-y-1 text-xs text-[#E9E5DF] font-mono">
                <li>TensorFlow</li>
                <li>scikit-learn</li>
                <li>EasyOCR</li>
              </ul>
            </div>

            {/* Group 3 */}
            <div className="p-5 rounded-[12px] bg-[#0E150D] border border-[#8E9B4D]/25 space-y-2">
              <span className="font-mono text-[10px] text-[#8E9B4D] uppercase font-bold tracking-wider block">
                BACKEND &amp; AI
              </span>
              <ul className="space-y-1 text-xs text-[#E9E5DF] font-mono">
                <li>Python / FastAPI</li>
                <li>Groq Whisper</li>
                <li>LLaMA 3.3 70B</li>
              </ul>
            </div>

            {/* Group 4 */}
            <div className="p-5 rounded-[12px] bg-[#0E150D] border border-[#8E9B4D]/25 space-y-2">
              <span className="font-mono text-[10px] text-[#8E9B4D] uppercase font-bold tracking-wider block">
                DATA &amp; AUTHENTICATION
              </span>
              <ul className="space-y-1 text-xs text-[#E9E5DF] font-mono">
                <li>Supabase / PostgreSQL</li>
                <li>SQLite (On-device)</li>
                <li>Firebase Auth</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SIMPLE ARCHITECTURE */}
        <section className="p-6 rounded-[14px] bg-[#0E150D] border border-[#8E9B4D]/25 space-y-4">
          <h2 className="text-xl font-bold text-[#E9E5DF]">
            Architecture Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 rounded bg-[#121B10] border border-[#8E9B4D]/20 text-xs font-mono text-[#E9E5DF]">
              Flutter Mobile App
            </div>
            <div className="p-3.5 rounded bg-[#121B10] border border-[#8E9B4D]/20 text-xs font-mono text-[#8E9B4D] font-bold">
              FastAPI Server
            </div>
            <div className="p-3.5 rounded bg-[#121B10] border border-[#8E9B4D]/20 text-xs font-mono text-[#E9E5DF]">
              AI Models (ML / CNN / OCR / LLM)
            </div>
            <div className="p-3.5 rounded bg-[#121B10] border border-[#8E9B4D]/20 text-xs font-mono text-[#E9E5DF]">
              Supabase / SQLite
            </div>
          </div>
        </section>

        {/* PROJECT OUTCOME */}
        <section className="p-8 rounded-[16px] bg-[#0E150D] border border-[#8E9B4D]/30 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E9E5DF] tracking-tight">
            What This Project Demonstrates
          </h2>
          <p className="text-sm sm:text-base text-[#9EA298] leading-relaxed max-w-[860px]">
            MediCare demonstrates how multiple AI technologies can work together inside one practical mobile product — combining machine learning, computer vision, OCR, speech AI, multilingual LLM capabilities, backend APIs and cloud/local data storage.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              'Machine Learning',
              'Computer Vision',
              'OCR',
              'Voice AI',
              'LLMs',
              'Mobile Development',
              'Backend APIs',
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-[#142012] border border-[#8E9B4D]/30 font-mono text-xs text-[#8E9B4D]"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="pt-8 border-t border-[#8E9B4D]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-[#E9E5DF]">
              Explore More Projects
            </h3>
          </div>

          <a
            href="/#projects"
            onClick={handleBackToProjects}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#070C08] font-bold bg-[#8E9B4D] hover:bg-[#a6b256] px-5 py-2.5 rounded-[4px] transition-colors cursor-pointer"
          >
            <span>← Back to Projects</span>
          </a>
        </section>

      </main>

      {/* FULLSCREEN LIGHTBOX MODAL FOR SCREENSHOTS */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-[#070C08]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6"
        >
          <div className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-10 right-0 text-[#E9E5DF] hover:text-[#8E9B4D] font-mono text-sm flex items-center gap-1 cursor-pointer bg-[#0E150D] px-3 py-1 rounded border border-[#8E9B4D]/30"
            >
              <span>✕ Close</span>
            </button>
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-[16px] border border-[#8E9B4D]/40 shadow-2xl"
            />
            <p className="mt-3 text-xs font-mono text-[#9EA298] text-center">
              {activeImage.alt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
