import React from 'react';
import { 
  User, 
  Sparkles, 
  Clock, 
  Calendar, 
  MapPin, 
  Languages, 
  Tag,
  CheckCircle,
  Check
} from 'lucide-react';
import { Profile } from '../../types';

interface ProfileDetailsProps {
  profile: Profile;
}

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profile }) => {
  return (
    <div className="space-y-6">
      
      {/* 1. Bio / About */}
      <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          Hakkında & Hizmet Açıklaması
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
          {profile.bio}
        </p>
        {profile.serviceDescription && (
          <div className="pt-3 border-t border-white/5 text-xs text-slate-400 italic">
            {profile.serviceDescription}
          </div>
        )}
      </div>

      {/* 2. Personal & Physical Attributes (for individuals) */}
      {profile.type === 'individual' && (
        <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-pink-400" />
            Kişisel & Fiziksel Bilgiler
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {profile.age && (
              <div className="p-3 rounded-2xl bg-dark-900/80 border border-white/5 space-y-0.5">
                <span className="text-slate-500 font-medium">Yaş</span>
                <div className="text-slate-200 font-bold">{profile.age} Yaşında</div>
              </div>
            )}
            {profile.height && (
              <div className="p-3 rounded-2xl bg-dark-900/80 border border-white/5 space-y-0.5">
                <span className="text-slate-500 font-medium">Boy</span>
                <div className="text-slate-200 font-bold">{profile.height} cm</div>
              </div>
            )}
            {profile.weight && (
              <div className="p-3 rounded-2xl bg-dark-900/80 border border-white/5 space-y-0.5">
                <span className="text-slate-500 font-medium">Kilo</span>
                <div className="text-slate-200 font-bold">{profile.weight} kg</div>
              </div>
            )}
            {profile.bodyType && (
              <div className="p-3 rounded-2xl bg-dark-900/80 border border-white/5 space-y-0.5">
                <span className="text-slate-500 font-medium">Vücut Tipi</span>
                <div className="text-slate-200 font-bold">{profile.bodyType}</div>
              </div>
            )}
            {profile.hairColor && (
              <div className="p-3 rounded-2xl bg-dark-900/80 border border-white/5 space-y-0.5">
                <span className="text-slate-500 font-medium">Saç Rengi</span>
                <div className="text-slate-200 font-bold">{profile.hairColor}</div>
              </div>
            )}
            {profile.eyeColor && (
              <div className="p-3 rounded-2xl bg-dark-900/80 border border-white/5 space-y-0.5">
                <span className="text-slate-500 font-medium">Göz Rengi</span>
                <div className="text-slate-200 font-bold">{profile.eyeColor}</div>
              </div>
            )}
            {profile.nationality && (
              <div className="p-3 rounded-2xl bg-dark-900/80 border border-white/5 space-y-0.5">
                <span className="text-slate-500 font-medium">Uyruk</span>
                <div className="text-slate-200 font-bold">{profile.nationality}</div>
              </div>
            )}
            {profile.experienceYears && (
              <div className="p-3 rounded-2xl bg-dark-900/80 border border-white/5 space-y-0.5">
                <span className="text-slate-500 font-medium">Deneyim</span>
                <div className="text-slate-200 font-bold">{profile.experienceYears} Yıl</div>
              </div>
            )}
          </div>

          {profile.languages && profile.languages.length > 0 && (
            <div className="flex items-center gap-2 pt-2 text-xs text-slate-300">
              <Languages className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-500">Konuşulan Diller:</span>
              <span className="font-semibold text-slate-200">{profile.languages.join(', ')}</span>
            </div>
          )}
        </div>
      )}

      {/* 3. Working Hours & Weekly Schedule */}
      <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          Çalışma Saatleri & Hizmet Bölgeleri
        </h3>

        {/* Structured Weekly Schedule Table */}
        {profile.workingSchedule && profile.workingSchedule.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-xs">
            {profile.workingSchedule.map((sch) => (
              <div
                key={sch.day}
                className={`p-2.5 rounded-2xl border text-center space-y-1 ${
                  sch.isOpen
                    ? 'bg-dark-900/90 border-cyan-500/30'
                    : 'bg-dark-950/40 border-white/5 opacity-50'
                }`}
              >
                <div className="font-bold text-slate-300">{sch.day}</div>
                {sch.isOpen ? (
                  <div className="text-[11px] font-black text-cyan-400">
                    {sch.startHour} - {sch.endHour}
                  </div>
                ) : (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400">
                    KAPALI
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-dark-900/80 border border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                <Clock className="w-3.5 h-3.5 text-cyan-400" /> Saatler
              </div>
              <div className="text-sm font-bold text-slate-200">{profile.workingHours}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-dark-900/80 border border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                <Calendar className="w-3.5 h-3.5 text-pink-400" /> Günler
              </div>
              <div className="text-sm font-bold text-slate-200">{profile.workingDays}</div>
            </div>
          </div>
        )}

        {/* Hizmet Verilen İlçeler & Bölgeler */}
        <div className="pt-3 border-t border-white/5 space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Hizmet Verilen Bölgeler & Semtler:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(profile.serviceAreas && profile.serviceAreas.length > 0 ? profile.serviceAreas : [profile.serviceArea || profile.district]).map((area, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-xl bg-dark-900 border border-white/10 text-xs font-semibold text-slate-300"
              >
                📍 {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Services List & Pricing Menu */}
      <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Tag className="w-4 h-4 text-emerald-400" />
          Uygulanan Terapi ve Masaj Hizmetleri ({profile.services.length})
        </h3>

        {/* Selected Services Chips */}
        <div className="flex flex-wrap gap-2">
          {profile.services.map((srv, idx) => (
            <span
              key={idx}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-900/90 border border-cyan-500/30 text-xs font-bold text-cyan-300 shadow-sm"
            >
              <Check className="w-3.5 h-3.5 text-cyan-400" />
              {srv}
            </span>
          ))}
        </div>

        {/* Pricing Table */}
        {profile.servicePrices && profile.servicePrices.length > 0 && (
          <div className="space-y-2 pt-3 border-t border-white/5">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Seans Ücret Tarifesi:
            </div>
            {profile.servicePrices.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-2xl bg-dark-900/60 border border-white/5 text-xs hover:border-white/10 transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-200">{item.serviceName}</div>
                  <div className="text-[11px] text-slate-500">{item.duration}</div>
                </div>
                <div className="text-sm font-black text-amber-400">
                  {item.price.toLocaleString('tr-TR')} {profile.currency}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
