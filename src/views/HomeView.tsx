import React from 'react';
import { HomeGalleries, SiteSettings, TabIndex } from '../types.ts';

interface HomeViewProps {
  settings: SiteSettings;
  galleries: HomeGalleries;
  isAdmin: boolean;
  onNavigateTab: (tab: TabIndex) => void;
  onImageClick: (url: string) => void;
  onAddGalleryItem?: (type: 'steps' | 'rules') => void;
  onDeleteGalleryItem?: (type: 'steps' | 'rules', index: number) => void;
  onOpenSettings?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  settings,
  galleries,
  isAdmin,
  onNavigateTab,
  onImageClick,
  onAddGalleryItem,
  onDeleteGalleryItem,
  onOpenSettings,
}) => {
  return (
    <div className="animate-fade-in pb-24 text-left">
      {/* Hero Showcase with Floating Decorations */}
      <div className="relative pt-4 pb-2 px-4 overflow-hidden">
        {/* Cute Floating Background Stars & Bubbles */}
        <div className="absolute top-2 left-6 text-[#FFD700] text-lg opacity-60 decor-float-1 pointer-events-none">
          ✦
        </div>
        <div className="absolute top-10 right-6 text-[#FF9EBB] text-xl opacity-60 decor-float-2 pointer-events-none">
          ❤
        </div>
        <div className="absolute bottom-4 left-10 text-[#FFD700] text-sm opacity-50 decor-float-2 pointer-events-none">
          ★
        </div>

        {/* Hero Tablet Frame */}
        <div
          className="hero-tablet-frame group cursor-pointer"
          onClick={() => onImageClick(settings.heroImg || galleries.steps[0] || settings.welcomeModalImg)}
        >
          <img
            src={settings.heroImg || galleries.steps[0] || settings.welcomeModalImg}
            alt="Hero showcase"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://placehold.co/400x400/FFF0F5/FF9EBB?text=Mednun';
            }}
          />
          <div className="absolute bottom-6 right-6 bg-black/60 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow">
            <i className="fa-solid fa-expand text-[10px]"></i> แตะเพื่อขยาย
          </div>
        </div>

        {/* Welcome Text */}
        <div className="text-center mt-4 px-3">
          <h1 className="font-extrabold text-[#6B4C42] text-[17px] tracking-wide leading-snug">
            {settings.welcomeTitle}
          </h1>
          <p className="text-[11.5px] text-[#8A6F65] font-medium mt-1 leading-relaxed max-w-[320px] mx-auto">
            {settings.welcomeSubtitle}
          </p>
        </div>

        {isAdmin && onOpenSettings && (
          <div className="flex justify-center mt-2">
            <button
              onClick={onOpenSettings}
              className="bg-[#8B5A2B] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer"
            >
              <i className="fa-solid fa-sliders"></i> ตั้งค่าข้อมูลร้านค้า
            </button>
          </div>
        )}
      </div>

      {/* 4 Quick Jump Cards Grid */}
      <div className="px-5 my-4">
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onNavigateTab(1)}
            className="w-full bg-[#FFF0F5] border-[2px] border-[#FFE4EC] hover:bg-[#FFE4EC]/50 text-[#6B4C42] rounded-[22px] p-3 flex flex-col items-center justify-center gap-1 transition-all shadow-sm active:scale-95 cursor-pointer text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-[#FF9EBB] text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-fire text-base"></i>
            </div>
            <span className="font-extrabold text-[12px] text-[#D9779B] mt-1">
              {settings.tabNames?.tab1 || 'รหัสพร้อมเล่น (FF)'}
            </span>
            <span className="text-[9.5px] text-[#8A6F65]">ปักธง • ปืนเจ็ด • เรทถูก</span>
          </button>

          <button
            onClick={() => onNavigateTab(2)}
            className="w-full bg-[#F4FAFF] border-[2px] border-[#E0F0FE] hover:bg-[#E0F0FE]/60 text-[#6B4C42] rounded-[22px] p-3 flex flex-col items-center justify-center gap-1 transition-all shadow-sm active:scale-95 cursor-pointer text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-[#75B8FF] text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-sparkles text-base"></i>
            </div>
            <span className="font-extrabold text-[12px] text-[#4C88E0] mt-1">
              {settings.tabNames?.tab2 || 'บริการอื่นๆ'}
            </span>
            <span className="text-[9.5px] text-[#8A6F65]">เช่า ROV • เติมเกม • เสริม</span>
          </button>

          <button
            onClick={() => onNavigateTab(3)}
            className="w-full bg-[#FFFDE7] border-[2px] border-[#FFF3C4] hover:bg-[#FFF3C4]/60 text-[#6B4C42] rounded-[22px] p-3 flex flex-col items-center justify-center gap-1 transition-all shadow-sm active:scale-95 cursor-pointer text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-[#F6D04D] text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-store text-base"></i>
            </div>
            <span className="font-extrabold text-[12px] text-[#B08900] mt-1">
              {settings.tabNames?.tab3 || 'แอคร้าน'}
            </span>
            <span className="text-[9.5px] text-[#8A6F65]">กลุ่มบล็อค • รหัสพร้อมขาย</span>
          </button>

          <button
            onClick={() => onNavigateTab(4)}
            className="w-full bg-[#F0FFF4] border-[2px] border-[#DCFCE7] hover:bg-[#DCFCE7]/60 text-[#6B4C42] rounded-[22px] p-3 flex flex-col items-center justify-center gap-1 transition-all shadow-sm active:scale-95 cursor-pointer text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-[#52C41A] text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-comments text-base"></i>
            </div>
            <span className="font-extrabold text-[12px] text-[#2B820D] mt-1">
              {settings.tabNames?.tab4 || 'ช่องทางติดต่อ'}
            </span>
            <span className="text-[9.5px] text-[#8A6F65]">Facebook • LINE • IG</span>
          </button>
        </div>
      </div>

      {/* Steps & How to Rent Section */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF9EBB]"></span>
            <h3 className="font-extrabold text-[#6B4C42] text-[13px] tracking-wide">
              ขั้นตอนการเช่ารหัส
            </h3>
          </div>
          {isAdmin && onAddGalleryItem && (
            <button
              onClick={() => onAddGalleryItem('steps')}
              className="text-[10px] font-bold text-[#8B5A2B] bg-[#8B5A2B]/10 hover:bg-[#8B5A2B]/20 px-2 py-0.5 rounded-full transition-colors flex items-center gap-1 cursor-pointer"
            >
              <i className="fa-solid fa-plus text-[9px]"></i> เพิ่มรูปขั้นตอน
            </button>
          )}
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {galleries.steps.map((url, index) => (
            <div
              key={index}
              className="relative shrink-0 w-[200px] aspect-[4/5] rounded-[20px] overflow-hidden bg-white border-[3px] border-[#FFE4EC] shadow-sm group cursor-pointer"
            >
              <img
                src={url}
                alt={`Step ${index + 1}`}
                onClick={() => onImageClick(url)}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://placehold.co/300x400/FFF0F5/FF9EBB?text=Step';
                }}
              />
              <div className="absolute top-2 left-2 bg-[#FF9EBB] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
                ขั้นตอนที่ {index + 1}
              </div>

              {isAdmin && onDeleteGalleryItem && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('ต้องการลบรูปภาพนี้หรือไม่?')) {
                      onDeleteGalleryItem('steps', index);
                    }
                  }}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] shadow hover:bg-rose-600 transition-colors"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Shop Rules Section */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F6D04D]"></span>
            <h3 className="font-extrabold text-[#6B4C42] text-[13px] tracking-wide">
              กฎกติกาการเช่ารหัส
            </h3>
          </div>
          {isAdmin && onAddGalleryItem && (
            <button
              onClick={() => onAddGalleryItem('rules')}
              className="text-[10px] font-bold text-[#8B5A2B] bg-[#8B5A2B]/10 hover:bg-[#8B5A2B]/20 px-2 py-0.5 rounded-full transition-colors flex items-center gap-1 cursor-pointer"
            >
              <i className="fa-solid fa-plus text-[9px]"></i> เพิ่มรูปกฎ
            </button>
          )}
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {galleries.rules.map((url, index) => (
            <div
              key={index}
              className="relative shrink-0 w-[200px] aspect-[4/5] rounded-[20px] overflow-hidden bg-white border-[3px] border-[#FFE4EC] shadow-sm group cursor-pointer"
            >
              <img
                src={url}
                alt={`Rule ${index + 1}`}
                onClick={() => onImageClick(url)}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://placehold.co/300x400/FFF0F5/FF9EBB?text=Rule';
                }}
              />
              <div className="absolute top-2 left-2 bg-[#F6D04D] text-[#6B4C42] text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
                กฎกติกา {index + 1}
              </div>

              {isAdmin && onDeleteGalleryItem && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('ต้องการลบรูปภาพนี้หรือไม่?')) {
                      onDeleteGalleryItem('rules', index);
                    }
                  }}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] shadow hover:bg-rose-600 transition-colors"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
