import React, { useState } from 'react';
import { MessageSquare, Phone, Search, Users, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { db } from '../../../services/db';

export const VisitorMessageReportView: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'whatsapp' | 'phone'>('all');
  const events = db.getAnalyticsEvents();
  const profiles = db.getProfiles();

  const contactEvents = events
    .filter(e => e.eventType === 'whatsapp_click' || e.eventType === 'phone_click')
    .reverse();

  const filtered = contactEvents.filter(e => {
    if (filter === 'whatsapp') return e.eventType === 'whatsapp_click';
    if (filter === 'phone') return e.eventType === 'phone_click';
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl glass-card border border-white/10">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" /> Ziyaretçi, Mesaj & Arama Raporu
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ziyaretçilerin terapistlerle başlattığı gerçek WhatsApp ve telefon görüşmesi kayıtları
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'all' ? 'bg-cyan-500 text-black' : 'bg-dark-900 text-slate-400 border border-white/10'
            }`}
          >
            Tümü
          </button>
          <button
            onClick={() => setFilter('whatsapp')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'whatsapp' ? 'bg-emerald-500 text-black' : 'bg-dark-900 text-slate-400 border border-white/10'
            }`}
          >
            WhatsApp ({contactEvents.filter(e => e.eventType === 'whatsapp_click').length})
          </button>
          <button
            onClick={() => setFilter('phone')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'phone' ? 'bg-purple-500 text-white' : 'bg-dark-900 text-slate-400 border border-white/10'
            }`}
          >
            Telefon ({contactEvents.filter(e => e.eventType === 'phone_click').length})
          </button>
        </div>
      </div>

      {/* Events Table */}
      <div className="rounded-3xl glass-card border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-dark-950/80 border-b border-white/10 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">İşlem Türü</th>
                <th className="p-4">Hedef Profil</th>
                <th className="p-4">Zaman</th>
                <th className="p-4">Oturum ID</th>
                <th className="p-4 text-right">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filtered.map((e) => {
                const targetProfile = profiles.find(p => p.id === e.profileId);
                const isWhatsapp = e.eventType === 'whatsapp_click';

                return (
                  <tr key={e.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        isWhatsapp 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      }`}>
                        {isWhatsapp ? <MessageSquare className="w-3 h-3" /> : <Phone className="w-3 h-3" />}
                        {isWhatsapp ? 'WhatsApp Randevu Başlatıldı' : 'Telefon Araması Yapıldı'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-white">
                        {targetProfile?.name || 'Genel Vitrin İlanı'}
                      </span>
                      {targetProfile && (
                        <div className="text-[10px] text-slate-400">{targetProfile.city} / {targetProfile.district}</div>
                      )}
                    </td>
                    <td className="p-4 text-slate-400 font-mono text-[11px]">
                      {new Date(e.timestamp).toLocaleTimeString('tr-TR')} - {new Date(e.timestamp).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="p-4 text-slate-500 font-mono text-[10px]">
                      {e.sessionId.substring(0, 16)}...
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-[10px] font-bold text-emerald-400">● Başarılı</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
