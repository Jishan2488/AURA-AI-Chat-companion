import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Home, Trophy, Info, Zap } from 'lucide-react';
import { Hackathon } from './components/Hackathon';
import { About } from './components/About';
import { Chat } from './components/Chat';

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'hackathon' | 'about'>('home');

  return (
    <div className="h-screen bg-slate-950 text-slate-100 font-sans flex flex-col relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-teal-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Floating Top Navbar */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between rounded-full bg-slate-900/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(20,184,166,0.1)] p-2 pr-4 w-[95%] max-w-2xl"
      >
        <div className="flex items-center gap-2">
           <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
             <Sparkles className="w-5 h-5 text-white" />
           </div>
           <span className="font-bold tracking-wide text-lg text-slate-100 hidden sm:block mr-4">Aura</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
           <button 
             onClick={() => setActivePage('home')} 
             className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 group ${activePage === 'home' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
           >
             {activePage === 'home' && (
               <motion.div layoutId="nav-bg-top" className="absolute inset-0 bg-white/10 rounded-full border border-white/10" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
             )}
             <Home className="w-4 h-4 relative z-10 shrink-0 group-hover:scale-110 transition-transform duration-300" />
             <span className="font-medium relative z-10 text-sm hidden sm:block">Home</span>
           </button>

           <button 
             onClick={() => setActivePage('hackathon')} 
             className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 group ${activePage === 'hackathon' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
           >
             {activePage === 'hackathon' && (
               <motion.div layoutId="nav-bg-top" className="absolute inset-0 bg-white/10 rounded-full border border-white/10" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
             )}
             <Trophy className="w-4 h-4 relative z-10 shrink-0 group-hover:scale-110 transition-transform duration-300" />
             <span className="font-medium relative z-10 text-sm hidden sm:block">Hackathon</span>
           </button>

           <button 
             onClick={() => setActivePage('about')} 
             className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 group ${activePage === 'about' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
           >
             {activePage === 'about' && (
               <motion.div layoutId="nav-bg-top" className="absolute inset-0 bg-white/10 rounded-full border border-white/10" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
             )}
             <Info className="w-4 h-4 relative z-10 shrink-0 group-hover:scale-110 transition-transform duration-300" />
             <span className="font-medium relative z-10 text-sm hidden sm:block">About</span>
           </button>
        </div>

        <button className="px-3 sm:px-4 py-2 rounded-full bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/20 text-teal-400 text-sm font-medium transition-all flex items-center gap-2 group">
           <Zap className="w-4 h-4 shrink-0 group-hover:text-cyan-400 transition-colors" />
           <span className="hidden md:block">Connect</span>
        </button>
      </motion.nav>
      
      <div className="flex-1 h-full w-full pt-28 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {activePage === 'home' && <Chat key="home" />}
          {activePage === 'hackathon' && <Hackathon key="hackathon" />}
          {activePage === 'about' && <About key="about" />}
        </AnimatePresence>
      </div>
    </div>
  );
}


