import React from 'react';
import { Users, Shield, Key, UserCheck, Lock, CheckCircle2 } from 'lucide-react';

export const MembersAdminsView: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-1">
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-cyan-400" /> Üyeler & Yönetici Hesapları
        </h2>
        <p className="text-xs text-slate-400">
          Yetkili yönetici hesapları, moderatör yetkileri ve sistem oturum protokolleri
        </p>
      </div>

      {/* Admin Accounts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main Admin */}
        <div className="p-6 rounded-3xl glass-card border border-cyan-500/40 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-black text-white">Süper Yönetici (Master Admin)</div>
                <div className="text-xs text-cyan-400 font-mono">masorlevent</div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-cyan-500 text-black">
              TAM YETKİ
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-300 pt-3 border-t border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Kullanıcı Adı:</span>
              <span className="font-bold text-white font-mono">masorlevent</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Şifre Koruması:</span>
              <span className="font-bold text-emerald-400">Aktif (Mehmet89.)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Son Giriş:</span>
              <span className="font-bold text-slate-200">Bugün (Canlı Oturum)</span>
            </div>
          </div>
        </div>

        {/* Security Protocols */}
        <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" /> Güvenlik & Oturum Politikaları
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Otomatik giriş engellenmiştir; şifreli giriş zorunludur.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Tüm veriler IndexedDB ve yerel şifrelenmiş depolamada saklanır.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Güvenli çıkış yapıldığında oturum anahtarı anında temizlenir.</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
};
