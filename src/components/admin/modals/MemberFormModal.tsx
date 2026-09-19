import React, { useState } from 'react';
import { X, Sparkles, Plus, Trash2, Check, Search } from 'lucide-react';
import { Profile } from '../../../types';
import { db, slugifyTurkish } from '../../../services/db';
import { TURKEY_CITIES, KKTC_CITIES } from '../../../data/locations';
import { MASSAGE_SERVICE_CATALOG } from '../../../data/massageServices';

interface MemberFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Profile | null;
}

export function MemberFormModal({ isOpen, onClose, onSuccess, initialData }: MemberFormModalProps) {
  if (!isOpen) return null;

  const allCities = [...TURKEY_CITIES, ...KKTC_CITIES];
  const [name, setName] = useState(initialData?.name || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [category, setCategory] = useState(initialData?.category || 'masoz');
  const [packageType, setPackageType] = useState<string>(initialData?.packageType || 'DIAMOND');
  const [city, setCity] = useState(initialData?.city || 'İzmir');
  const [district, setDistrict] = useState(initialData?.district || 'Konak');
  const [phone, setPhone] = useState(initialData?.phone || '0540 322 55 55');
  const [whatsapp, setWhatsapp] = useState(initialData?.whatsapp || '0540 322 55 55');
  const [age, setAge] = useState(initialData?.age || 24);
  const [height, setHeight] = useState(initialData?.height || 170);
  const [weight, setWeight] = useState(initialData?.weight || 54);
  const [price, setPrice] = useState(initialData?.price || 3000);
  const [workingHours, setWorkingHours] = useState(initialData?.workingHours || '11:00 - 03:00');
  const [about, setAbout] = useState(initialData?.about || '');
  const [photos, setPhotos] = useState<string[]>(initialData?.photos || ['https://images.unsplash.com/photo-1544005313-94ddf0286df2']);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [services, setServices] = useState<string[]>(initialData?.services || ['Tantra Masajı', 'Klasik İsveç Masajı']);
  const [serviceSearch, setServiceSearch] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const currentCityObj = allCities.find(c => slugifyTurkish(c.name) === slugifyTurkish(city)) || allCities[0];
  const currentDistricts = currentCityObj?.districts || [{ name: 'Merkez' }];

  const handleAddPhoto = () => {
    if (newPhotoUrl.trim()) {
      setPhotos([...photos, newPhotoUrl.trim()]);
      setNewPhotoUrl('');
    }
  };

  const handleRemovePhoto = (idx: number) => {
    setPhotos(photos.filter((_, i) => i !== idx));
  };

  const toggleService = (srv: string) => {
    if (services.includes(srv)) {
      setServices(services.filter(s => s !== srv));
    } else {
      setServices([...services, srv]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setMsg('Lütfen üye adını giriniz.');
      return;
    }

    setIsSaving(true);

    db.saveProfile({
      id: initialData?.id,
      name: name.trim(),
      title: title.trim() || `${city} Profesyonel Masöz`,
      category: category as any,
      categoryName: category === 'hamam' ? 'Türk Hamamı' : category === 'spa' ? 'Spa & Salon' : category === 'masor' ? 'Masör' : 'Masöz',
      packageType: packageType as any,
      city,
      cityName: city,
      citySlug: slugifyTurkish(city),
      district,
      districtSlug: slugifyTurkish(district),
      phone: phone.trim(),
      whatsapp: whatsapp.trim() || phone.trim(),
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      price: Number(price),
      currency: 'TL',
      workingHours,
      about: about.trim() || 'Seçkin, hijyenik ve lüks ortamda profesyonel masaj hizmeti sunulmaktadır.',
      photos: photos.length > 0 ? photos : ['https://images.unsplash.com/photo-1544005313-94ddf0286df2'],
      coverPhoto: photos[0] || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
      services: services.length > 0 ? services : ['Tantra Masajı', 'Klasik İsveç Masajı'],
      isAvailable: true,
      isVerified: true,
      active: true,
      published: true
    });

    setIsSaving(false);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-750 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>{initialData ? 'Üye Profilini Güncelle' : '✨ Yeni VIP Üye Ekle & Canlı Yayınla'}</span>
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-4 space-y-4 overflow-y-auto flex-1">
          {msg && (
            <div className="p-2.5 bg-rose-500/20 border border-rose-500/50 rounded-xl text-rose-300 text-xs font-bold">
              {msg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Üye Adı / Salon İsmi *</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Örn: Masöz Asya VIP"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Alt Başlık / Ünvan</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Örn: İzmir VIP Tantra & Terapi Uzmanı"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Kategori</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-cyan-300 font-bold focus:outline-none"
              >
                <option value="masoz">💆‍♀️ Bireysel Masöz</option>
                <option value="terapist">✨ VIP Terapist</option>
                <option value="hamam">♨️ Türk Hamamı</option>
                <option value="spa">🏨 Spa & Salon</option>
                <option value="otel-spa">⭐ Otel Spa</option>
                <option value="masor">💆‍♂️ Masör</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Vitrin Paketi</label>
              <select
                value={packageType}
                onChange={e => setPackageType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-amber-300 font-black focus:outline-none"
              >
                <option value="DIAMOND">💎 DIAMOND VIP</option>
                <option value="PREMIUM">👑 GOLD PREMIUM</option>
                <option value="GOLD">⭐ STANDART GOLD</option>
                <option value="SILVER">🥈 SILVER</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Şehir (81 İl)</label>
              <select
                value={city}
                onChange={e => {
                  setCity(e.target.value);
                  const found = allCities.find(c => slugifyTurkish(c.name) === slugifyTurkish(e.target.value));
                  if (found && found.districts && found.districts.length > 0) {
                    setDistrict((found.districts[0] as any).name || 'Merkez');
                  }
                }}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-bold focus:outline-none"
              >
                {allCities.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">İlçe</label>
              <select
                value={district}
                onChange={e => setDistrict(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
              >
                {currentDistricts.map((d: any, idx: number) => (
                  <option key={idx} value={d.name || d}>{d.name || d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">WhatsApp</label>
              <input
                type="text"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                placeholder="0540 322 55 55"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-emerald-300 font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Telefon</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="0540 322 55 55"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-amber-300 font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Fiyat (TL)</label>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                placeholder="3000"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Saatler</label>
              <input
                type="text"
                value={workingHours}
                onChange={e => setWorkingHours(e.target.value)}
                placeholder="11:00 - 03:00"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          {/* FOTOĞRAFLAR */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="block text-[11px] font-bold text-slate-300">Profil Fotoğrafları</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newPhotoUrl}
                onChange={e => setNewPhotoUrl(e.target.value)}
                placeholder="Fotoğraf URL (https://...)"
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddPhoto}
                className="px-3 py-2 bg-cyan-500 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Ekle</span>
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto py-2">
              {photos.map((p, idx) => (
                <div key={idx} className="relative w-16 h-20 rounded-xl overflow-hidden border border-slate-750 shrink-0 group">
                  <img src={p} alt="" className="w-full h-full object-cover" />
                  {idx === 0 && (
                    <span className="absolute top-1 left-1 bg-amber-400 text-slate-950 text-[8px] font-black px-1 rounded">KAPAK</span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    className="absolute inset-0 bg-rose-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 60+ MASAJ SEÇİCİ */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-bold text-slate-300">
                Sunduğu Masaj Hizmetleri ({services.length} Seçili)
              </label>
              <div className="relative w-48">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                <input
                  type="text"
                  value={serviceSearch}
                  onChange={e => setServiceSearch(e.target.value)}
                  placeholder="Masaj ara..."
                  className="w-full pl-8 pr-2 py-1 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="max-h-40 overflow-y-auto space-y-3 p-2 bg-slate-950 rounded-xl border border-slate-850">
              {MASSAGE_SERVICE_CATALOG.map((cat, cIdx) => {
                const filteredItems = cat.items.filter(item => 
                  !serviceSearch.trim() || item.toLowerCase().includes(serviceSearch.toLowerCase())
                );
                if (filteredItems.length === 0) return null;

                return (
                  <div key={cIdx} className="space-y-1">
                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-wider block">
                      {cat.categoryName}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {filteredItems.map((item, iIdx) => {
                        const isSelected = services.includes(item);
                        return (
                          <button
                            key={iIdx}
                            type="button"
                            onClick={() => toggleService(item)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all ${
                              isSelected
                                ? 'bg-cyan-500 text-slate-950 shadow'
                                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            <span>{item}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-800">
            <label className="block text-[11px] font-bold text-slate-300">Açıklama</label>
            <textarea
              rows={2}
              value={about}
              onChange={e => setAbout(e.target.value)}
              placeholder="Örn: Hijyenik lüks stüdyomda VIP masaj..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl"
            >
              Vazgeç
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 shadow-xl active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>{isSaving ? 'Kaydediliyor...' : '🚀 Kaydet ve Canlı Yayınla'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
