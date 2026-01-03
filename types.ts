
export enum GoalDomain {
  PHYSICAL = 'Physical',
  MENTAL = 'Mental',
  SPIRITUAL = 'Spiritual',
  EMOTIONAL = 'Emotional',
  FINANCIAL = 'Financial'
}

export enum GoalType {
  CHECKBOX = 'checkbox',
  COUNT = 'count',
  METRIC = 'metric' 
}

export enum GoalSource {
  APPLE_HEALTH = 'Apple Health',
  GARMIN = 'Garmin',
  MANUAL = 'Manual check-in'
}

export interface Goal {
  id: string;
  title: string;
  domain: GoalDomain;
  type: GoalType;
  target: number;
  unit?: string;
  current: number;
  icon: string;
  isAuto?: boolean;
  streak?: number;
  order: number;
  note?: string;
  source?: GoalSource;
  lastUpdated?: string;
}

export interface UserProfile {
  name: string;
  height?: number; 
  weight?: number; 
  weightGoal?: number;
  units: 'metric' | 'imperial';
  lastSync?: string;
}

export interface WeeklyReview {
  id: string;
  date: string;
  reflection: string;
  highlight: string;
  completedAt: string;
}

export interface AppSettings {
  notifications: {
    morningEnabled: boolean;
    morningTime: string;
    eveningEnabled: boolean;
    eveningTime: string;
  };
  darkMode: 'light' | 'dark' | 'system';
  isHealthConnected: boolean;
  isGarminEnhanced: boolean;
}

export interface AppData {
  goals: Goal[];
  profile: UserProfile;
  reviews: WeeklyReview[];
  settings: AppSettings;
}
