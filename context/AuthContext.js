// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check token on mount
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const id = await AsyncStorage.getItem('userId');
        if (token) {
          setUserToken(token);
          setUserId(id);
        }
      } catch (e) {
        console.error('Error loading token:', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (token, userId) => {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('userId', userId);
    setUserToken(token);
    setUserId(userId);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    setUserToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        userId,
        isLoading,
        login,
        logout,
        isLoggedIn: !!userToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
