import React from 'react';
import { SiteContact } from '../types.ts';

interface ContactViewProps {
  contact: SiteContact;
  isAdmin: boolean;
  onEditContact?: () => void;
  onImageClick: (url: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  contact,
  isAdmin,
  onEditContact,
  onImageClick,
}) => {
  return (
    <div className="animate-fade-in pb-24 text-left px-5 pt-2">
      {/* Admin edit button */}
      {isAdmin && onEditContact && (
        <div className="flex justify-end mb-3">
          <button
            onClick={onEditContact}
            className="bg-[#8B5A2B] text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer"
          >
            <i className="fa-solid fa-pen text-[10px]"></i> แก้ไขช่องทางติดต่อ
          </button>
        </div>
      )}

      {/* Social Links Grid */}
      <div className="bg-white rounded-[24px] shadow-[0_6px_25px_rgba(255,158,187,0.2)] border border-[#FFE4EC] p-4 flex justify-between items-center gap-2 mb-4">
        {/* Facebook */}
        <a
          href={contact.fb}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 group flex-1 transition-transform hover:scale-105"
        >
          <div className="w-12 h-12 rounded-full border-2 border-[#FFF0F5] bg-[#FFF0F5]/50 text-[#1877F2] flex items-center justify-center text-xl group-hover:bg-[#1877F2] group-hover:text-white transition-all shadow-sm">
            <i className="fa-brands fa-facebook-f"></i>
          </div>
          <span className="text-[10.5px] font-semibold text-[#6B4C42] group-hover:text-[#1877F2] transition-colors">
            Facebook
          </span>
        </a>

        {/* LINE */}
        <a
          href={contact.line}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 group flex-1 transition-transform hover:scale-105"
        >
          <div className="w-12 h-12 rounded-full border-2 border-[#F0FFF4] bg-[#F0FFF4]/50 text-[#00B900] flex items-center justify-center text-xl group-hover:bg-[#00B900] group-hover:text-white transition-all shadow-sm">
            <i className="fa-brands fa-line text-2xl"></i>
          </div>
          <span className="text-[10.5px] font-semibold text-[#6B4C42] group-hover:text-[#00B900] transition-colors">
            Line
          </span>
        </a>

        {/* TikTok */}
        <a
          href={contact.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 group flex-1 transition-transform hover:scale-105"
        >
          <div className="w-12 h-12 rounded-full border-2 border-gray-100 bg-gray-50 text-black flex items-center justify-center text-xl group-hover:bg-black group-hover:text-white transition-all shadow-sm">
            <i className="fa-brands fa-tiktok"></i>
          </div>
          <span className="text-[10.5px] font-semibold text-[#6B4C42] group-hover:text-black transition-colors">
            TikTok
          </span>
        </a>

        {/* Instagram */}
        <a
          href={contact.ig}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 group flex-1 transition-transform hover:scale-105"
        >
          <div className="w-12 h-12 rounded-full border-2 border-[#FFF0F5] bg-[#FFF0F5]/50 text-[#E1306C] flex items-center justify-center text-xl group-hover:bg-[#E1306C] group-hover:text-white transition-all shadow-sm">
            <i className="fa-brands fa-instagram"></i>
          </div>
          <span className="text-[10.5px] font-semibold text-[#6B4C42] group-hover:text-[#E1306C] transition-colors">
            Instagram
          </span>
        </a>
      </div>

      {/* Contact Poster / QR Banner */}
      <div className="relative group cursor-pointer" onClick={() => onImageClick(contact.img)}>
        <img
          src={contact.img}
          alt="Contact details"
          className="w-full rounded-[24px] shadow-sm border-[4px] border-white object-cover transition-transform group-hover:scale-[1.01]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://placehold.co/400x500/FFF0F5/FF9EBB?text=Contact+Poster';
          }}
        />
        <div className="absolute bottom-4 right-4 bg-black/60 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow">
          <i className="fa-solid fa-expand text-[10px]"></i> แตะเพื่อขยายรูปภาพ
        </div>
      </div>
    </div>
  );
};
