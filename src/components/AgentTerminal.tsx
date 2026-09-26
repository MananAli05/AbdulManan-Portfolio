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
  const [sequenceIndex, setSequenceIndex] = useState<number>(4);
  const [charIndex, setCharIndex] = useState<number>(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  const MAX_VISIBLE_LINES = 6;

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
          return updated.length > MAX_VISIBLE_LINES
            ? updated.slice(updated.length - MAX_VISIBLE_LINES)
            : updated;
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
          <span className="text-deeplime font-semibold">✓</span>
          {parts[1]}
        </span>
      );
    }

    if (text.includes('status: online')) {
      return (
        <span>
          status: <span className="text-deeplime font-semibold">online</span>
        </span>
      );
    }

    if (text.includes('200 OK')) {
      return (
        <span>
          api response: <span className="text-deeplime font-semibold">200 OK</span>
        </span>
      );
    }

    if (text.includes('latency:')) {
      return (
        <span>
          latency: <span className="text-ink font-medium">{text.replace('latency: ', '')}</span>
        </span>
      );
    }

    if (text.includes('ready')) {
      return (
        <span>
          {text.replace('ready', '')}
          <span className="text-deeplime font-semibold">ready</span>
        </span>
      );
    }

    return <span>{text}</span>;
  };

  return (
    <div
      aria-label="Animated AI system terminal visual"
      className="w-full bg-card border border-line rounded-[28px] shadow-[0_2px_4px_rgba(16,19,12,0.04),0_24px_48px_-20px_rgba(16,19,12,0.18)] flex flex-col overflow-hidden font-mono text-[12px] leading-[1.7] text-faint select-none"
    >
      {/* Header bar */}
      <div className="h-[52px] px-5 border-b border-line flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="relative flex w-2.5 h-2.5">
            <span className="absolute inline-flex w-full h-full rounded-full bg-lime opacity-70 animate-ping" />
            <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-lime" />
          </span>
          <span className="text-[11px] text-ink font-medium tracking-[0.04em]">
            agent_status.log
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.16em] text-faint">live</span>
      </div>

      {/* Log body */}
      <div
        ref={bodyRef}
        className="h-[196px] p-5 overflow-hidden flex flex-col justify-end gap-1.5"
      >
        {lines.map((lineItem, idx) => (
          <div key={idx} className="flex items-start gap-2 whitespace-nowrap">
            <span className="text-lime font-semibold">&gt;</span>
            <div className="truncate">{renderLineContent(lineItem)}</div>
          </div>
        ))}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-lime font-semibold">&gt;</span>
          <span>{currentLineText}</span>
          <span className="w-[7px] h-[14px] bg-deeplime animate-pulse inline-block ml-0.5" />
        </div>
      </div>
    </div>
  );
}
