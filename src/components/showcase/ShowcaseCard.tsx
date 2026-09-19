import React from 'react';
import { Link } from 'react-router-dom';
import { Profile } from '../../types';

interface ShowcaseCardProps {
  profile: Profile;
  index?: number;
}

export function ShowcaseCard({ profile, index = 0 }: ShowcaseCardProps) {
  const cleanPhone = (profile.whatsapp || profile.phone || '05403225555').replace(/[^0-9]/g, '');
  const intlPhone = cleanPhone.startsWith('0') ? `90${cleanPhone.slice(1)}` : cleanPhone.startsWith('90') ? cleanPhone : `90${cleanPhone}`;
  const waLink = `https://wa.me/${intlPhone}?text=${encodeURIComponent(`Merhaba ${profile.name}, ilanınızı Turkey Massage VIP sitesinde gördüm, randevu almak istiyorum.`)}`;

  // Ekran görüntünüzdeki canlı neon renkleri
  const neonPalette = [
    { border: '#facc15', glow: 'rgba(250, 204, 21, 0.55)' }, // Sarı
    { border: '#f43f5e', glow: 'rgba(244, 63, 94, 0.55)' },  // Kırmızı / Gül
    { border: '#67e8f9', glow: 'rgba(103, 232, 249, 0.55)' }, // Açık Mavi / Beyazımsı
    { border: '#34d399', glow: 'rgba(52, 211, 153, 0.55)' }, // Zümrüt Yeşili
    { border: '#ec4899', glow: 'rgba(236, 72, 153, 0.55)' }, // Neon Pembe
    { border: '#a855f7', glow: 'rgba(168, 85, 247, 0.55)' }, // Mor
    { border: '#fb923c', glow: 'rgba(251, 146, 60, 0.55)' }, // Turuncu
    { border: '#38bdf8', glow: 'rgba(56, 189, 248, 0.55)' }  // Gökyüzü Mavisi
  ];
  const neon = neonPalette[index % neonPalette.length];

  const photo = profile.coverPhoto || profile.photos?.[0] || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80';
  const age = profile.age || 22;
  const district = profile.district || profile.city || 'Konak';
  const price = profile.price || 4000;

  return (
    <div 
      className="relative rounded-2xl overflow-hidden bg-[#0a0d14] flex flex-col transition-transform duration-300 hover:-translate-y-1 group"
      style={{
        border: `2px solid ${neon.border}`,
        boxShadow: `0 0 16px ${neon.glow}, inset 0 0 8px ${neon.glow}`
      }}
    >
      <Link to={`/profil/${profile.slug}`} className="block relative aspect-[3/3.8] overflow-hidden">
        {/* Fotoğraf */}
        <img 
          src={photo} 
          alt={profile.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          style={{ objectPosition: 'center 20%' }}
        />

        {/* Sol Üst Rozet: 💙 VIP */}
        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
          <span className="px-2.5 py-0.5 rounded-md bg-[#facc15] text-black font-black text-[10px] tracking-wide flex items-center gap-1 shadow-md">
            <span>💙</span> VIP
          </span>
        </div>

        {/* Sağ Üst Rozet: ✓ ONAYLI */}
        <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
          <span className="px-2.5 py-0.5 rounded-md bg-[#22d3ee] text-black font-black text-[10px] tracking-wide flex items-center gap-1 shadow-md">
            <span>✓</span> ONAYLI
          </span>
        </div>

        {/* Sağ Alt Fiyat: 4000 ₺ */}
        <div className="absolute bottom-2.5 right-2.5 z-10 pointer-events-none">
          <span className="px-3 py-1 rounded-lg bg-black/85 border border-[#facc15]/80 text-[#facc15] font-black text-xs shadow-lg">
            {price} ₺
          </span>
        </div>
      </Link>

      {/* Kart Alt Bilgileri */}
      <div className="p-3.5 flex flex-col justify-between flex-1 bg-[#0a0d14] space-y-2">
        {/* İsim ve Yaş */}
        <div className="flex items-center gap-1.5">
          <h3 className="font-black text-white text-sm sm:text-base tracking-wide truncate">
            {profile.name}
          </h3>
          <span className="text-slate-400 text-xs font-normal shrink-0">
            ({age})
          </span>
        </div>

        {/* Konum ve Yıldız Puanı */}
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-1 text-slate-300">
            <span className="text-pink-500">📍</span>
            <span>{district}</span>
          </div>
          <div className="flex items-center gap-1 text-amber-400 font-black">
            <span>★</span>
            <span>5.0</span>
          </div>
        </div>

        {/* Aksiyon Butonları: WhatsApp & Ara */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a 
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="py-2 px-2 bg-[#10b981] hover:bg-[#059669] text-black font-black text-xs rounded-xl flex items-center justify-center gap-1 shadow transition-all active:scale-95"
          >
            WhatsApp
          </a>
          <a 
            href={`tel:${cleanPhone}`}
            onClick={(e) => e.stopPropagation()}
            className="py-2 px-2 bg-[#172033] hover:bg-[#222f4c] text-white font-bold text-xs rounded-xl border border-slate-700/60 flex items-center justify-center gap-1 shadow transition-all active:scale-95"
          >
            Ara
          </a>
        </div>
      </div>
    </div>
  );
}
