'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Phone, Send, X, RotateCcw, Mail, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { COMPANY } from '@/lib/constants';

/* ─── Types ─── */
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  quickReplies?: string[];
  handoff?: boolean;
}

interface ChatResponse {
  success: boolean;
  response: string;
  sessionId?: string;
  quickReplies?: string[];
  handoff?: boolean;
}

const STORAGE_KEY = 'wa-chat-session-id';

/* ─── Quick Questions ─── */
const QUICK_QUESTIONS = [
  '🔧 What services do you offer?',
  '💰 How can I get a quote?',
  '👥 Who is on your team?',
  '🏗️ Tell me about your projects',
  '📞 How do I contact Charles?',
  '🌍 What areas do you serve?',
];

const WELCOME_MESSAGE: Message = {
  id: '1',
  role: 'assistant',
  content:
    "👋 Hi! I'm Tina, your Charlessolarwater AI assistant. Welcome!\n\nI can help you with:\n\n• 🔧 Service information & recommendations\n• 📐 Project scoping & technical queries\n• 📅 Scheduling a consultation\n\nHow can I help you today?",
};

/* ─── WhatsApp SVG Icon ─── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ─── Typing Indicator ─── */
function TypingIndicator() {
  return (
    <div className="flex gap-2 items-start justify-start">
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
        <Image src="/tina-avatar.png" alt="Tina" width={32} height={32} className="w-full h-full object-cover" />
      </div>
      <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-[#8696A0] rounded-full animate-wa-dot-1" />
          <span className="w-2 h-2 bg-[#8696A0] rounded-full animate-wa-dot-2" />
          <span className="w-2 h-2 bg-[#8696A0] rounded-full animate-wa-dot-3" />
        </div>
      </div>
    </div>
  );
}

/* ─── Quick Reply Chips (AI-generated, shown after responses) ─── */
function QuickReplies({
  replies,
  onSelect,
}: {
  replies: string[];
  onSelect: (reply: string) => void;
}) {
  if (!replies || replies.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-1">
      {replies.map((reply) => (
        <button
          key={reply}
          onClick={() => onSelect(reply)}
          className="text-xs bg-[#075E54] text-white px-3 py-1.5 rounded-full hover:bg-[#064E46] transition-colors duration-200 shadow-sm whitespace-nowrap font-medium"
        >
          {reply}
        </button>
      ))}
    </div>
  );
}

/* ─── Quick Question Tabs (static, shown before first user message) ─── */
function QuickQuestionTabs({
  questions,
  onSelect,
  disabled,
}: {
  questions: string[];
  onSelect: (q: string) => void;
  disabled: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  return (
    <div className="px-3 py-2 flex-shrink-0">
      <div className="relative">
        {/* Left fade + arrow */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-1 z-10 flex items-center">
            <div className="w-6 h-full bg-gradient-to-r from-[#ECE5DD] to-transparent pointer-events-none" />
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: -120, behavior: 'smooth' })}
              className="w-5 h-5 rounded-full bg-[#075E54] text-white flex items-center justify-center shadow-sm hover:bg-[#064E46] transition-colors -ml-3"
              aria-label="Scroll left"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        )}
        {/* Right fade + arrow */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-1 z-10 flex items-center">
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: 120, behavior: 'smooth' })}
              className="w-5 h-5 rounded-full bg-[#075E54] text-white flex items-center justify-center shadow-sm hover:bg-[#064E46] transition-colors mr-1"
              aria-label="Scroll right"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="w-6 h-full bg-gradient-to-l from-[#ECE5DD] to-transparent pointer-events-none" />
          </div>
        )}
        {/* Scrollable chips */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-1 px-1"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#25D366 #ECE5DD' }}
        >
          {questions.map((q) => (
            <button
              key={q}
              onClick={() => onSelect(q)}
              disabled={disabled}
              className="flex-shrink-0 text-[11px] font-medium px-3 py-1.5 rounded-full bg-[#25D366]/15 text-[#075E54] hover:bg-[#25D366] hover:text-white transition-all duration-200 whitespace-nowrap border border-[#25D366]/30 hover:border-[#25D366] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Handoff Panel ─── */
function HandoffPanel() {
  return (
    <div className="bg-white border border-[#25D366]/20 rounded-lg p-3.5 shadow-sm max-w-full mt-1">
      <p className="text-sm font-semibold text-[#075E54] mb-3">🤝 Connect with Our Team</p>
      <div className="grid grid-cols-2 gap-2">
        <a
          href={COMPANY.phoneHref}
          className="flex items-center justify-center gap-2 bg-[#075E54] text-white text-xs font-medium px-3 py-2.5 rounded-lg hover:bg-[#064E46] transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          Call Us
        </a>
        <a
          href={COMPANY.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366] text-white text-xs font-medium px-3 py-2.5 rounded-lg hover:bg-[#1EBE5A] transition-colors"
        >
          <WhatsAppIcon className="w-3.5 h-3.5" />
          WhatsApp
        </a>
        <a
          href={`mailto:${COMPANY.email}`}
          className="flex items-center justify-center gap-2 bg-[#075E54]/10 text-[#075E54] text-xs font-medium px-3 py-2.5 rounded-lg hover:bg-[#075E54]/20 transition-colors"
        >
          <Mail className="w-3.5 h-3.5" />
          Email Us
        </a>
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent('navigate-to-contact'));
          }}
          className="flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#075E54] text-xs font-medium px-3 py-2.5 rounded-lg hover:bg-[#25D366]/20 transition-colors"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          Contact Form
        </button>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function WhatsAppAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasUserMessaged = messages.some((m) => m.role === 'user');

  /* Load session from localStorage */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setSessionId(stored);
  }, []);

  /* External toggle event */
  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener('toggle-wa-chat', handleToggle);
    return () => window.removeEventListener('toggle-wa-chat', handleToggle);
  }, []);

  /* Auto-scroll to latest message */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  /* Focus input when panel opens */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  /* Save session ID to state and localStorage */
  const saveSessionId = useCallback((id: string) => {
    setSessionId(id);
    localStorage.setItem(STORAGE_KEY, id);
  }, []);

  /* Generate or retrieve session ID */
  const getSessionId = useCallback((): string => {
    if (sessionId) return sessionId;
    const newId = `wa-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    saveSessionId(newId);
    return newId;
  }, [sessionId, saveSessionId]);

  /* Send message to API */
  const sendMessage = async (text?: string) => {
    const messageText = (text ?? input).trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const currentSessionId = getSessionId();
      // Send last 20 messages as history
      const history = messages
        .slice(-20)
        .map((m) => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          sessionId: currentSessionId,
          history,
          generateQuickReplies: true,
        }),
      });

      const data: ChatResponse = await res.json();

      // Update session ID if server returned a new one
      if (data.sessionId && data.sessionId !== currentSessionId) {
        saveSessionId(data.sessionId);
      }

      // Detect handoff tag in response
      const rawResponse = data.response || '';
      const isHandoff = rawResponse.includes('[HANDOFF]') || !!data.handoff;
      const cleanResponse = rawResponse.replace('[HANDOFF]', '').trim();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          cleanResponse ||
          "I'm sorry, I couldn't process your request. Please try again or contact us directly.",
        quickReplies: data.quickReplies,
        handoff: isHandoff,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            "⚠️ I'm experiencing a connection issue. Please try again or reach out via WhatsApp for immediate assistance.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /* Handle keyboard */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* New chat — reset messages and session */
  const handleNewChat = () => {
    setMessages([{ ...WELCOME_MESSAGE, id: Date.now().toString() }]);
    localStorage.removeItem(STORAGE_KEY);
    setSessionId(null);
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  return (
    <>
      {/* ═══ Floating WhatsApp Button ═══ */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        aria-label="Toggle WhatsApp AI Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Image src="/tina-avatar.png" alt="Tina" width={28} height={28} className="rounded-full object-cover" />
        )}

        {/* Pulse ring — only when closed */}
        {!isOpen && (
          <span className="absolute inset-0 w-14 h-14 bg-[#25D366] rounded-full animate-wa-pulse pointer-events-none" />
        )}

        {/* Tooltip — only when closed */}
        {!isOpen && (
          <div
            className={`absolute right-16 top-1/2 -translate-y-1/2 bg-[#075E54] text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap transition-all duration-200 pointer-events-none ${
              isHovered
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-4'
            }`}
          >
            Chat with Tina
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-[#075E54]" />
          </div>
        )}
      </button>

      {/* ═══ Chat Panel ═══ */}
      <div
        className={`fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] md:w-[380px] transition-all duration-300 ease-out origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
        <div
          className="rounded-2xl shadow-2xl overflow-hidden flex flex-col bg-[#ECE5DD]"
          style={{ minHeight: '500px', maxHeight: '600px' }}
        >
          {/* ── Header ── */}
          <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3 flex-shrink-0">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image src="/tina-avatar.png" alt="Tina" width={40} height={40} className="w-full h-full object-cover" />
            </div>
            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-sm leading-tight">
                Tina — AI Assistant
              </h3>
              <p className="text-[#B2DFDB] text-xs leading-tight">
                Engineering Solutions Expert
              </p>
            </div>
            {/* Contact action buttons */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <a
                href={COMPANY.phoneHref}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Call us"
                title={COMPANY.phone}
              >
                <Phone className="w-4 h-4 text-white" />
              </a>
              <a
                href={COMPANY.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Chat on WhatsApp"
                title="Open WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
              </a>
              <button
                onClick={handleNewChat}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="New Chat"
                title="Start new conversation"
              >
                <RotateCcw className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* ── Messages Area ── */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1.5" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c8c3ba\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}>
            {/* Date divider */}
            <div className="flex justify-center mb-2">
              <span className="bg-[#D9EAD3]/60 text-[#075E54] text-[10px] font-medium px-3 py-1 rounded-lg shadow-sm">
                Today
              </span>
            </div>

            {messages.map((msg) => (
              <div key={msg.id}>
                {/* User Message */}
                {msg.role === 'user' && (
                  <div className="flex justify-end mb-0.5">
                    <div className="relative max-w-[85%]">
                      <div className="bg-[#DCF8C6] rounded-lg rounded-tr-none px-3 py-2 shadow-sm">
                        <p className="text-[13px] text-[#111B21] leading-relaxed whitespace-pre-line break-words">
                          {msg.content}
                        </p>
                      </div>
                      {/* Chat bubble tail */}
                      <div className="absolute -right-2 top-0 w-0 h-0 border-t-[6px] border-t-transparent border-r-[6px] border-r-[#DCF8C6] border-b-[6px] border-b-transparent" />
                    </div>
                  </div>
                )}

                {/* Assistant Message */}
                {msg.role === 'assistant' && (
                  <div className="flex gap-2 items-start justify-start mb-0.5">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                      <Image src="/tina-avatar.png" alt="Tina" width={32} height={32} className="w-full h-full object-cover" />
                    </div>
                    <div className="relative max-w-[85%]">
                      <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 shadow-sm">
                        <p className="text-[13px] text-[#111B21] leading-relaxed whitespace-pre-line break-words">
                          {msg.content}
                        </p>
                      </div>
                      {/* Chat bubble tail */}
                      <div className="absolute -left-2 top-0 w-0 h-0 border-t-[6px] border-t-transparent border-l-[6px] border-l-white border-b-[6px] border-b-transparent" />
                      {/* Quick Replies (AI-generated) */}
                      <QuickReplies
                        replies={msg.quickReplies || []}
                        onSelect={(reply) => sendMessage(reply)}
                      />
                      {/* Handoff Panel */}
                      {msg.handoff && <HandoffPanel />}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Quick Question Tabs — visible before first user message ── */}
          {!hasUserMessaged && (
            <QuickQuestionTabs
              questions={QUICK_QUESTIONS}
              onSelect={(q) => sendMessage(q)}
              disabled={isLoading}
            />
          )}

          {/* ── Input Area ── */}
          <div className="bg-[#F0F0F0] px-3 py-2 flex-shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                disabled={isLoading}
                className="flex-1 bg-white rounded-full px-4 py-2.5 text-sm text-[#111B21] placeholder-[#667781] border border-[#DFE5E7] focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]/30 transition-colors disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-[#075E54] flex items-center justify-center hover:bg-[#064E46] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
            {/* Branding */}
            <div className="flex items-center justify-center gap-1.5 mt-1.5">
              <Image src="/tina-avatar.png" alt="Tina" width={12} height={12} className="rounded-full object-cover" />
              <span className="text-[10px] text-[#667781]">
                Tina — for accurate quotes, please contact our team.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
