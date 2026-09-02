import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Sparkles, Building2 } from 'lucide-react';
import { ShowcaseGrid } from '../components/showcase/ShowcaseGrid';
import { ProfileDetailModal } from '../components/profile/ProfileDetailModal';
import { ALL_LOCATIONS, getLocationBySlug } from '../data/locations';
import { db } from '../services/db';
import { Profile } from '../types';

export const CityLocationPage: React.FC = () => {
  const { city: citySlug, district: districtSlug } = useParams<{ city: string; district?: string }>();
  const [selectedDetailProfile, setSelectedDetailProfile] = useState<Profile | null>(null);
  const profiles = db.getProfiles();

  const cityObj = getLocationBySlug(citySlug || '');

  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      if (citySlug && p.citySlug.toLowerCase() !== citySlug.toLowerCase()) return false;
      if (districtSlug && p.districtSlug.toLowerCase() !== districtSlug.toLowerCase()) return false;
      return true;
    });
  }, [profiles, citySlug, districtSlug]);

  const cityName = cityObj ? cityObj.name : citySlug?.toUpperCase();
  const districtObj = cityObj?.districts.find((d) => d.slug === districtSlug);
  const districtName = districtObj ? districtObj.name : districtSlug;

  const pageTitle = districtName 
    ? `${cityName} ${districtName} Masaj & Spa Vitrini`
    : `${cityName} Masözler, Masörler & Spa Salonları`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-cyan-400">Ana Sayfa</Link>
        <span>/</span>
        <Link to={`/${citySlug}`} className="hover:text-cyan-400">{cityName}</Link>
        {districtName && (
          <>
            <span>/</span>
            <span className="text-slate-200 font-bold">{districtName}</span>
          </>
        )}
      </div>

      {/* Hero Location Header */}
      <div className="p-8 rounded-3xl glass-card border border-white/10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/30">
          <MapPin className="w-3.5 h-3.5" />
          {cityObj?.country === 'KKTC' ? '🌴 KKTC BÖLGESİ' : '🇹🇷 TÜRKİYE İLİ'}
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white">{pageTitle}</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          {cityName} {districtName ? `${districtName} ilçesinde` : 've tüm ilçelerinde'} hizmet veren doğrulanmış profesyonel masözler, masörler, medikal masaj terapistleri ve lüks spa merkezlerini keşfedin.
        </p>

        {/* Sub-Districts Chips */}
        {cityObj && cityObj.districts.length > 0 && (
          <div className="pt-4 border-t border-white/5 space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {cityName} İlçeleri & Semtleri:
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Link
                to={`/${citySlug}`}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  !districtSlug
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'bg-dark-900 border border-white/5 text-slate-300 hover:border-cyan-400'
                }`}
              >
                Tüm {cityName}
              </Link>
              {cityObj.districts.map((d) => (
                <Link
                  key={d.slug}
                  to={`/${citySlug}/${d.slug}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    districtSlug === d.slug
                      ? 'bg-cyan-500 text-black font-bold'
                      : 'bg-dark-900 border border-white/5 text-slate-300 hover:border-cyan-400'
                  }`}
                >
                  {d.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Showcase Grid */}
      <ShowcaseGrid
        profiles={filteredProfiles}
        currentCityName={cityName}
        onSelectProfile={(profile) => setSelectedDetailProfile(profile)}
      />

      {/* Profile Detail Modal */}
      <ProfileDetailModal
        profile={selectedDetailProfile}
        isOpen={!!selectedDetailProfile}
        onClose={() => setSelectedDetailProfile(null)}
      />

    </div>
  );
};
