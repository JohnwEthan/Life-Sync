
import React, { useState } from 'react';
import { Icons, COLORS } from '../constants';
import { UserProfile, AppSettings, Goal } from '../types';

interface MeViewProps {
  goals: Goal[];
  profile: UserProfile;
  settings: AppSettings;
  lastSync: string;
  onUpdateProfile: (profile: UserProfile) => void;
  onUpdateSettings: (settings: AppSettings) => void;
  onSyncRequest: () => void;
  onReorderGoals: (newGoals: Goal[]) => void;
  onUpdateGoalDetails: (goal: Goal) => void;
}

const SettingRow: React.FC<{ 
  icon: string | React.ReactNode, 
  label: string, 
  value?: string, 
  color: string, 
  onClick?: () => void,
  rightContent?: React.ReactNode 
}> = ({ icon, label, value, color, onClick, rightContent }) => (
  <div onClick={onClick} className="flex items-center justify-between py-[11px] cursor-pointer active:opacity-60 transition-opacity">
    <div className="flex items-center space-x-3.5">
      <div className={`w-[29px] h-[29px] rounded-lg flex items-center justify-center text-white`} style={{ backgroundColor: color }}>
        <span className="text-[18px]">{icon}</span>
      </div>
      <span className="text-[17px] font-normal tracking-tight text-black dark:text-white">{label}</span>
    </div>
    <div className="flex items-center space-x-2">
      {rightContent ? rightContent : (
        <>
          {value && <span className="text-[17px] text-[#8E8E93]">{value}</span>}
          <div className="text-[#C4C4C6]"><Icons.ChevronRight /></div>
        </>
      )}
    </div>
  </div>
);

