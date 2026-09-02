import React, { useState } from 'react';
import { X, User, Lock, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
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
            <h3 className="text-base font-bold text-white">Giriş Başarılı!</h3>
            <p className="text-xs text-slate-400">Hesabınıza yönlendiriliyorsunuz...</p>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Üye & İlan Yönetim Portalı
              </div>
              <h2 className="text-xl font-black text-white">
                {tab === 'login' ? 'Kullanıcı Girişi' : tab === 'register' ? 'Yeni Hesap Oluştur' : 'Şifremi Unuttum'}
              </h2>
            </div>

            {/* Tab switchers */}
            <div className="flex rounded-xl bg-dark-950 p-1 border border-white/5 text-xs font-bold">
              <button
                type="button"
                onClick={() => setTab('login')}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  tab === 'login' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Giriş Yap
              </button>
              <button
                type="button"
                onClick={() => setTab('register')}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  tab === 'register' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Kayıt Ol
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">E-posta Adresi</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@mail.com"
                    className="w-full bg-dark-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:theme-accent-border"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {tab !== 'forgot' && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Şifre</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-dark-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:theme-accent-border"
                    />
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg transition-all"
              >
                {tab === 'login' ? 'Giriş Yap' : tab === 'register' ? 'Ücretsiz Kayıt Ol' : 'Sıfırlama Bağlantısı Gönder'}
              </button>
            </form>

            <div className="text-center text-[11px] text-slate-500">
              {tab === 'login' ? (
                <button onClick={() => setTab('forgot')} className="hover:text-cyan-400 underline">
                  Şifremi unuttum
                </button>
              ) : (
                <button onClick={() => setTab('login')} className="hover:text-cyan-400 underline">
                  Zaten bir hesabınız var mı? Giriş yapın
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
