import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, TrendingUp, ChevronRight, Calculator, Microscope, Globe, Code, BookOpen, DownloadCloud, CheckCircle } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { NetworkStatus } from './NetworkStatus';
import { LoadingSkeleton } from './LoadingSkeleton';

const COURSES = [
  { id: 'MATH201', title: 'Advanced Algebra', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnh20I7YxBxVGXH64vMvi4gfDIoV6axsWR-BlA7Gt0E-nAyTeP2KNEFQB9oIDE77CORroizCheE3wgqLPk1E21K97PteFE1ShojLI9yV8xnxF4sFmGqOjpA6kBpJLfYhjC2YDL1QQz7OF_11as5I3yCYkxGbCBYSLI-mToCOlLvJdHJK1sNkohxEg-OKudn3rJfrXXZe6sxajmvwT3vR59ma8M8lzNfCExY04MjuNnX1T8Erov8VIae9SqUCZ1wvwAn-8wDyUfLBo', lessons: 24, level: 'Intermediate', category: 'Mathematics', inProgress: true, progress: 65, downloaded: true },
  { id: 'HIST105', title: 'World History II', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSvUoWOW-l-mvtnxRF64tUvCe2TvQ-3D8TnXShP4dfVMhMLw8dvMFzULNqJO5AjWHF216Ur1M8P1wifM1lzKhqgO_YmL025OO-TPTeb7Kz_ZqkCsHJdHE9JHqbc0sESYh9bCDIoInWI24BHQ_6voM3oGT_jdEJcjDBg2oT8J_095eWNZjfTl2TVnso2xqUemH7duIBU2PraIudi04EtXSabvL3wkUf30tirLNucJuzSFqPAgKFi_xO5PfoRdlnxYCqeUts2GMSk0g', lessons: 30, level: 'Beginner', category: 'Humanities', inProgress: true, progress: 30, downloaded: false },
  { id: 'PHYS101', title: 'Introduction to Physics', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnh20I7YxBxVGXH64vMvi4gfDIoV6axsWR-BlA7Gt0E-nAyTeP2KNEFQB9oIDE77CORroizCheE3wgqLPk1E21K97PteFE1ShojLI9yV8xnxF4sFmGqOjpA6kBpJLfYhjC2YDL1QQz7OF_11as5I3yCYkxGbCBYSLI-mToCOlLvJdHJK1sNkohxEg-OKudn3rJfrXXZe6sxajmvwT3vR59ma8M8lzNfCExY04MjuNnX1T8Erov8VIae9SqUCZ1wvwAn-8wDyUfLBo', lessons: 24, level: 'Beginner', category: 'Science', inProgress: false, progress: 0, downloaded: false },
  { id: 'COMP201', title: 'Data Structures in Python', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfSzHD-T1VP-PUGHAWB--TiNKMfDEHual-fMnhLl8nHbcooL-NTCILAENaID5w38D0y5BwxalxhS6nmW-zQY2tMSde46A3yo6-yBdmDeWm8s7Aj7SIIgizJ7gydIZEheyLiym0LC6xSw3lDF2yFWqsurkelG3KZWMqr4DAZrR3ODLmIyF7NoYyfqwPDPRwu0E938iRBhNLJLilO0pYYCU9J6-3F_B8BCS0x2KqjNfECtX7m6wDZw1FyZsroKzPeI9qc0BbMdv-CwI', lessons: 42, level: 'Intermediate', category: 'Computer Sci', inProgress: false, progress: 0, downloaded: true },
  { id: 'HIST101', title: 'Classical Antiquity', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSvUoWOW-l-mvtnxRF64tUvCe2TvQ-3D8TnXShP4dfVMhMLw8dvMFzULNqJO5AjWHF216Ur1M8P1wifM1lzKhqgO_YmL025OO-TPTeb7Kz_ZqkCsHJdHE9JHqbc0sESYh9bCDIoInWI24BHQ_6voM3oGT_jdEJcjDBg2oT8J_095eWNZjfTl2TVnso2xqUemH7duIBU2PraIudi04EtXSabvL3wkUf30tirLNucJuzSFqPAgKFi_xO5PfoRdlnxYCqeUts2GMSk0g', lessons: 18, level: 'Beginner', category: 'Humanities', inProgress: false, progress: 0, downloaded: false },
];

const CATEGORIES = [
  { name: 'All', icon: Search },
  { name: 'Mathematics', icon: Calculator },
  { name: 'Science', icon: Microscope },
  { name: 'Humanities', icon: Globe },
  { name: 'Computer Sci', icon: Code },
];

export default function CourseList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  
  const [coursesData, setCoursesData] = useState<any[]>(() => {
    const cached = localStorage.getItem('courses_data_cache');
    return cached ? JSON.parse(cached) : COURSES;
  });
  
  const [isLoading, setIsLoading] = useState(!localStorage.getItem('courses_data_cache'));
  
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setCoursesData(COURSES);
        localStorage.setItem('courses_data_cache', JSON.stringify(COURSES));
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const [downloads, setDownloads] = useState<Record<string, boolean>>(
    coursesData.reduce((acc, course) => ({ ...acc, [course.id]: course.downloaded || false }), {})
  );

  const toggleDownload = (e: React.MouseEvent, courseId: string) => {
    e.preventDefault();
    setDownloads(prev => ({ ...prev, [courseId]: !prev[courseId] }));
  };

  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || course.level === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const inProgressCourses = filteredCourses.filter(c => c.inProgress);
  const otherCourses = filteredCourses.filter(c => !c.inProgress);

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-20 pt-16 font-sans">
      <header aria-label="Course Header" className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-md py-sm bg-surface shadow-sm h-16">
        <div className="flex items-center gap-sm">
          <Link to="/student" aria-label="Home" className="text-[24px] font-bold text-primary">EduFlow</Link>
        </div>
        <div className="flex items-center gap-sm">
          <NetworkStatus />
          <ThemeToggle />
          <button onClick={() => navigate('/student')} aria-label="View Progress" className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </button>
          <Link to="/profile" aria-label="View Profile" className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-high border-2 border-surface block">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPeZk-2CI_LiEyIVq66OLjSyXJ9SGOe_TcZx3Yt8oswPplwMwcCyOJDiRLKMYVADXgbDUBSeCcipRaD6yqwLf_LO3a39JA69s9qbR-6fpDapp7n9vDDaaQZvMDv9WTRiAT6UPUDdU2M2QqJECB-v65kzMJQR9rYF_5TQ68T26N8_ORrtlZ9xccKA_JocG7VsOelHdfTp0llqtwLADSoQww04Y-TOlCIxYYbxEsE1b5fS-LKAOYilw7oMIqxR_r6y7Bt6UqOIjvp9g" alt="Profile" className="w-full h-full object-cover" />
          </Link>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-md py-lg flex flex-col md:flex-row gap-lg">
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-lg">
          <section className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchQuery}
              aria-label="Search courses"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm transition-all" 
            />
          </section>

          <section className="flex flex-col gap-sm">
            <h3 className="text-[14px] font-bold uppercase tracking-wide text-on-surface-variant">Categories</h3>
            <div className="flex flex-col gap-2">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.name;
                return (
                  <button 
                    key={cat.name}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[14px] font-semibold transition-all border ${
                      isSelected 
                        ? 'bg-primary text-on-primary border-primary shadow-sm' 
                        : 'bg-surface-container-lowest text-on-surface border-outline-variant hover:border-primary/50 hover:bg-surface-container-low'
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {cat.name}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="flex flex-col gap-sm">
            <h3 className="text-[14px] font-bold uppercase tracking-wide text-on-surface-variant">Difficulty</h3>
            <div className="flex flex-col gap-2">
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map(level => {
                const isSelected = selectedDifficulty === level;
                return (
                  <button 
                    key={level}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedDifficulty(level)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[14px] font-semibold transition-all border ${
                      isSelected 
                        ? 'bg-secondary text-on-secondary border-secondary shadow-sm' 
                        : 'bg-surface-container-lowest text-on-surface border-outline-variant hover:border-secondary/50 hover:bg-surface-container-low'
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </section>
        </aside>

        <div className="flex-grow flex flex-col gap-xl">
          {isLoading ? (
            <div className="flex flex-col gap-lg w-full">
               <LoadingSkeleton className="w-1/3 h-8" />
               <div className="flex flex-col gap-md">
                 <LoadingSkeleton className="w-full h-32 rounded-xl" />
                 <LoadingSkeleton className="w-full h-32 rounded-xl" />
               </div>
            </div>
          ) : (
            <>
              {inProgressCourses.length > 0 && (
            <section className="flex flex-col gap-sm">
              <h2 className="text-[24px] font-bold text-on-surface">In Progress</h2>
              <div className="flex flex-col gap-md">
              {inProgressCourses.map(course => (
                <Link key={course.id} to={`/courses/${course.id}`} className="bg-surface-container-lowest rounded-xl p-md shadow-sm border border-outline-variant flex flex-col gap-sm group hover:-translate-y-1 hover:border-primary/50 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className={`text-[12px] font-medium mb-1 ${course.category === 'Mathematics' ? 'text-primary' : 'text-secondary-fixed-dim'}`}>{course.id}</span>
                      <h3 className="text-[18px] font-semibold text-on-surface leading-tight">{course.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => toggleDownload(e, course.id)}
                        className={`p-1.5 rounded-full transition-colors ${downloads[course.id] ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}
                        title={downloads[course.id] ? "Downloaded" : "Download for offline"}
                      >
                        {downloads[course.id] ? <CheckCircle className="w-4 h-4" /> : <DownloadCloud className="w-4 h-4" />}
                      </button>
                      <ChevronRight className="w-5 h-5 text-outline-variant group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  <div className="flex items-center gap-sm mt-1">
                    <div className="flex-grow bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                      <div className={`h-full rounded-full ${course.category === 'Mathematics' ? 'bg-primary' : 'bg-secondary'}`} style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <span className="text-[12px] text-on-surface-variant w-8 text-right">{course.progress}%</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {otherCourses.length > 0 && (
          <section className="flex flex-col gap-sm">
            <div className="flex justify-between items-baseline">
              <h2 className="text-[24px] font-bold text-on-surface">Available Courses</h2>
            </div>
            <div className="flex flex-col gap-md">
              {otherCourses.map((course) => (
                <Link key={course.id} to={`/courses/${course.id}`} className="flex gap-4 bg-surface-container-lowest rounded-xl p-3 shadow-sm border border-outline-variant cursor-pointer group hover:-translate-y-1 hover:border-primary/50 transition-all duration-300">
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-surface-variant relative">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-col justify-center flex-grow py-1">
                    <h3 className="text-[16px] font-semibold leading-tight mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                    <div className="flex items-center gap-1 text-on-surface-variant mb-1 text-[12px]">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{course.lessons} Lessons</span>
                      <span className="w-1 h-1 rounded-full bg-outline-variant mx-1"></span>
                      <span>{course.level}</span>
                    </div>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="inline-block px-2 py-0.5 bg-surface-container-low text-primary text-[10px] font-medium rounded">{course.category}</span>
                      <button 
                        onClick={(e) => toggleDownload(e, course.id)}
                        className={`p-1.5 rounded-full transition-colors ${downloads[course.id] ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}
                        title={downloads[course.id] ? "Downloaded" : "Download for offline"}
                      >
                        {downloads[course.id] ? <CheckCircle className="w-4 h-4" /> : <DownloadCloud className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

          {filteredCourses.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center text-center bg-surface-container-lowest border border-outline-variant rounded-xl border-dashed">
              <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mb-4 text-outline-variant">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-[18px] font-semibold text-on-surface mb-2">No courses found</h3>
              <p className="text-[14px] text-on-surface-variant max-w-[300px]">
                We couldn't find any courses matching your current search or filters.
              </p>
            </div>
          )}
          </>
        )}
        </div>
      </main>
    </div>
  );
}
