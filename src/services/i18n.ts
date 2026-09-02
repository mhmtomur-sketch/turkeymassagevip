export type Language = 'tr' | 'en' | 'de' | 'ru' | 'ar' | 'fa';

export interface TranslationDict {
  home: string;
  masseuses: string;
  masseurs: string;
  spa: string;
  hamam: string;
  hotelSpa: string;
  postAd: string;
  allCities: string;
  available: string;
  verified: string;
  searchPlaceholder: string;
  diamondShowcase: string;
  premiumShowcase: string;
  goldShowcase: string;
  silverShowcase: string;
  whatsapp: string;
  call: string;
  price: string;
  details: string;
  locationNotice: string;
}

export const TRANSLATIONS: Record<Language, TranslationDict> = {
  tr: {
    home: 'Ana Sayfa',
    masseuses: 'Masözler',
    masseurs: 'Masörler',
    spa: 'Spa & Salonlar',
    hamam: 'Hamam',
    hotelSpa: 'Otel Spa',
    postAd: 'İlan Ver',
    allCities: 'Tüm Şehirler',
    available: 'MÜSAİT',
    verified: 'Onaylı',
    searchPlaceholder: 'Masöz, ilçe veya semt ara...',
    diamondShowcase: '💎 DIAMOND VIP VİTRİN',
    premiumShowcase: '👑 GOLD PREMIUM VİTRİN',
    goldShowcase: '⭐ GOLD VIP VİTRİN',
    silverShowcase: '⚪ STANDART VİTRİN',
    whatsapp: 'WhatsApp',
    call: 'Ara',
    price: 'TL',
    details: 'İncele',
    locationNotice: 'Bulunduğunuz İl Vitrinleri Gösteriliyor'
  },
  en: {
    home: 'Home',
    masseuses: 'Masseuses',
    masseurs: 'Masseurs',
    spa: 'Spa & Salons',
    hamam: 'Turkish Bath',
    hotelSpa: 'Hotel Spa',
    postAd: 'Post Ad',
    allCities: 'All Cities',
    available: 'AVAILABLE',
    verified: 'Verified',
    searchPlaceholder: 'Search masseuse, district...',
    diamondShowcase: '💎 DIAMOND VIP SHOWCASE',
    premiumShowcase: '👑 GOLD PREMIUM SHOWCASE',
    goldShowcase: '⭐ GOLD VIP SHOWCASE',
    silverShowcase: '⚪ STANDARD SHOWCASE',
    whatsapp: 'WhatsApp',
    call: 'Call',
    price: 'TL',
    details: 'View',
    locationNotice: 'Showing Showcase for Your Province'
  },
  de: {
    home: 'Startseite',
    masseuses: 'Masseurinnen',
    masseurs: 'Masseure',
    spa: 'Spa & Salons',
    hamam: 'Hamam',
    hotelSpa: 'Hotel Spa',
    postAd: 'Anzeige aufgeben',
    allCities: 'Alle Städte',
    available: 'VERFÜGBAR',
    verified: 'Verifiziert',
    searchPlaceholder: 'Masseurin, Bezirk suchen...',
    diamondShowcase: '💎 DIAMOND VIP VITRINE',
    premiumShowcase: '👑 GOLD PREMIUM VITRINE',
    goldShowcase: '⭐ GOLD VIP VITRINE',
    silverShowcase: '⚪ STANDARD VITRINE',
    whatsapp: 'WhatsApp',
    call: 'Anrufen',
    price: 'TL',
    details: 'Details',
    locationNotice: 'Vitrinen für Ihre Region werden angezeigt'
  },
  ru: {
    home: 'Главная',
    masseuses: 'Массажистки',
    masseurs: 'Массажисты',
    spa: 'Спа и салоны',
    hamam: 'Хамам',
    hotelSpa: 'Отель Спа',
    postAd: 'Подать объявление',
    allCities: 'Все города',
    available: 'СВОБОДНА',
    verified: 'Проверено',
    searchPlaceholder: 'Поиск массажистки, района...',
    diamondShowcase: '💎 DIAMOND VIP ВИТРИНА',
    premiumShowcase: '👑 GOLD PREMIUM ВИТРИНА',
    goldShowcase: '⭐ GOLD VIP ВИТРИНА',
    silverShowcase: '⚪ СТАНДАРТНАЯ ВИТРИНА',
    whatsapp: 'WhatsApp',
    call: 'Позвонить',
    price: 'TL',
    details: 'Подробнее',
    locationNotice: 'Показаны витрины вашего региона'
  },
  ar: {
    home: 'الرئيسية',
    masseuses: 'أخصائيات المساج',
    masseurs: 'أخصائيو المساج',
    spa: 'سبا وصالونات',
    hamam: 'حمام تركي',
    hotelSpa: 'سبا فندقي',
    postAd: 'أضف إعلانك',
    allCities: 'جميع المدن',
    available: 'متاح الآن',
    verified: 'موثق',
    searchPlaceholder: 'ابحث عن مساج، منطقة...',
    diamondShowcase: '💎 معرض دايموند VIP',
    premiumShowcase: '👑 معرض جولد بريميوم',
    goldShowcase: '⭐ معرض جولد VIP',
    silverShowcase: '⚪ المعرض العام',
    whatsapp: 'واتساب',
    call: 'اتصال',
    price: 'ليرة',
    details: 'التفاصيل',
    locationNotice: 'يتم عرض إعلانات مدينتك الحالية'
  },
  fa: {
    home: 'صفحه اصلی',
    masseuses: 'ماساژورهای خانم',
    masseurs: 'ماساژورهای آقا',
    spa: 'اسپا و سالن‌ها',
    hamam: 'حمام ترکی',
    hotelSpa: 'اسپا هتل',
    postAd: 'ثبت آگهی',
    allCities: 'همه شهرها',
    available: 'در دسترس',
    verified: 'تایید شده',
    searchPlaceholder: 'جستجوی ماساژور، محله...',
    diamondShowcase: '💎 ویترین الماس VIP',
    premiumShowcase: '👑 ویترین گلد پریمیوم',
    goldShowcase: '⭐ ویترین گلد VIP',
    silverShowcase: '⚪ ویترین استاندارد',
    whatsapp: 'واتساپ',
    call: 'تماس',
    price: 'لیر',
    details: 'مشاهده',
    locationNotice: 'آگهی‌های استان شما نمایش داده می‌شود'
  }
};

export function getCurrentLanguage(): Language {
  if (typeof window === 'undefined') return 'tr';
  const saved = localStorage.getItem('tmv_lang') as Language;
  if (saved && TRANSLATIONS[saved]) return saved;
  const navLang = (navigator.language || 'tr').slice(0, 2).toLowerCase();
  if (navLang === 'ar') return 'ar';
  if (navLang === 'fa') return 'fa';
  if (navLang === 'ru') return 'ru';
  if (navLang === 'de') return 'de';
  if (navLang === 'en') return 'en';
  return 'tr';
}

export function setAppLanguage(lang: Language): void {
  localStorage.setItem('tmv_lang', lang);
  if (typeof document !== 'undefined') {
    document.documentElement.dir = (lang === 'ar' || lang === 'fa') ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }
}
