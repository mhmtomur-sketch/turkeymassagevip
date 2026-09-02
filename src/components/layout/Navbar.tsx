import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, PlusCircle, MapPin, Menu, X, Shield, Star, Heart } from 'lucide-react';
import { TURKEY_CITIES, KKTC_CITIES } from '../../data/locations';
import { slugifyTurkish } from '../../services/db';
import '../../styles/neonLed.css';

interface NavbarProps {
  onOpenAdModal?: (pkg?: string) => void;
}

export function Navbar({ onOpenAdModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCitySlug, setActiveCitySlug] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('tmv_user_manual_city') || sessionStorage.getItem('tmv_detected_city');
      return saved ? slugifyTurkish(saved) : 'izmir';
    }
    return 'izmir';
  });

  const location = useLocation();

  const handleCityChange = (newSlug: string) => {
    const canonical = slugifyTurkish(newSlug);
    setActiveCitySlug(canonical);
    sessionStorage.setItem('tmv_user_manual_city', canonical);
    window.location.reload();
  };

  const allCities = [...TURKEY_CITIES, ...KKTC_CITIES];

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-1 sm:gap-3">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-amber-400 p-[2px] shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="font-black text-xs sm:text-base tracking-wider flex items-center gap-1">
                <span className="rainbow-title-shimmer">TURKEY MASSAGE</span>
                <span className="px-1 py-0.2 rounded bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-[8px] sm:text-[9px] font-black">
                  VIP
                </span>
              </div>
              <p className="text-[7.5px] sm:text-[9px] text-slate-400 font-semibold tracking-widest hidden sm:block">
                TÜRKİYE & KKTC
              </p>
            </div>
          </Link>

          {/* SAĞ BUTONLAR: ŞEHİR SEÇİMİ VE İLAN VER BUTONU */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Şehir Seçici */}
            <div className="relative">
              <select
                value={activeCitySlug}
                onChange={(e) => handleCityChange(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-cyan-300 font-bold text-[10px] sm:text-xs rounded-lg px-1.5 sm:px-2 py-1.5 focus:outline-none max-w-[90px] sm:max-w-none"
              >
                {allCities.map((c) => (
                  <option key={c.id} value={slugifyTurkish(c.slug)}>
                    📍 {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* İLAN VER BUTONU (MOBİLDE TAM SIĞAR) */}
            <button
              onClick={() => onOpenAdModal && onOpenAdModal('DIAMOND')}
              className="px-2 sm:px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-[10px] sm:text-xs rounded-lg flex items-center gap-1 shadow-lg active:scale-95 transition-all whitespace-nowrap shrink-0"
            >
              <PlusCircle className="w-3.5 h-3.5 shrink-0" />
              <span>İLAN VER</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
