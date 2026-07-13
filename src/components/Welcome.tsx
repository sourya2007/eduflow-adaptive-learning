import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export default function Welcome() {

  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-sans text-on-surface">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 100% 0%, #e2e8f0 0%, transparent 50%), radial-gradient(circle at 0% 100%, #f1f5f9 0%, transparent 50%)' }}></div>
        <main aria-label="Main Content" role="main" className="z-10 w-full max-w-[448px] md:max-w-[512px] px-margin-mobile flex flex-col items-center text-center">
        <div className="mb-xl w-32 h-32 rounded-2xl border border-outline-variant bg-surface-container-lowest flex items-center justify-center shadow-sm transition-transform duration-300 hover:-translate-y-1">
          <GraduationCap className="w-16 h-16 text-primary" strokeWidth={1.5} />
        </div>
        
          <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
            <h1 className="text-[48px] leading-[56px] font-bold text-primary mb-md tracking-tight">
              EduFlow
            </h1>
            <h2 className="text-[24px] leading-[32px] font-semibold text-on-surface mb-sm">
              Welcome to EduFlow
            </h2>
            <p className="text-[18px] leading-[28px] text-on-surface-variant mb-margin-desktop">
              Personalized Learning for Every Student
            </p>
            <div className="w-full flex flex-col gap-lg">
              <Link to="/get-started" className="w-full bg-primary hover:bg-primary/90 text-on-primary font-semibold text-[14px] py-md rounded-lg shadow-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center h-12">
                Get Started
              </Link>
              <Link to="/signin" className="font-semibold text-[14px] text-outline hover:text-on-surface-variant transition-colors duration-200">
                Sign In
              </Link>
            </div>
          </div>
      </main>
    </div>
  );
}
