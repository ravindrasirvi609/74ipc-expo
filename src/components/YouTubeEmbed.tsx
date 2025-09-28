"use client";

import { useState } from "react";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  description?: string;
  className?: string;
  autoplay?: boolean;
  showControls?: boolean;
}

export default function YouTubeEmbed({
  videoId,
  title,
  description,
  className = "",
  autoplay = false,
  showControls = true,
}: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const embedUrl = `https://www.youtube.com/embed/${videoId}?${new URLSearchParams(
    {
      autoplay: autoplay ? "1" : "0",
      controls: showControls ? "1" : "0",
      rel: "0",
      modestbranding: "1",
      showinfo: "0",
    }
  ).toString()}`;

  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-2xl bg-black ${className}`}
    >
      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-orange)] to-[var(--primary-green)] flex items-center justify-center text-white animate-pulse">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            {description && <p className="text-sm opacity-90">{description}</p>}
          </div>
        </div>
      )}

      {/* YouTube Iframe */}
      <iframe
        src={embedUrl}
        title={title}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full"
        onLoad={handleLoad}
      />

      {/* Video Info Overlay */}
      {!isLoaded && (title || description) && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
          <h3 className="text-xl font-bold mb-2 text-shadow">{title}</h3>
          {description && (
            <p className="text-sm opacity-90 text-shadow-light">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
