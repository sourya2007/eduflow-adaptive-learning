import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { NetworkStatus } from './NetworkStatus';
import { useToast } from './ToastProvider';
import { LoadingSkeleton } from './LoadingSkeleton';
import { Menu, TrendingUp, Search, Brain, LayoutDashboard, BookOpen, Settings, HelpCircle, ChevronDown, Calculator, CheckCircle2, Users, Clock, AlertTriangle, ArrowRight, ClipboardEdit, UploadCloud, Bell, Download, Check, LogOut } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import clsx from 'clsx';
import { QuickInterventionPanel } from './QuickInterventionPanel';
import { PrintReportModal } from './PrintReportModal';
import { usePerformanceTracking } from '../hooks/usePerformanceTracking';
import { useAuth } from '../context/AuthContext';

export default function TeacherDashboard() {
  usePerformanceTracking('TeacherDashboard');
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isLoadingAlerts, setIsLoadingAlerts] = useState(true);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
  const { addToast } = useToast();
  const { logout } = useAuth();

  const studentsList = [
    { name: 'Emma Thompson', acc: '94%', lessons: '12/15', active: '2 hours ago', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBr8yM04bnTobntyIo-Y7EJ96bSQuVy9rKl7Fig6Luo6IzscGxHAtNX6TR8yz3VtRXoIycPw8Qcy2geHU_uNPA-mIRR-MDhGvgF0kcR8Jvt53ayci7_s6Emzy-KT2yV3bpCAMY-jNbUKW6dLMTdC7jGDn8AF1owzhnitLgRohTpc9f7t1ZMrRFGDu1d8TiPAvV3sChrfARI1-PGfGl4AHjtzlBOMY9VhLlgZA4MPvGZcITbPMS_TELeUy3jWj-O-IWKJZw8dwfiGFI' },
    { name: 'Liam Garcia', acc: '88%', lessons: '11/15', active: 'Yesterday', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOZineywGUxA0YhI3_t17mq1hqmnveHVWqIs7ObXfPoUKbuBLr3l9opSSD0GXjNNH2ChI8tQp8n7MidFti66YztUQM5ZXB10eJx7AAscsA6WAieiBXL9NCHmuYS5gKqVDyudJa30tCkHtTywQbc5VSlFHYnl_5svgwVAg-3TE6Js0iy-hkhBeTF91smD667UtApny8KvErnNhvGynJIfYZqnMZQIKMqvgCqwslPnb0d8p4bnM1FGjHQUkIPVVa2umUTwjVkBw_xt4' },
    { name: 'Sophia Patel', acc: '85%', lessons: '10/15', active: 'Today, 9am', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPTeR7sAKIVRRvnp5Jq2N6e9tvUnCjwX02a_6INwFp8rqYrc7DAW8YT3y3UlyegWoWkSPKnw7iB-TLx0Do62atv3DRSrA9YWKd00bHPKsKrzknyfgzcq0ZHCAKXPNsyJyKjy74M6WeHVVIYofcDp9qY-Io0HFeqlMs_BpgIZ1QooNjjf2xaOScgnXbYjNXHuYLA9wu9NFQ2_uVpVbz5JaJnCJ4vXAGkCjbf0SG3Mi41f1gA20DeF4TXkUo-GLgW-PY8efcBxqT1-w' },
    { name: 'Alex Chen', acc: '55%', lessons: '8/15', active: '3 days ago', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXyJimBKVCb2NsqLrQ6eNjaV892fx9FeWX9cvh1Oam3jVN7aU-CeWv_tZWwzgqRLVgLWGW8CJ3NHUBrI9xMXbYNzby1NUwsVLnCDGVXMo-nLziVajBcQwE7WlrkR7kOQ_Gtqf81yitHXuMOQbQMIHVKAal_XI5dqD5cmfvx1ydukBpAys24qpVeBLb4jOGT78hx16j0zYk46XwSiCOZDy6ZQackr-T3faG3Tcv7UuqUsZy1M8SBDbzjtiZBpqoyC8Zq2mL5gk7ZkQ', isAlert: true }
  ];

  const toggleStudentSelection = (name: string) => {
    const newSet = new Set(selectedStudents);
    if (newSet.has(name)) {
      newSet.delete(name);
    } else {
      newSet.add(name);
    }
    setSelectedStudents(newSet);
  };

  const handleBatchAssign = () => {
    if (selectedStudents.size === 0) return;
    addToast(`Successfully assigned lesson to ${selectedStudents.size} student(s)`, 'success');
    setSelectedStudents(new Set());
  };

  useEffect(() => {
    fetch('/api/teacher/123/alerts')
      .then(res => res.json())
      .then(data => {
        setAlerts(data);
        setIsLoadingAlerts(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoadingAlerts(false);
      });
  }, []);

  const chartData = [
    { name: 'Week 1', score: 65 },
    { name: 'Week 2', score: 68 },
    { name: 'Week 3', score: 74 },
    { name: 'Week 4', score: 80 },
    { name: 'Week 5', score: 82 },
  ];

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col pt-16 pb-20 md:pl-64 font-sans antialiased">
      <header className="bg-surface shadow-sm fixed top-0 left-0 w-full z-50 flex justify-between items-center px-md py-sm md:pl-64 h-16">
        <div className="flex items-center gap-md">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-primary p-2 rounded-full hover:bg-surface-container-low transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <div className="text-[24px] font-bold text-primary tracking-tight">EduFlow</div>
          <span className="hidden md:block w-px h-6 bg-outline-variant mx-2"></span>
          <h1 className="hidden md:block text-[14px] font-semibold text-on-surface">Teacher Dashboard</h1>
        </div>
        <div className="flex items-center gap-md">
          <NetworkStatus />
          <div className="relative">
              <button onClick={() => addToast(`${alerts.length} student(s) need attention.`, 'info')} aria-live="polite" className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full relative">
                 <Bell className="w-5 h-5" />
                 {alerts.length > 0 && (
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-error rounded-full border border-surface">
                      <span className="sr-only">You have new notifications</span>
                    </span>
                 )}
              </button>
          </div>
          <ThemeToggle />
          <div className="relative hidden sm:block">
            <select className="appearance-none bg-surface-container-low border border-outline-variant rounded-lg py-1 pl-3 pr-8 text-[14px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer">
              <option>Math 101 - Period 3</option>
              <option>Science 202 - Period 4</option>
              <option>History 105 - Period 5</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-outline w-5 h-5" />
          </div>
          <button onClick={() => navigate('/student')} className="hidden md:flex items-center gap-2 hover:bg-surface-container-low transition-colors px-3 py-1.5 rounded-full text-primary">
             <TrendingUp className="w-5 h-5" />
             <span className="text-[12px] font-semibold">Progress</span>
           </button>
          <div className="flex items-center gap-2 ml-2">
            <span className="text-[12px] font-semibold hidden sm:block text-on-surface-variant">Mr. Anderson</span>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfrjH6ruZ6XupoFTPXp-F2JffW7wJzjhAv16esQjDv9wGPk8L779CAZjdOwzeIWroAjUt8N-3dIcC89PzIs4iFqGZC6QNk9MCdjdIMuvMOvhByWASnPji7e982Wcynx06rT62_HdIkvJFIPXFOl91tOW6vwb_QmYZiK1UvPe8wqU6BaI75VlpwyFLfQvUTWocdCqhX6L0dAmf0rMVnFYdqAjsikQiy20qk_Y4boCo4Lp9xOyVzQLc7uhCJ3FAf7YTgI8NGPLTawM4" alt="Profile" className="w-8 h-8 rounded-full object-cover border border-outline-variant" />
          </div>
        </div>
      </header>

      <nav aria-label="Sidebar Navigation" role="navigation" className={clsx("bg-surface-container-low fixed left-0 top-0 h-full flex-col p-md gap-sm w-64 pt-[88px] border-r border-outline-variant/30 transition-transform md:translate-x-0 z-40", isMobileMenuOpen ? "translate-x-0" : "-translate-x-full")}>
        <div className="flex items-center gap-3 px-4 mb-lg">
          <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center shrink-0">
            <Brain className="w-6 h-6 text-on-primary-container fill-current" />
          </div>
          <div>
            <div className="text-[24px] font-bold text-primary">EduFlow AI</div>
            <div className="text-[12px] font-medium text-on-surface-variant">Adaptive Learning</div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <Link to="/teacher" className="bg-secondary-container text-on-secondary-container rounded-lg flex items-center gap-3 px-4 py-3 text-[14px] font-semibold transition-transform hover:bg-surface-container-high">
            <LayoutDashboard className="w-5 h-5 fill-current" /> Dashboard
          </Link>
          <Link to="/courses" className="text-on-surface-variant flex items-center gap-3 px-4 py-3 text-[14px] font-semibold transition-transform hover:bg-surface-container-high rounded-lg">
            <BookOpen className="w-5 h-5" /> Courses
          </Link>
          <Link to="/teacher" className="text-on-surface-variant flex items-center gap-3 px-4 py-3 text-[14px] font-semibold transition-transform hover:bg-surface-container-high rounded-lg">
            <TrendingUp className="w-5 h-5" /> Progress
          </Link>
        </div>
        <div className="mt-auto flex flex-col gap-1">
          <Link to="/profile" className="text-on-surface-variant flex items-center gap-3 px-4 py-3 text-[14px] font-semibold transition-transform hover:bg-surface-container-high rounded-lg">
            <Settings className="w-5 h-5" /> Settings
          </Link>
          <Link to="/teacher" className="text-on-surface-variant flex items-center gap-3 px-4 py-3 text-[14px] font-semibold transition-transform hover:bg-surface-container-high rounded-lg">
            <HelpCircle className="w-5 h-5" /> Help
          </Link>
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 text-[14px] font-semibold text-error hover:bg-error-container rounded-lg transition-colors mb-2">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
          <button onClick={() => navigate('/quiz/1')} className="w-full bg-primary text-on-primary text-[14px] font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
            Start Quiz
          </button>
        </div>
      </nav>

      <main aria-label="Main Content" role="main" className="flex-1 p-margin-mobile md:p-lg w-full max-w-[1200px] mx-auto flex flex-col gap-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h2 className="text-[24px] md:text-[32px] font-bold text-on-background">Math 101 Overview</h2>
            <p className="text-[16px] text-on-surface-variant mt-1">Period 3 • 28 Active Students</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                const csvContent = "data:text/csv;charset=utf-8," 
                  + "Name,Score\n"
                  + chartData.map(e => `${e.name},${e.score}`).join("\n");
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "student_performance.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }} 
              className="flex items-center gap-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              <Download className="w-5 h-5" />
              CSV
            </button>
            <button 
              onClick={() => setIsPrintModalOpen(true)} 
              className="flex items-center gap-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              <Download className="w-5 h-5" />
              Export PDF
            </button>
          </div>
        </div>

        <div id="analytics-report-area" className="grid grid-cols-1 lg:grid-cols-12 gap-lg bg-background">
          <div className="lg:col-span-4 bg-surface-container-lowest rounded-[16px] shadow-sm p-lg flex flex-col relative overflow-hidden group border border-surface-variant">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-fixed-dim/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none transition-transform group-hover:scale-150"></div>
            <div className="flex justify-between items-start mb-6 z-10">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                  <Calculator className="w-6 h-6 fill-current" />
                </div>
                <h3 className="text-[24px] font-semibold text-on-surface">Math 101</h3>
              </div>
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded border border-green-200 text-[12px] font-medium">
                <CheckCircle2 className="w-4 h-4" /> On Track
              </span>
            </div>
            <div className="flex-grow flex flex-col justify-center z-10">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[36px] font-bold text-primary tracking-tighter">82%</span>
                <span className="text-[14px] font-semibold text-outline">Class Average</span>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-2 mb-4 mt-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
            <div className="mt-auto flex justify-between items-center pt-4 border-t border-outline-variant/30 z-10">
              <span className="text-[14px] text-on-surface-variant flex items-center gap-1"><Users className="w-4 h-4" /> 28 Students</span>
              <span className="text-[14px] text-on-surface-variant flex items-center gap-1"><Clock className="w-4 h-4" /> Period 3</span>
            </div>
          </div>

          <div className="lg:col-span-8 bg-error-container rounded-[16px] shadow-sm p-lg border-l-4 border-error flex flex-col justify-between">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-[24px] font-semibold text-on-error-container flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-error fill-current" /> 3 Students Need Support
                </h3>
                <p className="text-[14px] text-on-error-container/80 mt-1">Falling below 60% accuracy in recent modules.</p>
              </div>
              <button onClick={() => addToast('Reviewing at-risk students...', 'info')} className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-[14px] font-semibold transition-colors shadow-sm flex items-center gap-2 shrink-0">
                Take Action <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { name: 'Alex Chen', acc: '55%', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQjZVHoKhhAPz6-HhcRavZSQuI99B_6hjAMgK8bblzJaCsx9Yjx52iiZVZmUmhYa5QSU7OcI06x8nOWDlLrUTYj6sSRcAggf-msn1sNk7aDf33rNB5Gd0w81cmvvoTs0oZyykMZILoyoCa1nr5BbXdbQtqZ3vVZpTxyAeZzC-8-aEfDrBRIR3mn3JaPmSYw1mRxLRmcRGyXMdY_Xj78xH0P9743xEblbd0GsALqFl_wm6RlBBPE3vAFrUgueMiEJdIF-8d7zq4dIY' },
                { name: 'Jordan Davis', acc: '52%', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAX7gx6ei0EcEN21NLhBiHOZ_x1d3zpwfuNpDGhrcdjGwtbhlyDaHmsLO5cIeMxQa6Obt9m-QoP9TSkuJrY0hjcTtezz1Ub6iNkBFOs4eGczNpZIU4_m38ccoTaBxswZE0lQr3lRRUFqP5vYDEIl_x4CF3uQgFfowa_-3MmiRnzYT39Sl5OGDlInJ7nfJyzQadAFdCIzxZ-kXZ3BqJpGbVXAU8qETwNaP_MhLB2qC8whoPsJTadhJcls5JIqn3Rz4rH8sdEVUlFwYU' },
                { name: 'Casey Wilson', acc: '58%', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEuKCHLOSRFLceXlhsYDgMPulnf6BdodoUk_pUd50VJIwfhjkAfZUL2e6hMr_F-KnKKc_qJX9Ncm4eLMMdR49jxyU3tPcwxxugjPprQolXQaBBIFT4HjB81kRZcisBb0c9hDewULt542X3jJ9NgMZ7IG289m7YP7fK8OBYPDC4hR86_Md8VmEREAPASyc-X6yolTnf-32u85E8y4ggl-0xiXOd0YvrWHgeJlVo8zcONkiuwT_cUwDdQCl3aAYESj3zuuhqvZKHAu4' }
              ].map(student => (
                <div key={student.name} className="bg-white/60 rounded-lg p-3 flex items-center gap-3 min-w-[200px] flex-1">
                  <img src={student.img} alt={student.name} className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-[14px] font-semibold text-on-error-container">{student.name}</p>
                    <p className="text-[14px] text-error font-medium">{student.acc} Acc.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 bg-surface-container-lowest rounded-[16px] shadow-sm border border-surface-variant overflow-hidden flex flex-col">
            <div className="p-lg border-b border-outline-variant/50 flex justify-between items-center bg-surface-bright">
              <h3 className="text-[24px] font-semibold text-on-surface">Class Performance Trend</h3>
            </div>
            <div className="p-md h-[250px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} domain={[0, 100]} dx={-10} />
                     <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ color: '#2563eb', fontWeight: 'bold' }}
                     />
                     <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-12 bg-surface-container-lowest rounded-[16px] shadow-sm border border-surface-variant overflow-hidden flex flex-col relative">
            {selectedStudents.size > 0 && (
              <div className="absolute top-0 left-0 w-full h-full bg-surface-container-lowest/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center animate-in fade-in">
                <div className="bg-surface-container-high p-md rounded-xl shadow-xl border border-outline-variant flex flex-col items-center gap-4 max-w-[384px] w-full text-center">
                  <div className="text-[18px] font-bold text-on-surface">{selectedStudents.size} Student{selectedStudents.size > 1 ? 's' : ''} Selected</div>
                  <p className="text-[14px] text-on-surface-variant">Batch assign a lesson or resource to the selected students.</p>
                  <div className="flex gap-3 w-full">
                    <button onClick={() => setSelectedStudents(new Set())} className="flex-1 px-4 py-2 bg-surface-container border border-outline-variant rounded-lg text-on-surface font-semibold hover:bg-surface-container-highest transition-colors">Cancel</button>
                    <button onClick={handleBatchAssign} className="flex-1 px-4 py-2 bg-primary text-on-primary rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-sm">Assign Lesson</button>
                  </div>
                </div>
              </div>
            )}
            <div className="p-lg border-b border-outline-variant/50 flex justify-between items-center bg-surface-bright">
              <div className="flex items-center gap-3">
                <h3 className="text-[24px] font-semibold text-on-surface">Student Performance</h3>
                {selectedStudents.size > 0 && (
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-[12px] font-bold">{selectedStudents.size} selected</span>
                )}
              </div>
              <button onClick={() => addToast('Opening full student roster...', 'info')} className="text-primary hover:text-primary-container text-[14px] font-semibold flex items-center gap-1">
                View All <ChevronDown className="w-5 h-5 -rotate-90" />
              </button>
            </div>
            <div className="overflow-x-auto w-full flex-grow">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant text-[12px] font-medium uppercase tracking-wider">
                    <th className="py-3 px-4 border-b border-outline-variant/30 w-10">
                      <button 
                        onClick={() => {
                          if (selectedStudents.size === studentsList.length) {
                            setSelectedStudents(new Set());
                          } else {
                            setSelectedStudents(new Set(studentsList.map(s => s.name)));
                          }
                        }}
                        className={clsx("w-5 h-5 rounded flex items-center justify-center border", selectedStudents.size === studentsList.length ? "bg-primary border-primary text-on-primary" : "border-outline-variant bg-surface")}
                      >
                        {selectedStudents.size === studentsList.length && <Check className="w-3.5 h-3.5" />}
                      </button>
                    </th>
                    <th className="py-3 px-4 border-b border-outline-variant/30">Student Name</th>
                    <th className="py-3 px-4 border-b border-outline-variant/30">Accuracy</th>
                    <th className="py-3 px-4 border-b border-outline-variant/30">Lessons Done</th>
                    <th className="py-3 px-4 border-b border-outline-variant/30">Last Active</th>
                  </tr>
                </thead>
                <tbody className="text-[14px] text-on-surface divide-y divide-outline-variant/20">
                  {isLoadingAlerts ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <tr key={i}>
                        <td className="py-3 px-4"><LoadingSkeleton className="w-5 h-5 rounded" /></td>
                        <td className="py-3 px-4 flex items-center gap-3"><LoadingSkeleton variant="circular" className="w-7 h-7" /><LoadingSkeleton className="w-24 h-4" /></td>
                        <td className="py-3 px-4"><LoadingSkeleton className="w-10 h-4" /></td>
                        <td className="py-3 px-4"><LoadingSkeleton className="w-12 h-4" /></td>
                        <td className="py-3 px-4"><LoadingSkeleton className="w-20 h-4" /></td>
                      </tr>
                    ))
                  ) : (
                    studentsList.map(student => (
                      <tr key={student.name} className={clsx("transition-colors cursor-pointer", student.isAlert ? "bg-error-container/20 hover:bg-error-container/30" : "hover:bg-surface-container-lowest/50", selectedStudents.has(student.name) && "bg-primary/5")}>
                        <td className="py-3 px-4">
                          <button 
                            onClick={() => toggleStudentSelection(student.name)}
                            className={clsx("w-5 h-5 rounded flex items-center justify-center border transition-colors", selectedStudents.has(student.name) ? "bg-primary border-primary text-on-primary" : "border-outline-variant bg-surface")}
                          >
                            {selectedStudents.has(student.name) && <Check className="w-3.5 h-3.5" />}
                          </button>
                        </td>
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img src={student.img} alt="Student" className="w-7 h-7 rounded-full" /> {student.name}
                        </td>
                        <td className="py-3 px-4">
                          <span className={clsx("font-medium", student.isAlert ? "text-error" : (parseInt(student.acc) >= 90 ? "text-green-700 dark:text-green-400" : "text-primary"))}>
                            {student.acc}
                          </span>
                        </td>
                        <td className="py-3 px-4">{student.lessons}</td>
                        <td className="py-3 px-4 text-on-surface-variant">{student.active}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-md">
            <h3 className="text-[24px] font-semibold text-on-background mb-2">Quick Actions</h3>
            <button onClick={() => addToast('Assignment creator opened.', 'info')} className="bg-primary hover:bg-primary-container text-on-primary rounded-lg p-4 flex items-center justify-between shadow-sm transition-all group">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg"><ClipboardEdit className="w-6 h-6" /></div>
                  <span className="text-[14px] font-semibold">Add New Assignment</span>
              </div>
              <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => addToast('File uploader opened.', 'info')} className="bg-surface-container-high border border-outline-variant hover:border-primary text-primary rounded-lg p-4 flex items-center justify-between shadow-sm transition-all hover:bg-surface-container-highest group">
              <div className="flex items-center gap-3">
                <div className="bg-white/50 p-2 rounded-lg text-primary"><UploadCloud className="w-6 h-6" /></div>
                <span className="text-[14px] font-semibold text-lg text-on-surface">Upload Material</span>
              </div>
              <UploadCloud className="w-6 h-6 text-outline group-hover:text-primary transition-colors" />
            </button>
            
            <QuickInterventionPanel />
            
            <div className="mt-auto bg-surface-container rounded-lg p-4 border border-surface-variant border-dashed">
              <p className="text-[14px] text-on-surface-variant text-center">
                Need to grade? You have <span className="font-bold text-primary">12 pending</span> submissions.
              </p>
            </div>
          </div>
        </div>
      </main>
      <PrintReportModal isOpen={isPrintModalOpen} onClose={() => setIsPrintModalOpen(false)} chartData={chartData} />
    </div>
  );
}
