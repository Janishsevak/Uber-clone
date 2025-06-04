import React, { createContext, useState } from 'react';

export const CaptainDatacontext = createContext();

export const Captaincontext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const updateCaptain = (captainData) => {
    setCaptain(captainData);
  };

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain,
  };

  return (
    <CaptainDatacontext.Provider value={value}>
      {children}
    </CaptainDatacontext.Provider>
  );
};
export default Captaincontext;