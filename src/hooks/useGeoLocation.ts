import { useState, useEffect } from 'react';

export interface City {
  id: string;
  name: string;
  slug: string;
}

export const TURKEY_CITIES: City[] = [
  { id: '1', name: 'Adana', slug: 'adana' },
  { id: '2', name: 'Adıyaman', slug: 'adiyaman' },
  { id: '3', name: 'Afyonkarahisar', slug: 'afyon' },
  { id: '4', name: 'Ağrı', slug: 'agri' },
  { id: '5', name: 'Amasya', slug: 'amasya' },
  { id: '6', name: 'Ankara', slug: 'ankara' },
  { id: '7', name: 'Antalya', slug: 'antalya' },
  { id: '8', name: 'Artvin', slug: 'artvin' },
  { id: '9', name: 'Aydın', slug: 'aydin' },
  { id: '10', name: 'Balıkesir', slug: 'balikesir' },
  { id: '11', name: 'Bilecik', slug: 'bilecik' },
  { id: '12', name: 'Bingöl', slug: 'bingol' },
  { id: '13', name: 'Bitlis', slug: 'bitlis' },
  { id: '14', name: 'Bolu', slug: 'bolu' },
  { id: '15', name: 'Burdur', slug: 'burdur' },
  { id: '16', name: 'Bursa', slug: 'bursa' },
  { id: '17', name: 'Çanakkale', slug: 'canakkale' },
  { id: '18', name: 'Çankırı', slug: 'cankiri' },
  { id: '19', name: 'Çorum', slug: 'corum' },
  { id: '20', name: 'Denizli', slug: 'denizli' },
  { id: '21', name: 'Diyarbakır', slug: 'diyarbakir' },
  { id: '22', name: 'Edirne', slug: 'edirne' },
  { id: '23', name: 'Elazığ', slug: 'elazig' },
  { id: '24', name: 'Erzincan', slug: 'erzincan' },
  { id: '25', name: 'Erzurum', slug: 'erzurum' },
  { id: '26', name: 'Eskişehir', slug: 'eskisehir' },
  { id: '27', name: 'Gaziantep', slug: 'gaziantep' },
  { id: '28', name: 'Giresun', slug: 'giresun' },
  { id: '29', name: 'Gümüşhane', slug: 'gumushane' },
  { id: '30', name: 'Hakkari', slug: 'hakkari' },
  { id: '31', name: 'Hatay', slug: 'hatay' },
  { id: '32', name: 'Isparta', slug: 'isparta' },
  { id: '33', name: 'Mersin', slug: 'mersin' },
  { id: '34', name: 'İstanbul', slug: 'istanbul' },
  { id: '35', name: 'İzmir', slug: 'izmir' },
  { id: '36', name: 'Kars', slug: 'kars' },
  { id: '37', name: 'Kastamonu', slug: 'kastamonu' },
  { id: '38', name: 'Kayseri', slug: 'kayseri' },
  { id: '39', name: 'Kırklareli', slug: 'kirklareli' },
  { id: '40', name: 'Kırşehir', slug: 'kirsehir' },
  { id: '41', name: 'Kocaeli', slug: 'kocaeli' },
  { id: '42', name: 'Konya', slug: 'konya' },
  { id: '43', name: 'Kütahya', slug: 'kutahya' },
  { id: '44', name: 'Malatya', slug: 'malatya' },
  { id: '45', name: 'Manisa', slug: 'manisa' },
  { id: '46', name: 'Kahramanmaraş', slug: 'kahramanmaras' },
  { id: '47', name: 'Mardin', slug: 'mardin' },
  { id: '48', name: 'Muğla', slug: 'mugla' },
  { id: '49', name: 'Muş', slug: 'mus' },
  { id: '50', name: 'Nevşehir', slug: 'nevsehir' },
  { id: '51', name: 'Niğde', slug: 'nigde' },
  { id: '52', name: 'Ordu', slug: 'ordu' },
  { id: '53', name: 'Rize', slug: 'rize' },
  { id: '54', name: 'Sakarya', slug: 'sakarya' },
  { id: '55', name: 'Samsun', slug: 'samsun' },
  { id: '56', name: 'Siirt', slug: 'siirt' },
  { id: '57', name: 'Sinop', slug: 'sinop' },
  { id: '58', name: 'Sivas', slug: 'sivas' },
  { id: '59', name: 'Tekirdağ', slug: 'tekirdag' },
  { id: '60', name: 'Tokat', slug: 'tokat' },
  { id: '61', name: 'Trabzon', slug: 'trabzon' },
  { id: '62', name: 'Tunceli', slug: 'tunceli' },
  { id: '63', name: 'Şanlıurfa', slug: 'sanliurfa' },
  { id: '64', name: 'Uşak', slug: 'usak' },
  { id: '65', name: 'Van', slug: 'van' },
  { id: '66', name: 'Yozgat', slug: 'yozgat' },
  { id: '67', name: 'Zonguldak', slug: 'zonguldak' },
  { id: '68', name: 'Aksaray', slug: 'aksaray' },
  { id: '69', name: 'Bayburt', slug: 'bayburt' },
  { id: '70', name: 'Karaman', slug: 'karaman' },
  { id: '71', name: 'Kırıkkale', slug: 'kirikkale' },
  { id: '72', name: 'Batman', slug: 'batman' },
  { id: '73', name: 'Şırnak', slug: 'sirnak' },
  { id: '74', name: 'Bartın', slug: 'bartin' },
  { id: '75', name: 'Ardahan', slug: 'ardahan' },
  { id: '76', name: 'Iğdır', slug: 'igdir' },
  { id: '77', name: 'Yalova', slug: 'yalova' },
  { id: '78', name: 'Karabük', slug: 'karabuk' },
  { id: '79', name: 'Kilis', slug: 'kilis' },
  { id: '80', name: 'Osmaniye', slug: 'osmaniye' },
  { id: '81', name: 'Düzce', slug: 'duzce' }
];

