import React, { useState, useEffect } from 'react';
import { AccountItem, CategoryItem, ItemType } from '../types.ts';
import { calculateAvailableTimeStr } from '../data/defaults.ts';

interface AdminMasterModalProps {
  isOpen: boolean;
  type: ItemType;
  item: AccountItem | null;
  categories: CategoryItem[];
  onClose: () => void;
  onSave: (type: ItemType, item: AccountItem) => void;
  onDelete?: (type: ItemType, id: string) => void;
}

export const AdminMasterModal: React.FC<AdminMasterModalProps> = ({
  isOpen,
  type,
  item,
  categories,
  onClose,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = useState('');
  const [img, setImg] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('ว่าง');
  const [rateText, setRateText] = useState('');
  const [note, setNote] = useState('');
  const [description, setDescription] = useState('');
  const [rentStartTime, setRentStartTime] = useState('');
  const [rentDuration, setRentDuration] = useState<number | string>(1);

  useEffect(() => {
    if (item) {
      setTitle(item.title || '');
      setImg(item.img || '');
      setCategory(item.category || (categories[0]?.id || ''));
      setStatus(item.status || (type === 'sell' ? 'Sell' : 'ว่าง'));
      setRateText(item.rates?.map((r) => r.label).join('\n') || '');
      setNote(item.note || '');
      setDescription(item.description || '');
      setRentStartTime(item.rentStartTime || '');
      setRentDuration(item.rentDuration || 1);
    } else {
      setTitle('');
      setImg('');
      setCategory(categories[0]?.id || '');
      setStatus(type === 'sell' ? 'Sell' : 'ว่าง');
      setRateText('1 ชม. ฿150\n2 ชม. ฿280\nเหมาวัน ฿600');
      setNote('');
      setDescription('');
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      setRentStartTime(now.toISOString().slice(0, 16));
      setRentDuration(1);
    }
  }, [item, type, categories]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim()) {
      alert('กรุณากรอกชื่อสินค้า');
      return;
    }

    const rates = rateText
      .split('\n')
      .map((r) => r.trim())
      .filter((r) => r.length > 0)
      .map((label) => ({ label }));

    const newItem: AccountItem = {
      id: item ? item.id : 'item_' + Date.now(),
      title,
      img: img || 'https://placehold.co/400x400/FFF0F5/FF9EBB?text=No+Image',
      category: category || categories[0]?.id || 'default',
      status,
      rates: rates.length > 0 ? rates : [{ label: 'ทักแชทเพื่อดูราคา' }],
      note,
      description: type === 'sell' ? description : undefined,
      rentStartTime: status === 'ไม่ว่าง' ? rentStartTime : null,
      rentDuration: status === 'ไม่ว่าง' ? rentDuration : null,
      statusClass:
        status === 'ว่าง' || status === 'Sell'
          ? 'bg-[#FDFCF4] text-[#8A6F65]'
          : 'bg-[#8B5A2B] text-white',
    };

    onSave(type, newItem);
    onClose();
  };

  const previewTime =
    status === 'ไม่ว่าง' && rentStartTime && rentDuration
      ? calculateAvailableTimeStr(rentStartTime, rentDuration)
      : '';

  return (
    <div className="fixed inset-0 z-[800] flex items-center justify-center p-3">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="bg-white border-[3px] border-[#FFE4EC] rounded-[28px] p-5 w-full max-w-[380px] relative z-10 shadow-2xl animate-pop max-h-[90vh] overflow-y-auto custom-scrollbar text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 bg-[#FFF0F5] rounded-full flex items-center justify-center text-[#8B5A2B] hover:bg-[#FFE4EC] transition-colors shadow-sm cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>

        <h3 className="text-[#8B5A2B] font-bold text-sm mb-4 border-b border-dashed border-[#FFE4EC] pb-2 flex items-center gap-2">
          <i className="fa-solid fa-pen-to-square"></i>
          {item ? 'แก้ไขข้อมูลสินค้า' : 'เพิ่มสินค้าใหม่'}
        </h3>

        <div className="space-y-3">
          {/* Title */}
          <div>
            <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">
              ชื่อสินค้า / หัวข้อ
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="เช่น 01 ⦅ ปักธงเก่า - ปักธงคู่ ⦆"
              className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
            />
          </div>

          {/* Image URL & preview */}
          <div>
            <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">
              ลิงก์รูปภาพ (Image URL)
            </label>
            <input
              type="text"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              placeholder="https://i.ibb.co/..."
              className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
            />
            {img && (
              <div className="mt-2 w-16 h-16 rounded-xl overflow-hidden border border-[#FFE4EC] shadow-xs">
                <img
                  src={img}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://placehold.co/100x100/FFF0F5/FF9EBB?text=Error';
                  }}
                />
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">หมวดหมู่</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name.replace(/<[^>]*>?/gm, '').trim()}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">สถานะ</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
            >
              {type === 'sell' ? (
                <>
                  <option value="Sell">พร้อมส่ง (Sell)</option>
                  <option value="Out">สินค้าหมด (Out)</option>
                </>
              ) : (
                <>
                  <option value="ว่าง">ว่าง (Available)</option>
                  <option value="ไม่ว่าง">ไม่ว่าง (ติดเช่า)</option>
                </>
              )}
            </select>
          </div>

          {/* If rented, show rent start time + duration */}
          {status === 'ไม่ว่าง' && (type === 'rentFF' || type === 'rentROV') && (
            <div className="bg-[#FFF8E7] p-3 rounded-2xl border border-[#FFE4EC] space-y-2">
              <span className="text-[10px] font-extrabold text-[#8B5A2B] block">
                <i className="fa-regular fa-clock mr-1"></i> ตั้งเวลานับถอยหลัง / คืนรหัส
              </span>
              <div>
                <label className="text-[10px] text-[#8A6F65] block mb-0.5">เวลาเริ่มเช่า:</label>
                <input
                  type="datetime-local"
                  value={rentStartTime}
                  onChange={(e) => setRentStartTime(e.target.value)}
                  className="w-full bg-white border border-[#FFE4EC] rounded-lg px-2 py-1 text-xs text-[#6B4C42]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#8A6F65] block mb-0.5">จำนวนชั่วโมง:</label>
                <input
                  type="number"
                  step="0.5"
                  value={rentDuration}
                  onChange={(e) => setRentDuration(e.target.value)}
                  className="w-full bg-white border border-[#FFE4EC] rounded-lg px-2 py-1 text-xs text-[#6B4C42]"
                />
              </div>
              {previewTime && (
                <div className="bg-white text-[#8B5A2B] text-[10px] font-bold px-2 py-1 rounded-lg border border-[#FFE4EC]">
                  แสดงผล: {previewTime}
                </div>
              )}
            </div>
          )}

          {/* Rates */}
          <div>
            <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">
              เรทราคา (1 บรรทัด ต่อ 1 เรท)
            </label>
            <textarea
              rows={3}
              value={rateText}
              onChange={(e) => setRateText(e.target.value)}
              placeholder="1 ชม. ฿180&#10;2 ชม. ฿350&#10;เหมาวัน ฿800"
              className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
            />
          </div>

          {/* Description for sell items */}
          {type === 'sell' && (
            <div>
              <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">
                รายละเอียดสินค้า (จุดเด่น)
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="• ดึงเข้ากลุ่มทันทีหลังโอน&#10;• อัปเดตตลอดชีพ"
                className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
              />
            </div>
          )}

          {/* Note */}
          <div>
            <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">
              หมายเหตุเพิ่มเติม (Note)
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="เช่น ยันนอนเล่นได้ 8 ชม"
              className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex gap-2">
            {item && onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?')) {
                    onDelete(type, item.id);
                    onClose();
                  }
                }}
                className="bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
              >
                ลบ
              </button>
            )}
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 bg-[#8B5A2B] hover:bg-[#6D441D] text-white font-bold py-2.5 rounded-xl text-xs transition-all active:scale-98 shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-floppy-disk text-xs"></i>
              <span>บันทึกข้อมูล</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
