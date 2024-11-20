import React, { createContext, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext();

const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);

  const logout = async () => {
    await AsyncStorage.removeItem('userEmail'); 
    setIsLoggedIn(false); 
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
