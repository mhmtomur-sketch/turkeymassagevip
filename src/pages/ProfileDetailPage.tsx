import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../services/db';
import { Profile } from '../types';
import {
  MapPin, Clock, Calendar, ShieldCheck, CheckCircle2, MessageCircle, Phone,
  Sparkles, Heart, ChevronLeft, ChevronRight, Image as ImageIcon, Video as VideoIcon,
  Star, Check, User, Info, Award
} from 'lucide-react';

const RELIABLE_CDN_VIDEOS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
];

export function ProfileDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  useEffect(() => {
    if (slug) {
      const found = db.getProfileBySlug(slug);
      if (found) setProfile(found);
    }
  }, [slug]);

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#070b1b] text-white flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold mb-2">Profil Bulunamadı</h2>
        <Link to="/" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-xl">
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  const allPhotos = profile.photos && profile.photos.length > 0 ? profile.photos : [profile.coverPhoto || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'];
  const currentPhoto = allPhotos[activePhotoIdx] || allPhotos[0];

  const rawVideo = (profile as any).videoUrl;
  const validVideoUrl = (rawVideo && (rawVideo.endsWith('.mp4') || rawVideo.startsWith('data:video/')))
    ? rawVideo
    : RELIABLE_CDN_VIDEOS[Math.abs((profile.name || 'vip').length) % RELIABLE_CDN_VIDEOS.length];

  const cleanPhone = (profile.whatsapp || profile.phone || '05403225555').replace(/[^0-9]/g, '');
  const intlPhone = cleanPhone.startsWith('0') ? `90${cleanPhone.slice(1)}` : cleanPhone;
  const waLink = `https://wa.me/${intlPhone}?text=${encodeURIComponent(`Merhaba ${profile.name}, ilanınızı Turkey Massage VIP sitesinde gördüm, randevu almak istiyorum.`)}`;

  return (
    <div className="min-h-screen bg-[#070b1b] text-white pb-24">
      {/* ÜST GERİ DÖNÜŞ BARI */}
      <div className="bg-[#0b1026] border-b border-slate-800 px-4 py-3 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1 text-slate-300 hover:text-amber-400 font-bold text-xs">
            <ChevronLeft className="w-4 h-4" />
            <span>Tüm Masözler</span>
          </Link>
          <div className="text-xs text-amber-300 font-bold">
            {profile.city} • {profile.district}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* SOL: İNTERAKTİF FOTOĞRAF GALERİSİ */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-slate-900 border border-slate-800 shadow-2xl">
              <img
                src={currentPhoto}
                alt={profile.name}
                className="w-full h-full object-cover brightness-100"
              />

              {/* MÜSAİTLİK ROZETİ */}
              {profile.isAvailable && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500 text-white font-black text-xs shadow-lg flex items-center gap-1.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  ŞU AN MÜSAİT
                </div>
              )}

              {/* SAĞ / SOL GALERİ GEÇİŞ OKLARI */}
              {allPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : allPhotos.length - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md shadow-lg transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePhotoIdx((prev) => (prev < allPhotos.length - 1 ? prev + 1 : 0))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md shadow-lg transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* KÜÇÜK RESİM THUMBNAIL LİSTESİ */}
            {allPhotos.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {allPhotos.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activePhotoIdx === idx ? 'border-amber-400 scale-105 shadow-md' : 'border-slate-800 opacity-60'
                    }`}
                  >
                    <img src={p} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SAĞ: A-Z BÜTÜN BİLGİLER VE PROFİL AÇIKLAMASI */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">{profile.name}</h1>
                {profile.isVerified && <CheckCircle2 className="w-6 h-6 text-cyan-400" />}
              </div>
              <p className="text-xs text-amber-400 font-bold mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {profile.city} / {profile.district} • {profile.categoryName || 'Bireysel Masöz'}
              </p>
            </div>

            {/* FİYAT VE ÇALIŞMA SAATLERİ */}
            <div className="grid grid-cols-2 gap-3 bg-[#0b1026] p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Seans Ücreti</span>
                <span className="text-xl font-black text-amber-400">{profile.price || 2500} TL</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Çalışma Saatleri</span>
                <span className="text-xs font-bold text-white mt-1 block">12:00 - 02:00 (7/24)</span>
              </div>
            </div>

            {/* FİZİKSEL BİLGİLER (A-Z) */}
            <div className="grid grid-cols-4 gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">Yaş</span>
                <span className="text-xs font-black text-white">24</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">Boy</span>
                <span className="text-xs font-black text-white">168 cm</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">Göz</span>
                <span className="text-xs font-black text-cyan-300">Ela</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">Saç</span>
                <span className="text-xs font-black text-amber-300">Kumral</span>
              </div>
            </div>

            {/* HIZLI İLETİŞİM BUTONLARI */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp İletişim</span>
              </a>
              <a
                href={`tel:${profile.phone || profile.whatsapp || '05403225555'}`}
                className="py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Hemen Ara</span>
              </a>
            </div>

            {/* SUNDUĞU HİZMETLER */}
            <div>
              <span className="text-xs font-black text-slate-300 block mb-2 uppercase tracking-wide">
                Sunduğu Masaj Hizmetleri
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(profile.services || ['Aromaterapi', 'Derin Doku', 'Relax Masaj', 'Türk Hamamı']).map((svc, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-bold text-cyan-300">
                    ✨ {svc}
                  </span>
                ))}
              </div>
            </div>

            {/* İŞARETLENEN PROFİL AÇIKLAMASI KUTUSU */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-black text-cyan-400 block uppercase tracking-wide">
                PROFİL AÇIKLAMASI
              </span>
              <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 shadow-md">
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium whitespace-pre-line">
                  {profile.bio || 'Seçkin, hijyenik ve lüks ortamda profesyonel masaj hizmeti sunulmaktadır.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ALT: ÇALIŞAN VİTRİN VİDEOSU (OTOMATİK EN/BOY UYUMU) */}
        <div className="mt-10 bg-[#0b1026] p-5 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <VideoIcon className="w-5 h-5 text-purple-400 animate-pulse" />
            <h3 className="font-black text-white text-base sm:text-lg">
              ▶ Tanıtım & Vitrin Videosu (Canlı Oynatıcı)
            </h3>
          </div>

          <div className="max-w-md mx-auto rounded-2xl overflow-hidden aspect-[9/16] bg-black border border-purple-500/50 shadow-2xl">
            <video
              key={validVideoUrl}
              src={validVideoUrl}
              controls
              playsInline
              autoPlay
              muted
              loop
              preload="metadata"
              className="w-full h-full object-cover"
            >
              <source src={validVideoUrl} type="video/mp4" />
              Tarayıcınız video oynatmayı desteklemiyor.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
