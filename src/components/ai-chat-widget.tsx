'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Send, User, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/* ─── Quick Questions ─── */
const QUICK_QUESTIONS = [
  '🔧 What services do you offer?',
  '💰 How can I get a quote?',
  '👥 Who is on your team?',
  '🏗️ Tell me about your projects',
  '📞 How do I contact Charles?',
  '🌍 What areas do you serve?',
];

/* ─── Quick Question Tabs ─── */
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
    <div className="px-4 pb-2 flex-shrink-0">
      <div className="relative">
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-1 z-10 flex items-center">
            <div className="w-6 h-full bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: -120, behavior: 'smooth' })}
              className="w-5 h-5 rounded-full bg-navy text-white flex items-center justify-center shadow-sm hover:bg-navy/80 transition-colors -ml-3"
              aria-label="Scroll left"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-1 z-10 flex items-center">
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: 120, behavior: 'smooth' })}
              className="w-5 h-5 rounded-full bg-navy text-white flex items-center justify-center shadow-sm hover:bg-navy/80 transition-colors mr-1"
              aria-label="Scroll right"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="w-6 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>
        )}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-1 px-1"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#2ECC71 white' }}
        >
          {questions.map((q) => (
            <button
              key={q}
              onClick={() => onSelect(q)}
              disabled={disabled}
              className="flex-shrink-0 text-[11px] font-medium px-3 py-1.5 rounded-full bg-accent-green/10 text-accent-green hover:bg-accent-green hover:text-white transition-all duration-200 whitespace-nowrap border border-accent-green/20 hover:border-accent-green disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  handoff?: boolean;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Hi! I'm Tina, your Charlessolarwater AI assistant. I can help you with:\n\n• Service information and recommendations\n• Project scoping and technical queries\n• Scheduling a consultation\n\nHow can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hasUserMessaged = messages.some((m) => m.role === 'user');

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener('toggle-chat', handleToggle);
    return () => window.removeEventListener('toggle-chat', handleToggle);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: messages.map((m) => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || "I'm sorry, I couldn't process your request. Please try again or contact us directly.",
        ...(data.handoff ? { handoff: true } : {}),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            "I'm experiencing a connection issue. Please try again or reach out via WhatsApp for immediate assistance.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-20 z-50 w-14 h-14 bg-navy rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Image src="/tina-avatar.png" alt="Tina" width={32} height={32} className="rounded-full object-cover" />
        )}
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[500px]">
          {/* Header */}
          <div className="bg-navy p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image src="/tina-avatar.png" alt="Tina" width={40} height={40} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">
                Tina — AI Assistant
              </h3>
              <p className="text-gray-400 text-xs">
                Engineering Solutions Expert
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <Image src="/tina-avatar.png" alt="Tina" width={32} height={32} className="w-full h-full object-cover" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-navy text-white rounded-br-md'
                      : 'bg-gray-100 text-navy rounded-bl-md'
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <Image src="/tina-avatar.png" alt="Tina" width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                  <Loader2 className="w-4 h-4 text-steel animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions — visible before first user message */}
          {!hasUserMessaged && <QuickQuestionTabs questions={QUICK_QUESTIONS} onSelect={sendMessage} disabled={isLoading} />}

          {/* Input */}
          <div className="p-4 border-t border-gray-100 pt-3">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about our services..."
                disabled={isLoading}
                className="bg-gray-50 border-gray-200 text-sm focus:border-accent-green"
              />
              <Button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                size="sm"
                className="bg-accent-green hover:bg-accent-green-dark text-white px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              AI assistant — for quotes & assessments, a human engineer will be notified.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
