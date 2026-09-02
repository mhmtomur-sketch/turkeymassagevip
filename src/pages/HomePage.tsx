import React, { useState, useEffect } from 'react';
import { db, slugifyTurkish, ALL_INITIAL_PROFILES } from '../services/db';
import { Profile } from '../types';
import { ShowcaseCard } from '../components/showcase/ShowcaseCard';
import { Sparkles, MapPin, Search, Star, ShieldCheck, Flame, Globe, PlusCircle } from 'lucide-react';
import { TURKEY_CITIES, KKTC_CITIES } from '../data/locations';
import { Link } from 'react-router-dom';
import { Language, TRANSLATIONS, getCurrentLanguage, setAppLanguage } from '../services/i18n';

export function HomePage() {
  const [allProfiles, setAllProfiles] = useState<Profile[]>(() => db.getProfiles());
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentLang, setCurrentLang] = useState<Language>(() => getCurrentLanguage());
  const [showLangMenu, setShowLangMenu] = useState(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.tr;

  useEffect(() => {
    setAppLanguage(currentLang);

    const handleUpdate = () => {
      setAllProfiles([...db.getProfiles()]);
    };

    window.addEventListener('tmv_profile_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('tmv_profile_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [currentLang]);

  const handleSelectLang = (lang: Language) => {
    setCurrentLang(lang);
    setAppLanguage(lang);
    setShowLangMenu(false);
  };

  const allCities = [{ id: 'all', name: t.allCities }, ...TURKEY_CITIES, ...KKTC_CITIES];

  // Filtreleme
  let filtered = allProfiles;
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = allProfiles.filter(
      (p) => (p.name || '').toLowerCase().includes(q) || (p.district || '').toLowerCase().includes(q) || (p.city || '').toLowerCase().includes(q)
    );
  } else if (selectedCity !== 'all') {
    const cityFiltered = allProfiles.filter((p) => {
      const pSlug = slugifyTurkish(p.city || '');
      return p.citySlug === selectedCity || pSlug === selectedCity || (p.city || '').toLowerCase() === selectedCity.toLowerCase();
    });
    filtered = cityFiltered.length > 0 ? cityFiltered : allProfiles;
  }

  // Paket Listeleri
  const allDiamond = allProfiles.filter((p) => (p.packageType || '').toUpperCase() === 'DIAMOND');
  const allPremium = allProfiles.filter((p) => (p.packageType || '').toUpperCase() === 'PREMIUM');
  const allGold = allProfiles.filter((p) => (p.packageType || '').toUpperCase() === 'GOLD');
  const allSilver = allProfiles.filter((p) => (p.packageType || '').toUpperCase() === 'SILVER');

  const diamondList = filtered.filter((p) => (p.packageType || '').toUpperCase() === 'DIAMOND');
  const premiumList = filtered.filter((p) => (p.packageType || '').toUpperCase() === 'PREMIUM');
  const goldList = filtered.filter((p) => (p.packageType || '').toUpperCase() === 'GOLD');
  const silverList = filtered.filter((p) => (p.packageType || '').toUpperCase() === 'SILVER');

  // Her pakette en az 6'şar vitrin doluluğu garantisi
  const finalDiamond = diamondList.length >= 6 ? diamondList : [...diamondList, ...allDiamond.filter(d => !diamondList.some(x => x.id === d.id))].slice(0, Math.max(6, diamondList.length));
  const finalPremium = premiumList.length >= 6 ? premiumList : [...premiumList, ...allPremium.filter(p => !premiumList.some(x => x.id === p.id))].slice(0, Math.max(6, premiumList.length));
  const finalGold = goldList.length >= 6 ? goldList : [...goldList, ...allGold.filter(g => !goldList.some(x => x.id === g.id))].slice(0, Math.max(6, goldList.length));
  const finalSilver = silverList.length >= 6 ? silverList : [...silverList, ...allSilver.filter(s => !silverList.some(x => x.id === s.id))].slice(0, Math.max(6, silverList.length));

  return (
    <div className="min-h-screen bg-[#070b1b] text-white pb-20">
      {/* ÜST VIP STORY BARI */}
      <div className="border-b border-slate-800/80 bg-[#0b1026]/90 backdrop-blur-md py-2 px-2 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-2.5">
          {allProfiles.slice(0, 24).map((p, idx) => {
            const ringClass = `story-ring-${idx % 8}`;
            return (
              <Link
                key={p.id}
                to={`/profil/${p.slug}`}
                className="flex flex-col items-center flex-shrink-0 group"
              >
                <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full p-[1.5px] ${ringClass} group-hover:scale-105 transition-transform overflow-hidden`}>
                  <img
                    src={p.coverPhoto || p.photos?.[0]}
                    alt={p.name}
                    className="w-full h-full rounded-full object-cover brightness-100"
                    loading="lazy"
                  />
                </div>
                <span className="text-[9px] text-slate-300 font-bold mt-0.5 max-w-[48px] truncate text-center group-hover:text-amber-400">
                  {p.name.split(' ')[0]}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ARAMA, ŞEHİR VE İLAN VER + DİL SEÇİCİ BARI */}
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 py-2.5 sm:py-4">
        <div className="bg-[#0b1026] p-2 sm:p-3 rounded-2xl border border-slate-800 shadow-xl flex flex-col sm:flex-row gap-2 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-8 pr-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 font-medium"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400 flex-shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  localStorage.setItem('tmv_user_selected_city', e.target.value);
                }}
                className="bg-slate-900 border border-slate-700 rounded-xl px-2 py-1.5 text-xs text-amber-300 font-bold focus:outline-none cursor-pointer"
              >
                {allCities.map((c) => (
                  <option key={c.id} value={c.id === 'all' ? 'all' : (c as any).slug || slugifyTurkish(c.name)}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* İLAN VER BUTONU */}
            <Link
              to="/ilan-ver"
              className="px-2.5 py-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs rounded-xl shadow flex items-center gap-1 active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{t.postAd}</span>
            </Link>

            {/* İLAN VERİN YANINDA PROFESYONEL DİL SEÇİCİ */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="px-2 py-1.5 bg-slate-900 border border-slate-700 hover:border-cyan-400 rounded-xl text-xs font-black text-cyan-300 flex items-center gap-1 shadow"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="uppercase">{currentLang}</span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-1 w-32 bg-[#0c122c] border border-slate-700 rounded-xl shadow-2xl z-50 py-1 overflow-hidden">
                  {[
                    { id: 'tr', label: '🇹🇷 Türkçe' },
                    { id: 'en', label: '🇬🇧 English' },
                    { id: 'de', label: '🇩🇪 Deutsch' },
                    { id: 'ru', label: '🇷🇺 Русский' },
                    { id: 'ar', label: '🇸🇦 العربية' },
                    { id: 'fa', label: '🇮🇷 فارسی' }
                  ].map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => handleSelectLang(l.id as Language)}
                      className={`w-full px-3 py-1.5 text-left text-xs font-bold transition-colors ${
                        currentLang === l.id ? 'bg-amber-400 text-slate-950' : 'text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 1. DIAMOND VIP VİTRİNİ (MOBİL 2'Lİ GRID - 6 VİTRİN) */}
        {finalDiamond.length > 0 && (
          <div className="mt-4 sm:mt-6">
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <h2 className="text-xs sm:text-sm font-black text-amber-300 uppercase tracking-wide">
                {t.diamondShowcase}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5 sm:gap-3">
              {finalDiamond.map((p, idx) => (
                <ShowcaseCard key={p.id} profile={p} index={idx} />
              ))}
            </div>
          </div>
        )}

        {/* 2. GOLD PREMIUM VİTRİNİ (MOBİL 3'LÜ GRID - 6 VİTRİN) */}
        {finalPremium.length > 0 && (
          <div className="mt-4 sm:mt-6">
            <div className="flex items-center gap-1.5 mb-2">
              <Flame className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <h2 className="text-xs sm:text-sm font-black text-cyan-300 uppercase tracking-wide">
                {t.premiumShowcase}
              </h2>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 sm:gap-2.5">
              {finalPremium.map((p, idx) => (
                <ShowcaseCard key={p.id} profile={p} index={idx + 6} />
              ))}
            </div>
          </div>
        )}

        {/* 3. GOLD VIP VİTRİNİ (MOBİL 4'LÜ GRID - 6 VİTRİN) */}
        {finalGold.length > 0 && (
          <div className="mt-4 sm:mt-6">
            <div className="flex items-center gap-1.5 mb-2">
              <Star className="w-3.5 h-3.5 text-yellow-400" />
              <h2 className="text-xs sm:text-sm font-black text-yellow-300 uppercase tracking-wide">
                {t.goldShowcase}
              </h2>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 sm:gap-2">
              {finalGold.map((p, idx) => (
                <ShowcaseCard key={p.id} profile={p} index={idx + 12} />
              ))}
            </div>
          </div>
        )}

        {/* 4. SILVER STANDART VİTRİNİ (MOBİL 4'LÜ GRID - 6 VİTRİN) */}
        {finalSilver.length > 0 && (
          <div className="mt-4 sm:mt-6">
            <div className="flex items-center gap-1.5 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <h2 className="text-xs sm:text-sm font-black text-slate-300 uppercase tracking-wide">
                {t.silverShowcase}
              </h2>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 sm:gap-2">
              {finalSilver.map((p, idx) => (
                <ShowcaseCard key={p.id} profile={p} index={idx + 18} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
