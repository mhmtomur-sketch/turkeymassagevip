import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Sparkles, 
  Flame, 
  Star
} from 'lucide-react';
import { Profile } from '../../types';
import { db } from '../../services/db';
import { useFavorites } from '../../hooks/useFavorites';
import { slugify } from '../../utils/generators';

interface ProfileCardProps {
  profile: Profile;
  onOpenStory?: (profile: Profile) => void;
  onSelectProfile?: (profile: Profile) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ 
  profile, 
  onOpenStory, 
  onSelectProfile 
}) => {
  const navigate = useNavigate();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { isFavorite, isLiked, toggleFavorite, toggleLike } = useFavorites();

  const allPhotos = profile.photos && profile.photos.length > 0 
    ? profile.photos 
    : [profile.coverPhoto || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'];

  // 7-second crossfade photo slider (pauses on hover)
  useEffect(() => {
    if (allPhotos.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % allPhotos.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [allPhotos.length, isHovered]);

  const hasStory = profile.stories && profile.stories.length > 0;
  const packageColor = 
    profile.packageType === 'DIAMOND' ? 'border-cyan-400/60 shadow-diamond-glow' :
    profile.packageType === 'PREMIUM' ? 'border-pink-500/60 shadow-premium-glow' :
    profile.packageType === 'GOLD' ? 'border-amber-400/60 shadow-gold-glow' :
    'border-slate-700/60';

  const targetSlug = profile.slug || slugify(`${profile.name} ${profile.city} ${profile.district}`) || profile.id;

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    db.logEvent({ profileId: profile.id, packageId: profile.packageType, eventType: 'showcase_click' });
    
    if (onSelectProfile) {
      onSelectProfile(profile);
    } else {
      navigate(`/profil/${targetSlug}`);
    }
  };

  const handleWhatsappClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    db.logEvent({ profileId: profile.id, packageId: profile.packageType, eventType: 'whatsapp_click' });
    const settings = db.getSettings();
    const msg = encodeURIComponent(settings.defaultWhatsappMessage || 'Merhaba, randevu almak istiyorum.');
    window.open(`https://wa.me/${profile.whatsapp}?text=${msg}`, '_blank');
  };

  const handlePhoneClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    db.logEvent({ profileId: profile.id, packageId: profile.packageType, eventType: 'phone_click' });
    window.location.href = `tel:${profile.phone}`;
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      className={`group relative flex flex-col rounded-2xl overflow-hidden glass-card transition-all duration-300 hover:-translate-y-1.5 cursor-pointer select-none ${packageColor}`}
    >
      {/* 1. VISUAL PORTRAIT CONTAINER (Aspect Ratio 3:4) */}
      <div className="relative w-full aspect-3/4 overflow-hidden bg-dark-900 block pointer-events-none">
        
        {/* Photos Crossfade Slider */}
        {allPhotos.map((photoUrl, idx) => (
          <img
            key={idx}
            src={photoUrl}
            alt={`${profile.name} - ${profile.city}`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out group-hover:scale-105 ${
              idx === currentPhotoIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}

        {/* Dark Vignette Gradients for readability */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-dark-950 via-dark-950/20 to-black/50 pointer-events-none" />

        {/* Top Badges Bar */}
        <div className="absolute top-2.5 inset-x-2.5 z-30 flex items-start justify-between gap-1 pointer-events-none">
          {/* Package Badge & Availability */}
          <div className="flex flex-col gap-1 items-start">
            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md ${
              profile.packageType === 'DIAMOND' ? 'bg-cyan-500 text-black shadow-cyan-500/50' :
              profile.packageType === 'PREMIUM' ? 'bg-pink-500 text-white shadow-pink-500/50' :
              profile.packageType === 'GOLD' ? 'bg-amber-400 text-black shadow-amber-400/50' :
              'bg-slate-700 text-slate-200'
            }`}>
              {profile.packageType}
            </span>

            {profile.isAvailable && (
              <span className="flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                MÜSAİT
              </span>
            )}
          </div>

          {/* Top Right: Verified Badge & Story Ring */}
          <div className="flex items-center gap-1.5">
            {hasStory && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onOpenStory?.(profile);
                }}
                className="w-7 h-7 rounded-full p-[1.5px] story-ring flex items-center justify-center hover:scale-110 transition-transform shadow-lg pointer-events-auto"
                title="Hikayeyi İzle"
              >
                <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center">
                  <Flame className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                </div>
              </button>
            )}

            {profile.isVerified && (
              <div 
                className="w-6 h-6 rounded-full verified-badge flex items-center justify-center text-white shadow-md pointer-events-none"
                title="Doğrulanmış Profil"
              >
                <CheckCircle2 className="w-4 h-4 fill-white text-dark-950" />
              </div>
            )}
          </div>
        </div>

        {/* Multi-Photo Indicators */}
        {allPhotos.length > 1 && (
          <div className="absolute bottom-24 inset-x-0 z-30 flex justify-center gap-1 pointer-events-none">
            {allPhotos.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === currentPhotoIndex ? 'w-4 bg-cyan-400' : 'w-1 bg-white/40'
                }`}
              />
            ))}
          </div>
        )}

        {/* Card Overlay Text Content */}
        <div className="absolute bottom-0 inset-x-0 z-30 p-3 flex flex-col justify-end text-left pointer-events-none">
          {/* Name & Age */}
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <h3 className="text-sm sm:text-base font-black text-white truncate drop-shadow-md">
              {profile.name}
            </h3>
            {profile.age && (
              <span className="text-xs font-bold text-slate-300 bg-white/10 px-1.5 py-0.5 rounded backdrop-blur-sm">
                {profile.age} Yaş
              </span>
            )}
          </div>

          {/* City / District */}
          <div className="flex items-center gap-1 text-[11px] font-semibold text-cyan-300 truncate mb-2">
            <MapPin className="w-3 h-3 text-cyan-400 flex-shrink-0" />
            <span className="truncate">{profile.city} / {profile.district}</span>
          </div>

          {/* 2 Service Tags */}
          <div className="flex flex-wrap gap-1 mb-2 overflow-hidden max-h-5">
            {profile.services.slice(0, 2).map((srv, idx) => (
              <span 
                key={idx}
                className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-dark-900/80 text-slate-300 border border-white/10 truncate max-w-[110px]"
              >
                {srv}
              </span>
            ))}
          </div>

          {/* Starting Price & Rating */}
          <div className="flex items-center justify-between pt-1.5 border-t border-white/10 text-xs">
            <div className="text-[11px] font-extrabold text-amber-400">
              {profile.startingPrice.toLocaleString('tr-TR')} {profile.currency}
              <span className="text-[9px] font-normal text-slate-400 ml-1">/ seans</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-300">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="font-bold">{profile.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Action Contact Buttons Footer */}
      <div className="grid grid-cols-2 gap-1.5 p-2 bg-dark-950/90 border-t border-white/5 z-30">
        {/* WhatsApp Button */}
        <button
          type="button"
          onClick={handleWhatsappClick}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs shadow-md hover:shadow-emerald-500/30 transition-all pointer-events-auto"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
          <span className="truncate">WhatsApp</span>
        </button>

        {/* Call Button */}
        <button
          type="button"
          onClick={handlePhoneClick}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-cyan-600/90 hover:bg-cyan-500 active:scale-95 text-white font-bold text-xs shadow-md hover:shadow-cyan-500/30 transition-all pointer-events-auto"
        >
          <Phone className="w-3.5 h-3.5 fill-white text-cyan-600" />
          <span className="truncate">Ara</span>
        </button>
      </div>
    </div>
  );
};
