import { Link } from 'react-router-dom';
import { Search, TrendingUp, PlayCircle, Info, CheckSquare, CheckCircle2, Lock, BookOpen, Clock, Signal, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function CourseDetails() {
  const [openModule, setOpenModule] = useState<number | null>(2);

  return (
    <div className="bg-background text-on-background min-h-screen pt-16 font-sans">
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-md py-sm bg-surface shadow-sm h-16">
        <div className="flex items-center gap-sm">
          <Link to="/courses" className="text-[24px] font-bold text-primary">EduFlow</Link>
        </div>
        <div className="flex items-center gap-md">
           <Link to="/student" className="hidden sm:flex items-center gap-1 text-[14px] font-semibold text-on-surface-variant hover:text-primary transition-colors">
              <TrendingUp className="w-5 h-5"/> Progress
           </Link>
           <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-surface-container-high cursor-pointer">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHqFLJv4hhtGpEF3boGJ7eQSDYVDLnnUvYFVfQf69JqcTnxN9swmo96RwMD4kQeyFjGLxLOe4e6GeDMhaaovOs0aV-Ey19SjdZ9v7r799xw4HBWXbxwBFax-UkvdeEVqKafnv8DhlMP-e7Q3H3vR0fBDJIC80z9KHGH0t-c-Qyavz6dVMI4kbMMiTfPX0nWRmwXRH5YOSCaOjGG33uGbAy-E3kOTkYZUW9uL_H-7Qjrs21jp3gYLmx8Gp2zaG-QR1S9QZcV-Bn2qY" className="w-full h-full object-cover" alt="Profile" />
           </div>
        </div>
      </nav>

      <main className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg lg:gap-xl">
          <div className="lg:col-span-8 flex flex-col gap-lg">
            
            <div className="bg-surface rounded-[16px] shadow-sm p-lg relative overflow-hidden border border-surface-variant">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-fixed rounded-full blur-[80px] opacity-30 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="flex flex-col gap-md mb-lg relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-1 bg-secondary-fixed text-on-secondary-container text-[12px] font-medium rounded">Mathematics</span>
                  <span className="px-2 py-1 bg-surface-container-high text-on-surface-variant text-[12px] font-medium rounded">Core Requirement</span>
                </div>
                <h1 className="text-[24px] md:text-[32px] font-bold text-on-surface">Advanced Algebra</h1>
                <p className="text-[16px] text-on-surface-variant">Master complex equations, functions, and mathematical modeling.</p>
              </div>
              <div className="bg-surface-container-low rounded-lg p-md mb-lg relative z-10 border border-outline-variant">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[14px] font-semibold text-on-surface">Course Progress</span>
                  <span className="text-[14px] font-bold text-primary">65%</span>
                </div>
                <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-[14px] text-on-surface-variant mt-2">You are on track to finish by October 15th.</p>
              </div>
              <Link to="/quiz/1" className="w-full sm:w-auto px-xl py-3 bg-primary hover:bg-primary-container text-on-primary font-semibold text-[14px] rounded-lg shadow-sm transition-all inline-flex items-center justify-center gap-2 relative z-10">
                <PlayCircle className="w-5 h-5" /> Resume Learning
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="bg-surface rounded-[16px] shadow-sm p-lg border border-surface-variant">
                <h2 className="text-[24px] font-semibold text-on-surface mb-md flex items-center gap-2">
                  <Info className="w-6 h-6 text-primary" /> About this Course
                </h2>
                <p className="text-[16px] text-on-surface-variant leading-relaxed">
                  Dive deep into the algebraic fundamentals required for calculus and advanced sciences. This course bridges the gap between basic algebra and higher-level mathematical theory, focusing on real-world applications and problem-solving strategies.
                </p>
              </div>
              <div className="bg-surface rounded-[16px] shadow-sm p-lg border border-surface-variant">
                <h2 className="text-[24px] font-semibold text-on-surface mb-md flex items-center gap-2">
                  <CheckSquare className="w-6 h-6 text-primary" /> Learning Objectives
                </h2>
                <ul className="flex flex-col gap-3">
                  {['Solve complex systems of linear equations.', 'Analyze and graph quadratic functions.', 'Understand exponential and logarithmic models.'].map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-[14px] text-on-surface-variant">
                      <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /> {obj}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-surface rounded-[16px] shadow-sm p-lg border border-surface-variant">
              <h2 className="text-[24px] font-semibold text-on-surface mb-lg flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary" /> Course Curriculum
              </h2>
              <div className="flex flex-col gap-3">
                <div className="border border-surface-variant rounded-lg p-md bg-surface-container-low cursor-pointer hover:border-primary-fixed transition-colors flex justify-between items-center group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-semibold text-on-surface">Module 1: Linear Equations</h3>
                      <p className="text-[14px] text-on-surface-variant">8 Lessons • Completed</p>
                    </div>
                  </div>
                  <ChevronDown className="w-5 h-5 text-outline group-hover:text-primary transition-colors" />
                </div>

                <div className="border-2 border-primary rounded-lg p-md bg-surface shadow-sm">
                  <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setOpenModule(openModule === 2 ? null : 2)}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
                        <PlayCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[14px] font-bold text-primary">Module 2: Quadratics</h3>
                        <p className="text-[14px] text-on-surface-variant">10 Lessons • Active</p>
                      </div>
                    </div>
                    {openModule === 2 ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-primary" />}
                  </div>
                  
                  {openModule === 2 && (
                    <div className="pl-14 flex flex-col gap-2 border-t border-surface-variant pt-4">
                      <div className="flex justify-between items-center py-2 px-3 rounded bg-surface-container-high">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-secondary" />
                          <span className="text-[14px] line-through text-on-surface-variant">Introduction to Quadratics</span>
                        </div>
                        <span className="text-[14px] text-on-surface-variant">15m</span>
                      </div>
                      <div className="flex justify-between items-center py-2 px-3 rounded bg-primary-fixed-dim/20 border-l-2 border-primary">
                        <div className="flex items-center gap-2">
                          <PlayCircle className="w-4 h-4 text-primary" />
                          <span className="text-[14px] font-semibold text-primary">Factoring Techniques</span>
                        </div>
                        <span className="text-[14px] text-primary">20m</span>
                      </div>
                      <div className="flex justify-between items-center py-2 px-3 rounded hover:bg-surface-container-low cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-outline" />
                          <span className="text-[14px] text-on-surface-variant">The Quadratic Formula</span>
                        </div>
                        <span className="text-[14px] text-on-surface-variant">25m</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border border-surface-variant rounded-lg p-md bg-surface opacity-75">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-surface-variant text-outline flex items-center justify-center">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[14px] font-semibold text-on-surface-variant">Module 3: Functions</h3>
                        <p className="text-[14px] text-outline">6 Lessons • Locked</p>
                      </div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-outline" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-lg">
            <div className="bg-surface rounded-[16px] shadow-sm p-lg border border-surface-variant">
              <h3 className="text-[14px] font-semibold text-on-surface mb-4">Course Overview</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 p-3 bg-surface-container-low rounded-lg">
                  <div className="w-8 h-8 rounded bg-primary-fixed text-primary flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-on-surface-variant">Total Lessons</p>
                    <p className="text-[14px] font-semibold text-on-surface">24 Lessons</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-surface-container-low rounded-lg">
                  <div className="w-8 h-8 rounded bg-secondary-fixed text-secondary flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-on-surface-variant">Estimated Time</p>
                    <p className="text-[14px] font-semibold text-on-surface">12 Hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-surface-container-low rounded-lg">
                  <div className="w-8 h-8 rounded bg-tertiary-fixed text-tertiary flex items-center justify-center">
                    <Signal className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-on-surface-variant">Difficulty</p>
                    <p className="text-[14px] font-semibold text-on-surface">Intermediate</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-[16px] shadow-sm p-lg border border-surface-variant flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-surface-variant">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuApHr57fmR7fiHFnbmvmkD539yv95qpvGm2QGp3OYCdWEQpDBeaxaweAoHMJiQC3hCD5S5wwaJgkJWC2S43AFBoA9NNnzlu1dwnljVKzJQ3JjFJ8MIVn9m4Sh3xJAEBjfhXeuL9PFHpiwi702tTTtbDvSw2156Ac96OCqgy52Tuin_2jvs1mzFgVs8UiG7fgHIkeuEwrOIyIwctkLBRnFKzf1Gh5VetLg62i-EVZKQnimjvR4nbNOPXWbwaBXxfSlwMizq5I9nFvJI" alt="Prof" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-[24px] font-semibold text-on-surface">Prof. A.I. Turing</h3>
              <p className="text-[12px] font-medium text-primary mb-4">Lead Mathematics Tutor</p>
              <p className="text-[14px] text-on-surface-variant mb-4">
                Specializing in making complex algebraic concepts accessible through adaptive learning techniques and real-time problem solving.
              </p>
              <button className="w-full px-4 py-2 border border-outline text-on-surface font-semibold text-[14px] rounded hover:bg-surface-container-low transition-colors">
                View Profile
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
