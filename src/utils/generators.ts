import { Profile } from '../types';

export function slugify(text: string): string {
  const trMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ı': 'i', 'I': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u',
  };

  return text
    .replace(/[çÇğĞıIİöÖşŞüÜ]/g, (match) => trMap[match] || match)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function generateBiography(p: Partial<Profile>): string {
  const name = p.name?.trim() || 'Terapist';
  const category = p.categoryName || 'Masaj Terapisti';
  const city = p.city || 'İzmir';
  const district = p.district || 'Konak';
  const neighborhood = p.neighborhood ? `${p.neighborhood} mevkiinde` : `${district} merkezde`;
  const exp = p.experienceYears ? `${p.experienceYears} yılı aşkın mesleki tecrübem ile` : 'uzmanlık ve titizlikle';
  const servicesList = p.services && p.services.length > 0 
    ? p.services.slice(0, 4).join(', ') 
    : 'Klasik Masaj, Relax Masaj ve Aromaterapi Terapisi';
  
  const serviceArea = p.serviceArea || (p.serviceAreas && p.serviceAreas.length > 0 ? p.serviceAreas.join(', ') : `${district} ve çevresi`);
  const workingHours = p.workingHours || '11:00 - 01:00';
  const workingDays = p.workingDays || 'Haftanın her günü';

  const isBusiness = p.type === 'business';

  if (isBusiness) {
    return `${city} ${district} ${neighborhood} konumunda yer alan ${name}, seçkin ve nezih atmosferinde lüks spa & masaj deneyimi sunmaktadır. Tesisimizde ${servicesList} başta olmak üzere kapsamlı sağlıklı yaşam terapileri profesyonel ve sertifikalı kadromuz tarafından uygulanmaktadır. Çalışma saatlerimiz ${workingDays} ${workingHours} arasıdır. Hijyenik odalarımızda kendinizi yenilemek için randevunuzu doğrudan WhatsApp veya telefonla oluşturabilirsiniz.`;
  }

  // Individual variations
  const bioTemplates = [
    `Merhaba, ben ${name}. ${city} ${district} ${neighborhood} hijyenik, huzurlu özel stüdyomda ve seçkin otellerde profesyonel masaj terapisi sunuyorum. ${exp} uyguladığım ${servicesList} seanslarımda günün yorgunluğunu, stresini ve kas tutulmalarını geride bırakabilirsiniz. Hizmet bölgelerim: ${serviceArea}. Çalışma düzenim: ${workingDays} ${workingHours}. %100 saf aromaterapi yağları ve dinlendirici müzik eşliğinde kendinize özel bir terapi zamanı ayırmak için doğrudan WhatsApp üzerinden iletişime geçebilirsiniz.`,
    
    `${city} ${district} bölgesinde profesyonel ${category.toLowerCase()} hizmeti vermekteyim. ${exp} edindiğim deneyim ile ${servicesList} seanslarını kişiye özel tekniklerle uyguluyorum. ${neighborhood} lokasyonundaki nezih ve konforlu ortamımda temizlik ve memnuniyet en ön plandadır. Çalışma saatlerim ${workingDays} ${workingHours} arasındadır. Ayrıcalıklı bir seans ve randevu için lütfen arayın veya WhatsApp'tan mesaj bırakın.`,

    `Ben ${name}, ${city} ${district} ${neighborhood} profesyonel masaj ve vücut terapisi hizmeti sunuyorum. ${exp} yürüttüğüm seanslarımda ${servicesList} gibi özel tekniklerle bedeninizi ve zihninizi yeniliyorum. Hizmet bölgelerim: ${serviceArea}. Seanslarım ${workingDays} ${workingHours} saatleri arasında randevulu olarak gerçekleştirilmektedir. Detaylar ve randevu için doğrudan iletişime geçebilirsiniz.`
  ];

  const index = Math.abs(name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % bioTemplates.length;
  return bioTemplates[index];
}

export function generateSeoData(p: Partial<Profile>): {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
} {
  const name = p.name?.trim() || 'Terapist';
  const category = p.categoryName || 'Masöz';
  const city = p.city || 'İzmir';
  const district = p.district || 'Konak';
  const neighborhood = p.neighborhood || '';
  const services = p.services || [];

  const rawSlug = `${name} ${city} ${district}`;
  const slug = slugify(rawSlug) || `profil-${Date.now()}`;

  const seoTitle = `${name} | ${city} ${district} ${category} & Masaj Hizmetleri`;
  const metaDescription = `${city} ${district} ${neighborhood ? `(${neighborhood})` : ''} bölgesinde ${name} ile profesyonel ${category.toLowerCase()} ve masaj seansları. ${services.slice(0, 3).join(', ')} için WhatsApp veya telefonla anında randevu alın.`;

  const keywords = Array.from(new Set([
    name.toLowerCase(),
    `${city.toLowerCase()} masaj`,
    `${city.toLowerCase()} ${category.toLowerCase()}`,
    `${district.toLowerCase()} masaj`,
    `${district.toLowerCase()} ${category.toLowerCase()}`,
    neighborhood ? `${neighborhood.toLowerCase()} masaj` : '',
    ...services.map(s => s.toLowerCase()),
    'masaj terapisi',
    'profesyonel masaj',
    'vip masaj'
  ])).filter(Boolean);

  const canonicalUrl = `https://turkeymassagevip.com/profil/${slug}`;
  const ogTitle = `${name} - ${city} ${district} ${category} Vitrini`;
  const ogDescription = metaDescription;

  return {
    slug,
    seoTitle,
    metaDescription,
    keywords,
    canonicalUrl,
    ogTitle,
    ogDescription,
  };
}
