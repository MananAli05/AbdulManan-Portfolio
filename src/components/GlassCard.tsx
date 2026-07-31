import { ReactNode, MouseEvent, useRef } from 'react';

export default function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / cardRef.current.clientWidth) * 100;
    const y = ((e.clientY - rect.top) / cardRef.current.clientHeight) * 100;
    cardRef.current.style.setProperty('--x', `${x}%`);
    cardRef.current.style.setProperty('--y', `${y}%`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`glass-card relative ${className}`}
    >
      <div 
        className="absolute inset-0 pointer-events-none rounded-[inherit]" 
        style={{ 
          background: 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(142, 155, 77, 0.08) 0%, transparent 50%)' 
        }} 
      />
      {children}
    </div>
  );
}
