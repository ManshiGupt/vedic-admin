import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode";

// Step 1: Create a Context
const TokenDataContext = createContext();

// Step 2: Create a Provider Component
export const TokenDataProvider = ({ children }) => {
    
  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    // Decode the token to extract user data
    if (token) {
      const decodedToken = jwtDecode(token);
      setTokenData(decodedToken.user);
    }
  }, []);

  return (
    // Provide the token data to its descendants
    <TokenDataContext.Provider value={tokenData}>
      {children}
    </TokenDataContext.Provider>
  );

};

// Custom hook to access the token data
export const useTokenData = () => {

  return useContext(TokenDataContext);

};
