import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import clsx from 'clsx';
import { LoadingSkeleton } from './LoadingSkeleton';

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  score: number;
  rank: number;
  isCurrentUser?: boolean;
}

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching global rankings
    const fetchLeaderboard = async () => {
      try {
        // mock delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData: LeaderboardEntry[] = [
          { id: '1', name: 'Alex Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', score: 9850, rank: 1 },
          { id: '2', name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', score: 8420, rank: 2 },
          { id: '3', name: 'Michael Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael', score: 7900, rank: 3 },
          { id: '123', name: 'You', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBN8s4IQMibYGBWNHpjPIr3woSfOm-nHDE3394BKE12_YtLNwyRv8wM6CXeMmv7iqxW04MYEF5pL56tG1sGKuiBDydanE_FRnjddnmhtVD75JHlAT18UvrL-axnsx8LVavxd6O38BawlrUDvUAsqBMgqbSLFTJEYuDT9BuXX4uSGCX3xP-2xD0uAILbn9TznFhTY5hK74HLQHxuyXMPp_1vsJbDRliNkZnhJp2SqenVaDOs-_jewaRgTF_Gq4PUzRXqNrXwdTq1Wh0', score: 7850, rank: 4, isCurrentUser: true },
          { id: '5', name: 'Emma Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', score: 7100, rank: 5 },
        ];
        
        setLeaderboard(mockData);
      } catch (error) {
        console.error("Failed to load leaderboard", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, []);

  return (
    <div className="bg-surface-container-lowest rounded-[16px] p-lg shadow-sm border border-surface-variant flex flex-col gap-md">
      <div className="flex justify-between items-center">
        <h3 className="text-[14px] font-bold uppercase tracking-wide">Global Leaderboard</h3>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2 border-b border-surface-variant/50 last:border-0">
              <LoadingSkeleton className="w-4 h-4 rounded" />
              <LoadingSkeleton variant="circular" className="w-8 h-8 shrink-0" />
              <div className="flex flex-col gap-1 w-full">
                <LoadingSkeleton className="w-24 h-3" />
                <LoadingSkeleton className="w-12 h-2" />
              </div>
            </div>
          ))
        ) : (
          leaderboard.map((entry, idx) => (
            <div 
              key={entry.id} 
              className={clsx(
                "flex items-center gap-3 p-2 rounded-lg transition-colors border border-transparent",
                entry.isCurrentUser ? "bg-primary/5 border-primary/20" : "hover:bg-surface-container-low"
              )}
            >
              <div className="w-5 text-center font-bold text-[14px] text-on-surface-variant shrink-0">
                {entry.rank === 1 ? <Trophy className="w-5 h-5 text-yellow-500 mx-auto" /> :
                 entry.rank === 2 ? <Medal className="w-5 h-5 text-gray-400 mx-auto" /> :
                 entry.rank === 3 ? <Medal className="w-5 h-5 text-amber-600 mx-auto" /> :
                 entry.rank}
              </div>
              <img src={entry.avatar} alt={entry.name} className="w-8 h-8 rounded-full border border-outline-variant/30" />
              <div className="flex-grow min-w-0">
                <div className="text-[14px] font-semibold text-on-surface truncate">
                  {entry.name}
                </div>
              </div>
              <div className="text-[12px] font-bold text-primary shrink-0">
                {entry.score.toLocaleString()} pts
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
