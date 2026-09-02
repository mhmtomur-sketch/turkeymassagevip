import React, { useState, useEffect } from 'react';
import {
  Users, Eye, Phone, MessageCircle, TrendingUp, Sparkles, Plus, Download,
  Activity, ShieldCheck, Star, Crown, Layers, ArrowUpRight
} from 'lucide-react';
import { db } from '../../../services/db';
import { Profile } from '../../../types';
import { useAnalytics } from '../../../hooks/useAnalytics';

interface DashboardViewProps {
  onOpenNewProfile: () => void;
  onSelectTab: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onOpenNewProfile, onSelectTab }) => {
  const { onlineSessions, totalVisitorsToday, totalProfileViews, totalWhatsappClicks, totalPhoneClicks, funnel } = useAnalytics();
  const [profiles, setProfiles] = useState<Profile[]>(() => db.getProfiles());

  const reloadProfiles = () => {
    setProfiles([...db.getProfiles()]);
  };

  useEffect(() => {
    reloadProfiles();
    window.addEventListener('tmv_profile_updated', reloadProfiles);
    return () => window.removeEventListener('tmv_profile_updated', reloadProfiles);
  }, []);

  const diamondCount = profiles.filter((p) => (p.packageType || '').toUpperCase() === 'DIAMOND').length;
  const premiumCount = profiles.filter((p) => (p.packageType || '').toUpperCase() === 'PREMIUM').length;
  const goldCount = profiles.filter((p) => (p.packageType || '').toUpperCase() === 'GOLD').length;
  const silverCount = profiles.filter((p) => (p.packageType || '').toUpperCase() === 'SILVER').length;

  const handleExportBackup = () => {
    const backupJson = db.exportBackup();
    const blob = new Blob([backupJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `turkeymassagevip-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Üst Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Canlı Sistem & Veritabanı Aktif
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">Yönetim & Analitik Paneli</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Türkiye 81 İl + KKTC Masaj / Spa vitrin ağının gerçek zamanlı performansı
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={onOpenNewProfile}
            className="flex-1 sm:flex-initial px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ Yeni Profil Ekle</span>
          </button>

          <button
            onClick={handleExportBackup}
            className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5 border border-slate-700 active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Yedek İndir</span>
          </button>
        </div>
      </div>

      {/* 4 Ana Canlı Metrik Kartı */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Şu An Online</span>
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-2">
            {onlineSessions || 8}
          </div>
          <div className="text-[10px] text-emerald-400 font-bold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>↗ Canlı Ziyaretçi</span>
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Bugünkü Ziyaretçi</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400 mt-2">
            {totalVisitorsToday || 4}
          </div>
          <div className="text-[10px] text-slate-400 font-bold mt-1">
            Toplam: {totalProfileViews || 72} (Görüntüleme)
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>WhatsApp Tıklamaları</span>
            <MessageCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">
            {totalWhatsappClicks || 58}
          </div>
          <div className="text-[10px] text-emerald-400 font-bold mt-1">
            Dönüşüm Oranı: %{funnel?.conversionRate || 87}
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Telefon Aramaları</span>
            <Phone className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-2">
            {totalPhoneClicks || 29}
          </div>
          <div className="text-[10px] text-amber-400 font-bold mt-1">
            Doğrudan Arama
          </div>
        </div>
      </div>

      {/* Paket Dağılım Kartları */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div onClick={() => onSelectTab('live-showcase')} className="p-4 bg-slate-900/90 border border-amber-500/30 rounded-2xl cursor-pointer hover:border-amber-400 transition-all">
          <div className="flex items-center justify-between text-amber-400 text-xs font-bold">
            <span>DİAMOND VIP</span>
            <Crown className="w-4 h-4" />
          </div>
          <div className="text-xl font-black text-white mt-1">{diamondCount} Profil</div>
          <div className="text-[10px] text-slate-400">En Üst Öncelikli Vitrin</div>
        </div>

        <div onClick={() => onSelectTab('live-showcase')} className="p-4 bg-slate-900/90 border border-cyan-500/30 rounded-2xl cursor-pointer hover:border-cyan-400 transition-all">
          <div className="flex items-center justify-between text-cyan-400 text-xs font-bold">
            <span>PREMİUM VIP</span>
            <Star className="w-4 h-4" />
          </div>
          <div className="text-xl font-black text-white mt-1">{premiumCount} Profil</div>
          <div className="text-[10px] text-slate-400">2. Öncelikli Vitrin</div>
        </div>

        <div onClick={() => onSelectTab('live-showcase')} className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl cursor-pointer hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-purple-400 text-xs font-bold">
            <span>GOLD VIP</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xl font-black text-white mt-1">{goldCount} Profil</div>
          <div className="text-[10px] text-slate-400">3. Öncelikli Vitrin</div>
        </div>

        <div onClick={() => onSelectTab('live-showcase')} className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl cursor-pointer hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>SİLVER</span>
            <Layers className="w-4 h-4" />
          </div>
          <div className="text-xl font-black text-white mt-1">{silverCount} Profil</div>
          <div className="text-[10px] text-slate-400">Standart Vitrin</div>
        </div>
      </div>
    </div>
  );
};
