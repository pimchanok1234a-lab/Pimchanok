import React, { useState, useEffect } from 'react';
import { DialogConfig } from '../types.ts';

interface CustomDialogProps {
  config: DialogConfig | null;
  onClose: () => void;
}

export const CustomDialog: React.FC<CustomDialogProps> = ({ config, onClose }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (config?.promptValue) {
      setInputValue(config.promptValue);
    } else {
      setInputValue('');
    }
  }, [config]);

  if (!config) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dialog Card */}
      <div className="bg-[#FFFDF4] border-[3px] border-[#FFE4EC] rounded-[28px] p-5 w-full max-w-[340px] relative z-10 shadow-2xl animate-pop text-center">
        <h3 className="text-[#6B4C42] font-bold text-base mb-2">{config.title}</h3>

        <div
          className="text-xs text-[#8A6F65] mb-4 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: config.message }}
        />

        {config.isPrompt && (
          <div className="mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={config.promptPlaceholder || 'กรอกข้อมูล...'}
              className="w-full bg-white border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB] transition-colors"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const primaryBtn = config.buttons[config.buttons.length - 1];
                  if (primaryBtn?.onClick) primaryBtn.onClick(inputValue);
                  onClose();
                }
              }}
            />
          </div>
        )}

        <div className="flex gap-2 justify-center">
          {config.buttons.map((btn, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                if (btn.onClick) {
                  btn.onClick(inputValue);
                }
                onClose();
              }}
              className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-transform active:scale-95 cursor-pointer ${
                btn.className || 'bg-gray-100 text-[#6B4C42]'
              }`}
            >
              {btn.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
