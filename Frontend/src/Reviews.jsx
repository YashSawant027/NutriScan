import React from 'react';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    id: 1,
    content: "Finally, an app that doesn't just show calories but actually explains the chemicals. It changed how I shop for my kids.",
    author: "Sarah Jenkins",
    role: "Health Coach",
    rating: 5,
    size: "large", // This will take more space
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 2,
    content: "The barcode scanner is lightning fast. Faster than Yuka or Foodvisor.",
    author: "Marc Andre",
    role: "Athlete",
    rating: 5,
    size: "small",
    avatar: "https://i.pravatar.cc/150?u=marc"
  },
  {
    id: 3,
    content: "As someone with a severe nut allergy, the 'Persona' mode is a literal lifesaver. It flags cross-contamination risks I used to miss.",
    author: "Elena Rodriguez",
    role: "Verified User",
    rating: 5,
    size: "medium",
    avatar: "https://i.pravatar.cc/150?u=elena"
  },
  {
    id: 4,
    content: "The clean UI and the 1-100 scoring system make nutrition actually fun to track.",
    author: "James Chen",
    role: "Software Engineer",
    rating: 5,
    size: "small",
    avatar: "https://i.pravatar.cc/150?u=james"
  },
  {
    id: 5,
    content: "I love the sustainability metrics. Knowing the carbon footprint of my snacks helps me shop more consciously.",
    author: "Mia Thorne",
    role: "Eco-Activist",
    rating: 5,
    size: "medium",
    avatar: "https://i.pravatar.cc/150?u=mia"
  }
];

export default function Reviews() {
  return (
    <section className="py-24 px-6 bg-[#fcfdfc]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4"
          >
            Loved by <span className="text-green-500">50,000+</span> health seekers.
          </motion.h2>
          <p className="text-slate-500 text-lg">Real stories from people who took control of their plate.</p>
        </div>

        {/* Bento Review Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {TESTIMONIALS.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`break-inside-avoid bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-green-100 transition-all group relative overflow-hidden`}
            >
              {/* Subtle Quote Icon */}
              <div className="absolute -top-2 -right-2 text-slate-50 opacity-[0.05] text-8xl font-black group-hover:text-green-50 transition-colors">
                “
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>

              <p className="text-slate-700 text-lg leading-relaxed mb-8 relative z-10">
                "{review.content}"
              </p>

              <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                <img 
                  src={review.avatar} 
                  alt={review.author} 
                  className="w-12 h-12 rounded-full grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div>
                  <h4 className="font-bold text-slate-900 flex items-center gap-1">
                    {review.author}
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 1.414z" />
                    </svg>
                  </h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          
        </motion.div>
      </div>
    </section>
  );
}