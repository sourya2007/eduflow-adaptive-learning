import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from './ToastProvider';
import { X, Timer, Lightbulb, PenTool, ArrowLeft } from 'lucide-react';

export default function Quiz() {
  const [selected, setSelected] = useState<string | null>('c');
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes default
  const [isFetchingDifficulty, setIsFetchingDifficulty] = useState(true);
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    // Fetch difficulty from Adaptive Learning Engine to adjust timer
    const fetchAdaptiveData = async () => {
      try {
        const res = await fetch('/api/student/123/adaptive-path');
        const data = await res.json();
        // Base time of 5 mins + 1 min per difficulty level
        const difficulty = data.nextLesson?.difficulty || 5;
        setTimeLeft(300 + (difficulty * 60));
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetchingDifficulty(false);
      }
    };
    fetchAdaptiveData();
  }, []);

  useEffect(() => {
    if (isFetchingDifficulty || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isFetchingDifficulty, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-on-background bg-background pb-20">
      <header role="banner" className="sticky top-0 z-50 bg-surface shadow-sm px-md py-sm flex justify-between items-center w-full">
        <div className="flex items-center gap-sm">
          <Link to="/courses/MATH201" className="p-1 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
            <X className="w-6 h-6" />
          </Link>
          <div className="flex flex-col">
            <span className="text-[12px] font-medium text-outline">Algebra I - Module 4</span>
            <h1 className="text-[24px] font-bold text-on-surface truncate">Linear Equations Quiz</h1>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-surface-container px-3 py-1 rounded-full">
          <Timer className="w-4 h-4 text-primary" />
          <span className="text-[14px] font-bold text-primary">
            {isFetchingDifficulty ? '...' : formatTime(timeLeft)}
          </span>
        </div>
      </header>

      <div className="w-full bg-surface-container-low py-3 px-md flex items-center gap-4 shadow-sm border-b border-surface-variant">
        <span className="text-[12px] font-medium text-on-surface-variant flex-shrink-0">Question 3 of 10</span>
        <div className="h-2 flex-grow bg-gray-300 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-[30%] rounded-full transition-all duration-300"></div>
        </div>
      </div>

      <main aria-label="Main Content" role="main" className="flex-grow w-full max-w-[1200px] mx-auto px-md md:px-lg py-lg flex flex-col gap-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
          <div className="md:col-span-8 flex flex-col gap-lg">
            <div className="bg-surface rounded-[16px] shadow-sm p-lg lg:p-xl flex flex-col gap-lg border border-surface-variant relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 rounded-bl-full pointer-events-none z-0"></div>
              <div className="z-10 flex flex-col gap-md">
                <div className="inline-flex self-start px-2 py-1 bg-surface-container rounded border border-primary-fixed-dim">
                  <span className="text-[12px] font-medium text-primary uppercase tracking-wider">Question 3</span>
                </div>
                <h2 className="text-[24px] md:text-[32px] font-bold text-on-surface leading-tight">
                  What is the value of <span className="italic text-primary">x</span> in the equation <span className="font-mono bg-surface-container-highest px-1 rounded">2x + 5 = 13</span>?
                </h2>
                <p className="text-[18px] text-on-surface-variant">Solve for x step-by-step to find the correct answer.</p>
              </div>

              <form className="z-10 flex flex-col gap-3 mt-4">
                {[
                  { id: 'a', val: '4', label: 'x = 4' },
                  { id: 'b', val: '5', label: 'x = 5' },
                  { id: 'c', val: '3', label: 'x = 3' },
                  { id: 'd', val: '6', label: 'x = 6' },
                ].map((opt) => (
                  <label key={opt.id} className="relative cursor-pointer group">
                    <input type="radio" name="answer" value={opt.id} checked={selected === opt.id} onChange={() => setSelected(opt.id)} className="sr-only" />
                    <div className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-colors ${selected === opt.id ? 'border-primary bg-surface-container-low' : 'border-surface-variant bg-surface hover:bg-surface-container-low'}`}>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selected === opt.id ? 'border-primary bg-primary' : 'border-outline group-hover:border-primary'}`}>
                        {selected === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                      </div>
                      <span className={`text-[14px] font-bold text-lg w-8 ${selected === opt.id ? 'text-primary' : 'text-on-surface-variant group-hover:text-on-surface'}`}>{opt.id.toUpperCase()}</span>
                      <span className={`text-[18px] ${selected === opt.id ? 'text-on-surface font-medium' : 'text-on-surface'}`}>{opt.label}</span>
                    </div>
                  </label>
                ))}
              </form>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors text-[14px] font-semibold flex items-center gap-1">
                <ArrowLeft className="w-5 h-5" /> Previous
              </button>
              <button onClick={() => navigate('/quiz/result')} className="bg-primary hover:bg-primary-container text-on-primary px-8 py-2.5 rounded-lg text-[14px] font-semibold shadow-sm transition-colors">
                Submit Answer
              </button>
            </div>
          </div>

          <aside className="md:col-span-4 flex flex-col gap-lg">
            <div className="bg-surface rounded-[16px] shadow-sm p-lg border border-surface-variant">
              <h3 className="text-[24px] font-bold text-on-surface mb-4">Quiz Progress</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[16px] text-on-surface-variant">Question 3 of 10</span>
                <span className="text-[12px] font-bold text-primary">30%</span>
              </div>
              <div className="flex justify-between items-center gap-1 mb-6">
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <div key={n} className={`h-2 flex-1 rounded-full ${n <= 2 ? 'bg-primary' : n === 3 ? 'bg-primary ring-2 ring-primary-fixed ring-offset-1 relative' : 'bg-surface-container-high'}`}></div>
                ))}
              </div>
              <hr className="border-surface-variant mb-4"/>
              <div className="flex flex-col gap-3">
                <p className="text-[14px] text-on-surface-variant">Stuck? Using a hint will slightly reduce the point value of this question.</p>
                <button onClick={() => addToast('Hint: Subtract 5 from both sides first, then divide by 2.', 'info')} className="w-full border-2 border-tertiary text-tertiary hover:bg-tertiary-fixed hover:text-tertiary-container px-4 py-2 rounded-lg text-[14px] font-semibold transition-colors flex items-center justify-center gap-2">
                  <Lightbulb className="w-5 h-5" /> Show Hint
                </button>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-[16px] p-md border border-surface-variant flex flex-col items-center justify-center h-48 opacity-70 border-dashed">
              <PenTool className="w-8 h-8 text-outline mb-2" />
              <span className="text-[14px] text-outline">Digital Scratchpad (Beta)</span>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
