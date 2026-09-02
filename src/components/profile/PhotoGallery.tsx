import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { db } from '../../services/db';

interface PhotoGalleryProps {
  photos: string[];
  profileName: string;
  profileId: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, profileName, profileId }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    db.logEvent({ profileId, eventType: 'gallery_open' });
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % photos.length);
      db.logEvent({ profileId, eventType: 'photo_view' });
    }
  };

  const prevPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
      db.logEvent({ profileId, eventType: 'photo_view' });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  if (!photos || photos.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-white">Fotoğraf Galerisi ({photos.length})</h3>
        </div>
        <span className="text-xs text-slate-400">Büyütmek için fotoğrafa tıklayın</span>
      </div>

      {/* Grid of photos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {photos.map((photoUrl, idx) => (
          <div
            key={idx}
            onClick={() => openLightbox(idx)}
            className="group relative aspect-3/4 rounded-2xl overflow-hidden bg-dark-900 border border-white/10 cursor-pointer hover:border-cyan-400/60 transition-all"
          >
            <img
              src={photoUrl}
              alt={`${profileName} - Fotoğraf ${idx + 1}`}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-dark-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="p-2.5 rounded-full bg-dark-900/80 text-white shadow-xl">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-3 rounded-full bg-dark-900/90 text-white hover:bg-white/20 transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 z-50 px-3.5 py-1.5 rounded-full bg-dark-900/90 text-xs font-bold text-cyan-300 border border-white/10">
            {lightboxIndex + 1} / {photos.length}
          </div>

          {/* Prev Button */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-dark-900/90 text-white hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-dark-900/90 text-white hover:bg-white/20 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Image View */}
          <div className="max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl flex items-center justify-center">
            <img
              src={photos[lightboxIndex]}
              alt={`${profileName} - Fullscreen`}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
