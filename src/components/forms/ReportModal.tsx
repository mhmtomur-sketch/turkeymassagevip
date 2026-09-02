import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { db } from '../../services/db';

interface ReportModalProps {
  profileId: string;
  profileName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  profileId,
  profileName,
  isOpen,
  onClose,
}) => {
  const [reason, setReason] = useState('Sahte / Çalıntı Fotoğraf');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    db.addReport({
      profileId,
      profileName,
      reason,
      description: description.trim(),
      contactEmail: email.trim(),
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-modal rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-dark-900 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Bildiriminiz Alındı</h3>
            <p className="text-xs text-slate-400">
              Şikayetiniz moderasyon ekibimiz tarafından derhal incelenecektir.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
                <ShieldAlert className="w-4 h-4" /> Moderasyon Güvenlik Bildirimi
              </div>
              <h2 className="text-lg font-black text-white">Profili Bildir</h2>
              <p className="text-xs text-slate-400">
                <strong>{profileName}</strong> profili ile ilgili şikayetinizi belirtin.
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Şikayet Nedeni</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:theme-accent-border"
              >
                <option value="Sahte / Çalıntı Fotoğraf">Sahte / Çalıntı Fotoğraf</option>
                <option value="Ulaşılamayan Telefon / WhatsApp">Ulaşılamayan Telefon / WhatsApp</option>
                <option value="Yanıltıcı Konum / Hizmet Bilgisi">Yanıltıcı Konum / Hizmet Bilgisi</option>
                <option value="Uygunsuz İçerik / Hizmet İhlali">Uygunsuz İçerik / Hizmet İhlali</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Açıklama</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Lütfen detayları belirtin..."
                className="w-full bg-dark-900 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:theme-accent-border"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">İletişim E-postanız (İsteğe Bağlı)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mail@ornek.com"
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:theme-accent-border"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              Şikayeti İlet
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
