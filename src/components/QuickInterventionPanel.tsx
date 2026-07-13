import React, { useEffect, useState } from 'react';
import { AlertTriangle, TrendingDown, MessageCircle, Mail } from 'lucide-react';
import { LoadingSkeleton } from './LoadingSkeleton';
import clsx from 'clsx';
import { AudioFeedbackButton } from './AudioFeedbackButton';

interface AtRiskStudent {
  id: string;
  name: string;
  avatar: string;
  riskScore: number;
  reason: string;
}

export function QuickInterventionPanel() {
  const [atRiskStudents, setAtRiskStudents] = useState<AtRiskStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate /api/predict-churn endpoint
    const fetchPredictChurn = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setAtRiskStudents([
          { id: '1', name: 'Alex Chen', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXyJimBKVCb2NsqLrQ6eNjaV892fx9FeWX9cvh1Oam3jVN7aU-CeWv_tZWwzgqRLVgLWGW8CJ3NHUBrI9xMXbYNzby1NUwsVLnCDGVXMo-nLziVajBcQwE7WlrkR7kOQ_Gtqf81yitHXuMOQbQMIHVKAal_XI5dqD5cmfvx1ydukBpAys24qpVeBLb4jOGT78hx16j0zYk46XwSiCOZDy6ZQackr-T3faG3Tcv7UuqUsZy1M8SBDbzjtiZBpqoyC8Zq2mL5gk7ZkQ', riskScore: 89, reason: 'Missed 3 consecutive assignments' },
          { id: '2', name: 'Jordan Davis', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAX7gx6ei0EcEN21NLhBiHOZ_x1d3zpwfuNpDGhrcdjGwtbhlyDaHmsLO5cIeMxQa6Obt9m-QoP9TSkuJrY0hjcTtezz1Ub6iNkBFOs4eGczNpZIU4_m38ccoTaBxswZE0lQr3lRRUFqP5vYDEIl_x4CF3uQgFfowa_-3MmiRnzYT39Sl5OGDlInJ7nfJyzQadAFdCIzxZ-kXZ3BqJpGbVXAU8qETwNaP_MhLB2qC8whoPsJTadhJcls5JIqn3Rz4rH8sdEVUlFwYU', riskScore: 75, reason: 'Accuracy dropped by 30% this week' },
        ]);
      } catch (error) {
        console.error('Failed to fetch predict-churn', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictChurn();
  }, []);

  if (!isLoading && atRiskStudents.length === 0) {
    return null;
  }

  return (
    <div className="bg-error-container/40 rounded-[16px] shadow-sm border border-error-container p-lg flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-error" />
        <h3 className="text-[18px] font-bold text-on-surface">Quick Intervention Required</h3>
      </div>
      <p className="text-[14px] text-on-surface-variant">The AI engine predicts these students are at risk of churning or falling behind.</p>
      
      <div className="flex flex-col gap-3 mt-2">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-surface rounded-xl p-4 flex gap-3 border border-outline-variant/30">
              <LoadingSkeleton variant="circular" className="w-10 h-10 shrink-0" />
              <div className="flex flex-col gap-2 w-full">
                <LoadingSkeleton className="w-1/3 h-4" />
                <LoadingSkeleton className="w-2/3 h-3" />
              </div>
            </div>
          ))
        ) : (
          atRiskStudents.map((student) => (
            <div key={student.id} className="bg-surface rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-error/20 shadow-sm">
              <div className="flex items-center gap-3">
                <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full" />
                <div>
                  <h4 className="text-[14px] font-bold text-on-surface flex items-center gap-2">
                    {student.name} 
                    <span className="text-[10px] bg-error text-white px-2 py-0.5 rounded-full font-bold">
                      {student.riskScore}% Risk
                    </span>
                  </h4>
                  <p className="text-[12px] text-on-surface-variant mt-1 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5 text-error" />
                    {student.reason}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <AudioFeedbackButton studentId={student.id} />
                <button className="bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface p-2 rounded-lg border border-outline-variant" aria-label="Message student">
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button className="bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface p-2 rounded-lg border border-outline-variant" aria-label="Email student">
                  <Mail className="w-4 h-4" />
                </button>
                <button className="bg-error hover:bg-error/90 text-white px-3 py-1.5 rounded-lg text-[12px] font-bold transition-colors shadow-sm">
                  Review
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
