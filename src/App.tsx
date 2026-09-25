import React, { useState, useEffect, useRef } from 'react';
import {
  AccountItem,
  CategoryItem,
  DialogConfig,
  HomeGalleries,
  ItemType,
  SiteCategories,
  SiteContact,
  SiteSettings,
  TabIndex,
} from './types.ts';
import {
  defaultCategories,
  defaultContact,
  defaultGalleries,
  defaultRentFF,
  defaultRentROV,
  defaultSell,
  defaultSettings,
} from './data/defaults.ts';
import {
  deleteItemFromFirestore,
  saveGlobalConfigToFirestore,
  saveItemToFirestore,
  subscribeToFirebase,
} from './services/firebase.ts';
import { Header } from './components/Header.tsx';
import { BottomNav } from './components/BottomNav.tsx';
import { WelcomeModal } from './components/WelcomeModal.tsx';
import { ImageModal } from './components/ImageModal.tsx';
import { RentBottomSheet } from './components/RentBottomSheet.tsx';
import { SellBottomSheet } from './components/SellBottomSheet.tsx';
import { CustomDialog } from './components/CustomDialog.tsx';
import { AdminLoginModal } from './components/AdminLoginModal.tsx';
import { AdminMasterModal } from './components/AdminMasterModal.tsx';
import { AdminSettingsModal } from './components/AdminSettingsModal.tsx';
import { AdminContactModal } from './components/AdminContactModal.tsx';
import { AdminBackOffice } from './components/AdminBackOffice.tsx';
import { HomeView } from './views/HomeView.tsx';
import { RentFFView } from './views/RentFFView.tsx';
import { RentROVView } from './views/RentROVView.tsx';
import { SellView } from './views/SellView.tsx';
import { ContactView } from './views/ContactView.tsx';

