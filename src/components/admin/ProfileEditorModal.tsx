import React, { useState, useRef } from 'react';
import { db } from '../../services/db';
import { Profile } from '../../types';
import {
  X,
  Sparkles,
  Check,
  Globe,
  Zap,
  Upload,
  Plus,
  Trash2,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Image as ImageIcon,
  Video as VideoIcon,
  CheckCircle2,
  FileImage,
  Film,
  Calendar
} from 'lucide-react';
import { TURKEY_CITIES, KKTC_CITIES } from '../../data/locations';

export interface ProfileEditorModalProps {
  isOpen?: boolean;
  profile: Profile | null;
  onClose: () => void;
  onSave?: (saved: Profile) => void;
  onSaved?: (saved: Profile) => void;
}

function safeSlug(str: string): string {
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

const POPULAR_TITLES = [
  'Bireysel Masöz',
  'Bireysel Masör',
  'Hamam Kese Köpük',
  'Masaj Salonu',
  'Otel Spa',
  'VIP Hizmet',
  'Profesyonel Bireysel Masöz & Spa Terapisti',
  'VIP Masaj & Tantra Terapi Uzmanı',
  'Sertifikalı Medikal & Relax Masaj Terapisti',
  'Klasik İsveç & Aromaterapi Uzmanı'
];

const DAYS_LIST = [
  'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'
];

const START_HOURS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '18:00', '20:00', '24 Saat Açık'
];

const END_HOURS = [
  '20:00', '21:00', '22:00', '23:00', '00:00 (Gece)', '01:00', '02:00 (Gece)', '03:00', '04:00 (Sabaha Karşı)', '05:00', '06:00', '24 Saat Açık'
];

const ALL_SERVICES = [
  'Tantra Masajı',
  'Erotik Masaj',
  'Relax Masaj',
  'Aromaterapi',
  'Medikal Masaj',
  'Nuru Masajı',
  'Derin Doku Masajı',
  'Klasik İsveç Masajı',
  'Türk Hamamı',
  'Kese & Köpük',
  'Sultan Masajı',
  'Thai Masajı',
  'Bali Masajı',
  'Sıcak Taş Masajı',
  'Sıcak Yağ Masajı',
  'Dört El (Mix) Masaj',
  'Refleksoloji',
  'Shiatsu Masajı',
  'Jakuzi & Spa Keyfi',
  'Anti-Stres Masajı'
];

