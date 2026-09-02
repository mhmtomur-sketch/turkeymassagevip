import React from 'react';
import { Crown, Check, Sparkles, ArrowRight, ShieldCheck, Flame, MessageCircle } from 'lucide-react';
import { PACKAGES } from '../data/packages';
import { db, DISPLAY_WHATSAPP_NUMBER } from '../services/db';
import { PackageType } from '../types';

interface PackagesPageProps {
  onOpenAdModal: (pkg?: PackageType) => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({ onOpenAdModal }) => {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 animate-in fade-in duration-200">
      
      {/* Hero */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider">
          <Crown className="w-4 h-4 text-amber-400" />
          VIP REKLAM ALANLARI & YAYIN PAKETLERİ
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase leading-tight">
          Vitrinde En Ön Sırada Yer Alın, <br />
          <span className="theme-gradient-text">Elit Müşterilere Ulaşın</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Türkiye ve KKTC genelinde her gün on binlerce ziyaretçinin masaj ve spa aradığı platformumuzda profilinizi en çok tıklanan öncelikli vitrinlerde yayınlayın.
        </p>
        <div className="text-xs text-slate-400">
          Doğrudan WhatsApp İletişim: <span className="text-emerald-400 font-bold">{DISPLAY_WHATSAPP_NUMBER}</span>
        </div>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {(['DIAMOND', 'PREMIUM', 'GOLD', 'SILVER'] as PackageType[]).map((pkgKey) => {
          const pkg = PACKAGES[pkgKey];
          const isDiamond = pkgKey === 'DIAMOND';
          const occupancy = db.getOccupancy(pkgKey);

          return (
            <div
              key={pkgKey}
              className={`relative p-5 sm:p-7 rounded-3xl glass-card border flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1.5 ${
                isDiamond ? 'border-cyan-400 shadow-diamond-glow bg-dark-900/90' : 'border-white/10'
              }`}
            >
              {isDiamond && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-[10px] tracking-wider uppercase shadow-lg">
                  ZİRVE VİTRİN
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider" style={{ color: pkg.color }}>
                    {pkg.name}
                  </span>
                  <Crown className="w-5 h-5" style={{ color: pkg.color }} />
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-black text-white">
                    {pkg.priceMonthly.toLocaleString('tr-TR')} TL
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">/ 30 günlük yayın</div>

                  {/* Occupancy Progress Bar */}
                  <div className="space-y-1 mt-3 pt-3 border-t border-white/5">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-300">
                      <span>Vitrin Doluluk Oranı</span>
                      <span className="text-cyan-400 font-black">%{occupancy.percentage} Dolu</span>
                    </div>
                    <div className="h-2 w-full bg-dark-950 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                        style={{ width: `${occupancy.percentage}%` }}
                      />
                    </div>
                    <div className="text-[9px] text-slate-500 text-right">
                      {occupancy.active} / {occupancy.capacity} Aktif Slot
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-white/5">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onOpenAdModal(pkgKey)}
                className={`w-full py-3.5 rounded-2xl font-black text-xs transition-all shadow-xl flex items-center justify-center gap-2 ${
                  isDiamond
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-white'
                    : 'bg-dark-900 border border-white/15 hover:border-cyan-400 text-white'
                }`}
              >
                <span>📲 İLAN VER / BAŞVUR</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Trust & Guarantee */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="space-y-2">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Anında Onay & Canlı Yayın</h4>
          <p className="text-xs text-slate-400">Başvurunuz ardından ilanınız 15 dakika içinde vitrine alınır.</p>
        </div>

        <div className="space-y-2">
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center mx-auto">
            <Flame className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Yüksek Dönüşüm & Randevu</h4>
          <p className="text-xs text-slate-400">Doğrudan WhatsApp ve arama butonları ile aracısız müşteriler.</p>
        </div>

        <div className="space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <Crown className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">12s Adil Vitrin Rotasyonu</h4>
          <p className="text-xs text-slate-400">Tüm VIP üyeler adil ve eşit şekilde vitrin sırasını paylaşır.</p>
        </div>
      </div>

    </div>
  );
};
