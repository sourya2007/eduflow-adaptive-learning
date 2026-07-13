import React, { useEffect, useRef } from 'react';
import { X, CheckCircle, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';
import clsx from 'clsx';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  accuracy: number;
  tips: string[];
  moduleName: string;
}

export function FeedbackModal({ isOpen, onClose, accuracy, tips, moduleName }: FeedbackModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;
      
      // Auto-focus the close button or first focusable element
      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    } else if (previousFocus.current) {
      previousFocus.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-surface-container-lowest w-full max-w-[448px] rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200"
      >
        <div className="flex justify-between items-center p-4 border-b border-outline-variant">
          <h2 id="modal-title" className="text-[18px] font-bold text-on-surface">Lesson Complete</h2>
          <button aria-label="Close modal" onClick={onClose} className="p-1 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 flex flex-col items-center gap-6 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center relative bg-surface-container">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="26" className="stroke-surface-variant" strokeWidth="4" fill="transparent" />
              <circle 
                cx="28" cy="28" r="26" 
                className={clsx("transition-all duration-1000 ease-out", accuracy >= 80 ? "stroke-primary" : accuracy >= 50 ? "stroke-secondary" : "stroke-error")} 
                strokeWidth="4" 
                fill="transparent" 
                strokeDasharray={2 * Math.PI * 26} 
                strokeDashoffset={(2 * Math.PI * 26) - (accuracy / 100) * (2 * Math.PI * 26)} 
                strokeLinecap="round" 
              />
            </svg>
            <span className="text-[20px] font-bold text-on-surface">{accuracy}%</span>
          </div>
          
          <div>
            <h3 className="text-[20px] font-semibold text-on-surface">Great job on {moduleName}!</h3>
            <p className="text-[14px] text-on-surface-variant mt-1">
              {accuracy >= 80 ? 'You have a strong understanding of this topic.' : accuracy >= 50 ? 'You are getting there, but a little more practice will help.' : 'Let\'s review the basics and try again.'}
            </p>
          </div>

          <div className="w-full bg-surface-container-low rounded-xl p-4 flex flex-col gap-3 text-left">
            <div className="flex items-center gap-2 text-[14px] font-bold text-on-surface">
              <Lightbulb className="w-4 h-4 text-tertiary" />
              Personalized Tips
            </div>
            <ul className="flex flex-col gap-2">
              {tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[13px] text-on-surface-variant">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 border-t border-outline-variant bg-surface-container-low flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg font-semibold text-[14px] text-on-surface bg-surface hover:bg-surface-container transition-colors border border-outline-variant">
            Close
          </button>
          <button onClick={onClose} className="px-4 py-2 rounded-lg font-semibold text-[14px] text-on-primary bg-primary hover:bg-primary/90 transition-colors shadow-sm">
            Continue Journey
          </button>
        </div>
      </div>
    </div>
  );
}
