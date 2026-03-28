import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider, { AuthContext } from './AuthProvider'; 
import Features from './Feature';
import NutriScanLanding from './Home';
import Login from './Login';
import Register from './Register';
import NutriScanner from './Scanning';

/**
 * INTERNAL HELPER: RequireAuth
 * This component checks if the user is logged in.
 * If yes, it shows the page. If no, it redirects to /login.
 */
const RequireAuth = ({ children }) => {
  const { islogin } = useContext(AuthContext);
  
  if (!islogin) {
    // replace: true ensures the user can't go "back" to the protected page
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename='/Queryla2.0/'></BrowserRouter>
      <BrowserRouter>
      
        <Routes>
          {/* Public Routes - Anyone can see these */}
          <Route path="/" element={<NutriScanLanding />} />
          <Route path="/features" element={<Features />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Route - Only logged-in users */}
          <Route 
            path="/scanning" 
            element={
              <RequireAuth>
                <NutriScanner />
              </RequireAuth>
            } 
          />

          {/* Fallback - Redirect any unknown routes to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;