import React from 'react';
import { Users, Sparkles, UserCheck } from 'lucide-react';
import { StaffMember } from '../../types';

interface SpaStaffSectionProps {
  staff?: StaffMember[];
  businessName: string;
}

export const SpaStaffSection: React.FC<SpaStaffSectionProps> = ({ staff, businessName }) => {
  if (!staff || staff.length === 0) return null;

  return (
    <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Users className="w-4 h-4 text-purple-400" />
          İşletme Terapistleri & Personelleri ({staff.length})
        </h3>
        <span className="text-xs text-slate-400">{businessName}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {staff.map((person) => (
          <div
            key={person.id}
            className="flex flex-col items-center text-center p-3 rounded-2xl bg-dark-900/80 border border-white/5 hover:border-cyan-400/40 transition-all group"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden mb-2 bg-dark-950 border border-white/10 group-hover:scale-105 transition-transform">
              <img
                src={person.photo}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 truncate w-full">
              {person.name}
            </h4>
            <span className="text-[10px] text-slate-400 truncate w-full">
              {person.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
