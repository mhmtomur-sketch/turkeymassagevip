import React, { useState } from 'react';
import { FileText, CheckCircle2, XCircle, Phone, MessageCircle, Crown, Clock } from 'lucide-react';
import { db } from '../../../services/db';
import { AdApplication } from '../../../types';

export const AdApplicationsView: React.FC = () => {
  const [apps, setApps] = useState<AdApplication[]>(() => db.getApplications());

  const handleUpdateStatus = (id: string, status: AdApplication['status']) => {
    db.updateApplicationStatus(id, status);
    setApps(db.getApplications());
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl glass-card border border-white/10">
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-400" /> İlan Başvuruları & Talepler ({apps.length})
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          "İLAN VER / BAŞVUR" formu ve vitrin sonu CTA'larından gelen başvurular
        </p>
      </div>

      {apps.length === 0 ? (
        <div className="p-12 text-center text-xs text-slate-500 rounded-3xl glass-card border border-white/10">
          Şu anda yeni gelen bir ilan başvurusu bulunmamaktadır.
        </div>
      ) : (
        <div className="space-y-3">
          {apps.map((app) => (
            <div
              key={app.id}
              className="p-5 rounded-2xl glass-card border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                    app.packageType === 'DIAMOND' ? 'bg-cyan-500 text-black' :
                    app.packageType === 'PREMIUM' ? 'bg-amber-400 text-black' :
                    app.packageType === 'GOLD' ? 'bg-slate-700 text-white' :
                    'bg-orange-600 text-white'
                  }`}>
                    {app.packageType} VIP ({app.price?.toLocaleString('tr-TR')} TL)
                  </span>
                  <span className="text-xs font-bold text-white">{app.name}</span>
                  {app.age && <span className="text-[11px] text-slate-400">({app.age} Yaş)</span>}
                  <span className="text-[11px] text-slate-400">
                    — {app.city} / {app.district} {app.neighborhood ? `(${app.neighborhood})` : ''}
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-dark-950 text-cyan-300 border border-white/10">
                    {app.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-300">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" /> {app.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" /> {app.whatsapp}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Tarih: {new Date(app.createdAt).toLocaleString('tr-TR')}
                  </span>
                </div>

                {app.notes && <p className="text-xs text-slate-400 italic">Not: {app.notes}</p>}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleUpdateStatus(app.id, 'Görüşüldü')}
                  className="px-3 py-1.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs font-bold hover:bg-blue-600 hover:text-white transition-all"
                >
                  Görüşüldü
                </button>
                <button
                  onClick={() => handleUpdateStatus(app.id, 'Onaylandı')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1 shadow-md"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Onayla
                </button>
                <button
                  onClick={() => handleUpdateStatus(app.id, 'Reddedildi')}
                  className="px-3 py-1.5 rounded-xl bg-red-600/20 border border-red-500/40 text-red-300 hover:bg-red-600 hover:text-white text-xs font-bold transition-all"
                >
                  Reddet
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
