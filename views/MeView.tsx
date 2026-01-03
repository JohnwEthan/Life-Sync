
import React, { useState } from 'react';
import { Icons, COLORS } from '../constants';
import { UserProfile } from '../types';

interface MeViewProps {
  profile: UserProfile;
  lastSync: string;
  onUpdateProfile: (profile: UserProfile) => void;
}

const SettingRow: React.FC<{ icon: string | React.ReactNode, label: string, value?: string, color: string, isCustomIcon?: boolean, onClick?: () => void }> = ({ icon, label, value, color, isCustomIcon, onClick }) => (
  <div onClick={onClick} className="flex items-center justify-between py-[11px] group cursor-pointer active:opacity-60 transition-opacity">
    <div className="flex items-center space-x-3.5">
      <div className={`w-[29px] h-[29px] rounded-lg flex items-center justify-center text-white`} style={{ backgroundColor: color }}>
        <span className={isCustomIcon ? "w-5 h-5" : "text-[18px]"}>{icon}</span>
      </div>
      <span className="text-[17px] font-normal tracking-tight text-black dark:text-white">{label}</span>
    </div>
    <div className="flex items-center space-x-2">
      {value && <span className="text-[17px] text-[#3C3C43]/60 dark:text-[#EBEBF5]/60">{value}</span>}
      <div className="text-[#C4C4C6]">
        <Icons.ChevronRight />
      </div>
    </div>
  </div>
);

const MeView: React.FC<MeViewProps> = ({ profile, lastSync, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(profile.name);

  const handleSave = () => {
    onUpdateProfile({ ...profile, name: editName });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 pb-32 animate-in fade-in duration-700">
      {/* Profile Header Cell */}
      <section className="bg-white dark:bg-[#1C1C1E] rounded-[22px] p-5 shadow-sm border border-gray-100 dark:border-white/5 flex items-center space-x-4 mx-1">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-3xl shadow-inner">
          👤
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">{profile.name}</h2>
          <p className="text-sm text-[#8E8E93] font-medium">Synced via Garmin Connect</p>
        </div>
        <button onClick={() => setIsEditing(true)} className="text-[#007AFF] font-semibold text-[15px]">Edit</button>
      </section>

      {/* Stats Summary Grid */}
      <div className="px-1 grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-[#1C1C1E] p-4 rounded-[22px] shadow-sm border border-gray-100 dark:border-white/5">
          <p className="text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider mb-1">Current Weight</p>
          <p className="text-2xl font-bold">{profile.weight} <span className="text-sm font-normal text-gray-400">kg</span></p>
        </div>
        <div className="bg-white dark:bg-[#1C1C1E] p-4 rounded-[22px] shadow-sm border border-gray-100 dark:border-white/5">
          <p className="text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider mb-1">Step Average</p>
          <p className="text-2xl font-bold">12,885</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="px-1">
          <h2 className="text-[13px] font-semibold uppercase tracking-wide text-[#8E8E93] dark:text-[#8E8E92] mb-2 ml-4">Goals & Habits</h2>
          <section className="bg-white dark:bg-[#1C1C1E] rounded-[10px] overflow-hidden px-4 divide-y divide-[#C6C6C8]/30">
            <SettingRow icon="🎯" label="Configure Targets" value="9 active" color={COLORS.blue} />
            <SettingRow icon="📅" label="Daily Schedule" color={COLORS.indigo} />
          </section>
        </div>

        <div className="px-1">
          <h2 className="text-[13px] font-semibold uppercase tracking-wide text-[#8E8E93] dark:text-[#8E8E92] mb-2 ml-4">Data Sources</h2>
          <section className="bg-white dark:bg-[#1C1C1E] rounded-[10px] overflow-hidden px-4 divide-y divide-[#C6C6C8]/30">
            <SettingRow icon="🍎" label="HealthKit" value="Connected" color="#FF2D55" />
            <SettingRow icon="☁️" label="iCloud Backup" value="E2E Active" color={COLORS.blue} />
            <SettingRow icon="📥" label="Export My Data" value="JSON" color={COLORS.gray} />
          </section>
          <p className="text-[12px] text-[#8E8E93] mt-2 ml-4">Last sync: {new Date(lastSync).toLocaleString()}</p>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-[#1C1C1E] rounded-[28px] p-6 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Edit Profile</h2>
              <button onClick={() => setIsEditing(false)} className="text-[#007AFF]"><Icons.X /></button>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-gray-400 ml-2">Name</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-4 rounded-xl bg-gray-50 dark:bg-black border-none"
                />
              </div>
            </div>
            <button 
              onClick={handleSave}
              className="w-full bg-[#007AFF] text-white py-4 rounded-xl font-bold"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeView;
