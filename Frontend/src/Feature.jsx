import React from 'react';
import { ScanFace, BrainCircuit, Globe, Leaf, ShieldCheck, Zap } from 'lucide-react';

export default function Features() {
  const mainFeatures = [
    {
      title: "Smart Barcode Engine",
      desc: "High-speed recognition of EAN-13 and UPC codes using low-latency camera processing.",
      icon: <ScanFace className="text-[#2ecc71]" size={32} />,
      bgColor: "bg-green-50"
    },
    {
      title: "AI Ingredient Decoder",
      desc: "Powered by LangChain and LLMs to translate complex chemicals into simple, human terms.",
      icon: <BrainCircuit className="text-blue-500" size={32} />,
      bgColor: "bg-blue-50"
    },
    {
      title: "Global Food Database",
      desc: "Instant access to over 3 million products via the Open Food Facts worldwide network.",
      icon: <Globe className="text-purple-500" size={32} />,
      bgColor: "bg-purple-50"
    },
    {
      title: "Sustainability Scoring",
      desc: "Analyze the environmental footprint based on packaging, carbon data, and sourcing.",
      icon: <Leaf className="text-emerald-500" size={32} />,
      bgColor: "bg-emerald-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white py-24 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-[#2ecc71] font-bold uppercase tracking-widest text-sm mb-4">Core Capabilities</h2>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
            Everything you need to <br/> shop with confidence.
          </h1>
          <p className="text-slate-500 text-xl leading-relaxed">
            NutriScan combines advanced computer vision with generative AI to give you a lab-grade analysis in the palm of your hand.
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Large Feature */}
          <div className="md:col-span-2 bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="bg-[#2ecc71] w-14 h-14 rounded-2xl flex items-center justify-center mb-8">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4">Personalized Health Alerts</h3>
                <p className="text-slate-400 text-lg max-w-md">
                  Set custom preferences for allergies, vegan diets, or low-sugar requirements. Our AI flags ingredients specific to your needs.
                </p>
              </div>
            </div>
            {/* Decorative background circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#2ecc71] blur-[150px] opacity-20 -mr-20 -mt-20 transition-all group-hover:opacity-30"></div>
          </div>

          {/* Side Feature 1 */}
          <div className="bg-emerald-50 rounded-[3rem] p-10 border border-emerald-100 flex flex-col justify-between">
            <div className="text-emerald-600 mb-6">
              <Zap size={40} fill="currentColor" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-3">Instant Speed</h3>
              <p className="text-emerald-700/70 text-sm leading-relaxed">
                Optimized FastAPI backend ensures results are delivered in under 500ms.
              </p>
            </div>
          </div>

          {/* Bottom Grid Rows */}
          {mainFeatures.map((f, i) => (
            <div key={i} className={`${f.bgColor} rounded-[3rem] p-10 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
              <div className="mb-6">{f.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}

        </div>

        

      </div>
    </div>
  );
}