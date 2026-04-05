import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History as HistoryIcon, Trash2, ShieldCheck, Clock, 
  ChevronDown, ChevronUp, AlertTriangle, Activity, Leaf 
} from 'lucide-react';

export default function ScanHistory() {
  const [history, setHistory] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('scan_history') || '[]');
    setHistory(savedHistory);
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const deleteItem = (e, id) => {
    e.stopPropagation();
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('scan_history', JSON.stringify(updated));
  };

  // Helper to match your original status logic
  const normalizeStatus = (status) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("safe")) return "Safe";
    if (s.includes("danger")) return "Dangerous";
    return "Cautious";
  };

  if (history.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-6">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase font-sans">Recent History</h2>
      </div>
      
      <div className="space-y-4">
        {history.map((item) => {
          const analysis = item.fullData?.ai_analysis || {};
          
          return (
            <div key={item.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden transition-all">
              
              {/* --- HEADER CARD --- */}
              <div 
                onClick={() => toggleExpand(item.id)}
                className={`p-5 flex items-center gap-5 cursor-pointer transition-colors ${expandedId === item.id ? 'bg-slate-50' : 'bg-white'}`}
              >
                <div className="w-16 h-16 bg-white rounded-2xl p-2 flex-shrink-0 border border-slate-100">
                  <img src={item.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-black text-slate-900 truncate leading-tight">{item.name}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                        <ShieldCheck size={12} /> {item.health_score}
                    </div>
                    <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1">
                        <Clock size={10} /> {item.timestamp}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={(e) => deleteItem(e, item.id)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                    <Trash2 size={20} />
                  </button>
                  <div className="text-slate-400">
                    {expandedId === item.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
              </div>

              {/* --- FULL REPORT SECTION --- */}
              <AnimatePresence>
                {expandedId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-100 overflow-hidden"
                  >
                    <div className="p-8 space-y-8 bg-white">
                      
                      {/* Score Breakdown */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-6 rounded-3xl text-center border border-slate-100">
                          <div className="text-4xl font-black text-slate-900">{analysis.health_score}</div>
                          <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Health Score</div>
                        </div>
                        <div className="bg-emerald-900 p-6 rounded-3xl text-center shadow-lg shadow-emerald-100">
                          <div className="text-4xl font-black text-emerald-300">{analysis.eco_score}</div>
                          <div className="text-[10px] font-black uppercase text-emerald-100/40 tracking-widest mt-1">Eco Score</div>
                        </div>
                      </div>

                      {/* AI Summary Section */}
                      {analysis.overall_health_summary && (
                        <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex gap-4">
                          <Activity className="text-blue-500 flex-shrink-0" size={20} />
                          <p className="text-sm font-bold text-slate-700 leading-relaxed">
                            {analysis.overall_health_summary}
                          </p>
                        </div>
                      )}

                      {/* Ingredients Full List */}
                      <div className="space-y-4">
                        <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Ingredient Audit</h3>
                        <div className="space-y-3">
                          {analysis.ingredients?.map((ing, idx) => {
                            const status = normalizeStatus(ing.status);
                            const isSafe = status === "Safe";
                            
                            return (
                              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-bold text-slate-900">{ing.name}</h4>
                                    <p className="text-[10px] text-slate-400 font-medium">{ing.sub}</p>
                                  </div>
                                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${isSafe ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                    {status}
                                  </span>
                                </div>
                                
                                {!isSafe && ing.health_risks && (
                                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 flex gap-2">
                                    <AlertTriangle size={12} className="text-amber-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-[10px] font-bold text-amber-700 leading-tight">{ing.health_risks}</p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Sustainability / Eco Summary */}
                      {analysis.sustainability?.summary && (
                        <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 flex gap-4">
                            <Leaf size={20} className="text-emerald-600 flex-shrink-0" />
                            <div>
                                <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-1">Eco Insight</p>
                                <p className="text-xs font-bold text-emerald-700 leading-relaxed">{analysis.sustainability.summary}</p>
                            </div>
                        </div>
                      )}

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}