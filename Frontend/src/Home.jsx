import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // 1. Import motion
import Navbar from './Navbar';
import fruits from './assets/fruits.png';
import HowItWorks from './Tutorial';
import Reviews from './Reviews';
import FAQ from './Faq';
import Footer from './Footer';

export default function NutriScanLanding() {
  const navigate = useNavigate();

  // Animation variants for cleaner code
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    visible: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-[#f8fff9] font-sans antialiased text-slate-800 overflow-x-hidden">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24 lg:pt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content - Animated with Stagger */}
        <motion.div 
          className="space-y-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Badge */}
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 bg-green-100/50 border border-green-200 px-4 py-2 rounded-full"
          >
            <div className="w-2 h-2 bg-[#2ecc71] rounded-full animate-pulse"></div>
            <span className="text-xs font-black uppercase tracking-widest text-green-700">Smart Food Intelligence</span>
          </motion.div>
          
          {/* Heading */}
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight"
          >
            Know What's <br/> <span className="text-[#2ecc71] drop-shadow-sm">Really Inside</span> <br/> Your Food
          </motion.h1>
          
          {/* Subtext */}
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-lg"
          >
            Scan any barcode to decode ingredients, spot health risks, and check sustainability — <span className="font-semibold text-slate-700">all in seconds.</span>
          </motion.p>
          
          {/* Button - Added a hover scale effect */}
          <motion.div variants={fadeInUp} className="pt-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/scanning')} 
              className="bg-[#2ecc71] text-white text-lg font-bold px-10 py-5 rounded-2xl shadow-xl shadow-green-100 hover:shadow-2xl transition-all"
            >
              Start Scanning
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Content - Floating Image Animation */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Decorative background blur */}
          <div className="absolute -inset-4 bg-green-200/30 rounded-[4rem] blur-3xl -z-10"></div>
          
          {/* Card with Floating effect */}
          <motion.div 
            animate={{ y: [0, -15, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="bg-[#e9fbed] rounded-[3rem] aspect-[4/3] flex items-center justify-center p-5 border-8 border-white shadow-2xl relative overflow-hidden group"
          >
            <img 
              src={fruits} 
              alt="Visual" 
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
            />
          </motion.div>
        </motion.div>
      </main>

      {/* Adding a simple scroll-reveal to lower sections */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <HowItWorks />
        <FAQ />
        <Reviews />
        <Footer />
      </motion.div>
    </div>
  );
}