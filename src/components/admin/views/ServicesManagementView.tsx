import React, { useState } from 'react';
import { Sparkles, Plus, Trash2, CheckCircle2, Search, Tag } from 'lucide-react';
import { ALL_SERVICES } from '../../../data/services';

export const ServicesManagementView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [services, setServices] = useState(ALL_SERVICES);
  const [newTitle, setNewTitle] = useState('');
  const [newDuration, setNewDuration] = useState('60 dk');

  const filtered = services.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const item = {
      id: `srv-${Date.now()}`,
      title: newTitle.trim(),
      slug: newTitle.trim().toLowerCase().replace(/\s+/g, '-'),
      duration: newDuration
    };
    setServices([...services, item]);
    setNewTitle('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl glass-card border border-white/10">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" /> Masaj & Terapi Hizmetleri Yönetimi
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Sitede ve profil formlarında sunulan tüm aktif terapi ve masaj çeşitleri (Toplam: {services.length})
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Hizmet Ara..."
            className="w-full bg-dark-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:theme-accent-border"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Add New Service Bar */}
      <div className="p-4 rounded-2xl glass-card border border-white/10 flex flex-wrap items-center gap-3">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Yeni Hizmet Adı (Örn: Lomi Lomi Masajı)..."
          className="flex-1 min-w-[200px] bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
        />
        <input
          type="text"
          value={newDuration}
          onChange={(e) => setNewDuration(e.target.value)}
          placeholder="Süre (Örn: 60 dk)"
          className="w-28 bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" /> Hizmet Ekle
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((srv) => (
          <div
            key={srv.id}
            className="p-4 rounded-2xl glass-card border border-white/10 flex items-center justify-between gap-3 hover:border-cyan-500/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">{srv.title}</div>
                <div className="text-[10px] text-slate-400">{srv.duration || '50-60 dk'}</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300">
              Aktif
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};
