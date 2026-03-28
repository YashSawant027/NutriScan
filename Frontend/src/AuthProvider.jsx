import React, { createContext, useState } from "react";

// 1. Create the Context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // 2. Initialize state based on existing token in storage
  const [islogin, setislogin] = useState(
    !!localStorage.getItem('accessToken')
  );

  return (
    <AuthContext.Provider value={{ islogin, setislogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;