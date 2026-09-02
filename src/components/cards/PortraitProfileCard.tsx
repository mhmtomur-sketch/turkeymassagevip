import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle, Flame, Star, Phone, MessageCircle, MapPin } from 'lucide-react';
import { Profile } from '../../types';
import { db } from '../../services/db';

interface PortraitCardProps {
  profile: Profile;
  onSelect: (profile: Profile) => void;
  priority?: boolean;
}

export default function PortraitProfileCard({ profile, onSelect }: PortraitCardProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const photos = profile.photos && profile.photos.length > 0
    ? profile.photos
    : ['https://images.unsplash.com/photo-1544005313-94ddf0286df2'];

  useEffect(() => {
    if (isHovered || photos.length <= 1) return;
    const interval = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [photos.length, isHovered]);

  const handleWhatsapp = (e: React.MouseEvent) => {
    e.stopPropagation();
    db.trackEvent({ eventType: 'whatsapp_click', profileId: profile.id, city: profile.city });
    const cleanPhone = (profile.whatsapp || profile.phone || '905403225555').replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(`Merhaba ${profile.name}, Turkey Massage VIP üzerinden profilinizi gördüm, randevu almak istiyorum.`);
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    db.trackEvent({ eventType: 'phone_click', profileId: profile.id, city: profile.city });
    const cleanPhone = (profile.phone || '05403225555').replace(/[^0-9]/g, '');
    window.location.href = `tel:${cleanPhone}`;
  };

  const pType = (profile.packageType || '').toUpperCase();
  const isDiamond = pType === 'DIAMOND';
  const isPremium = pType === 'PREMIUM';
  const isGold = pType === 'GOLD';

  const ledClass = isDiamond
    ? 'led-border-diamond'
    : isPremium
    ? 'led-border-premium'
    : isGold
    ? 'led-border-gold'
    : 'led-border-silver';

  return (
    <div
      onClick={() => onSelect(profile)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group ${ledClass} overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col`}
    >
      {/* 3:4 Dikey Görsel Alanı */}
      <div className="aspect-[3/4] relative w-full overflow-hidden bg-slate-950">
        <img
          src={photos[photoIndex]}
          alt={profile.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

        {/* Üst Rozetler */}
        <div className="absolute top-1.5 left-1.5 flex flex-col gap-1 items-start z-10">
          {isDiamond && (
            <span className="px-1.5 py-0.2 rounded bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-[8px] sm:text-[9px] font-black tracking-wider shadow">
              💎 DIAMOND
            </span>
          )}
          {isPremium && (
            <span className="px-1.5 py-0.2 rounded bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-[8px] sm:text-[9px] font-black tracking-wider shadow">
              👑 PREMIUM
            </span>
          )}
          {isGold && (
            <span className="px-1.5 py-0.2 rounded bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 text-[8px] sm:text-[9px] font-black tracking-wider shadow">
              ⭐ GOLD
            </span>
          )}
          {profile.isVerified && (
            <span className="inline-flex items-center gap-0.5 px-1 py-0.2 rounded bg-blue-600/90 text-white text-[8px] font-bold shadow">
              <CheckCircle className="w-2 h-2" /> Doğrulandı
            </span>
          )}
        </div>

        {/* Müsaitlik */}
        {profile.isAvailable && (
          <div className="absolute top-1.5 right-1.5 flex items-center gap-1 px-1.5 py-0.2 rounded bg-emerald-500/90 text-white text-[8px] font-bold shadow z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            MÜSAİT
          </div>
        )}

        {/* Fotoğraf Sayacı */}
        {photos.length > 1 && (
          <div className="absolute bottom-1.5 right-1.5 px-1 py-0.2 rounded bg-black/60 backdrop-blur-sm text-white text-[8px] font-medium z-10">
            {photoIndex + 1}/{photos.length}
          </div>
        )}
      </div>

      {/* Kart Bilgileri */}
      <div className="p-2 flex-1 flex flex-col justify-between space-y-1 bg-slate-900/95">
        <div>
          <div className="flex items-center justify-between gap-1">
            <h3 className="font-extrabold text-[11px] sm:text-xs text-white truncate group-hover:text-cyan-400 transition-colors">
              {profile.name}
            </h3>
            {profile.age && <span className="text-[10px] font-bold text-cyan-400 shrink-0">{profile.age} Yaş</span>}
          </div>

          <div className="flex items-center justify-between text-[9px] text-slate-400 mt-0.5">
            <span className="flex items-center gap-0.5 truncate">
              <MapPin className="w-2 h-2 text-cyan-400 shrink-0" />
              {profile.city} {profile.district ? `(${profile.district})` : ''}
            </span>
            <span className="text-amber-400 font-bold shrink-0">★ {profile.rating || '5.0'}</span>
          </div>

          {/* 1-2 Hizmet Etiketi */}
          {profile.services && profile.services.length > 0 && (
            <div className="flex flex-wrap gap-0.5 mt-1">
              {profile.services.slice(0, 2).map((srv, idx) => (
                <span key={idx} className="px-1 py-0.2 rounded bg-slate-800 text-slate-300 text-[8px] font-medium truncate max-w-[85px]">
                  {srv}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Fiyat & 1-Tık İletişim Butonları */}
        <div className="pt-1 border-t border-slate-800 flex items-center justify-between gap-1">
          <div className="text-[9px] sm:text-[10px] font-black text-white truncate">
            {profile.price ? `${profile.price} ₺` : 'Fiyat Sor'}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleWhatsapp}
              className="p-1 sm:p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow"
              title="WhatsApp ile Randevu"
            >
              <MessageCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </button>
            <button
              onClick={handleCall}
              className="p-1 sm:p-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-colors shadow"
              title="Hemen Ara"
            >
              <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
