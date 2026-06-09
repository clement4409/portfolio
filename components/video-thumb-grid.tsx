"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { videos, assets } from "@/lib/assets";
import { media } from "@/lib/base-path";

const clips = [
  { src: videos.ambiance, poster: assets[15].src, title: "Le four à l'œuvre" },
  { src: videos.ambianceSlow, poster: assets[16].src, title: "Façonnage du matin" },
  { src: videos.maisonPassion, poster: assets[13].src, title: "Une maison de passion" },
];

export function VideoThumbGrid() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {clips.map((c, i) => (
        <div key={i} className="relative aspect-video overflow-hidden rounded-2xl bg-pain-dark">
          {active === i ? (
            <video autoPlay controls className="h-full w-full object-cover">
              <source src={media(c.src)} type="video/mp4" />
            </video>
          ) : (
            <button onClick={() => setActive(i)} className="group absolute inset-0 focus-ring" aria-label={`Lire : ${c.title}`}>
              <Image src={c.poster} alt={c.title} fill sizes="33vw" className="object-cover" />
              <span className="absolute inset-0 grid place-items-center bg-pain-dark/30 transition-colors group-hover:bg-pain-dark/50">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                  <Play className="h-6 w-6 translate-x-0.5 fill-current" />
                </span>
              </span>
              <span className="absolute bottom-3 left-3 font-medium text-creme drop-shadow">{c.title}</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
