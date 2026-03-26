import React, { useState } from 'react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How does NutriScan simplify ingredient names?",
      answer: "We use a specialized AI model (FastAPI + LangChain) that references a database of over 20,000 chemical additives. It translates complex scientific terms into plain English and flags potential health risks based on WHO guidelines."
    },
    {
      question: "Where does the product data come from?",
      answer: "NutriScan fetches real-time data from the Open Food Facts API, a collaborative database of food products from around the world, ensuring our information is always up-to-date."
    },
    {
      question: "What is the Sustainability Score?",
      answer: "The Eco-Score (A to E) is calculated based on the environmental impact of the product, considering factors like packaging materials (plastic vs. paper), labels (Organic, Fairtrade), and the carbon footprint of its ingredients."
    },
    {
      question: "Does the app store my personal data?",
      answer: "No. NutriScan is designed with privacy-first principles. We only process the barcode you scan to provide nutritional analysis; we do not track your location or store your personal identity."
    },
    {
      question: "Can I scan local Indian products?",
      answer: "Yes! Our database includes a vast range of products found in Indian supermarkets, from local snacks to international brands, using standard EAN-13 barcodes."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white py-24 px-6 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-green-50 text-[#2ecc71] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Help Center
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Common Questions</h1>
          <p className="text-slate-500 text-lg">
            Everything you need to know about NutriScan’s technology and data.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border-2 rounded-3xl transition-all duration-300 overflow-hidden ${
                activeIndex === index ? 'border-[#2ecc71] bg-[#f9fffb]' : 'border-slate-50 bg-white'
              }`}
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
              >
                <span className={`font-bold text-lg md:text-xl ${activeIndex === index ? 'text-[#2ecc71]' : 'text-slate-800'}`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                  activeIndex === index ? 'bg-[#2ecc71] text-white rotate-180' : 'bg-slate-100 text-slate-400'
                }`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </button>
              
              <div className={`transition-all duration-300 ease-in-out ${
                activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 md:px-8 pb-8 text-slate-600 leading-relaxed md:text-lg">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        

      </div>
    </div>
  );
}