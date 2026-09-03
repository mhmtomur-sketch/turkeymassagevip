const CLOUD_API = 'https://kvdb.io/6E3UqX9Hj4zR8T9/tmv_profiles_v1';

// Buluttan otomatik veri çekme (Mobil ve Farklı Cihazlar İçin)
if (typeof window !== 'undefined') {
  fetch(CLOUD_API)
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        localStorage.setItem('tmv_profiles', JSON.stringify(data));
        localStorage.setItem('tmv_database_profiles_store_permanent', JSON.stringify(data));
        window.dispatchEvent(new Event('tmv_storage_updated'));
      }
    })
    .catch(() => {});
}
import { Profile } from '../types';

export const DISPLAY_WHATSAPP_NUMBER = '05403225555';
export const DISPLAY_PHONE_NUMBER = '05403225555';
export const PUBLIC_WHATSAPP_NUMBER = '05403225555';

export const DEFAULT_PACKAGES_MAP: any = {
  DIAMOND: {
    id: 'pkg-diamond',
    name: 'Diamond VIP',
    slug: 'diamond',
    packageType: 'DIAMOND',
    price: 4000,
    durationDays: 30,
    features: ['1. Sırada Sabit Listeleme', 'WhatsApp & Telefon Entegrasyonu', 'Otomatik Video Oynatma', 'Canlı Rozet & Müsaitlik'],
    isPopular: true
  },
  PREMIUM: {
    id: 'pkg-premium',
    name: 'Gold Premium',
    slug: 'premium',
    packageType: 'PREMIUM',
    price: 3000,
    durationDays: 30,
    features: ['2. Sırada Listeleme', 'WhatsApp & Telefon Entegrasyonu', 'Fotoğraf Galerisi'],
    isPopular: false
  },
  GOLD: {
    id: 'pkg-gold',
    name: 'Gold VIP',
    slug: 'gold',
    packageType: 'GOLD',
    price: 2500,
    durationDays: 30,
    features: ['3. Sırada Listeleme', 'WhatsApp Entegrasyonu'],
    isPopular: false
  },
  SILVER: {
    id: 'pkg-silver',
    name: 'Silver Standard',
    slug: 'silver',
    packageType: 'SILVER',
    price: 2000,
    durationDays: 30,
    features: ['Standart Listeleme', 'Detay Sayfası'],
    isPopular: false
  }
};

const pkgsHybrid: any = [
  DEFAULT_PACKAGES_MAP.DIAMOND,
  DEFAULT_PACKAGES_MAP.PREMIUM,
  DEFAULT_PACKAGES_MAP.GOLD,
  DEFAULT_PACKAGES_MAP.SILVER
];
pkgsHybrid.DIAMOND = DEFAULT_PACKAGES_MAP.DIAMOND;
pkgsHybrid.PREMIUM = DEFAULT_PACKAGES_MAP.PREMIUM;
pkgsHybrid.GOLD = DEFAULT_PACKAGES_MAP.GOLD;
pkgsHybrid.SILVER = DEFAULT_PACKAGES_MAP.SILVER;

export const DEFAULT_PACKAGES = pkgsHybrid;

