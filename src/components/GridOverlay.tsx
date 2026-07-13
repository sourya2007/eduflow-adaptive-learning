import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

export function GridOverlay() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+G or Cmd+G to toggle grid
      if ((e.ctrlKey || e.metaKey) && (e.key === 'g' || e.key === 'G')) {
        e.preventDefault();
        setIsVisible(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Ensure this is only enabled in development mode
  if ((import.meta as any).env?.MODE !== 'development') {
    return null;
  }

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex justify-center px-margin-mobile md:px-margin-desktop w-full mx-auto">
      <div className="w-full max-w-[1200px] h-full grid grid-cols-4 md:grid-cols-12 gap-lg">
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i} 
            className={clsx(
              "h-full bg-error/10 border-x border-error/20",
              i >= 4 && "hidden md:block" // Hide columns 5-12 on mobile
            )} 
          />
        ))}
      </div>
    </div>
  );
}
