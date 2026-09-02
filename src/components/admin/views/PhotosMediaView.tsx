import React, { useState } from 'react';
import { Image as ImageIcon, Search, Trash2, Eye, Filter, Sparkles, ExternalLink } from 'lucide-react';
import { db } from '../../../services/db';
import { Profile } from '../../../types';

export const PhotosMediaView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const profiles = db.getProfiles();

  // Aggregate all photos across all profiles
  const allPhotos: { profile: Profile; photoUrl: string; isCover: boolean; index: number }[] = [];
  profiles.forEach(p => {
    if (p.coverPhoto) {
      allPhotos.push({ profile: p, photoUrl: p.coverPhoto, isCover: true, index: 0 });
    }
    p.photos?.forEach((photoUrl, idx) => {
      if (photoUrl !== p.coverPhoto) {
        allPhotos.push({ profile: p, photoUrl, isCover: false, index: idx + 1 });
      }
    });
  });

  const filteredPhotos = allPhotos.filter(item => 
    item.profile.name.toLowerCase().includes(search.toLowerCase()) ||
    item.profile.city.toLowerCase().includes(search.toLowerCase()) ||
    item.profile.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl glass-card border border-white/10">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-purple-400" /> Fotoğraflar & Galeri Yöneticisi
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Sistemdeki tüm terapist ve işletme kapak/galeri fotoğrafları (Toplam: {allPhotos.length} Fotoğraf)
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Profil veya Şehir Ara..."
            className="w-full bg-dark-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:theme-accent-border"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredPhotos.map((item, idx) => (
          <div
            key={idx}
            className="group relative aspect-3/4 rounded-2xl overflow-hidden bg-dark-900 border border-white/10 hover:border-cyan-400/50 transition-all shadow-md flex flex-col justify-end p-2.5"
          >
            <img
              src={item.photoUrl}
              alt="Media"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/20 to-transparent" />

            <div className="relative z-10 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-white truncate max-w-[100px]">
                  {item.profile.name}
                </span>
                {item.isCover && (
                  <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-cyan-500 text-black">
                    KAPAK
                  </span>
                )}
              </div>
              <div className="text-[9px] text-slate-400 truncate">
                {item.profile.city} / {item.profile.district}
              </div>
            </div>

            <button
              onClick={() => setSelectedPhoto(item.photoUrl)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-dark-900/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in"
        >
          <div className="relative max-w-2xl max-h-[85vh] rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <img src={selectedPhoto} alt="Enlarged" className="w-full h-full object-contain" />
          </div>
        </div>
      )}

    </div>
  );
};
