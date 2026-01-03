
import React from 'react';
import { Goal, GoalType } from '../types';
import { COLORS, Icons } from '../constants';

interface HabitCardProps {
  goal: Goal;
  onUpdate: (id: string, value: number) => void;
  onTapDetail?: (goal: Goal) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ goal, onUpdate, onTapDetail }) => {
  const isComplete = goal.current >= goal.target;
  const progress = Math.min(goal.current / goal.target, 1);

  const handleManualUpdate = (e: React.MouseEvent, val: number) => {
    e.stopPropagation(); // Don't trigger the detail tap
    if ('vibrate' in navigator) navigator.vibrate(10);
    onUpdate(goal.id, val);
  };

  return (
    <div 
      onClick={() => onTapDetail?.(goal)}
      className={`${COLORS.secondaryBackground} rounded-[18px] p-4 mb-2 shadow-sm border border-gray-100 dark:border-white/5 active:bg-gray-50 dark:active:bg-white/5 cursor-pointer transition-all duration-150 group`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-inner transition-colors ${
            isComplete ? 'bg-green-50 dark:bg-green-900/10' : 'bg-gray-50 dark:bg-gray-900/10'
          }`}>
            {goal.icon}
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="font-semibold text-[17px] tracking-tight text-black dark:text-white group-active:text-[#007AFF] transition-colors">{goal.title}</h3>
              {goal.isAuto && (
                <span className="bg-[#E5E5EA] dark:bg-[#2C2C2E] text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full text-gray-500">Sync</span>
              )}
            </div>
            <p className="text-[13px] text-[#8E8E93] dark:text-[#8E8E92] font-medium leading-none mt-0.5">
              <span className={isComplete ? 'text-green-500' : ''}>{goal.current.toLocaleString()}</span> / {goal.target.toLocaleString()} {goal.unit}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          {goal.type === GoalType.CHECKBOX ? (
            <button 
              onClick={(e) => handleManualUpdate(e, isComplete ? 0 : 1)}
              className={`w-8 h-8 rounded-full border-[2.5px] flex items-center justify-center transition-all ${
                isComplete 
                ? 'bg-[#007AFF] border-[#007AFF] text-white' 
                : 'border-[#C7C7CC] dark:border-[#48484A]'
              }`}
            >
              {isComplete && <Icons.Check className="w-4 h-4" />}
            </button>
          ) : goal.type === GoalType.COUNT ? (
            <div className="flex items-center bg-[#F2F2F7] dark:bg-[#1C1C1E] rounded-full p-0.5 border border-[#C7C7CC]/30 dark:border-white/5">
              <button 
                onClick={(e) => handleManualUpdate(e, Math.max(0, goal.current - 1))}
                className="w-7 h-7 flex items-center justify-center text-[#007AFF] font-bold text-lg rounded-full active:bg-white dark:active:bg-[#2C2C2E]"
              >
                −
              </button>
              <div className="w-8 text-center">
                <span className="font-bold text-[14px]">{goal.current}</span>
              </div>
              <button 
                onClick={(e) => handleManualUpdate(e, goal.current + 1)}
                className="w-7 h-7 flex items-center justify-center text-[#007AFF] font-bold text-lg rounded-full active:bg-white dark:active:bg-[#2C2C2E]"
              >
                +
              </button>
            </div>
          ) : (
            <div className="relative w-8 h-8">
              <svg className="w-full h-full -rotate-90">
                <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-100 dark:text-gray-900" />
                <circle 
                  cx="16" cy="16" r="14" fill="none" stroke="#007AFF" strokeWidth="2.5" 
                  strokeDasharray={88} 
                  strokeDashoffset={88 - (88 * progress)} 
                  strokeLinecap="round" 
                  className="transition-all duration-700" 
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
