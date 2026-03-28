import React from 'react';
import { motion } from 'framer-motion';
import { X, ShieldCheck, Zap, ArrowRight, Leaf, AlertTriangle, Activity } from 'lucide-react';

export default function ScanResult({ data, onClose }) {
  if (!data) return null;

  const { ai_analysis = {} } = data;

  const {
    product_display_name,
    brand_name,
    health_score = 0,
    eco_score = 0,
    ingredients = [],
    overall_health_summary = "",
    sustainability = {},
    alternatives = []
  } = ai_analysis;


  // Normalize AI Status (IMPORTANT)
  const normalizeStatus = (status) => {
    const s = status?.toLowerCase();

    if (!s) return "Safe";

    if (s.includes("safe")) return "Safe";
    if (s.includes("danger")) return "Dangerous";
    if (s.includes("caution")) return "Cautious";

    return "Cautious"; // fallback
  };


  const getStatusTheme = (status) => {
    switch (normalizeStatus(status).toLowerCase()) {
      case 'safe':
        return {
          color: "#10b981",
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/20",
          text: "text-emerald-600",
          dark: "bg-emerald-600"
        };

      case 'cautious':
        return {
          color: "#f59e0b",
          bg: "bg-amber-500/10",
          border: "border-amber-500/20",
          text: "text-amber-600",
          dark: "bg-amber-500"
        };

      case 'dangerous':
        return {
          color: "#f43f5e",
          bg: "bg-rose-500/10",
          border: "border-rose-500/20",
          text: "text-rose-600",
          dark: "bg-rose-600"
        };

      default:
        return {
          color: "#64748b",
          bg: "bg-slate-500/10",
          border: "border-slate-500/20",
          text: "text-slate-600",
          dark: "bg-slate-500"
        };
    }
  };


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 overflow-hidden">

      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
      />

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-white w-full max-w-2xl h-full md:h-auto md:max-h-[90vh] rounded-t-[3rem] md:rounded-[3.5rem] shadow-xl relative flex flex-col overflow-hidden"
      >

        {/* Header */}
        <div className="sticky top-0 z-20 bg-white px-8 pt-10 pb-6 flex justify-between items-center border-b">

          <div className="flex gap-5 items-center">
            <img
              src={data.image}
              alt="product"
              className="w-16 h-16 object-contain bg-white rounded-2xl p-2 border"
            />

            <div>
              <h2 className="text-2xl font-black text-slate-900">
                {product_display_name || data.name}
              </h2>

              <div className="flex gap-2 text-xs text-slate-400 font-bold">
                <span>{brand_name || data.brand}</span>
                <span>•</span>
                <span>{data.barcode}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-3 bg-slate-100 rounded-full hover:bg-rose-50"
          >
            <X size={20} />
          </button>

        </div>


        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8 space-y-10">

          {/* Scores */}
          <div className="grid grid-cols-2 gap-4">

            <div className="bg-white p-8 rounded-3xl border text-center">
              <div className="text-5xl font-black">{health_score}</div>
              <div className="text-xs text-slate-400 font-bold">
                <ShieldCheck size={12} className="inline mr-1" />
                Health Score
              </div>
            </div>

            <div className="bg-emerald-900 text-white p-8 rounded-3xl text-center">
              <div className="text-5xl font-black text-emerald-300">
                {eco_score}
              </div>
              <div className="text-xs">
                <Leaf size={12} className="inline mr-1" />
                Eco Score
              </div>
            </div>

          </div>


          {/* AI Summary */}
          {overall_health_summary && (
            <div className="bg-blue-50 p-6 rounded-3xl border">
              <div className="flex gap-3">
                <Activity className="text-blue-500" />
                <p className="text-sm font-semibold text-slate-700">
                  {overall_health_summary}
                </p>
              </div>
            </div>
          )}


          {/* Ingredients */}
          <div className="space-y-4">

            <h3 className="text-xs font-black uppercase text-slate-400">
              Ingredient Audit
            </h3>

            {ingredients.map((ing, i) => {

              const status = normalizeStatus(ing.status);
              const theme = getStatusTheme(status);

              return (
                <div
                  key={i}
                  className="bg-white p-6 rounded-3xl border space-y-3"
                >

                  <div className="flex justify-between">

                    <div>
                      <h4 className="font-black">{ing.name}</h4>
                      <span className="text-xs text-slate-400">
                        {ing.sub}
                      </span>
                    </div>

                    <span
                      className={`px-4 py-1 rounded-full text-xs font-black ${theme.bg} ${theme.text}`}
                    >
                      {status}
                    </span>

                  </div>

                  {status !== "Safe" && (
                    <div
                      className={`p-4 rounded-xl ${theme.bg} border ${theme.border} flex gap-3`}
                    >
                      <AlertTriangle size={16} className={theme.text} />

                      <p className={`text-xs ${theme.text}`}>
                        {ing.health_risks}
                      </p>

                    </div>
                  )}

                </div>
              );

            })}

          </div>


          {/* Alternatives */}
          {alternatives.length > 0 && (
            <div className="space-y-4">

              <h3 className="text-xs font-black uppercase text-slate-400">
                Better Alternatives
              </h3>

              {alternatives.map((alt, i) => (

                <a
                  key={i}
                  href={alt.link}
                  target="_blank"
                  rel="noopener"
                  className="block bg-emerald-50 p-6 rounded-3xl border"
                >

                  <div className="flex justify-between">

                    <div>
                      <h4 className="font-black">{alt.name}</h4>
                      <p className="text-xs text-slate-600">
                        {alt.reason}
                      </p>
                    </div>

                    <ArrowRight />

                  </div>

                </a>

              ))}

            </div>
          )}

        </div>


        {/* Footer */}
        <div className="p-8 border-t bg-white">

          <button
            onClick={onClose}
            className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black"
          >
            Log to Health Dashboard
          </button>

        </div>

      </motion.div>

    </div>
  );
}