function normalizeCityName(str: string): string {
  return str
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '');
}

export function useGeoLocation() {
  const [detectedCity, setDetectedCity] = useState<City>(() => {
    try {
      const saved = localStorage.getItem('tmv_selected_city');
      if (saved) return JSON.parse(saved);
    } catch {}
    return TURKEY_CITIES.find((c) => c.slug === 'izmir') || TURKEY_CITIES[0];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const manualSaved = localStorage.getItem('tmv_manual_city_selected');
    if (manualSaved) return;

    let isMounted = true;

    async function detect() {
      setLoading(true);
      try {
        let detectedName = '';

        try {
          const res1 = await fetch('https://ipwho.is/', { signal: AbortSignal.timeout(2000) });
          if (res1.ok) {
            const data1 = await res1.json();
            if (data1 && data1.success && data1.country_code === 'TR') {
              detectedName = data1.region || data1.city || '';
            }
          }
        } catch {}

        if (!detectedName) {
          try {
            const res2 = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(2000) });
            if (res2.ok) {
              const data2 = await res2.json();
              if (data2 && data2.country_code === 'TR') {
                detectedName = data2.region || data2.city || '';
              }
            }
          } catch {}
        }

        if (detectedName && isMounted) {
          const normDetected = normalizeCityName(detectedName);
          const matched = TURKEY_CITIES.find((c) => 
            normalizeCityName(c.name) === normDetected || 
            normalizeCityName(c.slug) === normDetected ||
            normDetected.includes(normalizeCityName(c.name))
          );

          if (matched) {
            setDetectedCity(matched);
            localStorage.setItem('tmv_selected_city', JSON.stringify(matched));
          }
        }
      } catch {} finally {
        if (isMounted) setLoading(false);
      }
    }

    detect();

    return () => { isMounted = false; };
  }, []);

  const changeCity = (city: City) => {
    setDetectedCity(city);
    localStorage.setItem('tmv_selected_city', JSON.stringify(city));
    localStorage.setItem('tmv_manual_city_selected', 'true');
  };

  return { detectedCity, selectedCity: detectedCity, currentCity: detectedCity, loading, changeCity };
}
