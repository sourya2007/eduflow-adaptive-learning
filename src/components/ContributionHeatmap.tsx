import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

export function ContributionHeatmap() {
  const [data, setData] = useState<{ date: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching from analytics event-log service
    setTimeout(() => {
      const mockData = [];
      const today = new Date();
      for (let i = 0; i < 98; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        mockData.push({
          date: d.toISOString().split('T')[0],
          count: Math.floor(Math.random() * 5),
        });
      }
      setData(mockData.reverse());
      setLoading(false);
    }, 1000);
  }, []);

  const getColor = (count: number) => {
    if (count === 0) return 'bg-surface-variant';
    if (count === 1) return 'bg-primary/30';
    if (count === 2) return 'bg-primary/50';
    if (count === 3) return 'bg-primary/80';
    return 'bg-primary';
  };

  return (
    <div className="bg-surface-container-lowest rounded-[16px] p-lg shadow-sm border border-surface-variant w-full overflow-hidden flex flex-col flex-1 min-h-[200px]">
      <h3 className="text-[16px] font-bold text-on-surface mb-md">Activity History</h3>
      {loading ? (
        <div className="h-[120px] w-full flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
          {Array.from({ length: 14 }).map((_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const item = data[weekIndex * 7 + dayIndex];
                if (!item) return <div key={dayIndex} className="w-4 h-4 rounded-sm bg-transparent" />;
                return (
                  <div
                    key={dayIndex}
                    className={clsx("w-4 h-4 rounded-sm transition-colors hover:ring-2 ring-primary", getColor(item.count))}
                    title={`${item.count} contributions on ${item.date}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      )}
      <div className="mt-md flex items-center gap-2 text-[12px] text-on-surface-variant">
        <span>Less</span>
        <div className="w-4 h-4 rounded-sm bg-surface-variant"></div>
        <div className="w-4 h-4 rounded-sm bg-primary/30"></div>
        <div className="w-4 h-4 rounded-sm bg-primary/50"></div>
        <div className="w-4 h-4 rounded-sm bg-primary/80"></div>
        <div className="w-4 h-4 rounded-sm bg-primary"></div>
        <span>More</span>
      </div>
    </div>
  );
}
