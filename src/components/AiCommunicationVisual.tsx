import { useEffect, useState } from 'react';
import { MessageSquare, Mic, Volume2, Sparkles } from 'lucide-react';

export default function AiCommunicationVisual() {
  // Cycle through states: 0 = Chat / Typing, 1 = Waveform / Voice, 2 = Real-time Speaking Agent
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[560px] mx-auto py-8 px-4 sm:px-6 flex flex-col items-center justify-center text-center select-none">
      {/* Background Soft Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[380px] h-[320px] sm:h-[380px] bg-[#8E9B4D]/8 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* STATUS BADGE */}
      <div className="mb-6 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0C120D] border border-[#8E9B4D]/30 transition-all duration-700 shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8E9B4D] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8E9B4D]" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8E9B4D] font-medium">
          {activeStep === 0 && 'CHAT AI • TEXT GENERATION'}
          {activeStep === 1 && 'VOICE AI • AUDIO SYNTHESIS'}
          {activeStep === 2 && 'LIVE CONVERSATIONAL AI AGENT'}
        </span>
      </div>

      {/* CENTRAL COMBINED AI SYMBOL CONTAINER */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-2">
        {/* Outer Pulsing Decorative Concentric Rings */}
        <div className="absolute inset-0 rounded-full border border-[#8E9B4D]/20 animate-[spin_30s_linear_infinite]" />
        <div className="absolute inset-3 rounded-full border border-dashed border-[#8E9B4D]/15 animate-[spin_45s_linear_infinite_reverse]" />
        <div className="absolute inset-6 rounded-full border border-[#E9E5DF]/10" />

        {/* MAIN CHAT BUBBLE & WAVEFORM COMBINED SVG GRAPHIC */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full filter drop-shadow-[0_0_24px_rgba(142,155,77,0.18)]"
        >
          {/* Defs for Subtle Gradients */}
          <defs>
            <linearGradient id="bubbleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0C120D" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#070C08" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Smooth Cohesive Chat Bubble Path Outline */}
          <path
            d="M 40 45 C 40 32, 52 20, 70 20 L 130 20 C 148 20, 160 32, 160 45 L 160 115 C 160 128, 148 140, 130 140 L 105 140 L 75 165 L 80 140 L 70 140 C 52 140, 40 128, 40 115 Z"
            fill="url(#bubbleGrad)"
            stroke="#8E9B4D"
            strokeWidth="1.75"
            strokeOpacity="0.5"
            className="transition-all duration-700"
          />

          {/* Inner Accent Stroke */}
          <path
            d="M 46 49 C 46 38, 56 28, 72 28 L 128 28 C 144 28, 154 38, 154 49 L 154 111 C 154 122, 144 132, 128 132 L 101 132 L 77 152 L 81 132 L 72 132 C 56 132, 46 122, 46 111 Z"
            fill="none"
            stroke="#E9E5DF"
            strokeWidth="1"
            strokeOpacity="0.18"
          />

          {/* DYNAMIC INNER ANIMATED MODES */}

          {/* MODE 0: Animated Typing Dots Inside Chat Bubble */}
          <g className={`transition-opacity duration-700 ease-in-out ${activeStep === 0 ? 'opacity-100' : 'opacity-0'}`}>
            <circle cx="75" cy="80" r="5.5" fill="#8E9B4D" className="animate-pulse" />
            <circle cx="100" cy="80" r="5.5" fill="#E9E5DF" className="animate-pulse [animation-delay:250ms]" />
            <circle cx="125" cy="80" r="5.5" fill="#8E9B4D" className="animate-pulse [animation-delay:500ms]" />
          </g>

          {/* MODE 1: Audio Waveform Bars Pulsing Inside Chat Bubble */}
          <g className={`transition-opacity duration-700 ease-in-out ${activeStep === 1 ? 'opacity-100' : 'opacity-0'}`}>
            <line x1="68" y1="80" x2="68" y2="80" stroke="#8E9B4D" strokeWidth="3.5" strokeLinecap="round">
              <animate attributeName="y1" values="70;60;70" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="y2" values="90;100;90" dur="1.2s" repeatCount="indefinite" />
            </line>
            <line x1="84" y1="80" x2="84" y2="80" stroke="#E9E5DF" strokeWidth="3.5" strokeLinecap="round">
              <animate attributeName="y1" values="62;50;62" dur="0.9s" repeatCount="indefinite" />
              <animate attributeName="y2" values="98;110;98" dur="0.9s" repeatCount="indefinite" />
            </line>
            <line x1="100" y1="80" x2="100" y2="80" stroke="#8E9B4D" strokeWidth="3.5" strokeLinecap="round">
              <animate attributeName="y1" values="55;42;55" dur="1.4s" repeatCount="indefinite" />
              <animate attributeName="y2" values="105;118;105" dur="1.4s" repeatCount="indefinite" />
            </line>
            <line x1="116" y1="80" x2="116" y2="80" stroke="#E9E5DF" strokeWidth="3.5" strokeLinecap="round">
              <animate attributeName="y1" values="64;52;64" dur="1.0s" repeatCount="indefinite" />
              <animate attributeName="y2" values="96;108;96" dur="1.0s" repeatCount="indefinite" />
            </line>
            <line x1="132" y1="80" x2="132" y2="80" stroke="#8E9B4D" strokeWidth="3.5" strokeLinecap="round">
              <animate attributeName="y1" values="72;64;72" dur="1.3s" repeatCount="indefinite" />
              <animate attributeName="y2" values="88;96;88" dur="1.3s" repeatCount="indefinite" />
            </line>
          </g>

          {/* MODE 2: Unified Mic + Voice Waveform Combined Symbol */}
          <g className={`transition-opacity duration-700 ease-in-out ${activeStep === 2 ? 'opacity-100' : 'opacity-0'}`}>
            {/* Microphone Icon Center */}
            <rect x="92" y="62" width="16" height="26" rx="8" fill="#8E9B4D" />
            <path d="M 82 78 C 82 94, 118 94, 118 78" fill="none" stroke="#E9E5DF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="100" y1="94" x2="100" y2="104" stroke="#E9E5DF" strokeWidth="2.5" strokeLinecap="round" />
            {/* Surrounding Pulse Waves */}
            <circle cx="100" cy="80" r="32" fill="none" stroke="#8E9B4D" strokeWidth="1.5" strokeOpacity="0.4">
              <animate attributeName="r" values="28;38;28" dur="2s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>

        {/* CORNER CAPABILITY CHIPS */}
        <div className="absolute -top-1 -left-1 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#070C08] border border-[#8E9B4D]/25 shadow-sm">
          <MessageSquare className="w-3 h-3 text-[#8E9B4D]" />
          <span className="font-mono text-[10px] tracking-wider uppercase text-[#E9E5DF]/80">TEXT</span>
        </div>

        <div className="absolute -top-1 -right-1 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#070C08] border border-[#8E9B4D]/25 shadow-sm">
          <Mic className="w-3 h-3 text-[#8E9B4D]" />
          <span className="font-mono text-[10px] tracking-wider uppercase text-[#E9E5DF]/80">LISTEN</span>
        </div>

        <div className="absolute -bottom-1 -left-1 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#070C08] border border-[#8E9B4D]/25 shadow-sm">
          <Volume2 className="w-3 h-3 text-[#8E9B4D]" />
          <span className="font-mono text-[10px] tracking-wider uppercase text-[#E9E5DF]/80">SPEAK</span>
        </div>

        <div className="absolute -bottom-1 -right-1 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#070C08] border border-[#8E9B4D]/25 shadow-sm">
          <Sparkles className="w-3 h-3 text-[#8E9B4D]" />
          <span className="font-mono text-[10px] tracking-wider uppercase text-[#E9E5DF]/80">RESPOND</span>
        </div>
      </div>

      {/* BOTTOM CAPABILITY LABELS */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#8E9B4D]" />
          <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-[#E9E5DF]">
            CHAT AI
          </span>
        </div>
        
        <span className="text-[#8E9B4D] font-mono text-xs">•</span>

        <div className="flex items-center gap-2">
          <Mic className="w-4 h-4 text-[#8E9B4D]" />
          <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-[#E9E5DF]">
            VOICE AI AGENT
          </span>
        </div>
      </div>
    </div>
  );
}
