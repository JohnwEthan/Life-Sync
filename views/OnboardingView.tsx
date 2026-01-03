
import React, { useState } from 'react';
import { Icons, COLORS } from '../constants';

interface OnboardingProps {
  onComplete: () => void;
}

const OnboardingView: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to LifeSync",
      subtitle: "A holistic cockpit for your physical, mental, and spiritual self.",
      icon: "🧘‍♂️",
      color: "bg-indigo-500"
    },
    {
      title: "Privacy by Design",
      subtitle: "Your data stays in HealthKit and iCloud. We never see your personal metrics.",
      icon: <Icons.Shield />,
      color: "bg-green-500",
      isIcon: true
    },
    {
      title: "Apple Integration",
      subtitle: "Sync steps from Garmin through Apple Health effortlessly.",
      icon: <Icons.Apple />,
      color: "bg-black",
      isIcon: true
    },
    {
      title: "Total Alignment",
      subtitle: "Track physical weight alongside spiritual prayers and family time.",
      icon: "⚖️",
      color: "bg-blue-500"
    }
  ];

  const current = steps[step];

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-black flex flex-col items-center px-8 pt-24 pb-12 safe-bottom">
      <div className="flex-1 w-full flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in-95 duration-700">
        <div className={`w-24 h-24 rounded-[28%] ${current.color} flex items-center justify-center text-5xl text-white shadow-2xl`}>
          {current.isIcon ? current.icon : current.icon}
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight">{current.title}</h1>
          <p className="text-xl text-[#8E8E93] leading-relaxed font-medium px-4">
            {current.subtitle}
          </p>
        </div>
      </div>

      <div className="w-full space-y-4">
        <button 
          onClick={() => step < steps.length - 1 ? setStep(step + 1) : onComplete()}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl text-lg active:scale-[0.98] transition-all shadow-xl shadow-blue-500/20"
        >
          {step === steps.length - 1 ? "Get Started" : "Continue"}
        </button>
        {step > 0 && (
           <button 
           onClick={() => setStep(step - 1)}
           className="w-full py-2 text-blue-500 font-semibold"
         >
           Back
         </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingView;
