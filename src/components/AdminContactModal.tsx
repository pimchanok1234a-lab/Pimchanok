import React, { useState } from 'react';
import { SiteContact } from '../types.ts';

interface AdminContactModalProps {
  isOpen: boolean;
  contact: SiteContact;
  onClose: () => void;
  onSave: (newContact: SiteContact) => void;
}

export const AdminContactModal: React.FC<AdminContactModalProps> = ({
  isOpen,
  contact,
  onClose,
  onSave,
}) => {
  const [fb, setFb] = useState(contact.fb);
  const [line, setLine] = useState(contact.line);
  const [tiktok, setTiktok] = useState(contact.tiktok);
  const [ig, setIg] = useState(contact.ig);
  const [img, setImg] = useState(contact.img);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ fb, line, tiktok, ig, img });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[800] flex items-center justify-center p-3">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="bg-white border-[3px] border-[#FFE4EC] rounded-[28px] p-5 w-full max-w-[360px] relative z-10 shadow-2xl animate-pop text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 bg-[#FFF0F5] rounded-full flex items-center justify-center text-[#8B5A2B] hover:bg-[#FFE4EC] transition-colors shadow-sm cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>

        <h3 className="text-[#8B5A2B] font-bold text-sm mb-4 border-b border-dashed border-[#FFE4EC] pb-2 flex items-center gap-2">
          <i className="fa-solid fa-address-book"></i>
          แก้ไขช่องทางติดต่อ
        </h3>

        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">
              <i className="fa-brands fa-facebook text-[#1877F2] mr-1"></i> ลิงก์ Facebook
            </label>
            <input
              type="text"
              value={fb}
              onChange={(e) => setFb(e.target.value)}
              className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">
              <i className="fa-brands fa-line text-[#00B900] mr-1"></i> ลิงก์ LINE
            </label>
            <input
              type="text"
              value={line}
              onChange={(e) => setLine(e.target.value)}
              className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">
              <i className="fa-brands fa-tiktok text-black mr-1"></i> ลิงก์ TikTok
            </label>
            <input
              type="text"
              value={tiktok}
              onChange={(e) => setTiktok(e.target.value)}
              className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">
              <i className="fa-brands fa-instagram text-[#E1306C] mr-1"></i> ลิงก์ Instagram
            </label>
            <input
              type="text"
              value={ig}
              onChange={(e) => setIg(e.target.value)}
              className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">
              รูปภาพช่องทางติดต่อ / ภาพโปสเตอร์
            </label>
            <input
              type="text"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
            />
            {img && (
              <div className="mt-2 w-full h-24 rounded-xl overflow-hidden border border-[#FFE4EC]">
                <img src={img} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleSave}
              className="w-full bg-[#8B5A2B] hover:bg-[#6D441D] text-white font-bold py-2.5 rounded-xl text-xs transition-all active:scale-98 shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-floppy-disk text-xs"></i>
              <span>บันทึกช่องทางติดต่อ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
