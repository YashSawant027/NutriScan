import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Loader2 } from 'lucide-react';
import Navbar from './Navbar';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError({});

        const userData = {
            username: username,
            email: email,
            password: password
        };

        try {
            // Updated to your specific Render API endpoint
            await axios.post('https://queryla2-0-1.onrender.com/api/v1/RegisterPage', userData);
            console.log("Registration successful");
            navigate('/login');
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data);
                console.log("Registration error:", err.response.data);
            } else {
                setError({ detail: "Connection failed. Please try again." });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-[#f8fff9] flex justify-center items-center p-6 font-sans">
            <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl border border-green-50 animate-in fade-in zoom-in duration-500">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-2xl mb-4">
                        <User className="text-[#2ecc71]" size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Account</h1>
                    <p className="text-slate-400 font-medium mt-1">Join NutriScan and eat smarter</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Username Field */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 px-1">Username</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input 
                                type="text"
                                required
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 focus:border-[#2ecc71] focus:bg-white outline-none font-bold transition-all"
                                placeholder="alex_johnson" 
                            />
                        </div>
                        {error.username && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-tighter px-1">{error.username}</p>}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 px-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input 
                                type="email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 focus:border-[#2ecc71] focus:bg-white outline-none font-bold transition-all"
                                placeholder="alex@gmail.com" 
                            />
                        </div>
                        {error.email && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-tighter px-1">{error.email}</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 px-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input 
                                type="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 focus:border-[#2ecc71] focus:bg-white outline-none font-bold transition-all"
                                placeholder="••••••••" 
                            />
                        </div>
                        {error.password && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-tighter px-1">{error.password}</p>}
                    </div>

                    {/* Submit Button */}
                    <button 
                        disabled={loading}
                        className="w-full h-14 bg-black text-white rounded-2xl font-black shadow-xl hover:bg-slate-800 transition-all active:scale-95 disabled:bg-slate-300 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                <span>Creating Account...</span>
                            </>
                        ) : (
                            "Register"
                        )}
                    </button>

                    {/* General Error Message */}
                    {error.detail && <p className="text-red-500 text-center text-xs font-bold">{error.detail}</p>}

                    {/* Link to Login */}
                    <p className="mt-6 text-center text-sm font-bold text-slate-400">
                        Already have an account? 
                        <Link to='/login' className="text-[#2ecc71] ml-1 border-b-2 border-green-100 hover:border-[#2ecc71] transition-all">
                            Login here
                        </Link>
                    </p>
                </form>
            </div>
        </div></>
    );
}

export default Register;