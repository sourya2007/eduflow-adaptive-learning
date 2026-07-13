import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, BookOpen, TrendingUp, Settings, HelpCircle, Menu, PlayCircle, Flame, BarChart2, Library, Award, Medal, Trophy, Calendar, Bell } from 'lucide-react';
import clsx from 'clsx';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { ThemeToggle } from './ThemeToggle';
import { FeedbackModal } from './FeedbackModal';
import { NetworkStatus } from './NetworkStatus';
import { useToast } from './ToastProvider';
import { LoadingSkeleton } from './LoadingSkeleton';
import { ProgressRing } from './ProgressRing';
import { Leaderboard } from './Leaderboard';
import { RecommendedLessons } from './RecommendedLessons';
import { AITutorChat } from './AITutorChat';
import { SkillTree } from './SkillTree';
import { ContributionHeatmap } from './ContributionHeatmap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { usePerformanceTracking } from '../hooks/usePerformanceTracking';

export default function StudentDashboard() {
  usePerformanceTracking('StudentDashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [gamification, setGamification] = useState<any>(() => {
    const cached = localStorage.getItem('student_gamification_123');
    return cached ? JSON.parse(cached) : null;
  });
  const [isLoadingGamification, setIsLoadingGamification] = useState(!gamification);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    fetch('/api/student/123/gamification')
      .then(res => res.json())
      .then(data => {
        setGamification(data);
        localStorage.setItem('student_gamification_123', JSON.stringify(data));
        setIsLoadingGamification(false);
        // Simulate unlocking a badge if it just loaded
        if (data?.streak > 5 && !localStorage.getItem('streak_notified')) {
          setTimeout(() => addToast('Milestone reached: 5-Day Streak!', 'success'), 1500);
          localStorage.setItem('streak_notified', 'true');
        }
      })
      .catch(err => {
        console.error(err);
        setIsLoadingGamification(false);
      });
  }, [addToast]);

  useEffect(() => {
    const tourShown = localStorage.getItem('student_tour_shown');
    if (!tourShown) {
      setTimeout(() => {
        const d = driver({
          showProgress: true,
          steps: [
            { element: '#mastery-ring', popover: { title: 'Mastery Progress', description: 'This ring shows your overall mastery level for this module. Keep pushing to reach 100%!', side: 'right' } },
            { element: '#ai-tutor-chat', popover: { title: 'AI Tutor', description: 'Stuck on a problem? Ask your AI Tutor for hints, explanations, and guidance anytime.', side: 'top' } }
          ]
        });
        d.drive();
        localStorage.setItem('student_tour_shown', 'true');
      }, 1000);
    }
  }, []);

  const velocityData = [
    { name: 'Mon', current: 20, average: 15 },
    { name: 'Tue', current: 35, average: 25 },
    { name: 'Wed', current: 40, average: 30 },
    { name: 'Thu', current: 30, average: 35 },
    { name: 'Fri', current: 55, average: 40 },
    { name: 'Sat', current: 15, average: 20 },
    { name: 'Sun', current: 25, average: 25 },
  ];

  return (
    <div className="bg-background text-on-background min-h-screen pt-16 pb-20 font-sans">
      <nav aria-label="Main Navigation" className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-md py-sm bg-surface shadow-sm h-16">
        <div className="flex items-center gap-md">
          <div className="hidden md:block text-[24px] font-bold text-primary">EduFlow</div>
          <button aria-label="Toggle mobile menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-xs text-on-surface-variant hover:bg-surface-container rounded-full">
            <Menu className="w-6 h-6" />
          </button>
          <div className="md:hidden text-[20px] font-bold text-primary">EduFlow</div>
        </div>
        <div className="hidden md:flex items-center gap-sm bg-surface-container px-sm py-xs rounded-full">
          <span className="text-[12px] font-medium text-on-surface-variant">Today's Goal:</span>
          <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '45%' }}></div>
          </div>
          <span className="text-[12px] font-bold text-primary">45%</span>
        </div>
        <div className="flex items-center gap-md">
          <NetworkStatus />
          <div className="text-[16px] font-medium text-on-surface mr-sm hidden sm:block">Hi, Student! 👋</div>
          <ThemeToggle />
          <Link aria-label="View Profile" to="/profile" className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant hover:border-primary transition-colors cursor-pointer">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN8s4IQMibYGBWNHpjPIr3woSfOm-nHDE3394BKE12_YtLNwyRv8wM6CXeMmv7iqxW04MYEF5pL56tG1sGKuiBDydanE_FRnjddnmhtVD75JHlAT18UvrL-axnsx8LVavxd6O38BawlrUDvUAsqBMgqbSLFTJEYuDT9BuXX4uSGCX3xP-2xD0uAILbn9TznFhTY5hK74HLQHxuyXMPp_1vsJbDRliNkZnhJp2SqenVaDOs-_jewaRgTF_Gq4PUzRXqNrXwdTq1Wh0" alt="Profile" className="w-full h-full object-cover" />
          </Link>
        </div>
      </nav>

      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
        accuracy={85} 
        tips={['Review the concept of discriminants.', 'Practice factoring by grouping.']} 
        moduleName="Quadratic Equations Simplified" 
      />
      <div className="max-w-[1200px] mx-auto w-full px-md md:px-lg py-lg grid grid-cols-1 md:grid-cols-4 gap-lg min-h-[calc(100vh-64px)]">
        <aside aria-label="Sidebar Menu" role="complementary" className={clsx("flex flex-col gap-lg bg-surface md:bg-transparent absolute md:relative z-40 md:flex transition-transform transform md:translate-x-0 inset-y-0 left-0 pt-16 md:pt-0 border-r md:border-none md:col-span-1", isMobileMenuOpen ? "translate-x-0" : "-translate-x-full")}>
          <div className="bg-surface-container-lowest rounded-xl p-md flex flex-col gap-sm">
            <div className="text-[14px] font-semibold text-outline-variant uppercase mb-xs tracking-wider">Menu</div>
            <Link to="/student" className="flex items-center gap-sm p-sm rounded-lg bg-secondary-container text-on-secondary-container font-semibold"><LayoutDashboard className="w-5 h-5" /> Dashboard</Link>
            <Link to="/courses" className="flex items-center gap-sm p-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low font-semibold"><BookOpen className="w-5 h-5" /> Courses</Link>
            <Link to="/student" className="flex items-center gap-sm p-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low font-semibold"><TrendingUp className="w-5 h-5" /> Progress</Link>
            <Link to="/profile" className="flex items-center gap-sm p-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low font-semibold"><Settings className="w-5 h-5" /> Settings</Link>
            <Link to="/student" className="flex items-center gap-sm p-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low font-semibold"><HelpCircle className="w-5 h-5" /> Help</Link>
          </div>
          
          <div className="bg-primary text-on-primary rounded-[16px] p-lg flex flex-col gap-md shadow-sm relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-container rounded-full opacity-50 blur-xl"></div>
             <div className="flex justify-between items-start z-10">
                <span className="bg-white/20 backdrop-blur-sm text-on-primary text-[12px] font-medium px-2 py-1 rounded border border-white/30">Active</span>
                <BookOpen className="w-5 h-5 opacity-80" />
             </div>
             <div className="z-10 mt-sm flex items-center justify-between gap-4">
                <div>
                   <h3 className="text-[20px] font-bold leading-tight">Advanced Algebra</h3>
                   <p className="text-[14px] text-primary-fixed-dim mt-1">Module 2: Quadratics</p>
                </div>
                <div id="mastery-ring">
                  <ProgressRing courseId="MATH201" size={64} strokeWidth={4} />
                </div>
             </div>
             <div className="z-10 mt-sm">
                <div className="flex justify-between text-[12px] mb-1">
                   <span>Mastery</span><span className="font-bold">Dynamic</span>
                </div>
             </div>
             <Link to="/courses/MATH201" className="z-10 w-full mt-sm bg-secondary-fixed text-on-secondary-container hover:bg-secondary-fixed-dim transition-colors py-sm px-md rounded-lg text-[14px] font-semibold flex items-center justify-center gap-1 shadow-sm">
                Continue Learning
             </Link>
          </div>

          <Leaderboard />
        </aside>

        <main aria-label="Main Content" role="main" className="flex flex-col gap-lg md:col-span-2">
          <h2 className="text-[24px] md:text-[32px] font-bold text-on-surface">Your Focus Today</h2>
          
          <div className="bg-surface-container-lowest rounded-[16px] shadow-sm border border-surface-variant overflow-hidden flex flex-col">
            <div className="h-48 w-full relative bg-surface-variant flex items-end p-md bg-gradient-to-t from-black/60 to-transparent">
               <div className="absolute inset-0 z-0 overflow-hidden">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnh20I7YxBxVGXH64vMvi4gfDIoV6axsWR-BlA7Gt0E-nAyTeP2KNEFQB9oIDE77CORroizCheE3wgqLPk1E21K97PteFE1ShojLI9yV8xnxF4sFmGqOjpA6kBpJLfYhjC2YDL1QQz7OF_11as5I3yCYkxGbCBYSLI-mToCOlLvJdHJK1sNkohxEg-OKudn3rJfrXXZe6sxajmvwT3vR59ma8M8lzNfCExY04MjuNnX1T8Erov8VIae9SqUCZ1wvwAn-8wDyUfLBo" className="w-full h-full object-cover mix-blend-overlay opacity-60" alt="Course Cover"/>
               </div>
               <div className="flex justify-between items-center w-full z-10">
                  <span className="bg-secondary-container text-on-secondary-container text-[12px] font-medium px-2 py-1 rounded">Recommended</span>
                  <div className="flex items-center gap-1 text-white bg-black/40 backdrop-blur-sm px-2 py-1 rounded text-[12px]">
                     <PlayCircle className="w-4 h-4"/> 12 mins
                  </div>
               </div>
            </div>
            <div className="p-lg flex flex-col gap-md">
               <div>
                  <h3 className="text-[24px] font-semibold text-on-surface">Quadratic Equations Simplified</h3>
                  <p className="text-[16px] text-on-surface-variant mt-1">Master the core concepts of quadratic formulas and their real-world applications in this interactive session.</p>
               </div>
               <div className="flex flex-wrap gap-2">
                  <span className="bg-surface-container-high text-on-surface text-[12px] px-2 py-1 rounded">Math</span>
                  <span className="bg-surface-container-high text-on-surface text-[12px] px-2 py-1 rounded">Algebra</span>
               </div>
               <div className="mt-sm flex justify-end gap-2">
                  <button onClick={() => setIsFeedbackOpen(true)} className="bg-surface-container hover:bg-surface-container-high text-on-surface py-sm px-md rounded-lg text-[14px] font-semibold flex items-center gap-2 shadow-sm border border-outline-variant transition-colors">
                     Complete Lesson
                  </button>
                  <Link to="/quiz/1" className="bg-primary hover:bg-primary/90 text-on-primary py-sm px-lg rounded-lg text-[14px] font-semibold flex items-center gap-2 shadow-sm">
                     <PlayCircle className="w-5 h-5"/> Start Lesson
                  </Link>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-sm md:gap-md">
             <div aria-live="polite" className="bg-surface-container-lowest rounded-[16px] p-md shadow-sm border border-surface-variant flex flex-col items-center justify-center text-center gap-1 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-orange-100 rounded-full blur-xl opacity-50"></div>
                <Flame className={clsx("w-7 h-7", gamification?.streak > 0 ? "text-orange-500" : "text-outline-variant")} />
                {isLoadingGamification ? <LoadingSkeleton variant="text" className="w-10 h-8 mt-1" /> : <span className="text-[24px] font-semibold text-on-surface">{gamification?.streak || 0}</span>}
                <span className="text-[12px] text-on-surface-variant">Day Streak</span>
             </div>
             <div className="bg-surface-container-lowest rounded-[16px] p-md shadow-sm border border-surface-variant flex flex-col items-center justify-center text-center gap-1">
                <BarChart2 className="w-7 h-7 text-secondary" />
                <span className="text-[24px] font-semibold text-on-surface">87%</span>
                <span className="text-[12px] text-on-surface-variant">Accuracy</span>
             </div>
             <div className="bg-surface-container-lowest rounded-[16px] p-md shadow-sm border border-surface-variant flex flex-col items-center justify-center text-center gap-1">
                <Library className="w-7 h-7 text-primary" />
                <span className="text-[24px] font-semibold text-on-surface">7</span>
                <span className="text-[12px] text-on-surface-variant">Lessons Left</span>
             </div>
          </div>

          <div className="flex-1 bg-surface-container-lowest rounded-[16px] shadow-sm border border-surface-variant overflow-hidden flex flex-col">
            <div className="p-lg border-b border-outline-variant/50 flex justify-between items-center bg-surface-bright">
              <h3 className="text-[20px] font-semibold text-on-surface">Learning Velocity</h3>
            </div>
            <div className="p-md h-[250px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={velocityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                     <RechartsTooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'var(--color-surface)' }}
                        itemStyle={{ fontWeight: 'bold' }}
                     />
                     <Line type="monotone" name="Current Week" dataKey="current" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                     <Line type="monotone" name="Historical Avg" dataKey="average" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
          </div>
        </main>

        <aside aria-label="Additional Info" role="complementary" className="flex flex-col gap-lg md:col-span-1">
           <div className="bg-surface-container-lowest rounded-[16px] p-lg shadow-sm border border-surface-variant flex flex-col gap-md">
              <div className="flex justify-between items-center">
                 <h3 className="text-[14px] font-bold uppercase tracking-wide">Achievements</h3>
                 <a href="#" className="text-primary text-[12px]">View All</a>
              </div>
              <div className="flex justify-between items-center px-1">
                 {isLoadingGamification ? (
                   Array.from({ length: 3 }).map((_, idx) => (
                     <div key={idx} className="flex flex-col items-center gap-1">
                       <LoadingSkeleton variant="circular" className="w-12 h-12" />
                       <LoadingSkeleton className="w-12 h-3" />
                     </div>
                   ))
                 ) : (
                 (gamification?.badges || [
                    { id: 1, name: 'Top 10%', icon: Award, earned: true, color: 'orange' },
                    { id: 2, name: 'Flawless', icon: Medal, earned: true, color: 'green' },
                    { id: 3, name: 'Master', icon: Trophy, earned: false, color: 'blue' }
                 ]).map((badge: any, idx: number) => {
                    const Icon = typeof badge.icon === 'string' ? (badge.icon === 'Award' ? Award : badge.icon === 'Medal' ? Medal : Trophy) : badge.icon;
                    return (
                        <div key={idx} className={clsx("flex flex-col items-center gap-1", !badge.earned && "opacity-50 grayscale")}>
                            <div className={clsx("w-12 h-12 rounded-full flex items-center justify-center shadow-sm border", 
                              badge.color === 'orange' ? "bg-orange-100 border-orange-200" :
                              badge.color === 'green' ? "bg-green-100 border-green-200" :
                              "bg-blue-100 border-blue-200"
                            )}>
                              <Icon className={clsx("w-6 h-6", 
                                badge.color === 'orange' ? "text-orange-500" :
                                badge.color === 'green' ? "text-green-600" :
                                "text-blue-600"
                              )}/>
                            </div>
                            <span className="text-[12px] text-center text-on-surface-variant leading-tight">{badge.name}</span>
                        </div>
                    );
                 })
                 )}
              </div>
           </div>

           <div className="bg-surface-container-lowest rounded-[16px] p-lg shadow-sm border border-surface-variant flex flex-col gap-md">
              <h3 className="text-[14px] font-bold uppercase tracking-wide">Weekly Activity</h3>
              <div className="flex items-end justify-between h-24 gap-1 mt-2 border-b border-surface-variant pb-2">
                 {isLoadingGamification ? (
                   Array.from({ length: 7 }).map((_, i) => (
                     <LoadingSkeleton key={i} className="w-full h-full rounded-t" />
                   ))
                 ) : (
                 (gamification?.streakHistory || [true, false, true, true, false, false, false]).map((active: boolean, i: number) => (
                   <div key={i} className={clsx("w-full rounded-t transition-all duration-500", active ? "bg-primary h-[85%]" : "bg-surface-container-high h-[20%] border border-dashed border-outline-variant")}></div>
                 ))
                 )}
              </div>
              <div className="flex justify-between text-[10px] text-outline-variant font-medium px-1">
                 <span>M</span><span>T</span><span>W</span><span>T</span><span className="text-primary font-bold">F</span><span>S</span><span>S</span>
              </div>
           </div>

           <div className="bg-orange-50 rounded-[16px] p-lg shadow-sm border border-orange-100 flex flex-col gap-md relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-orange-200 rounded-full opacity-50"></div>
              <div className="flex justify-between items-start z-10">
                <div className="flex items-center gap-3">
                   <div className="bg-tertiary-container text-on-tertiary-container w-10 h-10 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5"/>
                   </div>
                   <div>
                      <h4 className="text-[14px] font-bold text-tertiary">Upcoming Quiz</h4>
                      <p className="text-[12px] text-tertiary/80">Tomorrow at 2:00 PM</p>
                   </div>
                </div>
                <button 
                  onClick={() => {
                    if (Notification.permission !== 'granted') {
                      Notification.requestPermission();
                    } else {
                      new Notification('Synced with Google Calendar!', {
                        body: 'Math Quiz: Quadratics & Polynomials has been added to your calendar.'
                      });
                    }
                  }}
                  className="p-2 hover:bg-orange-200/50 rounded-full transition-colors text-tertiary" 
                  aria-label="Sync with Google Calendar"
                  title="Sync with Google Calendar"
                >
                  <Calendar className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[14px] text-on-surface-variant z-10">Math Quiz: Quadratics & Polynomials. Covers modules 1-3.</p>
              <button onClick={() => addToast('Opening quiz preparation materials...', 'info')} className="z-10 w-full border border-tertiary text-tertiary hover:bg-tertiary hover:text-on-tertiary transition-colors py-2 rounded-lg text-[14px] font-bold flex items-center justify-center gap-2">
                  Prepare Now
               </button>
           </div>

           <ContributionHeatmap />
        </aside>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg md:col-span-4">
          <SkillTree />
          <RecommendedLessons />
        </div>
      </div>
      <AITutorChat courseContext="Advanced Algebra - Modules 1-3" />
    </div>
  );
}
