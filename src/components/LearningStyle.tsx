import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, Headphones, Activity, BookOpen, ArrowLeft, ArrowRight, Circle, CheckCircle2 } from 'lucide-react';

export default function LearningStyle() {
  const [selected, setSelected] = useState<string | null>('visual');
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col items-center justify-center p-margin-mobile md:p-margin-desktop font-sans antialiased">
      <div className="w-full max-w-[600px] mx-auto mb-xl">
        <div className="flex justify-between items-center mb-base">
          <span className="text-[12px] font-medium text-outline">Step 2 of 4</span>
          <span className="text-[12px] font-semibold text-primary">50%</span>
        </div>
        <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: '50%' }}></div>
        </div>
      </div>

      <main className="w-full max-w-[800px] mx-auto bg-surface-container-lowest rounded-[24px] shadow-sm p-lg md:p-[40px] flex flex-col gap-xl border border-surface-variant">
        <header className="text-center space-y-sm">
          <h1 className="text-[24px] md:text-[32px] font-bold text-on-background">Let's Understand Your Learning Style</h1>
          <p className="text-[16px] md:text-[18px] text-on-surface-variant max-w-[600px] mx-auto">Select the method that best describes how you absorb information most effectively.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md w-full">
          {[
            { id: 'visual', icon: Eye, title: 'Visual', desc: 'You prefer using images, spatial understanding, charts, and diagrams to learn.' },
            { id: 'auditory', icon: Headphones, title: 'Auditory', desc: 'You learn best through listening, speaking, lectures, and group discussions.' },
            { id: 'kinesthetic', icon: Activity, title: 'Kinesthetic', desc: 'You prefer hands-on experience, physical activity, and learning by doing.' },
            { id: 'reading', icon: BookOpen, title: 'Reading / Writing', desc: 'You prefer interacting with text, taking detailed notes, and reading manuals.' },
          ].map((option) => (
            <label key={option.id} className="relative cursor-pointer group">
              <input type="radio" name="learning_style" value={option.id} checked={selected === option.id} onChange={() => setSelected(option.id)} className="peer sr-only" />
              <div className={`h-full border-2 rounded-[16px] p-lg transition-all duration-200 flex flex-col relative overflow-hidden ${selected === option.id ? 'border-primary bg-surface-container-low' : 'border-surface-variant bg-surface hover:border-primary-fixed-dim hover:bg-surface-container'}`}>
                <div className="flex justify-between items-start mb-md">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${selected === option.id ? 'bg-primary text-on-primary' : 'bg-secondary-container text-on-secondary-container'}`}>
                    <option.icon className="w-6 h-6" />
                  </div>
                  <div className="w-6 h-6 rounded-full relative flex items-center justify-center">
                    {selected === option.id ? (
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    ) : (
                      <Circle className="w-6 h-6 text-outline-variant" />
                    )}
                  </div>
                </div>
                <h3 className="text-[20px] font-semibold text-on-background mb-xs">{option.title}</h3>
                <p className="text-[14px] text-on-surface-variant">{option.desc}</p>
              </div>
            </label>
          ))}
        </div>

        <div className="flex justify-between items-center mt-md pt-lg border-t border-surface-variant">
          <Link to="/" className="text-[14px] font-semibold text-outline hover:text-on-background px-md py-sm rounded-lg transition-colors flex items-center gap-xs">
            <ArrowLeft className="w-5 h-5" /> Back
          </Link>
          <button onClick={() => navigate('/student')} className="bg-primary hover:bg-primary-container text-on-primary text-[14px] font-semibold px-xl py-[12px] rounded-lg shadow-sm transition-all duration-200 flex items-center gap-sm">
            Next Step <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
}