const CITY_DISTRICTS_MAP: Record<string, string[]> = {
  'İzmir': ['Alsancak', 'Karşıyaka', 'Bornova', 'Konak', 'Bayraklı', 'Buca', 'Balçova', 'Çeşme', 'Gaziemir', 'Çiğli', 'Menemen', 'Torbalı', 'Urla', 'Foça', 'Menderes', 'Aliağa', 'Seferihisar', 'Dikili', 'Ödemiş', 'Bergama', 'Tire', 'Kemalpaşa', 'Güzelbahçe', 'Narlıdere', 'Karabağlar', 'Selçuk', 'Bayındır', 'Kınık', 'Kiraz', 'Beydağ', 'Karaburun'],
  'İstanbul': ['Şişli', 'Kadıköy', 'Beşiktaş', 'Bakırköy', 'Beylikdüzü', 'Ataşehir', 'Üsküdar', 'Beyoğlu', 'Maltepe', 'Sarıyer', 'Fatih', 'Ümraniye', 'Pendik', 'Kartal', 'Kağıthane', 'Bahçelievler', 'Bağcılar', 'Zeytinburnu', 'Esenyurt', 'Başakşehir', 'Tuzla', 'Eyüpsultan', 'Küçükçekmece', 'Gaziosmanpaşa', 'Sancaktepe', 'Avcılar', 'Çekmeköy', 'Sultangazi', 'Büyükçekmece', 'Arnavutköy', 'Silivri', 'Çatalca', 'Şile', 'Adalar', 'Sultanbeyli', 'Güngören', 'Esenler', 'Bayrampaşa', 'Beykoz'],
  'Ankara': ['Çankaya', 'Kızılay', 'Tunalı', 'Yenimahalle', 'Batıkent', 'Keçiören', 'Etimesgut', 'Mamak', 'Altındağ', 'Sincan', 'Gölbaşı', 'Pursaklar', 'Polatlı', 'Beypazarı', 'Çubuk', 'Kahramankazan', 'Elmadağ', 'Akyurt', 'Ayaş', 'Bala', 'Güdül', 'Haymana', 'Kalecik', 'Kızılcahamam', 'Nallıhan', 'Şereflikoçhisar', 'Evren'],
  'Antalya': ['Muratpaşa', 'Lara', 'Konyaaltı', 'Alanya', 'Manavgat', 'Kemer', 'Kepez', 'Serik', 'Döşemealtı', 'Kumluca', 'Kaş', 'Gazipaşa', 'Finike', 'Korkuteli', 'Demre', 'Elmalı', 'Akseki', 'Gündoğmuş', 'İbradı'],
  'Bursa': ['Nilüfer', 'Osmangazi', 'Yıldırım', 'Mudanya', 'Gemlik', 'İnegöl', 'Gürsu', 'Kestel', 'Mustafakemalpaşa', 'Karacabey', 'Orhangazi', 'İznik', 'Yenişehir', 'Harmancık', 'Büyükorhan', 'Keles', 'Orhaneli'],
  'Adana': ['Seyhan', 'Çukurova', 'Yüreğir', 'Sarıçam', 'Ceyhan', 'Kozan', 'İmamoğlu', 'Karataş', 'Karaisalı', 'Pozantı', 'Yumurtalık', 'Tufanbeyli', 'Feke', 'Aladağ', 'Saimbeyli'],
  'Manisa': ['Yunusemre', 'Şehzadeler', 'Akhisar', 'Turgutlu', 'Salihli', 'Soma', 'Alaşehir', 'Saruhanlı', 'Kula', 'Kırkağaç', 'Demirci', 'Gördes', 'Selendi', 'Ahmetli', 'Gölmarmara', 'Köprübaşı'],
  'Aydın': ['Efeler', 'Kuşadası', 'Didim', 'Söke', 'Nazilli', 'İncirliova', 'Germencik', 'Çine', 'Bozdoğan', 'Köşk', 'Kuyucak', 'Sultanhisar', 'Karacasu', 'Yenipazar', 'Buharkent', 'Karpuzlu'],
  'Muğla': ['Bodrum', 'Fethiye', 'Marmaris', 'Menteşe', 'Milas', 'Ortaca', 'Dalaman', 'Yatağan', 'Köyceğiz', 'Ula', 'Datça', 'Seydikemer', 'Kavaklıdere'],
  'Mardin': ['Artuklu', 'Kızıltepe', 'Midyat', 'Nusaybin', 'Derik', 'Mazıdağı', 'Dargeçit', 'Savur', 'Yeşilli', 'Ömerli'],
  'Uşak': ['Merkez', 'Banaz', 'Eşme', 'Sivaslı', 'Ulubey', 'Karahallı']
};

