import React, { useState } from 'react';
import SplitHeading from './motion/SplitHeading';
import Reveal from './motion/Reveal';
import ArrowButton from './ui/ArrowButton';

const FIELD_CLASS =
  'w-full bg-cream border border-line rounded-2xl px-5 py-4 text-[15px] text-ink placeholder-faint/70 ' +
  'transition-colors duration-300 focus:outline-none focus:border-lime focus:ring-4 focus:ring-lime/30';

const LABEL_CLASS =
  'font-mono text-[11px] uppercase tracking-[0.16em] text-faint mb-2.5 block';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    <section id="collaboration" className="relative w-full bg-cream py-24 md:py-32 lg:py-40">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT */}
          <div className="lg:col-span-5">
            <Reveal className="eyebrow mb-7">Contact</Reveal>

            <SplitHeading className="title-lg mb-8">
              <span className="block text-ink">Have an idea?</span>
              <span className="block text-deeplime">Let's make it real.</span>
            </SplitHeading>

            <Reveal className="text-body text-[17px] md:text-[19px] leading-[1.6] max-w-[520px] mb-12">
              <p>
                Whether you're building an AI product, automating a workflow, or exploring
                a new idea, I'd be happy to discuss how we can turn it into a practical
                solution.
              </p>
            </Reveal>

            <Reveal stagger className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10 border-t border-line">
              <div>
                <span className={LABEL_CLASS}>Location</span>
                <span className="text-ink text-[16px] font-medium">
                  Rahim Yar Khan, Pakistan
                </span>
              </div>
              <div>
                <span className={LABEL_CLASS}>Work mode</span>
                <span className="text-ink text-[16px] font-medium">
                  Available worldwide (remote)
                </span>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: form card */}
          <div className="lg:col-span-7">
            <Reveal>
              <form
                onSubmit={handleSubmit}
                className="card-surface p-8 sm:p-10 lg:p-12 flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className={LABEL_CLASS}>
                      Your name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Abdul Manan"
                      className={FIELD_CLASS}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className={LABEL_CLASS}>
                      Email address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className={FIELD_CLASS}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-type" className={LABEL_CLASS}>
                    What are you looking to build?
                  </label>
                  <input
                    id="contact-type"
                    type="text"
                    required
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    placeholder="e.g. AI web app, RAG solution, voice agent, automation"
                    className={FIELD_CLASS}
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className={LABEL_CLASS}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, goals, or timeline..."
                    className={`${FIELD_CLASS} resize-none`}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-2">
                  <ArrowButton type="submit" variant="ink" className="justify-center">
                    {isSubmitted ? 'Opening your email…' : 'Send message'}
                  </ArrowButton>

                  <a
                    href="mailto:abdulmannan.developer@gmail.com"
                    className="text-[14px] text-body hover:text-deeplime transition-colors link-underline self-start sm:self-auto"
                  >
                    Prefer email? abdulmannan.developer@gmail.com
                  </a>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
