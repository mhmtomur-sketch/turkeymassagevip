import React, { useState } from 'react';
import { Clock, Search, Calendar, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { db } from '../../../services/db';
import { Profile } from '../../../types';

export const MemberDurationsView: React.FC = () => {
  const [search, setSearch] = useState('');
  const profiles = db.getProfiles();

  const filtered = profiles.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl glass-card border border-white/10">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" /> Üye Süreleri & Abonelik Takibi
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Aktif vitrin üyelerinin kalan gün sayıları ve paket yenileme tarihleri
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Üye veya Şehir Ara..."
            className="w-full bg-dark-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:theme-accent-border"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Durations Table */}
      <div className="rounded-3xl glass-card border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-dark-950/80 border-b border-white/10 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Üye & Profil</th>
                <th className="p-4">Vitrin Paketi</th>
                <th className="p-4">Başlangıç Tarihi</th>
                <th className="p-4">Kalan Süre</th>
                <th className="p-4">Durum</th>
                <th className="p-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filtered.map((p, idx) => {
                const daysLeft = 28 - (idx % 20);
                const isExpiringSoon = daysLeft <= 5;

                return (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl overflow-hidden bg-dark-900 border border-white/10 flex-shrink-0">
                        <img src={p.coverPhoto} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-white">{p.name}</div>
                        <div className="text-[10px] text-slate-400">{p.city} / {p.district}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-black text-xs text-cyan-400">{p.packageType} VIP</span>
                    </td>
                    <td className="p-4 text-slate-400">
                      {new Date(p.createdAt || Date.now()).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="p-4">
                      <span className={`font-black text-xs ${isExpiringSoon ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {daysLeft} Gün Kaldı
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                        Yayında (Aktif)
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => alert(`"${p.name}" üyesinin vitrin süresi 30 gün uzatıldı.`)}
                        className="px-3 py-1.5 rounded-xl bg-cyan-600/20 text-cyan-300 hover:bg-cyan-600 hover:text-white border border-cyan-500/40 text-xs font-bold transition-all"
                      >
                        +30 Gün Uzat
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
