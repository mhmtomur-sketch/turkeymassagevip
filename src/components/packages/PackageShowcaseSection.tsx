import React from 'react';
import { Sparkles, Flame, Star, Award, Check, ArrowRight } from 'lucide-react';
import { db } from '../../services/db';

interface PackageShowcaseProps {
  onApply: (pkgType: string) => void;
}

export default function PackageShowcaseSection({ onApply }: PackageShowcaseProps) {
  const pkgs = db.getPackages();

  const pkgList = [
    { key: 'DIAMOND', icon: Sparkles, color: 'from-cyan-500 to-blue-600', border: 'border-cyan-500/50', btnBg: 'bg-gradient-to-r from-cyan-500 to-blue-600', popular: true },
    { key: 'PREMIUM', icon: Flame, color: 'from-amber-400 to-orange-500', border: 'border-amber-500/50', btnBg: 'bg-gradient-to-r from-amber-400 to-orange-500', popular: false },
    { key: 'GOLD', icon: Star, color: 'from-yellow-400 to-amber-600', border: 'border-yellow-500/40', btnBg: 'bg-gradient-to-r from-yellow-500 to-amber-600', popular: false },
    { key: 'SILVER', icon: Award, color: 'from-slate-300 to-slate-500', border: 'border-slate-700', btnBg: 'bg-gradient-to-r from-slate-600 to-slate-800', popular: false }
  ];

  return (
    <section className="py-8 px-3 sm:px-6 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 border-t border-slate-850">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TÜRKİYE & KKTC GENELİ VİTRİN YAYIN PAKETLERİ</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
            Vitrinde Yerinizi Alın, Doğrudan Randevu Kazanın
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Komisyonsuz, aracısız VIP yayın paketleri. Gerçek doluluk kapasiteleri ve adil rotasyon sistemiyle öne çıkın.
          </p>
        </div>

        {/* 4 Paket Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pkgList.map(({ key, icon: Icon, color, border, btnBg, popular }) => {
            const config = pkgs[key] || { name: key, price: 1000, features: [] };
            const occupancy = db.getOccupancy(key);

            return (
              <div
                key={key}
                className={`relative rounded-2xl bg-slate-900/90 border ${border} p-4 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1.5`}
              >
                {popular && (
                  <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-[10px] font-black tracking-wider shadow-lg">
                    EN ÇOK TERCİH EDİLEN
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-xl bg-gradient-to-tr ${color} text-slate-950 shadow`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black text-slate-400">{config.period || 'Aylık'}</span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-white">{config.name}</h3>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-black text-white">{config.price?.toLocaleString('tr-TR')} ₺</span>
                      <span className="text-xs text-slate-400">/ Ay</span>
                    </div>
                  </div>

                  {/* Gerçek Doluluk Oranı Barı */}
                  <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-slate-400">Vitrin Doluluk Oranı:</span>
                      <span className="text-cyan-400">%{occupancy.percentage} Dolu</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          occupancy.percentage > 80 ? 'bg-rose-500' : 'bg-gradient-to-r from-cyan-500 to-emerald-400'
                        }`}
                        style={{ width: `${Math.max(5, occupancy.percentage)}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-slate-500">
                      <span>{occupancy.active} Aktif Vitrin</span>
                      <span>Kapasite: {occupancy.capacity}</span>
                    </div>
                  </div>

                  {/* Özellikler */}
                  <ul className="space-y-1.5 text-xs text-slate-300 pt-1">
                    {(config.features || []).map((feat: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onApply(key)}
                  className={`mt-4 w-full py-2.5 px-4 rounded-xl ${btnBg} hover:opacity-95 text-slate-950 font-black text-xs shadow-lg flex items-center justify-center gap-1.5 transition-all`}
                >
                  <span>📲 İLAN VER / BAŞVUR</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
