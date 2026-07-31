import { useState, useEffect, useRef } from 'react';

interface TerminalLine {
  text: string;
  isSuccess?: boolean;
  statusKeyword?: string;
}

const COMMAND_SEQUENCE: TerminalLine[] = [
  { text: 'initialising agent runtime' },
  { text: 'loading model: llm-core-v2' },
  { text: 'connecting vector store' },
  { text: 'status: online', statusKeyword: 'online' },
  { text: 'retrieving context...' },
  { text: 'processing request #1042' },
  { text: 'generating response...' },
  { text: 'response streamed ✓', isSuccess: true },
  { text: 'latency: 146ms' },
  { text: 'indexing knowledge base' },
  { text: 'embeddings synced ✓', isSuccess: true },
  { text: 'listening for request...' },
  { text: 'request received #1043' },
  { text: 'routing task: rag-agent' },
  { text: 'context matched: 6 chunks', statusKeyword: '6 chunks' },
  { text: 'generating response...' },
  { text: 'response streamed ✓', isSuccess: true },
  { text: 'voice agent ready', statusKeyword: 'ready' },
  { text: 'audio stream detected' },
  { text: 'transcribing input...' },
  { text: 'intent classified ✓', isSuccess: true },
  { text: 'generating response...' },
  { text: 'voice response ready ✓', isSuccess: true },
  { text: 'latency: 184ms' },
  { text: 'workflow triggered' },
  { text: 'validating payload...' },
  { text: 'calling automation agent' },
  { text: 'task completed ✓', isSuccess: true },
  { text: 'awaiting next request...' },
  { text: 'image payload received' },
  { text: 'running vision inference' },
  { text: 'prediction complete ✓', isSuccess: true },
  { text: 'api response: 200 OK', statusKeyword: '200 OK' },
  { text: 'latency: 213ms' },
];

export default function AgentTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { text: 'initialising agent runtime' },
    { text: 'loading model: llm-core-v2' },
    { text: 'status: online', statusKeyword: 'online' },
  ]);
  const [currentLineText, setCurrentLineText] = useState<string>('');
  const [sequenceIndex, setSequenceIndex] = useState<number>(3);
  const [charIndex, setCharIndex] = useState<number>(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  const MAX_VISIBLE_LINES = 5;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setLines([
        { text: 'agent runtime initialized' },
        { text: 'status: online', statusKeyword: 'online' },
        { text: 'rag-pipeline: active', statusKeyword: 'active' },
        { text: 'llm models: loaded', statusKeyword: 'loaded' },
        { text: 'ready for requests ✓', isSuccess: true },
      ]);
      return;
    }

    const currentTarget = COMMAND_SEQUENCE[sequenceIndex % COMMAND_SEQUENCE.length];
    
    // Typewriter effect per character
    if (charIndex < currentTarget.text.length) {
      const timer = setTimeout(() => {
        setCurrentLineText(currentTarget.text.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 35 + Math.random() * 25);

      return () => clearTimeout(timer);
    } else {
      // Completed current line, pause then commit line to terminal history
      const pauseTimer = setTimeout(() => {
        setLines((prevLines) => {
          const updated = [...prevLines, currentTarget];
          return updated.length > MAX_VISIBLE_LINES ? updated.slice(updated.length - MAX_VISIBLE_LINES) : updated;
        });
        setCurrentLineText('');
        setCharIndex(0);
        setSequenceIndex((prev) => prev + 1);
      }, 900 + Math.random() * 500);

      return () => clearTimeout(pauseTimer);
    }
  }, [charIndex, sequenceIndex]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines, currentLineText]);

  const renderLineContent = (item: TerminalLine) => {
    const { text } = item;
    
    if (text.includes('✓')) {
      const parts = text.split('✓');
      return (
        <span>
          {parts[0]}
          <span className="text-[#B0C83D] font-semibold">✓</span>
          {parts[1]}
        </span>
      );
    }

    if (text.includes('status: online')) {
      return (
        <span>
          status: <span className="text-[#B0C83D] font-semibold">online</span>
        </span>
      );
    }

    if (text.includes('200 OK')) {
      return (
        <span>
          api response: <span className="text-[#B0C83D] font-semibold">200 OK</span>
        </span>
      );
    }

    if (text.includes('latency:')) {
      return (
        <span>
          latency: <span className="text-[#C8A85A]">{text.replace('latency: ', '')}</span>
        </span>
      );
    }

    if (text.includes('ready')) {
      return (
        <span>
          {text.replace('ready', '')}
          <span className="text-[#B0C83D]">ready</span>
        </span>
      );
    }

    return <span>{text}</span>;
  };

  return (
    <div
      aria-label="Animated AI System Terminal Visual"
      className="w-[235px] xl:w-[245px] h-[180px] xl:h-[190px] bg-[#0D120D] border border-[#8E9B4D]/25 rounded-xl shadow-xl hover:border-[#8E9B4D]/45 hover:shadow-[0_0_20px_rgba(142,155,77,0.12)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col overflow-hidden font-mono text-[10px] xl:text-[11px] leading-[1.5] text-[#8C9386] pointer-events-auto select-none"
    >
      {/* Top Header Bar (30px height) */}
      <div className="h-[30px] px-3 bg-[#080A08]/80 border-b border-[#46483a]/25 flex items-center justify-between shrink-0">
        {/* Three Muted Circles */}
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#5a483a]/80" />
          <div className="w-2 h-2 rounded-full bg-[#46483a]/90" />
          <div className="w-2 h-2 rounded-full bg-[#8E9B4D]/70" />
        </div>

        {/* Title */}
        <span className="text-[10px] text-[#8C9386] font-mono tracking-wide">
          agent_status.log
        </span>
      </div>

      {/* Terminal Body */}
      <div ref={bodyRef} className="flex-1 p-2.5 overflow-hidden flex flex-col justify-end gap-1">
        {/* Previous Committed Lines */}
        {lines.map((lineItem, idx) => (
          <div key={idx} className="flex items-start gap-1.5 whitespace-nowrap">
            <span className="text-[#A8B45A] font-semibold">&gt;</span>
            <div className="truncate">{renderLineContent(lineItem)}</div>
          </div>
        ))}

        {/* Currently Typing Line */}
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="text-[#A8B45A] font-semibold">&gt;</span>
          <span className="text-[#8C9386]">{currentLineText}</span>
          <span className="w-1.5 h-3 bg-[#B0C83D] animate-pulse inline-block ml-0.5" />
        </div>
      </div>
    </div>
  );
}
