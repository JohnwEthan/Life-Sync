
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
}

export interface UserProfile {
  name: string;
  height?: number; // cm
  weight?: number; // kg
  weightGoal?: number;
  birthDate?: string;
  units: 'metric' | 'imperial';
}

export interface WeeklyReview {
  id: string;
  date: string;
  reflection: string;
  focusDomain: GoalDomain;
  completedAt: string;
}

export interface DailyCheckIn {
  date: string; // YYYY-MM-DD
  goalId: string;
  value: number;
  note?: string;
}

export interface AppData {
  goals: Goal[];
  profile: UserProfile;
  checkIns: DailyCheckIn[];
  reviews: WeeklyReview[];
  lastSync: string;
}
