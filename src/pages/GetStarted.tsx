import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, GraduationCap, Presentation, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SUBJECTS = ['Mathematics', 'Science', 'Humanities', 'Computer Science', 'Arts', 'Languages'];

export default function GetStarted() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState<'student' | 'teacher' | ''>('');
  const [subjects, setSubjects] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const toggleSubject = (s: string) => {
    setSubjects(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);
  };

  const handleFinish = async () => {
    if (!name || !email || !password || !role) { setError('Please fill in all fields'); return; }
    setError(''); setLoading(true);
    try {
      await signup(name, email, password, role);
      // ponytail: save subjects to localStorage for now; real impl would call PUT /api/auth/profile
      localStorage.setItem('preferred_subjects', JSON.stringify(subjects));
      localStorage.setItem('user_role', role);
      navigate(role === 'teacher' ? '/teacher' : '/onboarding');
    } catch (err: any) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full bg-surface rounded-2xl shadow-lg p-8 md:p-12 border border-surface-variant" style={{maxWidth:448}}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary">Join EduFlow</h1>
          <p className="text-on-surface-variant mt-2 text-base md:text-lg">
            {step === 0 ? 'Tell us about yourself' : step === 1 ? 'Set up your account' : 'Almost there!'}
          </p>
        </div>

        {error && <div className="bg-error-container text-on-error-container p-4 rounded-lg text-sm mb-4">{error}</div>}

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2].map(i => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-outline-variant'}`} />
          ))}
        </div>

        {step === 0 && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <p className="text-lg font-semibold text-on-surface">I am a...</p>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setRole('student')} className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all ${role === 'student' ? 'border-primary bg-primary/5' : 'border-outline-variant bg-surface-container-lowest hover:border-primary/50'}`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${role === 'student' ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                  <GraduationCap className="w-7 h-7" />
                </div>
                <span className="font-semibold text-base">Student</span>
                <span className="text-sm text-on-surface-variant text-center">I want to learn and improve</span>
              </button>
              <button onClick={() => setRole('teacher')} className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all ${role === 'teacher' ? 'border-primary bg-primary/5' : 'border-outline-variant bg-surface-container-lowest hover:border-primary/50'}`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${role === 'teacher' ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                  <Presentation className="w-7 h-7" />
                </div>
                <span className="font-semibold text-base">Teacher</span>
                <span className="text-sm text-on-surface-variant text-center">I want to teach and guide</span>
              </button>
            </div>
            <div className="flex flex-col gap-3 mt-2">
              <p className="text-base font-semibold text-on-surface">Subjects I'm interested in</p>
              <div className="flex flex-wrap gap-2">
                {SUBJECTS.map(s => (
                  <button key={s} onClick={() => toggleSubject(s)} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${subjects.includes(s) ? 'bg-primary text-on-primary border-primary' : 'bg-surface-container-low text-on-surface-variant border-outline-variant hover:border-primary/50'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => { if (role) setStep(1); else setError('Please select your role'); }} className="w-full bg-primary hover:bg-primary/90 text-on-primary py-4 rounded-xl font-semibold text-base mt-2">
              Next
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-5 animate-in fade-in duration-300">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
              <input type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required className="w-full pl-12 pr-4 py-4 bg-surface-container-low border border-outline-variant rounded-xl text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
              <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required className="w-full pl-12 pr-4 py-4 bg-surface-container-low border border-outline-variant rounded-xl text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
              <input type={showPw ? 'text' : 'password'} placeholder="Password (min 6 characters)" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} className="w-full pl-12 pr-12 py-4 bg-surface-container-low border border-outline-variant rounded-xl text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"><EyeOff className="w-5 h-5" /></button>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="flex-1 bg-surface-container-high hover:bg-surface-container-highest text-on-surface py-4 rounded-xl font-semibold text-base border border-outline-variant">
                Back
              </button>
              <button onClick={() => { if (name && email && password) setStep(2); else setError('Please fill in all fields'); }} className="flex-1 bg-primary hover:bg-primary/90 text-on-primary py-4 rounded-xl font-semibold text-base">
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="font-semibold text-lg text-on-surface">Summary</span>
              </div>
              <div className="space-y-2 text-sm md:text-base">
                <p><span className="text-on-surface-variant">Name:</span> <span className="font-medium">{name}</span></p>
                <p><span className="text-on-surface-variant">Email:</span> <span className="font-medium">{email}</span></p>
                <p><span className="text-on-surface-variant">Role:</span> <span className="font-medium capitalize">{role}</span></p>
                <p><span className="text-on-surface-variant">Subjects:</span> <span className="font-medium">{subjects.length ? subjects.join(', ') : 'None selected'}</span></p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 bg-surface-container-high hover:bg-surface-container-highest text-on-surface py-4 rounded-xl font-semibold text-base border border-outline-variant">
                Back
              </button>
              <button onClick={handleFinish} disabled={loading} className="flex-1 bg-primary hover:bg-primary/90 text-on-primary py-4 rounded-xl font-semibold text-base disabled:opacity-50">
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-sm text-on-surface-variant mt-6">
          Already have an account? <Link to="/signin" className="text-primary font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
