import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import Navbar from './Navbar';


function Login() {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState({});
    const [loading, setloading] = useState(false);
    const { setislogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setloading(true);
        try {
            const response = await axios.post('https://queryla2-0-1.onrender.com/api/v1/LoginPage', {
                username, password
            });
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            setislogin(true);
            navigate('/');
        } catch (err) {
            seterror(err.response?.data || { detail: "Invalid Credentials" });
        } finally {
            setloading(false);
        }
    };

    return (
<>
        <Navbar/>
        <div className='min-h-screen bg-slate-50 flex justify-center items-center p-6'>
            <div className='w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100'>
                <h1 className='text-3xl font-black text-slate-900 text-center mb-2'>Welcome Back</h1>
                <p className='text-slate-400 text-center mb-8 font-medium'>Sign in to your NutriScan account</p>
                <form onSubmit={handleLogin} className='space-y-5'>
                    <div>
                        <label className='block text-xs font-black uppercase tracking-widest text-slate-400 mb-2'>Username</label>
                        <input type="text" onChange={(e)=>setusername(e.target.value)} className='w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-5 focus:border-[#2ecc71] outline-none font-bold transition-all' placeholder='e.g. Kavi'/>
                        {error.username && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-tighter">{error.username}</p>}
                    </div>
                    <div>
                        <label className='block text-xs font-black uppercase tracking-widest text-slate-400 mb-2'>Password</label>
                        <input type="password" onChange={(e)=>setpassword(e.target.value)} className='w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-5 focus:border-[#2ecc71] outline-none font-bold transition-all'/>
                        {error.password && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-tighter">{error.password}</p>}
                    </div>
                    <button disabled={loading} className='w-full h-14 bg-black text-white rounded-2xl font-black shadow-xl hover:bg-slate-800 transition-all active:scale-95 disabled:bg-slate-300'>
                        {loading ? "Authenticating..." : "Login"}
                    </button>
                    <p className='text-center text-sm font-bold text-slate-400 pt-4'>
                        New here? <Link to='/register' className='text-[#2ecc71] border-b-2 border-green-100 pb-0.5'>Create an account</Link>
                    </p>
                </form>
            </div>
        </div></>
    );
}
export default Login;