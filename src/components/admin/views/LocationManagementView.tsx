import React, { useState } from 'react';
import { MapPin, Search, Plus, Building2, Check } from 'lucide-react';
import { ALL_LOCATIONS, TURKEY_PROVINCES, KKTC_REGIONS } from '../../../data/locations';
import { LocationCity } from '../../../types';

export const LocationManagementView: React.FC = () => {
  const [activeCountry, setActiveCountry] = useState<'ALL' | 'TR' | 'KKTC'>('ALL');
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState<LocationCity>(TURKEY_PROVINCES[0]);

  const filteredCities = ALL_LOCATIONS.filter((loc) => {
    const matchesCountry = activeCountry === 'ALL' || loc.country === activeCountry;
    const matchesSearch = loc.name.toLowerCase().includes(search.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl glass-card border border-white/10">
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-pink-400" /> Konum Yönetimi (Türkiye 81 İl + KKTC)
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Tüm il, ilçe, semt ve mahalle hiyerarşisi (Merkezi veri ağacı)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* City Selector List */}
        <div className="p-5 rounded-3xl glass-card border border-white/10 space-y-4">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-dark-950 border border-white/5 text-xs font-bold">
            <button
              onClick={() => setActiveCountry('ALL')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${activeCountry === 'ALL' ? 'bg-cyan-500 text-black' : 'text-slate-400'}`}
            >
              Tümü ({ALL_LOCATIONS.length})
            </button>
            <button
              onClick={() => setActiveCountry('TR')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${activeCountry === 'TR' ? 'bg-cyan-500 text-black' : 'text-slate-400'}`}
            >
              🇹🇷 81 İl
            </button>
            <button
              onClick={() => setActiveCountry('KKTC')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${activeCountry === 'KKTC' ? 'bg-cyan-500 text-black' : 'text-slate-400'}`}
            >
              🌴 KKTC
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Şehir Ara..."
              className="w-full bg-dark-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="max-h-[500px] overflow-y-auto space-y-1 pr-1">
            {filteredCities.map((city) => (
              <button
                key={city.id}
                onClick={() => setSelectedCity(city)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                  selectedCity.id === city.id
                    ? 'bg-cyan-500/20 border border-cyan-500 text-cyan-300 font-bold'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>{city.name}</span>
                <span className="text-[10px] text-slate-500">{city.districts.length} İlçe</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected City Details & Districts */}
        <div className="lg:col-span-2 p-6 rounded-3xl glass-card border border-white/10 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                {selectedCity.country === 'TR' ? '🇹🇷 Türkiye İli' : '🌴 KKTC Bölgesi'}
              </span>
              <h3 className="text-xl font-black text-white">{selectedCity.name}</h3>
              <div className="text-xs text-slate-400">SEO URL: /{selectedCity.slug}</div>
            </div>

            <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-extrabold text-xs">
              {selectedCity.districts.length} İlçe Kayıtlı
            </div>
          </div>

          {/* District & Neighborhoods Explorer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Kayıtlı İlçeler ve Semtler
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
              {selectedCity.districts.map((d, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-dark-900 border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      {d.name}
                    </span>
                    <span className="text-[10px] text-slate-500">/{d.slug}</span>
                  </div>

                  {d.neighborhoods && d.neighborhoods.length > 0 ? (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {d.neighborhoods.map((n, idx) => (
                        <span key={idx} className="text-[9px] px-2 py-0.5 rounded bg-dark-950 text-slate-400 border border-white/5">
                          {n}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-600 italic">Tüm Mahalleler Dahil</span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
