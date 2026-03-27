import React from 'react';
import {Menu, X} from 'lucide-react';
import { useState } from 'react'
import ScannerPage from './Scanning';
import HowItWorks from './Tutorial';
import Reviews from './Reviews';
import FAQ from './Faq';
import Footer from './Footer';
import fruits from './assets/fruits.png';
import DemoPage from './Demo';
import Features from './Feature';

export default function NutriScanLanding() {

  const tabs = ['Home', 'Features' ]
  const newUser = ['Login', 'Register']
  const ta = ['Home', 'Features', 'Login', 'Register']
  const [isopen, setisopen] = useState(false)

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
          <ul className="hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-widest text-slate-500">
            
              {tabs.map((tab, index) => (
            <li className='text-black text-[15px] py-2 px-3 rounded-[10px] cursor-pointer overflow-hidden relative group hover:text-[#2ecc71]'>
              <span className='relative z-10'>{tab}</span></li>
            ))}
          </ul>
          
{/* login register */}
          <ul className="hidden md:flex items-center gap-5 text-sm font-bold uppercase tracking-widest text-slate-500">
              
            <li className='bg-white py-4 px-5 rounded-[10px] text-black border hover:text-white cursor-pointer overflow-hidden relative group'>
              <span className='bg-gray-700 top-0 left-0 w-0 h-full absolute group-hover:w-full transition-all duration-300 z-0'></span>
              <span className='relative z-10'>Login</span></li>
            
            <li className='bg-gray-800 py-4 px-5 rounded-[10px] text-white cursor-pointer overflow-hidden relative group'>
              <span className='bg-gray-700 top-0 left-0 w-0 h-full absolute group-hover:w-full transition-all duration-300 z-0'></span>
              <span className='relative z-10'>Register</span></li>
          </ul>
          
          {/* hamburger */}
          <button className='md:hidden relative flex justify-center items-center' onClick={() => setisopen(!isopen)}>
            <Menu className={`absolute transition-all duration-300 ${isopen? 'opacity-0 rotate-90' : 'opacity-100 rotate-0' }`}/>
            <X className={`absolute transition-all duration-300 ${isopen? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}/>
          </button>
        </div>

        
        <div className='md:hidden relative'>
          <ul className={`flex flex-col bg-white  absolute right-0 transition-all duration-300 gap-4 ${isopen? 'w-[80vw] h-[70vh] ': 'w-0 h-0'}`}>
            {tabs.map((t, index) => (
            <li className='text-center mt-5 py-2 px-3 rounded-[10px] cursor-pointer overflow-hidden hover:text-[#2ecc71] text-black relative group'>
              {t}</li>
            ))}
            {newUser.map((t, index) => (
            <li className='text-center mt-5 py-2 px-3 rounded-[10px] cursor-pointer overflow-hidden hover:text-[#2ecc71] text-white bg-black mx-8 relative group'>
              {t}</li>
            ))}
          </ul>
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

      
      <ScannerPage/>
      <HowItWorks/>
      
      <FAQ/>
      <Reviews/>
      {/* <DemoPage/> */}
      {/* <Features/> */}
      <Footer/>
    </div>
  );
}


