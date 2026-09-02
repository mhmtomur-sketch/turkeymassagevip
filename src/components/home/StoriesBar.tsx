import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { db } from '../../services/db';

export default function StoriesBar() {
  const profiles = db.getProfiles().filter((p) => p.photos && p.photos.length > 0);
  const [activeStory, setActiveStory] = useState<any | null>(null);

  return (
    <>
      <div className="w-full overflow-x-auto scrollbar-none py-2 px-3 sm:px-6 bg-slate-950 border-b border-slate-850">
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-dashed border-cyan-500/50 flex items-center justify-center bg-slate-900 group-hover:border-cyan-400 transition-colors">
              <PlusCircle className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="text-[10px] text-slate-400 group-hover:text-white">Durum Paylaş</span>
          </div>

          {profiles.slice(0, 10).map((p) => (
            <div
              key={p.id}
              onClick={() => setActiveStory(p)}
              className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 bg-gradient-to-tr from-cyan-500 via-purple-500 to-amber-500 shadow-md group-hover:scale-105 transition-transform">
                <img
                  src={p.photos[0]}
                  alt={p.name}
                  className="w-full h-full object-cover rounded-full border-2 border-slate-950"
                />
              </div>
              <span className="text-[10px] text-slate-300 truncate max-w-[60px]">{p.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {activeStory && (
        <div
          onClick={() => setActiveStory(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative max-w-sm w-full aspect-[9/16] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            <img
              src={activeStory.photos[0]}
              alt={activeStory.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white drop-shadow">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">{activeStory.name}</span>
                <span className="text-xs text-cyan-400 font-semibold">{activeStory.city}</span>
              </div>
              <button onClick={() => setActiveStory(null)} className="text-xl font-black">✕</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
