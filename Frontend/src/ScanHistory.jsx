import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History as HistoryIcon, Trash2, ShieldCheck, Clock } from 'lucide-react';

export default function ScanHistory({ onSelectProduct }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('scan_history') || '[]');
    setHistory(savedHistory);
  }, []);

  const deleteItem = (e, id) => {
    e.stopPropagation(); // Prevents opening the modal when clicking delete
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('scan_history', JSON.stringify(updated));
  };

  if (history.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <HistoryIcon size={16} className="text-yellow-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 font-sans">Activity Log</span>
          </div>
          <h2 className="text-4xl font-[900] text-slate-900 tracking-tighter">History</h2>
        </div>
        <span className="bg-slate-100 px-4 py-2 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest">
          {history.length} Scans
        </span>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <motion.div 
            key={item.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            // --- ACTION: When clicked, send data to parent ---
            onClick={() => onSelectProduct(item.fullData)}
            className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-5 group cursor-pointer hover:border-yellow-400 hover:shadow-xl hover:shadow-yellow-100/20 transition-all duration-300"
          >
            {/* Thumbnail */}
            <div className="w-20 h-20 bg-slate-50 rounded-[1.8rem] p-3 flex-shrink-0 border border-slate-50 overflow-hidden">
              <img src={item.image} alt="" className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={10} className="text-slate-300" />
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{item.timestamp}</p>
              </div>
              <h4 className="text-lg font-black text-slate-900 truncate leading-tight">{item.name}</h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{item.brand}</p>
              
              <div className="flex items-center gap-3 mt-3">
                 <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-full">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    <span className="text-[10px] font-black text-emerald-700 uppercase">Score: {item.health_score}</span>
                 </div>
              </div>
            </div>

            {/* Delete Button */}
            <button 
              onClick={(e) => deleteItem(e, item.id)}
              className="p-4 text-slate-200 hover:text-rose-500 transition-colors"
            >
              <Trash2 size={22} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}