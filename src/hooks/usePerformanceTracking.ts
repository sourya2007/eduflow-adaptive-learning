import { useEffect, useRef } from 'react';

export function usePerformanceTracking(componentName: string) {
  const renderStartTime = useRef(performance.now());

  useEffect(() => {
    const renderTime = performance.now() - renderStartTime.current;
    if (renderTime > 200) {
      console.warn(`[Performance] ${componentName} render took ${renderTime.toFixed(2)}ms (Target: <200ms p95)`);
    } else {
      console.log(`[Performance] ${componentName} render took ${renderTime.toFixed(2)}ms`);
    }
    
    // Reset for the next render
    renderStartTime.current = performance.now();
  });
}
