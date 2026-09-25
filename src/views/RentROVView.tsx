import React, { useState } from 'react';
import { AccountItem, CategoryItem } from '../types.ts';
import { calculateAvailableTimeStr } from '../data/defaults.ts';

interface RentROVViewProps {
  accounts: AccountItem[];
  categories: CategoryItem[];
  isAdmin: boolean;
  onSelectAccount: (account: AccountItem) => void;
  onEditAccount?: (account: AccountItem) => void;
  onAddNewAccount?: () => void;
  onAddCategory?: () => void;
  onEditCategory?: (category: CategoryItem) => void;
}

export const RentROVView: React.FC<RentROVViewProps> = ({
  accounts,
  categories,
  isAdmin,
  onSelectAccount,
  onEditAccount,
  onAddNewAccount,
  onAddCategory,
  onEditCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]?.id || 'hot'
  );
  const [statusFilter, setStatusFilter] = useState<'all' | 'ว่าง' | 'ไม่ว่าง'>('all');

  const categoryAccounts = accounts.filter((acc) => acc.category === selectedCategory);
  const availableCount = categoryAccounts.filter((acc) => acc.status === 'ว่าง').length;
  const unavailableCount = categoryAccounts.filter((acc) => acc.status !== 'ว่าง').length;

  const displayAccounts = categoryAccounts.filter((acc) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'ว่าง') return acc.status === 'ว่าง';
    return acc.status !== 'ว่าง';
  });

  return (
    <div className="animate-fade-in pb-24 text-left">
      {/* Category Pills Bar */}
      <div className="px-4 pt-2 pb-1 overflow-x-auto hide-scrollbar flex items-center gap-2">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-[#75B8FF] text-white shadow-sm ring-2 ring-[#BAE6FD]'
                  : 'bg-white text-[#8A6F65] border border-[#E0F0FE] hover:bg-[#F4FAFF]'
              }`}
            >
              <span dangerouslySetInnerHTML={{ __html: cat.name }} />
              {isAdmin && onEditCategory && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditCategory(cat);
                  }}
                  className="ml-1 opacity-70 hover:opacity-100"
                  title="จัดการหมวดหมู่"
                >
                  <i className="fa-solid fa-gear text-[10px]"></i>
                </span>
              )}
            </button>
          );
        })}

        {isAdmin && onAddCategory && (
          <button
            onClick={onAddCategory}
            className="shrink-0 bg-[#8B5A2B]/10 text-[#8B5A2B] border-2 border-dashed border-[#8B5A2B]/40 px-3 py-1.5 rounded-full text-xs font-bold transition-transform hover:scale-105 flex items-center gap-1 cursor-pointer whitespace-nowrap"
          >
            <i className="fa-solid fa-plus text-[10px]"></i> เพิ่มหมวด
          </button>
        )}
      </div>

      {/* Status Filter Bar */}
      <div className="px-5 my-3 flex items-center justify-between">
        <div className="flex gap-1.5">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-[#8A6F65] text-white'
                : 'bg-white text-[#8A6F65] border border-[#FFE4EC]'
            }`}
          >
            ทั้งหมด ({categoryAccounts.length})
          </button>
          <button
            onClick={() => setStatusFilter('ว่าง')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
              statusFilter === 'ว่าง'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-emerald-700 border border-emerald-200'
            }`}
          >
            ว่าง ({availableCount})
          </button>
          <button
            onClick={() => setStatusFilter('ไม่ว่าง')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
              statusFilter === 'ไม่ว่าง'
                ? 'bg-rose-600 text-white'
                : 'bg-white text-rose-700 border border-rose-200'
            }`}
          >
            ไม่ว่าง ({unavailableCount})
          </button>
        </div>

        {isAdmin && onAddNewAccount && (
          <button
            onClick={onAddNewAccount}
            className="bg-[#8B5A2B] text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm flex items-center gap-1 hover:scale-105 transition-transform cursor-pointer"
          >
            <i className="fa-solid fa-plus text-[10px]"></i> เพิ่มบริการ
          </button>
        )}
      </div>

      {/* Account Grid */}
      <div className="px-4">
        {displayAccounts.length === 0 ? (
          <div className="text-center text-[#8A6F65] text-xs py-12 bg-white rounded-[24px] border border-dashed border-[#E0F0FE] my-4 shadow-xs">
            <i className="fa-solid fa-sparkles text-2xl text-[#75B8FF] mb-2 block"></i>
            ยังไม่มีรายการในหมวดหมู่นี้ หรือสถานะนี้
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {displayAccounts.map((acc) => {
              const isAvailable = acc.status === 'ว่าง';
              const timeNotice =
                !isAvailable && acc.rentStartTime && acc.rentDuration
                  ? calculateAvailableTimeStr(acc.rentStartTime, acc.rentDuration)
                  : '';

              return (
                <div
                  key={acc.id}
                  onClick={() => onSelectAccount(acc)}
                  className="bg-white border-[3px] border-[#F0F7FF] rounded-[24px] shadow-[0_6px_15px_rgba(117,184,255,0.15)] ring-2 ring-[#E0F0FE] flex flex-col group cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-hidden relative"
                >
                  <div className="relative w-full aspect-square bg-[#F4FAFF] overflow-hidden rounded-t-[20px]">
                    <img
                      src={acc.img}
                      alt={acc.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://placehold.co/400x400/F4FAFF/75B8FF?text=Service';
                      }}
                    />

                    <div className="absolute top-2 left-2 z-10 flex flex-col items-start gap-1">
                      <div
                        className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-white/60 backdrop-blur-md ${
                          isAvailable
                            ? 'bg-[#FDFCF4] text-[#8A6F65]'
                            : 'bg-[#8B5A2B] text-white'
                        }`}
                      >
                        <i
                          className={`fa-solid ${
                            isAvailable ? 'fa-check text-[#8A6F65]' : 'fa-xmark text-white'
                          } text-[8px]`}
                        ></i>
                        {acc.status}
                      </div>

                      {timeNotice && (
                        <div className="bg-white/95 text-[#8B5A2B] text-[8px] font-bold px-2 py-0.5 rounded-full shadow border border-[#FFE4EC] max-w-[130px] truncate">
                          <i className="fa-regular fa-clock mr-0.5"></i> {timeNotice}
                        </div>
                      )}
                    </div>

                    {isAdmin && onEditAccount && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditAccount(acc);
                        }}
                        className="absolute top-2 right-2 w-7 h-7 bg-[#8B5A2B] text-white rounded-full flex items-center justify-center z-20 shadow-md hover:scale-110 transition-transform ring-1 ring-white"
                        title="แก้ไขบริการนี้"
                      >
                        <i className="fa-solid fa-pen text-[10px]"></i>
                      </button>
                    )}
                  </div>

                  <div className="p-2.5 flex flex-col flex-grow justify-between bg-white rounded-b-[20px]">
                    <div>
                      <h4 className="font-bold text-[#6B4C42] text-[12px] mb-1 tracking-wide leading-tight truncate">
                        {acc.title}
                      </h4>
                      <p className="text-[10px] text-[#4C88E0] font-bold truncate">
                        {acc.rates?.map((r) => r.label).join(' | ') || 'ทักแชทเพื่อเช่า'}
                      </p>
                    </div>

                    <div className="mt-2 w-full bg-[#F4FAFF] hover:bg-[#E0F0FE] text-[#4C88E0] py-1.5 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 transition-colors">
                      <span>สั่งซื้อ / เช่ารหัส</span>
                      <i className="fa-solid fa-chevron-right text-[8px]"></i>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
