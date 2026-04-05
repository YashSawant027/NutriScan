import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Scale, Calendar, Activity, ChevronRight, CheckCircle2,
  Dna, GlassWater, Target, Fingerprint, HeartPulse, Sparkles, 
  ArrowLeft, LayoutDashboard, Zap,
  UserRound
} from 'lucide-react';
import Navbar from './Navbar';
import ScanHistory from './ScanHistory';

export default function PersistedProfileSystem() {
  // 1. Initialize Form Data from LocalStorage
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('userMetrics');
    return savedData ? JSON.parse(savedData) : {
      name: '', age: '', weight: '', height: '',
      blood: '', hydration: '3', lifestyle: 'moderate',
      conditions: '', medications: '',
      targetWeight: '', focus: 'energy'
    };
  });

  const [step, setStep] = useState(1);

  // 2. Initialize View State from LocalStorage (CRITICAL for persistence)
  const [view, setView] = useState(() => {
    const savedView = localStorage.getItem('profileView');
    return savedView ? savedView : 'form';
  });

  // 3. Effect to sync Form Data
  useEffect(() => {
    localStorage.setItem('userMetrics', JSON.stringify(formData));
  }, [formData]);

  // 4. Effect to sync View State (Ensures it stays on Dashboard after refresh)
  useEffect(() => {
    localStorage.setItem('profileView', view);
  }, [view]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetProfile = () => {
    localStorage.removeItem('userMetrics');
    localStorage.removeItem('profileView');
    window.location.reload();
  };

  // --- DASHBOARD COMPONENT ---
  const Dashboard = () => (
    <motion.div 
      key="dashboardView"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div className="col-span-full flex justify-between items-end mb-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Analytics Console</h2>
          <p className="text-slate-500 font-medium">Real-time data visualization for {formData.name}</p>
        </div>
        <button 
          onClick={() => setView('form')}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={14}/> Back to Form
        </button>
      </div>

      <DashboardCard title="Core Stats" icon={<User className="text-yellow-500"/>} 
        value={`${formData.age || '0'}yr`} sub={`${formData.weight || '0'}kg / ${formData.height || '0'}cm`} />
      
      <DashboardCard title="Objective" icon={<Target className="text-purple-500"/>} 
        value={formData.focus} sub={`Target: ${formData.targetWeight || '0'}kg`} />
      
      <DashboardCard title="Biology" icon={<Dna className="text-emerald-500"/>} 
        value={formData.blood || 'Unknown'} sub={`Hydration: ${formData.hydration}L/day`} />

      <div className="md:col-span-2 lg:col-span-3 bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
        <div className="relative z-10">
            <h3 className="text-xs font-black text-yellow-400 uppercase tracking-[0.2em] mb-4">Clinical Overview</h3>
            <div className="grid md:grid-cols-2 gap-10">
                <div>
                    <p className="text-[10px] uppercase opacity-50 font-bold mb-2">Conditions</p>
                    <p className="text-lg font-medium italic opacity-90 leading-relaxed">{formData.conditions || 'No conditions reported.'}</p>
                </div>
                <div>
                    <p className="text-[10px] uppercase opacity-50 font-bold mb-2">Medications</p>
                    <p className="text-lg font-medium italic opacity-90 leading-relaxed">{formData.medications || 'None active.'}</p>
                </div>
            </div>
        </div>
        <Zap size={120} className="absolute -right-4 -bottom-10 text-white/5 rotate-12" />
      </div>

      <div className="col-span-full mt-10">
        <ScanHistory />
      </div>
    </motion.div>
  );

  return (
    <>
      <Navbar />
      <div className="bg-[#fcfcfc] min-h-screen font-sans selection:bg-yellow-100 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {view === 'form' ? (
              <motion.div 
                key="formView"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12"
              >
                {/* Sidebar */}
                <div className="lg:col-span-4 sticky top-12">
                  <div className="bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-2xl shadow-slate-200/40">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-yellow-400">
                        <UserRound size={28} />
                
                      </div>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">Profile</h2>
                    </div>
                    
                    <div className="space-y-4 mb-10">
                      <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Active Cache</p>
                      <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                          <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Subject Name</p>
                          <p className="text-lg font-black text-slate-900">{formData.name || 'Awaiting...'}</p>
                      </div>
                    </div>

                    <button onClick={resetProfile} className="w-full py-4 border-2 border-slate-100 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-red-100 hover:text-red-500 transition-all">
                      Reset All Local Data
                    </button>
                  </div>
                </div>

                {/* Form Steps */}
                <div className="lg:col-span-8 bg-white rounded-[4rem] border border-slate-100 p-8 md:p-16 shadow-2xl shadow-slate-200/30">
                  <AnimatePresence mode="wait">
                    {step < 5 ? (
                      <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                        <h3 className="text-5xl font-black text-slate-900 tracking-tighter">Step {step}/4</h3>
                        
                        {step === 1 && (
                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="md:col-span-2"><FormInput label="Full Name" name="name" value={formData.name} onChange={handleInputChange} /></div>
                            <FormInput label="Age" name="age" value={formData.age} onChange={handleInputChange} />
                            <FormInput label="Weight (KG)" name="weight" value={formData.weight} onChange={handleInputChange} />
                          </div>
                        )}

                        {step === 2 && (
                          <div className="grid md:grid-cols-2 gap-8">
                            <FormInput label="Blood Type" name="blood" value={formData.blood} onChange={handleInputChange} />
                            <FormInput label="Height (CM)" name="height" value={formData.height} onChange={handleInputChange} />
                          </div>
                        )}

                        {step === 3 && (
                          <FormTextArea label="Clinical Conditions" name="conditions" value={formData.conditions} onChange={handleInputChange} />
                        )}

                        {step === 4 && (
                          <div className="grid md:grid-cols-2 gap-8">
                            <FormInput label="Target Weight" name="targetWeight" value={formData.targetWeight} onChange={handleInputChange} />
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Focus</label>
                              <select name="focus" value={formData.focus} onChange={handleInputChange} className="w-full p-6 bg-slate-50 rounded-2xl font-bold text-lg outline-none border-2 border-transparent focus:border-yellow-400 transition-all">
                                <option value="energy">Energy Boost</option>
                                <option value="longevity">Longevity</option>
                                <option value="weight">Weight Management</option>
                              </select>
                            </div>
                          </div>
                        )}

                        <button onClick={() => setStep(step + 1)} className="w-full py-7 bg-slate-900 text-white rounded-[2.5rem] font-black text-xl flex items-center justify-center gap-3 hover:bg-yellow-400 hover:text-slate-900 transition-all shadow-xl">
                          Continue <ChevronRight size={20}/>
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                        <CheckCircle2 size={80} className="text-emerald-500 mx-auto mb-6" />
                        <h3 className="text-5xl font-black text-slate-900 tracking-tighter mb-4 uppercase">Sync Complete.</h3>
                        <p className="text-slate-500 font-medium mb-12">Your profile is finalized and stored in the secure local vault.</p>
                        <button onClick={() => setView('dashboard')} className="px-16 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl hover:bg-yellow-400 hover:text-slate-900 transition-all shadow-2xl">
                          Open Analytics Console
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              <Dashboard />
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

// Reusable UI Components
const FormInput = ({ label, name, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</label>
    <input type="text" name={name} value={value} onChange={onChange} className="w-full p-6 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-yellow-400 outline-none font-bold text-lg transition-all" />
  </div>
);

const FormTextArea = ({ label, name, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</label>
    <textarea name={name} value={value} rows="4" onChange={onChange} className="w-full p-8 bg-slate-50 rounded-[2.5rem] border-2 border-transparent focus:border-yellow-400 outline-none font-bold text-lg resize-none transition-all" />
  </div>
);

const DashboardCard = ({ title, icon, value, sub }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
    <div className="flex justify-between items-center mb-6">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{title}</h4>
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
    </div>
    <p className="text-3xl font-black text-slate-900 mb-1">{value}</p>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{sub}</p>
  </div>
);