import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Code, Users, Calendar, ArrowRight, Star, Cpu } from 'lucide-react';

const events = [
  { id: 1, title: 'AI Pitch Session', time: '10:00 AM', type: 'presentation' },
  { id: 2, title: 'Building with Gemini', time: '1:00 PM', type: 'workshop' },
  { id: 3, title: 'Code Review & Mentorship', time: '4:00 PM', type: 'networking' },
  { id: 4, title: 'Final Submissions', time: '11:59 PM', type: 'deadline' },
];

export const Hackathon = () => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'prizes'>('schedule');

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full h-full flex flex-col relative z-10 overflow-hidden"
    >
      <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-12 max-w-4xl mx-auto w-full pb-32">
        <header className="space-y-6 text-center pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 text-teal-400 text-sm font-medium border border-teal-500/20 backdrop-blur-md">
            <Trophy className="w-4 h-4" />
            <span>Capstone Hackathon 2026</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-sm">
            Build for <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Impact</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg sm:text-xl">
            Join the brightest minds to solve real-world problems using state-of-the-art AI models and modern web technologies.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/5 flex flex-col items-center text-center space-y-4 hover:bg-slate-800/40 transition-colors shadow-xl">
             <div className="w-14 h-14 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Code className="w-7 h-7" />
             </div>
             <div>
                <h3 className="font-semibold text-slate-200 text-lg">Innovation</h3>
                <p className="text-slate-500 mt-2">Push boundaries with code.</p>
             </div>
          </div>
          <div className="p-8 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/5 flex flex-col items-center text-center space-y-4 hover:bg-slate-800/40 transition-colors shadow-xl">
             <div className="w-14 h-14 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Users className="w-7 h-7" />
             </div>
             <div>
                <h3 className="font-semibold text-slate-200 text-lg">Collaboration</h3>
                <p className="text-slate-500 mt-2">Work with talented builders.</p>
             </div>
          </div>
          <div className="p-8 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/5 flex flex-col items-center text-center space-y-4 hover:bg-slate-800/40 transition-colors shadow-xl">
             <div className="w-14 h-14 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Cpu className="w-7 h-7" />
             </div>
             <div>
                <h3 className="font-semibold text-slate-200 text-lg">AI Integration</h3>
                <p className="text-slate-500 mt-2">Powered by cutting-edge models.</p>
             </div>
          </div>
        </div>

        <div className="space-y-8 pt-8">
           <div className="flex items-center justify-center gap-6 border-b border-white/5">
             <button 
                onClick={() => setActiveTab('schedule')}
                className={`pb-4 px-6 text-lg font-medium transition-colors relative ${activeTab === 'schedule' ? 'text-teal-400' : 'text-slate-500 hover:text-slate-300'}`}
             >
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Schedule
                </span>
                {activeTab === 'schedule' && (
                   <motion.div layoutId="tabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 rounded-t-full shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
                )}
             </button>
             <button 
                onClick={() => setActiveTab('prizes')}
                className={`pb-4 px-6 text-lg font-medium transition-colors relative ${activeTab === 'prizes' ? 'text-teal-400' : 'text-slate-500 hover:text-slate-300'}`}
             >
                <span className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Prizes
                </span>
                {activeTab === 'prizes' && (
                   <motion.div layoutId="tabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 rounded-t-full shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
                )}
             </button>
           </div>

           <div className="min-h-[200px]">
             {activeTab === 'schedule' ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {events.map(event => (
                    <div key={event.id} className="flex items-center justify-between p-6 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/5 hover:bg-slate-800/40 transition-colors group shadow-lg">
                       <div className="flex items-center gap-6">
                         <div className="text-base font-mono text-teal-400 w-24">{event.time}</div>
                         <div className="font-medium text-slate-200 text-lg">{event.title}</div>
                       </div>
                       <button className="text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-sm font-medium">
                         Details <ArrowRight className="w-4 h-4" />
                       </button>
                    </div>
                  ))}
                </motion.div>
             ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  <div className="p-8 rounded-3xl bg-gradient-to-br from-teal-500/10 to-transparent border border-teal-500/20 space-y-3 backdrop-blur-md shadow-xl">
                     <div className="text-3xl font-bold text-teal-400 drop-shadow-[0_0_10px_rgba(45,212,191,0.3)]">$10,000</div>
                     <div className="font-medium text-slate-200 text-xl">Grand Prize</div>
                     <p className="text-base text-slate-400">Awarded to the overall best technical implementation and real-world impact.</p>
                  </div>
                  <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 space-y-3 backdrop-blur-md shadow-xl">
                     <div className="text-3xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">$5,000</div>
                     <div className="font-medium text-slate-200 text-xl">AI Innovation</div>
                     <p className="text-base text-slate-400">For the most creative and effective use of Generative AI capabilities.</p>
                  </div>
                </motion.div>
             )}
           </div>
        </div>
      </div>
    </motion.div>
  );
};
