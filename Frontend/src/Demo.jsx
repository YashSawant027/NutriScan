import React, { useState } from 'react';
import { Play, ShieldCheck, Zap, Leaf, AlertTriangle } from 'lucide-react';

export default function DemoPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setShowResult(false);
    // Simulate API delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#f8fff9] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#2ecc71] font-bold uppercase tracking-[0.3em] text-xs mb-4">Interactive Experience</h2>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">See the AI in Action.</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Experience how NutriScan decodes complex ingredients into simple health insights in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: The Simulator Tool */}
          <div className="bg-white rounded-[3rem] p-8 shadow-xl shadow-green-100/50 border border-green-50">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Play className="text-[#2ecc71] fill-[#2ecc71]" size={20} />
              Live Simulator
            </h3>
            
            <div className="relative aspect-video bg-slate-900 rounded-[2rem] overflow-hidden group mb-8">
              {/* Mock Video Feed */}
              <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1510511459019-5dee995d362c?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center"></div>
              
              {/* Scan Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-[#2ecc71] rounded-3xl relative">
                  <div className="absolute w-full h-1 bg-[#2ecc71] shadow-[0_0_20px_#2ecc71] animate-bounce opacity-80"></div>
                </div>
              </div>

              {isAnalyzing && (
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                  <div className="w-12 h-12 border-4 border-[#2ecc71] border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="font-bold tracking-widest uppercase text-xs">AI Processing...</p>
                </div>
              )}
            </div>

            <button 
              onClick={simulateAnalysis}
              disabled={isAnalyzing}
              className="w-full bg-[#2ecc71] hover:bg-[#27ae60] text-white font-bold py-5 rounded-2xl transition-all shadow-lg shadow-green-200 active:scale-95 disabled:opacity-50"
            >
              {isAnalyzing ? "Analyzing Ingredients..." : "Simulate Product Scan"}
            </button>
          </div>

          {/* Right: The Analysis Result (AI Brain) */}
          <div className={`transition-all duration-700 ${showResult ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-10 pointer-events-none'}`}>
            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
              
              {/* Top Banner */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className="text-2xl font-black text-slate-900">Organic Almond Milk</h4>
                  <p className="text-slate-400 font-medium">Barcode: 8901234567890</p>
                </div>
                <div className="bg-green-500 text-white w-14 h-14 rounded-2xl flex flex-col items-center justify-center">
                  <span className="text-xs font-bold leading-none">SCORE</span>
                  <span className="text-xl font-black">A+</span>
                </div>
              </div>

              {/* Insight Chips */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl border border-green-100">
                  <ShieldCheck className="text-green-600" />
                  <div>
                    <p className="font-bold text-green-900 text-sm">Clean Label</p>
                    <p className="text-xs text-green-700">No hidden artificial sweeteners detected.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <Leaf className="text-blue-600" />
                  <div>
                    <p className="font-bold text-blue-900 text-sm">Eco-Friendly</p>
                    <p className="text-xs text-blue-700">Recyclable Tetra Pak packaging used.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <AlertTriangle className="text-amber-600" />
                  <div>
                    <p className="font-bold text-amber-900 text-sm">Allergen Alert</p>
                    <p className="text-xs text-amber-700">Contains Tree Nuts (Almonds).</p>
                  </div>
                </div>
              </div>

              {/* Bottom Breakdown */}
              <div className="mt-8 pt-8 border-t border-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-2 text-[#2ecc71]">
                  <Zap size={18} fill="#2ecc71" />
                  <span className="font-bold text-sm">Powered by NutriAI 2.0</span>
                </div>
                <button className="text-slate-400 font-bold text-xs uppercase hover:text-slate-600 transition-colors">
                  View Full Report
                </button>
              </div>
            </div>
          </div>

        </div>

        

      </div>
    </div>
  );
}