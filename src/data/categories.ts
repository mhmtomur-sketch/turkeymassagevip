export interface CategoryItem {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  iconName: string;
  badgeText: string;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'cat_masoz',
    slug: 'masoz',
    title: 'Bireysel Masözler',
    shortTitle: 'Masöz',
    description: 'Doğrulanmış sertifikalı bireysel kadın masözler ve bağımsız terapistler.',
    iconName: 'User',
    badgeText: 'Bireysel'
  },
  {
    id: 'cat_masor',
    slug: 'masor',
    title: 'Bireysel Masörler',
    shortTitle: 'Masör',
    description: 'Medikal, spor ve derin doku masajında uzman bireysel erkek masörler.',
    iconName: 'UserCheck',
    badgeText: 'Erkek Terapist'
  },
  {
    id: 'cat_spa',
    slug: 'spa',
    title: 'Spa & Masaj Salonları',
    shortTitle: 'Spa & Salon',
    description: 'Lüks konsept masaj salonları, vip spa merkezleri ve wellness tesisleri.',
    iconName: 'Building2',
    badgeText: 'İşletme'
  },
  {
    id: 'cat_hamam',
    slug: 'hamam',
    title: 'Geleneksel Türk Hamamları',
    shortTitle: 'Hamam',
    description: 'Kese, köpük ve geleneksel Osmanlı hamam ritüelleri sunan merkezler.',
    iconName: 'Flame',
    badgeText: 'Kese & Köpük'
  },
  {
    id: 'cat_otel_spa',
    slug: 'otel-spa',
    title: '5 Yıldızlı Otel Spa Merkezleri',
    shortTitle: 'Otel Spa',
    description: 'Seçkin 5 yıldızlı oteller bünyesinde hizmet veren elit spa ve sauna merkezleri.',
    iconName: 'Crown',
    badgeText: '5 Yıldız VIP'
  }
];

export function getCategoryBySlug(slug: string): CategoryItem | undefined {
  return CATEGORIES.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
}
