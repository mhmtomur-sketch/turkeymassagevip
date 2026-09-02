import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, Search, CheckCircle2, RefreshCw, Download, Upload } from 'lucide-react';
import { db } from '../../../services/db';
import { analytics } from '../../../services/analytics';
import { Profile } from '../../../types';
import { TURKEY_CITIES } from '../../../data/locations';

export function ShowcaseManagementView() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [analyticsEvents, setAnalyticsEvents] = useState<any[]>([]);
  const [recoveryMsg, setRecoveryMsg] = useState('');

  const loadData = () => {
    setProfiles(db.getProfiles());
    setAnalyticsEvents(analytics.getEvents(2000));
  };

  useEffect(() => {
    loadData();
    window.addEventListener('tmv_profile_updated', loadData);
    return () => window.removeEventListener('tmv_profile_updated', loadData);
  }, []);

  // TARAYICININ TÜM GEÇMİŞİNİ TARAYIP GERİ GETİREN ACİL BUTON
  const handleDeepRecover = () => {
    let recoveredCount = 0;
    const foundMap = new Map<string, Profile>();
    
    // Mevcutları al
    db.getProfiles().forEach(p => foundMap.set(p.id, p));

    // Tarayıcıdaki her bir localStorage anahtarını tara
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('tmv') || key.includes('profile') || key.includes('vip'))) {
        try {
          const raw = localStorage.getItem(key);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
              parsed.forEach((p: Profile) => {
                if (p && p.name && !foundMap.has(p.id)) {
                  foundMap.set(p.id, p);
                  db.saveProfile(p);
                  recoveredCount++;
                }
              });
            }
          }
        } catch {}
      }
    }

    loadData();
    setRecoveryMsg(`✅ Başarılı! Tarayıcı geçmişinizden ${recoveredCount} adet profil kurtarıldı ve kalıcı olarak kilitlendi.`);
    setTimeout(() => setRecoveryMsg(''), 6000);
  };

  const handleExportBackup = () => {
    const jsonStr = db.exportBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `turkey-massage-vip-uyeler-yedek-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
  };

  const filtered = profiles.filter((p) => {
    const matchCity = selectedCity === 'all' || (p.citySlug || '').toLowerCase() === selectedCity.toLowerCase();
    const matchSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.city || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchCity && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Üst Bar & Acil Kurtarma */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Üye & Vitrin Yönetimi ({profiles.length} Kayıtlı Üye)</span>
            </h2>
            <p className="text-xs text-slate-400">
              Tüm aktif gerçek üyeler ve vitrin profilleri.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDeepRecover}
              className="px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 shadow-lg active:scale-95 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>🚨 Geçmiş Hafızayı Tara & Kurtar</span>
            </button>

            <button
              onClick={handleExportBackup}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5 border border-slate-700 active:scale-95 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Bilgisayara Yedek İndir (.json)</span>
            </button>
          </div>
        </div>

        {recoveryMsg && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-xs font-bold text-emerald-300">
            {recoveryMsg}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Profil veya Şehir Ara..."
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
              const count = profiles.filter(p => (p.citySlug || '').toLowerCase() === c.slug.toLowerCase()).length;
              return (
                <option key={c.id} value={c.slug}>📍 {c.name} {count > 0 ? `(${count})` : ''}</option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Profil Tablosu */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-black uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5">Profil & Fotoğraf</th>
                <th className="p-3.5">Paket</th>
                <th className="p-3.5">Şehir / İlçe</th>
                <th className="p-3.5">Telefon / WhatsApp</th>
                <th className="p-3.5 text-center">Fiyat</th>
                <th className="p-3.5 text-right">Durum</th>
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
                    {p.city} / {p.district || 'Merkez'}
                  </td>

                  <td className="p-3.5 font-bold text-slate-200">
                    {p.whatsapp || p.phone || '0540 322 55 55'}
                  </td>

                  <td className="p-3.5 text-center font-black text-amber-300">
                    {p.price} {p.currency || 'TL'}
                  </td>

                  <td className="p-3.5 text-right">
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded text-[10px] font-black">
                      YAYINDA
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
