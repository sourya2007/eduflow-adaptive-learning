import React, { useEffect, useState } from 'react';
import { PlayCircle, Clock, Star, Sparkles } from 'lucide-react';
import { LoadingSkeleton } from './LoadingSkeleton';
import { Link } from 'react-router-dom';

interface Lesson {
  id: string;
  title: string;
  module: string;
  duration: string;
  match: number;
}

export function RecommendedLessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to adaptive learning engine
    const fetchRecommendations = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1200));
        setLessons([
          { id: 'l1', title: 'Factoring Polynomials', module: 'Algebra', duration: '15m', match: 98 },
          { id: 'l2', title: 'Graphing Inequalities', module: 'Algebra', duration: '20m', match: 92 },
          { id: 'l3', title: 'Introduction to Limits', module: 'Calculus', duration: '12m', match: 85 },
        ]);
      } catch (error) {
        console.error('Failed to fetch recommendations', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="bg-surface-container-lowest rounded-[16px] shadow-sm border border-surface-variant overflow-hidden flex flex-col">
      <div className="p-lg border-b border-outline-variant/50 flex justify-between items-center bg-surface-bright">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-secondary" />
          <h3 className="text-[20px] font-semibold text-on-surface">Recommended For You</h3>
        </div>
        <span className="text-[12px] bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full font-medium">Adaptive Engine</span>
      </div>
      <div className="p-md flex flex-col gap-sm">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4 p-md border border-surface-variant rounded-xl">
              <LoadingSkeleton className="w-16 h-16 rounded-lg shrink-0" />
              <div className="flex flex-col gap-2 w-full">
                <LoadingSkeleton className="w-2/3 h-5" />
                <LoadingSkeleton className="w-1/3 h-4" />
                <div className="flex gap-2 mt-auto">
                  <LoadingSkeleton className="w-16 h-4" />
                  <LoadingSkeleton className="w-16 h-4" />
                </div>
              </div>
            </div>
          ))
        ) : (
          lessons.map(lesson => (
            <div key={lesson.id} className="group flex gap-4 p-md border border-surface-variant hover:border-primary/50 hover:bg-surface-container-low transition-all rounded-xl cursor-pointer">
              <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-lg shrink-0 flex items-center justify-center">
                <PlayCircle className="w-8 h-8 opacity-80 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col flex-grow min-w-0">
                <h4 className="text-[16px] font-bold text-on-surface truncate group-hover:text-primary transition-colors">{lesson.title}</h4>
                <span className="text-[14px] text-on-surface-variant truncate">{lesson.module}</span>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-[12px] text-on-surface-variant font-medium">
                    <Clock className="w-3.5 h-3.5" /> {lesson.duration}
                  </div>
                  <div className="flex items-center gap-1 text-[12px] text-secondary font-bold">
                    <Star className="w-3.5 h-3.5 fill-secondary" /> {lesson.match}% Match
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                 <Link to={`/lesson/${lesson.id}`} className="hidden sm:flex bg-surface-container hover:bg-primary hover:text-on-primary transition-colors px-3 py-1.5 rounded-lg text-[12px] font-semibold items-center gap-1">
                   Start
                 </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
