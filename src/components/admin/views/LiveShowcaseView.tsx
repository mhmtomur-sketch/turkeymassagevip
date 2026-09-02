import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit3, Trash2, CheckCircle, XCircle, MapPin, Phone, Sparkles, MessageCircle, Eye, TrendingUp } from 'lucide-react';
import { db, slugifyTurkish } from '../../../services/db';
import { Profile } from '../../../types';
import { TURKEY_CITIES } from '../../../data/locations';
import { analytics } from '../../../services/analytics';

interface LiveShowcaseViewProps {
  onEditProfile: (profile: Profile) => void;
  onRefresh?: () => void;
}

export const LiveShowcaseView: React.FC<LiveShowcaseViewProps> = ({ onEditProfile, onRefresh }) => {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [profiles, setProfiles] = useState<Profile[]>(() => db.getProfiles());

  const reload = () => {
    setProfiles([...db.getProfiles()]);
    if (onRefresh) onRefresh();
  };

  useEffect(() => {
    reload();
    window.addEventListener('tmv_profile_updated', reload);
    return () => window.removeEventListener('tmv_profile_updated', reload);
  }, []);

  const handleToggleVerified = (id: string) => {
    db.toggleProfileVerified(id);
    reload();
  };

  const handleToggleAvailable = (id: string) => {
    db.toggleProfileAvailable(id);
    reload();
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`"${name}" profilini silmek istediğinize emin misiniz?`)) {
      db.deleteProfile(id);
      reload();
    }
  };

  const filtered = profiles.filter((p) => {
    const matchCity = selectedCity === 'all' || slugifyTurkish(p.citySlug || p.city) === slugifyTurkish(selectedCity);
    const matchSearch =
      !search.trim() ||
      (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (p.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (p.city || '').toLowerCase().includes(search.toLowerCase()) ||
      (p.district || '').toLowerCase().includes(search.toLowerCase());
    return matchCity && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Arama ve Şehir Filtresi */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="İsim, unvan veya şehir ara..."
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2">
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
      </div>

      {/* %100 Gerçek Performans Tablosu */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-black uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5">Profil & Fotoğraf</th>
                <th className="p-3.5">Paket & Konum</th>
                <th className="p-3.5 text-center">Toplam Görüntüleme</th>
                <th className="p-3.5 text-center">WhatsApp Tıklama</th>
                <th className="p-3.5 text-center">Telefon Arama</th>
                <th className="p-3.5 text-center">Dönüşüm %</th>
                <th className="p-3.5 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((p) => {
                const totalViews = p.viewsCount || 0;
                const waClicks = p.whatsappClicks || 0;
                const phoneClicks = p.phoneClicks || 0;
                const totalContacts = waClicks + phoneClicks;
                const convRate = totalViews > 0 ? Math.min(100, Math.round((totalContacts / totalViews) * 100)) : 0;

                return (
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
                          {p.isVerified && <Sparkles className="w-3.5 h-3.5 text-cyan-400" />}
                        </div>
                        <div className="text-[11px] text-slate-400">{p.title || p.categoryName || 'Masöz'}</div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="space-y-1">
                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black ${
                          (p.packageType || '').toUpperCase() === 'DIAMOND'
                            ? 'bg-amber-400 text-slate-950'
                            : (p.packageType || '').toUpperCase() === 'PREMIUM'
                            ? 'bg-cyan-500 text-slate-950'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {p.packageType || 'STANDART'}
                        </span>
                        <div className="flex items-center gap-1 text-cyan-300 font-bold text-[11px]">
                          <MapPin className="w-3 h-3 text-rose-400" />
                          <span>{p.city} / {p.district || 'Merkez'}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 text-center font-black text-white">
                      {totalViews}
                    </td>

                    <td className="p-3.5 text-center font-bold text-emerald-400">
                      {waClicks}
                    </td>

                    <td className="p-3.5 text-center font-bold text-amber-400">
                      {phoneClicks}
                    </td>

                    <td className="p-3.5 text-center font-black text-cyan-400">
                      %{convRate}
                    </td>

                    <td className="p-3.5 text-right space-x-1.5">
                      <button
                        onClick={() => onEditProfile(p)}
                        className="px-2.5 py-1.5 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 font-bold rounded-lg text-[11px] transition-all"
                      >
                        <Edit3 className="w-3.5 h-3.5 inline mr-1" />
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
