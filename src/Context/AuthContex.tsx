import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContex = ({ children } : any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async () => setIsLoggedIn(true); 
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

export default AuthContex;
