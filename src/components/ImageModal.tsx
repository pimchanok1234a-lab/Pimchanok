import React from 'react';

interface ImageModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div className="fixed inset-0 z-[900] flex items-center justify-center p-3">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      <div className="relative z-10 max-w-[94vw] max-h-[92vh] flex flex-col items-center animate-pop">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 w-9 h-9 rounded-full bg-white/20 text-white hover:bg-white/40 flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        <img
          src={imageUrl}
          alt="Preview"
          className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border-2 border-white/20"
        />

        <div className="mt-3 bg-black/50 text-white text-xs px-4 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-2">
          <span>แตะที่ใดก็ได้เพื่อปิดรูปภาพ</span>
        </div>
      </div>
    </div>
  );
};
