export interface Profile {
  id: string;
  name: string;
  title: string;
  category: 'masoz' | 'masor' | 'salon' | 'spa';
  categoryName: string;
  age: number;
  height: number;
  weight: number;
  city: string;
  citySlug: string;
  district: string;
  neighborhood?: string;
  packageType: 'DIAMOND' | 'PREMIUM' | 'GOLD' | 'SILVER';
  price: number;
  phone: string;
  whatsapp: string;
  coverPhoto: string;
  galleryPhotos?: string[];
  videoUrl?: string;
  services: string[];
  workDays?: string[];
  workingHours?: string;
  bio: string;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  isAvailable: boolean;
  isVerified: boolean;
  isPublished: boolean;
  viewCount?: number;
}

const STORAGE_KEY = 'tmv_database_profiles_store_permanent';
const BACKUP_KEY = 'tmv_profiles';

const DEFAULT_PROFILES: Profile[] = [
  { id: 'p1', name: 'Masöz Asya', title: 'VIP Bireysel Masöz & Spa Terapisti', category: 'masoz', categoryName: 'Bireysel Masöz', age: 24, height: 168, weight: 52, city: 'İzmir', citySlug: 'izmir', district: 'Konak', neighborhood: 'Alsancak', packageType: 'DIAMOND', price: 3500, phone: '05403225555', whatsapp: '05403225555', coverPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80', services: ['Tantra Masajı', 'Relax Masaj', 'Nuru Masajı'], workingHours: '10:00 - 02:00', bio: 'Alsancak kendi lüks ve hijyenik yerimde VIP masaj hizmeti sunuyorum.', isAvailable: true, isVerified: true, isPublished: true, viewCount: 1250 },
  { id: 'p2', name: 'Masöz Maya', title: 'Profesyonel Terapi Uzmanı', category: 'masoz', categoryName: 'Bireysel Masöz', age: 26, height: 172, weight: 56, city: 'İzmir', citySlug: 'izmir', district: 'Konak', neighborhood: 'Kordon', packageType: 'DIAMOND', price: 4000, phone: '05403225555', whatsapp: '05403225555', coverPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', services: ['Erotik Masaj', 'Aromaterapi Masajı', 'Sıcak Taş Masajı'], workingHours: '12:00 - 03:00', bio: 'Kordon manzaralı özel dairemde huzurlu ve kaliteli terapi.', isAvailable: true, isVerified: true, isPublished: true, viewCount: 980 },
  { id: 'p3', name: 'Masöz Melis', title: 'Lüks Relax Masajı', category: 'masoz', categoryName: 'Bireysel Masöz', age: 23, height: 165, weight: 50, city: 'İzmir', citySlug: 'izmir', district: 'Karşıyaka', neighborhood: 'Bostanlı', packageType: 'PREMIUM', price: 3000, phone: '05403225555', whatsapp: '05403225555', coverPhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', services: ['Klasik İsveç Masajı', 'Relax Masaj'], workingHours: '11:00 - 01:00', bio: 'Bostanlı nezih ortamımda profesyonel relax masajı.', isAvailable: true, isVerified: true, isPublished: true, viewCount: 650 },
  { id: 'p4', name: 'Masöz Derin', title: 'Tantra & VIP Özel Masaj', category: 'masoz', categoryName: 'Bireysel Masöz', age: 25, height: 170, weight: 54, city: 'İstanbul', citySlug: 'istanbul', district: 'Şişli', neighborhood: 'Nişantaşı', packageType: 'DIAMOND', price: 5000, phone: '05403225555', whatsapp: '05403225555', coverPhoto: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80', services: ['Tantra Masajı', 'VIP Özel Terapi', 'Jakuzi & Spa Keyfi'], workingHours: '10:00 - 04:00', bio: 'Nişantaşı rezidansta jakuzili VIP terapi hizmeti.', isAvailable: true, isVerified: true, isPublished: true, viewCount: 1420 },
  { id: 'p5', name: 'Masöz Ece', title: 'Medikal & Aromaterapi', category: 'masoz', categoryName: 'Bireysel Masöz', age: 27, height: 167, weight: 53, city: 'İstanbul', citySlug: 'istanbul', district: 'Kadıköy', neighborhood: 'Moda', packageType: 'PREMIUM', price: 3500, phone: '05403225555', whatsapp: '05403225555', coverPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80', services: ['Medikal Masaj', 'Aromaterapi Masajı'], workingHours: '10:00 - 23:00', bio: 'Moda sahilinde medikal rahatlama masajı.', isAvailable: true, isVerified: true, isPublished: true, viewCount: 780 },
  { id: 'p6', name: 'Masöz Lara', title: 'Antalya VIP Terapi', category: 'masoz', categoryName: 'Bireysel Masöz', age: 24, height: 171, weight: 55, city: 'Antalya', citySlug: 'antalya', district: 'Muratpaşa', neighborhood: 'Lara', packageType: 'DIAMOND', price: 4000, phone: '05403225555', whatsapp: '05403225555', coverPhoto: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80', services: ['Tantra Masajı', 'Sıcak Yağ Masajı', 'Nuru Masajı'], workingHours: '12:00 - 02:00', bio: 'Lara bölgesinde lüks dairemde hizmet sunuyorum.', isAvailable: true, isVerified: true, isPublished: true, viewCount: 1100 }
];

export const getProfilesFromStorage = (): Profile[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(BACKUP_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {}

  // Yalnızca hiç kayıt yoksa varsayılanı yükle
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROFILES));
  localStorage.setItem(BACKUP_KEY, JSON.stringify(DEFAULT_PROFILES));
  return DEFAULT_PROFILES;
};

export const saveProfilesToStorage = (profiles: Profile[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    localStorage.setItem(BACKUP_KEY, JSON.stringify(profiles));
    localStorage.setItem('tmv_custom_profiles_saved', 'true');
    window.dispatchEvent(new Event('tmv_storage_updated'));
  } catch (e) {}
};
