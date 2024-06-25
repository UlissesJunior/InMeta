import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { IUser } from '@models/IUser';
import { login as loginService } from '../services/authService';

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const { token, user } = await loginService(email, password);
    const expiryTime = new Date().getTime() + 60 * 60 * 1000; // 60 minutos
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiry', expiryTime.toString());
    localStorage.setItem('email', email); 
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('email'); 
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    if (token && tokenExpiry) {
      const expiryTime = parseInt(tokenExpiry);
      if (new Date().getTime() < expiryTime) {
        setToken(token);
      } else {
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
