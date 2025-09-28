"use client";

import { useState, useRef } from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title: string;
  description?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
}

export default function VideoPlayer({
  src,
  poster,
  title,
  description,
  className = '',
  autoPlay = false,
  muted = true,
  controls = true,
  loop = false
}: VideoPlayerProps) {
  const [showPlayButton, setShowPlayButton] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setShowPlayButton(false);
    }
  };

  const handlePause = () => {
    // Video paused - could show play button again if needed
  };

  const handleEnded = () => {
    setShowPlayButton(true);
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        controls={controls && !showPlayButton}
        loop={loop}
        onPlay={() => setShowPlayButton(false)}
        onPause={handlePause}
        onEnded={handleEnded}
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        <p className="text-center py-8 text-gray-600">
          Your browser does not support the video tag. 
          <a href={src} className="text-[var(--primary-orange)] hover:underline ml-1">
            Download the video
          </a>
        </p>
      </video>

      {/* Custom Play Button Overlay */}
      {showPlayButton && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer" onClick={handlePlay}>
          <div className="bg-white/90 backdrop-blur-md rounded-full p-6 hover:bg-white transition-all duration-300 hover:scale-110 shadow-2xl">
            <svg className="w-12 h-12 text-[var(--primary-green)] ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      )}

      {/* Video Info Overlay */}
      {showPlayButton && (title || description) && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
          <h3 className="text-xl font-bold mb-2 text-shadow">{title}</h3>
          {description && (
            <p className="text-sm opacity-90 text-shadow-light">{description}</p>
          )}
        </div>
      )}

      {/* Loading State */}
      {!src && (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-orange)] to-[var(--primary-green)] flex items-center justify-center text-white">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            {description && (
              <p className="text-sm opacity-90">{description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}