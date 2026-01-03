
import React, { useState, useEffect } from 'react';
import { Goal, GoalDomain, GoalType, GoalSource } from '../types';
import HabitCard from '../components/HabitCard';
import { getDailyInsights } from '../services/geminiService';
import { Icons } from '../constants';

interface TodayViewProps {
  goals: Goal[];
  onUpdateGoal: (id: string, value: number) => void;
  onUpdateNote: (id: string, note: string) => void;
  onSyncRequest: () => void;
  isSyncing: boolean;
}

const TodayView: React.FC<TodayViewProps> = ({ goals, onUpdateGoal, onUpdateNote, onSyncRequest, isSyncing }) => {
  const [insight, setInsight] = useState<string>("");
  const [showInsight, setShowInsight] = useState(true);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState<string>("");

  const selectedGoal = goals.find(g => g.id === selectedGoalId) || null;

  useEffect(() => {
    const fetchInsight = async () => {
      const msg = await getDailyInsights(goals);
      setInsight(msg || "Focus on consistency today.");
    };
    fetchInsight();
  }, [goals.length]);

  useEffect(() => {
    if (selectedGoal) setTempNote(selectedGoal.note || "");
  }, [selectedGoalId, selectedGoal]);

  const sortedGoals = [...goals].sort((a, b) => a.order - b.order);
  const domains = Array.from(new Set(sortedGoals.map(g => g.domain)));

  return (
    <div className="space-y-6 pb-24 relative">
      {isSyncing && (
        <div className="flex justify-center h-8 animate-in fade-in zoom-in-95">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#007AFF] border-t-transparent" />
        </div>
      )}

      {showInsight && insight && (
        <section className="bg-white/60 dark:bg-[#1C1C1E]/60 rounded-[20px] p-4 border border-gray-100 dark:border-white/5 flex items-start space-x-3 transition-all relative ios-blur animate-in slide-in-from-top-4">
          <div className="text-[#007AFF] mt-0.5 shrink-0"><Icons.Info /></div>
          <p className="text-[15px] font-medium text-gray-700 dark:text-gray-300 leading-snug flex-1 pr-6">
            {insight}
          </p>
          <button onClick={() => setShowInsight(false)} className="absolute top-3 right-3 text-gray-400"><Icons.X /></button>
        </section>
      )}

      <div className="space-y-8">
        {domains.map(domain => (
          <section key={domain} className="space-y-1">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#8E8E93] ml-4 mb-2">{domain}</h2>
            <div className="space-y-[2px]">
              {sortedGoals.filter(g => g.domain === domain).map(goal => (
                <HabitCard key={goal.id} goal={goal} onUpdate={onUpdateGoal} onTapDetail={(g) => setSelectedGoalId(g.id)} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {selectedGoal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-0 animate-in fade-in duration-200 backdrop-blur-[2px]">
          <div className="w-full bg-[#F2F2F7] dark:bg-[#1C1C1E] rounded-t-[28px] pb-12 animate-in slide-in-from-bottom-2 max-h-[92vh] overflow-y-auto shadow-2xl">
            <div className="p-5 sticky top-0 bg-[#F2F2F7]/95 dark:bg-[#1C1C1E]/95 ios-blur flex justify-between items-center border-b border-gray-200 dark:border-white/5 z-10">
              <h2 className="text-xl font-bold tracking-tight">{selectedGoal.title}</h2>
              <button onClick={() => setSelectedGoalId(null)} className="text-[#007AFF] font-bold text-[17px]">Done</button>
            </div>
            
            <div className="p-5 space-y-6">
              {/* Data Provenance Header */}
              <div className="bg-white dark:bg-black p-4 rounded-2xl flex items-center justify-between border border-gray-100 dark:border-white/5 shadow-sm">
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase text-[#8E8E93] tracking-wider mb-1">Source</span>
                  <div className="flex items-center space-x-1.5">
                    {selectedGoal.source === GoalSource.APPLE_HEALTH && <span className="text-[15px]">🍎</span>}
                    {selectedGoal.source === GoalSource.GARMIN && <span className="text-[15px]">⌚</span>}
                    <span className="text-[15px] font-semibold">{selectedGoal.source}</span>
                  </div>
                </div>
                {selectedGoal.lastUpdated && (
                  <div className="text-right">
                    <span className="text-[11px] font-bold uppercase text-[#8E8E93] tracking-wider mb-1">Last Updated</span>
                    <p className="text-[13px] font-medium">{new Date(selectedGoal.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#8E8E93] uppercase ml-4">Daily Activity</label>
                <div className="bg-white dark:bg-black p-5 rounded-2xl flex items-center justify-between shadow-sm">
                  <span className="text-4xl font-extrabold tracking-tight">{selectedGoal.current.toLocaleString()}<span className="text-xl font-medium text-gray-400 ml-1">{selectedGoal.unit}</span></span>
                  <div className="flex space-x-3">
                    <button onClick={() => onUpdateGoal(selectedGoal.id, Math.max(0, selectedGoal.current - 1))} className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-3xl font-bold text-[#007AFF] active:scale-90 transition-all">−</button>
                    <button onClick={() => onUpdateGoal(selectedGoal.id, selectedGoal.current + 1)} className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-3xl font-bold text-[#007AFF] active:scale-90 transition-all">+</button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#8E8E93] uppercase ml-4">Intent Notes</label>
                <textarea 
                  value={tempNote}
                  onChange={(e) => setTempNote(e.target.value)}
                  placeholder="How did you stay aligned today?"
                  className="w-full h-32 p-4 rounded-2xl bg-white dark:bg-black border-none focus:ring-2 focus:ring-[#007AFF]/20 text-[17px] font-medium shadow-sm outline-none placeholder:text-gray-300"
                />
              </div>

              <button 
                onClick={() => { onUpdateNote(selectedGoal.id, tempNote); setSelectedGoalId(null); }}
                className="w-full bg-[#007AFF] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all"
              >
                Log Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayView;
