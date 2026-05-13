import { createContext, useContext, useState, ReactNode } from 'react';
import { api, setToken, clearToken, getToken } from '../utils/api';

export interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthResult {
  ok: boolean;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (name: string, email: string, password: string) => Promise<AuthResult>;
  logout: () => void;
}

const SESSION_KEY = 'vendr-session';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function loadSession(): User | null {
  try {
    const saved = localStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadSession);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const data = await api.post<{ token: string; user: User }>('/api/auth/login', { email, password });
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : 'Login failed.' };
    }
  };

  const register = async (name: string, email: string, password: string): Promise<AuthResult> => {
    try {
      const data = await api.post<{ token: string; user: User }>('/api/auth/register', { name, email, password });
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : 'Registration failed.' };
    }
  };

  const logout = () => {
    setUser(null);
    clearToken();
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
