import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      await login(email, password);
      navigate('/student');
    } catch (err: any) { setError(err.message); } finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    setError('');
    const fakeCred = JSON.stringify({ email: 'google.user@example.com', name: 'Google User', sub: 'g001' });
    const encoded = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' })) + '.' + btoa(fakeCred) + '.fake';
    try {
      await googleLogin(encoded);
      navigate('/student');
    } catch (err: any) { setError(err.message); }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full bg-surface rounded-2xl shadow-lg p-8 md:p-12 border border-surface-variant" style={{maxWidth:448}}>
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">EduFlow</h1>
          <p className="text-on-surface-variant mt-3 text-base md:text-lg">Sign in to your account</p>
        </div>
        {error && <div className="bg-error-container text-on-error-container p-4 rounded-lg text-sm mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
            <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required className="w-full pl-12 pr-4 py-4 bg-surface-container-low border border-outline-variant rounded-xl text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
            <input type={showPw ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full pl-12 pr-12 py-4 bg-surface-container-low border border-outline-variant rounded-xl text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"><EyeOff className="w-5 h-5" /></button>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-on-primary py-4 rounded-xl font-semibold shadow-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-base md:text-lg">{loading ? 'Signing in...' : <><LogIn className="w-5 h-5" /> Sign In</>}</button>
        </form>
        <div className="my-8 flex items-center gap-3">
          <div className="flex-1 h-px bg-outline-variant" /><span className="text-sm text-outline">or continue with</span><div className="flex-1 h-px bg-outline-variant" />
        </div>
        <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-3 bg-surface-container-high hover:bg-surface-container-highest text-on-surface py-4 rounded-xl font-semibold border border-outline-variant transition-colors text-base md:text-lg">
          <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
          Google
        </button>
        <p className="text-center text-base md:text-lg text-on-surface-variant mt-8">
          Don't have an account? <Link to="/signup" className="text-primary font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
