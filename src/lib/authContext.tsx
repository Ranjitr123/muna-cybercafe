'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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
  name: 'Sanjit Rautaray (Admin)',
  email: 'sanjit007muna@gmail.com',
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
      const cleanInput = emailOrMobile.trim().toLowerCase();

      // Admin Login Check
      const isAdminUser =
        cleanInput === 'muna' ||
        cleanInput === 'sanjit007muna@gmail.com' ||
        cleanInput === 'admin@munatechworld.com' ||
        cleanInput === '9777735527' ||
        isAdmin;

      if (isAdminUser) {
        if (password === '123456' || password === 'admin123' || password === 'muna007' || password.length >= 6) {
          setUser(DEMO_ADMIN);
          localStorage.setItem('muna_user_session', JSON.stringify(DEMO_ADMIN));
          setIsLoading(false);
          return { success: true };
        } else {
          setIsLoading(false);
          return { success: false, error: 'Invalid admin password (Hint: 123456)' };
        }
      }

      // Customer Login Check from local storage accounts
      const storedUsersRaw = localStorage.getItem('muna_registered_users');
      const users: UserProfile[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

      const foundUser = users.find(
        (u) => u.email.toLowerCase() === cleanInput || u.mobile.replace(/\D/g, '') === cleanInput.replace(/\D/g, '')
      );

      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('muna_user_session', JSON.stringify(foundUser));
        setIsLoading(false);
        return { success: true };
      }

      // Auto-create guest customer profile if user inputs valid email/mobile for quick access
      const newCustomer: UserProfile = {
        id: `user-${Date.now()}`,
        name: cleanInput.includes('@') ? cleanInput.split('@')[0] : 'Customer',
        email: cleanInput.includes('@') ? cleanInput : `${cleanInput}@customer.local`,
        mobile: cleanInput.replace(/\D/g, '') || '9800000000',
        role: 'customer',
        createdAt: new Date().toISOString(),
      };

      setUser(newCustomer);
      localStorage.setItem('muna_user_session', JSON.stringify(newCustomer));
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const signup = async (name: string, email: string, mobile: string, password: string) => {
    setIsLoading(true);
    try {
      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        mobile: mobile.trim(),
        role: 'customer',
        createdAt: new Date().toISOString(),
      };

      // Retrieve existing stored users
      const storedUsersRaw = localStorage.getItem('muna_registered_users');
      const users: UserProfile[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

      // Add new user
      users.push(newUser);
      localStorage.setItem('muna_registered_users', JSON.stringify(users));

      // Auto-login
      setUser(newUser);
      localStorage.setItem('muna_user_session', JSON.stringify(newUser));

      setIsLoading(false);
      return { success: true };
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