export default function App() {
  // Navigation
  const [currentTab, setCurrentTab] = useState<TabIndex>(0);

  // Settings & Data with LocalStorage fallback
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('botyingying_settings');
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch (e) {
        console.warn(e);
      }
    }
    return defaultSettings;
  });

  const [contact, setContact] = useState<SiteContact>(() => {
    const saved = localStorage.getItem('botyingying_contact');
    if (saved) {
      try {
        return { ...defaultContact, ...JSON.parse(saved) };
      } catch (e) {
        console.warn(e);
      }
    }
    return defaultContact;
  });

  const [galleries, setGalleries] = useState<HomeGalleries>(() => {
    const saved = localStorage.getItem('botyingying_home_galleries');
    if (saved) {
      try {
        return { ...defaultGalleries, ...JSON.parse(saved) };
      } catch (e) {
        console.warn(e);
      }
    }
    return defaultGalleries;
  });

  const [categories, setCategories] = useState<SiteCategories>(() => {
    const saved = localStorage.getItem('botyingying_categories');
    if (saved) {
      try {
        return { ...defaultCategories, ...JSON.parse(saved) };
      } catch (e) {
        console.warn(e);
      }
    }
    return defaultCategories;
  });

  const [rentFFAccounts, setRentFFAccounts] = useState<AccountItem[]>(() => {
    const saved = localStorage.getItem('botyingying_rent_ff');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.warn(e);
      }
    }
    return defaultRentFF;
  });

  const [rentROVAccounts, setRentROVAccounts] = useState<AccountItem[]>(() => {
    const saved = localStorage.getItem('botyingying_rent_rov');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.warn(e);
      }
    }
    return defaultRentROV;
  });

  const [sellAccounts, setSellAccounts] = useState<AccountItem[]>(() => {
    const saved = localStorage.getItem('botyingying_sell');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.warn(e);
      }
    }
    return defaultSell;
  });

  // Admin & Sync
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBackOfficeOpen, setIsBackOfficeOpen] = useState(false);
  const [syncState, setSyncState] = useState<{
    show: boolean;
    status: 'loading' | 'success' | 'error';
    message: string;
  }>({
    show: true,
    status: 'loading',
    message: 'กำลังโหลดข้อมูลร้านค้า...',
  });

  // Music state & Audio Ref
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Modals & Sheets
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(true);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [selectedRentFF, setSelectedRentFF] = useState<AccountItem | null>(null);
  const [selectedRentROV, setSelectedRentROV] = useState<AccountItem | null>(null);
  const [selectedSell, setSelectedSell] = useState<AccountItem | null>(null);

  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);
  const [adminSettingsModalOpen, setAdminSettingsModalOpen] = useState(false);
  const [adminContactModalOpen, setAdminContactModalOpen] = useState(false);
  const [adminMasterModalConfig, setAdminMasterModalConfig] = useState<{
    isOpen: boolean;
    type: ItemType;
    item: AccountItem | null;
  }>({
    isOpen: false,
    type: 'rentFF',
    item: null,
  });

  const [dialogConfig, setDialogConfig] = useState<DialogConfig | null>(null);

  // Real-time Firebase subscription
  useEffect(() => {
    const unsub = subscribeToFirebase({
      onRentFF: (data) => {
        setRentFFAccounts(data);
        localStorage.setItem('botyingying_rent_ff', JSON.stringify(data));
      },
      onRentROV: (data) => {
        setRentROVAccounts(data);
        localStorage.setItem('botyingying_rent_rov', JSON.stringify(data));
      },
      onSell: (data) => {
        setSellAccounts(data);
        localStorage.setItem('botyingying_sell', JSON.stringify(data));
      },
      onConfig: (data) => {
        if (data.siteSettings) {
          setSettings(data.siteSettings);
          localStorage.setItem('botyingying_settings', JSON.stringify(data.siteSettings));
        }
        if (data.siteContact) {
          setContact(data.siteContact);
          localStorage.setItem('botyingying_contact', JSON.stringify(data.siteContact));
        }
        if (data.homeGalleries) {
          setGalleries(data.homeGalleries);
          localStorage.setItem('botyingying_home_galleries', JSON.stringify(data.homeGalleries));
        }
        if (data.siteCategories) {
          setCategories(data.siteCategories);
          localStorage.setItem('botyingying_categories', JSON.stringify(data.siteCategories));
        }
      },
      onSyncState: (status, message) => {
        setSyncState({
          show: true,
          status,
          message: message || (status === 'success' ? 'ข้อมูลอัปเดตเรียบร้อย' : 'กำลังดึงข้อมูล...'),
        });
        if (status === 'success') {
          setTimeout(() => {
            setSyncState((prev) => ({ ...prev, show: false }));
          }, 2500);
        }
      },
    });

    return () => unsub();
  }, []);

  // Sync music URL to audio element
  useEffect(() => {
    if (audioRef.current && settings.musicUrl) {
      if (audioRef.current.src !== settings.musicUrl) {
        audioRef.current.src = settings.musicUrl;
        audioRef.current.load();
        if (isMusicPlaying) {
          audioRef.current.play().catch(() => setIsMusicPlaying(false));
        }
      }
    }
  }, [settings.musicUrl, isMusicPlaying]);

  // Handle music toggle
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current.volume = 0.4;
      audioRef.current
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch((err) => {
          console.warn('Playback prevented:', err);
          setIsMusicPlaying(false);
        });
    }
  };

  // Header click handler (Admin modal trigger)
  const handleAvatarClick = () => {
    if (isAdmin) {
      setDialogConfig({
        title: 'โหมดแอดมิน (Admin Mode)',
        message: 'คุณกำลังอยู่ในโหมดจัดการร้านค้า ต้องการเข้าสู่ระบบหลังบ้านหรือตั้งค่าส่วนใด?',
        buttons: [
          {
            text: '⚙️ เข้าระบบหลังบ้าน (Back-Office)',
            className: 'bg-[#8B5A2B] text-white',
            onClick: () => setIsBackOfficeOpen(true),
          },
          {
            text: 'ตั้งค่าร้านค้า',
            className: 'bg-[#FF9EBB] text-white',
            onClick: () => setAdminSettingsModalOpen(true),
          },
          {
            text: 'ออกจากโหมดแอดมิน',
            className: 'bg-rose-500 text-white',
            onClick: () => {
              setIsAdmin(false);
            },
          },
          {
            text: 'ปิดหน้าต่าง',
            className: 'bg-gray-100 text-[#6B4C42]',
          },
        ],
      });
    } else {
      setAdminLoginModalOpen(true);
    }
  };

  const handleOpenBackOffice = () => {
    if (isAdmin) {
      setIsBackOfficeOpen(true);
    } else {
      setAdminLoginModalOpen(true);
    }
  };

  // Save Item handler (Admin)
  const handleSaveItem = async (type: ItemType, item: AccountItem) => {
    if (type === 'rentFF') {
      const exists = rentFFAccounts.some((a) => a.id === item.id);
      const updated = exists
        ? rentFFAccounts.map((a) => (a.id === item.id ? item : a))
        : [item, ...rentFFAccounts];
      setRentFFAccounts(updated);
      localStorage.setItem('botyingying_rent_ff', JSON.stringify(updated));
    } else if (type === 'rentROV') {
      const exists = rentROVAccounts.some((a) => a.id === item.id);
      const updated = exists
        ? rentROVAccounts.map((a) => (a.id === item.id ? item : a))
        : [item, ...rentROVAccounts];
      setRentROVAccounts(updated);
      localStorage.setItem('botyingying_rent_rov', JSON.stringify(updated));
    } else {
      const exists = sellAccounts.some((a) => a.id === item.id);
      const updated = exists
        ? sellAccounts.map((a) => (a.id === item.id ? item : a))
        : [item, ...sellAccounts];
      setSellAccounts(updated);
      localStorage.setItem('botyingying_sell', JSON.stringify(updated));
    }

    await saveItemToFirestore(type, item);
  };

  // Delete Item handler (Admin)
  const handleDeleteItem = async (type: ItemType, id: string) => {
    if (type === 'rentFF') {
      const updated = rentFFAccounts.filter((a) => a.id !== id);
      setRentFFAccounts(updated);
      localStorage.setItem('botyingying_rent_ff', JSON.stringify(updated));
    } else if (type === 'rentROV') {
      const updated = rentROVAccounts.filter((a) => a.id !== id);
      setRentROVAccounts(updated);
      localStorage.setItem('botyingying_rent_rov', JSON.stringify(updated));
    } else {
      const updated = sellAccounts.filter((a) => a.id !== id);
      setSellAccounts(updated);
      localStorage.setItem('botyingying_sell', JSON.stringify(updated));
    }

    await deleteItemFromFirestore(type, id);
  };

  // Save Settings handler (Admin)
  const handleSaveSettings = async (newSettings: SiteSettings) => {
    setSettings(newSettings);
    localStorage.setItem('botyingying_settings', JSON.stringify(newSettings));
    await saveGlobalConfigToFirestore({ siteSettings: newSettings });
  };

  // Save Contact handler (Admin)
  const handleSaveContact = async (newContact: SiteContact) => {
    setContact(newContact);
    localStorage.setItem('botyingying_contact', JSON.stringify(newContact));
    await saveGlobalConfigToFirestore({ siteContact: newContact });
  };

  const handleSaveGalleries = async (newGalleries: HomeGalleries) => {
    setGalleries(newGalleries);
    localStorage.setItem('botyingying_home_galleries', JSON.stringify(newGalleries));
    await saveGlobalConfigToFirestore({ homeGalleries: newGalleries });
  };

  const handleSaveCategories = async (newCategories: SiteCategories) => {
    setCategories(newCategories);
    localStorage.setItem('botyingying_categories', JSON.stringify(newCategories));
    await saveGlobalConfigToFirestore({ siteCategories: newCategories });
  };

  // Gallery Management (Admin)
  const handleAddGalleryItem = (type: 'steps' | 'rules') => {
    setDialogConfig({
      title: type === 'steps' ? 'เพิ่มรูปขั้นตอนการเช่า' : 'เพิ่มรูปกฎกติกา',
      message: 'กรอกลิงก์รูปภาพ (Image URL)',
      isPrompt: true,
      promptPlaceholder: 'https://i.ibb.co/...',
      buttons: [
        { text: 'ยกเลิก', className: 'bg-gray-100 text-[#6B4C42]' },
        {
          text: 'เพิ่มรูปภาพ',
          className: 'bg-[#FF9EBB] text-white',
          onClick: async (val) => {
            if (!val || !val.trim()) return;
            const updated = {
              ...galleries,
              [type]: [...galleries[type], val.trim()],
            };
            setGalleries(updated);
            localStorage.setItem('botyingying_home_galleries', JSON.stringify(updated));
            await saveGlobalConfigToFirestore({ homeGalleries: updated });
          },
        },
      ],
    });
  };

  const handleDeleteGalleryItem = async (type: 'steps' | 'rules', index: number) => {
    const updated = {
      ...galleries,
      [type]: galleries[type].filter((_, i) => i !== index),
    };
    setGalleries(updated);
    localStorage.setItem('botyingying_home_galleries', JSON.stringify(updated));
    await saveGlobalConfigToFirestore({ homeGalleries: updated });
  };

  // Category Management (Admin)
  const handleAddCategory = (type: ItemType) => {
    setDialogConfig({
      title: 'เพิ่มหมวดหมู่ใหม่',
      message: 'ตั้งชื่อหมวดหมู่ที่ต้องการเพิ่ม',
      isPrompt: true,
      promptPlaceholder: 'ชื่อหมวดหมู่ เช่น ปักธงสุดแรร์',
      buttons: [
        { text: 'ยกเลิก', className: 'bg-gray-100 text-[#6B4C42]' },
        {
          text: 'เพิ่มเลย',
          className: 'bg-[#8B5A2B] text-white',
          onClick: async (name) => {
            if (!name || !name.trim()) return;
            const catId = 'cat_' + Date.now();
            const updated: SiteCategories = {
              ...categories,
              [type]: [...categories[type], { id: catId, name: name.trim() }],
            };
            setCategories(updated);
            localStorage.setItem('botyingying_categories', JSON.stringify(updated));
            await saveGlobalConfigToFirestore({ siteCategories: updated });
          },
        },
      ],
    });
  };

  const handleEditCategory = (type: ItemType, cat: CategoryItem) => {
    const plainName = cat.name.replace(/<[^>]*>?/gm, '').trim();
    setDialogConfig({
      title: 'จัดการหมวดหมู่',
      message: `คุณกำลังจัดการหมวดหมู่ <strong>${plainName}</strong>`,
      buttons: [
        {
          text: 'ลบหมวดหมู่นี้',
          className: 'bg-rose-500 text-white',
          onClick: async () => {
            const updated: SiteCategories = {
              ...categories,
              [type]: categories[type].filter((c) => c.id !== cat.id),
            };
            setCategories(updated);
            localStorage.setItem('botyingying_categories', JSON.stringify(updated));
            await saveGlobalConfigToFirestore({ siteCategories: updated });
          },
        },
        { text: 'ยกเลิก', className: 'bg-gray-100 text-[#6B4C42]' },
      ],
    });
  };

  // Page titles and icons for Header
  const pageMeta: Record<TabIndex, { title: string; icon: string }> = {
    0: { title: settings.tabNames?.tab0 || 'หน้าแรก', icon: 'fa-solid fa-house' },
    1: { title: settings.tabNames?.tab1 || 'เช่ารหัส Free Fire', icon: 'fa-solid fa-fire' },
    2: { title: settings.tabNames?.tab2 || 'บริการอื่นๆ', icon: 'fa-solid fa-sparkles' },
    3: { title: settings.tabNames?.tab3 || 'แอคร้าน', icon: 'fa-solid fa-store' },
    4: { title: settings.tabNames?.tab4 || 'ช่องทางติดต่อ', icon: 'fa-solid fa-comments' },
  };

  return (
    <div className="min-h-screen">
      {/* Background audio element */}
      <audio ref={audioRef} loop preload="auto">
        <source src={settings.musicUrl} type="audio/mpeg" />
      </audio>

      {/* Sync Status Banner */}
      {syncState.show && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[500] bg-white border-2 border-[#FFE4EC] px-4 py-1.5 rounded-full shadow-[0_4px_15px_rgba(255,158,187,0.3)] text-[11px] font-bold text-[#D9779B] flex items-center gap-2 transition-all">
          {syncState.status === 'loading' ? (
            <i className="fa-solid fa-spinner fa-spin text-xs"></i>
          ) : syncState.status === 'success' ? (
            <i className="fa-solid fa-check text-emerald-500 text-xs"></i>
          ) : (
            <i className="fa-solid fa-triangle-exclamation text-rose-500 text-xs"></i>
          )}
          <span>{syncState.message}</span>
        </div>
      )}

      {isBackOfficeOpen ? (
        <AdminBackOffice
          settings={settings}
          contact={contact}
          galleries={galleries}
          categories={categories}
          rentFFAccounts={rentFFAccounts}
          rentROVAccounts={rentROVAccounts}
          sellAccounts={sellAccounts}
          onSaveSettings={handleSaveSettings}
          onSaveContact={handleSaveContact}
          onSaveGalleries={handleSaveGalleries}
          onSaveCategories={handleSaveCategories}
          onSaveItem={handleSaveItem}
          onDeleteItem={handleDeleteItem}
          onClose={() => setIsBackOfficeOpen(false)}
        />
      ) : (
        <>
          {/* Mobile App Container */}
          <div className="app-container flex flex-col justify-between">
            <div>
              {/* Header */}
              <Header
                settings={settings}
                pageTitle={pageMeta[currentTab].title}
                pageIcon={pageMeta[currentTab].icon}
                isMusicPlaying={isMusicPlaying}
                onToggleMusic={toggleMusic}
                onAvatarClick={handleAvatarClick}
                onOpenBackOffice={handleOpenBackOffice}
                isAdmin={isAdmin}
              />

              {/* Current Page View */}
              <main className="relative">
                {currentTab === 0 && (
                  <HomeView
                    settings={settings}
                    galleries={galleries}
                    isAdmin={isAdmin}
                    onNavigateTab={(tab) => setCurrentTab(tab)}
                    onImageClick={(url) => setLightboxUrl(url)}
                    onAddGalleryItem={handleAddGalleryItem}
                    onDeleteGalleryItem={handleDeleteGalleryItem}
                    onOpenSettings={handleOpenBackOffice}
                  />
                )}

                {currentTab === 1 && (
                  <RentFFView
                    accounts={rentFFAccounts}
                    categories={categories.rentFF}
                    isAdmin={isAdmin}
                    onSelectAccount={(acc) => setSelectedRentFF(acc)}
                    onEditAccount={(acc) =>
                      setAdminMasterModalConfig({ isOpen: true, type: 'rentFF', item: acc })
                    }
                    onAddNewAccount={() =>
                      setAdminMasterModalConfig({ isOpen: true, type: 'rentFF', item: null })
                    }
                    onAddCategory={() => handleAddCategory('rentFF')}
                    onEditCategory={(cat) => handleEditCategory('rentFF', cat)}
                  />
                )}

                {currentTab === 2 && (
                  <RentROVView
                    accounts={rentROVAccounts}
                    categories={categories.rentROV}
                    isAdmin={isAdmin}
                    onSelectAccount={(acc) => setSelectedRentROV(acc)}
                    onEditAccount={(acc) =>
                      setAdminMasterModalConfig({ isOpen: true, type: 'rentROV', item: acc })
                    }
                    onAddNewAccount={() =>
                      setAdminMasterModalConfig({ isOpen: true, type: 'rentROV', item: null })
                    }
                    onAddCategory={() => handleAddCategory('rentROV')}
                    onEditCategory={(cat) => handleEditCategory('rentROV', cat)}
                  />
                )}

                {currentTab === 3 && (
                  <SellView
                    accounts={sellAccounts}
                    categories={categories.sell}
                    isAdmin={isAdmin}
                    onSelectItem={(item) => setSelectedSell(item)}
                    onEditItem={(item) =>
                      setAdminMasterModalConfig({ isOpen: true, type: 'sell', item })
                    }
                    onAddNewItem={() =>
                      setAdminMasterModalConfig({ isOpen: true, type: 'sell', item: null })
                    }
                    onAddCategory={() => handleAddCategory('sell')}
                    onEditCategory={(cat) => handleEditCategory('sell', cat)}
                  />
                )}

                {currentTab === 4 && (
                  <ContactView
                    contact={contact}
                    isAdmin={isAdmin}
                    onEditContact={handleOpenBackOffice}
                    onImageClick={(url) => setLightboxUrl(url)}
                  />
                )}
              </main>
            </div>

            {/* Floating Bottom Navigation */}
            <BottomNav
              currentTab={currentTab}
              onTabChange={(tab) => setCurrentTab(tab)}
              tabNames={settings.tabNames}
            />
          </div>
        </>
      )}

      {/* Modals & Dialogs */}
      <WelcomeModal
        isOpen={welcomeModalOpen}
        onClose={() => setWelcomeModalOpen(false)}
        settings={settings}
        onNavigateTab={(tab) => setCurrentTab(tab)}
      />

      <ImageModal imageUrl={lightboxUrl} onClose={() => setLightboxUrl(null)} />

      <RentBottomSheet
        item={selectedRentFF}
        gameType="FF"
        onClose={() => setSelectedRentFF(null)}
        onGoToContact={() => {
          setSelectedRentFF(null);
          setCurrentTab(4);
        }}
        onImageClick={(url) => setLightboxUrl(url)}
      />

      <RentBottomSheet
        item={selectedRentROV}
        gameType="ROV"
        onClose={() => setSelectedRentROV(null)}
        onGoToContact={() => {
          setSelectedRentROV(null);
          setCurrentTab(4);
        }}
        onImageClick={(url) => setLightboxUrl(url)}
      />

      <SellBottomSheet
        item={selectedSell}
        onClose={() => setSelectedSell(null)}
        onGoToContact={() => {
          setSelectedSell(null);
          setCurrentTab(4);
        }}
        onImageClick={(url) => setLightboxUrl(url)}
      />

      <CustomDialog config={dialogConfig} onClose={() => setDialogConfig(null)} />

      <AdminLoginModal
        isOpen={adminLoginModalOpen}
        onClose={() => setAdminLoginModalOpen(false)}
        onLoginSuccess={() => {
          setIsAdmin(true);
          setIsBackOfficeOpen(true);
          setDialogConfig({
            title: 'เข้าสู่ระบบแอดมินสำเร็จ!',
            message: 'เปิดระบบหลังบ้านแล้ว คุณสามารถแก้ไขข้อมูลร้าน เพิ่มสินค้า และตั้งค่าทุกอย่างได้ทันที',
            buttons: [{ text: 'เริ่มใช้งาน', className: 'bg-[#8B5A2B] text-white' }],
          });
        }}
      />

      <AdminMasterModal
        isOpen={adminMasterModalConfig.isOpen}
        type={adminMasterModalConfig.type}
        item={adminMasterModalConfig.item}
        categories={categories[adminMasterModalConfig.type] || []}
        onClose={() =>
          setAdminMasterModalConfig((prev) => ({ ...prev, isOpen: false, item: null }))
        }
        onSave={handleSaveItem}
        onDelete={handleDeleteItem}
      />

      <AdminSettingsModal
        isOpen={adminSettingsModalOpen}
        settings={settings}
        onClose={() => setAdminSettingsModalOpen(false)}
        onSave={handleSaveSettings}
      />

      <AdminContactModal
        isOpen={adminContactModalOpen}
        contact={contact}
        onClose={() => setAdminContactModalOpen(false)}
        onSave={handleSaveContact}
      />
    </div>
  );
}
