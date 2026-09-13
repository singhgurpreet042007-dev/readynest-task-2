"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { getStoredToken, removeStoredToken } from '../services/api';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginUser: (user: User, token: string) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  loginUser: () => {},
  logoutUser: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    async function verifyAuth() {
      try {
        const storedToken = getStoredToken();
        if (storedToken) {
          const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
          const res = await fetch(`${baseUrl}/auth/me`, {
            headers: { Authorization: `Bearer ${storedToken}` },
            signal: controller.signal,
          });

          if (res.ok) {
            const data = await res.json();
            if (data.user) {
              setUser(data.user);
              setRole(data.user.role);
              setToken(storedToken);
              localStorage.setItem('user', JSON.stringify(data.user));
              localStorage.setItem('role', data.user.role);
              setIsLoading(false);
              return;
            }
          }
        }

        // If no token or token is invalid / expired / fake:
        removeStoredToken();
        setUser(null);
        setRole(null);
        setToken(null);
      } catch (e) {
        removeStoredToken();
        setUser(null);
        setRole(null);
        setToken(null);
      } finally {
        clearTimeout(timeoutId);
        setIsLoading(false);
      }
    }

    verifyAuth();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  const loginUser = (newUser: User, newToken: string) => {
    setUser(newUser);
    setRole(newUser.role);
    setToken(newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('role', newUser.role);
    localStorage.setItem('token', newToken);
  };

  const logoutUser = () => {
    setUser(null);
    setRole(null);
    setToken(null);
    removeStoredToken();
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        isLoading,
        isAuthenticated: !!token,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
