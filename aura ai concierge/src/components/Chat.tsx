import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, User, Heart, Bookmark, Command, Cpu, Hexagon } from 'lucide-react';
import { Message, ChatSession } from '../types';

const TypewriterMessage = ({ content, animated, onUpdate }: { content: string, animated?: boolean, onUpdate?: () => void }) => {
  const [displayedContent, setDisplayedContent] = useState(animated ? '' : content);

  useEffect(() => {
    if (!animated) {
      setDisplayedContent(content);
      return;
    }

    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedContent(content.slice(0, i + 1));
      i++;
      if (onUpdate) onUpdate();
      if (i >= content.length) {
        clearInterval(intervalId);
      }
    }, 15);

    return () => clearInterval(intervalId);
  }, [content, animated, onUpdate]);

  return <span>{displayedContent}</span>;
};

const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-3 h-10 px-5 py-2 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 w-fit shadow-sm">
      <span className="text-sm font-medium text-slate-300">Typing</span>
      <div className="flex items-center gap-1.5">
        <motion.div 
          className="w-1.5 h-1.5 bg-teal-400 rounded-full"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0 }}
        />
        <motion.div 
          className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.div 
          className="w-1.5 h-1.5 bg-teal-400 rounded-full"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
      </div>
    </div>
  );
};

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([{
    id: 'welcome',
    role: 'assistant',
    content: "Welcome to the Nexus. I'm Aura. Tell me what you'd like to build today.",
    timestamp: new Date(),
    animated: true
  }]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const toggleReaction = (id: string, reaction: 'liked' | 'saved') => {
    setMessages(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, [reaction]: !m[reaction] };
      }
      return m;
    }));
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.text,
        timestamp: new Date(),
        animated: true
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error communicating with AI:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting to the core. Please try again.",
        timestamp: new Date(),
        animated: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full h-full flex flex-col relative z-10 overflow-hidden"
    >
      {/* Background abstract elements for the chat */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[40rem] h-[40rem] bg-teal-500/5 rounded-full blur-3xl mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[20%] w-[30rem] h-[30rem] bg-cyan-500/5 rounded-full blur-3xl mix-blend-screen" />
      </div>

      {/* Top Header - Minimalist */}
      <header className="shrink-0 flex items-center justify-between py-6 px-8 relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-teal-500/30 flex items-center justify-center bg-teal-500/10">
            <Hexagon className="w-4 h-4 text-teal-400" />
          </div>
          <span className="font-mono text-sm tracking-widest text-slate-300 uppercase">Nexus Terminal</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_10px_rgba(45,212,191,0.6)]" />
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Link Active</span>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 pb-32 scroll-smooth scrollbar-hide relative z-20">
        <div className="max-w-3xl mx-auto space-y-12 pb-12">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`flex items-center gap-3 mb-2 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                    message.role === 'user' ? 'bg-slate-800 text-slate-400' : 'bg-teal-900/50 text-teal-400 border border-teal-500/30'
                  }`}>
                    {message.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Cpu className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-[11px] font-mono tracking-wider uppercase text-slate-500">
                    {message.role === 'user' ? 'You' : 'Aura'} • {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                
                <div className={`group relative text-lg sm:text-xl leading-relaxed ${
                  message.role === 'user' 
                    ? 'text-slate-300 font-mono text-right max-w-[85%]' 
                    : 'text-slate-100 font-sans max-w-[95%]'
                }`}>
                  {message.role === 'assistant' ? (
                    <TypewriterMessage 
                      content={message.content} 
                      animated={message.animated} 
                      onUpdate={scrollToBottom} 
                    />
                  ) : (
                    message.content
                  )}

                  {message.role === 'assistant' && (
                    <div className="absolute -right-16 top-0 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => toggleReaction(message.id, 'liked')}
                        className={`p-1.5 rounded-full backdrop-blur-sm transition-all ${message.liked ? 'text-rose-400 bg-rose-400/20 border border-rose-400/30 shadow-[0_0_10px_rgba(251,113,133,0.2)]' : 'text-slate-500 bg-white/5 border border-white/10 hover:text-rose-400 hover:bg-rose-400/10'}`}
                      >
                        <Heart className={`w-4 h-4 ${message.liked ? 'fill-current' : ''}`} />
                      </button>
                      <button 
                        onClick={() => toggleReaction(message.id, 'saved')}
                        className={`p-1.5 rounded-full backdrop-blur-sm transition-all ${message.saved ? 'text-teal-400 bg-teal-400/20 border border-teal-400/30 shadow-[0_0_10px_rgba(45,212,191,0.2)]' : 'text-slate-500 bg-white/5 border border-white/10 hover:text-teal-400 hover:bg-teal-400/10'}`}
                      >
                        <Bookmark className={`w-4 h-4 ${message.saved ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-start"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center bg-teal-900/50 text-teal-400 border border-teal-500/30">
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-mono tracking-wider uppercase text-slate-500">
                    Aura • Processing
                  </span>
                </div>
                <TypingIndicator />
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Floating Input Area */}
      <div className="absolute bottom-6 left-0 right-0 px-4 pointer-events-none z-30">
        <div className="max-w-2xl mx-auto pointer-events-auto relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-50 group-focus-within:opacity-100 transition-opacity duration-500 mix-blend-screen" />
          <form 
            onSubmit={handleSubmit} 
            className="relative flex items-center gap-3 p-2 rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(255,255,255,0.1)] ring-1 ring-white/5"
          >
            <div className="pl-4 text-slate-500">
              <Command className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter command or ask a question..."
              className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-500 focus:outline-none text-base py-3"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="shrink-0 w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center hover:bg-teal-500/20 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed group/btn"
            >
              <Send className="w-4 h-4 translate-x-[-1px] group-hover/btn:translate-x-[1px] group-hover/btn:-translate-y-[1px] transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </motion.main>
  );
};

