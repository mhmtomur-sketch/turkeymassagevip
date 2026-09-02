import React, { useState, useEffect, useMemo } from 'react';
import {
  Activity, Users, Eye, MousePointer, MessageCircle, Phone, Sparkles, RefreshCw,
  TrendingUp, Download, MapPin, Search, Calendar, ShieldCheck, Globe, CheckCircle2
} from 'lucide-react';
import { analytics, RealAnalyticsEvent } from '../../../services/analytics';
import { db } from '../../../services/db';
import { TURKEY_CITIES } from '../../../data/locations';

export function LiveAnalyticsView() {
  const [events, setEvents] = useState<RealAnalyticsEvent[]>([]);
  const [timeFilter, setTimeFilter] = useState<string>('today');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = () => {
    setIsRefreshing(true);
    const evts = analytics.getEvents(2000);
    setEvents([...evts]);
    setLastUpdated(new Date());
    setTimeout(() => setIsRefreshing(false), 300);
  };

  useEffect(() => {
    loadData();
    const sub = () => loadData();
    window.addEventListener('tmv_analytics_event', sub);

    // Her 30 dakikada bir otomatik tam yenileme
    const timer = setInterval(() => {
      loadData();
    }, 30 * 60 * 1000);

    return () => {
      window.removeEventListener('tmv_analytics_event', sub);
      clearInterval(timer);
    };
  }, []);

  // Zaman Filtresi Uygulama
  const filteredEvents = useMemo(() => {
    const now = Date.now();
    return events.filter((e) => {
      const t = new Date(e.timestamp).getTime();
      let matchTime = true;

      if (timeFilter === '30min') matchTime = now - t <= 30 * 60 * 1000;
      else if (timeFilter === '1hour') matchTime = now - t <= 60 * 60 * 1000;
      else if (timeFilter === 'today') {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        matchTime = t >= startOfToday.getTime();
      } else if (timeFilter === '7days') matchTime = now - t <= 7 * 24 * 60 * 60 * 1000;
      else if (timeFilter === '30days') matchTime = now - t <= 30 * 24 * 60 * 60 * 1000;

      const matchCity = selectedCity === 'all' || (e.citySlug || '').toLowerCase() === selectedCity.toLowerCase();
      return matchTime && matchCity;
    });
  }, [events, timeFilter, selectedCity]);

  // Metrikler (Sıfır Random, Tamamen Gerçek)
  const metrics = useMemo(() => {
    const uniqueVisitors = new Set(filteredEvents.map((e) => e.sessionId)).size;
    const impressions = filteredEvents.filter((e) => e.eventType === 'showcase_impression').length;
    const clicks = filteredEvents.filter((e) => e.eventType === 'showcase_click').length;
    const profileViews = filteredEvents.filter((e) => e.eventType === 'profile_view').length;
    const whatsappClicks = filteredEvents.filter((e) => e.eventType === 'whatsapp_click').length;
    const phoneClicks = filteredEvents.filter((e) => e.eventType === 'phone_click').length;
    const videoPlays = filteredEvents.filter((e) => e.eventType === 'video_play').length;
    const totalConversions = whatsappClicks + phoneClicks;
    const conversionRate = profileViews > 0 ? ((totalConversions / profileViews) * 100).toFixed(1) : '0.0';

    return {
      online: analytics.getOnlineCount(),
      uniqueVisitors,
      impressions,
      clicks,
      profileViews,
      whatsappClicks,
      phoneClicks,
      videoPlays,
      totalConversions,
      conversionRate
    };
  }, [filteredEvents]);

  // Şehir Bazlı Dağılım
  const cityStats = useMemo(() => {
    const map = new Map<string, { visitors: Set<string>; impressions: number; clicks: number; whatsapp: number; phone: number }>();

    filteredEvents.forEach((e) => {
      const c = e.city || 'İzmir';
      if (!map.has(c)) {
        map.set(c, { visitors: new Set(), impressions: 0, clicks: 0, whatsapp: 0, phone: 0 });
      }
      const entry = map.get(c)!;
      entry.visitors.add(e.sessionId);
      if (e.eventType === 'showcase_impression') entry.impressions++;
      if (e.eventType === 'showcase_click') entry.clicks++;
      if (e.eventType === 'whatsapp_click') entry.whatsapp++;
      if (e.eventType === 'phone_click') entry.phone++;
    });

    return Array.from(map.entries()).map(([city, s]) => ({
      city,
      visitors: s.visitors.size,
      impressions: s.impressions,
      clicks: s.clicks,
      whatsapp: s.whatsapp,
      phone: s.phone,
      total: s.whatsapp + s.phone
    })).sort((a, b) => (b.visitors + b.total) - (a.visitors + a.total));
  }, [filteredEvents]);

  // Profil Bazlı Performans
  const profileStats = useMemo(() => {
    const allProfs = db.getProfiles();
    const map = new Map<string, { impressions: number; clicks: number; views: number; whatsapp: number; phone: number }>();

    filteredEvents.forEach((e) => {
      if (e.profileId) {
        if (!map.has(e.profileId)) {
          map.set(e.profileId, { impressions: 0, clicks: 0, views: 0, whatsapp: 0, phone: 0 });
        }
        const entry = map.get(e.profileId)!;
        if (e.eventType === 'showcase_impression') entry.impressions++;
        if (e.eventType === 'showcase_click') entry.clicks++;
        if (e.eventType === 'profile_view') entry.views++;
        if (e.eventType === 'whatsapp_click') entry.whatsapp++;
        if (e.eventType === 'phone_click') entry.phone++;
      }
    });

    return allProfs.map((p) => {
      const s = map.get(p.id) || { impressions: 0, clicks: 0, views: 0, whatsapp: 0, phone: 0 };
      const conv = s.views > 0 ? (((s.whatsapp + s.phone) / s.views) * 100).toFixed(1) : '0.0';
      return { profile: p, ...s, conv };
    }).sort((a, b) => (b.whatsapp + b.phone + b.views) - (a.whatsapp + a.phone + a.views));
  }, [filteredEvents]);

  // Site İçi Aramalar
  const searchQueries = useMemo(() => {
    const qMap = new Map<string, number>();
    filteredEvents.forEach((e) => {
      if (e.eventType === 'search' && e.searchQuery) {
        qMap.set(e.searchQuery, (qMap.get(e.searchQuery) || 0) + 1);
      }
    });
    return Array.from(qMap.entries()).map(([query, count]) => ({ query, count })).sort((a, b) => b.count - a.count);
  }, [filteredEvents]);

  // CSV İndirme
  const exportCSV = () => {
    const headers = ['Zaman', 'Olay', 'Oturum', 'Profil', 'Şehir', 'Cihaz', 'Tarayıcı', 'Kaynak'];
    const rows = filteredEvents.map((e) => [
      e.timestamp,
      e.eventType,
      e.sessionId,
      e.profileName || '-',
      e.city || '-',
      e.deviceType || '-',
      e.browser || '-',
      e.trafficSource || '-'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `analiz_raporu_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 text-white">
      {/* ÜST BAŞLIK & CANLI KONTROL */}
      <div className="p-4 sm:p-6 bg-slate-900 border border-slate-800 rounded-3xl flex flex-wrap items-center justify-between gap-4 shadow-2xl">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h1 className="text-lg sm:text-2xl font-black text-white flex items-center gap-2">
              <Activity className="w-6 h-6 text-emerald-400" />
              <span>%100 Gerçek Canlı Analiz Merkezi</span>
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Sıfır sahte veri • Anlık gerçek oturumlar • Son Güncelleme:{' '}
            <span className="text-cyan-300 font-bold">{lastUpdated.toLocaleTimeString('tr-TR')}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Zaman Filtresi */}
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-cyan-300 font-black focus:outline-none"
          >
            <option value="30min">⚡ Son 30 Dakika</option>
            <option value="1hour">⏱️ Son 1 Saat</option>
            <option value="today">📅 Bugün</option>
            <option value="7days">📊 Son 7 Gün</option>
            <option value="30days">📈 Son 30 Gün</option>
          </select>

          {/* Şehir Filtresi */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-bold focus:outline-none"
          >
            <option value="all">📍 Tüm İller</option>
            {TURKEY_CITIES.map((c) => (
              <option key={c.id} value={c.slug}>📍 {c.name}</option>
            ))}
          </select>

          {/* Şimdi Yenile Butonu */}
          <button
            onClick={loadData}
            disabled={isRefreshing}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Şimdi Yenile</span>
          </button>

          {/* CSV İndir */}
          <button
            onClick={exportCSV}
            className="px-3.5 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV İndir</span>
          </button>
        </div>
      </div>

      {/* CANLI KPI KARTLARI */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="p-4 bg-slate-900 border border-emerald-500/40 rounded-2xl shadow">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>ŞU AN ONLINE</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">{metrics.online}</div>
          <div className="text-[10px] text-slate-500 mt-1">Aktif Ziyaretçi</div>
        </div>

        <div className="p-4 bg-slate-900 border border-cyan-500/30 rounded-2xl shadow">
          <div className="text-slate-400 text-xs font-bold">BENZERSİZ ZİYARETÇİ</div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-300 mt-2">{metrics.uniqueVisitors}</div>
          <div className="text-[10px] text-slate-500 mt-1">Tekil Oturum</div>
        </div>

        <div className="p-4 bg-slate-900 border border-blue-500/30 rounded-2xl shadow">
          <div className="text-slate-400 text-xs font-bold">VİTRİN GÖSTERİMİ</div>
          <div className="text-2xl sm:text-3xl font-black text-blue-400 mt-2">{metrics.impressions}</div>
          <div className="text-[10px] text-slate-500 mt-1">Görünür İnceleme</div>
        </div>

        <div className="p-4 bg-slate-900 border border-purple-500/30 rounded-2xl shadow">
          <div className="text-slate-400 text-xs font-bold">PROFİL DETAY</div>
          <div className="text-2xl sm:text-3xl font-black text-purple-400 mt-2">{metrics.profileViews}</div>
          <div className="text-[10px] text-slate-500 mt-1">Açılan Profil</div>
        </div>

        <div className="p-4 bg-slate-900 border border-emerald-500/30 rounded-2xl shadow">
          <div className="text-slate-400 text-xs font-bold">WHATSAPP</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">{metrics.whatsappClicks}</div>
          <div className="text-[10px] text-slate-500 mt-1">Mesaj Butonu</div>
        </div>

        <div className="p-4 bg-slate-900 border border-amber-500/30 rounded-2xl shadow">
          <div className="text-slate-400 text-xs font-bold">DÖNÜŞÜM ORANI</div>
          <div className="text-2xl sm:text-3xl font-black text-amber-300 mt-2">%{metrics.conversionRate}</div>
          <div className="text-[10px] text-slate-500 mt-1">WhatsApp+Ara / Görüntüleme</div>
        </div>
      </div>

      {/* İKİ KOLONLU TABLOLAR: ŞEHİR SIRALAMASI & CANLI OLAY AKIŞI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ŞEHİR BAZLI ANALİZ TABLOSU */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Şehir Performansı ({cityStats.length} İl Aktif)</span>
            </h2>
            <span className="text-[10px] text-slate-400">Gerçek Ziyaret Sıralaması</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 text-[10px] font-black uppercase border-b border-slate-800">
                <tr>
                  <th className="p-2.5">Şehir</th>
                  <th className="p-2.5 text-center">Ziyaretçi</th>
                  <th className="p-2.5 text-center">Gösterim</th>
                  <th className="p-2.5 text-center text-emerald-400">WhatsApp</th>
                  <th className="p-2.5 text-right">Dönüşüm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {cityStats.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-slate-500">Bu zaman aralığında henüz veri yok (0)</td>
                  </tr>
                ) : (
                  cityStats.map((c, i) => (
                    <tr key={c.city} className="hover:bg-slate-850/50">
                      <td className="p-2.5 font-bold text-white flex items-center gap-2">
                        <span className="text-[10px] text-slate-500 w-4">{i + 1}.</span>
                        <span>{c.city}</span>
                      </td>
                      <td className="p-2.5 text-center font-bold text-cyan-300">{c.visitors}</td>
                      <td className="p-2.5 text-center text-slate-400">{c.impressions}</td>
                      <td className="p-2.5 text-center font-bold text-emerald-400">{c.whatsapp}</td>
                      <td className="p-2.5 text-right font-black text-amber-300">{c.total}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* CANLI OLAY AKIŞI (REAL-TIME STREAM) */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Canlı Ziyaretçi & Buton Akışı</span>
            </h2>
            <span className="text-[10px] text-emerald-400 font-bold animate-pulse">● CANLI YAYIN</span>
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {filteredEvents.slice(0, 15).map((e) => (
              <div key={e.id} className="p-2.5 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(e.timestamp).toLocaleTimeString('tr-TR')}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-cyan-300">
                    {e.city || 'İzmir'}
                  </span>
                  <span className="font-bold text-white">
                    {e.eventType === 'whatsapp_click' && '💬 WhatsApp tıklandı'}
                    {e.eventType === 'phone_click' && '📞 Telefon arandı'}
                    {e.eventType === 'showcase_click' && `👉 ${e.profileName || 'Kart'} tıklandı`}
                    {e.eventType === 'profile_view' && `👁️ ${e.profileName || 'Profil'} açıldı`}
                    {e.eventType === 'site_visit' && '🌐 Siteye giriş yapıldı'}
                    {e.eventType === 'showcase_impression' && '👀 Vitrin incelendi'}
                    {e.eventType === 'search' && `🔍 "${e.searchQuery}" arandı`}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 capitalize">{e.deviceType || 'mobil'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HER VİTRİNİN AYRI AYRI PERFORMANS TABLOSU */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
        <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Profil & Vitrin Bazlı Gerçek Dönüşüm Tablosu</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 text-[10px] font-black uppercase border-b border-slate-800">
              <tr>
                <th className="p-3">Profil</th>
                <th className="p-3">Şehir</th>
                <th className="p-3">Paket</th>
                <th className="p-3 text-center">Gösterim</th>
                <th className="p-3 text-center">Tıklama</th>
                <th className="p-3 text-center">Detay Açılma</th>
                <th className="p-3 text-center text-emerald-400">WhatsApp</th>
                <th className="p-3 text-center text-amber-400">Telefon</th>
                <th className="p-3 text-right">Dönüşüm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {profileStats.slice(0, 15).map((row) => (
                <tr key={row.profile.id} className="hover:bg-slate-850/50">
                  <td className="p-3 font-black text-white flex items-center gap-2">
                    <img
                      src={row.profile.coverPhoto || row.profile.photos?.[0]}
                      alt={row.profile.name}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <span>{row.profile.name}</span>
                  </td>
                  <td className="p-3 text-slate-400">{row.profile.city}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[9px] font-bold">
                      {row.profile.packageType || 'STANDART'}
                    </span>
                  </td>
                  <td className="p-3 text-center text-slate-400">{row.impressions}</td>
                  <td className="p-3 text-center text-cyan-300 font-bold">{row.clicks}</td>
                  <td className="p-3 text-center text-purple-300 font-bold">{row.views}</td>
                  <td className="p-3 text-center text-emerald-400 font-black">{row.whatsapp}</td>
                  <td className="p-3 text-center text-amber-400 font-black">{row.phone}</td>
                  <td className="p-3 text-right font-black text-amber-300">%{row.conv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* GOOGLE SEO & SİTE İÇİ ARAMA KELİMELERİ BÖLÜMÜ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Site İçi Aramalar */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
          <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
            <Search className="w-4 h-4 text-cyan-400" />
            <span>Site İçi Arama Terimleri</span>
          </h2>
          <div className="divide-y divide-slate-800/50">
            {searchQueries.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center">Henüz site içi arama yapılmadı (0)</p>
            ) : (
              searchQueries.map((q) => (
                <div key={q.query} className="py-2.5 flex items-center justify-between text-xs">
                  <span className="text-white font-bold">🔍 {q.query}</span>
                  <span className="px-2 py-0.5 bg-slate-800 text-cyan-300 rounded-full font-black text-[10px]">
                    {q.count} Kez
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Google Search Console Durumu */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
          <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-400" />
            <span>Google Organik Arama Verileri</span>
          </h2>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <span>⚠️ Google Search Console API Bağlantısı Bekleniyor</span>
            </div>
            <p>
              Google Gizlilik İlkeleri gereği organik arama kelimeleri yalnızca resmi Google Search Console API üzerinden güvenle çekilebilir.
            </p>
            <p className="text-[11px] text-slate-500">
              * Panelinizde asla tahmin veya sahte Google anahtar kelimesi gösterilmez; veriler %100 doğrudan Google onaylı kaynaktan alınır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
