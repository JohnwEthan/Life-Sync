
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import TodayView from './views/TodayView';
import ProgressView from './views/ProgressView';
import MeView from './views/MeView';
import OnboardingView from './views/OnboardingView';
import { Goal, GoalDomain, GoalType, UserProfile, AppData, AppSettings, GoalSource } from './types';

const INITIAL_GOALS: Goal[] = [
  { id: '1', title: 'Steps', domain: GoalDomain.PHYSICAL, type: GoalType.METRIC, target: 15000, current: 8420, unit: 'steps', icon: '🏃', isAuto: true, streak: 5, order: 0, source: GoalSource.APPLE_HEALTH, lastUpdated: new Date().toISOString() },
  { id: '2', title: 'Push-ups', domain: GoalDomain.PHYSICAL, type: GoalType.COUNT, target: 100, current: 0, unit: 'reps', icon: '💪', streak: 1, order: 1, source: GoalSource.MANUAL },
  { id: '3', title: 'Sit-ups', domain: GoalDomain.PHYSICAL, type: GoalType.COUNT, target: 100, current: 0, unit: 'reps', icon: '🤸', streak: 0, order: 2, source: GoalSource.MANUAL },
  { id: '4', title: 'Squats', domain: GoalDomain.PHYSICAL, type: GoalType.COUNT, target: 100, current: 0, unit: 'reps', icon: '🦵', streak: 4, order: 3, source: GoalSource.MANUAL },
  { id: '5', title: 'Weight', domain: GoalDomain.PHYSICAL, type: GoalType.METRIC, target: 80, current: 84.3, unit: 'kg', icon: '⚖️', isAuto: true, streak: 12, order: 4, source: GoalSource.APPLE_HEALTH, lastUpdated: new Date().toISOString() },
  { id: '6', title: 'Read 10 Pages', domain: GoalDomain.MENTAL, type: GoalType.CHECKBOX, target: 1, current: 0, icon: '📖', streak: 7, order: 5, source: GoalSource.MANUAL },
  { id: '7', title: 'Daily Prayers', domain: GoalDomain.SPIRITUAL, type: GoalType.COUNT, target: 5, current: 0, icon: '🙏', streak: 3, order: 6, source: GoalSource.MANUAL },
  { id: '8', title: 'Family Connection', domain: GoalDomain.EMOTIONAL, type: GoalType.CHECKBOX, target: 1, current: 0, icon: '👨‍👩‍👧', streak: 2, order: 7, source: GoalSource.MANUAL },
  { id: '9', title: 'New Project Idea', domain: GoalDomain.FINANCIAL, type: GoalType.CHECKBOX, target: 1, current: 0, icon: '💡', streak: 1, order: 8, source: GoalSource.MANUAL },
];

const INITIAL_PROFILE: UserProfile = {
  name: "Alex Johnson",
  weight: 84.3,
  weightGoal: 80,
  units: 'metric',
  lastSync: new Date().toISOString()
};

const INITIAL_SETTINGS: AppSettings = {
  notifications: {
    morningEnabled: true,
    morningTime: '08:00',
    eveningEnabled: true,
    eveningTime: '21:00'
  },
  darkMode: 'system',
  isHealthConnected: false,
  isGarminEnhanced: false
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [data, setData] = useState<AppData>({
    goals: INITIAL_GOALS,
    profile: INITIAL_PROFILE,
    reviews: [],
    settings: INITIAL_SETTINGS
  });

  useEffect(() => {
    const saved = localStorage.getItem('lifesync_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      setData(parsed);
    }
    const status = localStorage.getItem('lifesync_onboarded');
    if (status === 'true') setIsOnboarded(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('lifesync_data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const applyTheme = () => {
      const mode = data.settings.darkMode;
      const root = window.document.documentElement;
      const isDark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (isDark) root.classList.add('dark');
      else root.classList.remove('dark');
    };
    applyTheme();
  }, [data.settings.darkMode]);

  const syncHealthData = async () => {
    if (!data.settings.isHealthConnected) return;
    setIsSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setData(prev => ({
      ...prev,
      profile: { ...prev.profile, lastSync: new Date().toISOString() },
      goals: prev.goals.map(g => {
        if (g.isAuto) {
          let updatedVal = g.current;
          if (g.title === 'Steps') updatedVal += Math.floor(Math.random() * 500) + 100;
          if (g.title === 'Weight') updatedVal = Number((updatedVal + (Math.random() * 0.2 - 0.1)).toFixed(1));
          
          return { 
            ...g, 
            current: updatedVal, 
            lastUpdated: new Date().toISOString(),
            source: prev.settings.isGarminEnhanced ? GoalSource.GARMIN : GoalSource.APPLE_HEALTH
          };
        }
        return g;
      })
    }));
    setIsSyncing(false);
  };

  const updateGoalProgress = (id: string, value: number) => {
    setData(prev => ({
      ...prev,
      goals: prev.goals.map(g => g.id === id ? { ...g, current: value, lastUpdated: new Date().toISOString(), source: GoalSource.MANUAL } : g)
    }));
  };

  const updateGoalNote = (id: string, note: string) => {
    setData(prev => ({
      ...prev,
      goals: prev.goals.map(g => g.id === id ? { ...g, note } : g)
    }));
  };

  const updateGoalDetails = (updatedGoal: Goal) => {
    setData(prev => ({
      ...prev,
      goals: prev.goals.map(g => g.id === updatedGoal.id ? updatedGoal : g)
    }));
  };

  const reorderGoals = (newGoals: Goal[]) => {
    setData(prev => ({
      ...prev,
      goals: newGoals.map((g, idx) => ({ ...g, order: idx }))
    }));
  };

  const updateProfile = (profile: UserProfile) => {
    setData(prev => ({ ...prev, profile }));
  };

  const updateSettings = (settings: AppSettings) => {
    setData(prev => ({ ...prev, settings }));
  };

  if (!isOnboarded) return <OnboardingView onComplete={() => setIsOnboarded(true)} />;

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} 
      summary={isSyncing ? "Updating Health Data..." : `${data.goals.filter(g => g.current >= g.target).length} of ${data.goals.length} complete`}
    >
      {activeTab === 'today' && (
        <TodayView 
          goals={data.goals} 
          onUpdateGoal={updateGoalProgress} 
          onUpdateNote={updateGoalNote}
          onSyncRequest={syncHealthData} 
          isSyncing={isSyncing} 
        />
      )}
      {activeTab === 'progress' && <ProgressView goals={data.goals} />}
      {activeTab === 'me' && (
        <MeView 
          goals={data.goals}
          profile={data.profile} 
          settings={data.settings}
          lastSync={data.profile.lastSync || ""} 
          onUpdateProfile={updateProfile}
          onUpdateSettings={updateSettings}
          onSyncRequest={syncHealthData}
          onReorderGoals={reorderGoals}
          onUpdateGoalDetails={updateGoalDetails}
        />
      )}
    </Layout>
  );
};

export default App;