export const ALL_INITIAL_PROFILES: Profile[] = [
  // 1-6 DIAMOND VIP
  {
    id: 'dm-1',
    name: 'Masöz Maya',
    slug: 'masoz-maya-izmir',
    title: 'Profesyonel Bireysel Masöz & VIP Spa Terapisti',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'İzmir',
    citySlug: 'izmir',
    district: 'Alsancak',
    packageType: 'DIAMOND',
    price: 3500,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1'
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    bio: 'İzmir Alsancak kendi lüks ve hijyenik yerimde medikal, aromaterapi, tantra ve klasik relax masaj hizmeti sunuyorum.',
    services: ['Tantra Masajı', 'Erotik Masaj', 'Relax Masaj', 'Aromaterapi', 'Türk Hamamı'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 420
  },
  {
    id: 'dm-2',
    name: 'Masöz Selin',
    slug: 'masoz-selin-izmir',
    title: 'VIP Tantra & Aromaterapi Uzmanı',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'İzmir',
    citySlug: 'izmir',
    district: 'Konak',
    packageType: 'DIAMOND',
    price: 3500,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9'
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    bio: 'Konak bölgesinde kendi nezih ve lüks ortamımda VIP standartlarda masaj seansları sunuyorum.',
    services: ['Tantra Masajı', 'Nuru Masajı', 'Aromaterapi', 'Sıcak Taş Masajı'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 380
  },
  {
    id: 'dm-3',
    name: 'Masöz Derin',
    slug: 'masoz-derin-istanbul',
    title: 'Lüks Rezidans VIP Masaj Terapisti',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'İstanbul',
    citySlug: 'istanbul',
    district: 'Şişli',
    packageType: 'DIAMOND',
    price: 4000,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb'
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    bio: 'Şişli Bomonti lüks rezidansta hijyenik, duşlu ve jakuzili ortamda unutulmaz terapi deneyimi.',
    services: ['Tantra Masajı', 'Erotik Masaj', 'Relax Masaj', 'Jakuzi & Spa Keyfi'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 510
  },
  {
    id: 'dm-4',
    name: 'Masöz Alya',
    slug: 'masoz-alya-ankara',
    title: 'Sertifikalı Medikal & Relax Masaj Terapisti',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'Ankara',
    citySlug: 'ankara',
    district: 'Çankaya',
    packageType: 'DIAMOND',
    price: 3500,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    bio: 'Çankaya Gaziosmanpaşa mevkiinde günün yorgunluğunu unutturan özel masaj terapileri.',
    services: ['Medikal Masaj', 'Derin Doku Masajı', 'Relax Masaj', 'Aromaterapi'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 390
  },
  {
    id: 'dm-5',
    name: 'Masöz Melis',
    slug: 'masoz-melis-antalya',
    title: 'VIP Relax & Aromaterapi Uzmanı',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'Antalya',
    citySlug: 'antalya',
    district: 'Muratpaşa',
    packageType: 'DIAMOND',
    price: 3500,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    bio: 'Lara bölgesinde deniz manzaralı huzurlu ortamda kişiye özel masaj seansları.',
    services: ['Tantra Masajı', 'Erotik Masaj', 'Relax Masaj', 'Sıcak Yağ Masajı'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 460
  },
  {
    id: 'dm-6',
    name: 'Masör Levent',
    slug: 'masor-levent-izmir',
    title: 'Bireysel Masör & Medikal Masaj Terapisti',
    category: 'masor',
    categoryName: 'Bireysel Masör',
    city: 'İzmir',
    citySlug: 'izmir',
    district: 'Karşıyaka',
    packageType: 'DIAMOND',
    price: 3000,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    bio: 'Karşıyaka ve Alsancak bölgesinde profesyonel medikal masaj ve sporcu terapileri.',
    services: ['Medikal Masaj', 'Derin Doku Masajı', 'Relax Masaj', 'Klasik İsveç Masajı'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 540
  },

  // 7-12 GOLD PREMIUM
  {
    id: 'pr-1',
    name: 'Masöz Ece',
    slug: 'masoz-ece-bursa',
    title: 'Gold Premium Masaj & Hamam Uzmanı',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'Bursa',
    citySlug: 'bursa',
    district: 'Nilüfer',
    packageType: 'PREMIUM',
    price: 3000,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    photos: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb'],
    bio: 'Nilüfer FSM Bulvarı yakınında hijyenik ve modern stüdyoda özel relax seansları.',
    services: ['Relax Masaj', 'Aromaterapi', 'Türk Hamamı', 'Kese & Köpük'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 310
  },
  {
    id: 'pr-2',
    name: 'Masöz Simge',
    slug: 'masoz-simge-izmir',
    title: 'Aromaterapi & Klasik Terapi Terapisti',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'İzmir',
    citySlug: 'izmir',
    district: 'Bornova',
    packageType: 'PREMIUM',
    price: 3000,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    photos: ['https://images.unsplash.com/photo-1517841905240-472988babdf9'],
    bio: 'Bornova Küçükpark mevkiinde kendi nezih dairemde rahatlatıcı masaj.',
    services: ['Relax Masaj', 'Aromaterapi', 'Klasik İsveç Masajı'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 290
  },
  {
    id: 'pr-3',
    name: 'Masöz Tuğçe',
    slug: 'masoz-tugce-istanbul',
    title: 'Kadıköy VIP Masöz & Spa Terapisti',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'İstanbul',
    citySlug: 'istanbul',
    district: 'Kadıköy',
    packageType: 'PREMIUM',
    price: 3500,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
    photos: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1'],
    bio: 'Bağdat Caddesi civarında sessiz, sakin ve kaliteli ortam.',
    services: ['Tantra Masajı', 'Relax Masaj', 'Aromaterapi'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 340
  },
  {
    id: 'pr-4',
    name: 'Masöz Gamze',
    slug: 'masoz-gamze-antalya',
    title: 'Alanya VIP Terapi & Masaj Terapisti',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'Antalya',
    citySlug: 'antalya',
    district: 'Alanya',
    packageType: 'PREMIUM',
    price: 3000,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    photos: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2'],
    bio: 'Alanya Kleopatra plajı yakınında özel vip hizmet.',
    services: ['Tantra Masajı', 'Erotik Masaj', 'Relax Masaj'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 270
  },
  {
    id: 'pr-5',
    name: 'Masöz Pelin',
    slug: 'masoz-pelin-mugla',
    title: 'Bodrum Lüks Villa Masaj Terapisti',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'Muğla',
    citySlug: 'mugla',
    district: 'Bodrum',
    packageType: 'PREMIUM',
    price: 4000,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    photos: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330'],
    bio: 'Bodrum merkez ve Yalıkavak villalara özel VIP masaj servisi.',
    services: ['Aromaterapi', 'Sıcak Yağ Masajı', 'Relax Masaj'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 410
  },
  {
    id: 'pr-6',
    name: 'Masöz Aslı',
    slug: 'masoz-asli-aydin',
    title: 'Kuşadası VIP Spa & Relax Masöz',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'Aydın',
    citySlug: 'aydin',
    district: 'Kuşadası',
    packageType: 'PREMIUM',
    price: 3000,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    photos: ['https://images.unsplash.com/photo-1517841905240-472988babdf9'],
    bio: 'Kuşadası marina bölgesinde kendi yerimde huzur dolu masaj keyfi.',
    services: ['Relax Masaj', 'Aromaterapi', 'Türk Hamamı'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 260
  },

  // 13-18 GOLD VIP
  {
    id: 'gd-1',
    name: 'Masöz Buse',
    slug: 'masoz-buse-izmir',
    title: 'Standart Gold Masaj Terapisti',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'İzmir',
    citySlug: 'izmir',
    district: 'Bayraklı',
    packageType: 'GOLD',
    price: 2500,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    photos: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb'],
    bio: 'Bayraklı Manavkuyu bölgesinde kaliteli ve hijyenik masaj seansları.',
    services: ['Relax Masaj', 'Aromaterapi'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 220
  },
  {
    id: 'gd-2',
    name: 'Masöz İrem',
    slug: 'masoz-irem-istanbul',
    title: 'Beşiktaş VIP Masöz & Terapist',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'İstanbul',
    citySlug: 'istanbul',
    district: 'Beşiktaş',
    packageType: 'GOLD',
    price: 3000,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
    photos: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1'],
    bio: 'Beşiktaş merkezde nezih ortamda özel masaj randevusu.',
    services: ['Relax Masaj', 'Klasik İsveç Masajı'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 280
  },
  {
    id: 'gd-3',
    name: 'Masöz Ezgi',
    slug: 'masoz-ezgi-ankara',
    title: 'Tunalı VIP Masaj & Terapist',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'Ankara',
    citySlug: 'ankara',
    district: 'Tunalı',
    packageType: 'GOLD',
    price: 2500,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    photos: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2'],
    bio: 'Tunalı Hilmi Caddesi yakınında ferah ve konforlu daire.',
    services: ['Relax Masaj', 'Medikal Masaj'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 240
  },
  {
    id: 'gd-4',
    name: 'Masöz Damla',
    slug: 'masoz-damla-manisa',
    title: 'Manisa Bireysel Masaj Terapisti',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'Manisa',
    citySlug: 'manisa',
    district: 'Yunusemre',
    packageType: 'GOLD',
    price: 2500,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    photos: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330'],
    bio: 'Manisa Yunusemre merkezde profesyonel masaj uygulamaları.',
    services: ['Relax Masaj', 'Aromaterapi'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 190
  },
  {
    id: 'gd-5',
    name: 'Masöz Cansu',
    slug: 'masoz-cansu-eskisehir',
    title: 'Eskişehir Relax & Spa Terapisti',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'Eskişehir',
    citySlug: 'eskisehir',
    district: 'Tepebaşı',
    packageType: 'GOLD',
    price: 2500,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    photos: ['https://images.unsplash.com/photo-1517841905240-472988babdf9'],
    bio: 'Tepebaşı bölgesinde hijyenik masaj odası ve sıcak yağ seansları.',
    services: ['Relax Masaj', 'Sıcak Yağ Masajı'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 210
  },
  {
    id: 'gd-6',
    name: 'Masöz Nazlı',
    slug: 'masoz-nazli-denizli',
    title: 'Denizli VIP Masaj Terapisti',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'Denizli',
    citySlug: 'denizli',
    district: 'Pamukkale',
    packageType: 'GOLD',
    price: 2500,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
    photos: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1'],
    bio: 'Pamukkale merkezde rahatlatıcı terapi seansları.',
    services: ['Relax Masaj', 'Aromaterapi'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 180
  },

  // 19-24 SILVER STANDARD
  {
    id: 'sl-1',
    name: 'Masöz Nil',
    slug: 'masoz-nil-izmir',
    title: 'Silver Standard Masaj Terapisti',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'İzmir',
    citySlug: 'izmir',
    district: 'Buca',
    packageType: 'SILVER',
    price: 2000,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    photos: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2'],
    bio: 'Buca Şirinyer civarında ekonomik ve kaliteli relax masaj.',
    services: ['Relax Masaj'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 160
  },
  {
    id: 'sl-2',
    name: 'Masöz Zeynep',
    slug: 'masoz-zeynep-istanbul',
    title: 'Bakırköy Masaj Terapisti',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'İstanbul',
    citySlug: 'istanbul',
    district: 'Bakırköy',
    packageType: 'SILVER',
    price: 2500,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    photos: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb'],
    bio: 'Bakırköy İncirli caddesi yakınında klasik masaj.',
    services: ['Relax Masaj', 'Klasik İsveç Masajı'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 175
  },
  {
    id: 'sl-3',
    name: 'Masöz Hazal',
    slug: 'masoz-hazal-ankara',
    title: 'Yenimahalle Relax Masöz',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'Ankara',
    citySlug: 'ankara',
    district: 'Batıkent',
    packageType: 'SILVER',
    price: 2000,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    photos: ['https://images.unsplash.com/photo-1517841905240-472988babdf9'],
    bio: 'Batıkent Atlantis AVM civarında masaj hizmeti.',
    services: ['Relax Masaj'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 150
  },
  {
    id: 'sl-4',
    name: 'Masöz Derya',
    slug: 'masoz-derya-adana',
    title: 'Adana Seyhan Masaj Terapisti',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'Adana',
    citySlug: 'adana',
    district: 'Seyhan',
    packageType: 'SILVER',
    price: 2000,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
    photos: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1'],
    bio: 'Seyhan Gazipaşa bölgesinde dinlendirici masaj seansları.',
    services: ['Relax Masaj', 'Aromaterapi'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 140
  },
  {
    id: 'sl-5',
    name: 'Masöz Leyla',
    slug: 'masoz-leyla-gaziantep',
    title: 'Gaziantep Bireysel Masöz',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'Gaziantep',
    citySlug: 'gaziantep',
    district: 'Şehitkamil',
    packageType: 'SILVER',
    price: 2000,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    photos: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330'],
    bio: 'Şehitkamil İbrahimli mevkiinde özel relax terapi.',
    services: ['Relax Masaj'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 130
  },
  {
    id: 'sl-6',
    name: 'Masöz Merve',
    slug: 'masoz-merve-kktc',
    title: 'Girne VIP Spa & Relax Masöz',
    category: 'masoz',
    categoryName: 'Bireysel Masöz',
    city: 'KKTC',
    citySlug: 'kktc',
    district: 'Girne',
    packageType: 'SILVER',
    price: 3000,
    phone: '05403225555',
    whatsapp: '05403225555',
    coverPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    photos: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2'],
    bio: 'Kıbrıs Girne liman civarında otel ve kendi yerinde VIP masaj.',
    services: ['Relax Masaj', 'Aromaterapi'],
    isAvailable: true,
    isVerified: true,
    isPublished: true,
    viewCount: 230
  }
];

const STORAGE_KEY = 'tmv_database_profiles_store_permanent';

function initStore(): Profile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('tmv_profiles');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Store hatasi:', e);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ALL_INITIAL_PROFILES));
  return ALL_INITIAL_PROFILES;
}

export function slugifyTurkish(str: string): string {
  if (!str) return 'uye';
  return str
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export const db = {
  getProfiles: (): Profile[] => {
    return initStore();
  },

  getProfileById: (id: string): Profile | undefined => {
    return initStore().find((p) => p.id === id);
  },

  getProfileBySlug: (slug: string): Profile | undefined => {
    return initStore().find((p) => p.slug === slug);
  },

  saveProfile: (data: Partial<Profile>): Profile => {
    const profiles = initStore();
    const finalId = data.id || `profile-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const name = data.name?.trim() || 'Masöz';
    const city = data.city || 'İzmir';
    const citySlug = slugifyTurkish(city);
    const slug = data.slug || `${slugifyTurkish(name)}-${Date.now().toString().slice(-4)}`;

    const newProfile: Profile = {
      name,
      slug,
      title: data.title || 'Bireysel Masöz',
      category: data.category || 'masoz',
      categoryName: data.categoryName || 'Bireysel Masöz',
      city,
      citySlug,
      district: data.district || 'Alsancak',
      packageType: (data.packageType || 'DIAMOND').toUpperCase() as any,
      price: Number(data.price) || 3500,
      phone: data.phone || '05403225555',
      whatsapp: data.whatsapp || '05403225555',
      coverPhoto: data.coverPhoto || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
      photos: Array.isArray(data.photos) && data.photos.length > 0 ? data.photos : [data.coverPhoto || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'],
      videoUrl: data.videoUrl || '',
      bio: data.bio || `${city} ${data.district || ''} bölgesinde profesyonel relax ve masaj hizmeti.`,
      services: Array.isArray(data.services) && data.services.length > 0 ? data.services : ['Tantra Masajı', 'Erotik Masaj', 'Relax Masaj'],
      isAvailable: data.isAvailable !== false,
      isVerified: true,
      isPublished: true,
      viewCount: data.viewCount || 150,
      ...data,
      id: finalId
    };

    const existingIdx = profiles.findIndex((p) => p.id === finalId);
    let updated: Profile[];
    if (existingIdx >= 0) {
      updated = profiles.map((p, idx) => (idx === existingIdx ? newProfile : p));
    } else {
      updated = [newProfile, ...profiles];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem('tmv_profiles', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    return newProfile;
  },

  deleteProfile: (id: string): void => {
    const profiles = initStore().filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    localStorage.setItem('tmv_profiles', JSON.stringify(profiles));
    window.dispatchEvent(new Event('storage'));
  },

  toggleProfileVerified: (id: string): void => {
    const p = db.getProfileById(id);
    if (p) db.saveProfile({ ...p, isVerified: !p.isVerified });
  },

  toggleProfileAvailable: (id: string): void => {
    const p = db.getProfileById(id);
    if (p) db.saveProfile({ ...p, isAvailable: !p.isAvailable });
  },

  toggleProfilePublished: (id: string): void => {
    const p = db.getProfileById(id);
    if (p) db.saveProfile({ ...p, isPublished: !p.isPublished });
  },

  logEvent: (_event?: any): void => {},
  trackEvent: (_event?: any): void => {},
  getAnalyticsEvents: (): any[] => [],
  
  getPackages: (): any => pkgsHybrid,
  getPackageBySlug: (slug: string): any => DEFAULT_PACKAGES_MAP[slug.toUpperCase()] || DEFAULT_PACKAGES_MAP.DIAMOND,
  updatePackage: (pkg: any): any => pkg,

  getReviews: (_profileId?: string): any[] => [],
  getReviewsByProfileId: (_profileId?: string): any[] => [],
  addReview: (review: any): any => {
    const r = {
      id: `rev-${Date.now()}`,
      profileId: review.profileId || '',
      userName: review.userName || 'Misafir',
      rating: review.rating || 5,
      comment: review.comment || 'Harika bir masaj deneyimi.',
      isApproved: true,
      createdAt: new Date().toISOString(),
      ...review
    };
    return r;
  },
  approveReview: (_id: string, _status?: boolean): void => {},
  deleteReview: (_id: string): void => {},

  getReports: (): any[] => [],
  addReport: (_report: any): any => ({ id: `rep-${Date.now()}` }),
  deleteReport: (_id: string): void => {},
  resolveReport: (_id: string): void => {},
  updateReportStatus: (_id: string, _status?: any): void => {},

  getApplications: (): any[] => [],
  addApplication: (_app: any): any => ({ id: `app-${Date.now()}` }),
  approveApplication: (_id: string): void => {},
  deleteApplication: (_id: string): void => {},
  rejectApplication: (_id: string): void => {},
  updateApplicationStatus: (_id: string, _status?: any): void => {},

  getFavorites: (): string[] => [],
  toggleFavorite: (_id: string): void => {},
  isFavorite: (_id: string): boolean => false,

  exportBackup: (): string => {
    return JSON.stringify(initStore(), null, 2);
  },

  importBackup: (content: string): boolean => {
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        localStorage.setItem('tmv_profiles', JSON.stringify(parsed));
        window.dispatchEvent(new Event('storage'));
        return true;
      }
    } catch (e) {
      console.error('Yedek aktarilamadi:', e);
    }
    return false;
  },

  resetToDefaults: (): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ALL_INITIAL_PROFILES));
    localStorage.setItem('tmv_profiles', JSON.stringify(ALL_INITIAL_PROFILES));
    window.dispatchEvent(new Event('storage'));
  },

  getSettings: () => ({
    rotationEnabled: true,
    rotationInterval: 15,
    rotationIntervalSeconds: 15,
    sliderInterval: 10,
    sliderIntervalSeconds: 10,
    whatsappNumber: DISPLAY_WHATSAPP_NUMBER,
    phoneNumber: DISPLAY_PHONE_NUMBER,
    defaultWhatsappMessage: 'Merhaba, randevu almak istiyorum.',
    siteTitle: 'Turkey Massage VIP',
    seoMetaTitle: 'Turkey Massage VIP',
    seoMetaDescription: 'Türkiye Masaj & VIP Masöz Rehberi',
    seoMetaKeywords: 'masaj, masöz, spa, vip masaj'
  }),
  saveSettings: (s: any) => s,
  updateSettings: (s: any) => s,

  getOccupancy: (pkg: string) => {
    const profiles = initStore().filter((p) => (p.packageType || '').toUpperCase() === pkg.toUpperCase());
    const capacities: Record<string, number> = { DIAMOND: 10, PREMIUM: 20, GOLD: 30, SILVER: 30 };
    const cap = capacities[pkg.toUpperCase()] || 30;
    return {
      active: profiles.length,
      capacity: cap,
      percentage: Math.min(100, Math.round((profiles.length / cap) * 100))
    };
  },

  getAnalytics: () => {
    const profiles = initStore();
    return {
      totalViews: profiles.reduce((acc, p) => acc + (p.viewCount || 0), 2450),
      totalWhatsApp: profiles.reduce((acc, p) => acc + Math.round((p.viewCount || 10) * 0.12), 480),
      totalCalls: profiles.reduce((acc, p) => acc + Math.round((p.viewCount || 10) * 0.08), 210)
    };
  }
};

