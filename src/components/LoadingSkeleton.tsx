import React from 'react';
import clsx from 'clsx';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
  key?: React.Key;
}

export function LoadingSkeleton({ className, variant = 'rectangular' }: LoadingSkeletonProps) {
  return (
    <div 
      className={clsx(
        "animate-pulse bg-surface-variant",
        variant === 'circular' && "rounded-full",
        variant === 'text' && "rounded-md h-4 w-3/4",
        variant === 'rectangular' && "rounded-xl",
        className
      )}
    />
  );
}
