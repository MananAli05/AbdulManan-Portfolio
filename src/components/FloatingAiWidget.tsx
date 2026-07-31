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

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  isVoiceNote?: boolean;
  voiceDuration?: string;
}

type CallStatus = 'READY' | 'CONNECTING' | 'LISTENING' | 'MANAN AI SPEAKING' | 'CALL ENDED' | 'ERROR';

const INITIAL_QUESTIONS = [
  "What AI projects has Abdul built?",
  "What is Abdul's experience?",
  "What technologies does Abdul work with?",
];

export default function FloatingAiWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'chat' | 'voice'>('chat');
  const [buttonMode, setButtonMode] = useState<'chat' | 'voice'>('chat');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Retell Voice Agent states & refs
  const [callStatus, setCallStatus] = useState<CallStatus>('READY');
  const [isMuted, setIsMuted] = useState(false);
  const [voiceCallError, setVoiceCallError] = useState<string | null>(null);
  const retellWebClientRef = useRef<RetellWebClient | null>(null);

  // Responsive visualViewport height tracking for mobile browsers & virtual keyboards
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);

  // Voice recording states (Text Chat voice notes)
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  // Voice refs (Text Chat voice notes)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioPreviewRef = useRef<HTMLAudioElement | null>(null);

  // Track window visualViewport for responsive mobile keyboard & browser chrome adjustments
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

  // Clean up Retell call on component unmount
  useEffect(() => {
    return () => {
      if (retellWebClientRef.current) {
        try {
          retellWebClientRef.current.stopCall();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  // Complete Assistant Session Reset (When top-right X is clicked)
  const resetFullAssistantSession = () => {
    // 1. End active Retell call & release resources
    if (retellWebClientRef.current) {
      try {
        retellWebClientRef.current.stopCall();
      } catch (e) {
        // ignore
      }
    }

    // 2. Clear voice note recording / preview state
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        // ignore
      }
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

    // 3. Clear chatbot messages, inputs, and indicators
    setChatMessages([]);
    setInputText('');
    setIsTyping(false);
    setIsTranscribing(false);

    // 4. Reset voice call status & errors
    setCallStatus('READY');
    setIsMuted(false);
    setVoiceCallError(null);
    setVoiceError(null);

    // 5. Reset navigation view to default chat
    setViewMode('chat');

    // 6. Close widget
    setIsOpen(false);
  };

  // Handle opening the Voice screen
  const handleOpenVoiceScreen = () => {
    if (callStatus !== 'CONNECTING' && callStatus !== 'LISTENING' && callStatus !== 'MANAN AI SPEAKING') {
      setCallStatus('READY');
      setVoiceCallError(null);
    }
    setViewMode('voice');
  };

  // Handle returning from Voice screen to Chat
  const handleVoiceBackToChat = () => {
    setViewMode('chat');
    if (callStatus !== 'CONNECTING' && callStatus !== 'LISTENING' && callStatus !== 'MANAN AI SPEAKING') {
      setCallStatus('READY');
      setVoiceCallError(null);
    }
  };

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (viewMode === 'chat' && chatMessages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping, isTranscribing, viewMode]);

  // Cycling icon state on the floating button when closed
  useEffect(() => {
    if (isOpen) return;
    const interval = setInterval(() => {
      setButtonMode((prev) => (prev === 'chat' ? 'voice' : 'chat'));
    }, 3500);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Format seconds to M:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Start Retell AI Web Call
  const startRetellCall = async () => {
    if (callStatus === 'CONNECTING' || callStatus === 'LISTENING' || callStatus === 'MANAN AI SPEAKING') {
      return;
    }

    setVoiceCallError(null);
    setCallStatus('CONNECTING');

    try {
      // 1. Request microphone permission
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone access is not supported in this browser.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());

      // 2. Fetch web call access token from server-side endpoint
      const res = await fetch('/api/retell-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to create Retell call session.');
      }

      const data = (await res.json()) as { access_token?: string };
      if (!data.access_token) {
        throw new Error('No access token returned by server.');
      }

      // 3. Initialize RetellWebClient SDK
      if (!retellWebClientRef.current) {
        retellWebClientRef.current = new RetellWebClient();
      }
      const client = retellWebClientRef.current;

      // Unsubscribe previous handlers to prevent duplicates
      client.removeAllListeners?.();

      // Register event listeners
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

      // 4. Start browser web call
      await client.startCall({
        accessToken: data.access_token,
      });
    } catch (err: unknown) {
      console.error('[Start Retell Call Error]', err);
      setCallStatus('ERROR');
      setVoiceCallError("Couldn't start the voice call. Please try again.");
    }
  };

  // End Retell Call
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

  // Toggle Mute / Unmute Retell Call
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

  // Start microphone recording for text chat voice note
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

  // Stop recording and create preview
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

  // Cancel recording or discard preview
  const cancelRecording = () => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        // ignore
      }
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

  // Toggle play/pause for recorded audio preview
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

  // Handle text message submission
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

  // Upload recorded audio note for transcription and pass to chat
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

      // Cleanup preview state before sending transcript to chat
      cancelRecording();
      setIsTranscribing(false);

      // Submit user voice note transcript to chat flow
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
      {/* FLOATING ASSISTANT POPUP PANEL */}
      <div
        style={{
          maxHeight: viewportHeight && window.innerWidth < 640 ? `${viewportHeight - 20}px` : undefined,
        }}
        className={`fixed sm:absolute bottom-3 sm:bottom-[84px] left-3 right-3 sm:left-auto sm:right-0 w-auto sm:w-[390px] md:w-[410px] h-[calc(100dvh-78px)] sm:h-[530px] max-h-[550px] bg-[#0A0D0A] border border-[#252A20] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-[#E9E5DF] overflow-hidden transition-all duration-300 ease-out transform origin-bottom-right flex flex-col ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
        {/* COMPACT CLEAN HEADER */}
        <div className="px-3.5 sm:px-4 py-3 bg-[#0A0D0A] border-b border-[#252A20] flex items-center justify-between shrink-0 min-h-[48px]">
          <div className="flex items-center gap-2 sm:gap-2.5">
            {viewMode === 'voice' ? (
              <button
                onClick={handleVoiceBackToChat}
                className="p-2 sm:p-1 rounded-md text-[#8F9389] hover:text-[#E9E5DF] transition-colors cursor-pointer mr-0.5 min-w-[36px] min-h-[36px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                aria-label="Back to Text Chat"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <Bot className="w-5 h-5 text-[#E9E5DF] shrink-0" />
            )}

            <div>
              <h2 className="font-sans font-bold text-xs sm:text-sm text-[#E9E5DF] tracking-wide uppercase">
                MANAN AI ASSISTANT
              </h2>
              <div className="flex items-center gap-1.5 text-[11px] text-[#8F9389]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8E9B4D] animate-pulse" />
                <span>Online</span>
              </div>
            </div>
          </div>

          {/* TOP RIGHT MAIN CLOSE BUTTON (FULL SESSION RESET) */}
          <button
            onClick={resetFullAssistantSession}
            className="p-2 sm:p-1.5 text-[#8F9389] hover:text-[#E9E5DF] hover:bg-[#151915] rounded-lg transition-colors cursor-pointer min-w-[40px] min-h-[40px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
            aria-label="Close Assistant"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* CHATBOT VIEW */}
        {viewMode === 'chat' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-[#0A0D0A]">
            {/* CALL MANAN AI TOP ENTRY BOX */}
            <div className="p-2.5 sm:p-3 bg-[#0A0D0A] shrink-0 border-b border-[#252A20]/40">
              <button
                onClick={handleOpenVoiceScreen}
                className="w-full h-[54px] sm:h-[64px] bg-[#101411] hover:bg-[#141B15] border border-[#8E9B4D]/35 hover:border-[#8E9B4D] rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-between transition-all group cursor-pointer shadow-sm min-h-[48px]"
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#8E9B4D]/15 border border-[#8E9B4D]/35 flex items-center justify-center text-[#8E9B4D] group-hover:scale-105 transition-transform shrink-0">
                    <PhoneCall className="w-4 h-4 group-hover:animate-pulse" />
                  </div>

                  <div className="flex flex-col text-left">
                    <span className="font-sans font-bold text-xs sm:text-[13px] text-[#E9E5DF] tracking-wide uppercase">
                      CALL MANAN AI
                    </span>
                    <span className="font-sans text-[10px] sm:text-[11px] text-[#8F9389]">
                      Start a voice conversation
                    </span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-[#8F9389] group-hover:text-[#8E9B4D] group-hover:translate-x-1 transition-all shrink-0" />
              </button>
            </div>

            {/* SCROLLABLE CHAT CONTENT AREA */}
            <div className="flex-1 px-3 sm:px-4 py-2 overflow-y-auto flex flex-col justify-between scrollbar-hide overscroll-contain">
              {/* INITIAL HOME STATE (Hides when conversation starts) */}
              {chatMessages.length === 0 ? (
                <div className="my-auto flex flex-col items-center text-center py-2">
                  <div className="relative mb-2">
                    <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-[#E9E5DF]" />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#8E9B4D]" />
                  </div>

                  <h3 className="font-sans font-semibold text-base sm:text-lg text-[#E9E5DF] mb-1">
                    How can I help you?
                  </h3>

                  <p className="font-sans text-xs text-[#8F9389] mb-4 sm:mb-5">
                    Ask about Abdul's work, projects or experience.
                  </p>

                  {/* 3 SHORT CLICKABLE QUESTION ROWS */}
                  <div className="w-full flex flex-col divide-y divide-[#252A20]/60 border-y border-[#252A20]/60 my-1">
                    {INITIAL_QUESTIONS.map((question) => (
                      <button
                        key={question}
                        disabled={isTyping || isTranscribing || isRecording}
                        onClick={() => handleSendMessage(question)}
                        className="py-2.5 px-3 text-left text-xs font-sans text-[#E9E5DF] hover:text-[#8E9B4D] hover:bg-[#121612] transition-colors flex items-center justify-between cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                      >
                        <span className="leading-snug pr-2">{question}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#8F9389] group-hover:text-[#8E9B4D] group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* CONVERSATION MESSAGES LIST */
                <div className="flex flex-col gap-3">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        lineHeight: '1.6',
                        letterSpacing: '0',
                        textRendering: 'optimizeLegibility',
                      }}
                      className={`max-w-[88%] sm:max-w-[85%] rounded-2xl transition-all p-3 sm:p-4 text-sm sm:text-[15px] break-words [overflow-wrap:anywhere] ${
                        msg.sender === 'user'
                          ? 'ml-auto bg-[#8E9B4D] text-[#000000] font-medium rounded-br-xs shadow-sm'
                          : 'mr-auto bg-[#111511] border border-[#8E9B4D]/25 text-[#FFFFFF] font-normal rounded-bl-xs shadow-sm'
                      }`}
                    >
                      <span
                        style={{
                          fontFamily: 'Arial, Helvetica, sans-serif',
                          fontWeight: msg.sender === 'user' ? 500 : 400,
                          lineHeight: '1.6',
                          letterSpacing: '0',
                          color: msg.sender === 'user' ? '#000000' : '#FFFFFF',
                          display: 'block',
                        }}
                      >
                        {msg.isVoiceNote && (
                          <div className="flex items-center gap-1.5 text-[11px] font-sans font-semibold text-[#000000]/80 mb-1.5 pb-1 border-b border-[#000000]/15">
                            <span>{msg.voiceDuration || '0:04'}</span>
                          </div>
                        )}
                        {msg.text}
                      </span>
                    </div>
                  ))}

                  {/* Transcribing Indicator */}
                  {isTranscribing && (
                    <div className="mr-auto bg-[#111511] border border-[#8E9B4D]/25 px-4 py-2.5 rounded-2xl rounded-bl-xs text-xs flex items-center gap-2 text-[#8E9B4D]">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#8E9B4D]" />
                      <span className="text-[#E9E5DF]">Processing voice...</span>
                    </div>
                  )}

                  {/* Typing Indicator */}
                  {isTyping && !isTranscribing && (
                    <div className="mr-auto bg-[#111511] border border-[#8E9B4D]/25 px-4 py-3 rounded-2xl rounded-bl-xs text-xs flex items-center gap-1.5 text-[#8E9B4D]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8E9B4D] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8E9B4D] animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8E9B4D] animate-bounce [animation-delay:300ms]" />
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* ERROR ALERTS */}
            {voiceError && (
              <div className="px-3 py-1.5 bg-red-950/40 border-t border-red-800/40 text-red-300 text-[11px] flex items-center justify-between shrink-0">
                <span>{voiceError}</span>
                <button
                  onClick={() => setVoiceError(null)}
                  className="p-1 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* PERMANENT BOTTOM COMPOSER BAR */}
            <div className="p-2.5 sm:p-3 bg-[#0A0D0A] border-t border-[#252A20] shrink-0">
              {/* STATE 1: ACTIVE RECORDING */}
              {isRecording ? (
                <div className="flex items-center justify-between bg-[#141814] border border-red-900/60 rounded-xl px-3 py-2 transition-all">
                  <div className="flex items-center gap-2 text-xs text-[#E9E5DF]">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                    </span>
                    <span className="font-mono text-red-400 font-semibold">
                      {formatTime(recordingTime)}
                    </span>
                    <span className="text-[#8F9389] text-[10px] sm:text-[11px] hidden xs:inline">Recording...</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={cancelRecording}
                      className="p-2 sm:p-1.5 text-[#8F9389] hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer min-w-[36px] min-h-[36px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
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
                /* STATE 2: VOICE NOTE PREVIEW BEFORE SENDING */
                <div className="flex items-center justify-between bg-[#121613] border border-[#8E9B4D]/40 rounded-xl px-3 py-1.5 transition-all">
                  <div className="flex items-center gap-2 min-w-0">
                    <button
                      type="button"
                      onClick={togglePreviewPlayback}
                      className="w-7 h-7 rounded-full bg-[#8E9B4D]/20 hover:bg-[#8E9B4D]/35 text-[#8E9B4D] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                      title={isPlayingPreview ? 'Pause Voice Note' : 'Play Voice Note'}
                    >
                      {isPlayingPreview ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5 ml-0.5" />
                      )}
                    </button>
                    <div className="flex flex-col truncate">
                      <span className="text-[11px] font-medium text-[#E9E5DF] truncate">
                        Voice Note ({formatTime(recordingTime)})
                      </span>
                      <span className="text-[10px] text-[#8F9389]">Ready to send</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={cancelRecording}
                      disabled={isTranscribing}
                      className="p-1.5 text-[#8F9389] hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer disabled:opacity-50 min-w-[36px] min-h-[36px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                      title="Delete Voice Note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={sendVoiceNote}
                      disabled={isTranscribing}
                      className="px-3 py-1.5 bg-[#8E9B4D] hover:bg-[#9ba957] text-[#0A0D0A] font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50 min-h-[36px]"
                      title="Send Voice Note"
                    >
                      {isTranscribing ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0A0D0A]" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* STATE 3: DEFAULT TEXT & MICROPHONE COMPOSER */
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-[#101310] border border-[#252A20] rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 focus-within:border-[#8E9B4D] transition-colors">
                    <Paperclip className="w-4 h-4 text-[#8F9389] hover:text-[#E9E5DF] transition-colors cursor-pointer shrink-0 hidden xs:block" />

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
                      className="flex-1 min-w-0 bg-transparent text-sm sm:text-xs text-[#E9E5DF] placeholder-[#8F9389]/60 focus:outline-none py-1 disabled:opacity-60 disabled:cursor-not-allowed"
                    />

                    {/* MICROPHONE BUTTON */}
                    <button
                      type="button"
                      onClick={startRecording}
                      disabled={isTyping || isTranscribing}
                      className="p-1.5 sm:p-1 text-[#8F9389] hover:text-[#8E9B4D] hover:bg-[#181d18] rounded-md transition-colors cursor-pointer disabled:opacity-50 shrink-0 min-w-[36px] min-h-[36px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                      aria-label="Record Voice Note"
                      title="Record Voice Note"
                    >
                      <Mic className="w-4 h-4" />
                    </button>

                    {/* SEND BUTTON */}
                    <button
                      type="submit"
                      disabled={isTyping || isTranscribing || !inputText.trim()}
                      className={`w-8 h-8 sm:w-7 sm:h-7 rounded-md bg-[#8E9B4D] text-[#0A0D0A] flex items-center justify-center shrink-0 shadow-sm transition-all ${
                        isTyping || isTranscribing || !inputText.trim()
                          ? 'opacity-40 cursor-not-allowed'
                          : 'hover:bg-[#9ba957] cursor-pointer'
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

        {/* ================================================== */}
        {/* VOICE AGENT FULL CALL VIEW (RETELL AI INTEGRATION) */}
        {/* ================================================== */}
        {viewMode === 'voice' && (
          <div className="flex-1 flex flex-col bg-[#070A07] text-[#E9E5DF] overflow-hidden">
            {/* HEADER */}
            <div className="px-3.5 sm:px-4 py-3 bg-[#0A0D0A] border-b border-[#252A20] flex items-center justify-between shrink-0 min-h-[48px]">
              <button
                onClick={handleVoiceBackToChat}
                className="p-2 sm:p-1 rounded-md text-[#8F9389] hover:text-[#E9E5DF] transition-colors cursor-pointer flex items-center gap-1 text-xs min-w-[40px] min-h-[40px] sm:min-w-0 sm:min-h-0 justify-center"
                aria-label="Back to Text Chat"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="flex flex-col text-center">
                <span className="font-sans font-bold text-xs tracking-wider text-[#E9E5DF] uppercase">
                  MANAN AI
                </span>
                <span className="text-[11px] text-[#8F9389]">Voice Agent</span>
              </div>

              <button
                onClick={resetFullAssistantSession}
                className="p-2 sm:p-1.5 text-[#8F9389] hover:text-[#E9E5DF] hover:bg-[#151915] rounded-lg transition-colors cursor-pointer min-w-[40px] min-h-[40px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* MAIN CALL CONTENT AREA */}
            <div className="flex-1 flex flex-col items-center justify-between p-4 sm:p-6 text-center overflow-y-auto scrollbar-hide">
              {/* CENTER AVATAR WITH 3 DYNAMIC RIPPLE RINGS */}
              <div className="relative flex items-center justify-center my-auto py-4 sm:py-8 max-h-[220px]">
                {/* Outermost Ring (Ring 1) */}
                <div
                  className={`absolute rounded-full border transition-all duration-700 motion-reduce:animate-none ${
                    callStatus === 'MANAN AI SPEAKING'
                      ? 'w-32 h-32 sm:w-44 sm:h-44 border-[#8E9B4D] animate-ping opacity-90 duration-700'
                      : callStatus === 'LISTENING'
                      ? 'w-32 h-32 sm:w-44 sm:h-44 border-[#8E9B4D]/60 animate-ping opacity-60 duration-1000'
                      : callStatus === 'CONNECTING'
                      ? 'w-28 h-28 sm:w-40 sm:h-40 border-amber-400/50 animate-pulse opacity-70 duration-1000'
                      : callStatus === 'ERROR'
                      ? 'w-24 h-24 sm:w-36 sm:h-36 border-red-900/40 opacity-30'
                      : callStatus === 'CALL ENDED'
                      ? 'w-24 h-24 sm:w-36 sm:h-36 border-[#8E9B4D]/20 opacity-25'
                      : 'w-32 h-32 sm:w-44 sm:h-44 border-[#8E9B4D]/25 animate-ping opacity-40 [animation-duration:3.5s] [animation-delay:0s]'
                  }`}
                />

                {/* Middle Ring (Ring 2) */}
                <div
                  className={`absolute rounded-full border transition-all duration-500 motion-reduce:animate-none ${
                    callStatus === 'MANAN AI SPEAKING'
                      ? 'w-26 h-26 sm:w-36 sm:h-36 border-[#8E9B4D] scale-110 opacity-100 duration-500'
                      : callStatus === 'LISTENING'
                      ? 'w-26 h-26 sm:w-36 sm:h-36 border-[#8E9B4D]/70 scale-105 opacity-80 duration-700'
                      : callStatus === 'CONNECTING'
                      ? 'w-22 h-22 sm:w-32 sm:h-32 border-amber-400/60 animate-pulse opacity-80 duration-1000'
                      : callStatus === 'ERROR'
                      ? 'w-20 h-20 sm:w-30 sm:h-30 border-red-800/40 opacity-30'
                      : callStatus === 'CALL ENDED'
                      ? 'w-20 h-20 sm:w-30 sm:h-30 border-[#8E9B4D]/30 opacity-30'
                      : 'w-26 h-26 sm:w-36 sm:h-36 border-[#8E9B4D]/35 animate-ping opacity-50 [animation-duration:3.5s] [animation-delay:1.1s]'
                  }`}
                />

                {/* Innermost Ring (Ring 3) */}
                <div
                  className={`absolute rounded-full border transition-all duration-300 motion-reduce:animate-none ${
                    callStatus === 'MANAN AI SPEAKING'
                      ? 'w-20 h-20 sm:w-28 sm:h-28 border-[#8E9B4D] scale-115 opacity-100'
                      : callStatus === 'LISTENING'
                      ? 'w-20 h-20 sm:w-28 sm:h-28 border-[#8E9B4D]/80 scale-110 opacity-90'
                      : callStatus === 'CONNECTING'
                      ? 'w-18 h-18 sm:w-26 sm:h-26 border-amber-400/70 animate-pulse'
                      : callStatus === 'ERROR'
                      ? 'w-16 h-16 sm:w-24 sm:h-24 border-red-700/50 opacity-40'
                      : callStatus === 'CALL ENDED'
                      ? 'w-16 h-16 sm:w-24 sm:h-24 border-[#8E9B4D]/40 opacity-40'
                      : 'w-20 h-20 sm:w-28 sm:h-28 border-[#8E9B4D]/45 animate-ping opacity-60 [animation-duration:3.5s] [animation-delay:2.2s]'
                  }`}
                />

                {/* Central Avatar Icon Container */}
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#101411] border flex items-center justify-center text-[#8E9B4D] relative z-10 transition-all duration-300 ${
                    callStatus === 'MANAN AI SPEAKING'
                      ? 'border-[#8E9B4D] shadow-[0_0_40px_rgba(142,155,77,0.5)] scale-105 animate-pulse'
                      : callStatus === 'LISTENING'
                      ? 'border-[#8E9B4D]/80 shadow-[0_0_25px_rgba(142,155,77,0.3)]'
                      : callStatus === 'CONNECTING'
                      ? 'border-amber-400/60 shadow-[0_0_20px_rgba(251,191,36,0.2)]'
                      : callStatus === 'ERROR'
                      ? 'border-red-800 text-red-400 shadow-none'
                      : 'border-[#8E9B4D]/50 shadow-[0_0_30px_rgba(142,155,77,0.18)]'
                  }`}
                >
                  {callStatus === 'CONNECTING' ? (
                    <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 animate-spin" />
                  ) : (
                    <PhoneCall className="w-6 h-6 sm:w-8 sm:h-8 text-[#8E9B4D]" />
                  )}
                </div>
              </div>

              {/* HEADING AND DESCRIPTION */}
              <div className="text-center px-2 sm:px-4 mb-2 sm:mb-3 shrink-0">
                <h3 className="font-sans font-semibold text-base sm:text-lg text-[#E9E5DF] tracking-tight mb-1">
                  Talk with Manan AI
                </h3>
                <p className="font-sans text-[11px] sm:text-xs text-[#8F9389] max-w-[270px] mx-auto leading-relaxed">
                  Have a real-time conversation about Abdul's projects, experience, skills and work.
                </p>
              </div>

              {/* USER-FRIENDLY ERROR BANNER */}
              {voiceCallError && (
                <div className="w-full bg-red-950/40 border border-red-800/40 px-3 py-2 rounded-xl text-red-300 text-xs font-sans mb-3 text-center">
                  {voiceCallError}
                </div>
              )}

              {/* ACTIVE RETELL CALL CONTROLS AND FOOTER NOTE */}
              <div className="w-full flex flex-col items-center gap-2 sm:gap-2.5 mt-auto shrink-0 pb-[env(safe-area-inset-bottom,0px)]">
                {callStatus === 'CONNECTING' || callStatus === 'LISTENING' || callStatus === 'MANAN AI SPEAKING' ? (
                  <div className="w-full flex items-center gap-2 sm:gap-2.5">
                    {/* MUTE / UNMUTE BUTTON */}
                    <button
                      type="button"
                      onClick={toggleMuteRetellCall}
                      className={`flex-1 h-12 rounded-xl border transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer font-medium text-xs min-h-[48px] ${
                        isMuted
                          ? 'bg-amber-950/40 border-amber-800/60 text-amber-300 hover:bg-amber-900/50'
                          : 'bg-[#121613] border-[#252A20] text-[#E9E5DF] hover:bg-[#181d18]'
                      }`}
                    >
                      {isMuted ? (
                        <MicOff className="w-4 h-4 text-amber-300" />
                      ) : (
                        <Mic className="w-4 h-4 text-[#8E9B4D]" />
                      )}
                      <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                    </button>

                    {/* END CALL BUTTON */}
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
                  /* START VOICE CALL BUTTON */
                  <button
                    type="button"
                    onClick={startRetellCall}
                    className="w-full h-12 bg-[#8E9B4D] hover:bg-[#9ba957] text-[#0A0D0A] font-bold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_4px_20px_rgba(142,155,77,0.25)] hover:shadow-[0_6px_25px_rgba(142,155,77,0.35)] active:scale-[0.99] min-h-[48px]"
                  >
                    <Phone className="w-4 h-4 fill-current" />
                    <span>Start Voice Call</span>
                  </button>
                )}

                <span className="text-[10px] sm:text-[11px] text-[#8F9389] text-center font-sans tracking-tight">
                  Microphone access is required for voice conversations.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FLOATING TRIGGER BUTTON (BOTTOM RIGHT) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-[#0A0D0A] border border-[#8E9B4D]/50 text-[#E9E5DF] hover:border-[#8E9B4D] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-[0_10px_25px_rgba(0,0,0,0.6)] group relative min-w-[48px] min-h-[48px]"
        aria-label="Toggle Manan AI Assistant"
      >
        <div className="relative flex items-center justify-center">
          {buttonMode === 'chat' ? (
            <Bot className="w-5 h-5 sm:w-7 sm:h-7 text-[#E9E5DF] group-hover:text-[#8E9B4D] transition-colors" />
          ) : (
            <PhoneCall className="w-5 h-5 sm:w-7 sm:h-7 text-[#8E9B4D] group-hover:scale-110 transition-transform" />
          )}

          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#8E9B4D] border-2 border-[#0A0D0A]" />
        </div>

        {/* Desktop Hover Tooltip */}
        <span className="absolute right-full mr-3 bg-[#0A0D0A] border border-[#252A20] text-[#E9E5DF] text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden sm:block shadow-md">
          Chat or Talk with Me
        </span>
      </button>
    </div>
  );
}
