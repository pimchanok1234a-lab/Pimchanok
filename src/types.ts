export interface RateItem {
  label: string;
}

export interface AccountItem {
  id: string;
  category: string;
  title: string;
  status: string; // 'ว่าง' | 'ไม่ว่าง' | 'Sell' | 'Out'
  statusClass?: string;
  img: string;
  rates: RateItem[];
  note?: string;
  description?: string; // used for sell items
  rentStartTime?: string | null;
  rentDuration?: string | number | null;
}

export interface CategoryItem {
  id: string;
  name: string;
}

export interface SiteCategories {
  rentFF: CategoryItem[];
  rentROV: CategoryItem[];
  sell: CategoryItem[];
}

export interface PlaylistItem {
  name: string;
  url: string;
}

export interface TabNames {
  tab0: string; // หน้าแรก
  tab1: string; // เช่ารหัส(FF)
  tab2: string; // บริการอื่นๆ
  tab3: string; // แอคร้าน
  tab4: string; // ติดต่อเรา
}

export interface SiteSettings {
  shopName: string;
  logoUrl: string;
  heroImg?: string;
  shopStatus: 'OPEN' | 'CLOSED';
  welcomeTitle: string;
  welcomeSubtitle: string;
  welcomeModalImg: string;
  musicUrl: string;
  playlist: PlaylistItem[];
  tabNames?: TabNames;
}

export interface SiteContact {
  fb: string;
  line: string;
  tiktok: string;
  ig: string;
  img: string;
}

export interface HomeGalleries {
  steps: string[];
  rules: string[];
}

export interface DialogButton {
  text: string;
  className?: string;
  onClick?: (promptValue?: string) => void;
}

export interface DialogConfig {
  title: string;
  message: string;
  isPrompt?: boolean;
  promptPlaceholder?: string;
  promptValue?: string;
  buttons: DialogButton[];
}

export type TabIndex = 0 | 1 | 2 | 3 | 4;
export type ItemType = 'rentFF' | 'rentROV' | 'sell';
