import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Zap, Shield, Mail, Github, Twitter } from 'lucide-react';

export const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full h-full flex flex-col relative z-10 overflow-hidden"
    >
      <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-12 max-w-4xl mx-auto w-full pb-32">
        
        {/* Hero Section */}
        <div className="text-center space-y-6 pt-8">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center shadow-[0_0_30px_rgba(45,212,191,0.3)] mb-8">
             <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-sm">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Aura</span>
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Aura is a capstone project designed to showcase the intersection of modern frontend architecture and conversational AI. It serves as an empathetic concierge, helping builders brainstorm, debug, and design with confidence.
          </p>
        </div>

        {/* Mission / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/5">
           <div className="p-8 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/5 shadow-xl space-y-4 hover:bg-slate-800/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
                 <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-200 text-lg">Empathy First</h3>
              <p className="text-slate-500 leading-relaxed">
                Technology should adapt to human needs. Aura is tuned to provide supportive, constructive feedback.
              </p>
           </div>
           
           <div className="p-8 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/5 shadow-xl space-y-4 hover:bg-slate-800/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                 <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-200 text-lg">Lightning Fast</h3>
              <p className="text-slate-500 leading-relaxed">
                Built on top of Vite, React 19, and Gemini 3.5 Flash, delivering immediate responses and smooth rendering.
              </p>
           </div>

           <div className="p-8 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/5 shadow-xl space-y-4 hover:bg-slate-800/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                 <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-200 text-lg">Privacy Focused</h3>
              <p className="text-slate-500 leading-relaxed">
                Conversations stay local to your browser until explicitly saved. No unnecessary data collection.
              </p>
           </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 sm:p-10 shadow-xl">
           <h3 className="text-2xl font-semibold text-white mb-8 text-center">Built With</h3>
           <div className="flex flex-wrap justify-center gap-4">
              {['React 19', 'Tailwind CSS v4', 'Motion', 'Vite', 'TypeScript', 'Node.js', 'Express', '@google/genai'].map(tech => (
                 <span key={tech} className="px-4 py-2 rounded-xl bg-slate-800/60 text-slate-300 font-medium border border-white/10 shadow-sm hover:bg-teal-500/10 hover:text-teal-400 hover:border-teal-500/20 transition-all cursor-default">
                    {tech}
                 </span>
              ))}
           </div>
        </div>

        {/* Footer Links */}
        <div className="flex items-center justify-center gap-8 pt-12 pb-4">
           <a href="#" className="text-slate-500 hover:text-teal-400 transition-colors flex flex-col items-center gap-2 group">
             <div className="p-3 rounded-full bg-slate-800/50 group-hover:bg-teal-500/10 transition-colors">
               <Github className="w-6 h-6" />
             </div>
             <span className="text-sm font-medium">Source Code</span>
           </a>
           <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors flex flex-col items-center gap-2 group">
             <div className="p-3 rounded-full bg-slate-800/50 group-hover:bg-cyan-500/10 transition-colors">
               <Twitter className="w-6 h-6" />
             </div>
             <span className="text-sm font-medium">Updates</span>
           </a>
           <a href="#" className="text-slate-500 hover:text-rose-400 transition-colors flex flex-col items-center gap-2 group">
             <div className="p-3 rounded-full bg-slate-800/50 group-hover:bg-rose-500/10 transition-colors">
               <Mail className="w-6 h-6" />
             </div>
             <span className="text-sm font-medium">Contact</span>
           </a>
        </div>
      </div>
    </motion.div>
  );
};
