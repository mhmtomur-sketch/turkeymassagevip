import React, { useState } from 'react';
import { Crown, Sparkles, Award, ShieldCheck, ArrowRight, Flame, MapPin } from 'lucide-react';
import { Profile, PackageType } from '../../types';
import { ProfileCard } from './ProfileCard';
import { useVitrinRotation } from '../../hooks/useVitrinRotation';
import { PACKAGES } from '../../data/packages';
import { db } from '../../services/db';

interface ShowcaseGridProps {
  profiles: Profile[];
  currentCityName?: string;
  onOpenStory?: (profile: Profile) => void;
  onSelectProfile?: (profile: Profile) => void;
  onOpenAdModalForPackage?: (pkg: PackageType) => void;
  showTierHeaders?: boolean;
}

export const ShowcaseGrid: React.FC<ShowcaseGridProps> = ({
  profiles,
  currentCityName,
  onOpenStory,
  onSelectProfile,
  onOpenAdModalForPackage,
  showTierHeaders = true,
}) => {
  const settings = db.getSettings();
  const [isHovered, setIsHovered] = useState(false);

  // Group profiles by VIP tier
  const diamondProfiles = profiles.filter((p) => p.packageType === 'DIAMOND');
  const premiumProfiles = profiles.filter((p) => p.packageType === 'PREMIUM');
  const goldProfiles = profiles.filter((p) => p.packageType === 'GOLD');
  const silverProfiles = profiles.filter((p) => p.packageType === 'SILVER');

  // Automatic 12-second rotation per tier (pauses on hover)
  const rotationActive = settings.rotationEnabled && !isHovered;
  const rotationInterval = settings.rotationIntervalSeconds || 12;

  const { rotatedList: rotatedDiamond } = useVitrinRotation(diamondProfiles, rotationInterval, !rotationActive);
  const { rotatedList: rotatedPremium } = useVitrinRotation(premiumProfiles, rotationInterval, !rotationActive);
  const { rotatedList: rotatedGold } = useVitrinRotation(goldProfiles, rotationInterval, !rotationActive);
  const { rotatedList: rotatedSilver } = useVitrinRotation(silverProfiles, rotationInterval, !rotationActive);

  if (profiles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-dark-900 border border-white/10 flex items-center justify-center mx-auto text-slate-500">
          <Sparkles className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-white">
          {currentCityName ? `${currentCityName} Bölgesinde` : 'Bu Kriterlere Uygun'} Aktif İlan Bulunmuyor
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          İlk ilanı siz vererek bu bölgede vitrinin en tepesine yerleşebilir ve müşterilere anında ulaşabilirsiniz.
        </p>
        <button
          onClick={() => onOpenAdModalForPackage?.('DIAMOND')}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg transition-all hover:scale-105"
        >
          🚀 {currentCityName ? `${currentCityName}'da` : 'Bu Bölgede'} İlk İlanı Ver
        </button>
      </div>
    );
  }

  // Helper component for Tier End CTA Card
  const renderTierCtaCard = (pkgType: PackageType) => {
    const pkg = PACKAGES[pkgType];
    const occupancy = db.getOccupancy(pkgType);

    return (
      <div
        className="relative flex flex-col justify-between p-3.5 sm:p-5 rounded-2xl glass-card border border-white/15 text-center space-y-2.5 aspect-3/4 hover:-translate-y-1 transition-all"
        style={{ borderColor: pkg.borderColor }}
      >
        <div className="space-y-1.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-dark-950 flex items-center justify-center mx-auto shadow-md" style={{ color: pkg.color }}>
            <Crown className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <h4 className="text-[11px] sm:text-xs font-black uppercase text-white leading-tight">
            {pkg.name} Vitrinde Yerinizi Alın
          </h4>
          <div className="text-sm sm:text-base font-black text-amber-400">
            {pkg.priceMonthly.toLocaleString('tr-TR')} TL <span className="text-[9px] text-slate-400 font-normal">/ ay</span>
          </div>

          {/* Occupancy Rate Bar */}
          <div className="space-y-1 pt-0.5">
            <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-bold text-slate-300">
              <span>Doluluk</span>
              <span className="text-cyan-400 font-black">%{occupancy.percentage} Dolu</span>
            </div>
            <div className="h-1.5 w-full bg-dark-950 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all"
                style={{ width: `${occupancy.percentage}%` }}
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => onOpenAdModalForPackage?.(pkgType)}
          className="w-full py-2 rounded-xl font-black text-[10px] sm:text-xs text-white shadow-lg transition-all flex items-center justify-center gap-1 hover:opacity-95"
          style={{ background: `linear-gradient(135deg, ${pkg.color}, #0b0f19)` }}
        >
          <span>📲 İLAN VER / BAŞVUR</span>
        </button>
      </div>
    );
  };

  return (
    <div 
      className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-3 sm:py-6 space-y-6 sm:space-y-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* 1. DIAMOND VIP SECTION (Mobilde 2 Kolon, Desktopta 4 Kolon - Sınırsız Üye) */}
      <section className="space-y-2.5">
        {showTierHeaders && (
          <div className="flex items-center justify-between pb-1.5 border-b border-cyan-500/30">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center shadow-diamond-glow">
                <Crown className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <h2 className="text-xs sm:text-base font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                <span className="theme-gradient-text">DIAMOND VIP VİTRİNİ</span>
                <span className="text-[8px] sm:text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  ZİRVE
                </span>
              </h2>
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400">
              {rotatedDiamond.length} Seçkin İlan
            </span>
          </div>
        )}

        {rotatedDiamond.length === 0 ? (
          <div className="p-4 rounded-2xl glass-card border border-cyan-500/30 text-center space-y-2">
            <p className="text-xs text-slate-300">
              {currentCityName ? `${currentCityName} bölgesinde` : 'Bu filtrede'} şu an aktif Diamond VIP ilan bulunmuyor.
            </p>
            <button
              onClick={() => onOpenAdModalForPackage?.('DIAMOND')}
              className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
            >
              💎 Diamond Vitrinde İlk Yeri Al
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-5">
            {rotatedDiamond.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onOpenStory={onOpenStory}
                onSelectProfile={onSelectProfile}
              />
            ))}
            {renderTierCtaCard('DIAMOND')}
          </div>
        )}
      </section>

      {/* 2. PREMIUM VIP SECTION (Geniş Mobilde 3 Kolon, Normal Mobilde 2 Kolon, Desktopta 4 Kolon) */}
      <section className="space-y-2.5">
        {showTierHeaders && (
          <div className="flex items-center justify-between pb-1.5 border-b border-amber-500/30">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center shadow-gold-glow">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <h2 className="text-xs sm:text-base font-black uppercase tracking-wider text-white">
                PREMIUM VIP VİTRİNİ
              </h2>
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400">
              {rotatedPremium.length} İlan
            </span>
          </div>
        )}

        {rotatedPremium.length === 0 ? (
          <div className="p-4 rounded-2xl glass-card border border-amber-500/30 text-center space-y-2">
            <p className="text-xs text-slate-300">
              {currentCityName ? `${currentCityName} bölgesinde` : 'Bu filtrede'} şu an aktif Premium VIP ilan bulunmuyor.
            </p>
            <button
              onClick={() => onOpenAdModalForPackage?.('PREMIUM')}
              className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs"
            >
              👑 Premium Vitrinde Yerini Al
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-5">
            {rotatedPremium.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onOpenStory={onOpenStory}
                onSelectProfile={onSelectProfile}
              />
            ))}
            {renderTierCtaCard('PREMIUM')}
          </div>
        )}
      </section>

      {/* 3. GOLD VIP SECTION (Mobilde 2-3 Kolon, Tablet/Geniş Ekran 4-5 Kolon) */}
      <section className="space-y-2.5">
        {showTierHeaders && (
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center">
                <Award className="w-3.5 h-3.5 text-slate-300" />
              </div>
              <h2 className="text-xs sm:text-base font-black uppercase tracking-wider text-white">
                GOLD VIP VİTRİNİ
              </h2>
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400">
              {rotatedGold.length} İlan
            </span>
          </div>
        )}

        {rotatedGold.length === 0 ? (
          <div className="p-4 rounded-2xl glass-card border border-slate-700 text-center space-y-2">
            <p className="text-xs text-slate-300">
              {currentCityName ? `${currentCityName} bölgesinde` : 'Bu filtrede'} şu an aktif Gold VIP ilan bulunmuyor.
            </p>
            <button
              onClick={() => onOpenAdModalForPackage?.('GOLD')}
              className="px-4 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs"
            >
              ⭐ Gold Vitrinde Yerini Al
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3.5">
            {rotatedGold.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onOpenStory={onOpenStory}
                onSelectProfile={onSelectProfile}
              />
            ))}
            {renderTierCtaCard('GOLD')}
          </div>
        )}
      </section>

      {/* 4. SILVER SECTION (Mobilde 2-3 Kolon, Tablet/Desktop 5-6 Kolon) */}
      <section className="space-y-2.5">
        {showTierHeaders && (
          <div className="flex items-center justify-between pb-1.5 border-b border-orange-500/30">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-orange-500/20 border border-orange-500/50 flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              </div>
              <h2 className="text-xs sm:text-base font-black uppercase tracking-wider text-white">
                GÜNCEL LİSTELEMELER (SILVER)
              </h2>
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400">
              {rotatedSilver.length} İlan
            </span>
          </div>
        )}

        {rotatedSilver.length === 0 ? (
          <div className="p-4 rounded-2xl glass-card border border-orange-500/30 text-center space-y-2">
            <p className="text-xs text-slate-300">
              {currentCityName ? `${currentCityName} bölgesinde` : 'Bu filtrede'} şu an aktif Silver ilan bulunmuyor.
            </p>
            <button
              onClick={() => onOpenAdModalForPackage?.('SILVER')}
              className="px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs"
            >
              🥈 Silver Vitrinde Yerini Al
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3.5">
            {rotatedSilver.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onOpenStory={onOpenStory}
                onSelectProfile={onSelectProfile}
              />
            ))}
            {renderTierCtaCard('SILVER')}
          </div>
        )}
      </section>

    </div>
  );
};
