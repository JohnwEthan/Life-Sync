
import React from 'react';
import { Icons, COLORS } from '../constants';

const SettingRow: React.FC<{ icon: string | React.ReactNode, label: string, value?: string, color: string, isCustomIcon?: boolean }> = ({ icon, label, value, color, isCustomIcon }) => (
  <div className="flex items-center justify-between py-[11px] group cursor-pointer active:opacity-60 transition-opacity">
    <div className="flex items-center space-x-3.5">
      <div className={`w-[29px] h-[29px] rounded-lg flex items-center justify-center text-white`} style={{ backgroundColor: color }}>
        <span className={isCustomIcon ? "w-5 h-5" : "text-[19px]"}>{icon}</span>
      </div>
      <span className="text-[17px] font-normal tracking-tight">{label}</span>
    </div>
    <div className="flex items-center space-x-2">
      {value && <span className="text-[17px] text-[#3C3C43]/60 dark:text-[#EBEBF5]/60">{value}</span>}
      <div className="text-[#C4C4C6]">
        <Icons.ChevronRight />
      </div>
    </div>
  </div>
);

const SettingsView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="px-1">
        <h2 className="text-[13px] font-normal uppercase tracking-wide text-[#3C3C43]/60 dark:text-[#EBEBF5]/60 mb-2 ml-4">Sync & Privacy</h2>
        <section className={`${COLORS.secondaryBackground} rounded-[10px] overflow-hidden px-4 divide-y divide-[#C6C6C8]/30`}>
          <SettingRow icon="🍎" label="Apple Health" value="Enabled" color="#FF2D55" />
          <SettingRow icon="⌚" label="Garmin Connect" value="Via Health" color="#007AFF" />
          <SettingRow icon="☁️" label="iCloud Sync" value="On" color="#5856D6" />
        </section>
      </div>

      <div className="px-1">
        <h2 className="text-[13px] font-normal uppercase tracking-wide text-[#3C3C43]/60 dark:text-[#EBEBF5]/60 mb-2 ml-4">Account</h2>
        <section className={`${COLORS.secondaryBackground} rounded-[10px] overflow-hidden px-4 divide-y divide-[#C6C6C8]/30`}>
          <SettingRow icon="👤" label="Personal Profile" color="#8E8E93" />
          <SettingRow icon={<Icons.Shield />} label="Privacy Policy" color="#34C759" isCustomIcon />
          <SettingRow icon="📥" label="Export My Data" value="CSV" color="#AF52DE" />
        </section>
      </div>

      <div className="px-1">
        <h2 className="text-[13px] font-normal uppercase tracking-wide text-[#3C3C43]/60 dark:text-[#EBEBF5]/60 mb-2 ml-4">Preferences</h2>
        <section className={`${COLORS.secondaryBackground} rounded-[10px] overflow-hidden px-4 divide-y divide-[#C6C6C8]/30`}>
          <SettingRow icon="🔔" label="Notifications" color="#FF9500" />
          <SettingRow icon="🌙" label="Focus Filters" color="#5856D6" />
          <SettingRow icon="🎨" label="App Icon" color="#007AFF" />
        </section>
      </div>

      <div className="px-1">
        <section className={`${COLORS.secondaryBackground} rounded-[10px] overflow-hidden px-4 mb-4`}>
          <button className="w-full text-left py-[11px] text-[#FF3B30] text-[17px] font-normal">
            Reset All Progress Data
          </button>
        </section>
        <p className="text-center text-[13px] text-[#8E8E93] px-10 pb-10 leading-relaxed">
          LifeSync is committed to your privacy. No data leaves your devices unless you enable iCloud sync.
        </p>
      </div>
    </div>
  );
};

export default SettingsView;
