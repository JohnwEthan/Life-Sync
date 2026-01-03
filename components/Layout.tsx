
import React from 'react';
import { Icons, COLORS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  title: string;
  subtitle?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, title, subtitle }) => {
  return (
    <div className={`flex flex-col h-screen ${COLORS.systemBackground}`}>
      {/* iOS-Style Large Title Header */}
      <header className="px-5 pt-14 pb-4 sticky top-0 z-20 bg-[#F2F2F7]/80 dark:bg-black/80 ios-blur">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-[34px] font-bold tracking-tight text-black dark:text-white leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[15px] font-medium text-[#8E8E93] dark:text-[#8E8E92] mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {activeTab === 'today' && (
            <button className="w-9 h-9 bg-white dark:bg-[#1C1C1E] rounded-full shadow-sm flex items-center justify-center text-[#007AFF] active:scale-90 transition-transform mb-1 border border-gray-100 dark:border-white/5">
              <Icons.Plus />
            </button>
          )}
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto px-5 pt-2 pb-32">
        {children}
      </main>

      {/* Tab Bar (iOS Native Pattern) */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 dark:bg-black/80 ios-blur border-t border-gray-200 dark:border-gray-800 safe-bottom flex justify-around items-center px-4 z-30">
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
