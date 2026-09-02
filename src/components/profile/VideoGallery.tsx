import React from 'react';
import { Video as VideoIcon, Play } from 'lucide-react';
import { db } from '../../services/db';

interface VideoGalleryProps {
  videos: string[];
  profileName: string;
  profileId: string;
}

export const VideoGallery: React.FC<VideoGalleryProps> = ({ videos, profileName, profileId }) => {
  if (!videos || videos.length === 0) return null;

  const handlePlay = () => {
    db.logEvent({ profileId, eventType: 'video_play' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <VideoIcon className="w-5 h-5 text-purple-400" />
        <h3 className="text-base font-bold text-white">Tanıtım Videosu</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((videoUrl, idx) => (
          <div
            key={idx}
            className="relative rounded-2xl overflow-hidden bg-dark-900 border border-white/10 shadow-xl aspect-video"
          >
            <video
              src={videoUrl}
              controls
              onPlay={handlePlay}
              preload="metadata"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
