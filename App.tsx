
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import TodayView from './views/TodayView';
import ProgressView from './views/ProgressView';
import MeView from './views/MeView';
import OnboardingView from './views/OnboardingView';
import { Goal, GoalDomain, GoalType, UserProfile, DailyCheckIn, WeeklyReview, AppData } from './types';

const INITIAL_GOALS: Goal[] = [
  { id: '1', title: 'Steps', domain: GoalDomain.PHYSICAL, type: GoalType.METRIC, target: 15000, current: 8420, unit: 'steps', icon: '🏃', isAuto: true },
  { id: '2', title: 'Push-ups', domain: GoalDomain.PHYSICAL, type: GoalType.COUNT, target: 100, current: 0, unit: 'reps', icon: '💪' },
  { id: '3', title: 'Sit-ups', domain: GoalDomain.PHYSICAL, type: GoalType.COUNT, target: 100, current: 0, unit: 'reps', icon: '🤸' },
  { id: '4', title: 'Squats', domain: GoalDomain.PHYSICAL, type: GoalType.COUNT, target: 100, current: 0, unit: 'reps', icon: '🦵' },
  { id: '5', title: 'Weight', domain: GoalDomain.PHYSICAL, type: GoalType.METRIC, target: 80, current: 84.3, unit: 'kg', icon: '⚖️' },
  { id: '6', title: 'Read 10 Pages', domain: GoalDomain.MENTAL, type: GoalType.CHECKBOX, target: 1, current: 0, icon: '📖' },
  { id: '7', title: 'Daily Prayers', domain: GoalDomain.SPIRITUAL, type: GoalType.COUNT, target: 5, current: 0, icon: '🙏' },
  { id: '8', title: 'Family Connection', domain: GoalDomain.EMOTIONAL, type: GoalType.CHECKBOX, target: 1, current: 0, icon: '👨‍👩‍👧' },
  { id: '9', title: 'New Project Idea', domain: GoalDomain.FINANCIAL, type: GoalType.CHECKBOX, target: 1, current: 0, icon: '💡' },
];

const INITIAL_PROFILE: UserProfile = {
  name: "Alex Johnson",
  weight: 84.3,
  weightGoal: 80,
  units: 'metric'
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [data, setData] = useState<AppData>({
    goals: INITIAL_GOALS,
    profile: INITIAL_PROFILE,
    checkIns: [],
    reviews: [],
    lastSync: new Date().toISOString()
  });

  // Load and Persist
  useEffect(() => {
    const saved = localStorage.getItem('lifesync_data');
    if (saved) {
      setData(JSON.parse(saved));
    }
    const status = localStorage.getItem('lifesync_onboarded');
    if (status === 'true') setIsOnboarded(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('lifesync_data', JSON.stringify(data));
  }, [data]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('lifesync_onboarded', 'true');
    setIsOnboarded(true);
  };

  const updateGoalProgress = (id: string, value: number) => {
    setData(prev => ({
      ...prev,
      goals: prev.goals.map(g => g.id === id ? { ...g, current: value } : g)
    }));
  };

  const updateProfile = (profile: UserProfile) => {
    setData(prev => ({ ...prev, profile }));
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'today': return 'Today';
      case 'progress': return 'Trends';
      case 'me': return 'Me';
      default: return 'LifeSync';
    }
  };

  const getSubtitle = () => {
    const completedCount = data.goals.filter(g => {
      if (g.title === 'Weight') return g.current <= g.target;
      return g.current >= g.target;
    }).length;
    
    if (activeTab === 'today') return `${completedCount} of ${data.goals.length} intentions met`;
    if (activeTab === 'progress') return "7D consistency +12%";
    return undefined;
  };

  if (!isOnboarded) {
    return <OnboardingView onComplete={handleOnboardingComplete} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'today':
        return <TodayView goals={data.goals} onUpdateGoal={updateGoalProgress} />;
      case 'progress':
        return <ProgressView checkIns={data.checkIns} goals={data.goals} />;
      case 'me':
        return <MeView profile={data.profile} lastSync={data.lastSync} onUpdateProfile={updateProfile} />;
      default:
        return <TodayView goals={data.goals} onUpdateGoal={updateGoalProgress} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      title={getTitle()} 
      subtitle={getSubtitle()}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
