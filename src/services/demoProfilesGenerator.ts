import { Profile } from '../types';
import { ALL_LOCATIONS, TURKEY_CITIES, KKTC_CITIES } from '../data/locations';

const DEMO_PHONE = '0540 322 55 55';

const FEMALE_NAMES = [
  'Asya', 'Hande', 'Derin', 'Ece', 'Selin VIP', 'Arya', 'Buse', 'Damla',
  'Eylül', 'Hazal', 'Irmak', 'Kumsal', 'Lara', 'Mira', 'Naz', 'Peri',
  'Rüya', 'Simge', 'Tuana', 'Yağmur', 'Zeynep', 'Defne', 'Açelya', 'Bade',
  'Melisa', 'Cansu', 'Ela', 'Gökçe', 'Pelin', 'Şevval', 'Gizem', 'Burcu'
];

const MALE_NAMES = [
  'Kerem', 'Kaan', 'Arda', 'Can Terapist', 'Demir', 'Emir', 'Rüzgar', 'Bora'
];

const SPA_HAMAM_NAMES = [
  'Tarihi Saray Türk Hamamı & Spa',
  'Grand Deluxe Thermal & Spa',
  'VIP Sultan Hamamı & Masaj Kompleksi',
  'Golden Life Spa & Sauna Wellness',
  'Lotus Aromaterapi & Masaj Salonu',
  'Palace Otel Spa & Masaj Terapi',
  'Elit VIP Masaj & Dinlenme Merkezi',
  'Armoni Spa & Jakuzi Terapi Salonu'
];

const DEMO_PHOTOS = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881',
  'https://images.unsplash.com/photo-1519823551278-64ac92734fb1',
  'https://images.unsplash.com/photo-1507652313519-d4e9174996dd'
];

export function generateDemoProfilesForCity(citySlug: string, count = 32): Profile[] {
  const allCities = [...TURKEY_CITIES, ...KKTC_CITIES];
  const cityObj = allCities.find((c) => c.slug === citySlug) || {
    name: citySlug.charAt(0).toUpperCase() + citySlug.slice(1),
    slug: citySlug,
    districts: [{ name: 'Merkez' }]
  };

  const cityName = cityObj.name;
  const districts = cityObj.districts || [{ name: 'Merkez' }];
  const demoList: Profile[] = [];

  const packages: Array<'DIAMOND' | 'PREMIUM' | 'GOLD' | 'SILVER'> = [
    'DIAMOND', 'DIAMOND', 'PREMIUM', 'PREMIUM', 'GOLD', 'GOLD', 'SILVER', 'SILVER'
  ];

  const categories = [
    { cat: 'masoz', title: 'Profesyonel Masöz', namePrefix: 'Masöz ' },
    { cat: 'terapist', title: 'VIP Masaj Terapisti', namePrefix: 'Terapist ' },
    { cat: 'hamam', title: 'Geleneksel Türk Hamamı', namePrefix: '' },
    { cat: 'spa', title: 'Lüks Spa & Masaj Salonu', namePrefix: '' },
    { cat: 'otel-spa', title: 'Otel Spa & Wellness', namePrefix: '' },
    { cat: 'masor', title: 'Profesyonel Masör', namePrefix: 'Masör ' }
  ];

  for (let i = 0; i < count; i++) {
    const pkg = packages[i % packages.length];
    const catObj = categories[i % categories.length];
    const distName = (districts[i % districts.length] as any)?.name || 'Merkez';
    const distSlug = distName.toLowerCase().replace(/[^a-z0-9]/g, '');

    let pName = '';
    let pAbout = '';
    let pServices = ['Klasik İsveç Masajı', 'Aromaterapi Masajı', 'Relax Masaj'];

    if (catObj.cat === 'hamam' || catObj.cat === 'spa' || catObj.cat === 'otel-spa') {
      pName = `${cityName} ${SPA_HAMAM_NAMES[i % SPA_HAMAM_NAMES.length]}`;
      pAbout = `${cityName} ${distName} bölgesinde lüks Türk hamamı ritüeli, kese-köpük, sauna, jakuzi ve uzman terapistler eşliğinde seanslar sunulmaktadır.`;
      pServices = ['Geleneksel Türk Hamamı', 'Kese & Köpük Masajı', 'Sauna & Buhar Odası', 'Jakuzi & Spa Terapi'];
    } else if (catObj.cat === 'masor') {
      const maleN = MALE_NAMES[i % MALE_NAMES.length];
      pName = `${catObj.namePrefix}${maleN}`;
      pAbout = `${cityName} ${distName} bölgesinde medikal, spor ve derin doku masaj seansları ile hizmetinizdeyim.`;
      pServices = ['Medikal Masaj Terapisi', 'Spor Masajı', 'Derin Doku Masajı', 'Klasik Masaj'];
    } else {
      const femN = FEMALE_NAMES[i % FEMALE_NAMES.length];
      pName = `${catObj.namePrefix}${femN}`;
      pAbout = `${cityName} ${distName} bölgesinde lüks stüdyomda ve adrese servis olarak Tantra, Erotik VIP Terapi ve rahatlatıcı masaj seansları sunmaktayım. %100 hijyenik ortam.`;
      pServices = ['Tantra Masajı', 'Erotik Masaj (VIP Terapi)', 'Aromaterapi Masajı', 'Relax / Rahatlatıcı Masaj'];
    }

    const photoIdx = (i + citySlug.length) % DEMO_PHOTOS.length;
    const cover = DEMO_PHOTOS[photoIdx];

    demoList.push({
      id: `demo_${citySlug}_${i + 1}_${catObj.cat}_${pkg.toLowerCase()}`,
      name: pName,
      slug: `${pName.toLowerCase().replace(/[^a-z0-9]/g, '')}-${citySlug}-${i + 1}`,
      title: `${cityName} ${catObj.title}`,
      category: catObj.cat as any,
      categoryName: catObj.cat === 'hamam' ? 'Türk Hamamı' : catObj.cat === 'spa' ? 'Spa & Masaj' : catObj.cat === 'masor' ? 'Masör' : 'Masöz',
      packageType: pkg,
      city: cityName,
      cityName: cityName,
      citySlug: citySlug,
      district: distName,
      districtSlug: distSlug,
      phone: DEMO_PHONE,
      whatsapp: DEMO_PHONE,
      age: 22 + (i % 7),
      height: 168 + (i % 8),
      weight: 52 + (i % 8),
      price: pkg === 'DIAMOND' ? 2500 : pkg === 'PREMIUM' ? 2000 : 1500,
      currency: 'TL',
      workingHours: '11:00 - 03:00',
      locationType: ['Kendi Yeri (Stüdyo)', 'Otele Servis'],
      about: pAbout,
      photos: [cover, DEMO_PHOTOS[(photoIdx + 1) % DEMO_PHOTOS.length]],
      coverPhoto: cover,
      videos: [],
      services: pServices,
      isAvailable: true,
      available: true,
      isVerified: true,
      verified: true,
      active: true,
      published: true,
      visibility: 'public',
      rating: 5.0,
      reviewCount: 0,
      viewsCount: 0,
      whatsappClicks: 0,
      phoneClicks: 0,
      likesCount: 0,
      seoTitle: `${pName} | ${cityName} ${catObj.title}`,
      seoDescription: `${cityName} ${distName} bölgesinde ${pName} ile profesyonel masaj ve terapi seansları.`,
      seoKeywords: `${citySlug} masaj, ${citySlug} masöz, ${catObj.cat}, ${distSlug} masaj`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      googleIndexed: true,
      isDemo: true
    });
  }

  return demoList;
}
