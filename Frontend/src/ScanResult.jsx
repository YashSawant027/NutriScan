import React from 'react';
import { X, AlertCircle, CheckCircle2, Leaf, ShieldCheck } from 'lucide-react';

export default function ScanResult({ data, onClose }) {
  if (!data) return null;

  const { ai_analysis = {} } = data;
  const { health_score = 0, ingredients = [], alerts = [] } = ai_analysis;

  // Professional Color Mapper
  const getStatusTheme = (status) => {
    switch (status?.toLowerCase()) {
      case 'safe': 
        return { 
          bg: "bg-[#F0FFF4]", 
          text: "text-[#2D6A4F]", 
          border: "border-[#D1FAE5]", 
          badge: "bg-[#2D6A4F] text-white",
          dot: "bg-[#2D6A4F]"
        };
      case 'caution': 
        return { 
          bg: "bg-[#FFFBEB]", 
          text: "text-[#B45309]", 
          border: "border-[#FEF3C7]", 
          badge: "bg-[#FF9F1C] text-white",
          dot: "bg-[#FF9F1C]"
        };
      case 'warning': 
        return { 
          bg: "bg-[#FFF5F5]", 
          text: "text-[#9B1C1C]", 
          border: "border-[#FEE2E2]", 
          badge: "bg-[#E74C3C] text-white",
          dot: "bg-[#E74C3C]"
        };
      default: 
        return { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-100", badge: "bg-slate-500 text-white", dot: "bg-slate-400" };
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#F9F9F7] w-full max-w-lg max-h-[92vh] rounded-[3rem] shadow-2xl overflow-hidden relative flex flex-col animate-in zoom-in duration-300">
        
        {/* Header Section */}
        <div className="p-8 pb-4 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">{data.name}</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">{data.brand}</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white rounded-full shadow-sm hover:bg-red-50 transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-10 space-y-8">
          
          {/* Health Score Summary Card */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6">
            <div className="relative w-20 h-20 flex items-center justify-center">
               <svg className="w-full h-full -rotate-90">
                 <circle cx="40" cy="40" r="35" stroke="#F1F5F9" strokeWidth="6" fill="none" />
                 <circle cx="40" cy="40" r="35" stroke="#2D6A4F" strokeWidth="6" fill="none" 
                   strokeDasharray={220} strokeDashoffset={220 - (220 * health_score) / 100} strokeLinecap="round" />
               </svg>
               <span className="absolute text-xl font-black text-slate-800">{health_score}</span>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Analysis Summary</p>
              <p className="text-sm font-bold text-slate-600 mt-1 leading-snug">
                {health_score > 70 ? "This product is mostly natural and safe for consumption." : "This product contains several processed additives."}
              </p>
            </div>
          </div>

          {/* Alert Section (Only if Warning exists) */}
          {alerts.length > 0 && (
            <div className="bg-[#FFF5F5] border border-[#FEE2E2] rounded-3xl p-6">
              <h3 className="text-[#9B1C1C] font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                <AlertCircle size={16} /> Critical Alerts
              </h3>
              <ul className="space-y-3">
                {alerts.map((alert, i) => (
                  <li key={i} className="text-xs font-bold text-[#9B1C1C] flex gap-2">
                    <span>•</span> {alert}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ingredients List with Theme Logic */}
          <div className="space-y-4">
            <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] px-1">Ingredient Breakdown</h3>
            <div className="space-y-3">
              {ingredients.map((ing, i) => {
                const theme = getStatusTheme(ing.status);
                return (
                  <div key={i} className={`p-5 rounded-[2rem] border ${theme.bg} ${theme.border} flex items-center justify-between transition-transform active:scale-95 cursor-pointer`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${theme.dot}`} />
                      <div>
                        <h4 className={`font-bold text-sm ${theme.text}`}>{ing.name}</h4>
                        <p className="text-[10px] opacity-60 font-bold uppercase tracking-tighter">Category: {ing.sub}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${theme.badge}`}>
                      {ing.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-8 pt-0 bg-gradient-to-t from-[#F9F9F7] to-transparent">
          <button 
            onClick={onClose}
            className="w-full bg-slate-900 text-white font-black py-5 rounded-[2rem] shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck size={20} className="text-[#2D6A4F]" />
            Complete Analysis
          </button>
        </div>
      </div>
    </div>
  );
}