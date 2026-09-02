import React, { useEffect } from 'react';
import { X, ChevronLeft, MessageCircle, Phone, ArrowLeft } from 'lucide-react';
import { Profile } from '../../types';
import { ProfileHero } from './ProfileHero';
import { PhotoGallery } from './PhotoGallery';
import { VideoGallery } from './VideoGallery';
import { ProfileDetails } from './ProfileDetails';
import { SpaStaffSection } from './SpaStaffSection';
import { ReviewSection } from './ReviewSection';
import { db } from '../../services/db';

interface ProfileDetailModalProps {
  profile: Profile | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenReport?: (profileId: string, profileName: string) => void;
}

export const ProfileDetailModal: React.FC<ProfileDetailModalProps> = ({
  profile,
  isOpen,
  onClose,
  onOpenReport,
}) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (profile) {
        db.logEvent({ profileId: profile.id, packageId: profile.packageType, eventType: 'profile_view' });
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, profile]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !profile) return null;

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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-lg animate-in fade-in duration-200">
      
      {/* Top Floating Control Bar */}
      <div className="sticky top-0 z-50 w-full glass-nav border-b border-white/10 px-4 sm:px-8 py-3 flex items-center justify-between shadow-2xl bg-dark-950/80 backdrop-blur-md">
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Vitrinlere Geri Dön</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-white truncate max-w-[250px]">
              {profile.name}
            </div>
            <div className="text-[10px] text-cyan-400 font-semibold">
              📍 {profile.city} / {profile.district}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-dark-900/90 text-slate-400 hover:text-white border border-white/10 hover:border-white/20 transition-all active:scale-95"
            title="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Profile Container */}
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-8 pb-24 md:pb-12">
        
        {/* 1. Hero Section */}
        <ProfileHero
          profile={profile}
          onOpenReport={() => onOpenReport?.(profile.id, profile.name)}
        />

        {/* 2. Photo Gallery */}
        <PhotoGallery
          photos={profile.photos}
          profileName={profile.name}
          profileId={profile.id}
        />

        {/* 3. Video Gallery */}
        {profile.videos && profile.videos.length > 0 && (
          <VideoGallery
            videos={profile.videos}
            profileName={profile.name}
            profileId={profile.id}
          />
        )}

        {/* 4. Details, Specifications, Schedule & Pricing */}
        <ProfileDetails profile={profile} />

        {/* 5. Spa Staff Members */}
        {profile.type === 'business' && profile.staff && profile.staff.length > 0 && (
          <SpaStaffSection
            staff={profile.staff}
            businessName={profile.name}
          />
        )}

        {/* 6. Reviews */}
        <ReviewSection
          profileId={profile.id}
          initialRating={profile.rating}
          initialReviewCount={profile.reviewCount}
        />

      </div>

      {/* Sticky Mobile Bottom Action Bar (ONLY ON MOBILE SCREENS < 768px) */}
      <div className="fixed bottom-0 inset-x-0 z-50 p-3 glass-nav flex items-center gap-2 border-t border-white/10 shadow-2xl md:hidden bg-dark-950/90 backdrop-blur-lg">
        <button
          onClick={handleWhatsapp}
          className="flex-1 py-3 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
          <span>WhatsApp Randevu</span>
        </button>

        <button
          onClick={handlePhone}
          className="flex-1 py-3 rounded-xl bg-cyan-600 active:bg-cyan-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/30 transition-all"
        >
          <Phone className="w-4 h-4 fill-white text-cyan-600" />
          <span>Hemen Ara</span>
        </button>
      </div>

    </div>
  );
};
