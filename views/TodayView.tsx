
import React, { useState, useEffect } from 'react';
import { Goal, GoalDomain, GoalType } from '../types';
import HabitCard from '../components/HabitCard';
import { getDailyInsights } from '../services/geminiService';
import { Icons, COLORS } from '../constants';

interface TodayViewProps {
  goals: Goal[];
  onUpdateGoal: (id: string, value: number) => void;
}

const TodayView: React.FC<TodayViewProps> = ({ goals, onUpdateGoal }) => {
  const [insight, setInsight] = useState<string>("");
  const [loadingInsight, setLoadingInsight] = useState(true);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isAddingGoal, setIsAddingGoal] = useState(false);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoadingInsight(true);
      const msg = await getDailyInsights(goals);
      setInsight(msg?.split('.')[0] + '.' || "Focus on consistency today.");
      setLoadingInsight(false);
    };
    const timer = setTimeout(fetchInsight, 800);
    return () => clearTimeout(timer);
  }, []);

  const domains = Array.from(new Set(goals.map(g => g.domain)));

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-700">
      {/* Small Insight Callout */}
      {!loadingInsight && insight && (
        <section className="bg-white/50 dark:bg-[#1C1C1E]/50 rounded-[20px] p-4 border border-gray-100 dark:border-white/5 flex items-start space-x-3">
          <div className="text-[#007AFF] mt-0.5">
            <Icons.Info />
          </div>
          <p className="text-[15px] font-medium text-gray-700 dark:text-gray-300 leading-tight">
            {insight}
          </p>
        </section>
      )}

      {/* Domain Groups */}
      <div className="space-y-8">
        {domains.map(domain => (
          <section key={domain} className="space-y-2">
            <h2 className="text-[13px] font-semibold uppercase tracking-wider text-[#8E8E93] dark:text-[#8E8E92] ml-4 mb-1">
              {domain}
            </h2>
            <div className="space-y-0.5">
              {goals.filter(g => g.domain === domain).map(goal => (
                <HabitCard 
                  key={goal.id} 
                  goal={goal} 
                  onUpdate={onUpdateGoal} 
                  onTapDetail={(g) => setSelectedGoal(g)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Goal Detail Sheet */}
      {selectedGoal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 animate-in fade-in duration-300 px-0">
          <div className="w-full bg-[#F2F2F7] dark:bg-[#1C1C1E] rounded-t-[20px] pb-12 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto">
            <div className="p-5 sticky top-0 bg-[#F2F2F7]/80 dark:bg-[#1C1C1E]/80 ios-blur flex justify-between items-center border-b border-gray-200 dark:border-white/5">
              <h2 className="text-xl font-bold">{selectedGoal.title}</h2>
              <button onClick={() => setSelectedGoal(null)} className="p-2 text-[#007AFF]"><Icons.X /></button>
            </div>
            
            <div className="p-5 space-y-6">
              <section className="bg-white dark:bg-black p-4 rounded-xl space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Domain</span>
                  <span className="font-semibold">{selectedGoal.domain}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Target</span>
                  <span className="font-semibold">{selectedGoal.target} {selectedGoal.unit}</span>
                </div>
                {selectedGoal.isAuto && (
                  <div className="pt-4 border-t border-gray-100 dark:border-white/5">
                    <p className="text-[12px] text-gray-400">Synced via HealthKit (Garmin Connect)</p>
                  </div>
                )}
              </section>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-gray-500 uppercase ml-4">Notes</label>
                <textarea 
                  placeholder="How did this goal feel today?"
                  className="w-full h-32 p-4 rounded-xl bg-white dark:bg-black border-none focus:ring-2 focus:ring-[#007AFF] resize-none"
                />
              </div>

              <button className="w-full bg-[#007AFF] text-white py-4 rounded-xl font-bold active:scale-[0.98] transition-all">
                Save Reflection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayView;
