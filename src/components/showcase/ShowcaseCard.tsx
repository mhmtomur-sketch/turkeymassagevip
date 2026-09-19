import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, MapPin, Phone, MessageCircle } from 'lucide-react';
import { Profile } from '../../types';

interface ShowcaseCardProps {
  profile: Profile;
  index?: number;
}

export function ShowcaseCard({ profile, index = 0 }: ShowcaseCardProps) {
  const pkgType = (profile.packageType || 'DIAMOND').toUpperCase();
  const isDiamond = pkgType === 'DIAMOND';
  const isPremium = pkgType === 'PREMIUM';
  const isGold = pkgType === 'GOLD';

  const cleanPhone = (profile.whatsapp || profile.phone || '05403225555').replace(/[^0-9]/g, '');
  const intlPhone = cleanPhone.startsWith('0') ? `90${cleanPhone.slice(1)}` : cleanPhone;
  const waLink = `https://wa.me/${intlPhone}?text=${encodeURIComponent(`Merhaba ${profile.name}, ilanınızı Turkey Massage VIP sitesinde gördüm, randevu almak istiyorum.`)}`;

  const neonClass = `neon-card-${index % 12}`;

  return (
    <div className={`group relative rounded-xl sm:rounded-2xl overflow-hidden ${neonClass} transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col bg-slate-950 aspect-[3/4.6]`}>
      <Link to={`/profil/${profile.slug}`} className="relative w-full h-full block">
        {/* %100 PARLAK DOĞAL FOTOĞRAF */}
        <img
          src={profile.coverPhoto || profile.photos?.[0]}
          alt={profile.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-100"
          loading={index < 4 ? 'eager' : 'lazy'}
        />

        {/* SOL ÜST ALAN: PAKET ROZETİ VE HEMEN ALTINDA FİYAT ETİKETİ (ÜST ÜSTE, TAŞMAZ!) */}
        <div className="absolute top-1 left-1 flex flex-col items-start gap-1 z-10">
          <div className="flex items-center gap-1">
            {isDiamond && (
              <span className="px-1.5 py-0.5 rounded bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-[7.5px] sm:text-[9px] uppercase tracking-wider shadow flex items-center gap-0.5">
                <Sparkles className="w-2 h-2 animate-pulse" /> DIAMOND
              </span>
            )}
            {isPremium && (
              <span className="px-1.5 py-0.5 rounded bg-cyan-500 text-slate-950 font-black text-[7.5px] sm:text-[9px] uppercase tracking-wider shadow">
                👑 PRM
              </span>
            )}
            {isGold && (
              <span className="px-1.5 py-0.5 rounded bg-yellow-400 text-slate-950 font-black text-[7.5px] sm:text-[9px] uppercase tracking-wider shadow">
                ⭐ GOLD
              </span>
            )}
            {!isDiamond && !isPremium && !isGold && (
              <span className="px-1.5 py-0.5 rounded bg-slate-300 text-slate-950 font-black text-[7.5px] sm:text-[9px] uppercase tracking-wider shadow">
                ⚪ SLV
              </span>
            )}

            {/* YANIP SÖNEN YEŞİL MÜSAİTLİK IŞIĞI */}
            {profile.isAvailable && (
              <div className="relative flex items-center justify-center w-3 h-3 bg-slate-950/80 rounded-full p-0.5 shadow border border-emerald-400/60">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 shadow-[0_0_6px_#10b981]"></span>
              </div>
            )}
          </div>

          {/* FİYAT ETİKETİ - PAKETİN HEMEN ALTINDA */}
          <div className="px-1.5 py-0.5 rounded bg-slate-950/85 text-amber-300 font-black text-[8px] sm:text-[10px] border border-amber-400/40 shadow">
            {profile.price ? `${profile.price}` : '2500'} ₺
          </div>
        </div>

        {/* ALT ALAN: İSİM + ŞEHİR + RESPONSIVE WHATSAPP / ARA BUTONLARI */}
        <div className="absolute bottom-0 inset-x-0 p-1 sm:p-1.5 z-10 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end space-y-1">
          <div>
            <div className="flex items-center gap-0.5">
              <h3 className="font-black text-white text-[9px] sm:text-xs leading-tight line-clamp-1 group-hover:text-amber-400 transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {profile.name}
              </h3>
              {profile.isVerified && (
                <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-400 flex-shrink-0 drop-shadow" />
              )}
            </div>

            <div className="flex items-center gap-0.5 text-[7.5px] sm:text-[9px] text-amber-300 font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              <MapPin className="w-2 h-2 text-amber-400 flex-shrink-0" />
              <span className="truncate">{profile.city}</span>
            </div>
          </div>

          {/* ASLA TAŞMAYAN MİKRO İLETİŞİM BUTONLARI */}
          <div className="grid grid-cols-2 gap-1 pt-0.5">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="py-1 px-0.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[8px] sm:text-[9px] flex items-center justify-center gap-0.5 shadow transition-all active:scale-95 z-20"
            >
              <MessageCircle className="w-2.5 h-2.5 flex-shrink-0" />
              <span>{isDiamond ? 'WhatsApp' : 'WA'}</span>
            </a>
            <a
              href={`tel:${profile.phone || profile.whatsapp || '05403225555'}`}
              onClick={(e) => e.stopPropagation()}
              className="py-1 px-0.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[8px] sm:text-[9px] flex items-center justify-center gap-0.5 shadow transition-all active:scale-95 z-20"
            >
              <Phone className="w-2.5 h-2.5 flex-shrink-0" />
              <span>Ara</span>
            </a>
          </div>
        </div>
      </Link>
    </div>
  );
}
