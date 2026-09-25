import React, { useState } from 'react';
import { AccountItem, CategoryItem } from '../types.ts';

interface SellViewProps {
  accounts: AccountItem[];
  categories: CategoryItem[];
  isAdmin: boolean;
  onSelectItem: (item: AccountItem) => void;
  onEditItem?: (item: AccountItem) => void;
  onAddNewItem?: () => void;
  onAddCategory?: () => void;
  onEditCategory?: (category: CategoryItem) => void;
}

export const SellView: React.FC<SellViewProps> = ({
  accounts,
  categories,
  isAdmin,
  onSelectItem,
  onEditItem,
  onAddNewItem,
  onAddCategory,
  onEditCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]?.id || 'group'
  );
  const [statusFilter, setStatusFilter] = useState<'all' | 'Sell' | 'Out'>('all');

  const categoryItems = accounts.filter((item) => item.category === selectedCategory);
  const inStockCount = categoryItems.filter((i) => i.status === 'Sell').length;
  const outStockCount = categoryItems.filter((i) => i.status !== 'Sell').length;

  const displayItems = categoryItems.filter((item) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'Sell') return item.status === 'Sell';
    return item.status !== 'Sell';
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
                  ? 'bg-[#F6D04D] text-[#6B4C42] shadow-sm ring-2 ring-[#FEF08A]'
                  : 'bg-white text-[#8A6F65] border border-[#FFF3C4] hover:bg-[#FFFDE7]'
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

      {/* Filter Bar */}
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
            ทั้งหมด ({categoryItems.length})
          </button>
          <button
            onClick={() => setStatusFilter('Sell')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
              statusFilter === 'Sell'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-emerald-700 border border-emerald-200'
            }`}
          >
            พร้อมส่ง ({inStockCount})
          </button>
          <button
            onClick={() => setStatusFilter('Out')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
              statusFilter === 'Out'
                ? 'bg-rose-600 text-white'
                : 'bg-white text-rose-700 border border-rose-200'
            }`}
          >
            หมด ({outStockCount})
          </button>
        </div>

        {isAdmin && onAddNewItem && (
          <button
            onClick={onAddNewItem}
            className="bg-[#8B5A2B] text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm flex items-center gap-1 hover:scale-105 transition-transform cursor-pointer"
          >
            <i className="fa-solid fa-plus text-[10px]"></i> เพิ่มแอคร้าน
          </button>
        )}
      </div>

      {/* Item Cards Grid */}
      <div className="px-4">
        {displayItems.length === 0 ? (
          <div className="text-center text-[#8A6F65] text-xs py-12 bg-white rounded-[24px] border border-dashed border-[#FFF3C4] my-4 shadow-xs">
            <i className="fa-solid fa-store text-2xl text-[#F6D04D] mb-2 block"></i>
            ยังไม่มีแอคร้านในหมวดหมู่นี้
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {displayItems.map((item) => {
              const inStock = item.status === 'Sell';
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="bg-white border-[3px] border-[#FFFDE7] rounded-[24px] shadow-[0_6px_15px_rgba(246,208,77,0.15)] ring-2 ring-[#FFF3C4] flex flex-col group cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-hidden relative"
                >
                  <div className="relative w-full aspect-square bg-[#FFFDE7] overflow-hidden rounded-t-[20px]">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://placehold.co/400x400/FFFDE7/F6D04D?text=Account';
                      }}
                    />

                    <div className="absolute top-2 left-2 z-10">
                      <div
                        className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-white/60 backdrop-blur-md ${
                          inStock ? 'bg-[#FDFCF4] text-[#8A6F65]' : 'bg-[#FF9EBB] text-white'
                        }`}
                      >
                        <i
                          className={`fa-solid ${
                            inStock ? 'fa-check text-[#8A6F65]' : 'fa-hourglass-half text-white'
                          } text-[8px]`}
                        ></i>
                        {inStock ? 'พร้อมส่ง' : 'สินค้าหมด'}
                      </div>
                    </div>

                    {isAdmin && onEditItem && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditItem(item);
                        }}
                        className="absolute top-2 right-2 w-7 h-7 bg-[#8B5A2B] text-white rounded-full flex items-center justify-center z-20 shadow-md hover:scale-110 transition-transform ring-1 ring-white"
                        title="แก้ไขแอคร้านนี้"
                      >
                        <i className="fa-solid fa-pen text-[10px]"></i>
                      </button>
                    )}
                  </div>

                  <div className="p-2.5 flex flex-col flex-grow justify-between bg-white rounded-b-[20px]">
                    <div>
                      <h4 className="font-bold text-[#6B4C42] text-[12px] mb-1 tracking-wide leading-tight truncate">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-[#B08900] font-bold truncate">
                        {item.rates?.map((r) => r.label).join(' | ') || 'ทักแชทเพื่อสั่งซื้อ'}
                      </p>
                    </div>

                    <div className="mt-2 w-full bg-[#FFFDE7] hover:bg-[#FFF3C4] text-[#B08900] py-1.5 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 transition-colors">
                      <span>สั่งซื้อแอคร้าน</span>
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