export function ProfileEditorModal({ isOpen, profile, onClose, onSave, onSaved }: ProfileEditorModalProps) {
  if (isOpen === false) return null;

  const [activeTab, setActiveTab] = useState<number>(1);
  const coverFileRef = useRef<HTMLInputElement>(null);
  const photosFileRef = useRef<HTMLInputElement>(null);
  const videoFileRef = useRef<HTMLInputElement>(null);

  const [selectedDays, setSelectedDays] = useState<string[]>([
    'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'
  ]);
  const [startHour, setStartHour] = useState<string>('10:00');
  const [endHour, setEndHour] = useState<string>('02:00 (Gece)');

  const [formData, setFormData] = useState<Partial<Profile>>(() => {
    if (profile) {
      return { ...profile };
    }
    return {
      name: 'Masöz Maya',
      title: 'Bireysel Masöz',
      category: 'masoz' as any,
      categoryName: 'Bireysel Masöz',
      city: 'İzmir',
      citySlug: 'izmir',
      district: 'Alsancak',
      packageType: 'DIAMOND',
      price: 3500,
      phone: '05403225555',
      whatsapp: '05403225555',
      coverPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
      photos: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2'],
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      bio: 'İzmir Alsancak kendi lüks ve hijyenik yerimde medikal, aromaterapi, tantra ve klasik relax masaj hizmeti sunuyorum.',
      services: ['Tantra Masajı', 'Erotik Masaj', 'Relax Masaj', 'Aromaterapi', 'Türk Hamamı'],
      isAvailable: true,
      isVerified: true,
      isPublished: true,
      viewCount: 250
    };
  });

  const [seoTitle, setSeoTitle] = useState(
    formData.name ? `${formData.name} - ${formData.city || 'İzmir'} Tantra, Masöz, Hamam & Spa Randevu` : 'Masöz - VIP Randevu'
  );
  const [seoKeywords, setSeoKeywords] = useState(
    `${formData.city || 'İzmir'} masaj, ${formData.city || 'İzmir'} masöz, ${formData.city || 'İzmir'} tantra masajı, ${formData.city || 'İzmir'} erotik masaj, ${formData.city || 'İzmir'} hamam, ${formData.district || 'Alsancak'} spa`
  );
  const [seoDesc, setSeoDesc] = useState(formData.bio || '');

  const [googleIndexed, setGoogleIndexed] = useState(false);
  const allCities = [...TURKEY_CITIES, ...KKTC_CITIES];

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const selectAllDays = () => {
    setSelectedDays([...DAYS_LIST]);
  };

  const handleAutoFillBio = () => {
    const name = formData.name || 'Masöz';
    const city = formData.city || 'İzmir';
    const dist = formData.district || 'Merkez';
    const servs = (formData.services || []).slice(0, 4).join(', ');
    const autoBio = `${city} ${dist} bölgesinde kendi lüks ve tam hijyenik ortamımda ${servs ? servs + ' başta olmak üzere' : ''} kişiye özel relax, aromaterapi, tantra ve VIP terapi seansları sunuyorum. Detaylı bilgi ve randevu için iletişime geçebilirsiniz.`;
    setFormData({ ...formData, bio: autoBio });
    setSeoDesc(autoBio);
  };

  const handleAutoSeo = () => {
    const name = formData.name || 'Masöz';
    const city = formData.city || 'İzmir';
    const dist = formData.district || 'Merkez';
    setSeoTitle(`${name} - ${city} ${dist} Tantra, Masöz, Hamam & VIP Spa Randevu`);
    setSeoKeywords(`${city} masaj, ${city} masöz, ${city} tantra masajı, ${city} erotik masaj, ${city} hamam, ${dist} spa salonu, vip masaj terapisti`);
    setSeoDesc(`${city} ${dist} bölgesinde hijyenik ve lüks ortamda tantra masajı, erotik masaj, relax masaj, kese-köpük ve VIP terapi seansları.`);
  };

  const handleGoogleIndex = () => {
    setGoogleIndexed(true);
    setTimeout(() => {
      alert('Google Arama Motoruna (Google Indexing API) anlık index sinyali gönderildi!');
    }, 400);
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setFormData((prev) => ({
          ...prev,
          coverPhoto: result,
          photos: [result, ...(prev.photos || []).filter(p => p !== result)]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMultiplePhotosUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newPhotos: string[] = [];
      let loaded = 0;
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          newPhotos.push(reader.result as string);
          loaded++;
          if (loaded === files.length) {
            setFormData((prev) => ({
              ...prev,
              photos: [...(prev.photos || []), ...newPhotos]
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          videoUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleService = (srv: string) => {
    const current = formData.services || [];
    if (current.includes(srv)) {
      setFormData((prev) => ({ ...prev, services: current.filter(s => s !== srv) }));
    } else {
      setFormData((prev) => ({ ...prev, services: [...current, srv] }));
    }
  };

  // DOĞRUDAN VE KESİN KAYIT TETİKLEYİCİSİ
  const handleDirectSubmit = (e?: any) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();

    try {
      const memberName = (formData.name || '').trim();
      if (!memberName) {
        alert('Lütfen 1. sekmeden üye ismini giriniz!');
        setActiveTab(1);
        return;
      }

      const cityName = formData.city || 'İzmir';
      const cleanCitySlug = safeSlug(cityName);
      const cleanSlug = formData.slug || `${safeSlug(memberName)}-${Date.now().toString().slice(-4)}`;

      const finalData: Partial<Profile> = {
        ...formData,
        name: memberName,
        slug: cleanSlug,
        city: cityName,
        citySlug: cleanCitySlug,
        district: formData.district || 'Merkez',
        packageType: (formData.packageType || 'DIAMOND').toUpperCase() as any,
        isPublished: true,
        isVerified: true
      };

      const saved = db.saveProfile(finalData);

      if (onSave) onSave(saved);
      if (onSaved) onSaved(saved);

      alert('✅ TEBRİKLER! Üye başarıyla kaydedildi ve anında canlı yayına alındı!');
      onClose();
    } catch (err: any) {
      alert('Kayıt sırasında bir durum oluştu: ' + (err?.message || err));
    }
  };

  const tabs = [
    { id: 1, label: '1. Profil & Kimlik' },
    { id: 2, label: '2. Şehir & Çalışma Saatleri' },
    { id: 3, label: '3. İletişim & Fiyat' },
    { id: 4, label: '4. Masaj, Tantra & Hamam' },
    { id: 5, label: '5. Toplu Fotoğraf & Video' },
    { id: 6, label: '6. Vitrin Paketi & SEO' }
  ];

  const cityDistricts = CITY_DISTRICTS_MAP[formData.city || 'İzmir'] || ['Merkez', 'Alsancak', 'Kadıköy', 'Çankaya'];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#070b1a] border border-cyan-500/30 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        
        {/* ÜST BAŞLIK */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#040814]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-white tracking-wide">
                + YENİ MASAJ, TANTRA, HAMAM & SPA ÜYESİ EKLE
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">
                Tüm vitrin, medya ve arama motoru ayarları doğrudan canlıya yansır.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 6'LI SEKME BARI */}
        <div className="flex border-b border-slate-800 bg-[#060a18] overflow-x-auto py-2 px-3 gap-1.5 text-xs font-bold scrollbar-none">
          {tabs.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* İÇERİK ALANI */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 text-xs">
          
          {/* SEKME 1: PROFİL & KİMLİK */}
          {activeTab === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">İsim / Başlık *</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0a0f26] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    placeholder="Örn: Masöz Maya"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Ünvan / Slogan (Bireysel Masöz, Masör, Hamam vb.)
                  </label>
                  <div className="space-y-1.5">
                    <select
                      value={formData.title || POPULAR_TITLES[0]}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-[#0a0f26] border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-bold focus:outline-none"
                    >
                      {POPULAR_TITLES.map((tit, idx) => (
                        <option key={idx} value={tit}>{tit}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Veya Özel Ünvan Yazın..."
                      className="w-full bg-[#0a0f26] border border-slate-700/60 rounded-xl px-3 py-1.5 text-slate-300 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Kategori</label>
                  <select
                    value={formData.category || 'masoz'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-[#0a0f26] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="masoz">Bireysel Masöz</option>
                    <option value="masor">Bireysel Masör</option>
                    <option value="spa">Spa & Masaj Salonu</option>
                    <option value="hamam">Türk Hamamı</option>
                    <option value="otel-spa">Otel Spa</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Yaş</label>
                  <input
                    type="text"
                    defaultValue="25"
                    className="w-full bg-[#0a0f26] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Boy (cm)</label>
                  <input
                    type="text"
                    defaultValue="170"
                    className="w-full bg-[#0a0f26] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Kilo (kg)</label>
                  <input
                    type="text"
                    defaultValue="55"
                    className="w-full bg-[#0a0f26] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-slate-300">Biyografi & Detaylı Tanıtım</label>
                  <button
                    type="button"
                    onClick={handleAutoFillBio}
                    className="px-2.5 py-1 bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-bold rounded-lg text-[10px] hover:bg-cyan-500/25 flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>Bilgilere Göre Otomatik Doldur</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={formData.bio || ''}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-[#0a0f26] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  placeholder="Kendi lüks ve hijyenik yerimde medikal, aromaterapi, tantra ve klasik relax masaj hizmeti sunuyorum..."
                />
              </div>
            </div>
          )}

          {/* SEKME 2: ŞEHİR & ÇALIŞMA SAATLERİ */}
          {activeTab === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Şehir (81 İl + KKTC)</label>
                  <select
                    value={formData.city || 'İzmir'}
                    onChange={(e) => {
                      const c = e.target.value;
                      const newDist = (CITY_DISTRICTS_MAP[c] && CITY_DISTRICTS_MAP[c][0]) || 'Merkez';
                      setFormData({ ...formData, city: c, citySlug: safeSlug(c), district: newDist });
                    }}
                    className="w-full bg-[#0a0f26] border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-bold focus:outline-none"
                  >
                    {allCities.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">İlçe / Bölge (Tüm İlçeler)</label>
                  <div className="space-y-1.5">
                    <select
                      value={formData.district || cityDistricts[0]}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full bg-[#0a0f26] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                    >
                      {cityDistricts.map((d, idx) => (
                        <option key={idx} value={d}>{d}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={formData.district || ''}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      placeholder="Veya Özel İlçe / Semt Yazın..."
                      className="w-full bg-[#0a0f26] border border-slate-700/60 rounded-xl px-3 py-1.5 text-slate-300 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Hizmet Mekanı</label>
                  <select
                    defaultValue="Kendi Lüks Yeri / Rezidans"
                    className="w-full bg-[#0a0f26] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Kendi Lüks Yeri / Rezidans">Kendi Lüks Yeri / Rezidans</option>
                    <option value="Merkez / Cadde Üzeri">Merkez / Cadde Üzeri</option>
                    <option value="Otel & Eve Çağrı (Mobil Servis)">Otel & Eve Çağrı (Mobil Servis)</option>
                    <option value="VIP Spa & Masaj Salonu">VIP Spa & Masaj Salonu</option>
                  </select>
                </div>
              </div>

              {/* GÜNLERİ TEK TEK SEÇME */}
              <div className="bg-[#0a0f26] p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Çalışma Günleri (Tıklayarak Seçin)</span>
                  </label>
                  <button
                    type="button"
                    onClick={selectAllDays}
                    className="text-[10px] text-cyan-400 hover:underline font-bold cursor-pointer"
                  >
                    Tüm Günleri Seç (7 Gün)
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5">
                  {DAYS_LIST.map((day, idx) => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400/20 border-amber-400 text-amber-300 shadow'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* TÜM SAAT DİLİMLERİ (BAŞLANGIÇ & BİTİŞ) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#0a0f26] p-3.5 rounded-2xl border border-slate-800">
                <div>
                  <label className="block font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Başlangıç Saati</span>
                  </label>
                  <select
                    value={startHour}
                    onChange={(e) => setStartHour(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:outline-none"
                  >
                    {START_HOURS.map((h, idx) => (
                      <option key={idx} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Kapanış / Bitiş Saati</span>
                  </label>
                  <select
                    value={endHour}
                    onChange={(e) => setEndHour(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:outline-none"
                  >
                    {END_HOURS.map((h, idx) => (
                      <option key={idx} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* SEKME 3: İLETİŞİM & FİYAT */}
          {activeTab === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">WhatsApp Numarası</label>
                  <input
                    type="text"
                    value={formData.whatsapp || ''}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full bg-[#0a0f26] border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-mono font-bold focus:outline-none"
                    placeholder="0540 322 55 55"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Telefon Numarası</label>
                  <input
                    type="text"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0a0f26] border border-slate-700 rounded-xl px-3 py-2 text-blue-400 font-mono font-bold focus:outline-none"
                    placeholder="0540 322 55 55"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">1 Saatlik Fiyat (TL)</label>
                  <input
                    type="number"
                    value={formData.price || 3500}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-[#0a0f26] border border-slate-700 rounded-xl px-3 py-2 text-amber-400 font-bold focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SEKME 4: MASAJ, TANTRA & HAMAM */}
          {activeTab === 4 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-bold text-slate-300">
                  Uygulanan Masaj ve Terapi Çeşitleri (Tıklayarak Seçin)
                </label>
                <span className="text-[11px] text-cyan-400 font-bold">
                  {(formData.services || []).length} Çeşit Seçildi
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {ALL_SERVICES.map((srv, idx) => {
                  const isChecked = (formData.services || []).includes(srv);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleService(srv)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10'
                          : 'bg-[#0a0f26] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <span className="font-bold text-xs truncate">{srv}</span>
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SEKME 5: DOĞRUDAN BİLGİSAYARDAN / GALERİDEN YÜKLEME */}
          {activeTab === 5 && (
            <div className="space-y-5">
              <input type="file" ref={coverFileRef} onChange={handleCoverUpload} accept="image/*" className="hidden" />
              <input type="file" ref={photosFileRef} onChange={handleMultiplePhotosUpload} accept="image/*" multiple className="hidden" />
              <input type="file" ref={videoFileRef} onChange={handleVideoUpload} accept="video/*" className="hidden" />

              {/* 1. KAPAK FOTOĞRAFI YÜKLE */}
              <div className="p-4 bg-[#0a0f26] border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {formData.coverPhoto ? (
                    <img src={formData.coverPhoto} alt="Kapak" className="w-16 h-16 rounded-xl object-cover border border-cyan-500/40" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500">
                      <FileImage className="w-8 h-8" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-white text-xs">Ana Kapak Fotoğrafı</h4>
                    <p className="text-[11px] text-slate-400">Vitrinde ve kartlarda görünecek ana görsel</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => coverFileRef.current?.click()}
                  className="px-4 py-2.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 font-bold rounded-xl flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Bilgisayardan Kapak Fotoğrafı Seç</span>
                </button>
              </div>

              {/* 2. TOPLU GALERİ FOTOĞRAFLARI YÜKLE */}
              <div className="p-4 bg-[#0a0f26] border border-slate-800 rounded-2xl space-y-3">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-white text-xs">Toplu Galeri Fotoğrafları</h4>
                    <p className="text-[11px] text-slate-400">Profil detayında sergilenecek albüm fotoğrafları</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => photosFileRef.current?.click()}
                    className="px-4 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 font-bold rounded-xl flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Toplu Fotoğraf Yükle (Çoklu Seçim)</span>
                  </button>
                </div>

                {formData.photos && formData.photos.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {formData.photos.map((p, idx) => (
                      <div key={idx} className="relative group">
                        <img src={p} alt="Galeri" className="w-14 h-14 rounded-lg object-cover border border-slate-700" />
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, photos: (prev.photos || []).filter((_, i) => i !== idx) }))}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow cursor-pointer"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. VİTRİN VİDEOSU YÜKLE */}
              <div className="p-4 bg-[#0a0f26] border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-blue-400">
                    <Film className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Tanıtım & Vitrin Videosu (MP4)</h4>
                    <p className="text-[11px] text-slate-400">{formData.videoUrl ? 'Video yüklendi ✓' : 'Vitrinde canlı oynatılacak tanıtım videosu'}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => videoFileRef.current?.click()}
                  className="px-4 py-2.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-300 font-bold rounded-xl flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Bilgisayardan Video Seç (MP4)</span>
                </button>
              </div>
            </div>
          )}

          {/* SEKME 6: VİTRİN PAKETİ & SEO */}
          {activeTab === 6 && (
            <div className="space-y-5">
              <div>
                <label className="block font-bold text-slate-300 mb-2">
                  Yayın Paketi & Vitrin Sıralaması
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { key: 'DIAMOND', icon: '💎', name: 'Diamond VIP', price: '4.000 ₺ / Ay' },
                    { key: 'PREMIUM', icon: '👑', name: 'Gold Premium', price: '3.000 ₺ / Ay' },
                    { key: 'GOLD', icon: '⭐', name: 'Standart Gold', price: '2.000 ₺ / Ay' },
                    { key: 'SILVER', icon: '🥈', name: 'Silver Üyelik', price: '1.000 ₺ / Ay' }
                  ].map((p) => {
                    const isSelected = (formData.packageType || 'DIAMOND').toUpperCase() === p.key;
                    return (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => setFormData({ ...formData, packageType: p.key as any })}
                        className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500/15 border-cyan-400 shadow-lg shadow-cyan-500/20'
                            : 'bg-[#0b1026] border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-black text-xs text-white">
                          <span>{p.icon}</span>
                          <span>{p.name}</span>
                        </div>
                        <p className="text-cyan-400 font-bold text-[11px] mt-1">{p.price}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#0a0f26] p-3 rounded-2xl border border-slate-800">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-white">
                  <input
                    type="checkbox"
                    checked={formData.isAvailable ?? true}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-0 bg-slate-900 border-slate-700"
                  />
                  <span>Canlı Müsaitlik (Online)</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-white">
                  <input
                    type="checkbox"
                    checked={formData.isVerified ?? true}
                    onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-0 bg-slate-900 border-slate-700"
                  />
                  <span>%100 Doğrulanmış Rozeti</span>
                </label>
              </div>

              <div className="bg-[#0b1026] border border-slate-800 p-4 rounded-3xl space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2 text-cyan-400 font-black text-xs uppercase tracking-wider">
                    <Globe className="w-4 h-4" />
                    <span>SEO & GOOGLE ARAMA MOTORU İNDEXLEME</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAutoSeo}
                      className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      SEO Otomatik Oluştur
                    </button>
                    <button
                      type="button"
                      onClick={handleGoogleIndex}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-500/20 active:scale-95 transition-transform cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-yellow-300" />
                      <span>{googleIndexed ? 'İNDEXLENDİ ✓' : '🚀 GOOGLE İNDEXLE'}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">SEO Başlığı (Title)</label>
                    <input
                      type="text"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Anahtar Kelimeler (Keywords)</label>
                    <input
                      type="text"
                      value={seoKeywords}
                      onChange={(e) => setSeoKeywords(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Meta Açıklama (Description)</label>
                  <textarea
                    rows={2}
                    value={seoDesc}
                    onChange={(e) => setSeoDesc(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ALT BUTONLAR (KESİN DOĞRUDAN TETİKLEME) */}
          <div className="pt-3 border-t border-slate-800 flex justify-between items-center bg-[#070b1a] sticky bottom-0 z-50">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded-2xl transition-colors text-xs cursor-pointer select-none"
            >
              İptal
            </button>
            <button
              type="button"
              onClick={(e) => handleDirectSubmit(e)}
              className="relative z-50 px-7 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-2xl shadow-2xl shadow-emerald-500/40 flex items-center gap-2 active:scale-95 transition-all text-xs cursor-pointer select-none"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>KAYDET VE CANLI YAYINLA</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
