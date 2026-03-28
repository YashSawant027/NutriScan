import React from 'react';
import { motion } from 'framer-motion';

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      name: "Aditya Sharma",
      role: "Fitness Enthusiast",
      initials: "AS",
      rating: 5,
      date: "March 15, 2026",
      comment: "NutriScan has completely changed how I shop. I never realized how much hidden sugar was in my 'healthy' yogurt. The AI simplification is a lifesaver!",
      verified: true
    },
    {
      id: 2,
      name: "Priya Kapur",
      role: "Mother of Two",
      initials: "PK",
      rating: 5,
      date: "March 10, 2026",
      comment: "Finally, an app that explains ingredients in plain English. Identifying allergens is so much faster now. Highly recommended for parents.",
      verified: true
    },
    {
      id: 3,
      name: "Rahul Varma",
      role: "Student",
      initials: "RV",
      rating: 4,
      date: "February 28, 2026",
      comment: "The sustainability score is a great touch. It's not just about my health, but the planet's health too. Great UI and very fast scanning.",
      verified: true
    }
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const Stars = ({ fill }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < fill ? "#f1c40f" : "#e2e8f0"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfdfd] py-24 px-6 font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
        >
          <div>
            <h2 className="text-[#2ecc71] font-bold uppercase tracking-widest text-xs mb-3">User Feedback</h2>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              What our community <br/> is saying.
            </h1>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6"
          >
            <div className="text-center">
              <span className="block text-4xl font-black text-slate-900">4.9</span>
              <Stars fill={5} />
            </div>
            <div className="h-12 w-px bg-slate-100"></div>
            <p className="text-sm text-slate-500 font-medium leading-tight">
              Based on 1,200+ <br/> scanned products.
            </p>
          </motion.div>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reviews.map((review) => (
            <motion.div 
              key={review.id} 
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" 
              }}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                    className="w-12 h-12 bg-green-50 text-[#2ecc71] rounded-2xl flex items-center justify-center font-bold text-lg"
                  >
                    {review.initials}
                  </motion.div>
                  {review.verified && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1 text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-tighter"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                      Verified
                    </motion.span>
                  )}
                </div>

                <Stars fill={review.rating} />
                
                <p className="text-slate-600 mt-6 leading-relaxed italic font-medium">
                  "{review.comment}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50">
                <h4 className="font-bold text-slate-900">{review.name}</h4>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                  {review.role} • {review.date}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}