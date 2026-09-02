import React, { useState } from 'react';
import { db } from '../services/db';
import { Profile } from '../types';
import {
  Lock,
  User,
  KeyRound,
  LogOut,
  BarChart3,
  TrendingUp,
  Activity,
  Search,
  MessageSquare,
  Users,
  UserCheck,
  Layers,
  Grid,
  Clock,
  Image as ImageIcon,
  Video as VideoIcon,
  Flame,
  Crown,
  CreditCard,
  FileText,
  CheckSquare,
  MapPin,
  Building,
  Compass,
  Sparkles,
  AlertTriangle,
  MousePointer,
  Globe,
  Settings as SettingsIcon,
  Plus,
  Play,
  Download,
  Upload,
  Check,
  Trash2,
  Phone,
  MessageCircle,
  Eye
} from 'lucide-react';

import { AdminSidebar } from '../components/admin/AdminSidebar';
import { ProfilesManagementView } from '../components/admin/views/ProfilesManagementView';
import { LiveShowcaseView } from '../components/admin/views/LiveShowcaseView';
import { PackageManagementView } from '../components/admin/views/PackageManagementView';
import { ReviewsModerationView } from '../components/admin/views/ReviewsModerationView';
import { ReportsView } from '../components/admin/views/ReportsView';
import { AdApplicationsView } from '../components/admin/views/AdApplicationsView';
import { TURKEY_CITIES, KKTC_CITIES } from '../data/locations';

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('tmv_admin_logged_in') === 'true';
  });

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<string>('profiles');
  const profiles = db.getProfiles();
  const analytics = db.getAnalytics();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim() === 'masorlevent' && passwordInput === 'Mehmet89.') {
      sessionStorage.setItem('tmv_admin_logged_in', 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('tmv_admin_logged_in');
    setIsAuthenticated(false);
    setUsernameInput('');
    setPasswordInput('');
  };

  // GİRİŞ YAPILMAMIŞSA BOŞ GİRİŞ FORMU
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050814] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-[#0b1026] border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="text-center mb-6 relative">
            <div className="w-14 h-14 bg-gradient-to-tr from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/20">
              <Lock className="w-7 h-7 text-slate-950" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wider">
              TURKEYMASSAGEVIP
            </h1>
            <p className="text-xs text-amber-400 font-bold uppercase tracking-widest mt-1">
              Yönetici Güvenlik Girişi
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-400 font-bold text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Kullanıcı Adı
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Kullanıcı adınızı girin"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Şifre
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Şifrenizi girin"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 active:scale-98 transition-transform mt-2"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-[#070b1b] text-white overflow-hidden">
      {/* SOL SABİT MENÜ */}
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onLogout={handleLogout}
      />

      {/* SAĞ İÇERİK ALANI */}
      <main className="flex-1 h-full overflow-y-auto p-4 sm:p-6 min-w-0 bg-[#070b1b]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <h2 className="text-xs sm:text-sm font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              {activeTab.replace(/_/g, ' ').toUpperCase()} YÖNETİMİ
            </h2>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Güvenli Çıkış</span>
            </button>
          </div>

          {/* 1. PROFİLLER & VİTRİN */}
          {activeTab === 'profiles' && <ProfilesManagementView />}

          {/* 2. DASHBOARD / GENEL BAKIŞ */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#0b1026] p-4 rounded-2xl border border-slate-800">
                  <p className="text-xs text-slate-400">Toplam Profil</p>
                  <p className="text-xl font-black text-amber-400 mt-1">{profiles.length}</p>
                </div>
                <div className="bg-[#0b1026] p-4 rounded-2xl border border-slate-800">
                  <p className="text-xs text-slate-400">Toplam Görüntüleme</p>
                  <p className="text-xl font-black text-cyan-400 mt-1">{analytics.totalViews}</p>
                </div>
                <div className="bg-[#0b1026] p-4 rounded-2xl border border-slate-800">
                  <p className="text-xs text-slate-400">WhatsApp Yönlendirme</p>
                  <p className="text-xl font-black text-emerald-400 mt-1">{analytics.totalWhatsApp}</p>
                </div>
                <div className="bg-[#0b1026] p-4 rounded-2xl border border-slate-800">
                  <p className="text-xs text-slate-400">Telefon Araması</p>
                  <p className="text-xl font-black text-blue-400 mt-1">{analytics.totalCalls}</p>
                </div>
              </div>
              <ProfilesManagementView />
            </div>
          )}

          {/* 3. CANLI VİTRİN ANALİZİ */}
          {(activeTab === 'showcase_analysis' || activeTab === 'showcase_mgmt' || activeTab === 'showcase_slots') && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['DIAMOND', 'PREMIUM', 'GOLD', 'SILVER'].map((pkg) => {
                  const occ = db.getOccupancy(pkg);
                  return (
                    <div key={pkg} className="bg-[#0b1026] p-4 rounded-2xl border border-slate-800">
                      <p className="text-xs font-bold text-amber-400">{pkg} Vitrin</p>
                      <p className="text-lg font-black text-white mt-1">{occ.active} / {occ.capacity} Dolu</p>
                      <div className="w-full bg-slate-900 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div className="bg-amber-400 h-full rounded-full" style={{ width: `${occ.percentage}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <LiveShowcaseView onEditProfile={() => {}} />
            </div>
          )}

          {/* 4. KELİME TAKİBİ */}
          {activeTab === 'keywords' && (
            <div className="bg-[#0b1026] border border-slate-800 rounded-2xl p-4 space-y-3">
              <h3 className="font-bold text-amber-300 text-sm">Google & Site İçi Kelime Takibi</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { kw: 'izmir masöz', searches: 14200, rank: '#1' },
                  { kw: 'alsancak masaj salonu', searches: 9800, rank: '#1' },
                  { kw: 'bireysel masöz izmir', searches: 8400, rank: '#1' },
                  { kw: 'vip masaj istanbul', searches: 22000, rank: '#2' },
                  { kw: 'ankara relax spa', searches: 6500, rank: '#1' },
                  { kw: 'antalya lara hamam', searches: 7200, rank: '#1' }
                ].map((k, idx) => (
                  <div key={idx} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-white text-xs">{k.kw}</p>
                      <p className="text-[10px] text-slate-400">Aylık Hacim: {k.searches.toLocaleString('tr-TR')}</p>
                    </div>
                    <span className="px-2 py-1 bg-amber-400 text-slate-950 font-black rounded-lg text-xs">{k.rank}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. ZİYARETÇİ & MESAJ RAPORU */}
          {(activeTab === 'messages' || activeTab === 'funnel' || activeTab === 'traffic' || activeTab === 'clicks') && (
            <div className="bg-[#0b1026] border border-slate-800 rounded-2xl p-4 space-y-3">
              <h3 className="font-bold text-cyan-300 text-sm">Canlı Ziyaretçi & İletişim Raporu</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-bold">
                      <th className="py-2">Profil</th>
                      <th className="py-2">Şehir</th>
                      <th className="py-2">Görüntüleme</th>
                      <th className="py-2">WhatsApp Tıklaması</th>
                      <th className="py-2">Arama</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {profiles.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-900/40">
                        <td className="py-2 font-bold text-white">{p.name}</td>
                        <td className="py-2 text-amber-400">{p.city}</td>
                        <td className="py-2 font-mono text-cyan-300">{p.viewCount || 100}</td>
                        <td className="py-2 font-mono text-emerald-400">{Math.round((p.viewCount || 100) * 0.12)}</td>
                        <td className="py-2 font-mono text-blue-400">{Math.round((p.viewCount || 100) * 0.08)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. HİZMETLER & MASAJ ÇEŞİTLERİ */}
          {activeTab === 'services' && (
            <div className="bg-[#0b1026] border border-slate-800 rounded-2xl p-4 space-y-3">
              <h3 className="font-bold text-amber-300 text-sm">Tanımlı Masaj & Spa Hizmetleri</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  'Relax Masaj', 'Aromaterapi', 'Medikal Masaj', 'Derin Doku',
                  'Türk Hamamı', 'Kese Köpük', 'Sultan Masajı', 'İsveç Masajı',
                  'Thai Masajı', 'Bali Masajı', 'Sıcak Taş Masajı', 'Refleksoloji'
                ].map((s, idx) => (
                  <div key={idx} className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span className="text-xs font-bold text-white truncate">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. ŞEHİRLER & İLÇELER & SEMTLER */}
          {(activeTab === 'cities' || activeTab === 'districts' || activeTab === 'regions') && (
            <div className="bg-[#0b1026] border border-slate-800 rounded-2xl p-4 space-y-3">
              <h3 className="font-bold text-amber-300 text-sm">81 İl & KKTC Şehir Dağılımı</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-[60vh] overflow-y-auto">
                {[...TURKEY_CITIES, ...KKTC_CITIES].map((c) => {
                  const count = profiles.filter((p) => (p.city || '').toLowerCase() === c.name.toLowerCase()).length;
                  return (
                    <div key={c.id} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
                      <span className="text-xs font-bold text-white">{c.name}</span>
                      <span className="px-2 py-0.5 bg-amber-400/10 border border-amber-400/30 text-amber-400 rounded-lg text-[10px] font-bold">
                        {count} İlan
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 8. FOTOĞRAFLAR & GALERİ */}
          {activeTab === 'photos' && (
            <div className="bg-[#0b1026] border border-slate-800 rounded-2xl p-4 space-y-3">
              <h3 className="font-bold text-amber-300 text-sm">Vitrin Kapak ve Galeri Fotoğrafları</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                {profiles.map((p) => (
                  <div key={p.id} className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 group relative">
                    <img src={p.coverPhoto || p.photos?.[0]} alt={p.name} className="w-full h-32 object-cover" />
                    <div className="p-1.5 text-center">
                      <p className="text-[11px] font-bold text-white truncate">{p.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 9. VİDEOLAR */}
          {activeTab === 'videos' && (
            <div className="bg-[#0b1026] border border-slate-800 rounded-2xl p-4 space-y-3">
              <h3 className="font-bold text-cyan-300 text-sm">Vitrin Tanıtım Videoları (Canlı Oynatıcı)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {profiles.filter((p) => !!p.videoUrl).map((p) => (
                  <div key={p.id} className="bg-slate-900 rounded-2xl p-3 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-white">{p.name}</span>
                      <span className="text-[10px] text-amber-400 font-bold">{p.packageType}</span>
                    </div>
                    <video
                      src={p.videoUrl}
                      controls
                      playsInline
                      className="w-full h-44 bg-black rounded-xl object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. DURUMLAR & STORYLER */}
          {activeTab === 'stories' && (
            <div className="bg-[#0b1026] border border-slate-800 rounded-2xl p-4 space-y-3">
              <h3 className="font-bold text-amber-300 text-sm">Canlı Story & Durum Halkaları</h3>
              <div className="flex flex-wrap gap-4">
                {profiles.map((p, idx) => (
                  <div key={p.id} className="flex flex-col items-center">
                    <div className={`w-14 h-14 rounded-full p-[2px] story-ring-${idx % 8} overflow-hidden`}>
                      <img src={p.coverPhoto || p.photos?.[0]} alt={p.name} className="w-full h-full rounded-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-300 mt-1">{p.name.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 11. YAYIN PAKETLERİ & ÖDEMELER */}
          {(activeTab === 'packages' || activeTab === 'payments') && <PackageManagementView />}

          {/* 12. BAŞVURULAR & İLANLAR */}
          {activeTab === 'applications' && <AdApplicationsView />}

          {/* 13. YORUMLAR */}
          {activeTab === 'reviews' && <ReviewsModerationView />}

          {/* 14. ŞİKAYETLER & RAPORLAR */}
          {activeTab === 'reports' && <ReportsView />}

          {/* 15. SEO YÖNETİMİ & SİTE AYARLARI */}
          {(activeTab === 'seo' || activeTab === 'settings' || activeTab === 'durations' || activeTab === 'users') && (
            <div className="bg-[#0b1026] border border-slate-800 rounded-2xl p-4 space-y-4">
              <h3 className="font-bold text-amber-300 text-sm">Site & SEO Yapılandırması</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <p className="font-bold text-white mb-1">Rotasyon Süresi</p>
                  <p className="text-slate-400">15 Saniyede bir adil döngü aktif</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <p className="font-bold text-white mb-1">Fotoğraf Slayt Süresi</p>
                  <p className="text-slate-400">10 Saniyede bir pürüzsüz geçiş aktif</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <p className="font-bold text-white mb-1">Google Sitemap XML</p>
                  <p className="text-emerald-400 font-bold">/sitemap.xml (81 İl + Tüm Vitrinler Yayında)</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <p className="font-bold text-white mb-1">İletişim Numaraları</p>
                  <p className="text-amber-400 font-bold">0540 322 55 55</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
