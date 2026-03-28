import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INGREDIENTS = [
  { 
    name: 'Titanium Dioxide', 
    level: 'Dangerous', 
    color: 'text-rose-600', 
    bg: 'bg-rose-100', 
    desc: 'Banned in the EU. Linked to DNA damage and gut inflammation.' 
  },
  { 
    name: 'Maltodextrin', 
    level: 'Cautious', 
    color: 'text-amber-600', 
    bg: 'bg-amber-100', 
    desc: 'High glycemic index. May spike blood sugar rapidly.' 
  },
  { 
    name: 'Organic Kale', 
    level: 'Safe', 
    color: 'text-emerald-600', 
    bg: 'bg-emerald-100', 
    desc: 'Nutrient-dense superfood. Rich in Vitamin K and antioxidants.' 
  }
];

export default function FeatureShowcase() {
  const [hoveredIng, setHoveredIng] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* 1. INTERACTIVE TOOLTIP CARD (Span 7) */}
      <div className="lg:col-span-7 bg-white border border-slate-100 rounded-[3rem] p-8 md:p-12 shadow-xl shadow-slate-100 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-3xl font-black mb-6 tracking-tight text-slate-900">Live Label Decoder</h3>
          <p className="text-slate-500 text-lg mb-8 max-w-md leading-relaxed">
            We categorize every additive so you don't have to. Hover to see the <span className="text-slate-900 font-bold">Science-backed</span> breakdown.
          </p>

          <div className="space-y-4">
            {INGREDIENTS.map((ing) => (
              <div 
                key={ing.name}
                onMouseEnter={() => setHoveredIng(ing)}
                onMouseLeave={() => setHoveredIng(null)}
                className="group relative p-5 bg-slate-50 rounded-2xl border border-slate-100 cursor-help transition-all hover:bg-white hover:shadow-lg hover:border-slate-200"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 text-lg">{ing.name}</span>
                  <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${ing.bg} ${ing.color}`}>
                    {ing.level}
                  </span>
                </div>

                <AnimatePresence>
                  {hoveredIng?.name === ing.name && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute left-0 top-full mt-3 z-30 w-full p-5 bg-slate-900 text-white rounded-[1.5rem] shadow-2xl text-sm leading-relaxed"
                    >
                      <p className="opacity-90">{ing.desc}</p>
                      <div className="absolute -top-1 left-10 w-4 h-4 bg-slate-900 rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. REPLACED CARD: GLOBAL IMPACT & ECO DASHBOARD (Span 5) */}
      <div className="lg:col-span-5 bg-slate-900 rounded-[3rem] p-10 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="z-10">
          <h3 className="text-2xl font-bold mb-6">Product Intelligence</h3>
          
          <div className="space-y-6">
            {/* Eco Score Metric */}
            <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Eco Rating</div>
                  <div className="text-3xl font-black">Grade A+</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">CO2 Impact</div>
                  <div className="text-sm font-bold text-slate-300">0.4kg / unit</div>
                </div>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '92%' }}
                  className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981]"
                />
              </div>
            </div>

            {/* Processing Level Metric */}
            <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center text-amber-500 text-xl font-bold border border-amber-500/30">
                  !
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-500 uppercase">Processing Level</div>
                  <div className="text-lg font-bold">Ultra-Processed</div>
                  <p className="text-xs text-slate-400 mt-1">High refinement & artificial additives detected.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Counter */}
        <div className="mt-8 pt-8 border-t border-white/10 z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Scan Network</span>
          </div>
          <div className="text-3xl font-black tracking-tighter">2,481,092</div>
          <p className="text-xs text-slate-500 mt-1">Products analyzed in our live database.</p>
        </div>

        {/* Decorative Mesh Gradient Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
      </div>

    </section>
  );
}