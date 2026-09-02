import React, { useState, useEffect } from 'react';
import { db } from '../../../services/db';
import { Profile } from '../../../types';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  Crown,
  Phone,
  MessageCircle,
  MapPin,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { ProfileEditorModal } from '../ProfileEditorModal';

export function ProfilesManagementView() {
  const [profiles, setProfiles] = useState<Profile[]>(() => db.getProfiles());
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [packageFilter, setPackageFilter] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const refreshList = () => {
    setProfiles([...db.getProfiles()]);
  };

  useEffect(() => {
    refreshList();
    const handleStorage = () => refreshList();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleOpenNew = () => {
    setSelectedProfile(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (profile: Profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`${name} profilini silmek istediğinize emin misiniz?`)) {
      db.deleteProfile(id);
      refreshList();
    }
  };

  const filtered = profiles.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone?.includes(searchQuery);

    const matchesCity = !cityFilter || (p.city || '').toLowerCase() === cityFilter.toLowerCase();
    const matchesPkg = !packageFilter || (p.packageType || '').toUpperCase() === packageFilter.toUpperCase();

    return matchesSearch && matchesCity && matchesPkg;
  });

  const allCities = Array.from(new Set(profiles.map((p) => p.city).filter(Boolean)));

  return (
    <div className="space-y-4">
      {/* ÜST FİLTRELEME & YENİ ÜYE BUTONU */}
      <div className="bg-[#0b1026] border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex flex-1 flex-wrap items-center gap-2.5 w-full">
          {/* ARAMA */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="İsim, telefon veya ünvan ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* ŞEHİR FİLTRESİ */}
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold focus:outline-none"
          >
            <option value="">Tüm Şehirler ({profiles.length})</option>
            {allCities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* PAKET FİLTRESİ */}
          <select
            value={packageFilter}
            onChange={(e) => setPackageFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-cyan-300 font-bold focus:outline-none"
          >
            <option value="">Tüm Paketler</option>
            <option value="DIAMOND">💎 Diamond VIP</option>
            <option value="PREMIUM">👑 Gold Premium</option>
            <option value="GOLD">⭐ Gold VIP</option>
            <option value="SILVER">🥈 Silver Standard</option>
          </select>
        </div>

        {/* YENİ ÜYE EKLE BUTONU */}
        <button
          type="button"
          onClick={handleOpenNew}
          className="w-full md:w-auto px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer flex-shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ YENİ ÜYE EKLE</span>
        </button>
      </div>

      {/* PROFİLLER TABLOSU (TAM SIĞAN DÜZEN) */}
      <div className="bg-[#0b1026] border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-[#070c20] text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Profil</th>
                <th className="py-3 px-3">Paket & Konum</th>
                <th className="py-3 px-3">WhatsApp / Telefon</th>
                <th className="py-3 px-3">Fiyat</th>
                <th className="py-3 px-3">Durum</th>
                <th className="py-3 px-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((p) => {
                const isDiamond = (p.packageType || '').toUpperCase() === 'DIAMOND';
                const isPremium = (p.packageType || '').toUpperCase() === 'PREMIUM';
                const isGold = (p.packageType || '').toUpperCase() === 'GOLD';

                const pkgBadgeColor = isDiamond
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : isPremium
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : isGold
                  ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                  : 'bg-slate-700/30 text-slate-300 border-slate-600/40';

                return (
                  <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                    {/* PROFİL BİLGİSİ */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.coverPhoto || p.photos?.[0]}
                          alt={p.name}
                          className="w-11 h-11 rounded-xl object-cover border border-slate-700 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-black text-white text-xs truncate flex items-center gap-1.5">
                            <span>{p.name}</span>
                            {p.isVerified && <CheckCircle className="w-3.5 h-3.5 text-cyan-400 inline" />}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">{p.title || 'VIP Masöz & Terapist'}</p>
                        </div>
                      </div>
                    </td>

                    {/* PAKET & KONUM */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-lg border text-[10px] font-black uppercase ${pkgBadgeColor}`}>
                        {p.packageType || 'DIAMOND'}
                      </span>
                      <p className="text-[11px] text-amber-400 font-bold mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{p.city} / {p.district || 'Merkez'}</span>
                      </p>
                    </td>

                    {/* İLETİŞİM */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <p className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{p.whatsapp || p.phone}</span>
                      </p>
                    </td>

                    {/* FİYAT */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="font-bold text-amber-300 font-mono text-xs">
                        {p.price ? `${p.price} TL` : '3.500 TL'}
                      </span>
                    </td>

                    {/* DURUM */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-lg text-[10px] font-black">
                        ONAYLI / YAYINDA
                      </span>
                    </td>

                    {/* İŞLEMLER */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 rounded-lg transition-colors cursor-pointer"
                          title="Düzenle"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-400 rounded-lg transition-colors cursor-pointer"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      <ProfileEditorModal
        isOpen={isModalOpen}
        profile={selectedProfile}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProfile(null);
          refreshList();
        }}
        onSaved={() => {
          setIsModalOpen(false);
          setSelectedProfile(null);
          refreshList();
        }}
      />
    </div>
  );
}
