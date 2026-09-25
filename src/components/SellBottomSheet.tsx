import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { AccountItem } from '../types.ts';

interface SellBottomSheetProps {
  item: AccountItem | null;
  onClose: () => void;
  onGoToContact: () => void;
  onImageClick: (url: string) => void;
}

export const SellBottomSheet: React.FC<SellBottomSheetProps> = ({
  item,
  onClose,
  onGoToContact,
  onImageClick,
}) => {
  const [selectedRate, setSelectedRate] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (item && item.rates && item.rates.length > 0) {
      setSelectedRate(item.rates[0].label);
    } else {
      setSelectedRate(null);
    }
    setCopied(false);
  }, [item]);

  if (!item) return null;

  const copyText = selectedRate
    ? `สนใจสินค้า: ${item.title}\nเรทที่ต้องการ: ${selectedRate}`
    : `สนใจสินค้า: ${item.title}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#FF9EBB', '#FFD1E0', '#FFFDF4', '#F6D04D']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const isSellable = item.status === 'Sell';

  return (
    <div className="fixed inset-0 z-[600] flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sheet Content */}
      <div className="bg-[#FFF0F5] w-full max-w-[430px] mx-auto rounded-t-[32px] relative z-10 animate-slow-fade-up flex flex-col max-h-[90vh] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] pt-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#D9779B] hover:bg-[#FFD1E0] hover:text-white transition-colors shadow-sm z-20 cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>

        <div className="overflow-y-auto hide-scrollbar px-5 pb-8 flex-1">
          <div className="bg-white rounded-[28px] p-4 shadow-sm border border-[#FFE4EC] flex flex-col">
            <div
              className="relative w-full aspect-square rounded-[24px] overflow-hidden bg-white border-[4px] border-[#FFFDF4] shadow-[0_2px_15px_rgba(255,158,187,0.15)] mb-4 group cursor-pointer"
              onClick={() => onImageClick(item.img)}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://placehold.co/400x400/FFF0F5/FF9EBB?text=Service';
                }}
              />
              <div
                className={`absolute top-3 left-3 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-white/50 backdrop-blur-md z-10 ${
                  isSellable
                    ? 'bg-[#FDFCF4] text-[#8A6F65]'
                    : 'bg-[#FF9EBB] text-white'
                }`}
              >
                <i
                  className={`fa-solid ${
                    isSellable ? 'fa-check text-[#8A6F65]' : 'fa-hourglass-half text-white'
                  } text-[9px]`}
                ></i>{' '}
                {isSellable ? 'พร้อมจำหน่าย' : 'สินค้าหมด'}
              </div>

              <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
                <div className="bg-black/60 text-white px-2.5 py-1 rounded-lg text-[9px] font-bold backdrop-blur-sm flex items-center gap-1 shadow-sm">
                  <i className="fa-solid fa-expand"></i> แตะเพื่อขยาย
                </div>
              </div>
            </div>

            <div className="w-full text-left px-1">
              <h3 className="font-extrabold text-[#6B4C42] text-[16px] mb-2 tracking-wide leading-tight">
                {item.title}
              </h3>

              {item.description && (
                <div
                  className="text-[12px] text-[#8A6F65] leading-relaxed mb-3 whitespace-pre-wrap bg-[#FFFDF4] p-3 rounded-xl border border-[#FFE4EC]"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              )}

              {/* Price Rates */}
              <div className="flex flex-wrap gap-2 mb-3">
                {item.rates.map((rate, idx) => {
                  const isChosen = selectedRate === rate.label;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedRate(rate.label)}
                      className={`text-[11px] font-bold px-3.5 py-1.5 rounded-full transition-all border cursor-pointer active:scale-95 ${
                        isChosen
                          ? 'bg-[#FF9EBB] text-white border-[#FF9EBB] shadow-sm ring-2 ring-[#FFD1E0]'
                          : 'bg-[#FFF0F5] text-[#D9779B] border-[#FFE4EC] hover:bg-[#FFE4EC]'
                      }`}
                    >
                      <i className="fa-solid fa-tag text-[9px] mr-1 opacity-70"></i>
                      {rate.label}
                    </button>
                  );
                })}
              </div>

              {item.note && (
                <div className="w-full bg-[#FFFDF4] border-[2px] border-[#FFE4EC] rounded-[16px] py-2.5 px-3.5 mb-3 shadow-sm flex items-start gap-2">
                  <i className="fa-solid fa-circle-info text-[#D9779B] mt-0.5 text-[14px] shrink-0"></i>
                  <p
                    className="text-[11px] text-[#6B4C42] font-medium leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: item.note }}
                  />
                </div>
              )}

              <div className="border-t-[1.5px] border-dashed border-[#FFD1E0] pt-3 mb-3">
                <p className="text-[10px] text-[#8A6F65] font-medium text-center leading-relaxed">
                  กดเลือกราคาแล้วคัดลอกข้อความเพื่อส่งให้แอดมินทางแชท
                </p>
              </div>

              {/* Copy Box */}
              <div className="mb-3 copy-box-modern animate-pop">
                <p className="copy-box-text-modern">{copyText}</p>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="copy-box-btn-modern"
                >
                  <i
                    className={`fa-solid ${
                      copied ? 'fa-check text-green-500' : 'fa-regular fa-copy'
                    }`}
                  ></i>
                  {copied ? 'คัดลอกเรียบร้อยแล้ว!' : 'คัดลอกข้อความเพื่อทักแชท'}
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  handleCopy();
                  onGoToContact();
                }}
                className="w-full bg-[#FFFDE7] border-[1.5px] border-[#FCEE8E] text-[#FF9EBB] font-extrabold py-3 rounded-[18px] shadow-sm transition-all hover:scale-[1.01] active:scale-98 text-[13.5px] flex items-center justify-center gap-2 cursor-pointer"
              >
                <div className="bg-[#00B900] text-white rounded-[6px] w-[24px] h-[24px] flex items-center justify-center shadow-xs">
                  <i className="fa-brands fa-line text-[16px]"></i>
                </div>
                <span>ติดต่อแอดมินเพื่อซื้อสินค้า</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
