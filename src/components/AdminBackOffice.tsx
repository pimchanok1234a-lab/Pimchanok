import React, { useState } from 'react';
import {
  AccountItem,
  CategoryItem,
  HomeGalleries,
  ItemType,
  PlaylistItem,
  SiteCategories,
  SiteContact,
  SiteSettings,
  TabNames,
} from '../types.ts';

interface AdminBackOfficeProps {
  settings: SiteSettings;
  contact: SiteContact;
  galleries: HomeGalleries;
  categories: SiteCategories;
  rentFFAccounts: AccountItem[];
  rentROVAccounts: AccountItem[];
  sellAccounts: AccountItem[];
  onSaveSettings: (settings: SiteSettings) => void;
  onSaveContact: (contact: SiteContact) => void;
  onSaveGalleries: (galleries: HomeGalleries) => void;
  onSaveCategories: (categories: SiteCategories) => void;
  onSaveItem: (type: ItemType, item: AccountItem) => void;
  onDeleteItem: (type: ItemType, id: string) => void;
  onClose: () => void;
}

export const AdminBackOffice: React.FC<AdminBackOfficeProps> = ({
  settings,
  contact,
  galleries,
  categories,
  rentFFAccounts,
  rentROVAccounts,
  sellAccounts,
  onSaveSettings,
  onSaveContact,
  onSaveGalleries,
  onSaveCategories,
  onSaveItem,
  onDeleteItem,
  onClose,
}) => {
  // Navigation inside Back-Office
  type AdminTab = 'info' | 'tabs' | 'images' | 'contact' | 'music' | 'products';
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('info');

  // Form states
  const [shopName, setShopName] = useState(settings.shopName);
  const [shopStatus, setShopStatus] = useState(settings.shopStatus);
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl);
  const [heroImg, setHeroImg] = useState(
    settings.heroImg || galleries.steps[0] || 'https://i.ibb.co/whdMjTzw/att-Uhu-Ra2pqh-Ox-Od9-YKBg88-HBMCWjg-STWRxfn-PYzr-Y4-Zo-A.jpg'
  );
  const [welcomeModalImg, setWelcomeModalImg] = useState(settings.welcomeModalImg);
  const [welcomeTitle, setWelcomeTitle] = useState(settings.welcomeTitle);
  const [welcomeSubtitle, setWelcomeSubtitle] = useState(settings.welcomeSubtitle);

  // Tab names state
  const [tabNames, setTabNames] = useState<TabNames>({
    tab0: settings.tabNames?.tab0 || 'หน้าแรก',
    tab1: settings.tabNames?.tab1 || 'เช่ารหัส(FF)',
    tab2: settings.tabNames?.tab2 || 'บริการอื่นๆ',
    tab3: settings.tabNames?.tab3 || 'แอคร้าน',
    tab4: settings.tabNames?.tab4 || 'ติดต่อเรา',
  });

  // Contact state
  const [contactFb, setContactFb] = useState(contact.fb);
  const [contactLine, setContactLine] = useState(contact.line);
  const [contactTiktok, setContactTiktok] = useState(contact.tiktok);
  const [contactIg, setContactIg] = useState(contact.ig);
  const [contactImg, setContactImg] = useState(contact.img);

  // Music state
  const [musicUrl, setMusicUrl] = useState(settings.musicUrl);
  const [playlist, setPlaylist] = useState<PlaylistItem[]>(settings.playlist || []);
  const [newSongName, setNewSongName] = useState('');
  const [newSongUrl, setNewSongUrl] = useState('');
  const [previewAudioPlaying, setPreviewAudioPlaying] = useState(false);
  const [previewAudioUrl, setPreviewAudioUrl] = useState<string | null>(null);

  // Galleries state
  const [stepImages, setStepImages] = useState<string[]>([...galleries.steps]);
  const [ruleImages, setRuleImages] = useState<string[]>([...galleries.rules]);
  const [newStepUrl, setNewStepUrl] = useState('');
  const [newRuleUrl, setNewRuleUrl] = useState('');

  // Products Tab internal selection
  const [productSection, setProductSection] = useState<ItemType>('rentFF');
  const [editingItem, setEditingItem] = useState<{
    type: ItemType;
    item: AccountItem;
  } | null>(null);
  const [isCreatingItem, setIsCreatingItem] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Save Shop Info & Branding
  const handleSaveInfo = () => {
    const updated: SiteSettings = {
      ...settings,
      shopName,
      shopStatus,
      logoUrl,
      heroImg,
      welcomeModalImg,
      welcomeTitle,
      welcomeSubtitle,
      tabNames,
      musicUrl,
      playlist,
    };
    onSaveSettings(updated);
    showToast('✓ บันทึกข้อมูลร้านและดีไซน์เรียบร้อย');
  };

  // Save Tab Names
  const handleSaveTabs = () => {
    const updated: SiteSettings = {
      ...settings,
      tabNames,
    };
    onSaveSettings(updated);
    showToast('✓ บันทึกชื่อเมนู/แท็บร้านค้าเรียบร้อย');
  };

  // Save Contact
  const handleSaveContact = () => {
    const updated: SiteContact = {
      fb: contactFb,
      line: contactLine,
      tiktok: contactTiktok,
      ig: contactIg,
      img: contactImg,
    };
    onSaveContact(updated);
    showToast('✓ บันทึกช่องทางติดต่อเรียบร้อย');
  };

  // Save Galleries
  const handleSaveGalleries = (newSteps: string[], newRules: string[]) => {
    const updated: HomeGalleries = {
      steps: newSteps,
      rules: newRules,
    };
    setStepImages(newSteps);
    setRuleImages(newRules);
    onSaveGalleries(updated);
    showToast('✓ บันทึกรูปภาพเรียบร้อย');
  };

  // Add Step Image
  const handleAddStepImage = () => {
    if (!newStepUrl.trim()) return;
    const updated = [...stepImages, newStepUrl.trim()];
    handleSaveGalleries(updated, ruleImages);
    setNewStepUrl('');
  };

  // Delete Step Image
  const handleDeleteStepImage = (idx: number) => {
    const updated = stepImages.filter((_, i) => i !== idx);
    handleSaveGalleries(updated, ruleImages);
  };

  // Add Rule Image
  const handleAddRuleImage = () => {
    if (!newRuleUrl.trim()) return;
    const updated = [...ruleImages, newRuleUrl.trim()];
    handleSaveGalleries(stepImages, updated);
    setNewRuleUrl('');
  };

  // Delete Rule Image
  const handleDeleteRuleImage = (idx: number) => {
    const updated = ruleImages.filter((_, i) => i !== idx);
    handleSaveGalleries(stepImages, updated);
  };

  // Add song
  const handleAddSong = () => {
    if (!newSongName.trim() || !newSongUrl.trim()) {
      alert('กรุณากรอกทั้งชื่อเพลงและลิงก์เพลง');
      return;
    }
    const updatedList = [...playlist, { name: newSongName.trim(), url: newSongUrl.trim() }];
    setPlaylist(updatedList);
    setMusicUrl(newSongUrl.trim());
    setNewSongName('');
    setNewSongUrl('');
    onSaveSettings({
      ...settings,
      musicUrl: newSongUrl.trim(),
      playlist: updatedList,
    });
    showToast('✓ เพิ่มเพลงและตั้งเป็นเพลงหลักเรียบร้อย');
  };

  // Delete song
  const handleDeleteSong = (url: string) => {
    const updatedList = playlist.filter((p) => p.url !== url);
    setPlaylist(updatedList);
    const newActiveUrl = musicUrl === url ? (updatedList[0]?.url || '') : musicUrl;
    setMusicUrl(newActiveUrl);
    onSaveSettings({
      ...settings,
      musicUrl: newActiveUrl,
      playlist: updatedList,
    });
    showToast('✓ ลบเพลงเรียบร้อย');
  };

  // Set active song
  const handleSetActiveSong = (url: string) => {
    setMusicUrl(url);
    onSaveSettings({
      ...settings,
      musicUrl: url,
      playlist,
    });
    showToast('✓ เปลี่ยนเพลงที่เปิดหน้าร้านแล้ว');
  };

  // Add category
  const handleAddCategory = (type: ItemType) => {
    if (!newCatName.trim()) return;
    const catId = 'cat_' + Date.now();
    const updated: SiteCategories = {
      ...categories,
      [type]: [...categories[type], { id: catId, name: newCatName.trim() }],
    };
    onSaveCategories(updated);
    setNewCatName('');
    showToast(`✓ เพิ่มหมวดหมู่ใหม่ใน ${type === 'rentFF' ? 'รหัส FF' : type === 'rentROV' ? 'บริการอื่นๆ' : 'แอคร้าน'}`);
  };

  // Delete category
  const handleDeleteCategory = (type: ItemType, catId: string) => {
    if (!confirm('ต้องการลบหมวดหมู่นี้หรือไม่?')) return;
    const updated: SiteCategories = {
      ...categories,
      [type]: categories[type].filter((c) => c.id !== catId),
    };
    onSaveCategories(updated);
    showToast('✓ ลบหมวดหมู่เรียบร้อย');
  };

  return (
    <div className="min-h-screen bg-[#FCF8F0] text-[#6B4C42] text-left pb-20">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-[1100] bg-[#8B5A2B] text-white px-5 py-2.5 rounded-full shadow-2xl text-xs font-bold flex items-center gap-2 animate-pop">
          <i className="fa-solid fa-circle-check text-green-400"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Audio preview element */}
      {previewAudioUrl && (
        <audio
          src={previewAudioUrl}
          autoPlay={previewAudioPlaying}
          onEnded={() => setPreviewAudioPlaying(false)}
        />
      )}

      {/* Top Back-Office Navbar */}
      <div className="bg-white border-b border-[#FFE4EC] shadow-sm sticky top-0 z-50 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#8B5A2B] text-white flex items-center justify-center text-lg shadow-sm">
              <i className="fa-solid fa-toolbox"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base text-[#8B5A2B] leading-none">
                  ระบบหลังบ้าน (Back-Office)
                </h1>
                <span className="bg-[#FFF0F5] text-[#D9779B] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#FFE4EC]">
                  ADMIN
                </span>
              </div>
              <p className="text-[11px] text-[#8A6F65] mt-1">
                จัดการชื่อร้าน เมนู ภาพ เพลง สินค้า และช่องทางติดต่อทั้งหมด
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="bg-[#FF9EBB] hover:bg-[#D9779B] text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <i className="fa-solid fa-store"></i>
              <span>ดูหน้าร้าน (Storefront)</span>
            </button>
          </div>
        </div>

        {/* Back-Office Subtabs */}
        <div className="max-w-4xl mx-auto flex gap-1.5 overflow-x-auto hide-scrollbar pt-3 mt-1 border-t border-[#FFF0F5]">
          <button
            onClick={() => setActiveAdminTab('info')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeAdminTab === 'info'
                ? 'bg-[#8B5A2B] text-white shadow-sm'
                : 'bg-[#FFFDF4] text-[#8A6F65] hover:bg-[#FFE4EC]'
            }`}
          >
            <i className="fa-solid fa-sliders"></i>
            <span>ข้อมูลร้าน & โปรไฟล์</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('tabs')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeAdminTab === 'tabs'
                ? 'bg-[#8B5A2B] text-white shadow-sm'
                : 'bg-[#FFFDF4] text-[#8A6F65] hover:bg-[#FFE4EC]'
            }`}
          >
            <i className="fa-solid fa-table-columns"></i>
            <span>เปลี่ยนชื่อเมนู/แท็บ</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('images')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeAdminTab === 'images'
                ? 'bg-[#8B5A2B] text-white shadow-sm'
                : 'bg-[#FFFDF4] text-[#8A6F65] hover:bg-[#FFE4EC]'
            }`}
          >
            <i className="fa-solid fa-images"></i>
            <span>จัดการภาพในร้านทั้งหมด</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('contact')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeAdminTab === 'contact'
                ? 'bg-[#8B5A2B] text-white shadow-sm'
                : 'bg-[#FFFDF4] text-[#8A6F65] hover:bg-[#FFE4EC]'
            }`}
          >
            <i className="fa-solid fa-address-book"></i>
            <span>ช่องทางติดต่อ</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('music')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeAdminTab === 'music'
                ? 'bg-[#8B5A2B] text-white shadow-sm'
                : 'bg-[#FFFDF4] text-[#8A6F65] hover:bg-[#FFE4EC]'
            }`}
          >
            <i className="fa-solid fa-music"></i>
            <span>เพลงพื้นหลัง (BGM)</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('products')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeAdminTab === 'products'
                ? 'bg-[#8B5A2B] text-white shadow-sm'
                : 'bg-[#FFFDF4] text-[#8A6F65] hover:bg-[#FFE4EC]'
            }`}
          >
            <i className="fa-solid fa-boxes-stacked"></i>
            <span>จัดการสินค้า & รหัส</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        {/* TAB 1: STORE INFO & BRANDING */}
        {activeAdminTab === 'info' && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-[#FFE4EC] space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-dashed border-[#FFE4EC] pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-[#8B5A2B]">
                  ข้อมูลทั่วไปของร้าน & ภาพแบรนด์
                </h2>
                <p className="text-xs text-[#8A6F65]">
                  ตั้งค่าชื่อร้าน สถานะเปิด/ปิดร้าน รูปโปรไฟล์ และข้อความต้อนรับ
                </p>
              </div>
              <button
                onClick={handleSaveInfo}
                className="bg-[#8B5A2B] hover:bg-[#6D441D] text-white px-5 py-2 rounded-xl text-xs font-bold shadow transition-all cursor-pointer"
              >
                บันทึกการเปลี่ยนแปลง
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Shop Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#6B4C42] block">
                  ชื่อร้านค้า (Shop Name)
                </label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3.5 py-2.5 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
                  placeholder="เช่น ♡ ׅ ⌗ mednun ⋆.ഒ ࣪˖ ⭐️💗"
                />
                <p className="text-[11px] text-[#8A6F65]">
                  ตัวอย่างการแสดงผล: <span className="font-bold text-[#FF9EBB]">{shopName}</span>
                </p>
              </div>

              {/* Shop Status OPEN/CLOSED */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#6B4C42] block">
                  สถานะร้านค้า (Shop Status)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setShopStatus('OPEN')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      shopStatus === 'OPEN'
                        ? 'bg-emerald-500 text-white shadow-md ring-2 ring-emerald-200'
                        : 'bg-[#FFFDF4] text-[#8A6F65] border border-[#FFE4EC]'
                    }`}
                  >
                    <i className="fa-solid fa-circle-check"></i> เปิดให้บริการ (OPEN)
                  </button>
                  <button
                    type="button"
                    onClick={() => setShopStatus('CLOSED')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      shopStatus === 'CLOSED'
                        ? 'bg-rose-500 text-white shadow-md ring-2 ring-rose-200'
                        : 'bg-[#FFFDF4] text-[#8A6F65] border border-[#FFE4EC]'
                    }`}
                  >
                    <i className="fa-solid fa-lock"></i> ปิดร้านชั่วคราว (CLOSED)
                  </button>
                </div>
              </div>

              {/* Logo Profile URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#6B4C42] block">
                  รูปโปรไฟล์ร้าน (Profile Logo URL)
                </label>
                <div className="flex gap-3 items-center">
                  <img
                    src={logoUrl}
                    alt="Logo"
                    className="w-14 h-14 rounded-full border-2 border-white ring-2 ring-[#FFE4EC] object-cover shadow-sm shrink-0"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://placehold.co/100x100/FFF0F5/FF9EBB?text=Logo';
                    }}
                  />
                  <input
                    type="text"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Hero Image Showcase */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#6B4C42] block">
                  รูปภาพ Hero หน้าร้าน (Showcase Image URL)
                </label>
                <div className="flex gap-3 items-center">
                  <img
                    src={heroImg}
                    alt="Hero"
                    className="w-14 h-14 rounded-xl border border-[#FFE4EC] object-cover shadow-sm shrink-0"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://placehold.co/100x100/FFF0F5/FF9EBB?text=Hero';
                    }}
                  />
                  <input
                    type="text"
                    value={heroImg}
                    onChange={(e) => setHeroImg(e.target.value)}
                    className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Welcome Modal Image */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#6B4C42] block">
                  รูปภาพในป๊อปอัพต้อนรับ (Welcome Modal Image)
                </label>
                <div className="flex gap-3 items-center">
                  <img
                    src={welcomeModalImg}
                    alt="Welcome"
                    className="w-14 h-14 rounded-xl border border-[#FFE4EC] object-cover shadow-sm shrink-0"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://placehold.co/100x100/FFF0F5/FF9EBB?text=Modal';
                    }}
                  />
                  <input
                    type="text"
                    value={welcomeModalImg}
                    onChange={(e) => setWelcomeModalImg(e.target.value)}
                    className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Welcome Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#6B4C42] block">
                  ข้อความหัวข้อหน้าแรก (Welcome Title)
                </label>
                <input
                  type="text"
                  value={welcomeTitle}
                  onChange={(e) => setWelcomeTitle(e.target.value)}
                  className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2.5 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
                />
              </div>

              {/* Welcome Subtitle */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-[#6B4C42] block">
                  ข้อความคำโปรยหน้าแรก (Welcome Subtitle)
                </label>
                <textarea
                  rows={2}
                  value={welcomeSubtitle}
                  onChange={(e) => setWelcomeSubtitle(e.target.value)}
                  className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleSaveInfo}
                className="bg-[#8B5A2B] hover:bg-[#6D441D] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <i className="fa-solid fa-floppy-disk"></i>
                <span>บันทึกข้อมูลร้านค้า</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOMIZE TAB NAMES */}
        {activeAdminTab === 'tabs' && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-[#FFE4EC] space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-dashed border-[#FFE4EC] pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-[#8B5A2B]">
                  ปรับแต่งชื่อเมนู / ชื่อแท็บหน้าร้าน
                </h2>
                <p className="text-xs text-[#8A6F65]">
                  เปลี่ยนชื่อแท็บตามที่ต้องการ เช่น &ldquo;บริการอื่นๆ&rdquo; และ &ldquo;แอคร้าน&rdquo;
                </p>
              </div>
              <button
                onClick={handleSaveTabs}
                className="bg-[#8B5A2B] hover:bg-[#6D441D] text-white px-5 py-2 rounded-xl text-xs font-bold shadow transition-all cursor-pointer"
              >
                บันทึกชื่อเมนู
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#FFFDF4] p-4 rounded-2xl border border-[#FFE4EC] space-y-2">
                <div className="flex items-center gap-2 text-[#8B5A2B] font-bold text-xs">
                  <i className="fa-solid fa-house"></i>
                  <span>แท็บที่ 0 (หน้าแรก)</span>
                </div>
                <input
                  type="text"
                  value={tabNames.tab0}
                  onChange={(e) => setTabNames({ ...tabNames, tab0: e.target.value })}
                  className="w-full bg-white border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="bg-[#FFFDF4] p-4 rounded-2xl border border-[#FFE4EC] space-y-2">
                <div className="flex items-center gap-2 text-[#D9779B] font-bold text-xs">
                  <i className="fa-solid fa-key"></i>
                  <span>แท็บที่ 1 (รหัส Free Fire)</span>
                </div>
                <input
                  type="text"
                  value={tabNames.tab1}
                  onChange={(e) => setTabNames({ ...tabNames, tab1: e.target.value })}
                  className="w-full bg-white border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="bg-[#FFFDF4] p-4 rounded-2xl border border-[#FFE4EC] space-y-2">
                <div className="flex items-center gap-2 text-[#4C88E0] font-bold text-xs">
                  <i className="fa-solid fa-gamepad"></i>
                  <span>แท็บที่ 2 (เปลี่ยนเป็น บริการอื่นๆ)</span>
                </div>
                <input
                  type="text"
                  value={tabNames.tab2}
                  onChange={(e) => setTabNames({ ...tabNames, tab2: e.target.value })}
                  placeholder="บริการอื่นๆ"
                  className="w-full bg-white border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs"
                />
                <span className="text-[10px] text-emerald-600 font-bold block">
                  ✓ เปลี่ยนจาก &ldquo;เช่ารหัส Rov&rdquo; เป็น &ldquo;บริการอื่นๆ&rdquo;
                </span>
              </div>

              <div className="bg-[#FFFDF4] p-4 rounded-2xl border border-[#FFE4EC] space-y-2">
                <div className="flex items-center gap-2 text-[#B08900] font-bold text-xs">
                  <i className="fa-solid fa-store"></i>
                  <span>แท็บที่ 3 (เปลี่ยนเป็น แอคร้าน)</span>
                </div>
                <input
                  type="text"
                  value={tabNames.tab3}
                  onChange={(e) => setTabNames({ ...tabNames, tab3: e.target.value })}
                  placeholder="แอคร้าน"
                  className="w-full bg-white border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs"
                />
                <span className="text-[10px] text-emerald-600 font-bold block">
                  ✓ เปลี่ยนจาก &ldquo;ขายรหัส&rdquo; เป็น &ldquo;แอคร้าน&rdquo;
                </span>
              </div>

              <div className="bg-[#FFFDF4] p-4 rounded-2xl border border-[#FFE4EC] space-y-2 sm:col-span-2">
                <div className="flex items-center gap-2 text-[#52C41A] font-bold text-xs">
                  <i className="fa-solid fa-comments"></i>
                  <span>แท็บที่ 4 (ช่องทางติดต่อ)</span>
                </div>
                <input
                  type="text"
                  value={tabNames.tab4}
                  onChange={(e) => setTabNames({ ...tabNames, tab4: e.target.value })}
                  className="w-full bg-white border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                type="button"
                onClick={() =>
                  setTabNames({
                    tab0: 'หน้าแรก',
                    tab1: 'เช่ารหัส(FF)',
                    tab2: 'บริการอื่นๆ',
                    tab3: 'แอคร้าน',
                    tab4: 'ติดต่อเรา',
                  })
                }
                className="text-xs text-[#8A6F65] underline hover:text-[#D9779B]"
              >
                คืนค่าเริ่มต้นทั้งหมด
              </button>

              <button
                onClick={handleSaveTabs}
                className="bg-[#8B5A2B] hover:bg-[#6D441D] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <i className="fa-solid fa-floppy-disk"></i>
                <span>บันทึกชื่อแท็บ</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: ALL IMAGES & GALLERIES */}
        {activeAdminTab === 'images' && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-[#FFE4EC] space-y-6 animate-fade-in">
            <div className="border-b border-dashed border-[#FFE4EC] pb-4">
              <h2 className="text-lg font-extrabold text-[#8B5A2B]">
                จัดการภาพในร้านทั้งหมด (All Store Graphics)
              </h2>
              <p className="text-xs text-[#8A6F65]">
                เพิ่ม ลบ และเปลี่ยนรูปภาพขั้นตอนการเช่า รูปภาพกฎกติกา โลโก้ และโปสเตอร์ติดต่อ
              </p>
            </div>

            {/* Steps Gallery Management */}
            <div className="space-y-3 bg-[#FFFDF4] p-4 sm:p-5 rounded-2xl border border-[#FFE4EC]">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-[#8B5A2B] flex items-center gap-2">
                  <i className="fa-solid fa-list-check text-[#FF9EBB]"></i>
                  <span>ภาพขั้นตอนการเช่ารหัส (Steps)</span>
                </h3>
                <span className="text-xs font-bold text-[#8A6F65]">
                  ทั้งหมด {stepImages.length} รูป
                </span>
              </div>

              {/* Add step image input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="วางลิงก์รูปภาพใหม่ (URL เช่น https://i.ibb.co/...)"
                  value={newStepUrl}
                  onChange={(e) => setNewStepUrl(e.target.value)}
                  className="flex-1 bg-white border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddStepImage}
                  className="bg-[#FF9EBB] hover:bg-[#D9779B] text-white px-4 py-2 rounded-xl text-xs font-bold shrink-0 cursor-pointer"
                >
                  + เพิ่มรูปขั้นตอน
                </button>
              </div>

              {/* Steps list */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                {stepImages.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-xl overflow-hidden border-2 border-[#FFE4EC] bg-white aspect-[3/4] shadow-xs"
                  >
                    <img src={url} alt={`Step ${idx + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute top-1.5 left-1.5 bg-[#FF9EBB] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
                      ขั้นตอน {idx + 1}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteStepImage(idx)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] shadow hover:bg-rose-600 transition-colors"
                      title="ลบรูปนี้"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules Gallery Management */}
            <div className="space-y-3 bg-[#FFFDF4] p-4 sm:p-5 rounded-2xl border border-[#FFE4EC]">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-[#8B5A2B] flex items-center gap-2">
                  <i className="fa-solid fa-scale-balanced text-[#F6D04D]"></i>
                  <span>ภาพกฎกติกาการเช่ารหัส (Rules)</span>
                </h3>
                <span className="text-xs font-bold text-[#8A6F65]">
                  ทั้งหมด {ruleImages.length} รูป
                </span>
              </div>

              {/* Add rule image input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="วางลิงก์รูปภาพใหม่ (URL เช่น https://i.ibb.co/...)"
                  value={newRuleUrl}
                  onChange={(e) => setNewRuleUrl(e.target.value)}
                  className="flex-1 bg-white border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddRuleImage}
                  className="bg-[#F6D04D] hover:bg-[#D4AD29] text-[#6B4C42] px-4 py-2 rounded-xl text-xs font-bold shrink-0 cursor-pointer"
                >
                  + เพิ่มรูปกฎ
                </button>
              </div>

              {/* Rules list */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                {ruleImages.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-xl overflow-hidden border-2 border-[#FFE4EC] bg-white aspect-[3/4] shadow-xs"
                  >
                    <img src={url} alt={`Rule ${idx + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute top-1.5 left-1.5 bg-[#F6D04D] text-[#6B4C42] text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
                      กฎข้อที่ {idx + 1}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteRuleImage(idx)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] shadow hover:bg-rose-600 transition-colors"
                      title="ลบรูปนี้"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Poster / QR Image */}
            <div className="space-y-3 bg-[#FFFDF4] p-4 sm:p-5 rounded-2xl border border-[#FFE4EC]">
              <h3 className="font-extrabold text-sm text-[#8B5A2B] flex items-center gap-2">
                <i className="fa-solid fa-qrcode text-[#52C41A]"></i>
                <span>รูปโปสเตอร์ติดต่อ / QR Code หน้าร้าน</span>
              </h3>
              <div className="flex gap-4 items-start">
                <img
                  src={contactImg}
                  alt="Contact poster"
                  className="w-24 rounded-xl border border-[#FFE4EC] object-cover shrink-0 shadow-xs"
                />
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={contactImg}
                    onChange={(e) => setContactImg(e.target.value)}
                    className="w-full bg-white border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs"
                    placeholder="URL รูปโปสเตอร์ติดต่อ"
                  />
                  <button
                    onClick={handleSaveContact}
                    className="bg-[#8B5A2B] text-white px-4 py-1.5 rounded-xl text-xs font-bold"
                  >
                    บันทึกภาพโปสเตอร์
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CONTACT CHANNELS */}
        {activeAdminTab === 'contact' && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-[#FFE4EC] space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-dashed border-[#FFE4EC] pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-[#8B5A2B]">
                  จัดการช่องทางติดต่อ (Contact Channels)
                </h2>
                <p className="text-xs text-[#8A6F65]">
                  เปลี่ยนลิงก์ Facebook, Line, TikTok, Instagram และภาพโปสเตอร์
                </p>
              </div>
              <button
                onClick={handleSaveContact}
                className="bg-[#8B5A2B] hover:bg-[#6D441D] text-white px-5 py-2 rounded-xl text-xs font-bold shadow transition-all cursor-pointer"
              >
                บันทึกช่องทางติดต่อ
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Facebook */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#6B4C42] flex items-center gap-1.5">
                  <i className="fa-brands fa-facebook text-[#1877F2]"></i>
                  <span>ลิงก์ Facebook ร้าน</span>
                </label>
                <input
                  type="text"
                  value={contactFb}
                  onChange={(e) => setContactFb(e.target.value)}
                  className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs"
                  placeholder="https://facebook.com/..."
                />
              </div>

              {/* LINE */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#6B4C42] flex items-center gap-1.5">
                  <i className="fa-brands fa-line text-[#00B900]"></i>
                  <span>ลิงก์ LINE Official / แอดมิน</span>
                </label>
                <input
                  type="text"
                  value={contactLine}
                  onChange={(e) => setContactLine(e.target.value)}
                  className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs"
                  placeholder="https://line.me/..."
                />
              </div>

              {/* TikTok */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#6B4C42] flex items-center gap-1.5">
                  <i className="fa-brands fa-tiktok text-black"></i>
                  <span>ลิงก์ TikTok</span>
                </label>
                <input
                  type="text"
                  value={contactTiktok}
                  onChange={(e) => setContactTiktok(e.target.value)}
                  className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs"
                  placeholder="https://tiktok.com/@..."
                />
              </div>

              {/* Instagram */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#6B4C42] flex items-center gap-1.5">
                  <i className="fa-brands fa-instagram text-[#E1306C]"></i>
                  <span>ลิงก์ Instagram</span>
                </label>
                <input
                  type="text"
                  value={contactIg}
                  onChange={(e) => setContactIg(e.target.value)}
                  className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs"
                  placeholder="https://instagram.com/..."
                />
              </div>

              {/* Contact Poster URL */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-[#6B4C42] block">
                  รูปภาพโปสเตอร์ข้อมูลติดต่อ / QR Code (Image URL)
                </label>
                <input
                  type="text"
                  value={contactImg}
                  onChange={(e) => setContactImg(e.target.value)}
                  className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs"
                  placeholder="https://..."
                />
                {contactImg && (
                  <div className="mt-2 w-32 h-32 rounded-xl overflow-hidden border border-[#FFE4EC] shadow-sm">
                    <img src={contactImg} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleSaveContact}
                className="bg-[#8B5A2B] hover:bg-[#6D441D] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <i className="fa-solid fa-floppy-disk"></i>
                <span>บันทึกช่องทางติดต่อ</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: BACKGROUND MUSIC */}
        {activeAdminTab === 'music' && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-[#FFE4EC] space-y-6 animate-fade-in">
            <div className="border-b border-dashed border-[#FFE4EC] pb-4">
              <h2 className="text-lg font-extrabold text-[#8B5A2B]">
                จัดการเพลงพื้นหลัง (Background Music & Playlist)
              </h2>
              <p className="text-xs text-[#8A6F65]">
                เลือกเพลงที่เปิดในร้าน เพิ่มเพลงใหม่ หรือลบเพลงที่ไม่ต้องการ
              </p>
            </div>

            {/* Current Active Music Card */}
            <div className="bg-[#FFF8E7] p-5 rounded-2xl border border-[#FFE4EC] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#FF9EBB] text-white flex items-center justify-center text-xl shadow-sm">
                  <i className="fa-solid fa-music"></i>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#8B5A2B] uppercase tracking-wide">
                    เพลงที่กำลังเปิดหน้าร้าน
                  </span>
                  <h3 className="font-extrabold text-sm text-[#6B4C42] truncate max-w-[280px]">
                    {playlist.find((p) => p.url === musicUrl)?.name || 'เพลงที่กำหนดเอง'}
                  </h3>
                  <p className="text-[10px] text-[#8A6F65] truncate max-w-[280px]">{musicUrl}</p>
                </div>
              </div>

              {/* Quick Play test button */}
              <button
                type="button"
                onClick={() => {
                  setPreviewAudioUrl(musicUrl);
                  setPreviewAudioPlaying(!previewAudioPlaying);
                }}
                className="bg-white hover:bg-[#FFF0F5] text-[#D9779B] border border-[#FFE4EC] px-4 py-2 rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <i className={`fa-solid ${previewAudioPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                <span>{previewAudioPlaying ? 'หยุดฟัง' : 'ทดลองฟังเพลงนี้'}</span>
              </button>
            </div>

            {/* Add New Song */}
            <div className="bg-[#FFFDF4] p-5 rounded-2xl border border-[#FFE4EC] space-y-3">
              <h3 className="font-bold text-xs text-[#8B5A2B] flex items-center gap-2">
                <i className="fa-solid fa-plus-circle"></i>
                <span>เพิ่มเพลงใหม่ในเพลย์ลิสต์</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="ชื่อเพลง เช่น Mednun Sweet Theme"
                  value={newSongName}
                  onChange={(e) => setNewSongName(e.target.value)}
                  className="bg-white border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs"
                />
                <input
                  type="text"
                  placeholder="ลิงก์ไฟล์เสียง .mp3 / .mp4 (URL)"
                  value={newSongUrl}
                  onChange={(e) => setNewSongUrl(e.target.value)}
                  className="bg-white border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <button
                type="button"
                onClick={handleAddSong}
                className="bg-[#FF9EBB] hover:bg-[#D9779B] text-white px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                + เพิ่มเพลงเข้าคลัง
              </button>
            </div>

            {/* Songs List */}
            <div className="space-y-2">
              <h3 className="font-bold text-xs text-[#8A6F65]">
                รายการเพลงทั้งหมดในคลัง ({playlist.length} เพลง)
              </h3>
              <div className="space-y-2">
                {playlist.map((song, idx) => {
                  const isActive = song.url === musicUrl;
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                        isActive
                          ? 'bg-[#FFF0F5] border-[#FF9EBB] shadow-sm'
                          : 'bg-white border-[#FFE4EC]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            isActive
                              ? 'bg-[#FF9EBB] text-white'
                              : 'bg-gray-100 text-[#8A6F65]'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-bold text-xs text-[#6B4C42]">{song.name}</p>
                          <p className="text-[10px] text-[#8A6F65] truncate max-w-[300px]">
                            {song.url}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!isActive ? (
                          <button
                            type="button"
                            onClick={() => handleSetActiveSong(song.url)}
                            className="bg-white text-[#D9779B] border border-[#FFE4EC] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#FFF0F5]"
                          >
                            ใช้เพลงนี้
                          </button>
                        ) : (
                          <span className="bg-[#FF9EBB] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                            เพลงปัจจุบัน
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => handleDeleteSong(song.url)}
                          className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center text-xs"
                          title="ลบเพลงนี้"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PRODUCTS & CATALOG */}
        {activeAdminTab === 'products' && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-[#FFE4EC] space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-dashed border-[#FFE4EC] pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-[#8B5A2B]">
                  จัดการสินค้าและรหัสในร้าน (Catalog Management)
                </h2>
                <p className="text-xs text-[#8A6F65]">
                  เพิ่ม/แก้ไข/ลบ รายการรหัส Free Fire, บริการอื่นๆ, และแอคร้าน
                </p>
              </div>

              {/* Section switch */}
              <div className="flex gap-1.5 bg-[#FFFDF4] p-1 rounded-2xl border border-[#FFE4EC]">
                <button
                  onClick={() => setProductSection('rentFF')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    productSection === 'rentFF'
                      ? 'bg-[#FF9EBB] text-white shadow-xs'
                      : 'text-[#8A6F65]'
                  }`}
                >
                  {tabNames.tab1}
                </button>
                <button
                  onClick={() => setProductSection('rentROV')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    productSection === 'rentROV'
                      ? 'bg-[#75B8FF] text-white shadow-xs'
                      : 'text-[#8A6F65]'
                  }`}
                >
                  {tabNames.tab2}
                </button>
                <button
                  onClick={() => setProductSection('sell')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    productSection === 'sell'
                      ? 'bg-[#F6D04D] text-[#6B4C42] shadow-xs'
                      : 'text-[#8A6F65]'
                  }`}
                >
                  {tabNames.tab3}
                </button>
              </div>
            </div>

            {/* Category manager for selected section */}
            <div className="bg-[#FFFDF4] p-4 rounded-2xl border border-[#FFE4EC] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#8B5A2B]">
                  หมวดหมู่ย่อยในหมวดนี้ ({categories[productSection]?.length || 0} หมวด)
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories[productSection]?.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white px-3 py-1 rounded-full text-xs font-bold border border-[#FFE4EC] flex items-center gap-1.5 shadow-2xs"
                  >
                    <span dangerouslySetInnerHTML={{ __html: c.name }} />
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(productSection, c.id)}
                      className="text-rose-400 hover:text-rose-600 ml-1 text-[10px]"
                      title="ลบหมวดหมู่"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="ตั้งชื่อหมวดหมู่ใหม่ เช่น ตัวยอดนิยม"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="bg-white border border-[#FFE4EC] rounded-xl px-3 py-1.5 text-xs flex-1"
                />
                <button
                  type="button"
                  onClick={() => handleAddCategory(productSection)}
                  className="bg-[#8B5A2B] text-white px-4 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
                >
                  + เพิ่มหมวด
                </button>
              </div>
            </div>

            {/* Product items list */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#6B4C42]">
                  รายการสินค้าทั้งหมดในหมวดนี้ (
                  {productSection === 'rentFF'
                    ? rentFFAccounts.length
                    : productSection === 'rentROV'
                    ? rentROVAccounts.length
                    : sellAccounts.length}{' '}
                  รายการ)
                </span>

                <button
                  type="button"
                  onClick={() => {
                    const newItem: AccountItem = {
                      id: 'item_' + Date.now(),
                      title: 'สินค้าใหม่',
                      category: categories[productSection]?.[0]?.id || 'default',
                      status: productSection === 'sell' ? 'Sell' : 'ว่าง',
                      rates: [{ label: '1 ชม. ฿150' }],
                      img: 'https://placehold.co/400x400/FFF0F5/FF9EBB?text=New+Item',
                    };
                    setEditingItem({ type: productSection, item: newItem });
                    setIsCreatingItem(true);
                  }}
                  className="bg-[#FF9EBB] hover:bg-[#D9779B] text-white px-4 py-1.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-plus text-[10px]"></i>
                  <span>เพิ่มสินค้าใหม่</span>
                </button>
              </div>

              {/* Items Table/Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(productSection === 'rentFF'
                  ? rentFFAccounts
                  : productSection === 'rentROV'
                  ? rentROVAccounts
                  : sellAccounts
                ).map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#FFFDF4] rounded-2xl border border-[#FFE4EC] flex gap-3 items-center justify-between shadow-2xs"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-14 h-14 rounded-xl object-cover border border-[#FFE4EC] shrink-0"
                      />
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-xs text-[#6B4C42] truncate">{item.title}</h4>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                            item.status === 'ว่าง' || item.status === 'Sell'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {item.status}
                        </span>
                        <p className="text-[10px] text-[#D9779B] font-bold truncate mt-0.5">
                          {item.rates?.map((r) => r.label).join(' | ')}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingItem({ type: productSection, item: { ...item } });
                          setIsCreatingItem(false);
                        }}
                        className="w-7 h-7 rounded-lg bg-white border border-[#FFE4EC] text-[#8B5A2B] hover:bg-[#FFE4EC] flex items-center justify-center text-xs"
                        title="แก้ไข"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('คุณแน่ใจว่าต้องการลบรายการนี้?')) {
                            onDeleteItem(productSection, item.id);
                            showToast('✓ ลบสินค้าเรียบร้อย');
                          }
                        }}
                        className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center text-xs"
                        title="ลบ"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Internal Item Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center p-3">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setEditingItem(null)}
          />
          <div className="bg-white border-[3px] border-[#FFE4EC] rounded-[28px] p-5 w-full max-w-[380px] relative z-10 shadow-2xl animate-pop max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setEditingItem(null)}
              className="absolute top-4 right-4 w-7 h-7 bg-[#FFF0F5] rounded-full flex items-center justify-center text-[#8B5A2B]"
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>

            <h3 className="text-[#8B5A2B] font-bold text-sm mb-4 border-b border-dashed border-[#FFE4EC] pb-2 flex items-center gap-2">
              <i className="fa-solid fa-pen-to-square"></i>
              {isCreatingItem ? 'เพิ่มสินค้าใหม่' : 'แก้ไขข้อมูลสินค้า'}
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">
                  ชื่อสินค้า / รหัส
                </label>
                <input
                  type="text"
                  value={editingItem.item.title}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, title: e.target.value },
                    })
                  }
                  className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">
                  ลิงก์รูปภาพ (Image URL)
                </label>
                <input
                  type="text"
                  value={editingItem.item.img}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, img: e.target.value },
                    })
                  }
                  className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs"
                />
                {editingItem.item.img && (
                  <div className="mt-2 w-16 h-16 rounded-xl overflow-hidden border border-[#FFE4EC]">
                    <img
                      src={editingItem.item.img}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">หมวดหมู่</label>
                <select
                  value={editingItem.item.category}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, category: e.target.value },
                    })
                  }
                  className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs"
                >
                  {categories[editingItem.type]?.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name.replace(/<[^>]*>?/gm, '').trim()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">สถานะ</label>
                <select
                  value={editingItem.item.status}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, status: e.target.value },
                    })
                  }
                  className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs"
                >
                  {editingItem.type === 'sell' ? (
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

              <div>
                <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">
                  เรทราคา (1 บรรทัด ต่อ 1 เรท)
                </label>
                <textarea
                  rows={3}
                  value={editingItem.item.rates?.map((r) => r.label).join('\n') || ''}
                  onChange={(e) => {
                    const lines = e.target.value
                      .split('\n')
                      .filter((l) => l.trim().length > 0)
                      .map((label) => ({ label }));
                    setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, rates: lines },
                    });
                  }}
                  className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs"
                  placeholder="1 ชม. ฿180&#10;2 ชม. ฿350&#10;เหมาวัน ฿800"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">
                  หมายเหตุเพิ่มเติม (Note)
                </label>
                <textarea
                  rows={2}
                  value={editingItem.item.note || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, note: e.target.value },
                    })
                  }
                  className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onSaveItem(editingItem.type, editingItem.item);
                    setEditingItem(null);
                    showToast('✓ บันทึกสินค้าเรียบร้อย');
                  }}
                  className="w-full bg-[#8B5A2B] text-white py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  บันทึกสินค้า
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
