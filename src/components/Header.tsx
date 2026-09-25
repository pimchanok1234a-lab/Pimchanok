import React from 'react';
import { SiteSettings } from '../types.ts';

interface HeaderProps {
  settings: SiteSettings;
  pageTitle: string;
  pageIcon: string;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onAvatarClick: () => void;
  onOpenBackOffice: () => void;
  isAdmin: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  pageTitle,
  pageIcon,
  isMusicPlaying,
  onToggleMusic,
  onAvatarClick,
  onOpenBackOffice,
  isAdmin
}) => {
  const isOpen = settings.shopStatus === 'OPEN';

  return (
    <div className="bg-white rounded-b-3xl shadow-sm border-b border-[#FFF0F5] px-4 sm:px-5 py-3.5 flex items-center justify-between relative z-40">
      <div className="flex items-center gap-2.5">
        <div className="relative">
          <img
            src={settings.logoUrl}
            alt="Profile"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-white ring-2 ring-[#FFF8E7] object-cover cursor-pointer hover:scale-105 transition-transform shadow-sm"
            onClick={onAvatarClick}
            title={isAdmin ? "คลิกเพื่อจัดการร้าน" : "คลิกเพื่อเข้าสู่ระบบแอดมิน"}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://placehold.co/100x100/FFF0F5/FF9EBB?text=Logo';
            }}
          />
          {isAdmin && (
            <span className="absolute -bottom-1 -right-1 bg-[#8B5A2B] text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded-full ring-1 ring-white shadow">
              ADMIN
            </span>
          )}
        </div>

        <div>
          <h2 className="text-[#6B4C42] font-bold text-xs sm:text-sm leading-tight max-w-[170px] sm:max-w-[210px] truncate">
            {settings.shopName}
          </h2>
          <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
            <span className="text-[10px] text-[#8A6F65] flex items-center gap-1 font-medium truncate max-w-[100px] sm:max-w-[140px]">
              <i className={`${pageIcon} text-[#FF9EBB]`}></i> {pageTitle}
            </span>
            <span
              className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-full uppercase leading-none tracking-wide ${
                isOpen
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-100 text-rose-700 border border-rose-200'
              }`}
            >
              {isOpen ? 'OPEN' : 'CLOSED'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Back-Office direct access button */}
        <button
          onClick={onOpenBackOffice}
          type="button"
          className="bg-[#FFFDF4] hover:bg-[#FFE4EC] text-[#8B5A2B] border border-[#FFE4EC] px-2.5 py-1.5 rounded-full text-[11px] font-bold shadow-xs flex items-center gap-1 transition-all cursor-pointer active:scale-95"
          title="เข้าระบบหลังบ้าน"
        >
          <i className="fa-solid fa-sliders text-[#8B5A2B] text-[10px]"></i>
          <span>หลังบ้าน</span>
        </button>

        {/* Music button */}
        <button
          onClick={onToggleMusic}
          type="button"
          aria-label="Toggle background music"
          className="w-[34px] h-[34px] rounded-full bg-[#FFFDF4] text-[#FF9EBB] flex items-center justify-center border border-[#FFE4EC] hover:bg-[#FFF0F5] transition-all shadow-sm active:scale-95 cursor-pointer"
          title={isMusicPlaying ? "หยุดเพลงชั่วคราว" : "เปิดเพลงพื้นหลัง"}
        >
          {isMusicPlaying ? (
            <i className="fa-solid fa-music text-[13px] text-[#FF9EBB] animate-pulse"></i>
          ) : (
            <div className="relative flex items-center justify-center">
              <i className="fa-solid fa-music text-[12px] text-[#D9779B] opacity-40"></i>
              <i className="fa-solid fa-slash absolute text-[14px] text-[#FF9EBB]"></i>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
