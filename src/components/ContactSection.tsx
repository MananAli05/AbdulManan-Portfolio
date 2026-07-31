import React, { useEffect, useRef, useState } from 'react';

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoSubject = encodeURIComponent(`Project Inquiry from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:abdulmannan.developer@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    setIsSubmitted(true);
  };

  return (
    <section
      id="collaboration"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#070C08] text-[#F3F3EE] overflow-hidden border-t border-[#8E9B4D]/15"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(142,155,77,0.03)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-[1140px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT SIDE: Heading, Description, Status & Location */}
          <div
            className={`lg:col-span-5 flex flex-col transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >

            {/* Main Heading */}
            <h2 className="text-[clamp(2.125rem,4.5vw,3.75rem)] font-semibold leading-[0.96] tracking-[0.02em] text-[#E9E5DF] mb-4 font-sans">
              HAVE AN IDEA? <br />
              <span className="text-[#8E9B4D]">LET'S MAKE IT REAL</span>
            </h2>

            {/* Description */}
            <p className="text-[#9EA298] text-xs sm:text-sm md:text-base font-normal leading-relaxed mb-8">
              Whether you're building an AI product, automating a workflow, or exploring a new idea, I'd be happy to discuss how we can turn it into a practical solution.
            </p>



            {/* Location & Work Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#8E9B4D]/15">
              <div>
                <span className="font-mono text-[11px] text-[#8E9B4D]/70 uppercase tracking-widest block mb-1">
                  LOCATION
                </span>
                <span className="text-xs sm:text-sm font-sans font-medium text-[#E9E5DF]">
                  Rahim Yar Khan, Pakistan
                </span>
              </div>

              <div>
                <span className="font-mono text-[11px] text-[#8E9B4D]/70 uppercase tracking-widest block mb-1">
                  WORK MODE
                </span>
                <span className="text-xs sm:text-sm font-sans font-medium text-[#E9E5DF]">
                  Available Worldwide (Remote)
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Minimal Inquiry Form */}
          <div
            className={`lg:col-span-7 flex flex-col transition-all duration-1000 ease-out delay-150 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs text-[#8E9B4D] tracking-wider uppercase">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Abdul Manan"
                    className="w-full bg-[#0C120D] border border-[#8E9B4D]/25 focus:border-[#8E9B4D] focus:outline-none text-[#E9E5DF] px-4 py-3 text-sm rounded-[4px] placeholder-[#9EA298]/40 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs text-[#8E9B4D] tracking-wider uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full bg-[#0C120D] border border-[#8E9B4D]/25 focus:border-[#8E9B4D] focus:outline-none text-[#E9E5DF] px-4 py-3 text-sm rounded-[4px] placeholder-[#9EA298]/40 transition-colors"
                  />
                </div>
              </div>

              {/* What are you looking to build */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs text-[#8E9B4D] tracking-wider uppercase">
                  What are you looking to build?
                </label>
                <input
                  type="text"
                  required
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  placeholder="e.g. AI Web App, RAG Solution, Voice Agent, Automation"
                  className="w-full bg-[#0C120D] border border-[#8E9B4D]/25 focus:border-[#8E9B4D] focus:outline-none text-[#E9E5DF] px-4 py-3 text-sm rounded-[4px] placeholder-[#9EA298]/40 transition-colors"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs text-[#8E9B4D] tracking-wider uppercase">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, goals, or timeline..."
                  className="w-full bg-[#0C120D] border border-[#8E9B4D]/25 focus:border-[#8E9B4D] focus:outline-none text-[#E9E5DF] px-4 py-3 text-sm rounded-[4px] placeholder-[#9EA298]/40 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-2 w-full bg-[#8E9B4D] hover:bg-[#9EAB5D] text-[#070C08] font-mono text-sm font-bold tracking-wider px-7 py-3.5 rounded-[4px] uppercase transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer shadow-md shadow-[#8E9B4D]/10"
              >
                {isSubmitted ? 'SENDING EMAIL...' : 'SEND MESSAGE '}
              </button>

              {/* Prefer email note */}
              <a
                href="mailto:abdulmannan.developer@gmail.com"
                className="font-mono text-xs text-[#9EA298] hover:text-[#8E9B4D] transition-colors mt-2 text-right block"
              >
                Prefer email? → <span className="underline decoration-[#8E9B4D]/40">abdulmannan.developer@gmail.com</span>
              </a>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
