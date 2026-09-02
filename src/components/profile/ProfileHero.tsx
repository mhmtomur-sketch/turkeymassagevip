import React, { useState } from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Heart, 
  Bookmark, 
  Share2, 
  AlertTriangle, 
  Clock, 
  Calendar,
  Sparkles,
  Flame,
  Copy,
  Check
} from 'lucide-react';
import { Profile } from '../../types';
import { db } from '../../services/db';
import { useFavorites } from '../../hooks/useFavorites';

interface ProfileHeroProps {
  profile: Profile;
  onOpenReport: () => void;
}

export const ProfileHero: React.FC<ProfileHeroProps> = ({ profile, onOpenReport }) => {
  const { isFavorite, isLiked, toggleFavorite, toggleLike } = useFavorites();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleWhatsapp = () => {
    db.logEvent({ profileId: profile.id, packageId: profile.packageType, eventType: 'whatsapp_click' });
    const settings = db.getSettings();
    const msg = encodeURIComponent(settings.defaultWhatsappMessage || 'Merhaba, randevu almak istiyorum.');
    window.open(`https://wa.me/${profile.whatsapp}?text=${msg}`, '_blank');
  };

  const handlePhone = () => {
    db.logEvent({ profileId: profile.id, packageId: profile.packageType, eventType: 'phone_click' });
    window.location.href = `tel:${profile.phone}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    db.logEvent({ profileId: profile.id, eventType: 'share' });
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl">
      {/* Cover Banner */}
      <div className="relative w-full h-44 sm:h-60 md:h-72 bg-dark-900 overflow-hidden">
        <img
          src={profile.coverPhoto}
          alt={profile.name}
          className="w-full h-full object-cover object-center brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="relative px-4 sm:px-8 pb-6 -mt-12 sm:-mt-16 z-20">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 sm:gap-6">
          
          {/* Avatar + Main Title */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-5">
            {/* Avatar with glow */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl p-1 bg-dark-950 border-2 border-white/20 shadow-2xl overflow-hidden flex-shrink-0 theme-accent-glow">
              <img
                src={profile.coverPhoto}
                alt={profile.name}
                className="w-full h-full object-cover rounded-xl"
              />
              {profile.isVerified && (
                <div 
                  className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full verified-badge flex items-center justify-center text-white shadow-lg"
                  title="Doğrulanmış Profil"
                >
                  <CheckCircle2 className="w-4 h-4 fill-white text-dark-950" />
                </div>
              )}
            </div>

            {/* Title & Metadata */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded shadow ${
                  profile.packageType === 'DIAMOND' ? 'bg-cyan-500 text-black shadow-cyan-500/50' :
                  profile.packageType === 'PREMIUM' ? 'bg-pink-500 text-white shadow-pink-500/50' :
                  profile.packageType === 'GOLD' ? 'bg-amber-400 text-black shadow-amber-400/50' :
                  'bg-slate-700 text-slate-200'
                }`}>
                  {profile.packageType} VIP
                </span>

                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-dark-900 border border-white/10 text-cyan-400">
                  {profile.categoryName}
                </span>

                {profile.isAvailable && (
                  <span className="flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    ŞU AN MÜSAİT
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white flex items-center gap-2">
                {profile.name}
                {profile.age && (
                  <span className="text-xs sm:text-sm font-semibold text-slate-400 bg-white/10 px-2 py-0.5 rounded-lg">
                    {profile.age} Yaş
                  </span>
                )}
              </h1>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{profile.city} / {profile.district}</span>
                {profile.neighborhood && <span className="text-slate-400">({profile.neighborhood})</span>}
              </div>
            </div>
          </div>

          {/* Action CTAs in Hero (WhatsApp, Ara, Beğen, Favori, Paylaş, Rapor) */}
          <div className="w-full md:w-auto flex flex-wrap items-center gap-2 pt-2 md:pt-0">
            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsapp}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>WhatsApp İle Ulaş</span>
            </button>

            {/* Phone Button */}
            <button
              onClick={handlePhone}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg hover:shadow-cyan-500/30 transition-all active:scale-95"
            >
              <Phone className="w-4 h-4 fill-white text-cyan-600" />
              <span>Hemen Ara</span>
            </button>

            {/* Like */}
            <button
              onClick={() => toggleLike(profile.id)}
              className={`p-2.5 rounded-xl border transition-all active:scale-95 ${
                isLiked(profile.id)
                  ? 'bg-rose-500/20 border-rose-500 text-rose-400 shadow-md'
                  : 'bg-dark-900 border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Beğen"
            >
              <Heart className={`w-4 h-4 ${isLiked(profile.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            {/* Favorite */}
            <button
              onClick={() => toggleFavorite(profile.id)}
              className={`p-2.5 rounded-xl border transition-all active:scale-95 ${
                isFavorite(profile.id)
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-md'
                  : 'bg-dark-900 border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Favorilere Ekle"
            >
              <Bookmark className={`w-4 h-4 ${isFavorite(profile.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="p-2.5 rounded-xl bg-dark-900 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all active:scale-95"
              title="Profili Paylaş"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Report */}
            <button
              onClick={onOpenReport}
              className="p-2.5 rounded-xl bg-dark-900 border border-white/10 text-slate-500 hover:text-red-400 hover:border-red-500/30 transition-all active:scale-95"
              title="Profili Bildir"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm glass-modal rounded-2xl p-5 space-y-4 border border-white/15">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Profili Paylaş</h3>
              <button onClick={() => setIsShareModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <button
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  window.open(`https://wa.me/?text=${url}`, '_blank');
                  setIsShareModalOpen(false);
                }}
                className="p-3 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 flex items-center gap-2 hover:bg-emerald-600/30"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </button>

              <button
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  window.open(`https://t.me/share/url?url=${url}`, '_blank');
                  setIsShareModalOpen(false);
                }}
                className="p-3 rounded-xl bg-sky-600/20 border border-sky-500/40 text-sky-400 flex items-center gap-2 hover:bg-sky-600/30"
              >
                Telegram
              </button>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
              <input
                type="text"
                readOnly
                value={window.location.href}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1"
              >
                {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{isCopied ? 'Kopyalandı' : 'Kopyala'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
