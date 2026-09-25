import { AccountItem, HomeGalleries, SiteCategories, SiteContact, SiteSettings } from '../types.ts';

export const defaultSettings: SiteSettings = {
  shopName: '  ♡  ׅ  ⌗ mednun ⋆.ഒ ࣪˖ ⭐️💗',
  logoUrl: 'https://i.ibb.co/BHSXytv0/Untitled-Artwork.jpg',
  heroImg: 'https://i.ibb.co/whdMjTzw/att-Uhu-Ra2pqh-Ox-Od9-YKBg88-HBMCWjg-STWRxfn-PYzr-Y4-Zo-A.jpg',
  shopStatus: 'OPEN',
  welcomeTitle: 'Welcome to mednun store',
  welcomeSubtitle: 'ปล่อยเช่ารหัส  Free Fire , บริการอื่นๆ ( ส่งเองทุกตัว ) อื่นๆสอบถามได้เลยค่ะ',
  welcomeModalImg: 'https://i.ibb.co/MxTMfT4C/att-Uhu-Ra2pqh-Ox-Od9-YKBg88-HBMCWjg-STWRxfn-PYzr-Y4-Zo-A.jpg',
  musicUrl: 'https://files.catbox.moe/6u4f5b.mp4',
  playlist: [
    { name: 'Mednun Cute Theme (Original)', url: 'https://files.catbox.moe/6u4f5b.mp4' },
    { name: 'SoundHelix Chill Track', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }
  ],
  tabNames: {
    tab0: 'หน้าแรก',
    tab1: 'เช่ารหัส(FF)',
    tab2: 'บริการอื่นๆ',
    tab3: 'แอคร้าน',
    tab4: 'ติดต่อเรา'
  }
};

export const defaultContact: SiteContact = {
  fb: 'https://www.facebook.com/share/19JftdJvFq/?mibextid=wwXIfr',
  line: 'https://line.me/ti/p/2Zwn27Pls6',
  tiktok: 'https://www.tiktok.com/@mednun_47?_r=1&_t=ZS-99dejMXareK',
  ig: 'https://www.instagram.com/imnunkus_?stkn=YmgzNWpzeTdwNXg%3D&utm_source=qr',
  img: 'https://i.ibb.co/gMNN72tR/att-0o-P52-V4bycx-W33n4-Yar7-JSJog-KC-Rx-R6-XGE1m-Wt-SUps.jpg'
};

export const defaultCategories: SiteCategories = {
  rentFF: [
    { id: 'hot', name: '<i class="fa-solid fa-fire text-[#FFD700] mr-1"></i> ตัว Hot ทางร้าน' },
    { id: 'cheap7', name: 'ปืนเจ็ดเรทถูก' },
    { id: 'oldflag', name: 'ปักธงเก่า - ปักธงคู่' },
    { id: 'newflag', name: 'ปักธงใหม่' },
    { id: 'ss1', name: 'ปืนเจ็ด ss1' },
    { id: 'evo', name: 'ปืนเจ็ด evo / แร็คคู่' },
    { id: 'lv90', name: 'รหัส Lv.90+' },
    { id: 'skin590', name: 'รหัสมีสกิน 590 ดิจิม่อน' }
  ],
  rentROV: [
    { id: 'hot', name: '<i class="fa-solid fa-fire text-[#FFD700] mr-1"></i> ตัว Hot ทางร้าน' },
    { id: 'rareskin', name: 'สกินแรร์เยอะ' },
    { id: 'fullhero', name: 'ฮีโร่ครบ' },
    { id: 'fullrune', name: 'รูนตัน' },
    { id: 'conqueror', name: 'แรงค์คอน' }
  ],
  sell: [
    { id: 'group', name: '<i class="fa-solid fa-layer-group text-[#FFD700] mr-1"></i> กลุ่มบล็อค VIP' },
    { id: 'acc', name: 'รหัสบอท FF' },
    { id: 'app', name: 'แอพพรีเมียม' }
  ]
};

export const defaultRentFF: AccountItem[] = [
  {
    id: '1',
    category: 'oldflag',
    title: '01 ⦅ ปักธงเก่า - ปักธงคู่ ⦆',
    status: 'ว่าง',
    statusClass: 'bg-[#FDFCF4] text-[#8A6F65]',
    img: 'https://placehold.co/400x400/FFF0F5/FF9EBB?text=ใส่รูปที่+1',
    rates: [{ label: '1 ชม. ฿180' }, { label: '2 ชม. ฿350' }, { label: 'เหมาวัน ฿800' }],
    note: '<strong class="text-[#FF9EBB]">ยันนอนเล่นได้ 8 ชม</strong> รหัสนี้รับแค่ยันนอนกับทั้งวันเท่านั้น'
  },
  {
    id: '2',
    category: 'hot',
    title: '02 ⦅ ปักธงเก่า - ใหม่ ⦆ (Hot)',
    status: 'ว่าง',
    statusClass: 'bg-[#FDFCF4] text-[#8A6F65]',
    img: 'https://placehold.co/400x400/FFF0F5/FF9EBB?text=ใส่รูปที่+2',
    rates: [{ label: '1 ชม. ฿170' }, { label: 'เหมาวัน ฿750' }],
    note: 'ยันนอนเล่นได้ 8 ชม'
  },
  {
    id: '3',
    category: 'newflag',
    title: '03 ⦅ ปักธงใหม่ ⦆',
    status: 'ไม่ว่าง',
    statusClass: 'bg-[#8B5A2B] text-white',
    img: 'https://placehold.co/400x400/FFF0F5/FF9EBB?text=ใส่รูปที่+3',
    rates: [{ label: '1 ชม. ฿180' }],
    note: 'ยันนอนเล่นได้ 8 ชม',
    rentStartTime: new Date().toISOString(),
    rentDuration: 2
  },
  {
    id: '4',
    category: 'cheap7',
    title: '04 ⦅ ปืนเจ็ดเรทถูก ⦆',
    status: 'ว่าง',
    statusClass: 'bg-[#FDFCF4] text-[#8A6F65]',
    img: 'https://placehold.co/400x400/FFF0F5/FF9EBB?text=ใส่รูปที่+4',
    rates: [{ label: '1 ชม. ฿160' }],
    note: 'ยันนอนเล่นได้ 8 ชม'
  }
];

