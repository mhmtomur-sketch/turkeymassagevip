import { TURKEY_CITIES, KKTC_CITIES } from '../data/locations';
import { slugifyTurkish } from './db';

const ALL_CITIES = [...TURKEY_CITIES, ...KKTC_CITIES];

export function normalizeCitySlug(rawName: string): string {
  if (!rawName) return 'izmir';
  const clean = slugifyTurkish(rawName);

  if (clean.includes('usak')) return 'usak';
  if (clean.includes('istanbul') || clean.includes('kartal') || clean.includes('kadikoy') || clean.includes('sisli')) return 'istanbul';
  if (clean.includes('izmir') || clean.includes('konak') || clean.includes('karsiyaka') || clean.includes('alsancak') || clean.includes('bornova')) return 'izmir';
  if (clean.includes('mardin')) return 'mardin';
  if (clean.includes('manisa')) return 'manisa';
  if (clean.includes('ankara') || clean.includes('cankaya')) return 'ankara';
  if (clean.includes('antalya') || clean.includes('muratpasa')) return 'antalya';
  if (clean.includes('bursa') || clean.includes('nilufer')) return 'bursa';
  if (clean.includes('adana') || clean.includes('seyhan')) return 'adana';
  if (clean.includes('kocaeli') || clean.includes('izmit')) return 'kocaeli';
  if (clean.includes('konya') || clean.includes('selcuklu')) return 'konya';
  if (clean.includes('mugla') || clean.includes('bodrum') || clean.includes('fethiye')) return 'mugla';

  const directMatch = ALL_CITIES.find(
    (c) =>
      slugifyTurkish(c.slug) === clean ||
      slugifyTurkish(c.name) === clean ||
      clean.includes(slugifyTurkish(c.slug)) ||
      slugifyTurkish(c.slug).includes(clean)
  );

  return directMatch ? slugifyTurkish(directMatch.slug) : 'izmir';
}

export async function detectVisitorCity(): Promise<string> {
  if (typeof window !== 'undefined') {
    const manual = sessionStorage.getItem('tmv_user_manual_city');
    if (manual) return slugifyTurkish(manual);

    const cached = sessionStorage.getItem('tmv_detected_city');
    if (cached) return slugifyTurkish(cached);
  }

  try {
    const fetchGeoJS = fetch('https://get.geojs.io/v1/ip/geo.json').then(r => r.json()).then(d => d.city || d.region || '');
    const fetchIPWho = fetch('https://ipwho.is/').then(r => r.json()).then(d => d.city || d.region || '');
    
    const rawCity = await Promise.race([fetchGeoJS, fetchIPWho]);
    if (rawCity) {
      const slug = normalizeCitySlug(rawCity);
      if (typeof window !== 'undefined') sessionStorage.setItem('tmv_detected_city', slug);
      return slug;
    }
  } catch {}

  return 'izmir';
}
