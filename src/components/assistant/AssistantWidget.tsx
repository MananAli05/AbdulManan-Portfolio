import { useEffect, useRef, useState } from 'react';
import {
  Bot,
  Paperclip,
  Mic,
  MicOff,
  Send,
  PhoneCall,
  Phone,
  PhoneOff,
  ChevronRight,
  X,
  ArrowLeft,
  Square,
  Trash2,
  Play,
  Pause,
  Loader2,
} from 'lucide-react';
import { RetellWebClient } from 'retell-client-js-sdk';
import Mascot from './Mascot';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  isVoiceNote?: boolean;
  voiceDuration?: string;
}

type CallStatus = 'READY' | 'CONNECTING' | 'LISTENING' | 'MANAN AI SPEAKING' | 'CALL ENDED' | 'ERROR';

const plainText = (text: string) =>
  text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[*-]\s+/gm, '• ');

const INITIAL_QUESTIONS = [
  "What AI projects has Manan built?",
  "What is Manan's experience?",
  "What technologies does Manan work with?",
];

export default function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'chat' | 'voice'>('chat');
  const [showGreeting, setShowGreeting] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const keepScrollInside = (e: WheelEvent) => {
      const scroller = (e.target as HTMLElement).closest<HTMLElement>('.overflow-y-auto');
      const room = scroller ? scroller.scrollHeight - scroller.clientHeight : 0;
      const atEdge =
        !scroller ||
        room <= 0 ||
        (e.deltaY < 0 && scroller.scrollTop <= 0) ||
        (e.deltaY > 0 && scroller.scrollTop >= room - 1);
      if (atEdge) e.preventDefault();
    };

    panel.addEventListener('wheel', keepScrollInside, { passive: false });
    return () => panel.removeEventListener('wheel', keepScrollInside);
  }, []);

  const [callStatus, setCallStatus] = useState<CallStatus>('READY');
  const [isMuted, setIsMuted] = useState(false);
  const [voiceCallError, setVoiceCallError] = useState<string | null>(null);
  const retellWebClientRef = useRef<RetellWebClient | null>(null);

  const [viewportHeight, setViewportHeight] = useState<number | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioPreviewRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) return;

    const handleResize = () => {
      if (window.visualViewport) {
        setViewportHeight(window.visualViewport.height);
      }
    };

    window.visualViewport.addEventListener('resize', handleResize);
    window.visualViewport.addEventListener('scroll', handleResize);
    handleResize();

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('scroll', handleResize);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (retellWebClientRef.current) {
        try {
          retellWebClientRef.current.stopCall();
        } catch {}
      }
    };
  }, []);

  const resetFullAssistantSession = () => {
    if (retellWebClientRef.current) {
      try {
        retellWebClientRef.current.stopCall();
      } catch {}
    }

    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
    }
    if (audioPreviewRef.current) {
      audioPreviewRef.current.pause();
      audioPreviewRef.current = null;
    }
    if (recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrl);
    }
    setIsRecording(false);
    setRecordedBlob(null);
    setRecordedAudioUrl(null);
    setRecordingTime(0);
    setIsPlayingPreview(false);

    setChatMessages([]);
    setInputText('');
    setIsTyping(false);
    setIsTranscribing(false);

    setCallStatus('READY');
    setIsMuted(false);
    setVoiceCallError(null);
    setVoiceError(null);

    setViewMode('chat');

    setIsOpen(false);
  };

  const handleOpenVoiceScreen = () => {
    if (callStatus !== 'CONNECTING' && callStatus !== 'LISTENING' && callStatus !== 'MANAN AI SPEAKING') {
      setCallStatus('READY');
      setVoiceCallError(null);
    }
    setViewMode('voice');
  };

  const handleVoiceBackToChat = () => {
    setViewMode('chat');
    if (callStatus !== 'CONNECTING' && callStatus !== 'LISTENING' && callStatus !== 'MANAN AI SPEAKING') {
      setCallStatus('READY');
      setVoiceCallError(null);
    }
  };

  useEffect(() => {
    if (viewMode === 'chat' && chatMessages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping, isTranscribing, viewMode]);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem('manan-ai-greeted') === '1';
    } catch {}
    if (seen) return;

    const show = window.setTimeout(() => {
      setShowGreeting(true);
      try {
        sessionStorage.setItem('manan-ai-greeted', '1');
      } catch {}
    }, 3500);
    const hide = window.setTimeout(() => setShowGreeting(false), 11500);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const startRetellCall = async () => {
    if (callStatus === 'CONNECTING' || callStatus === 'LISTENING' || callStatus === 'MANAN AI SPEAKING') {
      return;
    }

    setVoiceCallError(null);
    setCallStatus('CONNECTING');

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone access is not supported in this browser.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());

      const res = await fetch('/api/retell-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to create Retell call session.');
      }

      const data = (await res.json()) as {
        access_token?: string;
        call_id?: string;
        transport?: 'gateway' | 'livekit';
        ice_servers?: RTCIceServer[];
      };
      if (!data.access_token) {
        throw new Error('No access token returned by server.');
      }

      if (!retellWebClientRef.current) {
        retellWebClientRef.current = new RetellWebClient();
      }
      const client = retellWebClientRef.current;

      client.removeAllListeners?.();

      client.on('call_started', () => {
        setCallStatus('LISTENING');
        setIsMuted(false);
      });

      client.on('agent_start_talking', () => {
        setCallStatus('MANAN AI SPEAKING');
      });

      client.on('agent_stop_talking', () => {
        setCallStatus('LISTENING');
      });

      client.on('call_ended', () => {
        setCallStatus('CALL ENDED');
        setIsMuted(false);
      });

      client.on('error', (err) => {
        console.error('[Retell SDK Error]', err);
        setCallStatus('ERROR');
        setVoiceCallError("Couldn't start the voice call. Please try again.");
      });

      await client.startCall({
        accessToken: data.access_token,
        callId: data.call_id,
        transport: data.transport,
        iceServers: data.ice_servers,
      });
    } catch (err: unknown) {
      console.error('[Start Retell Call Error]', err);
      setCallStatus('ERROR');
      setVoiceCallError("Couldn't start the voice call. Please try again.");
    }
  };

  const endRetellCall = () => {
    if (retellWebClientRef.current) {
      try {
        retellWebClientRef.current.stopCall();
      } catch (err) {
        console.error('[End Retell Call Error]', err);
      }
    }
    setCallStatus('CALL ENDED');
    setIsMuted(false);
  };

  const toggleMuteRetellCall = () => {
    if (!retellWebClientRef.current) return;
    if (isMuted) {
      retellWebClientRef.current.unmute();
      setIsMuted(false);
    } else {
      retellWebClientRef.current.mute();
      setIsMuted(true);
    }
  };

  const startRecording = async () => {
    setVoiceError(null);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setVoiceError('Microphone is not supported in this browser.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      let mimeType = 'audio/webm';
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        mimeType = 'audio/webm;codecs=opus';
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        mimeType = 'audio/mp4';
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        if (audioBlob.size > 0) {
          const url = URL.createObjectURL(audioBlob);
          setRecordedBlob(audioBlob);
          setRecordedAudioUrl(url);
        } else {
          setVoiceError('Empty recording. Please try again.');
        }
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone permission denied or error:', err);
      setVoiceError('Microphone access denied or unavailable.');
    }
  };

  const stopRecording = () => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const cancelRecording = () => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
    }
    if (audioPreviewRef.current) {
      audioPreviewRef.current.pause();
      audioPreviewRef.current = null;
    }
    if (recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrl);
    }
    setIsRecording(false);
    setRecordedBlob(null);
    setRecordedAudioUrl(null);
    setRecordingTime(0);
    setIsPlayingPreview(false);
    setVoiceError(null);
  };

  const togglePreviewPlayback = () => {
    if (!recordedAudioUrl) return;
    if (!audioPreviewRef.current) {
      const audio = new Audio(recordedAudioUrl);
      audio.onended = () => setIsPlayingPreview(false);
      audioPreviewRef.current = audio;
    }
    if (isPlayingPreview) {
      audioPreviewRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      audioPreviewRef.current.play();
      setIsPlayingPreview(true);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    if (isTyping || isTranscribing) return;

    const query = textToSend || inputText.trim();
    if (!query) return;

    if (!textToSend) setInputText('');

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
    };

    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setIsTyping(true);

    try {
      const apiMessagesPayload = updatedMessages.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: apiMessagesPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`API responded with status ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || "Sorry, I couldn't respond right now. Please try again.";

      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: replyText,
        },
      ]);
    } catch (error) {
      console.error('Error sending message to /api/chat:', error);
      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: "Sorry, I couldn't respond right now. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const sendVoiceNote = async () => {
    if (!recordedBlob || isTranscribing || isTyping) return;

    setIsTranscribing(true);
    setVoiceError(null);

    const durationStr = formatTime(recordingTime);

    try {
      const formData = new FormData();
      formData.append('file', recordedBlob, 'voice_note.webm');

      const res = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to transcribe voice note.');
      }

      const data = await res.json();
      const transcript = (data.transcript || '').trim();

      if (!transcript) {
        throw new Error('Could not detect speech in the voice note.');
      }

      cancelRecording();
      setIsTranscribing(false);

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'user',
        text: transcript,
        isVoiceNote: true,
        voiceDuration: durationStr,
      };

      const updatedMessages = [...chatMessages, userMsg];
      setChatMessages(updatedMessages);
      setIsTyping(true);

      const apiMessagesPayload = updatedMessages.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      }));

      const chatRes = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: apiMessagesPayload,
        }),
      });

      if (!chatRes.ok) {
        throw new Error(`API responded with status ${chatRes.status}`);
      }

      const chatData = await chatRes.json();
      const replyText = chatData.reply || "Sorry, I couldn't respond right now. Please try again.";

      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: replyText,
        },
      ]);
    } catch (err: unknown) {
      console.error('Voice note processing error:', err);
      setVoiceError(err instanceof Error ? err.message : 'Voice note processing failed.');
    } finally {
      setIsTranscribing(false);
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-8 z-[100] max-w-full pb-[env(safe-area-inset-bottom,0px)] pr-[env(safe-area-inset-right,0px)]">
      <div
        ref={panelRef}
        data-lenis-prevent
        style={{
          maxHeight: viewportHeight && window.innerWidth < 640 ? `${viewportHeight - 140}px` : undefined,
        }}
        className={`fixed sm:absolute bottom-[118px] sm:bottom-[138px] left-3 right-3 sm:left-auto sm:right-0 w-auto sm:w-[390px] md:w-[410px] h-[min(470px,calc(100dvh-210px))] sm:h-[530px] max-h-[550px] bg-white border border-line rounded-2xl shadow-[0_24px_60px_-12px_rgba(16,19,12,0.22)] text-ink overflow-hidden transition-all duration-300 ease-out transform origin-bottom-right flex flex-col ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-3.5 sm:px-4 py-3 bg-white border-b border-line flex items-center justify-between shrink-0 min-h-[48px]">
          <div className="flex items-center gap-2 sm:gap-2.5">
            {viewMode === 'voice' ? (
              <button
                onClick={handleVoiceBackToChat}
                className="p-2 sm:p-1 rounded-md text-body hover:text-ink transition-colors cursor-pointer mr-0.5 min-w-[36px] min-h-[36px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                aria-label="Back to Text Chat"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <Bot className="w-5 h-5 text-ink shrink-0" />
            )}

            <div>
              <h2 className="font-sans font-bold text-xs sm:text-sm text-ink tracking-wide uppercase">
                MANAN AI ASSISTANT
              </h2>
              <div className="flex items-center gap-1.5 text-[11px] text-body">
                <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                <span>Online</span>
              </div>
            </div>
          </div>

          <button
            onClick={resetFullAssistantSession}
            className="p-2 sm:p-1.5 text-body hover:text-ink hover:bg-cream rounded-lg transition-colors cursor-pointer min-w-[40px] min-h-[40px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
            aria-label="Close Assistant"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {viewMode === 'chat' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-white">
            <div className="p-2.5 sm:p-3 bg-white shrink-0 border-b border-line/40">
              <button
                onClick={handleOpenVoiceScreen}
                className="w-full h-[54px] sm:h-[64px] bg-cream hover:bg-cream border border-lime/35 hover:border-lime rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-between transition-all group cursor-pointer shadow-sm min-h-[48px]"
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-lime/15 border border-lime/35 flex items-center justify-center text-deeplime group-hover:scale-105 transition-transform shrink-0">
                    <PhoneCall className="w-4 h-4 group-hover:animate-pulse" />
                  </div>

                  <div className="flex flex-col text-left">
                    <span className="font-sans font-bold text-xs sm:text-[13px] text-ink tracking-wide uppercase">
                      CALL MANAN AI
                    </span>
                    <span className="font-sans text-[10px] sm:text-[11px] text-body">
                      Start a voice conversation
                    </span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-body group-hover:text-deeplime group-hover:translate-x-1 transition-all shrink-0" />
              </button>
            </div>

            <div className="flex-1 px-3 sm:px-4 py-2 overflow-y-auto flex flex-col justify-between scrollbar-hide overscroll-contain">
              {chatMessages.length === 0 ? (
                <div className="my-auto flex flex-col items-center text-center py-2">
                  <div className="relative mb-2">
                    <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-ink" />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-lime" />
                  </div>

                  <h3 className="font-sans font-semibold text-base sm:text-lg text-ink mb-1">
                    How can I help you?
                  </h3>

                  <p className="font-sans text-xs text-body mb-4 sm:mb-5">
                    Ask about Abdul's work, projects or experience.
                  </p>

                  <div className="w-full flex flex-col divide-y divide-line border-y border-line/60 my-1">
                    {INITIAL_QUESTIONS.map((question) => (
                      <button
                        key={question}
                        disabled={isTyping || isTranscribing || isRecording}
                        onClick={() => handleSendMessage(question)}
                        className="py-2.5 px-3 text-left text-xs font-sans text-ink hover:text-deeplime hover:bg-cream transition-colors flex items-center justify-between cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                      >
                        <span className="leading-snug pr-2">{question}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-body group-hover:text-deeplime group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`max-w-[88%] sm:max-w-[85%] rounded-2xl p-3 sm:p-4 text-sm sm:text-[15px] leading-[1.6] text-ink break-words [overflow-wrap:anywhere] shadow-sm ${
                        msg.sender === 'user'
                          ? 'ml-auto bg-lime font-medium rounded-br-xs'
                          : 'mr-auto bg-cream border border-ink/10 rounded-bl-xs whitespace-pre-line'
                      }`}
                    >
                      {msg.isVoiceNote && (
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-ink/80 mb-1.5 pb-1 border-b border-ink/15">
                          <span>{msg.voiceDuration || '0:04'}</span>
                        </div>
                      )}
                      {msg.sender === 'user' ? msg.text : plainText(msg.text)}
                    </div>
                  ))}

                  {isTranscribing && (
                    <div className="mr-auto bg-cream border border-lime/25 px-4 py-2.5 rounded-2xl rounded-bl-xs text-xs flex items-center gap-2 text-deeplime">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-deeplime" />
                      <span className="text-ink">Processing voice...</span>
                    </div>
                  )}

                  {isTyping && !isTranscribing && (
                    <div className="mr-auto bg-cream border border-lime/25 px-4 py-3 rounded-2xl rounded-bl-xs text-xs flex items-center gap-1.5 text-deeplime">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-lime animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-lime animate-bounce [animation-delay:300ms]" />
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {voiceError && (
              <div className="px-3 py-1.5 bg-red-50 border-t border-red-200 text-red-700 text-[11px] flex items-center justify-between shrink-0">
                <span>{voiceError}</span>
                <button
                  onClick={() => setVoiceError(null)}
                  className="p-1 hover:text-red-900 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="p-2.5 sm:p-3 bg-white border-t border-line shrink-0">
              {isRecording ? (
                <div className="flex items-center justify-between bg-cream border border-red-900/60 rounded-xl px-3 py-2 transition-all">
                  <div className="flex items-center gap-2 text-xs text-ink">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                    </span>
                    <span className="font-mono text-red-400 font-semibold">
                      {formatTime(recordingTime)}
                    </span>
                    <span className="text-body text-[10px] sm:text-[11px] hidden xs:inline">Recording...</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={cancelRecording}
                      className="p-2 sm:p-1.5 text-body hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer min-w-[36px] min-h-[36px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                      title="Cancel Recording"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-sans font-semibold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-sm min-h-[36px]"
                      title="Stop & Preview"
                    >
                      <Square className="w-3 h-3 fill-current" />
                      <span>Done</span>
                    </button>
                  </div>
                </div>
              ) : recordedAudioUrl ? (
                <div className="flex items-center justify-between bg-cream border border-lime/40 rounded-xl px-3 py-1.5 transition-all">
                  <div className="flex items-center gap-2 min-w-0">
                    <button
                      type="button"
                      onClick={togglePreviewPlayback}
                      className="w-7 h-7 rounded-full bg-lime/20 hover:bg-lime/35 text-deeplime flex items-center justify-center transition-colors cursor-pointer shrink-0"
                      title={isPlayingPreview ? 'Pause Voice Note' : 'Play Voice Note'}
                    >
                      {isPlayingPreview ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5 ml-0.5" />
                      )}
                    </button>
                    <div className="flex flex-col truncate">
                      <span className="text-[11px] font-medium text-ink truncate">
                        Voice Note ({formatTime(recordingTime)})
                      </span>
                      <span className="text-[10px] text-body">Ready to send</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={cancelRecording}
                      disabled={isTranscribing}
                      className="p-1.5 text-body hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50 min-w-[36px] min-h-[36px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                      title="Delete Voice Note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={sendVoiceNote}
                      disabled={isTranscribing}
                      className="px-3 py-1.5 bg-lime hover:bg-[#B9D954] text-ink font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50 min-h-[36px]"
                      title="Send Voice Note"
                    >
                      {isTranscribing ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-ink" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-cream border border-line rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 focus-within:border-lime transition-colors">
                    <Paperclip className="w-4 h-4 text-body hover:text-ink transition-colors cursor-pointer shrink-0 hidden xs:block" />

                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      disabled={isTyping || isTranscribing}
                      placeholder={
                        isTranscribing
                          ? 'Transcribing audio note...'
                          : isTyping
                          ? 'Manan AI is responding...'
                          : 'Type your message...'
                      }
                      className="flex-1 min-w-0 bg-transparent text-sm sm:text-xs text-ink placeholder-faint/60 focus:outline-none py-1 disabled:opacity-60 disabled:cursor-not-allowed"
                    />

                    <button
                      type="button"
                      onClick={startRecording}
                      disabled={isTyping || isTranscribing}
                      className="p-1.5 sm:p-1 text-body hover:text-deeplime hover:bg-cream rounded-md transition-colors cursor-pointer disabled:opacity-50 shrink-0 min-w-[36px] min-h-[36px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                      aria-label="Record Voice Note"
                      title="Record Voice Note"
                    >
                      <Mic className="w-4 h-4" />
                    </button>

                    <button
                      type="submit"
                      disabled={isTyping || isTranscribing || !inputText.trim()}
                      className={`w-8 h-8 sm:w-7 sm:h-7 rounded-md bg-lime text-ink flex items-center justify-center shrink-0 shadow-sm transition-all ${
                        isTyping || isTranscribing || !inputText.trim()
                          ? 'opacity-40 cursor-not-allowed'
                          : 'hover:bg-[#B9D954] cursor-pointer'
                      }`}
                      aria-label="Send Message"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {viewMode === 'voice' && (
          <div className="flex-1 flex flex-col bg-cream text-ink overflow-hidden">
            <div className="px-3.5 sm:px-4 py-3 bg-white border-b border-line flex items-center justify-between shrink-0 min-h-[48px]">
              <button
                onClick={handleVoiceBackToChat}
                className="p-2 sm:p-1 rounded-md text-body hover:text-ink transition-colors cursor-pointer flex items-center gap-1 text-xs min-w-[40px] min-h-[40px] sm:min-w-0 sm:min-h-0 justify-center"
                aria-label="Back to Text Chat"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="flex flex-col text-center">
                <span className="font-sans font-bold text-xs tracking-wider text-ink uppercase">
                  MANAN AI
                </span>
                <span className="text-[11px] text-body">Voice Agent</span>
              </div>

              <button
                onClick={resetFullAssistantSession}
                className="p-2 sm:p-1.5 text-body hover:text-ink hover:bg-cream rounded-lg transition-colors cursor-pointer min-w-[40px] min-h-[40px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-between p-4 sm:p-6 text-center overflow-y-auto scrollbar-hide">
              <div className="relative flex items-center justify-center my-auto py-4 sm:py-8 max-h-[220px]">
                <div
                  className={`absolute rounded-full border transition-all duration-700 motion-reduce:animate-none ${
                    callStatus === 'MANAN AI SPEAKING'
                      ? 'w-32 h-32 sm:w-44 sm:h-44 border-lime animate-ping opacity-90 duration-700'
                      : callStatus === 'LISTENING'
                      ? 'w-32 h-32 sm:w-44 sm:h-44 border-lime/60 animate-ping opacity-60 duration-1000'
                      : callStatus === 'CONNECTING'
                      ? 'w-28 h-28 sm:w-40 sm:h-40 border-amber-400/50 animate-pulse opacity-70 duration-1000'
                      : callStatus === 'ERROR'
                      ? 'w-24 h-24 sm:w-36 sm:h-36 border-red-900/40 opacity-30'
                      : callStatus === 'CALL ENDED'
                      ? 'w-24 h-24 sm:w-36 sm:h-36 border-lime/20 opacity-25'
                      : 'w-32 h-32 sm:w-44 sm:h-44 border-lime/25 animate-ping opacity-40 [animation-duration:3.5s] [animation-delay:0s]'
                  }`}
                />

                <div
                  className={`absolute rounded-full border transition-all duration-500 motion-reduce:animate-none ${
                    callStatus === 'MANAN AI SPEAKING'
                      ? 'w-26 h-26 sm:w-36 sm:h-36 border-lime scale-110 opacity-100 duration-500'
                      : callStatus === 'LISTENING'
                      ? 'w-26 h-26 sm:w-36 sm:h-36 border-lime/70 scale-105 opacity-80 duration-700'
                      : callStatus === 'CONNECTING'
                      ? 'w-22 h-22 sm:w-32 sm:h-32 border-amber-400/60 animate-pulse opacity-80 duration-1000'
                      : callStatus === 'ERROR'
                      ? 'w-20 h-20 sm:w-30 sm:h-30 border-red-800/40 opacity-30'
                      : callStatus === 'CALL ENDED'
                      ? 'w-20 h-20 sm:w-30 sm:h-30 border-lime/30 opacity-30'
                      : 'w-26 h-26 sm:w-36 sm:h-36 border-lime/35 animate-ping opacity-50 [animation-duration:3.5s] [animation-delay:1.1s]'
                  }`}
                />

                <div
                  className={`absolute rounded-full border transition-all duration-300 motion-reduce:animate-none ${
                    callStatus === 'MANAN AI SPEAKING'
                      ? 'w-20 h-20 sm:w-28 sm:h-28 border-lime scale-115 opacity-100'
                      : callStatus === 'LISTENING'
                      ? 'w-20 h-20 sm:w-28 sm:h-28 border-lime/80 scale-110 opacity-90'
                      : callStatus === 'CONNECTING'
                      ? 'w-18 h-18 sm:w-26 sm:h-26 border-amber-400/70 animate-pulse'
                      : callStatus === 'ERROR'
                      ? 'w-16 h-16 sm:w-24 sm:h-24 border-red-700/50 opacity-40'
                      : callStatus === 'CALL ENDED'
                      ? 'w-16 h-16 sm:w-24 sm:h-24 border-lime/40 opacity-40'
                      : 'w-20 h-20 sm:w-28 sm:h-28 border-lime/45 animate-ping opacity-60 [animation-duration:3.5s] [animation-delay:2.2s]'
                  }`}
                />

                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cream border flex items-center justify-center text-deeplime relative z-10 transition-all duration-300 ${
                    callStatus === 'MANAN AI SPEAKING'
                      ? 'border-lime shadow-[0_0_40px_rgba(197,224,99,0.5)] scale-105 animate-pulse'
                      : callStatus === 'LISTENING'
                      ? 'border-lime/80 shadow-[0_0_25px_rgba(197,224,99,0.3)]'
                      : callStatus === 'CONNECTING'
                      ? 'border-amber-400/60 shadow-[0_0_20px_rgba(251,191,36,0.2)]'
                      : callStatus === 'ERROR'
                      ? 'border-red-800 text-red-400 shadow-none'
                      : 'border-lime/50 shadow-[0_0_30px_rgba(197,224,99,0.18)]'
                  }`}
                >
                  {callStatus === 'CONNECTING' ? (
                    <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 animate-spin" />
                  ) : (
                    <PhoneCall className="w-6 h-6 sm:w-8 sm:h-8 text-deeplime" />
                  )}
                </div>
              </div>

              <div className="text-center px-2 sm:px-4 mb-2 sm:mb-3 shrink-0">
                <h3 className="font-sans font-semibold text-base sm:text-lg text-ink tracking-tight mb-1">
                  Talk with Manan AI
                </h3>
                <p className="font-sans text-[11px] sm:text-xs text-body max-w-[270px] mx-auto leading-relaxed">
                  Have a real-time conversation about Abdul's projects, experience, skills and work.
                </p>
              </div>

              {voiceCallError && (
                <div className="w-full bg-red-50 border border-red-200 px-3 py-2 rounded-xl text-red-700 text-xs font-sans mb-3 text-center">
                  {voiceCallError}
                </div>
              )}

              <div className="w-full flex flex-col items-center gap-2 sm:gap-2.5 mt-auto shrink-0 pb-[env(safe-area-inset-bottom,0px)]">
                {callStatus === 'CONNECTING' || callStatus === 'LISTENING' || callStatus === 'MANAN AI SPEAKING' ? (
                  <div className="w-full flex items-center gap-2 sm:gap-2.5">
                    <button
                      type="button"
                      onClick={toggleMuteRetellCall}
                      className={`flex-1 h-12 rounded-xl border transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer font-medium text-xs min-h-[48px] ${
                        isMuted
                          ? 'bg-amber-950/40 border-amber-800/60 text-amber-300 hover:bg-amber-900/50'
                          : 'bg-cream border-line text-ink hover:bg-cream'
                      }`}
                    >
                      {isMuted ? (
                        <MicOff className="w-4 h-4 text-amber-300" />
                      ) : (
                        <Mic className="w-4 h-4 text-deeplime" />
                      )}
                      <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={endRetellCall}
                      className="flex-1 h-12 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(220,38,38,0.25)] active:scale-[0.99] min-h-[48px]"
                    >
                      <PhoneOff className="w-4 h-4" />
                      <span>End Call</span>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={startRetellCall}
                    className="w-full h-12 bg-lime hover:bg-[#B9D954] text-ink font-bold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_4px_20px_rgba(197,224,99,0.25)] hover:shadow-[0_6px_25px_rgba(197,224,99,0.35)] active:scale-[0.99] min-h-[48px]"
                  >
                    <Phone className="w-4 h-4 fill-current" />
                    <span>Start Voice Call</span>
                  </button>
                )}

                <span className="text-[10px] sm:text-[11px] text-body text-center font-sans tracking-tight">
                  Microphone access is required for voice conversations.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative flex items-end justify-end">
        {!isOpen && (
          <div
            role="status"
            className={`absolute right-[calc(100%+6px)] bottom-8 sm:bottom-10 origin-bottom-right transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showGreeting ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
            }`}
          >
            <div className="relative w-max max-w-[210px] rounded-[18px] rounded-br-[6px] bg-cream text-ink border border-ink/10 pl-4 pr-9 py-3 text-[13px] leading-[1.4] shadow-[0_18px_40px_-14px_rgba(16,19,12,0.55)]">
              <span className="block font-medium">Hi, I'm Manan's AI.</span>
              <span className="block text-body">Ask me about his work.</span>
              <button
                type="button"
                onClick={() => setShowGreeting(false)}
                aria-label="Dismiss"
                className="absolute top-2 right-2 grid place-items-center w-5 h-5 rounded-full text-body hover:text-ink cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            setShowGreeting(false);
            setIsOpen(!isOpen);
          }}
          className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
          aria-label={isOpen ? 'Close Manan AI assistant' : 'Open Manan AI assistant: chat or voice call'}
          aria-expanded={isOpen}
        >
          <span className="relative block w-[68px] h-[75px] sm:w-[88px] sm:h-[97px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:scale-105">
            <Mascot className="w-full h-full drop-shadow-[0_14px_18px_rgba(16,19,12,0.28)]" />
            <span className="absolute top-1 right-0 flex w-3 h-3">
              <span className="absolute inline-flex w-full h-full rounded-full bg-lime opacity-70 animate-ping" />
              <span className="relative inline-flex w-3 h-3 rounded-full bg-lime border-2 border-night" />
            </span>
          </span>

          <span className="-mt-2 relative inline-flex items-center h-6 px-2.5 rounded-full bg-night border border-white/20 text-bone font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.14em] whitespace-nowrap shadow-[0_8px_18px_-8px_rgba(16,19,12,0.6)] transition-colors duration-300 group-hover:bg-lime group-hover:text-ink">
            {isOpen ? 'Close' : 'Ask my AI'}
          </span>
        </button>
      </div>
    </div>
  );
}
