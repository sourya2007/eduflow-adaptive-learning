import { useState, useEffect } from 'react';
import { Wifi, WifiOff, Cloud, CloudOff } from 'lucide-react';
import clsx from 'clsx';

export function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSynced, setIsSynced] = useState(true);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Simulate syncing delay
      setIsSynced(false);
      setTimeout(() => setIsSynced(true), 2000);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setIsSynced(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="flex items-center gap-2 bg-surface-container p-1.5 rounded-full border border-outline-variant text-[12px] font-medium shadow-sm">
      <div className={clsx("flex items-center gap-1 px-2 py-1 rounded-full", isOnline ? "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30" : "text-error bg-error-container")}>
        {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
        <span className="hidden sm:inline">{isOnline ? 'Online' : 'Offline'}</span>
      </div>
      {isOnline && (
        <div className={clsx("flex items-center gap-1 px-2 py-1 rounded-full transition-colors", isSynced ? "text-primary bg-primary-container" : "text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30")}>
          {isSynced ? <Cloud className="w-3.5 h-3.5" /> : <CloudOff className="w-3.5 h-3.5 animate-pulse" />}
          <span className="hidden sm:inline">{isSynced ? 'Synced' : 'Syncing...'}</span>
        </div>
      )}
    </div>
  );
}