export const defaultRentROV: AccountItem[] = [
  {
    id: 'rov1',
    category: 'hot',
    title: 'R01 ⦅ ROV ฮีโร่ครบ ⦆ (Hot)',
    status: 'ว่าง',
    statusClass: 'bg-[#FDFCF4] text-[#8A6F65]',
    img: 'https://placehold.co/400x400/FFF0F5/FF9EBB?text=ROV+1',
    rates: [{ label: '1 ชม. ฿100' }, { label: 'เหมาวัน ฿450' }],
    note: 'ส่งรหัสไว พร้อมเล่นทันที'
  },
  {
    id: 'rov2',
    category: 'rareskin',
    title: 'R02 ⦅ ROV สกินแรร์ ⦆',
    status: 'ว่าง',
    statusClass: 'bg-[#FDFCF4] text-[#8A6F65]',
    img: 'https://placehold.co/400x400/FFF0F5/FF9EBB?text=ROV+2',
    rates: [{ label: '1 ชม. ฿150' }],
    note: 'มีสกิน Limited ครบ'
  }
];

export const defaultSell: AccountItem[] = [
  {
    id: 's1',
    category: 'group',
    title: 'กลุ่มบล็อค VIP',
    description: '• ดึงเข้ากลุ่มทันทีหลังโอน\n• มีบล็อคอัปเดตเรื่อยๆ',
    status: 'Sell',
    statusClass: 'text-[#8A6F65]',
    img: 'https://placehold.co/400x400/FFF0F5/FF9EBB?text=กลุ่มบล็อค',
    rates: [{ label: 'เข้ากลุ่มถาวร ฿150' }],
    note: 'ดึงเข้ากลุ่มทันทีหลังโอน'
  },
  {
    id: 's2',
    category: 'acc',
    title: 'รหัสบอท FF',
    description: '• รหัสสะอาด เปลี่ยนข้อมูลได้\n• เลเวล 20+',
    status: 'Sell',
    statusClass: 'text-[#8A6F65]',
    img: 'https://placehold.co/400x400/FFF0F5/FF9EBB?text=รหัสบอท',
    rates: [{ label: 'ซื้อขาด ฿300' }],
    note: 'รหัสสะอาด เปลี่ยนข้อมูลได้'
  },
  {
    id: 's3',
    category: 'app',
    title: 'Netflix Premium',
    description: '• จอส่วนตัว ดูได้ 1 จอ\n• ใช้งานได้ 30 วัน',
    status: 'Out',
    statusClass: 'text-[#FF9EBB]',
    img: 'https://placehold.co/400x400/FFF0F5/FF9EBB?text=Netflix',
    rates: [{ label: '30 วัน ฿120' }],
    note: 'ห้ามเปลี่ยนรหัสผ่าน'
  }
];

export const defaultGalleries: HomeGalleries = {
  steps: [
    'https://i.ibb.co/whdMjTzw/att-Uhu-Ra2pqh-Ox-Od9-YKBg88-HBMCWjg-STWRxfn-PYzr-Y4-Zo-A.jpg',
    'https://i.ibb.co/fYRDBLTr/att-pn35mxqtm6-RPIz48-S8-RZ46-Ux8hf-Ziw44tqg6w-D7a-DXQ.jpg',
    'https://i.ibb.co/WvpjScs3/att-3-JWEreu-A21-M-9-LR2d-Of-OQGDv-Oal-Jh9cuug-ZXa4-HGUOQ.jpg'
  ],
  rules: [
    'https://i.ibb.co/3YdgWkK0/att-s-GIpklqc-Y626-Fok-Bm-Wzead-TKkd-GODut-Eca-Ks-V3r-Vld-U.jpg',
    'https://i.ibb.co/zVr3jLrm/att-y4-lqc9mzt0x-ZGu-XENq-Lf62-Lyh-Zk7-PF1jupikx-xepg.jpg'
  ]
};

export function calculateAvailableTimeStr(startStr?: string | null, hours?: string | number | null): string {
  if (!startStr || !hours) return '';
  const start = new Date(startStr);
  if (isNaN(start.getTime())) return '';
  const parsedHours = typeof hours === 'string' ? parseFloat(hours) : hours;
  if (isNaN(parsedHours)) return '';

  const end = new Date(start.getTime() + parsedHours * 60 * 60 * 1000);
  const today = new Date();
  const isToday =
    end.getDate() === today.getDate() &&
    end.getMonth() === today.getMonth() &&
    end.getFullYear() === today.getFullYear();

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isTomorrow =
    end.getDate() === tomorrow.getDate() &&
    end.getMonth() === tomorrow.getMonth() &&
    end.getFullYear() === tomorrow.getFullYear();

  const timeStr = end.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false });
  const dateStr = end.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });

  if (isToday) return `ว่างวันนี้ ${dateStr} เวลา ${timeStr} น.`;
  if (isTomorrow) return `ว่างพรุ่งนี้ ${dateStr} เวลา ${timeStr} น.`;
  return `ว่าง ${dateStr} เวลา ${timeStr} น.`;
}
