import React, { useState } from 'react';
import { 
  Filter, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Video, 
  Flame, 
  Clock, 
  X,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { ALL_LOCATIONS, TURKEY_PROVINCES, KKTC_REGIONS } from '../../data/locations';
import { CATEGORIES } from '../../data/categories';
import { ALL_SERVICES } from '../../data/services';
import { CountryCode, CategorySlug, PackageType } from '../../types';

export interface FilterState {
  country: CountryCode;
  citySlug: string;
  districtSlug: string;
  category: string;
  isAvailableOnly: boolean;
  isOpenNowOnly: boolean;
  isVerifiedOnly: boolean;
  hasVideoOnly: boolean;
  isNewOnly: boolean;
  isPopularOnly: boolean;
  packageType: string;
  selectedService: string;
  maxPrice: number;
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResults,
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const activeCityList = filters.country === 'KKTC' ? KKTC_REGIONS : TURKEY_PROVINCES;
  const currentCityObj = activeCityList.find((c) => c.slug === filters.citySlug);
  const districtList = currentCityObj?.districts || [];

  const handleCountryToggle = (country: CountryCode) => {
    onFilterChange({
      ...filters,
      country,
      citySlug: '',
      districtSlug: '',
    });
  };

  const handleCityChange = (citySlug: string) => {
    onFilterChange({
      ...filters,
      citySlug,
      districtSlug: '',
    });
  };

  const handleDistrictChange = (districtSlug: string) => {
    onFilterChange({
      ...filters,
      districtSlug,
    });
  };

  const handleCategoryClick = (categorySlug: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === categorySlug ? '' : categorySlug,
    });
  };

  const toggleBoolean = (key: keyof FilterState) => {
    onFilterChange({
      ...filters,
      [key]: !filters[key],
    });
  };

  const hasActiveFilters = 
    filters.citySlug || 
    filters.districtSlug || 
    filters.category || 
    filters.isAvailableOnly || 
    filters.isOpenNowOnly || 
    filters.isVerifiedOnly || 
    filters.hasVideoOnly || 
    filters.isNewOnly || 
    filters.isPopularOnly || 
    filters.packageType || 
    filters.selectedService ||
    filters.maxPrice < 10000;

  return (
    <div className="w-full bg-dark-900/95 border-y border-white/10 py-2.5 sm:py-3 shadow-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-2.5">
        
        {/* ROW 1: Country Switcher + City Dropdown + District Dropdown + Advanced Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          
          {/* Country Tabs: TÜRKİYE / KKTC */}
          <div className="flex items-center p-0.5 rounded-xl bg-dark-950 border border-white/10 text-xs">
            <button
              onClick={() => handleCountryToggle('TR')}
              className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1 ${
                filters.country === 'TR'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🇹🇷</span> Türkiye (81 İl)
            </button>
            <button
              onClick={() => handleCountryToggle('KKTC')}
              className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1 ${
                filters.country === 'KKTC'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🌴</span> KKTC (Kıbrıs)
            </button>
          </div>

          {/* Location Dropdowns */}
          <div className="flex items-center gap-1.5 flex-1 min-w-[240px] max-w-xl">
            {/* City Dropdown */}
            <div className="relative flex-1">
              <select
                value={filters.citySlug}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full bg-dark-950 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:theme-accent-border appearance-none cursor-pointer"
              >
                <option value="">Tüm Şehirler ({filters.country === 'TR' ? '81 İl' : '6 Bölge'})</option>
                {activeCityList.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name} {c.isPopular ? '⭐' : ''}
                  </option>
                ))}
              </select>
              <MapPin className="w-3 h-3 text-cyan-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* District Dropdown */}
            <div className="relative flex-1">
              <select
                value={filters.districtSlug}
                disabled={!filters.citySlug || districtList.length === 0}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full bg-dark-950 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:theme-accent-border appearance-none disabled:opacity-40 cursor-pointer"
              >
                <option value="">Tüm İlçeler / Bölgeler</option>
                {districtList.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Action Tools: Reset & Advanced Filter Toggle */}
          <div className="flex items-center gap-1.5">
            {hasActiveFilters && (
              <button
                onClick={onReset}
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-all flex items-center gap-1"
                title="Filtreleri Sıfırla"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Temizle</span>
              </button>
            )}

            <button
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                isAdvancedOpen
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                  : 'bg-dark-950 border-white/10 text-slate-300 hover:border-white/20'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Gelişmiş Filtreler</span>
            </button>
          </div>

        </div>

        {/* ROW 2: Category Chips (Compact Horizontal Scroll) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => onFilterChange({ ...filters, category: '' })}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              !filters.category
                ? 'theme-accent-bg text-black shadow-sm'
                : 'bg-dark-950 border border-white/5 text-slate-300 hover:border-white/20'
            }`}
          >
            Tüm Vitrinler ({totalResults})
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.slug)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                filters.category === cat.slug
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm font-bold'
                  : 'bg-dark-950 border border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/20'
              }`}
            >
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* ROW 3: Quick Toggles (Müsait, Açık, Doğrulanmış, Videolu vb.) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-white/5 text-xs">
          {/* Müsait */}
          <button
            onClick={() => toggleBoolean('isAvailableOnly')}
            className={`px-2 py-0.5 rounded-md border flex items-center gap-1 whitespace-nowrap transition-all ${
              filters.isAvailableOnly
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold'
                : 'bg-dark-950 border-white/5 text-slate-400 hover:border-white/20'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Müsait Olanlar
          </button>

          {/* Doğrulanmış */}
          <button
            onClick={() => toggleBoolean('isVerifiedOnly')}
            className={`px-2 py-0.5 rounded-md border flex items-center gap-1 whitespace-nowrap transition-all ${
              filters.isVerifiedOnly
                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 font-bold'
                : 'bg-dark-950 border-white/5 text-slate-400 hover:border-white/20'
            }`}
          >
            <CheckCircle2 className="w-3 h-3 text-cyan-400" />
            Doğrulanmış (Verified)
          </button>

          {/* Videolu */}
          <button
            onClick={() => toggleBoolean('hasVideoOnly')}
            className={`px-2 py-0.5 rounded-md border flex items-center gap-1 whitespace-nowrap transition-all ${
              filters.hasVideoOnly
                ? 'bg-purple-500/20 border-purple-500 text-purple-400 font-bold'
                : 'bg-dark-950 border-white/5 text-slate-400 hover:border-white/20'
            }`}
          >
            <Video className="w-3 h-3 text-purple-400" />
            Videolu Profiller
          </button>

          {/* Popüler */}
          <button
            onClick={() => toggleBoolean('isPopularOnly')}
            className={`px-2 py-0.5 rounded-md border flex items-center gap-1 whitespace-nowrap transition-all ${
              filters.isPopularOnly
                ? 'bg-amber-500/20 border-amber-500 text-amber-400 font-bold'
                : 'bg-dark-950 border-white/5 text-slate-400 hover:border-white/20'
            }`}
          >
            <Flame className="w-3 h-3 text-amber-400" />
            Popüler
          </button>

          {/* Diamond VIP Only */}
          <button
            onClick={() => onFilterChange({ ...filters, packageType: filters.packageType === 'DIAMOND' ? '' : 'DIAMOND' })}
            className={`px-2 py-0.5 rounded-md border flex items-center gap-1 whitespace-nowrap transition-all ${
              filters.packageType === 'DIAMOND'
                ? 'bg-cyan-500 text-black font-black border-cyan-400'
                : 'bg-dark-950 border-white/5 text-cyan-400 hover:border-cyan-500/40'
            }`}
          >
            💎 Diamond VIP
          </button>
        </div>

        {/* Advanced Expandable Panel */}
        {isAdvancedOpen && (
          <div className="pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in slide-in-from-top-2 duration-150">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Masaj & Terapi Türü
              </label>
              <select
                value={filters.selectedService}
                onChange={(e) => onFilterChange({ ...filters, selectedService: e.target.value })}
                className="w-full bg-dark-950 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:theme-accent-border"
              >
                <option value="">Tüm Hizmetler (20+ Masaj Çeşidi)</option>
                {ALL_SERVICES.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Yayın Paketi
              </label>
              <select
                value={filters.packageType}
                onChange={(e) => onFilterChange({ ...filters, packageType: e.target.value })}
                className="w-full bg-dark-950 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:theme-accent-border"
              >
                <option value="">Tüm Paketler</option>
                <option value="DIAMOND">Diamond VIP (4.000 TL)</option>
                <option value="PREMIUM">Premium Vitrin (3.000 TL)</option>
                <option value="GOLD">Gold Vitrin (2.000 TL)</option>
                <option value="SILVER">Silver Vitrin (1.000 TL)</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                <span>Maksimum Fiyat</span>
                <span className="text-amber-400 font-extrabold">{filters.maxPrice.toLocaleString('tr-TR')} TL</span>
              </div>
              <input
                type="range"
                min="1000"
                max="10000"
                step="250"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
