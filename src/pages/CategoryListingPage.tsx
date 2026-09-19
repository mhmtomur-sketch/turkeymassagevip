import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, MapPin, PlusCircle, AlertCircle } from 'lucide-react';
import { ShowcaseGrid } from '../components/showcase/ShowcaseGrid';
import { ProfileDetailModal } from '../components/profile/ProfileDetailModal';
import { CATEGORIES, getCategoryBySlug } from '../data/categories';
import { useGeoLocation } from '../hooks/useGeoLocation';
import { db } from '../services/db';
import { Profile } from '../types';

export const CategoryListingPage: React.FC = () => {
  const { category: categorySlug } = useParams<{ category: string }>();
  const [selectedDetailProfile, setSelectedDetailProfile] = useState<Profile | null>(null);
  const { selectedCity } = useGeoLocation();
  const profiles = db.getProfiles();
  const catObj = getCategoryBySlug(categorySlug || '');

  const filteredProfiles = useMemo(() => {
    if (!categorySlug) return profiles;
    return profiles.filter((p) => {
      const matchesCat = p.category?.toLowerCase() === categorySlug.toLowerCase();
      if (selectedCity && selectedCity.slug) {
        return matchesCat && p.citySlug?.toLowerCase() === selectedCity.slug.toLowerCase();
      }
      return matchesCat;
    });
  }, [profiles, categorySlug, selectedCity]);

  const cityName = selectedCity?.name || 'TÜRKİYE';
  const catTitle = catObj ? catObj.title : 'Kategori';
  const pageHeading = `${cityName.toUpperCase()} ${catTitle.toUpperCase()} VİTRİNİ`;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-200">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-cyan-400 transition-colors">Ana Sayfa</Link>
        <span>/</span>
        <span className="text-cyan-400 font-bold">{catTitle}</span>
      </div>

      {/* Hero Category Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10 space-y-4 shadow-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KATEGORİ VİTRİNİ</span>
          </div>
          {selectedCity && (
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-dark-900 text-slate-300 text-xs border border-white/10">
              <MapPin className="w-3 h-3 text-pink-400" />
              <span>{selectedCity.name} Bölgesi</span>
            </div>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
          {pageHeading}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          {catObj?.description || 'En seçkin ve doğrulanmış terapist ve spa merkezlerini keşfedin.'}
        </p>

        {/* Categories Quick Switcher Bar */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to={`/kategori/${c.slug}`}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                c.slug === categorySlug
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                  : 'bg-dark-900/90 border border-white/10 text-slate-300 hover:border-cyan-400 hover:text-white'
              }`}
            >
              {c.shortTitle}
            </Link>
          ))}
        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredProfiles.length > 0 ? (
        <ShowcaseGrid
          profiles={filteredProfiles}
          currentCityName={selectedCity?.name}
          onSelectProfile={(profile) => setSelectedDetailProfile(profile)}
        />
      ) : (
        <div className="text-center py-16 px-4 rounded-3xl glass-card border border-white/10 space-y-4">
          <AlertCircle className="w-12 h-12 text-cyan-400 mx-auto animate-bounce" />
          <h3 className="text-xl font-bold text-white">Bu Şehirde Henüz Kayıtlı Profil Bulunmuyor</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            {cityName} bölgesinde ilk vitrin ilanını vererek en üst sırada yerinizi alabilirsiniz.
          </p>
          <Link
            to="/paketler"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-cyan-500 text-black font-black text-xs hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/30"
          >
            <PlusCircle className="w-4 h-4" />
            İLAN VER VE İLK SIRADA YAYINLAN
          </Link>
        </div>
      )}

      {/* Profile Detail Modal */}
      <ProfileDetailModal
        profile={selectedDetailProfile}
        isOpen={!!selectedDetailProfile}
        onClose={() => setSelectedDetailProfile(null)}
      />

    </div>
  );
};
