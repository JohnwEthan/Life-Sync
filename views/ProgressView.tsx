
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { COLORS, Icons } from '../constants';
import { DailyCheckIn, Goal } from '../types';

interface ProgressViewProps {
  checkIns: DailyCheckIn[];
  goals: Goal[];
}

const DATA_MOCK = [
  { day: 'M', completion: 60, steps: 12000, weight: 85.2 },
  { day: 'T', completion: 80, steps: 14500, weight: 84.9 },
  { day: 'W', completion: 40, steps: 8000, weight: 85.0 },
  { day: 'T', completion: 100, steps: 16000, weight: 84.7 },
  { day: 'F', completion: 90, steps: 15200, weight: 84.5 },
  { day: 'S', completion: 70, steps: 11000, weight: 84.6 },
  { day: 'S', completion: 85, steps: 13500, weight: 84.3 },
];

const ProgressView: React.FC<ProgressViewProps> = ({ checkIns, goals }) => {
  const [range, setRange] = useState('7D');
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewStep, setReviewStep] = useState(0);

  const handleStartReview = () => {
    setIsReviewing(true);
    setReviewStep(0);
  };

  const nextStep = () => setReviewStep(prev => prev + 1);

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-700">
      {/* Range Picker */}
      <div className="bg-[#E5E5EA] dark:bg-[#1C1C1E] p-1 rounded-lg flex space-x-1 mx-4">
        {['7D', '30D', '90D'].map(r => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`flex-1 py-1.5 text-[13px] font-bold rounded-md transition-all ${
              range === r ? 'bg-white dark:bg-[#636366] shadow-sm text-black dark:text-white' : 'text-[#8E8E93]'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Weight History */}
      <section className="bg-white dark:bg-[#1C1C1E] p-5 rounded-[22px] shadow-sm border border-gray-100 dark:border-white/5">
        <h2 className="text-[13px] font-bold uppercase tracking-widest text-[#8E8E93] mb-4">Weight History</h2>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DATA_MOCK}>
              <defs>
                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.blue} stopOpacity={0.15}/>
                  <stop offset="95%" stopColor={COLORS.blue} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#8E8E93' }} />
              <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
              <Area type="monotone" dataKey="weight" stroke={COLORS.blue} strokeWidth={3} fill="url(#colorWeight)" animationDuration={1000} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Daily Activity */}
      <section className="bg-white dark:bg-[#1C1C1E] p-5 rounded-[22px] shadow-sm border border-gray-100 dark:border-white/5">
        <h2 className="text-[13px] font-bold uppercase tracking-widest text-[#8E8E93] mb-4">Daily Activity</h2>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA_MOCK}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#8E8E93' }} />
              <Bar dataKey="steps" radius={[4, 4, 0, 0]}>
                {DATA_MOCK.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.steps >= 15000 ? COLORS.green : '#E5E5EA'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Projection */}
      <section className="px-4 py-2">
        <p className="text-[13px] text-[#8E8E93] font-medium leading-relaxed">
          Based on your last 7 days, you're on track to complete ~65 strength sessions this quarter. 
          <span className="text-[#007AFF] block mt-1">Consistency is improving +12% vs last month.</span>
        </p>
      </section>

      {/* Weekly Review CTA */}
      <button 
        onClick={handleStartReview}
        className="w-full bg-[#007AFF] py-4 rounded-[20px] font-bold text-white shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all"
      >
        Start Weekly Review
      </button>

      {/* Weekly Review Wizard */}
      {isReviewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-[#1C1C1E] rounded-[28px] p-8 space-y-8 animate-in zoom-in-95 duration-300">
            {reviewStep === 0 && (
              <div className="space-y-6 text-center">
                <div className="text-5xl">🏆</div>
                <h2 className="text-2xl font-bold">Great week, Alex.</h2>
                <p className="text-gray-500">You met 85% of your holistic intentions. Your physical consistency was the strongest.</p>
                <button onClick={nextStep} className="w-full bg-[#007AFF] text-white py-4 rounded-xl font-bold">Continue</button>
              </div>
            )}
            {reviewStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">A Moment of Reflection</h2>
                <p className="text-gray-500 text-center">In which domain did you feel most present this week?</p>
                <div className="grid grid-cols-2 gap-3">
                  {Object.values(COLORS).slice(0, 5).map((c, i) => (
                    <button key={i} onClick={nextStep} className="py-3 rounded-xl border border-gray-100 dark:border-white/5 active:bg-gray-100 font-medium">Domain {i+1}</button>
                  ))}
                </div>
              </div>
            )}
            {reviewStep === 2 && (
              <div className="space-y-6 text-center">
                <div className="text-5xl">✨</div>
                <h2 className="text-2xl font-bold">Ready for next week.</h2>
                <p className="text-gray-500">Setting your intentions now helps you stay aligned tomorrow.</p>
                <button onClick={() => setIsReviewing(false)} className="w-full bg-[#007AFF] text-white py-4 rounded-xl font-bold">Finish Review</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressView;
