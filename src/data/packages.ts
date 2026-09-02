import { PackageConfig, PackageType } from '../types';

export const PACKAGES: Record<PackageType, PackageConfig> = {
  DIAMOND: {
    id: 'DIAMOND',
    name: 'Diamond VIP',
    badgeText: 'ZİRVE VİTRİN',
    color: '#38bdf8',
    borderColor: 'rgba(56, 189, 248, 0.7)',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    priceMonthly: 4000,
    slotCapacity: 48,
    features: [
      'En Üst 1. Sıra Sabit Vitrin Alanı',
      'Mobilde 2 Kolonluk Dev Görünüm',
      '12 Saniye Adil Sıra Rotasyonu',
      'Mavi Doğrulandı (Verified ✓) Rozeti',
      'Doğrudan WhatsApp & Arama Butonları',
      'Sınırsız Fotoğraf & 4K Tanıtım Videosu',
      'Instagram Hikaye / Story Paylaşımı',
      'Canlı Tıklama & Dönüşüm Analitiği'
    ],
    maxPhotos: 15,
    hasVideo: true,
    hasStory: true,
    rotationPriority: 1,
    gridColsDesktop: 4,
    gridColsMobile: 2
  },
  PREMIUM: {
    id: 'PREMIUM',
    name: 'Premium Vitrin',
    badgeText: 'POPÜLER',
    color: '#eab308',
    borderColor: 'rgba(234, 179, 8, 0.7)',
    glowColor: 'rgba(234, 179, 8, 0.45)',
    priceMonthly: 3000,
    slotCapacity: 60,
    features: [
      '2. Sıra Öncelikli Vitrin',
      '12 Saniye Rotasyon',
      'Onaylı Terapist Rozeti',
      '10 Adet Fotoğraf Galerisi & Video',
      'Story Paylaşımı ve Hikaye Halkası',
      'Doğrudan WhatsApp Butonu',
      'Haftalık Ziyaretçi Raporu'
    ],
    maxPhotos: 10,
    hasVideo: true,
    hasStory: true,
    rotationPriority: 2,
    gridColsDesktop: 4,
    gridColsMobile: 2
  },
  GOLD: {
    id: 'GOLD',
    name: 'Gold Vitrin',
    badgeText: 'ÖNE ÇIKAN',
    color: '#94a3b8',
    borderColor: 'rgba(203, 213, 225, 0.6)',
    glowColor: 'rgba(203, 213, 225, 0.35)',
    priceMonthly: 2000,
    slotCapacity: 80,
    features: [
      '3. Sıra Vitrin Alanı',
      'Bölgesel Filtrelerde Üstte Gösterim',
      '6 Adet Fotoğraf Galerisi',
      'Doğrudan WhatsApp Butonu',
      'Hızlı İletişim Butonları'
    ],
    maxPhotos: 6,
    hasVideo: false,
    hasStory: false,
    rotationPriority: 3,
    gridColsDesktop: 5,
    gridColsMobile: 2
  },
  SILVER: {
    id: 'SILVER',
    name: 'Silver Vitrin',
    badgeText: 'STANDART',
    color: '#f97316',
    borderColor: 'rgba(249, 115, 22, 0.7)',
    glowColor: 'rgba(249, 115, 22, 0.35)',
    priceMonthly: 1000,
    slotCapacity: 120,
    features: [
      'Standart Üstü Liste Konumu',
      'Şehir & İlçe Listeleme Sayfaları',
      '4 Adet Fotoğraf Galerisi',
      'Telefon ve WhatsApp İletişimi'
    ],
    maxPhotos: 4,
    hasVideo: false,
    hasStory: false,
    rotationPriority: 4,
    gridColsDesktop: 6,
    gridColsMobile: 2
  }
};
