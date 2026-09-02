import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, CheckCircle2, Star, Sparkles, MapPin, Phone } from 'lucide-react';
import { db, slugifyTurkish } from '../../../services/db';
import { Profile } from '../../../types';
import { TURKEY_CITIES } from '../../../data/locations';
import { MemberFormModal } from '../modals/MemberFormModal';

export function MemberManagementView() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [statusMsg, setStatusMsg] = useState('');

  const loadData = () => {
    setProfiles(db.getProfiles());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('tmv_profile_updated', loadData);
    return () => window.removeEventListener('tmv_profile_updated', loadData);
  }, []);

  const handleOpenAdd = () => {
    setEditingProfile(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Profile) => {
    setEditingProfile(p);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`"${name}" profilini silmek istediğinize emin misiniz?`)) {
      db.deleteProfile(id);
      loadData();
      setStatusMsg(`"${name}" başarıyla silindi.`);
      setTimeout(() => setStatusMsg(''), 4000);
    }
  };

  const filtered = profiles.filter((p) => {
    const matchCity = selectedCity === 'all' || slugifyTurkish(p.citySlug || p.city) === slugifyTurkish(selectedCity);
    const matchSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.city || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchCity && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Üst Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div>
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>Üye Yönetimi ({profiles.length} Aktif Üye)</span>
          </h2>
          <p className="text-xs text-slate-400">
            Tüm kayıtlı masöz, terapist, hamam ve spa profilleri.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 shadow-xl active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>✨ Yeni VIP Üye Ekle</span>
        </button>
      </div>

      {statusMsg && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-xs font-bold text-emerald-300">
          {statusMsg}
        </div>
      )}

      {/* Arama ve Filtre */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="İsim, unvan veya şehir ara..."
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-cyan-300 font-bold focus:outline-none"
        >
          <option value="all">📍 Tüm İller ({profiles.length})</option>
          {TURKEY_CITIES.map((c) => {
            const count = profiles.filter(p => slugifyTurkish(p.citySlug || p.city) === slugifyTurkish(c.slug)).length;
            return (
              <option key={c.id} value={c.slug}>📍 {c.name} {count > 0 ? `(${count})` : ''}</option>
            );
          })}
        </select>
      </div>

      {/* Üye Tablosu */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-black uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5">Profil & Bilgi</th>
                <th className="p-3.5">Paket</th>
                <th className="p-3.5">Şehir / İlçe</th>
                <th className="p-3.5">İletişim (WP / Tel)</th>
                <th className="p-3.5 text-center">Fiyat</th>
                <th className="p-3.5 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-3.5 flex items-center gap-3">
                    <img
                      src={p.coverPhoto || p.photos?.[0]}
                      alt={p.name}
                      className="w-10 h-12 rounded-lg object-cover border border-slate-800 shrink-0"
                    />
                    <div>
                      <div className="font-black text-white text-xs sm:text-sm flex items-center gap-1">
                        <span>{p.name}</span>
                        {p.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                      <div className="text-[11px] text-slate-400">{p.title || p.categoryName || 'Masöz'}</div>
                    </div>
                  </td>

                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black ${
                      (p.packageType || '').toUpperCase() === 'DIAMOND'
                        ? 'bg-amber-400 text-slate-950'
                        : (p.packageType || '').toUpperCase() === 'PREMIUM'
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {p.packageType || 'STANDART'}
                    </span>
                  </td>

                  <td className="p-3.5 text-cyan-300 font-bold">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      <span>{p.city} / {p.district || 'Merkez'}</span>
                    </div>
                  </td>

                  <td className="p-3.5 font-bold text-slate-200">
                    <div className="flex items-center gap-1 text-emerald-400">
                      <Phone className="w-3 h-3" />
                      <span>{p.whatsapp || p.phone || '0540 322 55 55'}</span>
                    </div>
                  </td>

                  <td className="p-3.5 text-center font-black text-amber-300">
                    {p.price} {p.currency || 'TL'}
                  </td>

                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 font-bold rounded-lg text-[11px] transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5 inline mr-1" />
                      Düzenle
                    </button>

                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      className="px-2.5 py-1.5 bg-rose-500/20 hover:bg-rose-600 text-rose-300 hover:text-white font-bold rounded-lg text-[11px] transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5 inline mr-1" />
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modalı */}
      <MemberFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          loadData();
          setStatusMsg('✅ Üye başarıyla kaydedildi ve tüm vitrinlerde canlı yayına alındı!');
          setTimeout(() => setStatusMsg(''), 5000);
        }}
        initialData={editingProfile}
      />
    </div>
  );
}
