import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { Profile } from '../../types';
import { analytics } from '../../services/analytics';
import '../../styles/neonLed.css';

interface ShowcaseCardProps {
  profile: Profile;
  index?: number;
}

// Unsplash Fotoğraf Boyutlandırma ve Hızlandırma
function optimizeImageUrl(url?: string): string {
  if (!url) return 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=75';
  if (url.includes('unsplash.com') && !url.includes('auto=format')) {
    return `${url}?auto=format&fit=crop&w=400&q=75`;
  }
  return url;
}

export function ShowcaseCard({ profile, index = 0 }: ShowcaseCardProps) {
  const delayClass = `neon-delay-${index % 8}`;
  const isDiamond = (profile.packageType || '').toUpperCase() === 'DIAMOND';
  const isPremium = (profile.packageType || '').toUpperCase() === 'PREMIUM';

  const allPhotos = useMemo(() => {
    const list: string[] = [];
    if (profile.coverPhoto && typeof profile.coverPhoto === 'string' && profile.coverPhoto.trim()) {
      list.push(optimizeImageUrl(profile.coverPhoto.trim()));
    }
    if (Array.isArray(profile.photos)) {
      profile.photos.forEach((p) => {
        if (typeof p === 'string' && p.trim()) {
          const opt = optimizeImageUrl(p.trim());
          if (!list.includes(opt)) list.push(opt);
        }
      });
    }
    return list.length > 0 ? list : ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=75'];
  }, [profile.coverPhoto, profile.photos]);

  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  useEffect(() => {
    if (allPhotos.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentPhotoIdx((prev) => (prev + 1) % allPhotos.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [allPhotos.length]);
  
  const displayPhone = profile.whatsapp || profile.phone || '0540 322 55 55';
  const cleanPhone = displayPhone.replace(/[^0-9]/g, '');
  const intlPhone = cleanPhone.startsWith('0') ? `90${cleanPhone.slice(1)}` : cleanPhone.startsWith('90') ? cleanPhone : `90${cleanPhone}`;
  
  const telHref = `tel:+${intlPhone}`;
  const autoMessage = `Merhaba ${profile.name}, Turkey Massage VIP (turkeymassagevip.com) üzerinden profilinizi inceledim. ${profile.city} (${profile.district || 'Merkez'}) bölgesindeki seansınız ve müsaitlik durumunuz hakkında bilgi alabilir miyim? ✨`;
  const waHref = `https://wa.me/${intlPhone}?text=${encodeURIComponent(autoMessage)}`;

  const handleCardClick = () => {
    analytics.logEvent('showcase_click', {
      profileId: profile.id,
      profileName: profile.name,
      city: profile.city
    });
  };

  const handleWhatsappClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    analytics.logEvent('whatsapp_click', {
      profileId: profile.id,
      profileName: profile.name,
      city: profile.city
    });
  };

  const handlePhoneClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    analytics.logEvent('phone_click', {
      profileId: profile.id,
      profileName: profile.name,
      city: profile.city
    });
  };

  return (
    <div
      className={`group relative bg-slate-900 overflow-hidden shadow-lg rounded-xl neon-card-led ${delayClass}`}
    >
      <Link to={`/profil/${profile.slug}`} onClick={handleCardClick} className="block">
        {/* Optimize Edilmiş Hızlı Fotoğraf Alanı */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950">
          <img
            src={allPhotos[currentPhotoIdx] || allPhotos[0]}
            alt={profile.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
            style={{ objectPosition: 'center 20%' }}
          />

          {/* Üst Rozetler */}
          <div className="absolute top-1.5 inset-x-1.5 flex items-center justify-between z-10 gap-1 pointer-events-none">
            {isDiamond ? (
              <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-[9px] sm:text-[10px] rounded-md shadow flex items-center gap-0.5 whitespace-nowrap">
                <Sparkles className="w-2.5 h-2.5 fill-current shrink-0" />
                <span>DIAMOND</span>
              </span>
            ) : isPremium ? (
              <span className="px-2 py-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black text-[9px] sm:text-[10px] rounded-md shadow flex items-center gap-0.5 whitespace-nowrap">
                <Star className="w-2.5 h-2.5 fill-current shrink-0" />
                <span>PREMIUM</span>
              </span>
            ) : (
              <span className="px-1.5 py-0.5 bg-slate-950/85 backdrop-blur-md text-slate-300 font-bold text-[9px] rounded-md border border-slate-700 whitespace-nowrap">
                {profile.categoryName || 'Masöz'}
              </span>
            )}

            {profile.isAvailable !== false && (
              <span className="px-1.5 py-0.5 bg-emerald-500 text-slate-950 font-black text-[9px] rounded-md shadow flex items-center gap-1 whitespace-nowrap shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse"></span>
                <span>MÜSAİT</span>
              </span>
            )}
          </div>

          {/* Zarif Alt Bilgi */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-2 sm:p-2.5 pt-6 flex flex-col justify-end z-10 pointer-events-none">
            <div>
              <h3 className="text-xs sm:text-sm font-black text-white leading-tight flex items-center gap-1">
                <span className={isDiamond ? 'gold-shimmer-text' : 'neon-shimmer-text'}>
                  {profile.name}
                </span>
                {profile.isVerified !== false && (
                  <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0 inline" />
                )}
              </h3>
              
              <p className="text-[10px] font-bold text-slate-300 line-clamp-1 mt-0.5">
                {profile.title || 'Profesyonel Masöz'}
              </p>
            </div>

            <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400 pt-1 border-t border-slate-800/80 mt-1">
              <span className="flex items-center gap-0.5 text-cyan-300 font-bold truncate max-w-[65%]">
                <MapPin className="w-2.5 h-2.5 text-rose-400 shrink-0" />
                <span className="truncate">{profile.city} / {profile.district || 'Merkez'}</span>
              </span>

              {profile.price ? (
                <span className="font-black text-amber-300 shrink-0">
                  {profile.price} {profile.currency || 'TL'}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </Link>

      {/* Aksiyon Butonları */}
      <div className="p-1 sm:p-1.5 bg-slate-950/95 grid grid-cols-2 gap-1 border-t border-slate-800/80 relative z-20">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsappClick}
          className="py-1 sm:py-1.5 px-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-[10px] sm:text-xs rounded-lg flex items-center justify-center gap-1 shadow transition-all active:scale-95"
        >
          <MessageCircle className="w-3 h-3 fill-current shrink-0" />
          <span className="truncate">WhatsApp</span>
        </a>

        <a
          href={telHref}
          onClick={handlePhoneClick}
          className="py-1 sm:py-1.5 px-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-[10px] sm:text-xs rounded-lg flex items-center justify-center gap-1 shadow transition-all active:scale-95"
        >
          <Phone className="w-3 h-3 fill-current shrink-0" />
          <span className="truncate">Hemen Ara</span>
        </a>
      </div>
    </div>
  );
}
