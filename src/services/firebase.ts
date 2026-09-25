import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc
} from 'firebase/firestore';
import {
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithCustomToken
} from 'firebase/auth';
import { AccountItem, HomeGalleries, SiteCategories, SiteContact, SiteSettings } from '../types.ts';

const firebaseConfig = {
  apiKey: "AIzaSyDm-zBLNwBT7mlvbZfP9ISqq-AJ1zozdxw",
  authDomain: "mednun-fff0d.firebaseapp.com",
  projectId: "mednun-fff0d",
  storageBucket: "mednun-fff0d.firebasestorage.app",
  messagingSenderId: "811759598797",
  appId: "1:811759598797:web:71056a5513c2944d923d84",
  measurementId: "G-VVBH7MEE3T"
};

let app: any = null;
let db: any = null;
let auth: any = null;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
  auth = getAuth(app);
} catch (e) {
  console.warn('Firebase init error (using offline mode):', e);
}

const artifactAppId = "mednun-fff0d";
const rentFFPath = `artifacts/${artifactAppId}/public/data/rentFF`;
const rentROVPath = `artifacts/${artifactAppId}/public/data/rentROV`;
const sellPath = `artifacts/${artifactAppId}/public/data/sellItems`;
const configPath = `artifacts/${artifactAppId}/public/data/config`;

export { auth, db };

export async function loginAdmin(email: string, pass: string): Promise<boolean> {
  // Support master admin passwords as well for convenience
  if ((email === 'admin' || email === 'admin@mednun.com' || email === 'mednun') && (pass === '123456' || pass === 'mednun123' || pass === 'admin123')) {
    return true;
  }
  if (!auth) return false;
  try {
    await signInWithEmailAndPassword(auth, email, pass);
    return true;
  } catch (error) {
    // If user entered standard admin credentials that are accepted locally
    if (pass === '123456' || pass === 'mednun123' || pass === 'admin123') {
      return true;
    }
    throw error;
  }
}

export function subscribeToFirebase(callbacks: {
  onRentFF: (data: AccountItem[]) => void;
  onRentROV: (data: AccountItem[]) => void;
  onSell: (data: AccountItem[]) => void;
  onConfig: (data: {
    siteSettings?: SiteSettings;
    siteContact?: SiteContact;
    homeGalleries?: HomeGalleries;
    siteCategories?: SiteCategories;
  }) => void;
  onSyncState: (status: 'loading' | 'success' | 'error', message?: string) => void;
}) {
  if (!db || !auth) {
    callbacks.onSyncState('success', 'ใช้งานโหมดออฟไลน์');
    return () => {};
  }

  let unsubs: Array<() => void> = [];

  const startListeners = () => {
    callbacks.onSyncState('loading', 'กำลังดึงข้อมูลล่าสุด...');
    let syncCount = 0;
    const checkDone = () => {
      syncCount++;
      if (syncCount >= 4) {
        callbacks.onSyncState('success', 'ข้อมูลอัปเดตเรียบร้อย');
      }
    };

    try {
      const unsub1 = onSnapshot(
        collection(db, rentFFPath),
        (snapshot) => {
          const items: AccountItem[] = [];
          snapshot.forEach((docSnap) => {
            if (docSnap.id !== '_metadata') {
              items.push({ id: docSnap.id, ...(docSnap.data() as any) });
            }
          });
          if (items.length > 0) callbacks.onRentFF(items);
          checkDone();
        },
        (err) => {
          console.warn('RentFF snapshot error:', err);
          checkDone();
        }
      );
      unsubs.push(unsub1);

      const unsub2 = onSnapshot(
        collection(db, rentROVPath),
        (snapshot) => {
          const items: AccountItem[] = [];
          snapshot.forEach((docSnap) => {
            if (docSnap.id !== '_metadata') {
              items.push({ id: docSnap.id, ...(docSnap.data() as any) });
            }
          });
          if (items.length > 0) callbacks.onRentROV(items);
          checkDone();
        },
        (err) => {
          console.warn('RentROV snapshot error:', err);
          checkDone();
        }
      );
      unsubs.push(unsub2);

      const unsub3 = onSnapshot(
        collection(db, sellPath),
        (snapshot) => {
          const items: AccountItem[] = [];
          snapshot.forEach((docSnap) => {
            if (docSnap.id !== '_metadata') {
              items.push({ id: docSnap.id, ...(docSnap.data() as any) });
            }
          });
          if (items.length > 0) callbacks.onSell(items);
          checkDone();
        },
        (err) => {
          console.warn('Sell snapshot error:', err);
          checkDone();
        }
      );
      unsubs.push(unsub3);

      const unsub4 = onSnapshot(
        doc(db, configPath, 'global'),
        (docSnap) => {
          if (docSnap.exists()) {
            callbacks.onConfig(docSnap.data() as any);
          }
          checkDone();
        },
        (err) => {
          console.warn('Config snapshot error:', err);
          checkDone();
        }
      );
      unsubs.push(unsub4);
    } catch (e) {
      console.warn('Firebase snapshot setup exception:', e);
      callbacks.onSyncState('success', 'ใช้งานโหมดแคช');
    }
  };

  const initialAuth = async () => {
    try {
      if ((window as any).__initial_auth_token) {
        await signInWithCustomToken(auth, (window as any).__initial_auth_token);
      } else {
        await signInAnonymously(auth);
      }
      startListeners();
    } catch (authErr) {
      console.warn('Anonymous sign-in error:', authErr);
      callbacks.onSyncState('success', 'ใช้งานโหมดออฟไลน์');
    }
  };

  initialAuth();

  return () => {
    unsubs.forEach((unsub) => unsub());
  };
}

export async function saveItemToFirestore(type: 'rentFF' | 'rentROV' | 'sell', item: AccountItem) {
  if (!db) return;
  let path = '';
  if (type === 'rentFF') path = rentFFPath;
  if (type === 'rentROV') path = rentROVPath;
  if (type === 'sell') path = sellPath;

  try {
    await setDoc(doc(db, path, String(item.id)), item, { merge: true });
    await setDoc(doc(db, path, '_metadata'), { initialized: true }, { merge: true });
  } catch (e) {
    console.error('Error saving item to firestore:', e);
  }
}

export async function deleteItemFromFirestore(type: 'rentFF' | 'rentROV' | 'sell', id: string) {
  if (!db) return;
  let path = '';
  if (type === 'rentFF') path = rentFFPath;
  if (type === 'rentROV') path = rentROVPath;
  if (type === 'sell') path = sellPath;

  try {
    await deleteDoc(doc(db, path, String(id)));
    await setDoc(doc(db, path, '_metadata'), { initialized: true }, { merge: true });
  } catch (e) {
    console.error('Error deleting item from firestore:', e);
  }
}

export async function saveGlobalConfigToFirestore(data: {
  siteSettings?: SiteSettings;
  siteContact?: SiteContact;
  homeGalleries?: HomeGalleries;
  siteCategories?: SiteCategories;
}) {
  if (!db) return;
  try {
    await setDoc(doc(db, configPath, 'global'), data, { merge: true });
  } catch (e) {
    console.error('Error saving config to firestore:', e);
  }
}
