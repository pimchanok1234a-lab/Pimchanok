import React from 'react';
import { SiteSettings, TabIndex } from '../types.ts';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SiteSettings;
  onNavigateTab: (tab: TabIndex) => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onClose,
  settings,
  onNavigateTab,
}) => {
  if (!isOpen) return null;

  const handleAction = (tab: TabIndex) => {
    onClose();
    onNavigateTab(tab);
  };

  const isStoreOpen = settings.shopStatus === 'OPEN';

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="bg-[#FFFDF4] border-[3px] border-[#FFE4EC] rounded-[32px] p-5 sm:p-6 max-w-[360px] w-full relative z-10 shadow-[0_10px_40px_-10px_rgba(255,158,187,0.4)] animate-pop">
        {/* Header inside modal */}
        <div className="flex items-center justify-between w-full mb-3">
          <div className="flex items-center gap-3">
            <img
              src={settings.logoUrl}
              alt="Profile"
              className="w-[46px] h-[46px] rounded-full border-[2.5px] border-white ring-[2.5px] ring-[#FFF9EB] object-cover shadow-sm"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://placehold.co/100x100/FFF0F5/FF9EBB?text=Logo';
              }}
            />
            <div className="flex flex-col justify-center">
              <h2 className="text-[#6B4C42] font-extrabold text-[15px] leading-tight tracking-wide">
                {settings.shopName}
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-[#8A6F65] font-medium">ยินดีต้อนรับสู่ร้านค้า</span>
                <span
                  className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded leading-none ${
                    isStoreOpen
                      ? 'bg-green-100 text-green-600'
                      : 'bg-rose-100 text-rose-600'
                  }`}
                >
                  {isStoreOpen ? 'OPEN' : 'CLOSED'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white text-[#D9779B] flex items-center justify-center border border-[#FFE4EC] hover:bg-[#FFF0F5] transition-colors shadow-sm cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Promo Image */}
        <div className="w-full aspect-[4/3] rounded-[22px] overflow-hidden mb-4 border-[2px] border-[#FFE4EC] shadow-sm bg-white">
          <img
            src={settings.welcomeModalImg}
            alt="Welcome promo"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://placehold.co/400x300/FFF0F5/FF9EBB?text=Mednun+Store';
            }}
          />
        </div>

        {/* Quick Navigate Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => handleAction(1)}
            className="col-span-2 w-full bg-[#FFF0F5] border-[2px] border-[#FFE4EC] hover:bg-[#FFE4EC]/50 text-[#6B4C42] rounded-[18px] p-2.5 flex items-center justify-between transition-all group active:scale-98 text-left shadow-sm cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FF9EBB] text-white flex items-center justify-center shadow-sm">
                <i className="fa-solid fa-fire text-sm"></i>
              </div>
              <div>
                <p className="font-extrabold text-[12.5px] leading-tight text-[#D9779B]">
                  {settings.tabNames?.tab1 || 'เช่ารหัส Free Fire'}
                </p>
                <p className="text-[10px] text-[#8A6F65]">ปักธง • ปืนเจ็ด • ตัว Hot</p>
              </div>
            </div>
            <i className="fa-solid fa-chevron-right text-xs text-[#D9779B] group-hover:translate-x-1 transition-transform mr-1"></i>
          </button>

          <button
            onClick={() => handleAction(2)}
            className="col-span-2 w-full bg-[#F4FAFF] border-[2px] border-[#E0F0FE] hover:bg-[#E0F0FE]/60 text-[#6B4C42] rounded-[18px] p-2.5 flex items-center justify-between transition-all group active:scale-98 text-left shadow-sm cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#75B8FF] text-white flex items-center justify-center shadow-sm">
                <i className="fa-solid fa-sparkles text-sm"></i>
              </div>
              <div>
                <p className="font-extrabold text-[12.5px] leading-tight text-[#4C88E0]">
                  {settings.tabNames?.tab2 || 'บริการอื่นๆ'}
                </p>
                <p className="text-[10px] text-[#8A6F65]">เช่า ROV • เติมเกม • บริการเสริม</p>
              </div>
            </div>
            <i className="fa-solid fa-chevron-right text-xs text-[#4C88E0] group-hover:translate-x-1 transition-transform mr-1"></i>
          </button>

          <button
            onClick={() => handleAction(3)}
            className="w-full bg-[#FFFDE7] border-[2px] border-[#FFF3C4] hover:bg-[#FFF3C4]/60 text-[#6B4C42] rounded-[18px] p-2.5 flex flex-col items-center justify-center gap-1.5 transition-all active:scale-98 shadow-sm cursor-pointer text-center"
          >
            <div className="w-7 h-7 rounded-full bg-[#F6D04D] text-white flex items-center justify-center shadow-sm">
              <i className="fa-solid fa-store text-xs"></i>
            </div>
            <span className="font-bold text-[11px] text-[#B08900]">
              {settings.tabNames?.tab3 || 'แอคร้าน'}
            </span>
          </button>

          <button
            onClick={() => handleAction(4)}
            className="w-full bg-[#F0FFF4] border-[2px] border-[#DCFCE7] hover:bg-[#DCFCE7]/60 text-[#6B4C42] rounded-[18px] p-2.5 flex flex-col items-center justify-center gap-1.5 transition-all active:scale-98 shadow-sm cursor-pointer text-center"
          >
            <div className="w-7 h-7 rounded-full bg-[#52C41A] text-white flex items-center justify-center shadow-sm">
              <i className="fa-solid fa-comments text-xs"></i>
            </div>
            <span className="font-bold text-[11px] text-[#2B820D]">
              {settings.tabNames?.tab4 || 'ติดต่อเรา'}
            </span>
          </button>
        </div>

        {/* Enter Store Button */}
        <button
          onClick={onClose}
          className="w-full bg-[#FF9EBB] hover:bg-[#D9779B] text-white font-extrabold py-3 rounded-[18px] text-[13px] shadow-[0_4px_15px_rgba(255,158,187,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
        >
          <span>เข้าสู่หน้าร้านค้า</span>
          <i className="fa-solid fa-arrow-right text-xs"></i>
        </button>
      </div>
    </div>
  );
};
