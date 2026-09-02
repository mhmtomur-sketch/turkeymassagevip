import React, { useState } from 'react';
import { Flame, Search, Plus, Trash2, Clock, CheckCircle2 } from 'lucide-react';
import { db } from '../../../services/db';
import { Profile } from '../../../types';

export const StoriesManagementView: React.FC = () => {
  const [search, setSearch] = useState('');
  const profiles = db.getProfiles();

  const activeStoriesProfiles = profiles.filter(p => p.stories && p.stories.length > 0);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl glass-card border border-white/10">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" /> Durumlar & 24 Saatlik Storyler
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ana sayfa üst bandında dönen anlık terapist ve salon hikâyeleri
          </p>
        </div>
      </div>

      {/* Stories Tray Preview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {profiles.slice(0, 12).map((p) => (
          <div
            key={p.id}
            className="p-3 rounded-2xl glass-card border border-white/10 text-center space-y-2 relative"
          >
            <div className="relative w-16 h-16 rounded-full mx-auto p-0.5 story-ring">
              <img src={p.coverPhoto} alt={p.name} className="w-full h-full object-cover rounded-full" />
              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-dark-950 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="text-xs font-bold text-white truncate">{p.name}</div>
              <div className="text-[10px] text-cyan-400">{p.city}</div>
            </div>

            <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              ● 24s Aktif
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};
