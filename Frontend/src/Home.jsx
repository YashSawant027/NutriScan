import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from './Navbar';
import fruits from './assets/fruits.png';
import HowItWorks from './Tutorial';
import Reviews from './Reviews';
import FAQ from './Faq';
import Footer from './Footer';
import ModernCarousel from './ModernCarousel';
import FeatureShowcase from './FeatureShowcase';
import Profile from './Profile';

export default function NutriScanLanding() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  
  // Background Parallax
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="relative min-h-screen bg-[#fdfdfd] text-slate-900 selection:bg-green-100 selection:text-green-900 overflow-x-hidden">
      
      {/* 1. Dynamic Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div style={{ y: y1 }} className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-green-100/40 rounded-full blur-[120px]" />
        <motion.div style={{ y: y2 }} className="absolute bottom-[10%] right-[-5%] w-[35rem] h-[35rem] bg-emerald-100/30 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <main className="relative pt-24 pb-32 px-6">
        <motion.div 
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 2. Hero Header */}
          <div className="flex flex-col items-center text-center mb-20">
            <motion.div variants={itemVariants} className="mb-6">
              <span className="px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-medium text-slate-600 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Powered by AI
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.95]">
              Eat <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Smarter.</span><br />
              Live Better.
            </motion.h1>

            <motion.p variants={itemVariants} className="max-w-2xl text-lg md:text-xl text-slate-500 leading-relaxed mb-10">
              Stop guessing what’s in your food. Join 50k+ users decoding labels, 
              avoiding toxins, and making <span className="text-slate-900 font-medium">greener choices</span> in real-time.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/scanning')}
                className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all"
              >
                Start Scanning — It's Free
              </motion.button>
              
            </motion.div>
          </div>

          {/* 3. Modern Bento Showcase Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto">
            
            {/* Main Feature Card - Visualizer Integrated */}
            <div className="md:col-span-8 relative bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-xl shadow-slate-100 group min-h-[500px] flex items-center">
              <div className="relative z-20 max-w-sm">
                <h3 className="text-3xl font-black mb-3 tracking-tight">Instant Nutrition Scoring</h3>
                <p className="text-slate-500 text-lg leading-relaxed">
                  Get a 1-100 score based on ingredient quality, processing levels, and hidden additives.
                </p>
                
                <div className="mt-8 flex flex-wrap gap-3">
                  {['No Bioengineering', 'Organic', 'Low Sodium'].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visualizer Elements */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="absolute right-[-5%] bottom-[-5%] w-full md:w-[60%] h-[80%] flex items-center justify-center pointer-events-none"
              >
                {/* Simulated Scanner App UI */}
                <div className="relative w-64 h-80 bg-slate-900 rounded-[2rem] border-[6px] border-slate-800 shadow-2xl overflow-hidden hidden md:block rotate-[-5deg] group-hover:rotate-0 transition-transform duration-500">
                  <div className="absolute top-0 w-full h-1 bg-green-400 shadow-[0_0_15px_#2ecc71] animate-scan-line" />
                  <img 
                    src={fruits} 
                    alt="Scanning" 
                    className="w-full h-full object-cover opacity-60 scale-125" 
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
                    <div className="flex justify-between items-center text-white">
                      <span className="text-[10px] font-bold uppercase opacity-70">Scanning...</span>
                      <span className="text-green-400 text-[10px] font-black italic">Excellent</span>
                    </div>
                    <div className="w-full bg-white/20 h-1.5 mt-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '85%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-green-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Floating Nutrition Circle */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 right-10 md:right-20 w-32 h-32 bg-white rounded-full shadow-2xl flex flex-col items-center justify-center border-8 border-green-50 z-30"
                >
                  <span className="text-4xl font-black text-slate-900 leading-none">85</span>
                  <span className="text-[10px] font-bold text-green-600 uppercase tracking-tighter">Score</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Side Stats Card */}
            <div className="md:col-span-4 bg-[#2ecc71] rounded-[2.5rem] p-10 text-white flex flex-col justify-between overflow-hidden relative group">
              <div className="z-10">
                <div className="text-6xl font-black mb-2 tracking-tighter">99.9%</div>
                <div className="text-green-100 font-medium uppercase tracking-wider text-xs">Accuracy Rate</div>
              </div>
              <div className="mt-8 z-10">
                <p className="text-xl font-medium leading-tight">
                  Our AI scans over 2 million global food products in milliseconds.
                </p>
              </div>
              {/* Decorative Pattern */}
              <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-black group-hover:scale-110 transition-transform duration-700 select-none">AI</div>
            </div>

          </motion.div>
        </motion.div>
      </main>

      {/* 4. Lower Sections */}
      <section className="relative z-10 bg-white border-t border-slate-100">
        <ModernCarousel/>
        <FeatureShowcase/>
        
        <HowItWorks />
        <FAQ />
        <Reviews />
        <Footer />
      </section>

      {/* Embedded CSS for the Scanning Animation */}
      <style>{`
        @keyframes scan-line {
          0% { top: 0%; opacity: 0.5; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0.5; }
        }
        .animate-scan-line {
          animation: scan-line 3s linear infinite;
        }
      `}</style>
    </div>
  );
}