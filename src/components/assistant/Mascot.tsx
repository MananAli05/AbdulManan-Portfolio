import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../lib/motion';

export default function Mascot({ className = '' }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const eyesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const svg = svgRef.current;
    const eyes = eyesRef.current;
    if (!svg || !eyes) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      frame = 0;
      eyes.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
    };

    const onMove = (e: PointerEvent) => {
      const box = svg.getBoundingClientRect();
      const dx = e.clientX - (box.left + box.width / 2);
      const dy = e.clientY - (box.top + box.height * 0.5);
      const distance = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, distance / 320);
      x = (dx / distance) * 4.5 * reach;
      y = (dy / distance) * 3.4 * reach;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 120 132"
      className={`robot-mascot ${className}`}
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="mascot-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DDF870" />
          <stop offset="1" stopColor="#B4DC36" />
        </linearGradient>
      </defs>

      <g className="robot-head">
        <g className="mascot-antenna">
          <path d="M60 32V16" stroke="#8FB32C" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="60" cy="11" r="7" fill="#C8F04B" stroke="#10130C" strokeOpacity="0.55" strokeWidth="1.5" />
          <circle cx="57.6" cy="8.8" r="2" fill="#FFFFFF" opacity="0.8" />
        </g>

        <rect x="6" y="58" width="10" height="18" rx="5" fill="#8FB32C" />
        <rect x="104" y="58" width="10" height="18" rx="5" fill="#8FB32C" />

        <path
          d="M38 30h44a24 24 0 0 1 24 24v26a24 24 0 0 1-24 24h-2l10 18-28-18H38a24 24 0 0 1-24-24V54a24 24 0 0 1 24-24z"
          fill="url(#mascot-body)"
          stroke="#10130C"
          strokeOpacity="0.55"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M36 40h40" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="5" strokeLinecap="round" />

        <g ref={eyesRef} className="robot-eyes">
          <g className="robot-blink">
            <rect x="35" y="52" width="17" height="21" rx="8.5" fill="#10130C" />
            <rect x="68" y="52" width="17" height="21" rx="8.5" fill="#10130C" />
            <circle cx="47" cy="58" r="3" fill="#FFFFFF" />
            <circle cx="80" cy="58" r="3" fill="#FFFFFF" />
          </g>
          <path d="M51 84q9 6.5 18 0" stroke="#10130C" strokeWidth="3.4" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
