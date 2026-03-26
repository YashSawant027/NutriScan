import React from 'react';
import ScannerPage from './Scanning';
import HowItWorks from './Tutorial';
import Reviews from './Reviews';
import FAQ from './Faq';
import Footer from './Footer';
import fruits from './assets/fruits.png';
import DemoPage from './Demo';
import Features from './Feature';

export default function NutriScanLanding() {
  return (
    // Main Container - Uses system-ui fonts to avoid external calls
    <div className="min-h-screen bg-[#f8fff9] font-sans antialiased text-slate-800">
      
      {/* 1. Navbar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-green-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-[#2ecc71] p-1.5 rounded-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 11 6A7 7 0 0 1 11 20Z" />
                <path d="M11 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                <path d="M11 21v-3" />
                <path d="M7 11h8" />
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">NutriScan</span>
          </div>
          
          {/* Navigation - Hidden on Mobile */}
          <div className="hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-widest text-slate-500">
            <a href="#demo" className="hover:text-[#2ecc71] transition-colors">Demo</a>
            <a href="#features" className="hover:text-[#2ecc71] transition-colors">Features</a>
          </div>
          
          {/* Action Button */}
          <button className="bg-[#2ecc71] text-white px-7 py-3 rounded-full font-bold shadow-lg shadow-green-200 hover:bg-[#27ae60] transition-all active:scale-95">
            Get Started
          </button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24 lg:pt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green-100/50 border border-green-200 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-[#2ecc71] rounded-full animate-pulse"></div>
            <span className="text-xs font-black uppercase tracking-widest text-green-700">Smart Food Intelligence</span>
          </div>
          
          {/* Headline - Using standard bold sans-serif */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            Know What's <br/>
            <span className="text-[#2ecc71] drop-shadow-sm">Really Inside</span><br/>
            Your Food
          </h1>
          
          {/* Subtext */}
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-lg">
            Scan any barcode to decode ingredients, spot health risks, and check sustainability — <span className="font-semibold text-slate-700">all in seconds.</span>
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#2ecc71] text-white text-lg font-bold px-10 py-5 rounded-2xl shadow-xl shadow-green-100 hover:shadow-2xl hover:-translate-y-1 transition-all">
              Try Demo
            </button>
            <button className="bg-white text-slate-700 border-2 border-slate-100 text-lg font-bold px-10 py-5 rounded-2xl hover:bg-slate-50 transition-all">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Content - Visual Representation */}
        <div className="relative">
          {/* Decorative background shape */}
          <div className="absolute -inset-4 bg-green-200/30 rounded-[4rem] blur-3xl -z-10"></div>
          
          {/* The Main Illustration Card */}
          <div className="bg-[#e9fbed] rounded-[3rem] aspect-[4/3] flex items-center justify-center p-5 border-8 border-white shadow-2xl relative overflow-hidden group">
            
            <img src={fruits} alt="Logo"  className="w-full rounded-[3rem] h-full object-contain" />
          </div>
        </div>
      </main>

      {/* Footer / Features Preview */}
      <footer className="max-w-7xl mx-auto px-6 border-t border-slate-100 py-12 flex flex-wrap justify-between gap-8 text-slate-400 font-medium text-sm">
        <p>© 2026 NutriScan. Built for healthier choices.</p>
        <div className="flex gap-8 uppercase tracking-widest text-[10px]">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
        </div>
      </footer>
      <ScannerPage/>
      <HowItWorks/>
      <Reviews/>
      <FAQ/>
      <DemoPage/>
      <Features/>
      <Footer/>
    </div>
  );
}


