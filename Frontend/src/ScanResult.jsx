import React from 'react';
import { X, AlertCircle, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export default function ScanResult({ data, onClose }) {
  if (!data) return null;
  const { ai_analysis = {} } = data;
  const { 
    product_display_name, 
    brand_name, 
    health_score = 0, 
    eco_score = 0, 
    ingredients = [], 
    alerts = [], 
    sustainability = {},
    alternatives = [] 
  } = ai_analysis;

  const getStatusTheme = (status) => {
    switch (status?.toLowerCase()) {
      case 'safe': return { bg: "bg-[#F0FFF4]", text: "text-[#2D6A4F]", border: "border-[#D1FAE5]", badge: "bg-[#2D6A4F] text-white", dot: "bg-[#2D6A4F]" };
      case 'caution': return { bg: "bg-[#FFFBEB]", text: "text-[#B45309]", border: "border-[#FEF3C7]", badge: "bg-[#FF9F1C] text-white", dot: "bg-[#FF9F1C]" };
      case 'warning': 
      case 'harmful':
        return { bg: "bg-[#FFF5F5]", text: "text-[#9B1C1C]", border: "border-[#FEE2E2]", badge: "bg-[#E74C3C] text-white", dot: "bg-[#E74C3C]" };
      default: return { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-100", badge: "bg-slate-500 text-white", dot: "bg-slate-400" };
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-[#F9F9F7] w-full max-w-lg max-h-[92vh] rounded-[3rem] shadow-2xl overflow-hidden relative flex flex-col animate-in zoom-in duration-300">
        
        {/* Header */}
        <div className="p-8 pb-4 flex justify-between items-start">
          <div className="flex gap-4 items-center">
             <img src={data.image} alt="product" className="w-14 h-14 object-contain bg-white rounded-xl p-1 border shadow-sm" />
             <div className="max-w-[240px]">
                <h2 className="text-2xl font-black text-slate-800 leading-tight">{product_display_name || data.name}</h2>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{brand_name || data.brand} — {data.barcode}</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 bg-white rounded-full shadow-sm hover:bg-red-50 transition-colors"><X size={20}/></button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-10 space-y-8 no-scrollbar">
          
          {/* Health & Eco Rings */}
          <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="text-center">
               <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r="35" stroke="#F1F5F9" strokeWidth="6" fill="none" />
                    <circle cx="40" cy="40" r="35" stroke="#2D6A4F" strokeWidth="6" fill="none" strokeDasharray={220} strokeDashoffset={220 - (220 * health_score) / 100} strokeLinecap="round" />
                  </svg>
                  <span className="absolute text-xl font-black text-slate-800">{health_score}</span>
               </div>
               <p className="text-[10px] font-black uppercase text-slate-400 mt-2">Health Index</p>
            </div>
            <div className="text-center">
               <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r="35" stroke="#F1F5F9" strokeWidth="6" fill="none" />
                    <circle cx="40" cy="40" r="35" stroke="#FF9F1C" strokeWidth="6" fill="none" strokeDasharray={220} strokeDashoffset={220 - (220 * eco_score) / 100} strokeLinecap="round" />
                  </svg>
                  <span className="absolute text-xl font-black text-slate-800">{eco_score}</span>
               </div>
               <p className="text-[10px] font-black uppercase text-slate-400 mt-2">Eco Impact</p>
            </div>
          </div>

          {/* SMART SWAPS: Better Alternatives */}
          {alternatives.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-[#2ecc71] font-black text-[10px] uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                <Zap size={14} fill="#2ecc71" className="text-[#2ecc71]" /> Better Alternatives
              </h3>
              <div className="grid gap-3">
                {alternatives.map((alt, i) => (
                  <a 
                    key={i} 
                    href={alt.link || `https://www.google.com/search?q=buy+${alt.name}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white p-5 rounded-3xl border border-green-100 shadow-sm flex items-center justify-between group hover:border-[#2ecc71] hover:bg-green-50/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-50 rounded-2xl flex items-center justify-center text-[#2ecc71] group-hover:bg-[#2ecc71] group-hover:text-white transition-colors">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{alt.name}</h4>
                        <p className="text-[10px] text-slate-500 font-medium">{alt.reason}</p>
                      </div>
                    </div>
                    {/* The Arrow animates on hover of the whole card */}
                    <div className="p-2 bg-slate-50 rounded-full group-hover:bg-[#2ecc71] group-hover:text-white transition-all">
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Ingredient Analysis */}
          <div className="space-y-4">
            <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] px-1">Ingredient Analysis</h3>
            <div className="space-y-3">
              {ingredients.map((ing, i) => {
                const theme = getStatusTheme(ing.status);
                return (
                  <div key={i} className={`p-5 rounded-[2rem] border ${theme.bg} ${theme.border} flex items-center justify-between shadow-sm`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${theme.dot}`} />
                      <div className="flex flex-col">
                        <h4 className={`font-bold text-sm ${theme.text}`}>{ing.name}</h4>
                        <p className="text-[10px] opacity-60 font-bold uppercase tracking-tighter">{ing.sub}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${theme.badge}`}>{ing.status}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sustainability */}
          <div className="space-y-4">
            <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] px-1">Sustainability</h3>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(sustainability).map(([key, value]) => (
                <div key={key} className="bg-white p-4 rounded-2xl text-center border border-slate-100 shadow-sm">
                  <p className="text-[9px] font-black text-slate-300 uppercase mb-2 tracking-widest">{key}</p>
                  <span className={`text-[9px] font-black px-2 py-1 rounded border ${value === 'Low' || value === 'Recyclable' || value === 'India' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-orange-600 bg-orange-50 border-orange-100'}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="p-8 pt-0 bg-[#F9F9F7]">
          <button onClick={onClose} className="w-full bg-slate-900 text-white font-black py-5 rounded-[2rem] shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 active:scale-95">
            <ShieldCheck size={20} className="text-emerald-500" /> Dismiss Analysis
          </button>
        </div>
      </div>
    </div>
  );
}