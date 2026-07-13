import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  id: string; name: string; email: string; role: string; learningStyle?: string;
}

interface AuthContextType {
  user: UserProfile | null; token: string | null; loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role?: string) => Promise<void>;
  googleLogin: (credential: string) => Promise<void>;
  logout: () => void; updateProfile: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    fetch('/api/auth/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(p => { setUser(p); setLoading(false); })
      .catch(() => { localStorage.removeItem('auth_token'); setToken(null); setUser(null); setLoading(false); });
  }, [token]);

  const saveSession = (t: string, p: UserProfile) => {
    localStorage.setItem('auth_token', t); setToken(t); setUser(p);
  };

  const login = async (email: string, password: string) => {
    const r = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    if (!r.ok) { const e = await r.json(); throw new Error(e.error); }
    const d = await r.json(); saveSession(d.token, d.userProfile);
  };

  const signup = async (name: string, email: string, password: string, role = 'student') => {
    const r = await fetch('/api/auth/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password, role }) });
    if (!r.ok) { const e = await r.json(); throw new Error(e.error); }
    const d = await r.json(); saveSession(d.token, d.userProfile);
  };

  const googleLogin = async (credential: string) => {
    const r = await fetch('/api/auth/google', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ credential }) });
    if (!r.ok) { const e = await r.json(); throw new Error(e.error); }
    const d = await r.json(); saveSession(d.token, d.userProfile);
  };

  const logout = () => { localStorage.removeItem('auth_token'); setToken(null); setUser(null); navigate('/'); };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (user) setUser({ ...user, ...data });
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, googleLogin, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
