import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import fruits from './assets/fruits.png';

const STEPS = [
  {
    id: 1,
    title: "Point & Scan",
    desc: "Our neural engine identifies barcodes instantly, even in low light or at sharp angles.",
    detail: "0.2s Detection Speed",
    icon: "🔍"
  },
  {
    id: 2,
    title: "Deep Cloud Retrieval",
    desc: "We pull data from 2M+ products across 50 countries to get the exact ingredient list.",
    detail: "Global Database Sync",
    icon: "🌐"
  },
  {
    id: 3,
    title: "AI Toxic Check",
    desc: "The AI flags hidden additives, micro-plastics, and ingredients banned in the EU.",
    detail: "2,400+ Chemicals Tracked",
    icon: "🧠"
  },
  {
    id: 4,
    title: "The Verdict",
    desc: "Get a clear 1-100 score and personal compatibility based on your unique diet.",
    detail: "Personalized Scoring",
    icon: "✅"
  }
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Side: Content Triggers */}
        <div className="space-y-4">
          <div className="mb-12">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-green-600 mb-4">The Protocol</h2>
            <h3 className="text-5xl font-black text-slate-900 leading-tight">
              Physical food to <br />
              <span className="text-slate-400 font-medium italic">digital truth.</span>
            </h3>
          </div>

          {STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              onViewportEnter={() => setActiveStep(index)}
              viewport={{ amount: 0.8 }}
              className={`p-8 rounded-[2rem] cursor-pointer transition-all duration-500 border-2 ${
                activeStep === index 
                ? "bg-slate-50 border-green-200 shadow-sm" 
                : "bg-transparent border-transparent opacity-40 hover:opacity-100"
              }`}
            >
              <div className="flex items-center gap-4 mb-2">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${activeStep === index ? "bg-green-500 text-white" : "bg-slate-200"}`}>
                  {step.id}
                </span>
                <h4 className="text-2xl font-bold text-slate-900">{step.title}</h4>
              </div>
              <p className="text-slate-500 leading-relaxed pl-12">
                {step.desc}
              </p>
              {activeStep === index && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }}
                  className="pl-12 mt-4 text-xs font-black text-green-600 uppercase tracking-widest"
                >
                  {step.detail}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Right Side: The "Magic" Phone (Sticky) */}
        <div className="hidden lg:block sticky top-24 h-[600px] perspective-1000">
          <motion.div 
            className="relative w-[320px] h-[640px] mx-auto bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden"
            animate={{ rotateY: activeStep % 2 === 0 ? 5 : -5 }}
            transition={{ duration: 1 }}
          >
            {/* Camera View / Result View */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
              >
                {/* Dynamic Content based on Step */}
                {activeStep === 0 && (
                   <div className="relative border-2 border-white/30 w-48 h-48 flex items-center justify-center rounded-3xl">
                      <div className="absolute inset-0 border-2 border-green-400 rounded-3xl animate-pulse" />
                      <span className="text-5xl">📸</span>
                   </div>
                )}
                {activeStep === 1 && (
                  <div className="space-y-4 w-full">
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} className="h-full bg-blue-400" />
                    </div>
                    <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                    <span className="text-4xl">📡</span>
                  </div>
                )}
                {activeStep === 2 && (
                   <div className="relative">
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="text-6xl">🧠</motion.div>
                      <div className="mt-4 text-rose-400 font-bold text-sm">Toxic Additive Detected</div>
                   </div>
                )}
                {activeStep === 3 && (
                   <div className="flex flex-col items-center">
                      <div className="w-32 h-32 rounded-full border-8 border-green-500 flex items-center justify-center text-4xl font-black text-white">88</div>
                      <div className="mt-4 text-green-400 font-bold uppercase tracking-widest text-xs">Healthy Choice</div>
                   </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* App Overlay */}
            <div className="absolute bottom-6 left-0 w-full px-6 flex justify-between items-center">
               <div className="w-10 h-10 rounded-full bg-white/10" />
               <div className="w-20 h-1.5 bg-white/20 rounded-full" />
               <div className="w-10 h-10 rounded-full bg-white/10" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}