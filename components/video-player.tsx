"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react";
import { media } from "@/lib/base-path";

export function VideoPlayer({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  // Avancer / reculer de quelques secondes.
  const skip = (seconds: number) => {
    const v = ref.current;
    if (!v || !v.duration) return;
    v.currentTime = Math.min(Math.max(v.currentTime + seconds, 0), v.duration);
  };

  // Aller directement à l'endroit cliqué sur la barre de progression.
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = ref.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const fraction = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    v.currentTime = fraction * v.duration;
    setProgress(fraction * 100);
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-pain-dark">
      <video
        ref={ref}
        poster={poster ? media(poster) : undefined}
        className="aspect-video w-full"
        onClick={toggle}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          setProgress((v.currentTime / v.duration) * 100 || 0);
        }}
        onEnded={() => setPlaying(false)}
      >
        <source src={media(src)} type="video/mp4" />
      </video>

      {!playing && (
        <button onClick={toggle} className="absolute inset-0 grid place-items-center bg-pain-dark/30 focus-ring" aria-label="Lecture">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-transform hover:scale-110">
            <Play className="h-8 w-8 translate-x-0.5 fill-current" />
          </span>
        </button>
      )}

      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-pain-dark/90 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
        <div
          onClick={seek}
          role="slider"
          aria-label="Position de lecture"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") skip(5);
            if (e.key === "ArrowLeft") skip(-5);
          }}
          className="group/bar -my-2 cursor-pointer py-2 focus-ring rounded"
        >
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-creme/20">
            <div className="h-full bg-primary transition-[width]" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3 text-creme">
          <button onClick={() => skip(-10)} aria-label="Reculer de 10 secondes" className="focus-ring rounded">
            <SkipBack className="h-5 w-5" />
          </button>
          <button onClick={toggle} aria-label={playing ? "Pause" : "Lecture"} className="focus-ring rounded">
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <button onClick={() => skip(10)} aria-label="Avancer de 10 secondes" className="focus-ring rounded">
            <SkipForward className="h-5 w-5" />
          </button>
          <button
            onClick={() => { if (ref.current) { ref.current.muted = !muted; setMuted(!muted); } }}
            aria-label={muted ? "Activer le son" : "Couper le son"}
            className="focus-ring rounded"
          >
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
          <button onClick={() => ref.current?.requestFullscreen()} aria-label="Plein écran" className="ml-auto focus-ring rounded">
            <Maximize className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
