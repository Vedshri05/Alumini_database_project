'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Briefcase, Users, Calendar, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  from: 'user' | 'bot';
  text?: string;
  title?: string;
  steps?: string[];
  suggestions?: string[];
  loading?: boolean;
}

const QUICK = ['Post Job', 'Mentorship Requests', 'Schedule Session', 'Chat Help', 'Dashboard'];

const QUICK_ICONS: Record<string, any> = {
  'Post Job': Briefcase,
  'Mentorship Requests': Users,
  'Schedule Session': Calendar,
  'Chat Help': MessageSquare,
  'Dashboard': Bot,
};

export function AlumniChatbot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          id: '0', from: 'bot',
          title: 'Welcome back! 👋',
          steps: [
            "I'm your Alumni Assistant — here to help you make the most of this platform.",
            "Ask me anything about mentorship, jobs, sessions, or chatting with students!"
          ],
          suggestions: QUICK,
        }]);
      }, 300);
    }
  }, [open]);

  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || sending) return;
    setMessages(p => [...p,
      { id: Date.now().toString(), from: 'user', text },
      { id: Date.now() + '_l', from: 'bot', loading: true }
    ]);
    setInput('');
    setSending(true);

    try {
      const res = await fetch('http://localhost:8080/api/chatbot/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, role: 'ALUMNI' }),
      });
      const data = await res.json();
      const d = data.data || {};
      setMessages(p => p.filter(m => !m.loading).concat({
        id: Date.now() + '_b', from: 'bot',
        title: d.title, steps: d.steps, suggestions: d.suggestions,
      }));
    } catch {
      setMessages(p => p.filter(m => !m.loading).concat({
        id: Date.now() + '_e', from: 'bot',
        title: '⚠️ Connection Error',
        steps: ['Could not reach the server.', 'Make sure the backend is running on port 8080.'],
      }));
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {showTooltip && !open && (
          <div className="bg-white border border-emerald-100 text-gray-700 text-xs font-medium px-3 py-2 rounded-2xl shadow-lg animate-bounce flex items-center gap-1.5">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            Alumni Help Assistant
          </div>
        )}
        <button onClick={() => { setOpen(o => !o); setMinimized(false); }}
          className="relative w-14 h-14 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white rounded-2xl shadow-2xl shadow-emerald-300/50 flex items-center justify-center transition-all hover:scale-110 active:scale-95">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 opacity-40 scale-110 animate-pulse -z-10" />
          {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          {!open && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-400 border-2 border-white rounded-full flex items-center justify-center text-[9px] font-bold text-white">
              AI
            </span>
          )}
        </button>
      </div>

      {/* Chat window */}
      {open && (
        <div className={`fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-3xl shadow-2xl border border-emerald-100 flex flex-col overflow-hidden transition-all`}
          style={{ maxHeight: minimized ? '64px' : '72vh', background: '#f0fdf4' }}>

          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-5 py-4 flex items-center gap-3 shrink-0">
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-amber-400 border-2 border-white rounded-full" />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm">Alumni Assistant</p>
              <p className="text-emerald-100 text-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full inline-block animate-pulse" />
                Specialized for Alumni
              </p>
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => setMinimized(m => !m)}
                className="w-7 h-7 bg-white/15 hover:bg-white/25 rounded-xl flex items-center justify-center transition-colors">
                <Minimize2 className="w-3.5 h-3.5 text-white" />
              </button>
              <button onClick={() => setOpen(false)}
                className="w-7 h-7 bg-white/15 hover:bg-white/25 rounded-xl flex items-center justify-center transition-colors">
                <X className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4"
                style={{ background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)' }}>
                {messages.map(msg => (
                  <div key={msg.id} className={`flex gap-2.5 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.from === 'bot' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shrink-0 mt-auto shadow-md shadow-emerald-200">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="max-w-[82%]">
                      {msg.loading ? (
                        <div className="bg-white border border-emerald-100 rounded-3xl rounded-bl-sm px-4 py-3 shadow-sm">
                          <div className="flex gap-1.5 items-center h-4">
                            {[0, 150, 300].map(d => (
                              <span key={d} className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                                style={{ animationDelay: `${d}ms` }} />
                            ))}
                          </div>
                        </div>
                      ) : msg.from === 'user' ? (
                        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white px-4 py-2.5 rounded-3xl rounded-br-sm text-sm shadow-lg shadow-emerald-200/50">
                          {msg.text}
                        </div>
                      ) : (
                        <div className="bg-white border border-emerald-100 rounded-3xl rounded-bl-sm px-4 py-3.5 shadow-sm space-y-2.5">
                          {msg.title && <p className="font-bold text-gray-900 text-sm">{msg.title}</p>}
                          {msg.steps && (
                            <div className="space-y-1.5">
                              {msg.steps.map((s, i) => (
                                <div key={i} className="flex gap-2 text-xs text-gray-600 items-start">
                                  {s.startsWith('•') || s.startsWith('Try') ? (
                                    <span className="leading-relaxed">{s}</span>
                                  ) : (
                                    <>
                                      <span className="w-5 h-5 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 shadow-sm">
                                        {i + 1}
                                      </span>
                                      <span className="leading-relaxed pt-0.5">{s}</span>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          {msg.suggestions && (
                            <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-emerald-50">
                              {msg.suggestions.map(s => {
                                const Icon = QUICK_ICONS[s];
                                return (
                                  <button key={s} onClick={() => send(s)}
                                    className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full transition-all hover:shadow-sm flex items-center gap-1 font-medium">
                                    {Icon && <Icon className="w-3 h-3" />}
                                    {s}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {msg.from === 'user' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shrink-0 mt-auto shadow-md shadow-emerald-200">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Quick chips with icons */}
              <div className="px-3 py-2 border-t border-emerald-100 bg-white/80 flex gap-1.5 overflow-x-auto"
                style={{ scrollbarWidth: 'none' }}>
                {QUICK.map(q => {
                  const Icon = QUICK_ICONS[q];
                  return (
                    <button key={q} onClick={() => send(q)}
                      className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full whitespace-nowrap transition-all shrink-0 font-medium flex items-center gap-1">
                      {Icon && <Icon className="w-3 h-3" />}
                      {q}
                    </button>
                  );
                })}
              </div>

              {/* Input */}
              <div className="p-3 bg-white border-t border-emerald-100">
                <div className="flex gap-2 bg-emerald-50/60 border border-emerald-200 rounded-2xl p-1.5 focus-within:border-emerald-400 focus-within:bg-white transition-all">
                  <input value={input} onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && send(input)}
                    placeholder="Ask about jobs, mentorship, sessions..."
                    className="flex-1 bg-transparent px-2.5 py-1.5 text-sm focus:outline-none text-gray-800 placeholder-emerald-300" />
                  <button onClick={() => send(input)} disabled={!input.trim() || sending}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-40 text-white p-2 rounded-xl transition-all hover:shadow-md active:scale-95">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-center text-[10px] text-emerald-300 mt-1.5">Alumni Help AI · Powered by your platform</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
