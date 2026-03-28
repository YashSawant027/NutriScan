import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="min-h-screen bg-white py-24 px-6 font-sans overflow-hidden">
      <div className="max-w-3xl mx-auto">
        
        {/* Header - Animated Slide Down */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-green-50 text-[#2ecc71] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Help Center
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Common Questions</h1>
          <p className="text-slate-500 text-lg font-medium">
            Everything you need to know about NutriScan’s technology and data.
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div 
          layout
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div 
              layout
              key={index} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`border-2 rounded-[2rem] transition-colors duration-300 overflow-hidden ${
                activeIndex === index ? 'border-[#2ecc71] bg-[#f9fffb]' : 'border-slate-50 bg-white'
              }`}
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
              >
                <span className={`font-bold text-lg md:text-xl pr-4 transition-colors duration-300 ${activeIndex === index ? 'text-[#2ecc71]' : 'text-slate-800'}`}>
                  {faq.question}
                </span>
                
                {/* Animated Arrow Circle */}
                <motion.div 
                  animate={{ 
                    rotate: activeIndex === index ? 180 : 0,
                    backgroundColor: activeIndex === index ? '#2ecc71' : '#f1f5f9',
                    color: activeIndex === index ? '#ffffff' : '#94a3b8'
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </motion.div>
              </button>
              
              {/* AnimatePresence for Smooth Content Expansion */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 md:px-8 pb-8 text-slate-500 leading-relaxed md:text-lg font-medium">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

      

      </div>
    </div>
  );
}