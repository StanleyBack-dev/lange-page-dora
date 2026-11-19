"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import { track } from "@/features/analytics/lib/tracker";
import type { DemoVideo } from "@/features/landing/content/videos";

// Lightweight player: only a poster until clicked (fast page, no third-party
// requests before the visitor asks), then the YouTube embed or the native
// video. Plays and completions are reported to analytics.
export function VideoCard({ video }: { video: DemoVideo }) {
  const [playing, setPlaying] = useState(false);
  const poster =
    video.poster ??
    (video.youtubeId
      ? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`
      : undefined);

  const play = () => {
    setPlaying(true);
    track("video_play", video.id);
  };

  return (
    <figure className="overflow-hidden rounded-3xl border border-white/10 bg-chrome-top">
      <div className="relative aspect-video bg-black">
        {playing && video.youtubeId ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : playing && video.src ? (
          <video
            className="absolute inset-0 size-full"
            src={video.src}
            poster={poster}
            controls
            autoPlay
            playsInline
            onEnded={() => track("video_complete", video.id)}
          />
        ) : (
          <button
            type="button"
            onClick={play}
            className="group absolute inset-0 flex items-center justify-center"
            aria-label={`Assistir: ${video.title}`}
          >
            {poster ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={poster}
                alt=""
                loading="lazy"
                className="absolute inset-0 size-full object-cover opacity-70 transition-opacity group-hover:opacity-90"
              />
            ) : (
              <span className="bg-grid-dark absolute inset-0" />
            )}
            <span className="relative inline-flex size-16 items-center justify-center rounded-full bg-brand text-brand-fg shadow-glow transition-transform group-hover:scale-110">
              <Play className="ml-1 size-7" fill="currentColor" />
            </span>
            <span className="absolute right-3 bottom-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white">
              {video.duration}
            </span>
          </button>
        )}
      </div>
      <figcaption className="p-5">
        <p className="font-bold text-chrome-fg">{video.title}</p>
        <p className="mt-1 text-sm text-chrome-muted">{video.description}</p>
      </figcaption>
    </figure>
  );
}
