'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  MessageSquare,
  X,
  Send,
  Sparkles,
  Phone,
  MapPin,
  Clock,
  BookOpen,
  FileText,
  RotateCcw,
  User,
  ArrowRight,
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actions?: {
    label: string;
    type: 'phone' | 'whatsapp' | 'link';
    value: string;
  }[];
}

const QUICK_CHIPS = [
  { id: 'services', label: '📋 Online Form Services' },
  { id: 'courses', label: '💻 Computer Courses' },
  { id: 'timing', label: '⏰ Hours & Location' },
  { id: 'contact', label: '📞 Contact Sanjit' },
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const initialBotMessage: Message = {
    id: '1',
    sender: 'bot',
    text: "Namaste! 🙏 Welcome to Cyber Café & Digital Service Center, Nirakarpur, Khordha, Odisha. I am Sanjit's AI Assistant. How can I help you today?",
    timestamp: getCurrentTime(),
    actions: [
      { label: 'Chat on WhatsApp', type: 'whatsapp', value: '9777735527' },
      { label: 'Call Sanjit Now', type: 'phone', value: '9777735527' },
    ],
  };

  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputMessage.trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateBotResponse(query);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 600);
  };

  const generateBotResponse = (query: string): Message => {
    const q = query.toLowerCase();
    const timestamp = getCurrentTime();

    if (
      q.includes('form') ||
      q.includes('service') ||
      q.includes('apply') ||
      q.includes('online') ||
      q.includes('pan') ||
      q.includes('aadhaar') ||
      q.includes('passport') ||
      q.includes('scholarship')
    ) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: '📋 We assist with all online services:\n• Exam & Job Applications (OSSSC, OSSC, Banking, Railway)\n• PAN Card (New/Correction)\n• Aadhaar Online Services & Printout\n• Passport & Caste/Income/Resident Certificates\n• Scholarship & Ticket Booking (Train/Bus/Flight)\n• Color Printing, Xerox & Lamination',
        timestamp,
        actions: [
          { label: 'Chat on WhatsApp for Help', type: 'whatsapp', value: '9777735527' },
          { label: 'Call 9777735527', type: 'phone', value: '9777735527' },
        ],
      };
    }

    if (
      q.includes('course') ||
      q.includes('learn') ||
      q.includes('pgdca') ||
      q.includes('tally') ||
      q.includes('full stack') ||
      q.includes('web') ||
      q.includes('syllabus') ||
      q.includes('class')
    ) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: '💻 Available Computer & Tech Courses:\n1. PGDCA (Post Graduate Diploma in Computer Applications)\n2. Full Stack Web Development (React, Next.js, Node.js)\n3. Tally Prime + GST Accounting\n4. AI Productivity Tools & ChatGPT Hacks\n5. MS Office, Photoshop & PageMaker',
        timestamp,
        actions: [
          { label: 'View All Courses', type: 'link', value: '/courses' },
          { label: 'Enquire for Admission', type: 'whatsapp', value: '9777735527' },
        ],
      };
    }

    if (
      q.includes('time') ||
      q.includes('hour') ||
      q.includes('open') ||
      q.includes('location') ||
      q.includes('address') ||
      q.includes('where') ||
      q.includes('place')
    ) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: '📍 Business Address:\nAt - Nanapada, PO/PS - Nirakarpur, Dist - Khordha, State - Odisha, Pin - 752019.\n\n⏰ Opening Hours:\nMonday to Sunday: 8:00 AM – 9:00 PM (Open all 7 Days).',
        timestamp,
        actions: [
          { label: 'View Map & Location', type: 'link', value: '/contact-us' },
          { label: 'Call Sanjit Rautaray', type: 'phone', value: '9777735527' },
        ],
      };
    }

    if (
      q.includes('contact') ||
      q.includes('phone') ||
      q.includes('mobile') ||
      q.includes('sanjit') ||
      q.includes('owner') ||
      q.includes('number') ||
      q.includes('email')
    ) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: '👤 Owner: Sanjit Rautaray\n👔 Manager: Bibhudatta Subudhi\n📱 Mobile & WhatsApp: +91 9777735527 / +91 9668358119\n📧 Email: sanjit007muna@gmail.com\n\nContact us directly for quick service!',
        timestamp,
        actions: [
          { label: 'Call +91 9777735527', type: 'phone', value: '9777735527' },
          { label: 'Chat on WhatsApp', type: 'whatsapp', value: '9777735527' },
        ],
      };
    }

    return {
      id: Date.now().toString(),
      sender: 'bot',
      text: 'Thank you for your question! You can submit an enquiry form on our website or get instant help by connecting directly with owner Sanjit Rautaray via WhatsApp or call.',
      timestamp,
      actions: [
        { label: 'WhatsApp Sanjit', type: 'whatsapp', value: '9777735527' },
        { label: 'Call +91 9777735527', type: 'phone', value: '9777735527' },
        { label: 'Submit Online Enquiry', type: 'link', value: '/contact-us' },
      ],
    };
  };

  const resetChat = () => {
    setMessages([initialBotMessage]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative bg-slate-900 hover:bg-slate-800 text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-brand-400/50 flex items-center gap-2.5"
            aria-label="Open AI Assistant Chat"
          >
            <div className="relative">
              <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-brand-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
            </div>

            <span className="hidden md:inline font-bold text-xs sm:text-sm text-slate-100 pr-1">
              Ask AI Assistant
            </span>

            {unreadCount > 0 && (
              <span className="absolute -top-1 -left-1 bg-brand-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Chat Modal / Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[580px] h-[82vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-navy-900 to-brand-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-brand-600 border border-brand-400/30 flex items-center justify-center text-white shadow-inner">
                  <Bot className="w-5 h-5 text-brand-200" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm text-white tracking-tight">
                    Cyber Assistant AI
                  </h3>
                  <span className="bg-brand-500/30 text-brand-200 text-[10px] px-1.5 py-0.5 rounded-full border border-brand-400/20 font-medium">
                    24/7
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online | Sanjit Rautaray
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Reset Chat"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/70 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-slate-900 text-brand-400 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className="max-w-[82%] space-y-2">
                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-line shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-brand-600 text-white rounded-br-none font-medium'
                        : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Actions inside message */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.actions.map((act, idx) => (
                        <React.Fragment key={idx}>
                          {act.type === 'phone' && (
                            <a
                              href={`tel:${act.value}`}
                              className="inline-flex items-center gap-1 bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold px-2.5 py-1.5 rounded-lg text-[11px] border border-brand-200 transition-colors"
                            >
                              <Phone className="w-3 h-3 text-brand-600" />
                              {act.label}
                            </a>
                          )}
                          {act.type === 'whatsapp' && (
                            <a
                              href={`https://wa.me/91${act.value}?text=${encodeURIComponent('Hello Sanjit, I have a question regarding Cyber Cafe services.')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold px-2.5 py-1.5 rounded-lg text-[11px] border border-emerald-200 transition-colors"
                            >
                              <MessageSquare className="w-3 h-3 text-emerald-600" />
                              {act.label}
                            </a>
                          )}
                          {act.type === 'link' && (
                            <a
                              href={act.value}
                              className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-2.5 py-1.5 rounded-lg text-[11px] border border-slate-300 transition-colors"
                            >
                              <ArrowRight className="w-3 h-3 text-slate-600" />
                              {act.label}
                            </a>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}

                  <span className="block text-[10px] text-slate-400 px-1">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0 mt-0.5 shadow-sm font-bold text-xs">
                    You
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-slate-400">
                <div className="w-7 h-7 rounded-xl bg-slate-900 text-brand-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 animate-bounce" />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-slate-100 shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />
                  <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse delay-100" />
                  <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse delay-200" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto">
            {QUICK_CHIPS.map((chip) => (
              <button
                key={chip.id}
                onClick={() => handleSend(chip.label)}
                className="shrink-0 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 text-slate-700 px-2.5 py-1 rounded-full text-[11px] font-semibold border border-slate-200 transition-all"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Field */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about services, courses, or contact..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white text-slate-800 placeholder-slate-400"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white p-2.5 rounded-xl transition-colors shadow-sm"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
