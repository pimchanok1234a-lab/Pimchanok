import React, { useState } from 'react';
import { SiteSettings, PlaylistItem } from '../types.ts';

interface AdminSettingsModalProps {
  isOpen: boolean;
  settings: SiteSettings;
  onClose: () => void;
  onSave: (newSettings: SiteSettings) => void;
}

export const AdminSettingsModal: React.FC<AdminSettingsModalProps> = ({
  isOpen,
  settings,
  onClose,
  onSave,
}) => {
  const [shopName, setShopName] = useState(settings.shopName);
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl);
  const [shopStatus, setShopStatus] = useState(settings.shopStatus);
  const [welcomeTitle, setWelcomeTitle] = useState(settings.welcomeTitle);
  const [welcomeSubtitle, setWelcomeSubtitle] = useState(settings.welcomeSubtitle);
  const [welcomeModalImg, setWelcomeModalImg] = useState(settings.welcomeModalImg);
  const [musicUrl, setMusicUrl] = useState(settings.musicUrl);
  const [playlist, setPlaylist] = useState<PlaylistItem[]>(settings.playlist || []);

  const [newSongName, setNewSongName] = useState('');
  const [newSongUrl, setNewSongUrl] = useState('');

  if (!isOpen) return null;

  const handleAddSong = () => {
    if (!newSongName.trim() || !newSongUrl.trim()) {
      alert('กรุณากรอกทั้งชื่อเพลงและลิงก์เพลง');
      return;
    }
    const updated = [...playlist, { name: newSongName.trim(), url: newSongUrl.trim() }];
    setPlaylist(updated);
    setMusicUrl(newSongUrl.trim());
    setNewSongName('');
    setNewSongUrl('');
  };

  const handleDeleteSong = (url: string) => {
    const updated = playlist.filter((p) => p.url !== url);
    setPlaylist(updated);
    if (musicUrl === url) {
      setMusicUrl(updated[0]?.url || '');
    }
  };

  const handleSave = () => {
    onSave({
      shopName,
      logoUrl,
      shopStatus,
      welcomeTitle,
      welcomeSubtitle,
      welcomeModalImg,
      musicUrl,
      playlist,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[800] flex items-center justify-center p-3">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="bg-white border-[3px] border-[#FFE4EC] rounded-[28px] p-5 w-full max-w-[380px] relative z-10 shadow-2xl animate-pop max-h-[90vh] overflow-y-auto custom-scrollbar text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 bg-[#FFF0F5] rounded-full flex items-center justify-center text-[#8B5A2B] hover:bg-[#FFE4EC] transition-colors shadow-sm cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>

        <h3 className="text-[#8B5A2B] font-bold text-sm mb-4 border-b border-dashed border-[#FFE4EC] pb-2 flex items-center gap-2">
          <i className="fa-solid fa-sliders"></i>
          ตั้งค่าข้อมูลร้านค้า
        </h3>

        <div className="space-y-3">
          {/* Shop Name */}
          <div>
            <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">ชื่อร้าน</label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
            />
          </div>

          {/* Shop Status Toggle */}
          <div>
            <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">
              สถานะเปิด/ปิดร้าน
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setShopStatus('OPEN')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  shopStatus === 'OPEN'
                    ? 'bg-emerald-500 text-white shadow-sm ring-2 ring-emerald-200'
                    : 'bg-[#FFFDF4] text-[#8A6F65] border border-[#FFE4EC]'
                }`}
              >
                <i className="fa-solid fa-store mr-1.5"></i> เปิดร้าน (OPEN)
              </button>
              <button
                type="button"
                onClick={() => setShopStatus('CLOSED')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  shopStatus === 'CLOSED'
                    ? 'bg-rose-500 text-white shadow-sm ring-2 ring-rose-200'
                    : 'bg-[#FFFDF4] text-[#8A6F65] border border-[#FFE4EC]'
                }`}
              >
                <i className="fa-solid fa-lock mr-1.5"></i> ปิดร้าน (CLOSED)
              </button>
            </div>
          </div>

          {/* Logo URL */}
          <div>
            <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">
              โลโก้ร้าน (Logo Image URL)
            </label>
            <input
              type="text"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
            />
          </div>

          {/* Welcome Modal Image */}
          <div>
            <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">
              รูปแบนเนอร์ป็อปอัพต้อนรับ
            </label>
            <input
              type="text"
              value={welcomeModalImg}
              onChange={(e) => setWelcomeModalImg(e.target.value)}
              className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
            />
          </div>

          {/* Welcome Title */}
          <div>
            <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">
              ข้อความหัวข้อหน้าแรก
            </label>
            <input
              type="text"
              value={welcomeTitle}
              onChange={(e) => setWelcomeTitle(e.target.value)}
              className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
            />
          </div>

          {/* Welcome Subtitle */}
          <div>
            <label className="text-[11px] font-bold text-[#6B4C42] block mb-1">
              ข้อความคำอธิบายหน้าแรก
            </label>
            <textarea
              rows={2}
              value={welcomeSubtitle}
              onChange={(e) => setWelcomeSubtitle(e.target.value)}
              className="w-full bg-[#FFFDF4] border border-[#FFE4EC] rounded-xl px-3 py-2 text-xs text-[#6B4C42] outline-none focus:border-[#FF9EBB]"
            />
          </div>

          {/* Background Music Selector & Playlist */}
          <div className="bg-[#FFF8E7] p-3 rounded-2xl border border-[#FFE4EC] space-y-2">
            <span className="text-[11px] font-extrabold text-[#8B5A2B] block">
              <i className="fa-solid fa-music mr-1"></i> เพลงพื้นหลัง (BGM Playlist)
            </span>

            <div>
              <label className="text-[10px] text-[#8A6F65] block mb-0.5">เลือกเพลงที่เล่น:</label>
              <select
                value={musicUrl}
                onChange={(e) => setMusicUrl(e.target.value)}
                className="w-full bg-white border border-[#FFE4EC] rounded-lg px-2 py-1.5 text-xs text-[#6B4C42]"
              >
                {playlist.map((song, i) => (
                  <option key={i} value={song.url}>
                    {song.name}
                  </option>
                ))}
              </select>
            </div>

            {/* List of current songs */}
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {playlist.map((song, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white px-2 py-1 rounded text-[10px] border border-[#FFE4EC]"
                >
                  <span className="truncate max-w-[200px] text-[#6B4C42] font-medium">
                    {song.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteSong(song.url)}
                    className="text-red-400 hover:text-red-600 ml-2"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>

            {/* Add new song */}
            <div className="pt-2 border-t border-dashed border-[#FFE4EC] space-y-1.5">
              <span className="text-[10px] font-bold text-[#8B5A2B] block">+ เพิ่มเพลงใหม่</span>
              <input
                type="text"
                placeholder="ชื่อเพลง เช่น Song 1"
                value={newSongName}
                onChange={(e) => setNewSongName(e.target.value)}
                className="w-full bg-white border border-[#FFE4EC] rounded-lg px-2 py-1 text-[11px]"
              />
              <input
                type="text"
                placeholder="URL ไฟล์เสียง .mp3 / .mp4"
                value={newSongUrl}
                onChange={(e) => setNewSongUrl(e.target.value)}
                className="w-full bg-white border border-[#FFE4EC] rounded-lg px-2 py-1 text-[11px]"
              />
              <button
                type="button"
                onClick={handleAddSong}
                className="w-full bg-[#FF9EBB] hover:bg-[#D9779B] text-white py-1 rounded-lg text-[10px] font-bold transition-colors"
              >
                เพิ่มเข้าเพลย์ลิสต์
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleSave}
              className="w-full bg-[#8B5A2B] hover:bg-[#6D441D] text-white font-bold py-2.5 rounded-xl text-xs transition-all active:scale-98 shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-floppy-disk text-xs"></i>
              <span>บันทึกการตั้งค่าร้าน</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
