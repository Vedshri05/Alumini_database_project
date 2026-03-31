'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, ChevronRight, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  from: 'user' | 'bot';
  text?: string;
  title?: string;
  steps?: string[];
  suggestions?: string[];
  loading?: boolean;
}

const QUICK = ['Search Alumni', 'Request Mentorship', 'Apply for Job', 'Register Event', 'Chat'];

export function HelpChatbot({ role = 'STUDENT' }: { role?: string }) {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [pulse, setPulse] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          id: '0', from: 'bot',
          title: `Hey there! 👋`,
          steps: [
            `I'm your smart assistant for this platform.`,
            `Ask me anything or pick a topic below to get started!`
          ],
          suggestions: QUICK,
        }]);
      }, 400);
    }
  }, [open]);

  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || sending) return;
    const userMsg: Message = { id: Date.now().toString(), from: 'user', text };
    const loadingMsg: Message = { id: Date.now() + '_l', from: 'bot', loading: true };
    setMessages(p => [...p, userMsg, loadingMsg]);
    setInput('');
    setSending(true);

    try {
      const res = await fetch('http://localhost:8080/api/chatbot/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, role }),
      });
      const data = await res.json();
      const d = data.data || {};
      setMessages(p => p.filter(m => !m.loading).concat({
        id: Date.now() + '_b', from: 'bot',
        title: d.title,
        steps: d.steps,
        suggestions: d.suggestions,
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
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Tooltip bubble */}
        {!open && pulse && (
          <div className="bg-white text-gray-800 text-xs font-medium px-3 py-2 rounded-2xl shadow-lg border border-gray-100 animate-bounce">
            Need help? 💬
          </div>
        )}

        <button onClick={() => { setOpen(o => !o); setMinimized(false); }}
          className="relative w-14 h-14 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 text-white rounded-2xl shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 hover:shadow-violet-300/50">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 animate-pulse opacity-50 -z-10 scale-110" />
          {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          {!open && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-white" />
            </span>
          )}
        </button>
      </div>

      {/* Chat window */}
      {open && (
        <div className={`fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-300 ${minimized ? 'h-16' : ''}`}
          style={{ maxHeight: minimized ? '64px' : '72vh' }}>

          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-5 py-4 flex items-center gap-3 shrink-0">
            {/* Avatar */}
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm">Help Assistant</p>
              <p className="text-violet-200 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                Online · Always ready
              </p>
            </div>
            <div className="flex items-center gap-1.5">
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
                style={{ background: 'linear-gradient(180deg, #f8f7ff 0%, #ffffff 100%)' }}>

                {messages.map((msg, idx) => (
                  <div key={msg.id} className={`flex gap-2.5 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                    style={{ animationDelay: `${idx * 50}ms` }}>

                    {msg.from === 'bot' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center shrink-0 mt-auto shadow-md shadow-violet-200">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}

                    <div className={`max-w-[82%]`}>
                      {msg.loading ? (
                        <div className="bg-white border border-violet-100 rounded-3xl rounded-bl-sm px-4 py-3 shadow-sm">
                          <div className="flex gap-1.5 items-center h-4">
                            {[0, 150, 300].map(d => (
                              <span key={d} className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"
                                style={{ animationDelay: `${d}ms` }} />
                            ))}
                          </div>
                        </div>
                      ) : msg.from === 'user' ? (
                        <div className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white px-4 py-2.5 rounded-3xl rounded-br-sm text-sm shadow-lg shadow-violet-200/50">
                          {msg.text}
                        </div>
                      ) : (
                        <div className="bg-white border border-violet-100 rounded-3xl rounded-bl-sm px-4 py-3.5 shadow-sm space-y-2.5">
                          {msg.title && (
                            <p className="font-bold text-gray-900 text-sm leading-snug">{msg.title}</p>
                          )}
                          {msg.steps && (
                            <div className="space-y-1.5">
                              {msg.steps.map((s, i) => (
                                <div key={i} className={`flex gap-2 text-xs text-gray-600 ${s.startsWith('•') ? '' : 'items-start'}`}>
                                  {s.startsWith('•') ? (
                                    <span className="leading-relaxed">{s}</span>
                                  ) : (
                                    <>
                                      <span className="w-5 h-5 bg-gradient-to-br from-violet-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 shadow-sm">
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
                            <div className="flex flex-wrap gap-1.5 pt-1 border-t border-violet-50">
                              {msg.suggestions.map(s => (
                                <button key={s} onClick={() => send(s)}
                                  className="text-xs bg-gradient-to-r from-violet-50 to-indigo-50 hover:from-violet-100 hover:to-indigo-100 text-violet-700 border border-violet-200 px-2.5 py-1 rounded-full transition-all hover:shadow-sm flex items-center gap-1 font-medium">
                                  {s} <ChevronRight className="w-3 h-3" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {msg.from === 'user' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center shrink-0 mt-auto shadow-md shadow-violet-200">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Quick chips */}
              <div className="px-3 py-2 border-t border-violet-50 bg-white/80 backdrop-blur flex gap-1.5 overflow-x-auto"
                style={{ scrollbarWidth: 'none' }}>
                {QUICK.map(q => (
                  <button key={q} onClick={() => send(q)}
                    className="text-xs bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200 px-3 py-1.5 rounded-full whitespace-nowrap transition-all hover:shadow-sm shrink-0 font-medium">
                    {q}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 bg-white border-t border-violet-50">
                <div className="flex gap-2 bg-violet-50/60 border border-violet-200 rounded-2xl p-1.5 focus-within:border-violet-400 focus-within:bg-white transition-all">
                  <input value={input} onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && send(input)}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-transparent px-2.5 py-1.5 text-sm focus:outline-none text-gray-800 placeholder-violet-300" />
                  <button onClick={() => send(input)} disabled={!input.trim() || sending}
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white p-2 rounded-xl transition-all hover:shadow-md hover:shadow-violet-200 active:scale-95">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-center text-[10px] text-violet-300 mt-1.5">Powered by Alumni Help AI</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
