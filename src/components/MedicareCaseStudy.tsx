import React, { useEffect } from 'react';

export default function MedicareCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
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

  return (
    <div className="min-h-screen w-full bg-[#070C08] text-[#F3F3EE] selection:bg-[#8E9B4D] selection:text-[#070C08] relative isolate">
      {/* Ambient background glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(142,155,77,0.08)_0%,transparent_70%)] pointer-events-none -z-10" />

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-50 w-full bg-[#070C08]/90 backdrop-blur-md border-b border-[#8E9B4D]/20 px-4 sm:px-6 lg:px-12 py-3.5">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          <a
            href="/#projects"
            onClick={handleBackToProjects}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#8E9B4D] hover:text-[#A7B45C] transition-colors group cursor-pointer"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>BACK TO PROJECTS</span>
          </a>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8E9B4D] animate-pulse" />
            <span className="font-mono text-[11px] text-[#9EA298] uppercase tracking-wider hidden sm:inline">
              CASE STUDY // AI HEALTHCARE
            </span>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12 pb-24 space-y-20 sm:space-y-28">

        {/* HERO SECTION */}
        <section className="space-y-6 border-b border-[#8E9B4D]/15 pb-12 sm:pb-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-1 rounded-[4px] bg-[#8E9B4D]/10 border border-[#8E9B4D]/30 text-[#8E9B4D] font-mono text-[11px] font-semibold tracking-wider uppercase">
              CASE STUDY
            </span>
            <span className="text-xs font-mono text-[#9EA298]">
              AI HEALTHCARE / MULTILINGUAL SYSTEMS
            </span>
          </div>

          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.96] tracking-[0.02em] text-[#E9E5DF] font-sans">
            MEDICARE
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-[#8E9B4D] font-medium max-w-[820px] leading-snug">
            Multilingual AI-Powered Medical Assistant
          </p>

          <p className="text-[#9EA298] text-sm sm:text-base leading-relaxed max-w-[760px]">
            An AI-powered mobile health assistant designed to make symptom screening, chest X-ray analysis, and lab report interpretation more accessible through multilingual voice and AI capabilities.
          </p>

          {/* Technology Chips */}
          <div className="pt-3 flex flex-wrap gap-2">
            {['Flutter', 'FastAPI', 'Python', 'TensorFlow', 'scikit-learn', 'EasyOCR', 'Groq', 'Firebase', 'Supabase', 'SQLite'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-[4px] bg-[#0E150D] border border-[#8E9B4D]/25 font-mono text-xs text-[#E9E5DF] shadow-sm hover:border-[#8E9B4D]/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* 01 — THE PROBLEM */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#8E9B4D] font-bold">01 //</span>
            <h2 className="text-xs font-mono text-[#8E9B4D] uppercase tracking-[0.2em] font-semibold">
              THE PROBLEM
            </h2>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E9E5DF] tracking-tight">
            Making Medical Information Easier to Understand
          </h3>

          <p className="text-[#9EA298] text-sm sm:text-base leading-relaxed max-w-[820px]">
            Healthcare information is often locked behind complex medical jargon, dense laboratory reports, and language barriers. Millions of patients struggle to assess preliminary symptoms or understand routine medical diagnostic reports before consulting specialists.
          </p>

          {/* Problem Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {[
              {
                title: 'Complex Medical Reports',
                desc: 'Difficulty understanding technical English lab values and diagnostic terminology.',
              },
              {
                title: 'Limited Specialist Access',
                desc: 'Long wait times and geographical barriers for initial diagnostic guidance.',
              },
              {
                title: 'Dense X-Ray & Lab Data',
                desc: 'Inability for non-technical patients to interpret raw radiology or blood work values.',
              },
              {
                title: 'Urdu Language Barriers',
                desc: 'Lack of accessible medical AI tools supporting spoken Urdu and Roman Urdu input.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-[8px] bg-[#0E150D] border border-[#8E9B4D]/20 hover:border-[#8E9B4D]/40 transition-colors space-y-2"
              >
                <div className="w-7 h-7 rounded-[4px] bg-[#8E9B4D]/10 text-[#8E9B4D] font-mono text-xs font-bold flex items-center justify-center">
                  0{idx + 1}
                </div>
                <h4 className="text-sm font-bold text-[#E9E5DF]">{item.title}</h4>
                <p className="text-xs text-[#9EA298] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Medical Disclaimer Banner */}
          <div className="p-4 rounded-[6px] bg-[#121B10] border border-[#8E9B4D]/35 text-xs text-[#E9E5DF]/90 space-y-1">
            <span className="font-mono font-bold text-[#8E9B4D] uppercase tracking-wider block">
              ⚠ AI-ASSISTED SCREENING DISCLAIMER
            </span>
            <p className="text-[#9EA298] leading-relaxed">
              MediCare is engineered strictly as an AI-assisted preliminary screening and educational information system. It is <strong className="text-[#E9E5DF]">not a replacement for licensed medical doctors</strong> and does not provide definitive medical diagnoses or clinical treatment prescriptions.
            </p>
          </div>
        </section>

        {/* 02 — THE SOLUTION */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#8E9B4D] font-bold">02 //</span>
            <h2 className="text-xs font-mono text-[#8E9B4D] uppercase tracking-[0.2em] font-semibold">
              THE SOLUTION
            </h2>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E9E5DF] tracking-tight">
            Three Core AI Pipelines in One Mobile Experience
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature Block 1 */}
            <div className="p-6 rounded-[10px] bg-[#0E150D] border border-[#8E9B4D]/25 space-y-4 hover:border-[#8E9B4D]/50 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <div className="px-2.5 py-1 rounded bg-[#8E9B4D]/15 text-[#8E9B4D] font-mono text-[10px] uppercase font-bold tracking-wider inline-block">
                  AI PIPELINE 01
                </div>
                <h4 className="text-xl font-bold text-[#E9E5DF]">SYMPTOM CHECKER</h4>
                <p className="text-xs text-[#9EA298] leading-relaxed">
                  User enters or speaks symptoms in natural language. The system processes input and produces ranked disease predictions with confidence ratings, severity assessment, disease descriptions, and recommended precautions.
                </p>
              </div>
              <div className="pt-3 border-t border-[#8E9B4D]/15 font-mono text-[11px] text-[#8E9B4D]">
                scikit-learn · LLaMA 3.3 · Weighted ML
              </div>
            </div>

            {/* Feature Block 2 */}
            <div className="p-6 rounded-[10px] bg-[#0E150D] border border-[#8E9B4D]/25 space-y-4 hover:border-[#8E9B4D]/50 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <div className="px-2.5 py-1 rounded bg-[#8E9B4D]/15 text-[#8E9B4D] font-mono text-[10px] uppercase font-bold tracking-wider inline-block">
                  AI PIPELINE 02
                </div>
                <h4 className="text-xl font-bold text-[#E9E5DF]">CHEST X-RAY ANALYSIS</h4>
                <p className="text-xs text-[#9EA298] leading-relaxed">
                  User uploads a chest X-ray image. A custom TensorFlow/Keras Convolutional Neural Network (CNN) analyzes image patterns and classifies the scan as NORMAL or PNEUMONIA with confidence probability.
                </p>
              </div>
              <div className="pt-3 border-t border-[#8E9B4D]/15 font-mono text-[11px] text-[#8E9B4D]">
                TensorFlow · Keras CNN · Sigmoid 0–1
              </div>
            </div>

            {/* Feature Block 3 */}
            <div className="p-6 rounded-[10px] bg-[#0E150D] border border-[#8E9B4D]/25 space-y-4 hover:border-[#8E9B4D]/50 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <div className="px-2.5 py-1 rounded bg-[#8E9B4D]/15 text-[#8E9B4D] font-mono text-[10px] uppercase font-bold tracking-wider inline-block">
                  AI PIPELINE 03
                </div>
                <h4 className="text-xl font-bold text-[#E9E5DF]">LAB REPORT READER</h4>
                <p className="text-xs text-[#9EA298] leading-relaxed">
                  User captures or uploads a lab report photo. EasyOCR extracts text; custom alias matching maps test names, extracts numerical values, and categorizes results as Normal, Low, or High relative to medical reference ranges.
                </p>
              </div>
              <div className="pt-3 border-t border-[#8E9B4D]/15 font-mono text-[11px] text-[#8E9B4D]">
                EasyOCR · Image Upscaling · Range Matching
              </div>
            </div>
          </div>
        </section>

        {/* 03 — MULTILINGUAL VOICE EXPERIENCE */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#8E9B4D] font-bold">03 //</span>
            <h2 className="text-xs font-mono text-[#8E9B4D] uppercase tracking-[0.2em] font-semibold">
              MULTILINGUAL VOICE EXPERIENCE
            </h2>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E9E5DF] tracking-tight">
            Seamless Voice NLP Across English, Urdu &amp; Roman Urdu
          </h3>

          <p className="text-[#9EA298] text-sm sm:text-base leading-relaxed max-w-[820px]">
            To overcome language barriers, MediCare implements a speech and translation architecture. Spoken audio in English, Urdu, or Roman Urdu is transcribed via Groq Whisper, mapped to medical symptom taxonomies by LLaMA 3.3, and spoken back in Urdu using text-to-speech synthesis.
          </p>

          {/* Pipeline Visual Flow */}
          <div className="p-6 rounded-[10px] bg-[#0E150D] border border-[#8E9B4D]/30 space-y-6">
            <span className="font-mono text-xs text-[#8E9B4D] uppercase tracking-wider font-bold block">
              END-TO-END VOICE &amp; NLP PIPELINE
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-7 gap-3 text-center">
              {[
                'USER SPEAKS',
                'GROQ WHISPER',
                'SPEECH TO TEXT',
                'LLAMA 3.3',
                'SYMPTOM MAPPING',
                'AI RESULT',
                'URDU TTS',
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center p-3 rounded bg-[#121B10] border border-[#8E9B4D]/20">
                  <span className="font-mono text-[10px] text-[#8E9B4D] font-bold mb-1">0{idx + 1}</span>
                  <span className="font-mono text-xs text-[#E9E5DF] font-semibold">{step}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#8E9B4D]/15 text-xs text-[#9EA298]">
              <div>
                <strong className="text-[#E9E5DF] block font-mono mb-1">English Input</strong>
                Direct speech-to-text and symptom matching for English medical terms.
              </div>
              <div>
                <strong className="text-[#E9E5DF] block font-mono mb-1">Urdu Script &amp; Voice</strong>
                Native Urdu speech recognition and translated medical summaries.
              </div>
              <div>
                <strong className="text-[#E9E5DF] block font-mono mb-1">Roman Urdu Support</strong>
                LLaMA translates phonetically spelled Roman Urdu into structured symptoms.
              </div>
              <div>
                <strong className="text-[#E9E5DF] block font-mono mb-1">Spoken Summaries</strong>
                Urdu Text-to-Speech delivers voice explanations for low-literacy users.
              </div>
            </div>
          </div>
        </section>

        {/* 04 — SYSTEM ARCHITECTURE */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#8E9B4D] font-bold">04 //</span>
            <h2 className="text-xs font-mono text-[#8E9B4D] uppercase tracking-[0.2em] font-semibold">
              SYSTEM ARCHITECTURE
            </h2>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E9E5DF] tracking-tight">
            Connected Mobile, Cloud &amp; AI Stack
          </h3>

          {/* HTML/CSS Connected Architecture Blocks */}
          <div className="p-6 sm:p-8 rounded-[12px] bg-[#0E150D] border border-[#8E9B4D]/30 space-y-6">
            
            {/* Layer 1: Mobile App */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#8E9B4D] uppercase font-bold tracking-wider block">
                01. FLUTTER MOBILE APP LAYER
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['Symptom Checker', 'X-Ray Analysis', 'Lab Report Reader', 'History & Profile'].map((mod) => (
                  <div key={mod} className="p-3 rounded bg-[#141F12] border border-[#8E9B4D]/30 text-center font-mono text-xs text-[#E9E5DF]">
                    {mod}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center text-[#8E9B4D] font-mono text-xs">↓ REST API / HTTPS</div>

            {/* Layer 2: Service Layer */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#8E9B4D] uppercase font-bold tracking-wider block">
                02. SERVICE &amp; DATA LAYER
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['Auth Service', 'Voice Service', 'Medical Data Service', 'Database Helper'].map((mod) => (
                  <div key={mod} className="p-3 rounded bg-[#141F12] border border-[#8E9B4D]/30 text-center font-mono text-xs text-[#E9E5DF]">
                    {mod}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center text-[#8E9B4D] font-mono text-xs">↓ BACKEND ORCHESTRATION</div>

            {/* Layer 3: Backend & Cloud */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#8E9B4D] uppercase font-bold tracking-wider block">
                03. BACKEND &amp; CLOUD INFRASTRUCTURE
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['FastAPI AI Server', 'Firebase Auth', 'Supabase Cloud', 'SQLite Local'].map((mod) => (
                  <div key={mod} className="p-3 rounded bg-[#141F12] border border-[#8E9B4D]/30 text-center font-mono text-xs text-[#E9E5DF]">
                    {mod}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center text-[#8E9B4D] font-mono text-xs">↓ AI MODEL INFERENCE</div>

            {/* Layer 4: AI Layer */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#8E9B4D] uppercase font-bold tracking-wider block">
                04. SPECIALIZED AI &amp; GENAI LAYER
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {['Symptom Prediction ML', 'Pneumonia CNN', 'EasyOCR Engine', 'Groq Whisper', 'LLaMA 3.3 70B'].map((mod) => (
                  <div key={mod} className="p-3 rounded bg-[#192717] border border-[#8E9B4D]/40 text-center font-mono text-xs text-[#8E9B4D] font-bold">
                    {mod}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 05 — AI SYSTEMS */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#8E9B4D] font-bold">05 //</span>
            <h2 className="text-xs font-mono text-[#8E9B4D] uppercase tracking-[0.2em] font-semibold">
              TECHNICAL SPECIFICATIONS OF AI PIPELINES
            </h2>
          </div>

          <div className="space-y-6">

            {/* System A */}
            <div className="p-6 rounded-[10px] bg-[#0E150D] border border-[#8E9B4D]/25 space-y-4">
              <h4 className="text-xl font-bold text-[#E9E5DF] flex items-center justify-between">
                <span>A. SYMPTOM PREDICTION MODEL</span>
                <span className="font-mono text-xs text-[#8E9B4D]">34 FEATURES</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-[#9EA298]">
                <div>
                  <strong className="text-[#E9E5DF] block font-mono mb-1">Feature Input:</strong>
                  34 weighted symptom features gathered via GUI or voice input.
                </div>
                <div>
                  <strong className="text-[#E9E5DF] block font-mono mb-1">Severity Weighting:</strong>
                  Dynamic MCQ follow-up questions to assess symptom intensity.
                </div>
                <div>
                  <strong className="text-[#E9E5DF] block font-mono mb-1">Model Classifier:</strong>
                  Serialized scikit-learn model (Random Forest / SVM pipeline).
                </div>
                <div>
                  <strong className="text-[#E9E5DF] block font-mono mb-1">Output Ranking:</strong>
                  Top-5 disease predictions ranked by relative probability score.
                </div>
              </div>
            </div>

            {/* System B */}
            <div className="p-6 rounded-[10px] bg-[#0E150D] border border-[#8E9B4D]/25 space-y-4">
              <h4 className="text-xl font-bold text-[#E9E5DF] flex items-center justify-between">
                <span>B. PNEUMONIA DETECTION CNN</span>
                <span className="font-mono text-xs text-[#8E9B4D]">5,863 SCANS</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-[#9EA298]">
                <div>
                  <strong className="text-[#E9E5DF] block font-mono mb-1">Framework:</strong>
                  TensorFlow / Keras CNN architecture.
                </div>
                <div>
                  <strong className="text-[#E9E5DF] block font-mono mb-1">Dataset:</strong>
                  Kaggle Chest X-Ray Images (Pneumonia) dataset of 5,863 scans.
                </div>
                <div>
                  <strong className="text-[#E9E5DF] block font-mono mb-1">Pre-processing:</strong>
                  150 × 150 RGB image normalization (scaled 0–1).
                </div>
                <div>
                  <strong className="text-[#E9E5DF] block font-mono mb-1">Classification:</strong>
                  Binary Sigmoidal Probability Output (NORMAL vs PNEUMONIA).
                </div>
              </div>
            </div>

            {/* System C */}
            <div className="p-6 rounded-[10px] bg-[#0E150D] border border-[#8E9B4D]/25 space-y-4">
              <h4 className="text-xl font-bold text-[#E9E5DF] flex items-center justify-between">
                <span>C. LAB REPORT OCR &amp; ALIAS MATCHING</span>
                <span className="font-mono text-xs text-[#8E9B4D]">25+ TEST TYPES</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-[#9EA298]">
                <div>
                  <strong className="text-[#E9E5DF] block font-mono mb-1">OCR Engine:</strong>
                  EasyOCR with 2× upscale image pre-processing and grayscale conversion.
                </div>
                <div>
                  <strong className="text-[#E9E5DF] block font-mono mb-1">Alias Mapping:</strong>
                  Robust regex &amp; string alias matching across 25+ common lab tests.
                </div>
                <div>
                  <strong className="text-[#E9E5DF] block font-mono mb-1">Categories:</strong>
                  CBC, Diabetes, Liver, Kidney, Lipid Panel, Vitamins, Thyroid.
                </div>
                <div>
                  <strong className="text-[#E9E5DF] block font-mono mb-1">Range Evaluation:</strong>
                  Automatic classification into Normal, Low, or High values.
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 06 — SYMPTOM CHECKER WORKFLOW */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#8E9B4D] font-bold">06 //</span>
            <h2 className="text-xs font-mono text-[#8E9B4D] uppercase tracking-[0.2em] font-semibold">
              SYMPTOM CHECKER WORKFLOW
            </h2>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E9E5DF] tracking-tight">
            11-Step End-to-End Processing Workflow
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'User provides basic profile information',
              'Symptoms entered manually or by voice',
              'Voice input transcribed with Groq Whisper',
              'LLaMA maps natural-language input to symptoms',
              'Follow-up MCQs assess symptom severity',
              '34-element weighted vector generated',
              'FastAPI sends vector to ML model',
              'Top-5 predictions generated with probabilities',
              'Descriptions and precautions attached to result',
              'Results saved to cloud + local device history',
              'Optional Urdu translation and text-to-speech output',
            ].map((step, idx) => (
              <div key={idx} className="p-4 rounded-[6px] bg-[#0E150D] border border-[#8E9B4D]/20 flex items-start gap-3">
                <span className="font-mono text-xs font-bold text-[#8E9B4D] px-2 py-0.5 rounded bg-[#8E9B4D]/10">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </span>
                <span className="text-xs text-[#E9E5DF] leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 07 — HYBRID DATA ARCHITECTURE & AUTH */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Hybrid Data */}
          <div className="p-6 rounded-[10px] bg-[#0E150D] border border-[#8E9B4D]/25 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#8E9B4D] font-bold">07 //</span>
              <h3 className="text-lg font-bold text-[#E9E5DF]">HYBRID DATA ARCHITECTURE</h3>
            </div>
            <p className="text-xs text-[#9EA298] leading-relaxed">
              MediCare employs a hybrid storage strategy to guarantee offline availability while keeping cloud user profiles synchronized across devices.
            </p>
            <div className="space-y-3 pt-2">
              <div className="p-3 rounded bg-[#121B10] border border-[#8E9B4D]/20 text-xs">
                <strong className="text-[#8E9B4D] block font-mono mb-1">SUPABASE / POSTGRESQL (CLOUD)</strong>
                Cloud storage for user profiles, symptom history logs, X-ray classification records, and lab report history.
              </div>
              <div className="p-3 rounded bg-[#121B10] border border-[#8E9B4D]/20 text-xs">
                <strong className="text-[#8E9B4D] block font-mono mb-1">SQLITE (ON-DEVICE LOCAL)</strong>
                On-device storage for offline access, immediate user caching, and localized history when offline.
              </div>
            </div>
          </div>

          {/* Authentication & Cloud */}
          <div className="p-6 rounded-[10px] bg-[#0E150D] border border-[#8E9B4D]/25 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#8E9B4D] font-bold">08 //</span>
              <h3 className="text-lg font-bold text-[#E9E5DF]">AUTHENTICATION &amp; CLOUD SECURITY</h3>
            </div>
            <p className="text-xs text-[#9EA298] leading-relaxed">
              Secure authentication guarantees user data privacy and session integrity without exposing sensitive backend infrastructure.
            </p>
            <div className="space-y-3 pt-2">
              <div className="p-3 rounded bg-[#121B10] border border-[#8E9B4D]/20 text-xs">
                <strong className="text-[#8E9B4D] block font-mono mb-1">FIREBASE AUTHENTICATION</strong>
                Phone OTP authentication for secure user registration and friction-free login sessions.
              </div>
              <div className="p-3 rounded bg-[#121B10] border border-[#8E9B4D]/20 text-xs">
                <strong className="text-[#8E9B4D] block font-mono mb-1">REST API SECURITY</strong>
                FastAPI endpoints require validated authorization headers and sanitized payload inputs.
              </div>
            </div>
          </div>

        </section>

        {/* 09 — TECHNOLOGY STACK */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#8E9B4D] font-bold">09 //</span>
            <h2 className="text-xs font-mono text-[#8E9B4D] uppercase tracking-[0.2em] font-semibold">
              TECHNOLOGY STACK
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { category: 'MOBILE', tech: ['Flutter', 'Dart', 'Provider'] },
              { category: 'BACKEND', tech: ['Python', 'FastAPI', 'Uvicorn'] },
              { category: 'AI / ML', tech: ['TensorFlow', 'Keras', 'scikit-learn', 'EasyOCR'] },
              { category: 'GENERATIVE AI', tech: ['Groq Whisper v3', 'LLaMA 3.3 70B'] },
              { category: 'DATABASE', tech: ['Supabase', 'PostgreSQL', 'SQLite'] },
              { category: 'AUTH', tech: ['Firebase Auth'] },
            ].map((group) => (
              <div key={group.category} className="p-4 rounded-[8px] bg-[#0E150D] border border-[#8E9B4D]/20 space-y-2">
                <span className="font-mono text-[10px] text-[#8E9B4D] uppercase tracking-wider font-bold block">
                  {group.category}
                </span>
                <ul className="space-y-1 text-xs text-[#E9E5DF]">
                  {group.tech.map((t) => (
                    <li key={t} className="font-mono">{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 10 — KEY ENGINEERING CHALLENGES & SOLUTIONS */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#8E9B4D] font-bold">10 //</span>
            <h2 className="text-xs font-mono text-[#8E9B4D] uppercase tracking-[0.2em] font-semibold">
              KEY ENGINEERING CHALLENGES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                challenge: 'Multilingual Medical Input',
                detail: 'Users present symptoms in English, Urdu script, or Roman Urdu.',
                approach: 'Implemented Groq Whisper for speech transcription coupled with LLaMA 3.3 for medical intent extraction and Urdu translation.',
              },
              {
                challenge: 'Hybrid Connectivity',
                detail: 'Mobile health tools must function reliably even in low-bandwidth regions.',
                approach: 'Combined cloud-synced Supabase backend with local SQLite caching for seamless offline diagnostic history access.',
              },
              {
                challenge: 'Multiple AI Pipelines',
                detail: 'Symptom scoring, X-ray classification, and OCR are fundamentally different workloads.',
                approach: 'Architected a modular FastAPI server exposing dedicated asynchronous endpoints for each specialized AI pipeline.',
              },
              {
                challenge: 'Medical Report Variability',
                detail: 'Different diagnostic labs use varying terminology and formatting for lab values.',
                approach: 'Developed alias-based OCR fuzzy string matching and numeric look-ahead parsers across 25+ common test categories.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-[10px] bg-[#0E150D] border border-[#8E9B4D]/25 space-y-3">
                <span className="font-mono text-xs text-[#8E9B4D] font-bold block uppercase">
                  CHALLENGE 0{idx + 1}: {item.challenge}
                </span>
                <p className="text-xs text-[#9EA298]"><strong className="text-[#E9E5DF]">Problem:</strong> {item.detail}</p>
                <p className="text-xs text-[#9EA298]"><strong className="text-[#8E9B4D]">Engineering Approach:</strong> {item.approach}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 11 & 12 — INNOVATIONS & API ENDPOINTS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Innovations */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#8E9B4D] font-bold">11 //</span>
              <h2 className="text-xs font-mono text-[#8E9B4D] uppercase tracking-[0.2em] font-semibold">
                KEY INNOVATIONS
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Multilingual Voice Pipeline',
                'Hybrid Online/Offline Storage',
                'Unified AI Backend Server',
                'MCQ Severity Weighting',
                'Urdu Medical NLP Engine',
                'Lab Report Alias Matching',
              ].map((inv) => (
                <div key={inv} className="p-3 rounded bg-[#0E150D] border border-[#8E9B4D]/20 text-xs font-mono text-[#E9E5DF]">
                  • {inv}
                </div>
              ))}
            </div>
          </div>

          {/* API Endpoints */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#8E9B4D] font-bold">12 //</span>
              <h2 className="text-xs font-mono text-[#8E9B4D] uppercase tracking-[0.2em] font-semibold">
                API ARCHITECTURE
              </h2>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded bg-[#0E150D] border border-[#8E9B4D]/20 font-mono text-xs space-y-1">
                <span className="text-[#8E9B4D] font-bold">POST /predict</span>
                <span className="text-[#9EA298] block">Input: 34-element feature vector → Output: Top-5 predictions + confidence</span>
              </div>
              <div className="p-3 rounded bg-[#0E150D] border border-[#8E9B4D]/20 font-mono text-xs space-y-1">
                <span className="text-[#8E9B4D] font-bold">POST /predict-xray</span>
                <span className="text-[#9EA298] block">Input: Chest X-ray image → Output: NORMAL / PNEUMONIA + probability</span>
              </div>
              <div className="p-3 rounded bg-[#0E150D] border border-[#8E9B4D]/20 font-mono text-xs space-y-1">
                <span className="text-[#8E9B4D] font-bold">POST /interpret-report</span>
                <span className="text-[#9EA298] block">Input: Lab report image → Output: Extracted test values &amp; range analysis</span>
              </div>
            </div>
          </div>

        </section>

        {/* 13 & 14 — PRODUCT FEATURES & OUTCOME */}
        <section className="space-y-8">
          
          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#8E9B4D] font-bold">13 //</span>
              <h2 className="text-xs font-mono text-[#8E9B4D] uppercase tracking-[0.2em] font-semibold">
                ADDITIONAL PRODUCT FEATURES
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-[#9EA298]">
              {[
                'Phone OTP Authentication',
                'Personalized Dashboard',
                'Emergency Dialer',
                'Health Tips Feed',
                'English / Urdu Language Toggle',
                'Activity & Diagnosis History',
                'Profile Management',
                'Offline Login Support',
                'Text-to-Speech Output',
              ].map((feat) => (
                <span key={feat} className="px-3 py-1.5 rounded bg-[#0E150D] border border-[#8E9B4D]/20 text-[#E9E5DF]">
                  ✓ {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Project Outcome */}
          <div className="p-8 rounded-[12px] bg-[#121B10] border border-[#8E9B4D]/35 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#8E9B4D] font-bold">14 //</span>
              <span className="font-mono text-xs text-[#8E9B4D] uppercase font-bold tracking-wider">PROJECT OUTCOME</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#E9E5DF]">
              One Mobile Experience. Multiple AI Systems.
            </h3>
            <p className="text-sm text-[#9EA298] leading-relaxed max-w-[860px]">
              MediCare successfully demonstrates full-stack integration across mobile application engineering, machine learning inference, computer vision, optical character recognition (OCR), large language models (LLMs), speech processing, REST APIs, authentication, and hybrid data storage.
            </p>
          </div>

        </section>

        {/* FOOTER NAVIGATION */}
        <section className="pt-8 border-t border-[#8E9B4D]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href="/#projects"
            onClick={handleBackToProjects}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#8E9B4D] hover:text-[#A7B45C] transition-colors group cursor-pointer"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>BACK TO PROJECTS</span>
          </a>

          <span className="font-mono text-xs text-[#9EA298]">
            ABDUL MANAN // AI ENGINEER PORTFOLIO
          </span>
        </section>

      </main>
    </div>
  );
}
