import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Sparkles, Star, Crown, ChevronRight, ShieldCheck, Phone, CheckCircle2 } from 'lucide-react';
import { db, slugifyTurkish } from '../services/db';
import { TURKEY_CITIES, KKTC_CITIES } from '../data/locations';
import { generateDemoProfilesForCity } from '../services/demoProfilesGenerator';
import { ShowcaseCard } from '../components/showcase/ShowcaseCard';
import { SeoHead } from '../components/seo/SeoHead';
import '../styles/neonLed.css';

export function CityLandingPage() {
  const { citySlug = 'izmir', districtOrCategory, categorySlug } = useParams<{
    citySlug?: string;
    districtOrCategory?: string;
    categorySlug?: string;
  }>();

  const allCities = [...TURKEY_CITIES, ...KKTC_CITIES];
  const canonicalCitySlug = slugifyTurkish(citySlug);

  const cityObj = allCities.find(c => slugifyTurkish(c.slug) === canonicalCitySlug || slugifyTurkish(c.name) === canonicalCitySlug) || {
    name: canonicalCitySlug.charAt(0).toUpperCase() + canonicalCitySlug.slice(1),
    slug: canonicalCitySlug,
    districts: [{ name: 'Merkez' }]
  };

  const cityName = cityObj.name;
  const districts = cityObj.districts || [{ name: 'Merkez' }];

  // Kategori & İlçe Tespiti
  const CATEGORY_MAP: Record<string, { name: string; title: string }> = {
    'masoz': { name: 'Bireysel Masöz', title: 'Masöz' },
    'masor': { name: 'Profesyonel Masör', title: 'Masör' },
    'spa': { name: 'Spa & Masaj Salonu', title: 'Spa' },
    'hamam': { name: 'Geleneksel Türk Hamamı', title: 'Hamam & Kese Köpük' },
    'otel-spa': { name: 'Otel Spa & Wellness', title: 'Otel Spa' },
    'terapist': { name: 'VIP Masaj Terapisti', title: 'Terapist' }
  };

  let activeCategoryKey = 'all';
  let activeDistrictName = '';

  if (districtOrCategory) {
    const cleanParam = slugifyTurkish(districtOrCategory);
    if (CATEGORY_MAP[cleanParam]) {
      activeCategoryKey = cleanParam;
    } else {
      const matchDist = districts.find(d => slugifyTurkish((d as any)?.name || d) === cleanParam);
      activeDistrictName = matchDist ? ((matchDist as any)?.name || matchDist) : districtOrCategory;
    }
  }

  if (categorySlug) {
    const cleanCat = slugifyTurkish(categorySlug);
    if (CATEGORY_MAP[cleanCat]) activeCategoryKey = cleanCat;
  }

  // Dinamik SEO Başlıkları ve Açıklamaları
  const pageTitle = activeDistrictName
    ? `${activeDistrictName} ${activeCategoryKey !== 'all' ? CATEGORY_MAP[activeCategoryKey]?.title : 'Masaj ve Masöz'} | ${cityName}`
    : activeCategoryKey !== 'all'
    ? `${cityName} ${CATEGORY_MAP[activeCategoryKey]?.title} Hizmetleri ve Profilleri`
    : `${cityName} Masaj, Masöz, Spa ve Hamam Rehberi`;

  const pageDescription = activeDistrictName
    ? `${cityName} ${activeDistrictName} bölgesindeki en seçkin masöz, masör, spa ve masaj hizmeti seçeneklerini inceleyin. Güncel vitrinler ve doğrulanmış profiller.`
    : `${cityName} genelinde profesyonel masaj, bireysel masöz, VIP terapist, lüks spa ve geleneksel Türk hamamı seçeneklerini keşfedin. ${districts.slice(0, 5).map(d => (d as any)?.name || d).join(', ')} bölgeleri.`;

  const canonicalUrl = `https://turkeymassagevip.com/${canonicalCitySlug}${activeDistrictName ? `/${slugifyTurkish(activeDistrictName)}` : ''}${activeCategoryKey !== 'all' ? `/${activeCategoryKey}` : ''}`;

  // Profilleri Getir
  const allProfiles = db.getProfiles();
  const cityProfiles = useMemo(() => {
    const strictProfiles = allProfiles.filter(p => {
      const matchCity = slugifyTurkish(p.citySlug || p.city) === canonicalCitySlug;
      const matchDist = !activeDistrictName || slugifyTurkish(p.districtSlug || p.district || '') === slugifyTurkish(activeDistrictName);
      const matchCat = activeCategoryKey === 'all' || p.category === activeCategoryKey;
      return matchCity && matchDist && matchCat;
    });

    if (strictProfiles.length < 20) {
      const demoFiller = generateDemoProfilesForCity(canonicalCitySlug, 20 - strictProfiles.length).filter(p => {
        const matchCat = activeCategoryKey === 'all' || p.category === activeCategoryKey;
        const matchDist = !activeDistrictName || slugifyTurkish(p.districtSlug || p.district || '') === slugifyTurkish(activeDistrictName);
        return matchCat && matchDist;
      });
      return [...strictProfiles, ...demoFiller];
    }

    return strictProfiles;
  }, [allProfiles, canonicalCitySlug, activeDistrictName, activeCategoryKey]);

  const diamondList = cityProfiles.filter(p => (p.packageType || '').toUpperCase() === 'DIAMOND');
  const premiumList = cityProfiles.filter(p => (p.packageType || '').toUpperCase() === 'PREMIUM');
  const otherList = cityProfiles.filter(p => !['DIAMOND', 'PREMIUM'].includes((p.packageType || '').toUpperCase()));

  const breadcrumbs = [
    { name: 'Ana Sayfa', url: '/' },
    { name: cityName, url: `/${canonicalCitySlug}` }
  ];
  if (activeDistrictName) {
    breadcrumbs.push({ name: activeDistrictName, url: `/${canonicalCitySlug}/${slugifyTurkish(activeDistrictName)}` });
  }
  if (activeCategoryKey !== 'all') {
    breadcrumbs.push({ name: CATEGORY_MAP[activeCategoryKey]?.title || activeCategoryKey, url: canonicalUrl });
  }

  return (
    <div className="aurora-dark-bg text-white pb-20 relative overflow-hidden">
      <div className="stars-container"></div>

      <SeoHead
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        breadcrumbs={breadcrumbs}
      />

      {/* Breadcrumb Bar */}
      <div className="bg-slate-950/90 border-b border-slate-800 px-4 py-3 text-xs">
        <div className="max-w-7xl mx-auto flex items-center gap-1 text-slate-400 overflow-x-auto">
          {breadcrumbs.map((b, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />}
              {idx === breadcrumbs.length - 1 ? (
                <span className="text-cyan-300 font-bold whitespace-nowrap">{b.name}</span>
              ) : (
                <Link to={b.url} className="hover:text-white transition-colors whitespace-nowrap">{b.name}</Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 relative z-10">
        {/* H1 Başlık & Tanıtım */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-black rainbow-title-shimmer tracking-wide">
            📍 {pageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
            {pageDescription}
          </p>
        </div>

        {/* Kategori Filtre Butonları */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
          <Link
            to={`/${canonicalCitySlug}${activeDistrictName ? `/${slugifyTurkish(activeDistrictName)}` : ''}`}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCategoryKey === 'all'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Tüm Vitrinler
          </Link>

          {Object.entries(CATEGORY_MAP).map(([key, info]) => (
            <Link
              key={key}
              to={`/${canonicalCitySlug}${activeDistrictName ? `/${slugifyTurkish(activeDistrictName)}` : ''}/${key}`}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategoryKey === key
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {info.name}
            </Link>
          ))}
        </div>

        {/* DIAMOND VIP VİTRİNİ */}
        {diamondList.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-2.5">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <h2 className="text-base sm:text-xl font-black gold-shimmer-text">
                  💎 {cityName} DIAMOND VIP VİTRİNİ
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {diamondList.map((p, idx) => (
                <ShowcaseCard key={p.id} profile={p} index={idx} />
              ))}
            </div>
          </section>
        )}

        {/* PREMIUM VİTRİN */}
        {premiumList.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2.5">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base sm:text-xl font-black neon-shimmer-text">
                  👑 {cityName} GOLD PREMIUM VİTRİNİ
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {premiumList.map((p, idx) => (
                <ShowcaseCard key={p.id} profile={p} index={idx + 3} />
              ))}
            </div>
          </section>
        )}

        {/* DİĞER SEÇKİN VİTRİNLER */}
        {otherList.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h2 className="text-base sm:text-xl font-black text-white">
                  ⭐ {cityName} SEÇKİN MASAJ, HAMAM & SPA VİTRİNLERİ
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {otherList.map((p, idx) => (
                <ShowcaseCard key={p.id} profile={p} index={idx + 6} />
              ))}
            </div>
          </section>
        )}

        {/* İLÇELERE GÖRE LİNKLER (INTERNAL LINKING) */}
        <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
          <h2 className="text-sm font-black text-white uppercase tracking-wider">
            📍 {cityName} İlçelerine Göre Masaj Hizmetleri
          </h2>
          <div className="flex flex-wrap gap-2">
            {districts.map((d: any, idx: number) => {
              const dName = d.name || d;
              const dSlug = slugifyTurkish(dName);
              return (
                <Link
                  key={idx}
                  to={`/${canonicalCitySlug}/${dSlug}`}
                  className="px-3 py-1.5 bg-slate-950 hover:bg-cyan-500 hover:text-slate-950 border border-slate-800 text-slate-300 text-xs font-bold rounded-xl transition-all"
                >
                  {cityName} {dName} Masaj
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
