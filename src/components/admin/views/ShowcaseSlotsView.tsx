import React from 'react';
import { Grid, Crown, Sparkles, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import { db } from '../../../services/db';
import { PackageType } from '../../../types';
import { PACKAGES } from '../../../data/packages';

export const ShowcaseSlotsView: React.FC = () => {
  const profiles = db.getProfiles();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-1">
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <Grid className="w-5 h-5 text-cyan-400" /> Vitrin Slotları & Kapasite Takibi
        </h2>
        <p className="text-xs text-slate-400">
          Her bir vitrin paketinin anlık slot doluluk oranları, aktif üye sayıları ve kalan kontenjanlar
        </p>
      </div>

      {/* Grid of Tiers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(['DIAMOND', 'PREMIUM', 'GOLD', 'SILVER'] as PackageType[]).map((pkgKey) => {
          const pkg = PACKAGES[pkgKey];
          const occupancy = db.getOccupancy(pkgKey);
          const tierProfiles = profiles.filter(p => p.packageType === pkgKey);
          const isFull = occupancy.percentage >= 100;

          return (
            <div
              key={pkgKey}
              className="p-6 rounded-3xl glass-card border border-white/10 space-y-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider" style={{ color: pkg.color }}>
                  {pkg.name}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  isFull ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {isFull ? 'DOLU' : 'MÜSAİT'}
                </span>
              </div>

              {/* Big Progress */}
              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-black text-white">%{occupancy.percentage}</div>
                  <div className="text-xs text-slate-400 font-semibold">
                    {occupancy.active} / {occupancy.capacity} Slot
                  </div>
                </div>
                <div className="h-2.5 w-full bg-dark-950 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${occupancy.percentage}%` }}
                  />
                </div>
              </div>

              {/* Members in Slot */}
              <div className="space-y-1.5 pt-2 border-t border-white/5 max-h-48 overflow-y-auto no-scrollbar">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Aktif Profiller:</div>
                {tierProfiles.slice(0, 6).map((p) => (
                  <div key={p.id} className="flex items-center justify-between text-xs py-1 text-slate-300">
                    <span className="truncate max-w-[130px] font-semibold">{p.name}</span>
                    <span className="text-[10px] text-slate-500">{p.city}</span>
                  </div>
                ))}
                {tierProfiles.length > 6 && (
                  <div className="text-[10px] text-cyan-400 italic text-right">+ {tierProfiles.length - 6} diğer profil</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
