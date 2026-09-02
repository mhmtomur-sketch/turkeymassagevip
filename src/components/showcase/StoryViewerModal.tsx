import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, MessageCircle, User } from 'lucide-react';
import { Profile } from '../../types';
import { db } from '../../services/db';

interface StoryViewerModalProps {
  profile: Profile | null;
  onClose: () => void;
}

export const StoryViewerModal: React.FC<StoryViewerModalProps> = ({ profile, onClose }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const stories = profile?.stories || [];

  useEffect(() => {
    if (!profile || stories.length === 0) return;
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex((s) => s + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [profile, currentStoryIndex, stories.length, onClose]);

  if (!profile || stories.length === 0) return null;

  const currentStory = stories[currentStoryIndex];

  const handleNext = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
      setProgress(0);
    }
  };

  const handleGoToProfile = () => {
    onClose();
    navigate(`/profil/${profile.slug}`);
  };

  const handleWhatsapp = () => {
    db.logEvent({ profileId: profile.id, packageId: profile.packageType, eventType: 'whatsapp_click' });
    const msg = encodeURIComponent(`Merhaba ${profile.name}, hikayenizdeki duyuruyu gördüm.`);
    window.open(`https://wa.me/${profile.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-dark-900/80 text-white hover:bg-white/20 transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Story Card Container */}
      <div className="relative w-full max-w-sm aspect-3/4 max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl glass-panel flex flex-col justify-between border border-white/20">
        
        {/* Progress Bars */}
        <div className="absolute top-3 inset-x-3 z-30 flex items-center gap-1.5">
          {stories.map((_, idx) => (
            <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-400 transition-all duration-100 ease-linear"
                style={{
                  width:
                    idx < currentStoryIndex
                      ? '100%'
                      : idx === currentStoryIndex
                      ? `${progress}%`
                      : '0%',
                }}
              />
            </div>
          ))}
        </div>

        {/* Story Header */}
        <div className="absolute top-6 inset-x-4 z-30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={profile.coverPhoto}
              alt={profile.name}
              className="w-9 h-9 rounded-full object-cover border border-cyan-400"
            />
            <div>
              <div className="text-xs font-bold text-white drop-shadow-md">{profile.name}</div>
              <div className="text-[10px] text-cyan-300 drop-shadow-sm">{profile.city} / {profile.district}</div>
            </div>
          </div>
        </div>

        {/* Background Image / Content */}
        <div className="absolute inset-0 z-10 bg-dark-950">
          <img
            src={currentStory.url || profile.coverPhoto}
            alt="Hikaye"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-black/40" />
        </div>

        {/* Tap zones for Prev / Next navigation */}
        <div className="absolute inset-y-16 inset-x-0 z-20 flex">
          <div className="w-1/2 h-full cursor-pointer" onClick={handlePrev} />
          <div className="w-1/2 h-full cursor-pointer" onClick={handleNext} />
        </div>

        {/* Bottom Story Content & Actions */}
        <div className="relative z-30 p-4 mt-auto space-y-3">
          {currentStory.text && (
            <div className="p-3 rounded-xl bg-dark-950/80 backdrop-blur-md border border-white/10 text-xs text-white leading-relaxed">
              {currentStory.text}
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={handleGoToProfile}
              className="flex-1 py-2.5 px-3 rounded-xl bg-dark-900/90 border border-white/20 text-xs font-bold text-white hover:border-cyan-400 transition-all flex items-center justify-center gap-1.5"
            >
              <User className="w-4 h-4 text-cyan-400" /> Profili Gör
            </button>

            <button
              onClick={handleWhatsapp}
              className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
