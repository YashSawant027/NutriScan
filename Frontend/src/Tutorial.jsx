import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Scan the Barcode",
      description: "Use your camera or upload a photo from your gallery. Our system instantly detects the EAN/UPC code.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
          <rect x="7" y="12" width="10" height="0.5" fill="currentColor" />
        </svg>
      )
    },
    {
      id: "02",
      title: "Data Retrieval",
      description: "NutriScan connects to global food databases to fetch a complete list of ingredients and nutritional facts.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          <path d="M12 3v18M3 12h18" />
        </svg>
      )
    },
    {
      id: "03",
      title: "AI Analysis",
      description: "Our AI engine simplifies complex chemical names and identifies potential health risks like hidden sugars or allergens.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      )
    },
    {
      id: "04",
      title: "Health & Eco Scoring",
      description: "Finally, we calculate a sustainability score based on packaging and sourcing to help you shop responsibly.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M11 20A7 7 0 0 1 11 6A7 7 0 0 1 11 20Z" />
          <path d="M11 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white py-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-[#2ecc71] font-bold uppercase tracking-[0.2em] text-sm mb-4">The Process</h2>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Advanced Intelligence <br className="hidden md:block"/> Behind Every Scan.
          </h1>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step) => (
            <div key={step.id} className="group relative">
              {/* Step Number Background */}
              <span className="absolute -top-10 -left-4 text-8xl font-black text-slate-50 opacity-10 select-none group-hover:text-[#2ecc71] transition-colors duration-500">
                {step.id}
              </span>
              
              {/* Content Card */}
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#f0fff4] text-[#2ecc71] rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        

        
      </div>
    </div>
  );
}