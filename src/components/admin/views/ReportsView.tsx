import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { db } from '../../../services/db';
import { UserReport } from '../../../types';

export const ReportsView: React.FC = () => {
  const [reports, setReports] = useState<UserReport[]>(() => db.getReports());

  const handleUpdateStatus = (id: string, status: 'pending' | 'reviewed' | 'resolved') => {
    db.updateReportStatus(id, status);
    setReports(db.getReports());
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl glass-card border border-white/10">
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-400" /> Şikayetler & Moderasyon Raporları ({reports.length})
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Kullanıcılar tarafından iletilen profil bildirimleri ve içerik ihlalleri
        </p>
      </div>

      {reports.length === 0 ? (
        <div className="p-12 text-center text-xs text-slate-500 rounded-3xl glass-card border border-white/10">
          Şu anda bekleyen veya çözülmemiş herhangi bir şikayet bulunmamaktadır.
        </div>
      ) : (
        <div className="space-y-3">
          {reports.map((rep) => (
            <div
              key={rep.id}
              className="p-5 rounded-2xl glass-card border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-black uppercase">
                    {rep.reason}
                  </span>
                  <span className="text-xs font-bold text-white">Profil: {rep.profileName}</span>
                </div>
                <p className="text-xs text-slate-300">{rep.description}</p>
                {rep.contactEmail && (
                  <div className="text-[10px] text-slate-500">Bildiren: {rep.contactEmail}</div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateStatus(rep.id, 'resolved')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600 hover:text-white text-xs font-bold transition-all"
                >
                  Çözüldü Olarak İşaretle
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
