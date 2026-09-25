import React from 'react';
import { TabIndex, TabNames } from '../types.ts';

interface BottomNavProps {
  currentTab: TabIndex;
  onTabChange: (tab: TabIndex) => void;
  tabNames?: TabNames;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange, tabNames }) => {
  const items: Array<{ tab: TabIndex; label: string; icon: string }> = [
    { tab: 0, label: tabNames?.tab0 || 'หน้าแรก', icon: 'fa-solid fa-house' },
    { tab: 1, label: tabNames?.tab1 || 'เช่ารหัส(FF)', icon: 'fa-solid fa-key' },
    { tab: 2, label: tabNames?.tab2 || 'บริการอื่นๆ', icon: 'fa-solid fa-sparkles' },
    { tab: 3, label: tabNames?.tab3 || 'แอคร้าน', icon: 'fa-solid fa-store' },
    { tab: 4, label: tabNames?.tab4 || 'ติดต่อเรา', icon: 'fa-solid fa-comments' },
  ];

  return (
    <div className="floating-nav-container">
      <div className="bg-white/95 backdrop-blur-md border border-[#FFE4EC] px-4 py-2 shadow-[0_10px_35px_-5px_rgba(255,158,187,0.4)] rounded-full floating-nav-content">
        <div className="flex justify-between items-center">
          {items.map((item) => {
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                type="button"
                onClick={() => onTabChange(item.tab)}
                className={`flex flex-col items-center gap-1 cursor-pointer w-1/5 transition-all py-1 rounded-2xl ${
                  isActive
                    ? 'text-[#D9779B] scale-105 font-bold'
                    : 'text-[#8A6F65] opacity-75 hover:opacity-100 hover:text-[#D9779B]'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isActive ? 'bg-[#FFF0F5] text-[#D9779B] shadow-inner' : 'bg-transparent'
                  }`}
                >
                  <i className={`${item.icon} text-[15px]`}></i>
                </div>
                <span className="text-[9.5px] leading-none whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
