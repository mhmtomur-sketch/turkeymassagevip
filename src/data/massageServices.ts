export interface ServiceCategory {
  categoryName: string;
  items: string[];
}

export const MASSAGE_SERVICE_CATALOG: ServiceCategory[] = [
  {
    categoryName: 'KLASİK & RELAX MASAJLAR',
    items: [
      'Klasik Masaj',
      'İsveç Masajı',
      'Relax Masaj',
      'Aromaterapi Masajı',
      'Yağlı Masaj',
      'Kuru Masaj',
      'Aromatik Yağ Masajı',
      'Dinlendirici Masaj'
    ]
  },
  {
    categoryName: 'TERAPÖTİK & MEDİKAL MASAJLAR',
    items: [
      'Medikal Masaj',
      'Derin Doku Masajı',
      'Tetik Nokta Masajı',
      'Miyofasyal Gevşetme',
      'Lenf Drenaj Masajı',
      'Kupa Masajı',
      'Gua Sha Terapi',
      'Manuel Terapi Desteği'
    ]
  },
  {
    categoryName: 'UZAKDOĞU & GELENEKSEL TERAPİLER',
    items: [
      'Thai Masajı',
      'Bali Masajı',
      'Shiatsu',
      'Refleksoloji (Ayak Terapi)',
      'Ayurveda Masajı',
      'Abhyanga',
      'Hint Baş Masajı',
      'Lomi Lomi Masajı',
      'Thai Yoga Masajı'
    ]
  },
  {
    categoryName: 'SPOR & AKTİF YAŞAM',
    items: [
      'Spor Masajı',
      'Esnetme (Stretching) Masajı',
      'Ofis / Masa Başı Masajı',
      'Müsabaka Öncesi Masaj',
      'Müsabaka Sonrası Masaj'
    ]
  },
  {
    categoryName: 'SPA & ÖZEL VÜCUT RİTÜELLERİ',
    items: [
      'Sıcak Taş Masajı',
      'Volkanik Taş Masajı',
      'Bambu Masajı',
      'Çikolata Masajı',
      'Bal Masajı',
      'Kahve Masajı',
      'Deniz Tuzu Bakımı',
      'Vücut Peeling',
      'Jakuzi & Spa Terapi'
    ]
  },
  {
    categoryName: 'GELENEKSEL HAMAM & WELLNESS',
    items: [
      'Geleneksel Türk Hamamı',
      'Kese & Köpük Masajı',
      'Hamam Masajı',
      'Spa Masajı',
      'Wellness Masajı',
      'Sauna & Buhar Terapi'
    ]
  },
  {
    categoryName: 'BÖLGESEL UYGULAMALAR',
    items: [
      'Baş Masajı',
      'Boyun Masajı',
      'Omuz Masajı',
      'Sırt Masajı',
      'Bel Masajı',
      'Baş-Boyun-Omuz Masajı',
      'Ayak Masajı',
      'El Masajı',
      'Yüz Masajı',
      'Bölgesel Masaj',
      'Selülit Masajı',
      'Anti Selülit Masaj'
    ]
  },
  {
    categoryName: 'VIP & ÖZEL KONSEPTLER',
    items: [
      'Tantra Masajı',
      'Erotik Masaj (VIP Terapi)',
      'Dört El Masajı (Senkron Masözler)',
      'Çift Masajı',
      'Hamile Masajı',
      'Doğum Sonrası Masaj'
    ]
  }
];

export const ALL_FLAT_SERVICES = MASSAGE_SERVICE_CATALOG.flatMap(c => c.items);
