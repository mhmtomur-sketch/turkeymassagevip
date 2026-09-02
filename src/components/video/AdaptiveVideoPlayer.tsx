import React, { useState } from 'react';

interface AdaptiveVideoPlayerProps {
  src: string;
  poster?: string;
  onPlay?: () => void;
  className?: string;
}

export function AdaptiveVideoPlayer({ src, poster, onPlay, className = '' }: AdaptiveVideoPlayerProps) {
  const [aspect, setAspect] = useState<'portrait' | 'landscape' | 'square'>('portrait');

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    if (video.videoWidth && video.videoHeight) {
      if (video.videoHeight > video.videoWidth * 1.15) {
        setAspect('portrait'); // 9:16 Dikey
      } else if (video.videoWidth > video.videoHeight * 1.15) {
        setAspect('landscape'); // 16:9 Yatay
      } else {
        setAspect('square'); // 1:1 Kare
      }
    }
  };

  const containerStyle =
    aspect === 'portrait'
      ? 'aspect-[9/16] max-w-[320px] mx-auto'
      : aspect === 'square'
      ? 'aspect-square max-w-[440px] mx-auto'
      : 'aspect-video w-full max-w-3xl mx-auto';

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-800 shadow-2xl transition-all duration-300 ${containerStyle} ${className}`}>
      <video
        src={src}
        poster={poster}
        controls
        playsInline
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={onPlay}
        className="w-full h-full object-contain bg-black"
      />
    </div>
  );
}
