import React, { useEffect, useState } from 'react';
import { LoadingSkeleton } from './LoadingSkeleton';
import { motion } from 'motion/react';

interface ProgressRingProps {
  courseId: string;
  size?: number;
  strokeWidth?: number;
}

export function ProgressRing({ courseId, size = 64, strokeWidth = 4 }: ProgressRingProps) {
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    // Simulate fetching mastery percentage
    const fetchProgress = async () => {
      const cached = localStorage.getItem(`course_progress_${courseId}`);
      if (cached) {
        setProgress(parseInt(cached, 10));
        return;
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      const simulatedProgress = Math.floor(Math.random() * 40) + 40; // 40-80%
      setProgress(simulatedProgress);
      localStorage.setItem(`course_progress_${courseId}`, simulatedProgress.toString());
    };
    
    fetchProgress();
  }, [courseId]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = progress !== null ? circumference - (progress / 100) * circumference : circumference;

  if (progress === null) {
    return (
      <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
        <LoadingSkeleton variant="circular" className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle 
          cx={size / 2} 
          cy={size / 2} 
          r={radius} 
          className="stroke-primary-container" 
          strokeWidth={strokeWidth} 
          fill="transparent" 
        />
        <motion.circle 
          cx={size / 2} 
          cy={size / 2} 
          r={radius} 
          className="stroke-secondary-fixed" 
          strokeWidth={strokeWidth} 
          fill="transparent" 
          strokeDasharray={circumference} 
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round" 
        />
      </svg>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute font-bold text-[12px]"
      >
        {progress}%
      </motion.div>
    </div>
  );
}
