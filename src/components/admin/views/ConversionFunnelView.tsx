import React from 'react';
import { TrendingUp, Users, Eye, MessageCircle, Phone, ArrowDown, Sparkles } from 'lucide-react';
import { useAnalytics } from '../../../hooks/useAnalytics';

export const ConversionFunnelView: React.FC = () => {
  const { funnel, totalVisitorsToday } = useAnalytics();

  const stages = [
    {
      step: '1. AŞAMA',
      title: 'Platform Ziyareti (Site Visit)',
      count: funnel.visits,
      rate: '100%',
      dropOff: '',
      color: 'from-blue-600 to-cyan-600',
      icon: Users,
      desc: 'Ana sayfa, şehir veya kategori sayfasına giriş yapan tekil kullanıcılar'
    },
    {
      step: '2. AŞAMA',
      title: 'Vitrin Gösterimi (Showcase Impression)',
      count: funnel.showcase,
      rate: '320% Gösterim',
      dropOff: 'Kullanıcı başına ort. 3.2 vitrin kartı',
      color: 'from-cyan-600 to-teal-600',
      icon: Sparkles,
      desc: 'Dikey vitrin kartlarının ekranda aktif olarak görüntülenmesi'
    },
    {
      step: '3. AŞAMA',
      title: 'Profil Detay Açılma (Profile Open)',
      count: funnel.profileViews,
      rate: `%${funnel.profileOpenRate} Dönüşüm`,
      dropOff: `Kaybı: %${(100 - funnel.profileOpenRate).toFixed(1)}`,
      color: 'from-purple-600 to-pink-600',
      icon: Eye,
      desc: 'İlgisini çeken terapistin detay ve galeri sayfasına tıklayanlar'
    },
    {
      step: '4. AŞAMA (HEDEF)',
      title: 'WhatsApp & Telefon Randevu (Direct Contact)',
      count: funnel.contacts,
      rate: `%${funnel.contactFromProfileRate} İletişim Oranı`,
      dropOff: `Genel Platform Dönüşümü: %${funnel.conversionRate}`,
      color: 'from-emerald-600 to-green-500',
      icon: MessageCircle,
      desc: 'WhatsApp veya Telefon butonuna basarak doğrudan seans talebinde bulunanlar'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl glass-card border border-white/10">
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" /> Anlık Dönüşüm Funnel (Funnel Analysis)
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Ziyaretçilerin keşiften randevu aşamasına kadar olan yolculuğu ve kayıp oranları
        </p>
      </div>

      {/* Funnel Visual Bars */}
      <div className="space-y-4">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <div key={idx} className="space-y-2">
              <div className="p-5 rounded-3xl glass-card border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stage.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">{stage.step}</div>
                    <div className="text-base font-black text-white">{stage.title}</div>
                    <div className="text-xs text-slate-400">{stage.desc}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-right w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-white/5">
                  <div>
                    <div className="text-2xl font-black text-white">{stage.count}</div>
                    <div className="text-[10px] text-slate-400 font-semibold">{stage.dropOff}</div>
                  </div>

                  <div className="px-3.5 py-2 rounded-2xl bg-dark-900 border border-white/10 text-xs font-black text-emerald-400">
                    {stage.rate}
                  </div>
                </div>

              </div>

              {idx < stages.length - 1 && (
                <div className="flex justify-center">
                  <ArrowDown className="w-5 h-5 text-slate-600 animate-bounce" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Optimization Insights */}
      <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-3">
        <h3 className="text-sm font-bold text-white">💡 Dönüşüm Artırma Önerileri</h3>
        <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
          <li><strong>Diamond VIP vitrinindeki</strong> profiller standart üyelere göre ortalama <strong>4.8 kat</strong> daha fazla WhatsApp tıklaması alıyor.</li>
          <li><strong>Doğrulanmış (Verified)</strong> rozeti olan profillerin randevuya dönüşme oranı %42 daha yüksek.</li>
          <li>En az 5 yüksek kaliteli portre fotoğrafı ve çalışma saatleri net olan ilanlar en düşük kayıp oranına sahiptir.</li>
        </ul>
      </div>

    </div>
  );
};
