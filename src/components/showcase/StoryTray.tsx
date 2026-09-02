import React from 'react';
import { Flame } from 'lucide-react';
import { Profile } from '../../types';

interface StoryTrayProps {
  profiles: Profile[];
  onSelectStory: (profile: Profile) => void;
}

export const StoryTray: React.FC<StoryTrayProps> = ({ profiles, onSelectStory }) => {
  const storyProfiles = profiles.filter((p) => p.stories && p.stories.length > 0);

  if (storyProfiles.length === 0) return null;

  return (
    <div className="w-full py-2.5 border-b border-white/5 bg-dark-950/60">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1.5 mb-2">
          <Flame className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
          <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-300">
            GÜNCEL HİKAYELER & MÜSAİTLİK DURUMLARI
          </h3>
        </div>

        {/* Compact Horizontal Scroll */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-0.5">
          {storyProfiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => onSelectStory(profile)}
              className="flex flex-col items-center gap-1 flex-shrink-0 group focus:outline-none"
            >
              {/* Compact Avatar */}
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full p-[1.5px] story-ring transition-transform group-hover:scale-105 group-active:scale-95 shadow-md">
                <div className="w-full h-full rounded-full overflow-hidden bg-dark-900 border border-dark-950">
                  <img
                    src={profile.coverPhoto}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-200 group-hover:theme-accent-text truncate max-w-[56px] sm:max-w-[68px]">
                {profile.name.split(' ')[0]}
              </span>
              <span className="text-[8px] sm:text-[9px] text-slate-500 truncate max-w-[56px] sm:max-w-[68px] -mt-0.5">
                {profile.city}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
