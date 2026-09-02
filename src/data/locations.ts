import { City } from '../types';

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '');
}

function dList(arr: string[]): Array<{ name: string; slug: string }> {
  return arr.map((name) => ({ name, slug: toSlug(name) }));
}

export const TURKEY_CITIES: City[] = [
  { id: '1', name: 'Adana', slug: 'adana', plate: '01', districts: dList(['Seyhan', 'Çukurova', 'Yüreğir', 'Sarıçam', 'Ceyhan']) },
  { id: '2', name: 'Adıyaman', slug: 'adiyaman', plate: '02', districts: dList(['Merkez', 'Kahta', 'Besni']) },
  { id: '3', name: 'Afyonkarahisar', slug: 'afyon', plate: '03', districts: dList(['Merkez', 'Sandıklı', 'Dinar', 'Bolvadin']) },
  { id: '4', name: 'Ağrı', slug: 'agri', plate: '04', districts: dList(['Merkez', 'Doğubayazıt', 'Patnos']) },
  { id: '5', name: 'Amasya', slug: 'amasya', plate: '05', districts: dList(['Merkez', 'Merzifon', 'Suluova']) },
  { id: '6', name: 'Ankara', slug: 'ankara', plate: '06', districts: dList(['Çankaya', 'Keçiören', 'Yenimahalle', 'Mamak', 'Etimesgut', 'Sincan', 'Altındağ', 'Gölbaşı']) },
  { id: '7', name: 'Antalya', slug: 'antalya', plate: '07', districts: dList(['Muratpaşa', 'Kepez', 'Konyaaltı', 'Alanya', 'Manavgat', 'Kemer', 'Kaş', 'Serik', 'Belek']) },
  { id: '8', name: 'Artvin', slug: 'artvin', plate: '08', districts: dList(['Merkez', 'Hopa', 'Borçka']) },
  { id: '9', name: 'Aydın', slug: 'aydin', plate: '09', districts: dList(['Efeler', 'Kuşadası', 'Didim', 'Nazilli', 'Söke']) },
  { id: '10', name: 'Balıkesir', slug: 'balikesir', plate: '10', districts: dList(['Altıeylül', 'Karesi', 'Edremit', 'Bandırma', 'Ayvalık', 'Burhaniye']) },
  { id: '11', name: 'Bilecik', slug: 'bilecik', plate: '11', districts: dList(['Merkez', 'Bozüyük']) },
  { id: '12', name: 'Bingöl', slug: 'bingol', plate: '12', districts: dList(['Merkez', 'Genç']) },
  { id: '13', name: 'Bitlis', slug: 'bitlis', plate: '13', districts: dList(['Merkez', 'Tatvan', 'Ahlat']) },
  { id: '14', name: 'Bolu', slug: 'bolu', plate: '14', districts: dList(['Merkez', 'Gerede']) },
  { id: '15', name: 'Burdur', slug: 'burdur', plate: '15', districts: dList(['Merkez', 'Bucak']) },
  { id: '16', name: 'Bursa', slug: 'bursa', plate: '16', districts: dList(['Osmangazi', 'Nilüfer', 'Yıldırım', 'İnegöl', 'Gemlik', 'Mudanya']) },
  { id: '17', name: 'Çanakkale', slug: 'canakkale', plate: '17', districts: dList(['Merkez', 'Biga', 'Çan', 'Gelibolu']) },
  { id: '18', name: 'Çankırı', slug: 'cankiri', plate: '18', districts: dList(['Merkez', 'Ilgaz']) },
  { id: '19', name: 'Çorum', slug: 'corum', plate: '19', districts: dList(['Merkez', 'Sungurlu', 'Osmancık']) },
  { id: '20', name: 'Denizli', slug: 'denizli', plate: '20', districts: dList(['Pamukkale', 'Merkezefendi', 'Çivril', 'Acıpayam']) },
  { id: '21', name: 'Diyarbakır', slug: 'diyarbakir', plate: '21', districts: dList(['Bağlar', 'Kayapınar', 'Yenişehir', 'Sur', 'Ergani', 'Bismil']) },
  { id: '22', name: 'Edirne', slug: 'edirne', plate: '22', districts: dList(['Merkez', 'Keşan', 'Uzunköprü']) },
  { id: '23', name: 'Elazığ', slug: 'elazig', plate: '23', districts: dList(['Merkez', 'Kovancılar']) },
  { id: '24', name: 'Erzincan', slug: 'erzincan', plate: '24', districts: dList(['Merkez', 'Tercan']) },
  { id: '25', name: 'Erzurum', slug: 'erzurum', plate: '25', districts: dList(['Yakutiye', 'Palandöken', 'Aziziye', 'Oltu']) },
  { id: '26', name: 'Eskişehir', slug: 'eskisehir', plate: '26', districts: dList(['Odunpazarı', 'Tepebaşı', 'Sivrihisar']) },
  { id: '27', name: 'Gaziantep', slug: 'gaziantep', plate: '27', districts: dList(['Şahinbey', 'Şehitkamil', 'Nizip', 'İslahiye']) },
  { id: '28', name: 'Giresun', slug: 'giresun', plate: '28', districts: dList(['Merkez', 'Bulancak', 'Espiye']) },
  { id: '29', name: 'Gümüşhane', slug: 'gumushane', plate: '29', districts: dList(['Merkez', 'Kelkit']) },
  { id: '30', name: 'Hakkari', slug: 'hakkari', plate: '30', districts: dList(['Merkez', 'Yüksekova']) },
  { id: '31', name: 'Hatay', slug: 'hatay', plate: '31', districts: dList(['Antakya', 'İskenderun', 'Defne', 'Dörtyol', 'Samandağ']) },
  { id: '32', name: 'Isparta', slug: 'isparta', plate: '32', districts: dList(['Merkez', 'Yalvaç', 'Eğirdir']) },
  { id: '33', name: 'Mersin', slug: 'mersin', plate: '33', districts: dList(['Akdeniz', 'Mezitli', 'Toroslar', 'Yenişehir', 'Tarsus', 'Erdemli', 'Silifke']) },
  { id: '34', name: 'İstanbul', slug: 'istanbul', plate: '34', districts: dList(['Kadıköy', 'Beşiktaş', 'Şişli', 'Bakırköy', 'Beyoğlu', 'Üsküdar', 'Ataşehir', 'Sarıyer', 'Maltepe', 'Kartal', 'Pendik', 'Ümraniye', 'Beylikdüzü', 'Bahçelievler', 'Fatih']) },
  { id: '35', name: 'İzmir', slug: 'izmir', plate: '35', districts: dList(['Konak', 'Karşıyaka', 'Bornova', 'Alsancak', 'Buca', 'Bayraklı', 'Çiğli', 'Çeşme', 'Urla', 'Gaziemir', 'Balçova', 'Narlıdere', 'Karabağlar']) },
  { id: '36', name: 'Kars', slug: 'kars', plate: '36', districts: dList(['Merkez', 'Kağızman', 'Sarıkamış']) },
  { id: '37', name: 'Kastamonu', slug: 'kastamonu', plate: '37', districts: dList(['Merkez', 'Tosya', 'Taşköprü']) },
  { id: '38', name: 'Kayseri', slug: 'kayseri', plate: '38', districts: dList(['Melikgazi', 'Kocasinan', 'Talas', 'Develi']) },
  { id: '39', name: 'Kırklareli', slug: 'kirklareli', plate: '39', districts: dList(['Merkez', 'Lüleburgaz', 'Babaeski']) },
  { id: '40', name: 'Kırşehir', slug: 'kirsehir', plate: '40', districts: dList(['Merkez', 'Kaman']) },
  { id: '41', name: 'Kocaeli', slug: 'kocaeli', plate: '41', districts: dList(['İzmit', 'Gebze', 'Darıca', 'Körfez', 'Gölcük', 'Derince', 'Kartepe', 'Başiskele']) },
  { id: '42', name: 'Konya', slug: 'konya', plate: '42', districts: dList(['Selçuklu', 'Meram', 'Karatay', 'Ereğli', 'Akşehir']) },
  { id: '43', name: 'Kütahya', slug: 'kutahya', plate: '43', districts: dList(['Merkez', 'Tavşanlı', 'Simav']) },
  { id: '44', name: 'Malatya', slug: 'malatya', plate: '44', districts: dList(['Battalgazi', 'Yeşilyurt', 'Doğanşehir']) },
  { id: '45', name: 'Manisa', slug: 'manisa', plate: '45', districts: dList(['Yunusemre', 'Şehzadeler', 'Akhisar', 'Salihli', 'Turgutlu', 'Soma']) },
  { id: '46', name: 'Kahramanmaraş', slug: 'kahramanmaras', plate: '46', districts: dList(['Onikişubat', 'Dulkadiroğlu', 'Elbistan', 'Afşin']) },
  { id: '47', name: 'Mardin', slug: 'mardin', plate: '47', districts: dList(['Artuklu', 'Kızıltepe', 'Midyat', 'Nusaybin', 'Derik']) },
  { id: '48', name: 'Muğla', slug: 'mugla', plate: '48', districts: dList(['Bodrum', 'Fethiye', 'Marmaris', 'Menteşe', 'Milas', 'Ortaca', 'Datça']) },
  { id: '49', name: 'Muş', slug: 'mus', plate: '49', districts: dList(['Merkez', 'Bulanık', 'Malazgirt']) },
  { id: '50', name: 'Nevşehir', slug: 'nevsehir', plate: '50', districts: dList(['Merkez', 'Ürgüp', 'Avanos', 'Kapadokya']) },
  { id: '51', name: 'Niğde', slug: 'nigde', plate: '51', districts: dList(['Merkez', 'Bor']) },
  { id: '52', name: 'Ordu', slug: 'ordu', plate: '52', districts: dList(['Altınordu', 'Ünye', 'Fatsa']) },
  { id: '53', name: 'Rize', slug: 'rize', plate: '53', districts: dList(['Merkez', 'Çayeli', 'Ardeşen']) },
  { id: '54', name: 'Sakarya', slug: 'sakarya', plate: '54', districts: dList(['Adapazarı', 'Serdivan', 'Akyazı', 'Erenler', 'Hendek', 'Sapanca']) },
  { id: '55', name: 'Samsun', slug: 'samsun', plate: '55', districts: dList(['İlkadım', 'Atakum', 'Canik', 'Bafra', 'Çarşamba']) },
  { id: '56', name: 'Siirt', slug: 'siirt', plate: '56', districts: dList(['Merkez', 'Kurtalan']) },
  { id: '57', name: 'Sinop', slug: 'sinop', plate: '57', districts: dList(['Merkez', 'Boyabat', 'Gerze']) },
  { id: '58', name: 'Sivas', slug: 'sivas', plate: '58', districts: dList(['Merkez', 'Şarkışla']) },
  { id: '59', name: 'Tekirdağ', slug: 'tekirdag', plate: '59', districts: dList(['Süleymanpaşa', 'Çorlu', 'Çerkezköy', 'Kapaklı', 'Ergene']) },
  { id: '60', name: 'Tokat', slug: 'tokat', plate: '60', districts: dList(['Merkez', 'Erbaa', 'Turhal', 'Niksar']) },
  { id: '61', name: 'Trabzon', slug: 'trabzon', plate: '61', districts: dList(['Ortahisar', 'Akçaabat', 'Araklı', 'Of']) },
  { id: '62', name: 'Tunceli', slug: 'tunceli', plate: '62', districts: dList(['Merkez', 'Pertek']) },
  { id: '63', name: 'Şanlıurfa', slug: 'sanliurfa', plate: '63', districts: dList(['Haliliye', 'Eyyübiye', 'Karaköprü', 'Siverek', 'Viranşehir']) },
  { id: '64', name: 'Uşak', slug: 'usak', plate: '64', districts: dList(['Merkez', 'Banaz', 'Eşme']) },
  { id: '65', name: 'Van', slug: 'van', plate: '65', districts: dList(['İpekyolu', 'Tuşba', 'Edremit', 'Erciş']) },
  { id: '66', name: 'Yozgat', slug: 'yozgat', plate: '66', districts: dList(['Merkez', 'Sorgun', 'Akdağmadeni']) },
  { id: '67', name: 'Zonguldak', slug: 'zonguldak', plate: '67', districts: dList(['Merkez', 'Ereğli', 'Çaycuma', 'Devrek']) },
  { id: '68', name: 'Aksaray', slug: 'aksaray', plate: '68', districts: dList(['Merkez', 'Ortaköy']) },
  { id: '69', name: 'Bayburt', slug: 'bayburt', plate: '69', districts: dList(['Merkez', 'Demirözü']) },
  { id: '70', name: 'Karaman', slug: 'karaman', plate: '70', districts: dList(['Merkez', 'Ermenek']) },
  { id: '71', name: 'Kırıkkale', slug: 'kirikkale', plate: '71', districts: dList(['Merkez', 'Yahşihan', 'Keskin']) },
  { id: '72', name: 'Batman', slug: 'batman', plate: '72', districts: dList(['Merkez', 'Kozluk', 'Beşiri']) },
  { id: '73', name: 'Şırnak', slug: 'sirnak', plate: '73', districts: dList(['Merkez', 'Cizre', 'Silopi', 'İdil']) },
  { id: '74', name: 'Bartın', slug: 'bartin', plate: '74', districts: dList(['Merkez', 'Amasra']) },
  { id: '75', name: 'Ardahan', slug: 'ardahan', plate: '75', districts: dList(['Merkez', 'Göle']) },
  { id: '76', name: 'Iğdır', slug: 'igdir', plate: '76', districts: dList(['Merkez', 'Tuzluca']) },
  { id: '77', name: 'Yalova', slug: 'yalova', plate: '77', districts: dList(['Merkez', 'Çiftlikköy', 'Çınarcık', 'Altınova', 'Termal']) },
  { id: '78', name: 'Karabük', slug: 'karabuk', plate: '78', districts: dList(['Merkez', 'Safranbolu']) },
  { id: '79', name: 'Kilis', slug: 'kilis', plate: '79', districts: dList(['Merkez', 'Musabeyli']) },
  { id: '80', name: 'Osmaniye', slug: 'osmaniye', plate: '80', districts: dList(['Merkez', 'Kadirli', 'Düziçi']) },
  { id: '81', name: 'Düzce', slug: 'duzce', plate: '81', districts: dList(['Merkez', 'Akçakoca', 'Kaynaşlı']) }
];

