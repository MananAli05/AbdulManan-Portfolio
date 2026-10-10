import { useEffect, useRef, useState, type FormEvent } from 'react';
import { prefersReducedMotion } from '../../lib/motion';

const SUGGESTIONS = [
  'What has he built?',
  'Does he do voice AI?',
  'Is he available for hire?',
];

type Status = 'idle' | 'thinking' | 'answering' | 'error';

interface Turn {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * The hero's centrepiece: a real question box wired to the same
 * /api/chat endpoint the assistant widget uses. Visitors get a genuine
 * answer about Abdul's work within seconds, which demonstrates the
 * headline rather than only asserting it.
 *
 * The readout beside it reports the actual round-trip of the last
 * request, so it is live instrumentation rather than decoration.
 */
export default function AskManan() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [shown, setShown] = useState('');
  const [latency, setLatency] = useState<number | null>(null);
  const historyRef = useRef<Turn[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reveal the reply a few characters at a time so it reads the way a
  // model streams. Reduced motion gets the whole answer at once.
  useEffect(() => {
    if (!answer) return;

    if (prefersReducedMotion()) {
      setShown(answer);
      setStatus('idle');
      return;
    }

    setShown('');
    let i = 0;
    const timer = setInterval(() => {
      i += 3;
      setShown(answer.slice(0, i));
      if (i >= answer.length) {
        clearInterval(timer);
        setStatus('idle');
      }
    }, 16);

    return () => clearInterval(timer);
  }, [answer]);

  const ask = async (text: string) => {
    const q = text.trim();
    if (!q || status === 'thinking' || status === 'answering') return;

    setQuestion(q);
    setInput('');
    setAnswer('');
    setShown('');
    setStatus('thinking');

    const messages = [...historyRef.current, { role: 'user' as const, content: q }];
    const startedAt = performance.now();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);

      const data = (await res.json()) as { reply?: string };
      const reply = data.reply?.trim();
      if (!reply) throw new Error('empty reply');

      setLatency(Math.round(performance.now() - startedAt));
      historyRef.current = [
        ...messages,
        { role: 'assistant' as const, content: reply },
      ].slice(-6);
      setStatus('answering');
      setAnswer(reply);
    } catch (err) {
      console.error('[AskManan]', err);
      setStatus('error');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void ask(input);
  };

  const reset = () => {
    setQuestion('');
    setAnswer('');
    setShown('');
    setStatus('idle');
    historyRef.current = [];
    inputRef.current?.focus();
  };

  const busy = status === 'thinking' || status === 'answering';
  const hasConversation = Boolean(question);

  const readout: [string, string][] = [
    ['model', 'gpt-oss-120b'],
    ['source', 'portfolio knowledge'],
    ['latency', latency === null ? '—' : `${latency} ms`],
    ['turns', String(Math.ceil(historyRef.current.length / 2))],
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-10 lg:gap-16 items-start">
      {/* ASK */}
      <div className="w-full max-w-[680px]">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 rounded-2xl border border-ink/15 bg-white pl-5 pr-2 py-2 transition-colors duration-300 focus-within:border-ink/45"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask my AI anything about my work…"
            aria-label="Ask Manan AI a question"
            disabled={busy}
            className="flex-1 min-w-0 bg-transparent py-3 text-[15px] md:text-[16px] text-ink placeholder-faint focus:outline-none disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            aria-label="Send question"
            className="grid place-items-center w-11 h-11 shrink-0 rounded-xl bg-ink text-white transition-all duration-300 hover:bg-[#2A3020] disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
          >
            {status === 'thinking' ? (
              <span className="block w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <svg
                className="w-[18px] h-[18px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            )}
          </button>
        </form>

        {/* Suggestions, or the live answer. Height is reserved so the
            page below does not jump when an answer arrives. */}
        <div className="mt-4 min-h-[188px]">
          {!hasConversation ? (
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => void ask(s)}
                  className="rounded-full border border-ink/12 bg-white/70 px-4 py-2 text-[13px] text-body transition-colors duration-300 hover:border-ink/40 hover:text-ink cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-ink/10 bg-white/80 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint mb-3 truncate">
                You asked · {question}
              </p>

              {status === 'error' ? (
                <p className="text-[15px] leading-[1.6] text-body">
                  My assistant could not reach the model just now.{' '}
                  <a
                    href="mailto:abdulmannan.developer@gmail.com"
                    className="text-ink underline underline-offset-4 decoration-ink/30 hover:decoration-ink"
                  >
                    Email me instead
                  </a>
                  .
                </p>
              ) : (
                <div
                  className="max-h-[104px] overflow-y-auto pr-1 scrollbar-hide"
                  style={{
                    // Soften the cut so a long answer reads as continuing
                    // rather than clipped.
                    maskImage: 'linear-gradient(to bottom, #000 76%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, #000 76%, transparent 100%)',
                  }}
                >
                  <p className="text-[15px] leading-[1.6] text-ink whitespace-pre-wrap">
                    {shown}
                    {status !== 'idle' && (
                      <span className="ml-0.5 inline-block w-[2px] h-[1.05em] translate-y-[0.18em] bg-lime animate-pulse" />
                    )}
                  </p>
                </div>
              )}

              <button
                onClick={reset}
                disabled={busy}
                className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-faint hover:text-ink transition-colors disabled:opacity-40 cursor-pointer"
              >
                Ask something else
              </button>
            </div>
          )}
        </div>
      </div>

      {/* READOUT — real instrumentation, not decoration */}
      <dl className="hidden lg:block w-[248px] pt-2 border-t border-ink/12">
        <div className="flex items-center gap-2.5 py-3 border-b border-ink/8">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inline-flex w-full h-full rounded-full bg-lime opacity-75 animate-ping" />
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-lime" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
            assistant online
          </span>
        </div>

        {readout.map(([key, value]) => (
          <div key={key} className="flex items-baseline justify-between gap-4 py-2.5 border-b border-ink/8">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{key}</dt>
            <dd className="font-mono text-[11px] text-ink truncate">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
