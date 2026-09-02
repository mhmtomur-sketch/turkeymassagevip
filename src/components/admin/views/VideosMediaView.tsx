import React, { useState } from 'react';
import { Video, Search, Play, Eye, Trash2, Film } from 'lucide-react';
import { db } from '../../../services/db';
import { Profile } from '../../../types';

export const VideosMediaView: React.FC = () => {
  const [search, setSearch] = useState('');
  const profiles = db.getProfiles();

  // Aggregate all videos across all profiles
  const allVideos: { profile: Profile; videoUrl: string; index: number }[] = [];
  profiles.forEach(p => {
    p.videos?.forEach((vUrl, idx) => {
      allVideos.push({ profile: p, videoUrl: vUrl, index: idx });
    });
  });

  const filteredVideos = allVideos.filter(item =>
    item.profile.name.toLowerCase().includes(search.toLowerCase()) ||
    item.profile.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl glass-card border border-white/10">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-pink-400" /> Tanıtım Videoları Yöneticisi
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Sistemde kayıtlı tüm profil tanıtım videoları (Toplam: {allVideos.length} Video)
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

      {/* Videos Grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredVideos.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden glass-card border border-white/10 p-3 space-y-3"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10">
                <video
                  src={item.videoUrl}
                  controls
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{item.profile.name}</div>
                  <div className="text-[10px] text-slate-400">{item.profile.city} / {item.profile.district}</div>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/40">
                  {item.profile.packageType} VIP
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl glass-card border border-white/10 space-y-3">
          <Film className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">Henüz Yüklenmiş Video Bulunmuyor</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            "Profiller & Vitrin" veya "Yeni Profil Ekle" menüsünden terapistlere MP4/MOV formatında video yükleyebilirsiniz.
          </p>
        </div>
      )}

    </div>
  );
};
