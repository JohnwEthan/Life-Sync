
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { COLORS, Icons } from '../constants';
import { Goal } from '../types';

interface ProgressViewProps {
  goals: Goal[];
}

const DATA_SET = {
  '7D': [
    { day: 'M', completion: 60, steps: 12000, weight: 85.2 },
    { day: 'T', completion: 80, steps: 14500, weight: 84.9 },
    { day: 'W', completion: 40, steps: 8000, weight: 85.0 },
    { day: 'T', completion: 100, steps: 16000, weight: 84.7 },
    { day: 'F', completion: 90, steps: 15200, weight: 84.5 },
    { day: 'S', completion: 70, steps: 11000, weight: 84.6 },
    { day: 'S', completion: 85, steps: 13500, weight: 84.3 },
  ],
  '30D': Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    completion: 50 + Math.random() * 50,
    steps: 10000 + Math.random() * 8000,
    weight: 86 - (i * 0.05)
  })),
  '90D': Array.from({ length: 90 }, (_, i) => ({
    day: i + 1,
    completion: 40 + Math.random() * 60,
    steps: 8000 + Math.random() * 10000,
    weight: 88 - (i * 0.04)
  }))
};

const ProgressView: React.FC<ProgressViewProps> = ({ goals }) => {
  const [range, setRange] = useState<'7D' | '30D' | '90D'>('7D');
  const [isReviewing, setIsReviewing] = useState(false);
  const [step, setStep] = useState(0);

  const activeData = DATA_SET[range];

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-500">
      {/* Range Control */}
      <div className="bg-[#E5E5EA] dark:bg-[#1C1C1E] p-1 rounded-[8px] flex space-x-1 mx-2">
        {(['7D', '30D', '90D'] as const).map(r => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`flex-1 py-1.5 text-[13px] font-bold rounded-[6px] transition-all ${
              range === r ? 'bg-white dark:bg-[#636366] shadow-sm text-black dark:text-white' : 'text-[#8E8E93]'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Activity Chart */}
      <section className="bg-white dark:bg-[#1C1C1E] p-5 rounded-[22px] shadow-sm border border-gray-100 dark:border-white/5">
        <h2 className="text-[13px] font-bold uppercase tracking-widest text-[#8E8E93] mb-4">Step Activity</h2>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activeData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#8E8E93' }} />
              <Bar dataKey="steps" radius={[4, 4, 0, 0]}>
                {activeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.steps >= 15000 ? COLORS.blue : '#E5E5EA'} fillOpacity={range === '7D' ? 1 : 0.6} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Weight Chart */}
      <section className="bg-white dark:bg-[#1C1C1E] p-5 rounded-[22px] shadow-sm border border-gray-100 dark:border-white/5">
        <h2 className="text-[13px] font-bold uppercase tracking-widest text-[#8E8E93] mb-4">Weight Trend</h2>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeData}>
              <defs>
                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.blue} stopOpacity={0.15}/>
                  <stop offset="95%" stopColor={COLORS.blue} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#8E8E93' }} />
              <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
              <Area type="monotone" dataKey="weight" stroke={COLORS.blue} strokeWidth={3} fill="url(#colorWeight)" animationDuration={1000} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Projection */}
      <section className="px-4 py-1">
        <p className="text-[14px] text-[#8E8E93] font-medium leading-relaxed">
          Based on your last 7 days, you're on track to complete ~1.2M steps this quarter. 
          <span className="text-[#007AFF] block mt-1 font-semibold">Consistency score: 82%</span>
        </p>
      </section>

      <button 
        onClick={() => setIsReviewing(true)}
        className="w-full bg-[#007AFF] py-4 rounded-[20px] font-bold text-white shadow-xl shadow-blue-500/10 active:scale-[0.98] transition-all"
      >
        Weekly Review Ritual
      </button>

      {/* Review Ritual Flow */}
      {isReviewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-md">
          <div className="w-full max-w-md bg-white dark:bg-[#1C1C1E] rounded-[28px] p-8 space-y-8 animate-in zoom-in-95 duration-300">
            {step === 0 && (
              <div className="space-y-6 text-center">
                <div className="text-6xl">✨</div>
                <h2 className="text-2xl font-bold tracking-tight">Week in Review</h2>
                <p className="text-gray-500 font-medium">You aligned with 85% of your intentions. Your "Spiritual" domain was most consistent this week.</p>
                <button onClick={() => setStep(1)} className="w-full bg-[#007AFF] text-white py-4 rounded-xl font-bold">Reflect</button>
              </div>
            )}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center tracking-tight">A Single Insight</h2>
                <p className="text-gray-500 text-center font-medium">What was the highlight of your connection with family this week?</p>
                <textarea className="w-full h-32 p-4 rounded-xl bg-gray-50 dark:bg-black border-none resize-none font-medium text-[17px]" placeholder="Type your highlight..." />
                <button onClick={() => setStep(2)} className="w-full bg-[#007AFF] text-white py-4 rounded-xl font-bold">Almost Done</button>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-6 text-center">
                <div className="text-6xl">🗓️</div>
                <h2 className="text-2xl font-bold tracking-tight">Set Next Week's Intent</h2>
                <p className="text-gray-500 font-medium">Which domain needs more space next week?</p>
                <div className="grid grid-cols-2 gap-3">
                  {['Physical', 'Mental', 'Spiritual', 'Family'].map(d => (
                    <button key={d} onClick={() => {setIsReviewing(false); setStep(0);}} className="py-3 bg-gray-50 dark:bg-white/5 rounded-xl font-bold active:bg-[#007AFF] active:text-white transition-colors">
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressView;
