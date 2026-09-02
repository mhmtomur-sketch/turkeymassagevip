import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Award, Heart, Phone, Mail, MapPin } from 'lucide-react';
import { POPULAR_CITIES } from '../../data/locations';
import { CATEGORIES } from '../../data/categories';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-dark-950 border-t border-white/10 text-slate-400 text-xs mt-20">
      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-dark-900/60 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white mb-0.5">Doğrulanmış VIP Profiller</div>
              <div className="text-[11px] text-slate-400">Tüm bireysel terapist ve spa ilanları editörlerimizce incelenir.</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-dark-900/60 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white mb-0.5">Türkiye & KKTC Genel Ağı</div>
              <div className="text-[11px] text-slate-400">81 il ve KKTC'nin tüm merkezlerinde en zengin vitrin kataloğu.</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-dark-900/60 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white mb-0.5">Hızlı WhatsApp & Arama</div>
              <div className="text-[11px] text-slate-400">Komisyonsuz, doğrudan terapist veya spa merkeziyle iletişim.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Link Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-dark-850 border border-white/10 flex items-center justify-center theme-accent-glow">
                <Sparkles className="w-4 h-4 theme-accent-text" />
              </div>
              <span className="text-base font-black tracking-wider uppercase text-white">
                TURKEY<span className="theme-gradient-text">MASSAGE</span>
                <span className="ml-1 px-1 py-0.5 text-[9px] font-bold rounded bg-cyan-500/20 text-cyan-400">VIP</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Türkiye ve Kuzey Kıbrıs Türk Cumhuriyeti genelinde hizmet veren sertifikalı masözler, masörler, lüks spa salonları, hamamlar ve otel wellness merkezlerini bir araya getiren bağımsız vitrin ve ilan platformu.
            </p>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>destek@turkeymassagevip.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>İstanbul / İzmir / Lefkoşa</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Kategoriler</h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link to={`/kategori/${c.slug}`} className="hover:text-cyan-400 transition-colors">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Popüler Şehirler</h4>
            <ul className="space-y-2">
              {POPULAR_CITIES.slice(0, 7).map((city) => (
                <li key={city.id}>
                  <Link to={`/${city.slug}`} className="hover:text-cyan-400 transition-colors">
                    {city.name} Masaj & Spa
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Kurumsal & Yasal</h4>
            <ul className="space-y-2">
              <li><Link to="/paketler" className="hover:text-cyan-400 transition-colors">Yayın Paketleri</Link></li>
              <li><Link to="/admin" className="hover:text-cyan-400 transition-colors">Yönetici Paneli</Link></li>
              <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">Hakkımızda</span></li>
              <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">Gizlilik Politikası</span></li>
              <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">Kullanım Şartları</span></li>
              <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">KVKK Aydınlatma Metni</span></li>
              <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">Çerez Politikası</span></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Disclaimer */}
      <div className="bg-dark-950/90 border-t border-white/5 py-6 px-4 text-center text-[11px] text-slate-500 space-y-2">
        <p className="max-w-4xl mx-auto leading-relaxed">
          YASAL UYARI: Platformumuz yalnızca masaj terapisi, spa, hamam ve wellness hizmeti veren bireysel ve kurumsal profesyonellerin tanıtım vitrinidir. 18 yaşından küçüklerin siteye girmesi yasaktır. Platformumuz üzerinden paylaşılan ilanların içeriğinden ilan sahipleri sorumludur.
        </p>
        <p>© 2026 Turkey Massage VIP. Tüm Hakları Saklıdır.</p>
      </div>
    </footer>
  );
};
