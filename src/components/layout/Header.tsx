import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, PlusCircle, Search, Menu, X, Shield, Sparkles, ChevronDown } from 'lucide-react';
import { useGeoLocation } from '../../hooks/useGeoLocation';
import { TURKEY_CITIES } from '../../hooks/useGeoLocation';
import { AdSubmitModal } from '../forms/AdSubmitModal';

const CATEGORY_LINKS = [
  { slug: 'masoz', label: 'Masözler', icon: '💆‍♀️' },
  { slug: 'masor', label: 'Masörler', icon: '💆‍♂️' },
  { slug: 'spa', label: 'Spa & Salonlar', icon: '✨' },
  { slug: 'hamam', label: 'Hamam', icon: '♨️' },
  { slug: 'otel-spa', label: 'Otel Spa', icon: '🏨' }
];

export interface HeaderProps { onOpenAdModal?: () => void; onOpenAuthModal?: () => void; [key: string]: any; }
export default function Header(props?: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { detectedCity, changeCity } = useGeoLocation();
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredCities = TURKEY_CITIES.filter(c => 
    c.name.toLowerCase().includes(citySearch.toLowerCase())
  );

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg">
        {/* Üst Bar */}
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 py-2 flex items-center justify-between gap-2">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-sm sm:text-base font-black tracking-wider text-white">TURKEY<span className="text-cyan-400">MASSAGE</span></span>
                <span className="px-1 py-0.2 text-[9px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded">VIP</span>
              </div>
              <span className="text-[8px] sm:text-[9px] text-slate-400 -mt-0.5">TÜRKİYE & KKTC</span>
            </div>
          </Link>

          {/* Şehir Seçici & İlan Ver Butonu */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Şehir Açılır Menüsü */}
            <div className="relative">
              <button
                onClick={() => setIsCityOpen(!isCityOpen)}
                className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs font-semibold text-white hover:border-cyan-500/50 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="max-w-[70px] sm:max-w-[110px] truncate">{detectedCity?.name || 'Şehir'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
              </button>

              {isCityOpen && (
                <div className="absolute right-0 mt-1.5 w-60 sm:w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 p-2">
                  <div className="relative mb-2">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Şehir Ara (81 İl)..."
                      value={citySearch}
                      onChange={(e) => setCitySearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto space-y-0.5">
                    {filteredCities.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => {
                          changeCity(city);
                          setIsCityOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                          detectedCity?.id === city.id
                            ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span>{city.name}</span>
                        {detectedCity?.id === city.id && <span className="text-[10px] text-cyan-400">Seçili</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* İlan Ver Butonu - Mobilde Tam Uyumlu */}
            <button
              onClick={() => props?.onOpenAdModal ? props.onOpenAdModal() : setIsAdModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg text-xs font-bold shadow-md shadow-cyan-500/20 transition-all shrink-0"
            >
              <PlusCircle className="w-3.5 h-3.5 shrink-0" />
              <span>İLAN VER</span>
            </button>

            {/* Mobil Menü Butonu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-400 hover:text-white sm:hidden rounded-lg bg-slate-900 border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Kategori Linkleri Barı */}
        <div className="bg-slate-900/60 border-t border-slate-850 overflow-x-auto scrollbar-none py-1.5 px-2.5 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                location.pathname === '/' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-300 hover:text-white'
              }`}
            >
              🏠 Ana Sayfa
            </Link>
            {CATEGORY_LINKS.map((cat) => {
              const active = location.pathname === `/kategori/${cat.slug}`;
              return (
                <Link
                  key={cat.slug}
                  to={`/kategori/${cat.slug}`}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1 ${
                    active
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {isAdModalOpen && (
        <AdSubmitModal isOpen={isAdModalOpen} onClose={() => setIsAdModalOpen(false)} />
      )}
    </>
  );
}


export { Header };

