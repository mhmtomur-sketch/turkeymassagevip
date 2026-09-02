import React, { useState } from 'react';
import { Crown, Check, Edit, Save } from 'lucide-react';
import { db } from '../../../services/db';
import { PackageConfig, PackageType } from '../../../types';

export const PackageManagementView: React.FC = () => {
  const [packages, setPackages] = useState<Record<PackageType, PackageConfig>>(() => db.getPackages());
  const [editingPkg, setEditingPkg] = useState<PackageConfig | null>(null);

  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPkg) return;
    db.updatePackage(editingPkg);
    setPackages(db.getPackages());
    setEditingPkg(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl glass-card border border-white/10">
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <Crown className="w-5 h-5 text-amber-400" /> Yayın Paketleri & Fiyatlandırma Yönetimi
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Diamond, Premium, Gold ve Silver vitrin paketlerinin aylık ücretleri, sıralama öncelikleri ve özellikleri
        </p>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {(Object.keys(packages) as PackageType[]).map((pkgKey) => {
          const pkg = packages[pkgKey];
          return (
            <div
              key={pkgKey}
              className="p-5 rounded-3xl glass-card border flex flex-col justify-between space-y-4"
              style={{ borderColor: pkg.borderColor }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider" style={{ color: pkg.color }}>
                    {pkg.name}
                  </span>
                  <Crown className="w-4 h-4" style={{ color: pkg.color }} />
                </div>

                <div className="text-2xl font-black text-white">
                  {pkg.priceMonthly.toLocaleString('tr-TR')} TL
                  <span className="text-xs font-normal text-slate-400 ml-1">/ ay</span>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-300">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setEditingPkg({ ...pkg })}
                className="w-full py-2 rounded-xl bg-dark-900 border border-white/10 hover:border-cyan-400 text-xs font-bold text-slate-200 transition-all flex items-center justify-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5 text-cyan-400" /> Paketi Düzenle
              </button>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editingPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <form onSubmit={handleSavePackage} className="w-full max-w-md glass-modal rounded-3xl p-6 border border-white/15 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Paket Düzenle: {editingPkg.name}</h3>
              <button type="button" onClick={() => setEditingPkg(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Aylık Fiyat (TL)</label>
              <input
                type="number"
                value={editingPkg.priceMonthly}
                onChange={(e) => setEditingPkg({ ...editingPkg, priceMonthly: Number(e.target.value) })}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-amber-400 font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Maksimum Fotoğraf Sayısı</label>
              <input
                type="number"
                value={editingPkg.maxPhotos}
                onChange={(e) => setEditingPkg({ ...editingPkg, maxPhotos: Number(e.target.value) })}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-dark-900 border border-white/5 text-xs font-bold text-white">
              <span>Video Yükleme Desteği</span>
              <input
                type="checkbox"
                checked={editingPkg.hasVideo}
                onChange={(e) => setEditingPkg({ ...editingPkg, hasVideo: e.target.checked })}
                className="w-4 h-4 accent-cyan-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-dark-900 border border-white/5 text-xs font-bold text-white">
              <span>Story / Durum Desteği</span>
              <input
                type="checkbox"
                checked={editingPkg.hasStory}
                onChange={(e) => setEditingPkg({ ...editingPkg, hasStory: e.target.checked })}
                className="w-4 h-4 accent-pink-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              Kaydet
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
