import React, { useState } from 'react';
import { 
  Settings, 
  Download, 
  Upload, 
  CheckCircle2, 
  RotateCw, 
  Palette, 
  MessageSquare, 
  ShieldAlert,
  Save,
  FileJson
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { db } from '../../../services/db';
import { SiteSettings } from '../../../types';

export const SiteSettingsView: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(() => db.getSettings());
  const [isSaved, setIsSaved] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveSettings(settings);
    setIsSaved(true);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleExportBackup = () => {
    const jsonString = db.exportBackup();
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `turkeymassagevip_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = db.importBackup(content);
      if (success) {
        setImportStatus('Yedek başarıyla geri yüklendi! Sayfa yenileniyor...');
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setImportStatus('Yedek dosyası geçersiz veya bozuk.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl glass-card border border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-cyan-400" /> Site Ayarları & Veritabanı Yedekleme
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Vitrin rotasyonu, tema motoru hızı, WhatsApp şablonu ve kalıcı veri yönetimi
          </p>
        </div>

        {isSaved && (
          <div className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" /> Ayarlar Kaydedildi!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Vitrin & Theme Engine Settings */}
        <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <RotateCw className="w-4 h-4 text-cyan-400" /> Vitrin Rotasyonu & Dinamik Tema Motoru
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-2xl bg-dark-900 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Otomatik Vitrin Rotasyonu</span>
                <input
                  type="checkbox"
                  checked={settings.rotationEnabled}
                  onChange={(e) => setSettings({ ...settings, rotationEnabled: e.target.checked })}
                  className="w-5 h-5 accent-cyan-500 cursor-pointer"
                />
              </div>
              <div className="text-[11px] text-slate-400">
                Açık olduğunda vitrindeki ilan sıralaması her 12 saniyede bir otomatik kayar.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-dark-900 border border-white/5 space-y-2">
              <label className="block text-xs font-bold text-white">Rotasyon Değişim Süresi (Saniye)</label>
              <input
                type="number"
                min="5"
                max="60"
                value={settings.rotationIntervalSeconds}
                onChange={(e) => setSettings({ ...settings, rotationIntervalSeconds: Number(e.target.value) })}
                className="w-full bg-dark-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
              <div className="text-[11px] text-slate-400">Varsayılan: 12 saniye</div>
            </div>

            <div className="p-4 rounded-2xl bg-dark-900 border border-white/5 space-y-2">
              <label className="block text-xs font-bold text-white">Fotoğraf Slider Geçiş Süresi (Saniye)</label>
              <input
                type="number"
                min="3"
                max="20"
                value={settings.photoSliderIntervalSeconds}
                onChange={(e) => setSettings({ ...settings, photoSliderIntervalSeconds: Number(e.target.value) })}
                className="w-full bg-dark-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
              <div className="text-[11px] text-slate-400">Varsayılan: 7 saniye crossfade</div>
            </div>

            <div className="p-4 rounded-2xl bg-dark-900 border border-white/5 space-y-2">
              <label className="block text-xs font-bold text-white">Tema Accent Renk Geçiş Hızı (Saniye)</label>
              <input
                type="number"
                min="2"
                max="30"
                value={settings.themeColorSpeedSeconds}
                onChange={(e) => setSettings({ ...settings, themeColorSpeedSeconds: Number(e.target.value) })}
                className="w-full bg-dark-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
              <div className="text-[11px] text-slate-400">Varsayılan: 5 saniye yumuşak spektrum geçişi</div>
            </div>

          </div>
        </div>

        {/* WhatsApp & Contact Templates */}
        <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp Varsayılan Mesaj Şablonu
          </h3>

          <div>
            <textarea
              rows={3}
              value={settings.defaultWhatsappMessage}
              onChange={(e) => setSettings({ ...settings, defaultWhatsappMessage: e.target.value })}
              className="w-full bg-dark-900 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:theme-accent-border"
            />
            <div className="text-[11px] text-slate-400 mt-1">
              Kullanıcılar "WhatsApp" butonuna tıkladığında hazır olarak açılacak mesaj metni.
            </div>
          </div>
        </div>

        {/* Save Settings Button */}
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-xl transition-all"
        >
          <Save className="w-4 h-4" /> Ayarları Kaydet
        </button>

      </form>

      {/* Backup / Restore Section */}
      <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <FileJson className="w-4 h-4 text-purple-400" /> Veritabanı Yedekleme & Geri Yükleme (JSON Backup)
        </h3>
        <p className="text-xs text-slate-400">
          Eklediğiniz tüm profilleri, fotoğrafları, videoları, yorumları ve analitik verileri tek tıkla JSON dosyası olarak bilgisayarınıza indirebilir veya başka bir cihaza yükleyebilirsiniz.
        </p>

        {importStatus && (
          <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold">
            {importStatus}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* Export */}
          <button
            type="button"
            onClick={handleExportBackup}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md transition-all"
          >
            <Download className="w-4 h-4" /> Tüm Veritabanını İndir (.JSON)
          </button>

          {/* Import */}
          <label className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dark-900 border border-white/15 hover:border-white/30 text-white text-xs font-bold shadow-md transition-all">
            <Upload className="w-4 h-4 text-cyan-400" /> JSON Yedek Yükle (Geri Yükle)
            <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
          </label>
        </div>
      </div>

    </div>
  );
};
