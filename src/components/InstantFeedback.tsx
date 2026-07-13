import { Link, useNavigate } from 'react-router-dom';
import { useToast } from './ToastProvider';
import { School, Search, TrendingUp, CheckCircle, Lightbulb, Sparkles, RotateCcw, ChevronRight } from 'lucide-react';

export default function InstantFeedback() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  return (
    <div className="bg-background text-on-background min-h-screen font-sans antialiased flex flex-col items-center justify-center p-margin-mobile md:p-margin-desktop">
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-md py-sm bg-surface shadow-sm">
        <div className="flex items-center gap-2">
          <School className="w-6 h-6 text-primary" />
          <span className="text-[24px] font-bold text-primary">EduFlow</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/student" className="text-on-surface-variant hover:bg-surface-container-low px-2 py-1 rounded">Dashboard</Link>
          <Link to="/courses" className="text-primary font-bold border-b-2 border-primary px-2 py-1 rounded">Courses</Link>
          <Link to="/student" className="text-on-surface-variant hover:bg-surface-container-low px-2 py-1 rounded">Progress</Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant p-2 rounded-full hover:bg-surface-container-low hidden md:block">
            <Search className="w-5 h-5" />
          </button>
          <button onClick={() => navigate('/student')} className="bg-primary-container text-on-primary text-[14px] font-semibold px-4 py-2 rounded-full hover:bg-primary hidden md:flex items-center gap-1">
            Progress <TrendingUp className="w-4 h-4" />
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-outline-variant ml-3">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyrcbKWxAcLgLAMPVW9RqwH5naXuHBhL5OSIcZVOvSzXOVym4-omTMvSxaZ4Q9zRZCFO4RU3zudD-PJRmAoM3y7TEb8wrqaZlHljsZe6_MzAgano1YQsXegGy-_qV4hCDfO_x1A8oHKWmq0_9s7g0hFWEWqolWjIuWdocy7GVq8QDAApfvWqmT9x13xj4pppFpvYJzDmus60RhTbW0YL8-Vme1fl9tsl6JequsrOthCF3u3KfHC1UgNAJDpD9eOH9W_7qtGrFpn1E" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </nav>

      <main className="w-full max-w-[800px] mt-24 mb-xl mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center text-center w-full mb-lg animate-in slide-in-from-bottom-4 duration-500 fade-in">
          <div className="w-48 h-48 mb-sm flex items-center justify-center relative">
            <div className="absolute inset-0 bg-green-100 rounded-full scale-50 opacity-0 animate-[ping_0.5s_ease-out_forwards]"></div>
            <CheckCircle className="w-24 h-24 text-green-600 animate-[bounce_0.5s_ease-out]" />
          </div>
          <h1 className="text-[32px] md:text-[48px] text-green-600 font-bold tracking-tight">Correct! 🎉</h1>
          <p className="text-[18px] text-on-surface-variant mt-2">Great job. You mastered this concept.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-md w-full animate-in slide-in-from-bottom-8 duration-700 fade-in delay-150">
          <div className="col-span-1 md:col-span-12 rounded-[16px] p-lg flex flex-col bg-white shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-secondary fill-secondary" />
              <h2 className="text-[24px] font-semibold text-on-surface">Explanation</h2>
            </div>
            <div className="bg-surface-container-low rounded-lg p-4 border border-outline-variant">
              <p className="text-[16px] text-on-surface leading-relaxed">
                The correct answer is <strong>x = 4</strong> because when you isolate 'x' in the equation <em>2x + 5 = 13</em>, you first subtract 5 from both sides, leaving <em>2x = 8</em>. Then, dividing both sides by 2 gives you <em>x = 4</em>.
              </p>
            </div>
          </div>

          <div className="col-span-1 md:col-span-12 rounded-[16px] p-lg flex flex-col relative overflow-hidden bg-secondary-container shadow-sm">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#006780 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
            <div className="relative z-10 flex items-start gap-4">
              <div className="bg-on-secondary-container text-secondary-container rounded-full p-2 shrink-0 shadow-sm mt-1">
                <Sparkles className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="text-[14px] font-semibold text-on-secondary-container uppercase tracking-wider mb-2">AI Insight</h3>
                <p className="text-[16px] text-on-secondary-container">
                  You typically struggle with fractions. We'll focus on that next to build your confidence in mixed numbers.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full gap-4 mt-8 animate-in slide-in-from-bottom-4 duration-700 fade-in delay-300">
          <button onClick={() => addToast('Opening review materials...', 'info')} className="flex-1 bg-tertiary-container text-on-tertiary-container rounded-lg text-[14px] font-semibold px-6 py-3 flex items-center justify-center gap-2 hover:bg-tertiary hover:text-white transition-colors shadow-sm">
            <RotateCcw className="w-5 h-5" /> Review This Topic
          </button>
          <Link to="/courses/MATH201" className="flex-1 bg-primary text-on-primary rounded-lg text-[14px] font-semibold px-6 py-3 flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-md">
            Next Question <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </main>
    </div>
  );
}
