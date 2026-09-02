import React from 'react';
import {
  Shield,
  LayoutDashboard,
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
  Image,
  Video,
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
  Settings,
  LogOut,
  ExternalLink
} from 'lucide-react';

export type AdminTab =
  | 'overview'
  | 'profiles'
  | 'showcase_analysis'
  | 'funnel'
  | 'traffic'
  | 'keywords'
  | 'messages'
  | 'users'
  | 'showcase_mgmt'
  | 'showcase_slots'
  | 'durations'
  | 'photos'
  | 'videos'
  | 'stories'
  | 'packages'
  | 'payments'
  | 'applications'
  | 'reviews'
  | 'cities'
  | 'districts'
  | 'regions'
  | 'services'
  | 'reports'
  | 'clicks'
  | 'seo'
  | 'settings';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange?: (tab: string) => void;
  setActiveTab?: (tab: string) => void;
  onLogout?: () => void;
}

export function AdminSidebar({ activeTab, onTabChange, setActiveTab, onLogout }: AdminSidebarProps) {
  const handleTabClick = (tabId: string) => {
    if (onTabChange) onTabChange(tabId);
    if (setActiveTab) setActiveTab(tabId);
  };

  const navSections = [
    {
      title: 'GENEL BAKIŞ',
      items: [
        { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'showcase_analysis', label: 'Canlı Vitrin Analizi', icon: BarChart3 },
        { id: 'funnel', label: 'Anlık Dönüşüm Funnel', icon: TrendingUp },
        { id: 'traffic', label: 'Canlı Trafik & Analitik', icon: Activity },
        { id: 'keywords', label: 'Kelime Takibi', icon: Search },
        { id: 'messages', label: 'Ziyaretçi & Mesaj Raporu', icon: MessageSquare }
      ]
    },
    {
      title: 'ÜYELİK & VİTRİN',
      items: [
        { id: 'profiles', label: 'Profiller & Vitrin', icon: Users },
        { id: 'users', label: 'Üyeler & Yöneticiler', icon: UserCheck },
        { id: 'showcase_mgmt', label: 'Vitrin Yönetimi', icon: Layers },
        { id: 'showcase_slots', label: 'Vitrin Slotları', icon: Grid },
        { id: 'durations', label: 'Üye Süreleri', icon: Clock },
        { id: 'photos', label: 'Fotoğraflar & Galeri', icon: Image },
        { id: 'videos', label: 'Videolar', icon: Video },
        { id: 'stories', label: 'Durumlar & Storyler', icon: Flame },
        { id: 'packages', label: 'Yayın Paketleri', icon: Crown },
        { id: 'payments', label: 'Ödemeler & Abonelikler', icon: CreditCard }
      ]
    },
    {
      title: 'İÇERİK',
      items: [
        { id: 'applications', label: 'Başvurular & İlanlar', icon: FileText },
        { id: 'reviews', label: 'Yorumlar & Onay', icon: CheckSquare },
        { id: 'cities', label: 'Şehirler (81 İl + KKTC)', icon: MapPin },
        { id: 'districts', label: 'İlçeler', icon: Building },
        { id: 'regions', label: 'Semtler & Bölgeler', icon: Compass },
        { id: 'services', label: 'Hizmetler', icon: Sparkles }
      ]
    },
    {
      title: 'SİSTEM & SEO',
      items: [
        { id: 'reports', label: 'Şikayet & Raporlar', icon: AlertTriangle },
        { id: 'clicks', label: 'Tıklama Analitiği', icon: MousePointer },
        { id: 'seo', label: 'SEO Yönetimi', icon: Globe },
        { id: 'settings', label: 'Site Ayarları & Yedekleme', icon: Settings }
      ]
    }
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#060a19] border-r border-slate-800/80 flex flex-col h-screen select-none">
      {/* LOGO & BAŞLIK */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
          <Shield className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-xs font-black tracking-wider text-white">ADMIN PORTAL</h1>
          <p className="text-[10px] font-bold text-cyan-400 tracking-wider">TURKEY MASSAGE VIP</p>
        </div>
      </div>

      {/* MENÜ LİSTESİ */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            <h3 className="text-[10px] font-black text-slate-400 tracking-wider px-2.5 mb-1">
              {section.title}
            </h3>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* ALT BUTON: CANLI SİTEYİ AÇ */}
      <div className="p-3 border-t border-slate-800 bg-[#040714]">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs rounded-xl shadow flex items-center justify-center gap-1.5 transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Canlı Siteyi Aç</span>
        </a>
      </div>
    </aside>
  );
}
