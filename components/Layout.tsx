
import React from 'react';
import { Icons, COLORS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  title: string;
  summary?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, title, summary }) => {
  return (
    <div className={`flex flex-col h-screen ${COLORS.systemBackground}`}>
      <header className="px-5 pt-14 pb-4 sticky top-0 z-20 bg-[#F2F2F7]/90 dark:bg-black/90 ios-blur">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-[34px] font-bold tracking-tight text-black dark:text-white leading-tight">
              {title}
            </h1>
            {summary && (
              <p className="text-[13px] font-semibold text-[#8E8E93] dark:text-[#8E8E92] mt-0.5 tracking-tight uppercase">
                {summary}
              </p>
            )}
          </div>
          {activeTab === 'today' && (
            <button className="w-9 h-9 bg-white dark:bg-[#1C1C1E] rounded-full shadow-sm flex items-center justify-center text-[#007AFF] active:scale-90 transition-transform mt-1 border border-gray-100 dark:border-white/5">
              <Icons.Plus />
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-5 pt-2 pb-32">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 dark:bg-black/80 ios-blur border-t border-[#C6C6C8]/30 dark:border-[#38383A]/30 safe-bottom flex justify-around items-center px-4 z-30">
        <button 
          onClick={() => setActiveTab('today')}
          className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'today' ? 'text-[#007AFF]' : 'text-[#8E8E93]'}`}
        >
          <Icons.Today />
          <span className="text-[10px] font-medium">Today</span>
        </button>
        <button 
          onClick={() => setActiveTab('progress')}
          className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'progress' ? 'text-[#007AFF]' : 'text-[#8E8E93]'}`}
        >
          <Icons.Trends />
          <span className="text-[10px] font-medium">Trends</span>
        </button>
        <button 
          onClick={() => setActiveTab('me')}
          className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'me' ? 'text-[#007AFF]' : 'text-[#8E8E93]'}`}
        >
          <div className={`w-6 h-6 rounded-full flex items-center justify-center overflow-hidden border ${activeTab === 'me' ? 'border-[#007AFF]' : 'border-transparent'}`}>
             <span className="text-[10px]">👤</span>
          </div>
          <span className="text-[10px] font-medium">Me</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
