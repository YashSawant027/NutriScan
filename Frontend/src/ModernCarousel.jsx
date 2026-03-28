import React from 'react';
import { motion } from 'framer-motion';

const STANDARDS = [
  { id: 1, label: 'Organic Cert', icon: '🌿', color: 'border-emerald-100 bg-emerald-50/30' },
  { id: 2, label: 'Non-GMO', icon: '🧬', color: 'border-blue-100 bg-blue-50/30' },
  { id: 3, label: 'Gluten Free', icon: '🌾', color: 'border-amber-100 bg-amber-50/30' },
  { id: 4, label: 'Eco-Friendly', icon: '🌍', color: 'border-teal-100 bg-teal-50/30' },
  { id: 5, label: 'Sugar Free', icon: '🍬', color: 'border-rose-100 bg-rose-50/30' },
  { id: 6, label: 'Vegan Safe', icon: '🥕', color: 'border-orange-100 bg-orange-50/30' },
];

export default function ModernCarousel() {
  // Triple the items to ensure no "white space" during the infinite loop
  const displayItems = [...STANDARDS, ...STANDARDS, ...STANDARDS];

  return (
    <section className="py-12 bg-[#fdfdfd] border-y border-slate-50 overflow-hidden relative">
      {/* 1. Side Fades - Creates the "Emerging from Nothing" look */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#fdfdfd] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#fdfdfd] to-transparent z-10 pointer-events-none" />

      {/* 2. Compact Title */}
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
          Global Safety Protocols
        </span>
      </div>

      {/* 3. The Ribbon */}
      <div className="flex items-center">
        <motion.div
          className="flex gap-4 px-4"
          animate={{
            x: [0, -1800], // Adjust this number based on total items width
          }}
          transition={{
            duration: 35, // Slow, elegant speed
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {displayItems.map((item, index) => (
            <div
              key={index}
              className={`flex-shrink-0 flex items-center gap-4 px-6 py-4 rounded-2xl border ${item.color} backdrop-blur-sm group hover:border-slate-300 transition-colors duration-500`}
            >
              {/* Icon with subtle pulse */}
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800 whitespace-nowrap leading-none">
                  {item.label}
                </span>
                <span className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-tighter italic">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}