const MeView: React.FC<MeViewProps> = ({ goals, profile, settings, lastSync, onUpdateProfile, onUpdateSettings, onSyncRequest, onReorderGoals, onUpdateGoalDetails }) => {
  const [isManagingGoals, setIsManagingGoals] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [showHealthSheet, setShowHealthSheet] = useState(false);
  const [editName, setEditName] = useState(profile.name);

  const sortedGoals = [...goals].sort((a, b) => a.order - b.order);

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newGoals = [...sortedGoals];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx >= 0 && targetIdx < newGoals.length) {
      [newGoals[index], newGoals[targetIdx]] = [newGoals[targetIdx], newGoals[index]];
      onReorderGoals(newGoals);
    }
  };

  const handleHealthConnect = () => {
    if (settings.isHealthConnected) onSyncRequest();
    else setShowHealthSheet(true);
  };

  return (
    <div className="space-y-8 pb-32 animate-in fade-in duration-500">
      {/* Profile Card */}
      <section className="bg-white dark:bg-[#1C1C1E] rounded-[24px] p-5 shadow-sm border border-gray-100 dark:border-white/5 flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center text-3xl text-white shadow-inner">👤</div>
        <div className="flex-1">
          <h2 className="text-xl font-bold tracking-tight">{profile.name}</h2>
          <p className="text-xs text-[#8E8E93] font-bold uppercase tracking-widest">
            {settings.isHealthConnected ? 'Apple Health Synced' : 'Offline Mode'}
          </p>
        </div>
        <button className="text-[#007AFF] font-bold text-[15px] px-3 py-1 bg-blue-50 dark:bg-blue-500/10 rounded-full">Edit</button>
      </section>

      {/* Goal Reordering Form */}
      <div className="space-y-2">
        <div className="flex justify-between items-end mx-4">
          <h2 className="text-[13px] font-bold uppercase text-[#8E8E93] tracking-wider">Goal Alignment</h2>
          <button onClick={() => setIsManagingGoals(!isManagingGoals)} className="text-[14px] font-bold text-[#007AFF]">
            {isManagingGoals ? 'Done' : 'Reorder'}
          </button>
        </div>
        <section className="bg-white dark:bg-[#1C1C1E] rounded-[12px] overflow-hidden px-4 divide-y divide-gray-100 dark:divide-white/5 border border-gray-100 dark:border-white/5 shadow-sm">
          {sortedGoals.map((goal, idx) => (
            <div key={goal.id} className="flex items-center justify-between py-[11px]">
              <div className="flex items-center space-x-3.5 flex-1 cursor-pointer" onClick={() => setEditingGoal(goal)}>
                <span className="text-[20px]">{goal.icon}</span>
                <div className="flex flex-col">
                  <span className="text-[17px] font-semibold tracking-tight">{goal.title}</span>
                  <span className="text-[12px] font-medium text-[#8E8E93]">{goal.target} {goal.unit}</span>
                </div>
              </div>
              {isManagingGoals ? (
                <div className="flex items-center space-x-3 text-[#007AFF]">
                  <button disabled={idx === 0} onClick={() => handleMove(idx, 'up')} className="opacity-80 active:scale-110 disabled:opacity-10">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  </button>
                  <button disabled={idx === sortedGoals.length - 1} onClick={() => handleMove(idx, 'down')} className="opacity-80 active:scale-110 disabled:opacity-10">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                </div>
              ) : <div className="text-[#C4C4C6]"><Icons.ChevronRight /></div>}
            </div>
          ))}
        </section>
      </div>

      {/* Settings Grid */}
      <div className="space-y-6">
        <div>
          <h2 className="text-[13px] font-bold uppercase text-[#8E8E93] tracking-wider ml-4 mb-2">Data Sources</h2>
          <section className="bg-white dark:bg-[#1C1C1E] rounded-[12px] px-4 divide-y divide-gray-100 dark:divide-white/5 border border-gray-100 dark:border-white/5 shadow-sm">
            <SettingRow icon="🍎" label="Apple Health" value={settings.isHealthConnected ? "Synced" : "Connect"} color="#FF2D55" onClick={handleHealthConnect} />
            <div className="flex items-center justify-between py-[11px]">
              <div className="flex items-center space-x-3.5">
                <div className="w-[29px] h-[29px] rounded-lg bg-[#007AFF] flex items-center justify-center text-white"><span className="text-[18px]">⌚</span></div>
                <div className="flex flex-col">
                  <span className="text-[17px] tracking-tight">Garmin Enhanced</span>
                  <span className="text-[11px] text-[#8E8E93] font-medium">Body Battery & HRV Insight</span>
                </div>
              </div>
              <button onClick={() => onUpdateSettings({...settings, isGarminEnhanced: !settings.isGarminEnhanced})} className={`w-12 h-7 rounded-full transition-all relative ${settings.isGarminEnhanced ? 'bg-[#34C759]' : 'bg-gray-200 dark:bg-white/10'}`}>
                <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-all ${settings.isGarminEnhanced ? 'left-[22px]' : 'left-0.5'}`} />
              </button>
            </div>
          </section>
          {lastSync && <p className="text-[11px] text-[#8E8E93] font-bold uppercase mt-2 ml-4">Last Sync: {new Date(lastSync).toLocaleTimeString()}</p>}
        </div>
      </div>

      {/* Goal Editor Sheet */}
      {editingGoal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-5 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-[#1C1C1E] rounded-[28px] p-6 space-y-6 animate-in zoom-in-95 shadow-2xl">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold tracking-tight">Goal Configuration</h2>
              <button onClick={() => setEditingGoal(null)} className="text-[#007AFF] font-bold">Cancel</button>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-[#8E8E93] ml-2">Goal Title</label>
                <input type="text" value={editingGoal.title} onChange={e => setEditingGoal({...editingGoal, title: e.target.value})} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-black border-none text-[17px] font-medium outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-[#8E8E93] ml-2">Daily Target</label>
                  <input type="number" value={editingGoal.target} onChange={e => setEditingGoal({...editingGoal, target: Number(e.target.value)})} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-black border-none font-bold text-[17px]" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-[#8E8E93] ml-2">Unit</label>
                  <input type="text" value={editingGoal.unit} onChange={e => setEditingGoal({...editingGoal, unit: e.target.value})} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-black border-none text-[17px]" placeholder="reps, pages, etc." />
                </div>
              </div>
            </div>
            <button onClick={() => {onUpdateGoalDetails(editingGoal); setEditingGoal(null);}} className="w-full bg-[#007AFF] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/10">Save Configuration</button>
          </div>
        </div>
      )}

      {/* Detailed HealthKit Simulation Modal */}
      {showHealthSheet && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#1C1C1E] rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="p-8 text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-[#FF2D55] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-500/20"><Icons.Apple /></div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Health Permissions</h2>
                <p className="text-[#8E8E93] text-[15px] font-medium leading-relaxed">Select the categories LifeSync is allowed to read from your health records.</p>
              </div>
              <div className="bg-gray-50 dark:bg-black rounded-2xl p-4 text-left divide-y divide-gray-100 dark:divide-white/5 border border-gray-100 dark:border-white/5 max-h-[200px] overflow-y-auto">
                {['Active Energy', 'Sleep Analysis', 'Heart Rate', 'Mindful Minutes', 'Steps'].map((item, i) => (
                  <div key={i} className="py-3 flex justify-between items-center">
                    <span className="text-[15px] font-semibold">{item}</span>
                    <span className="text-[11px] font-bold text-[#34C759] uppercase tracking-widest">Allow</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-2">
                <button onClick={() => {onUpdateSettings({...settings, isHealthConnected: true}); setShowHealthSheet(false); setTimeout(onSyncRequest, 500);}} className="w-full bg-[#007AFF] text-white py-4 rounded-2xl font-bold text-[17px] shadow-lg shadow-blue-500/20">Turn All Categories On</button>
                <button onClick={() => setShowHealthSheet(false)} className="w-full text-[#8E8E93] font-bold py-2">Don't Allow</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeView;
