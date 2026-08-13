'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveUserToFirebase } from '@/lib/firebaseService';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (emailOrMobile: string, password: string, isAdmin?: boolean) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, mobile: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_ADMIN: UserProfile = {
  id: 'admin-1',
  name: 'Ranjit Rautaray (Admin)',
  email: 'ranjitrautaray475@gmail.com',
  mobile: '9777735527',
  role: 'admin',
  createdAt: new Date().toISOString(),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load session from localStorage on initial render
    try {
      const savedUser = localStorage.getItem('muna_user_session');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Failed to parse user session:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (emailOrMobile: string, password: string, isAdmin = false) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrMobile, password, isAdmin }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('muna_user_session', JSON.stringify(data.user));
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, error: data.message || 'Invalid login credentials' };
      }
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const signup = async (name: string, email: string, mobile: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, mobile, password }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('muna_user_session', JSON.stringify(data.user));
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, error: data.message || 'Signup failed' };
      }
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Signup failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('muna_user_session');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
