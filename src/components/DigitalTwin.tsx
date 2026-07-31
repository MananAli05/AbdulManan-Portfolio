import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import GlassCard from './GlassCard';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

export default function DigitalTwin() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Greetings. I am Abdul's digital synthetic agent. I can discuss his expertise in LLMs, walk you through the Sage & Salt architecture, or schedule a call. How can I assist you today?"
    },
    {
      id: '2',
      sender: 'user',
      text: 'Tell me about the Voice AI project.'
    },
    {
      id: '3',
      sender: 'bot',
      text: 'The Voice AI project focused on creating a low-latency healthcare companion. We optimized the inference pipeline to under 200ms using a quantized Whisper model and integrated ElevenLabs for natural-sounding voice output.'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    
    setTimeout(() => {
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        sender: 'bot', 
        text: 'Processing request... [Response hidden in preview]'
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <section className="py-40 px-6 md:px-12 bg-surface-container">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
        <div className="md:col-span-4">
          <span className="font-label-md text-primary uppercase tracking-widest mb-4 block text-sm">04 // AI AGENT</span>
          <h2 className="font-headline-lg text-[48px] mb-6">MY DIGITAL TWIN.</h2>
          <p className="text-on-surface-variant mb-8">Interact with an AI assistant trained on my technical background, projects, and engineering philosophy.</p>
          
          <div className="p-6 bg-surface-container-high border border-outline-variant/30 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">graphic_eq</span>
              </div>
              <span className="font-label-sm uppercase tracking-wider text-xs">Voice Analysis Active</span>
            </div>
            <div className="h-8 flex items-center justify-between gap-1">
              {[1, 0.8, 1.2, 0.6, 1.1, 0.9, 0.7, 1].map((delay, i) => (
                <div 
                  key={i} 
                  className={`w-1 bg-primary ${i%2===0 ? 'h-4' : 'h-8'}`} 
                  style={{ animation: `pulse ${delay}s infinite` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="md:col-span-8">
          <GlassCard className="h-[600px] flex flex-col rounded-lg">
            <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface/50 rounded-t-[inherit]">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="font-mono text-sm tracking-widest uppercase text-xs">Assistant v4.2_ONLINE</span>
              </div>
              <span className="font-mono text-[10px] text-on-surface-variant/50 uppercase">LATENCY: 14ms</span>
            </div>
            
            <div ref={chatContainerRef} className="flex-1 p-8 overflow-y-auto space-y-6 scrollbar-hide">
              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-4 max-w-[80%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${msg.sender === 'user' ? 'bg-surface-variant text-on-surface' : 'bg-primary text-on-primary'}`}>
                    {msg.sender === 'user' ? 'USR' : 'AM'}
                  </div>
                  <div className={`p-4 text-sm leading-relaxed rounded-sm ${msg.sender === 'user' ? 'bg-primary/10 border border-primary/20' : 'bg-surface-variant'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 border-t border-outline-variant/20 rounded-b-[inherit]">
              <div className="flex gap-3 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                <button onClick={() => setInputValue('WHAT IS YOUR TECH STACK?')} className="whitespace-nowrap px-4 py-2 bg-surface-variant hover:bg-primary hover:text-on-primary transition-colors text-[11px] font-mono rounded-sm">WHAT IS YOUR TECH STACK?</button>
                <button onClick={() => setInputValue('SHOW ME CASE STUDIES')} className="whitespace-nowrap px-4 py-2 bg-surface-variant hover:bg-primary hover:text-on-primary transition-colors text-[11px] font-mono rounded-sm">SHOW ME CASE STUDIES</button>
                <button onClick={() => setInputValue('CONTACT ABDUL')} className="whitespace-nowrap px-4 py-2 bg-surface-variant hover:bg-primary hover:text-on-primary transition-colors text-[11px] font-mono rounded-sm">CONTACT ABDUL</button>
              </div>
              <div className="relative">
                <input 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-surface-container-high border-outline-variant/30 border p-4 font-mono text-sm focus:border-primary focus:ring-0 rounded-sm focus:outline-none" 
                  placeholder="Query the digital twin..." 
                  type="text"
                />
                <button onClick={handleSend} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