export const KKTC_CITIES: City[] = [
  { id: 'kktc_1', name: 'Lefkoşa', slug: 'lefkosa', districts: dList(['Gönyeli', 'Ortaköy', 'Küçük Kaymaklı', 'Hamitköy', 'Merkez']) },
  { id: 'kktc_2', name: 'Girne', slug: 'girne', districts: dList(['Alsancak', 'Lapta', 'Karaoğlanoğlu', 'Çatalköy', 'Ozanköy', 'Merkez']) },
  { id: 'kktc_3', name: 'Gazimağusa', slug: 'gazimagusa', districts: dList(['Karakol', 'Sakarya', 'Salamis', 'Maraş', 'Merkez']) },
  { id: 'kktc_4', name: 'İskele', slug: 'iskele', districts: dList(['Long Beach', 'Boğaz', 'Bafra', 'Merkez']) },
  { id: 'kktc_5', name: 'Güzelyurt', slug: 'guzelyurt', districts: dList(['Kalkanlı', 'Bostancı', 'Merkez']) },
  { id: 'kktc_6', name: 'Lefke', slug: 'lefke', districts: dList(['Gemikonağı', 'Yedidalga', 'Merkez']) }
];

export const ALL_LOCATIONS: City[] = [...TURKEY_CITIES, ...KKTC_CITIES];

export function getLocationBySlug(slug: string): City | undefined {
  if (!slug) return undefined;
  const s = slug.toLowerCase();
  return ALL_LOCATIONS.find((l) => l.slug.toLowerCase() === s || l.name.toLowerCase() === s);
}

export function getCityBySlug(slug: string): City | undefined {
  return getLocationBySlug(slug);
}

export const TURKEY_PROVINCES = TURKEY_CITIES;
export const KKTC_REGIONS = KKTC_CITIES;
export const POPULAR_CITIES = TURKEY_CITIES.filter((c) => ['istanbul', 'izmir', 'ankara', 'antalya', 'bursa', 'adana', 'mugla'].includes(c.slug || ''));

export function getNeighborhoodsForDistrict(citySlug?: string, districtSlug?: string): string[] {
  return ['Merkez', 'Çarşı', 'Sahil', 'Kordon', 'Meydan', 'Üniversite', 'Sanayi', 'Yalı'];
}

export function getDistrictsForCity(citySlug?: string): any[] {
  const loc = getLocationBySlug(citySlug || '');
  return loc?.districts || [];
}
