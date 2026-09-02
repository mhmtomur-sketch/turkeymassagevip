import React, { useState } from 'react';
import { X, Send, Sparkles, MapPin, Phone, User, MessageCircle } from 'lucide-react';
import { db, DEFAULT_PACKAGES } from '../../services/db';
import { TURKEY_CITIES, KKTC_CITIES } from '../../data/locations';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackage?: string;
}

export default function PackageApplicationModal({ isOpen, onClose, defaultPackage = 'DIAMOND' }: ModalProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Masöz');
  const [country, setCountry] = useState<'TR' | 'KKTC'>('TR');
  const [citySlug, setCitySlug] = useState('izmir');
  const [district, setDistrict] = useState('');
  const [selectedPkg, setSelectedPkg] = useState(defaultPackage.toUpperCase());
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentCities = country === 'TR' ? TURKEY_CITIES : KKTC_CITIES;
  const currentCityObj = currentCities.find((c) => c.slug === citySlug) || currentCities[0];
  const districts = currentCityObj?.districts || [];

  const pkgs = db.getPackages();
  const pkgConfig = pkgs[selectedPkg] || DEFAULT_PACKAGES[selectedPkg] || { name: selectedPkg, price: 4000 };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Lütfen ad ve telefon alanlarını doldurunuz.');
      return;
    }

    setIsSubmitting(true);

    db.trackEvent({
      eventType: 'package_application_submit',
      packageType: selectedPkg,
      city: currentCityObj?.name
    });

    const result = db.addApplication({
      name,
      age,
      phone,
      category,
      country,
      city: currentCityObj?.name || 'İzmir',
      district: district || (districts[0] as any)?.name || 'Merkez',
      packageType: selectedPkg,
      packageName: pkgConfig.name,
      packagePrice: pkgConfig.price,
      note
    });

    setIsSubmitting(false);
    onClose();

    // WhatsApp doğrudan aç
    window.open(result.whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-750 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Üst Bar */}
        <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">VİTRİN İLAN BAŞVURUSU</h3>
              <p className="text-[10px] text-slate-400">Merkezi WhatsApp Hattı: 0540 322 55 55</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          {/* Paket Seçimi */}
          <div>
            <label className="block text-[11px] font-bold text-slate-300 mb-1">Yayın Paketi Seçin *</label>
            <div className="grid grid-cols-2 gap-1.5">
              {['DIAMOND', 'PREMIUM', 'GOLD', 'SILVER'].map((pk) => {
                const c = pkgs[pk] || DEFAULT_PACKAGES[pk];
                return (
                  <button
                    type="button"
                    key={pk}
                    onClick={() => setSelectedPkg(pk)}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      selectedPkg === pk
                        ? 'bg-cyan-500/20 border-cyan-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-xs font-black">{c?.name || pk}</div>
                    <div className="text-[11px] font-extrabold text-cyan-400">{c?.price?.toLocaleString('tr-TR')} ₺ / Ay</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Ad / İsim *</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="Adınız veya İşletme Adı"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Telefon / WhatsApp *</label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="tel"
                  required
                  placeholder="05XX XXX XX XX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Kategori *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Masöz">Masöz</option>
                <option value="Masör">Masör</option>
                <option value="Terapist">Terapist</option>
                <option value="Spa & Masaj Salonu">Spa & Masaj Salonu</option>
                <option value="Hamam">Hamam</option>
                <option value="Otel Spa">Otel Spa</option>
                <option value="Wellness">Wellness</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Şehir *</label>
              <select
                value={citySlug}
                onChange={(e) => {
                  setCitySlug(e.target.value);
                  setDistrict('');
                }}
                className="w-full px-2.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                {currentCities.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-[11px] font-bold text-slate-300 mb-1">İlçe</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="">Tümü / Merkez</option>
                {districts.map((d: any, idx: number) => (
                  <option key={idx} value={d.name || d}>{d.name || d}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 mb-1">Kısa Not / Ek Bilgi</label>
            <textarea
              rows={2}
              placeholder="Çalışma saatleriniz, tecrübeniz veya belirtmek istediğiniz detaylar..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all mt-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WHATSAPP İLE BAŞVURUYU TAMAMLA</span>
          </button>
        </form>
      </div>
    </div>
  );
}
