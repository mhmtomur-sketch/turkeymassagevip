import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, Crown, MessageCircle, User, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CATEGORIES } from '../../data/categories';
import { TURKEY_PROVINCES, KKTC_REGIONS } from '../../data/locations';
import { PACKAGES } from '../../data/packages';
import { db, PUBLIC_WHATSAPP_NUMBER, DISPLAY_WHATSAPP_NUMBER } from '../../services/db';
import { CategorySlug, PackageType, ProfileType } from '../../types';

interface AdSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: PackageType;
}

export const AdSubmitModal: React.FC<AdSubmitModalProps> = ({
  isOpen,
  onClose,
  initialPackage = 'DIAMOND',
}) => {
  const [profileType, setProfileType] = useState<ProfileType>('individual');
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>(25);
  const [category, setCategory] = useState<CategorySlug>('masoz');
  const [country, setCountry] = useState<'TR' | 'KKTC'>('TR');
  const [city, setCity] = useState('İzmir');
  const [district, setDistrict] = useState('Konak');
  const [neighborhood, setNeighborhood] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [packageType, setPackageType] = useState<PackageType>(initialPackage);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedWhatsappUrl, setGeneratedWhatsappUrl] = useState('');

  useEffect(() => {
    if (initialPackage) {
      setPackageType(initialPackage);
    }
  }, [initialPackage, isOpen]);

  if (!isOpen) return null;

  const cityList = country === 'KKTC' ? KKTC_REGIONS : TURKEY_PROVINCES;
  const currentCityObj = cityList.find((c) => c.name === city) || cityList[0];
  const districtList = currentCityObj?.districts || [];

  const selectedPkgConfig = PACKAGES[packageType];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    db.logEvent({ packageId: packageType, eventType: 'package_application_submit' });

    const { application, whatsappUrl } = db.addApplication({
      type: profileType,
      name: name.trim(),
      age: age ? Number(age) : undefined,
      category,
      country,
      city,
      district,
      neighborhood: neighborhood.trim() || undefined,
      phone: phone.trim(),
      whatsapp: whatsapp.trim() || phone.trim(),
      packageType,
      price: selectedPkgConfig.priceMonthly,
      notes: notes.trim() || undefined,
      sourcePage: window.location.pathname,
    });

    setGeneratedWhatsappUrl(whatsappUrl);
    setIsSubmitted(true);

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Automatically trigger WhatsApp redirect
    db.logEvent({ packageId: packageType, eventType: 'package_application_whatsapp' });
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto glass-modal rounded-3xl p-5 sm:p-7 border border-white/15 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-dark-900 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">Başvurunuz Kaydedildi & WhatsApp Açılıyor!</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Talebiniz sistemimize işlendi. <strong>{selectedPkgConfig.name}</strong> başvurunuz <strong>{DISPLAY_WHATSAPP_NUMBER}</strong> müşteri temsilcimize iletilmektedir.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
              <a
                href={generatedWhatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" /> WhatsApp'ta Mesajı Gönder
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-dark-900 border border-white/10 text-slate-300 text-xs font-semibold"
              >
                Kapat
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Header */}
            <div>
              <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-0.5">
                <Sparkles className="w-3.5 h-3.5" /> Vitrin & İlan Başvuru Formu
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white">İlan Ver & Vitrinde Yerini Al</h2>
              <div className="text-xs text-slate-400">
                Merkezi İletişim: <span className="text-emerald-400 font-bold">{DISPLAY_WHATSAPP_NUMBER}</span>
              </div>
            </div>

            {/* Type Switcher */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setProfileType('individual')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  profileType === 'individual'
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-sm'
                    : 'bg-dark-900/60 border-white/5 text-slate-400'
                }`}
              >
                <User className="w-3.5 h-3.5" /> Bireysel Terapist
              </button>

              <button
                type="button"
                onClick={() => setProfileType('business')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  profileType === 'business'
                    ? 'bg-pink-500/20 border-pink-500 text-pink-400 shadow-sm'
                    : 'bg-dark-900/60 border-white/5 text-slate-400'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" /> İşletme (Spa / Salon / Otel)
              </button>
            </div>

            {/* General Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {profileType === 'individual' ? 'Adınız / Profil Adı *' : 'İşletme / Salon Adı *'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={profileType === 'individual' ? 'Örn: Eda Masöz' : 'Örn: Royal Lotus Spa'}
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:theme-accent-border"
                />
              </div>

              {profileType === 'individual' ? (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Yaş *</label>
                  <input
                    type="number"
                    required
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:theme-accent-border"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Kategori *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategorySlug)}
                    className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:theme-accent-border"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.slug}>{c.title}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Location Selection (Cascading: Country -> City -> District -> Semt) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Ülke</label>
                <select
                  value={country}
                  onChange={(e) => {
                    const c = e.target.value as 'TR' | 'KKTC';
                    setCountry(c);
                    setCity(c === 'TR' ? 'İzmir' : 'Girne (Kyrenia)');
                  }}
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white"
                >
                  <option value="TR">🇹🇷 Türkiye</option>
                  <option value="KKTC">🌴 KKTC</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Şehir *</label>
                <select
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    const selected = cityList.find((item) => item.name === e.target.value);
                    if (selected && selected.districts.length > 0) {
                      setDistrict(selected.districts[0].name);
                    }
                  }}
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white"
                >
                  {cityList.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">İlçe *</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white"
                >
                  {districtList.map((d) => (
                    <option key={d.slug} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Semt</label>
                <input
                  type="text"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="Örn: Alsancak"
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Telefon / WhatsApp Numarası *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0532 000 00 00"
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:theme-accent-border"
                />
              </div>

              {profileType === 'individual' && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Kategori *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategorySlug)}
                    className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:theme-accent-border"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.slug}>{c.title}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Package Choice (Updated 4.000 / 3.000 / 2.000 / 1.000 TL) */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Seçilen Vitrin Paketi
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['DIAMOND', 'PREMIUM', 'GOLD', 'SILVER'] as PackageType[]).map((pkgKey) => {
                  const pkg = PACKAGES[pkgKey];
                  const isSelected = packageType === pkgKey;
                  const occupancy = db.getOccupancy(pkgKey);
                  return (
                    <button
                      type="button"
                      key={pkgKey}
                      onClick={() => setPackageType(pkgKey)}
                      className={`p-2.5 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? 'bg-dark-850 border-cyan-400 shadow-md ring-1 ring-cyan-400'
                          : 'bg-dark-900/60 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="text-[10px] font-black uppercase" style={{ color: pkg.color }}>
                        {pkg.name}
                      </div>
                      <div className="text-xs font-black text-white mt-0.5">
                        {pkg.priceMonthly.toLocaleString('tr-TR')} TL
                      </div>
                      <div className="text-[9px] text-cyan-400 font-bold mt-0.5">
                        %{occupancy.percentage} Dolu
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Kısa Not / Ek Bilgi
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Eklemek istediğiniz çalışma saatleri veya özel notlar..."
                className="w-full bg-dark-900 border border-white/10 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-1">
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:opacity-95 text-white font-black text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-500" />
                <span>WHATSAPP İLE BAŞVURUYU GÖNDER (0540 322 55 55)</span>
              </button>
              <div className="text-center text-[9px] text-slate-500 mt-1.5">
                Başvurunuz anında veritabanımıza kaydedilir ve müşteri temsilcimize WhatsApp mesajı açılır.
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
