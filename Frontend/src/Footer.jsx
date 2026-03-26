import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pb-10 px-18 font-sans">
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-xs font-bold uppercase tracking-widest">
          
          <span className="text-2xl text-white font-black tracking-tighter">NutriScan</span>
          
          <div className="flex gap-8">
            <p>© 2026 NutriScan Intelligence Lab. All Rights Reserved.</p>
          </div>
        </div>
    </footer>
  );
}