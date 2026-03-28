import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { AuthContext } from './AuthProvider';

export default function Navbar() {

  const { islogin, setislogin } = useContext(AuthContext);
  const [isopen, setisopen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setisopen(false);
  }, [location.pathname]);


  const handlelogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setislogin(false);
    navigate("/login");
  };


  return (

    <nav className="bg-white sticky top-0 z-50 border-b border-green-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">

        {/* Logo */}

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >

          <div className="bg-[#2ecc71] p-1.5 rounded-lg">
            <Search size={22} color="white" strokeWidth={2.5} />
          </div>

          <span className="text-xl sm:text-2xl font-black text-slate-900">
            NutriScan
          </span>

        </div>


        {/* Desktop Navigation */}

        <ul className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-bold uppercase tracking-widest text-slate-600">

          <li className="hover:text-[#2ecc71] transition">
            <Link to="/">Home</Link>
          </li>

          <li className="hover:text-[#2ecc71] transition">
            <Link to="/features">Features</Link>
          </li>

        </ul>



        {/* Desktop Auth */}

        <div className="hidden md:flex gap-3 lg:gap-4">

          {islogin ? (

            <button
              onClick={handlelogout}
              className="bg-black text-white text-sm font-bold rounded-xl px-5 py-2.5 hover:bg-gray-800 transition"
            >
              Logout
            </button>

          ) : (

            <>
              <Link
                to="/login"
                className="border border-slate-200 text-black text-sm font-bold rounded-xl px-5 py-2.5 hover:bg-gray-50 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-[#2ecc71] text-white text-sm font-bold rounded-xl px-5 py-2.5 hover:bg-green-600 transition shadow-lg"
              >
                Register
              </Link>
            </>

          )}

        </div>



        {/* Hamburger */}

        <button
          className="md:hidden relative w-8 h-8 flex items-center justify-center"
          onClick={() => setisopen(!isopen)}
        >

          <Menu
            className={`absolute transition-all duration-300 
            ${isopen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`}
          />

          <X
            className={`absolute transition-all duration-300 
            ${isopen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}
          />

        </button>

      </div>



      {/* Mobile Menu */}

      <div

        className={`fixed top-0 right-0 h-full w-full sm:w-[60%] bg-white shadow-2xl z-50 transform transition-transform duration-300 md:hidden
        ${isopen ? 'translate-x-0' : 'translate-x-full'}`}

      >

        {/* Header */}

        <div className="flex items-center justify-between px-6 h-16 border-b">

          <span className="font-black text-lg">
            Menu
          </span>

          <button onClick={() => setisopen(false)}>
            <X size={26} />
          </button>

        </div>



        {/* Links */}

        <div className="flex flex-col px-6 py-6 gap-6">

          <Link
            to="/"
            className="text-lg font-bold text-slate-700 hover:text-[#2ecc71]"
          >
            Home
          </Link>

          <Link
            to="/features"
            className="text-lg font-bold text-slate-700 hover:text-[#2ecc71]"
          >
            Features
          </Link>



          <div className="border-t pt-6 mt-4">

            {islogin ? (

              <button
                onClick={handlelogout}
                className="w-full bg-black text-white py-3 rounded-xl font-bold"
              >
                Logout
              </button>

            ) : (

              <div className="flex flex-col gap-3">

                <Link
                  to="/login"
                  className="text-center border py-3 rounded-xl font-bold"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="text-center bg-[#2ecc71] text-white py-3 rounded-xl font-bold"
                >
                  Register
                </Link>

              </div>

            )}

          </div>

        </div>

      </div>

    </nav>

  );

}