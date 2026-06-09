"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { media } from "@/lib/base-path";

interface CarouselImage {
  src: string;
  alt: string;
}

interface HeroCarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  subtitle: string;
  images: CarouselImage[];
  moreHref?: string;
  moreLabel?: string;
  /** Auto-advance interval in ms (0 disables). */
  interval?: number;
  /** Full-bleed, full-viewport-height hero instead of a contained card. */
  fullscreen?: boolean;
}

export const HeroCarousel = React.forwardRef<HTMLDivElement, HeroCarouselProps>(
  ({ title, subtitle, images, moreHref, moreLabel, interval = 4000, fullscreen = false, className, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(Math.floor(images.length / 2));
    const [paused, setPaused] = React.useState(false);

    const handleNext = React.useCallback(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const handlePrev = React.useCallback(() => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    React.useEffect(() => {
      if (!interval || paused) return;
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      const timer = setInterval(handleNext, interval);
      return () => clearInterval(timer);
    }, [handleNext, interval, paused]);

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden bg-card px-4",
          fullscreen
            ? "flex min-h-[100svh] items-center py-24"
            : "rounded-3xl border border-border py-14 md:py-16",
          className
        )}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        {...props}
      >
        {/* Subtle blue ambience */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" aria-hidden>
          <div className="absolute -left-[10%] -top-[10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(37,99,235,0.12),transparent)]" />
          <div className="absolute -right-[10%] top-[10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(56,189,248,0.12),transparent)]" />
        </div>

        <div className="relative z-10 flex w-full flex-col items-center space-y-8 text-center md:space-y-10">
          <div className="space-y-3">
            <h3 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight md:text-5xl text-balance">
              {title}
            </h3>
            <p className="mx-auto max-w-xl text-muted-foreground md:text-lg">{subtitle}</p>
          </div>

          {/* Coverflow showcase */}
          <div
            className={cn(
              "relative flex w-full items-center justify-center",
              fullscreen ? "h-[380px] md:h-[540px]" : "h-[320px] md:h-[420px]"
            )}
          >
            <div className="relative flex h-full w-full items-center justify-center [perspective:1000px]">
              {images.map((image, index) => {
                const offset = index - currentIndex;
                const total = images.length;
                let pos = (offset + total) % total;
                if (pos > Math.floor(total / 2)) pos = pos - total;

                const isCenter = pos === 0;
                const isAdjacent = Math.abs(pos) === 1;

                return (
                  <div
                    key={index}
                    className={cn(
                      "absolute flex items-center justify-center transition-all duration-500 ease-out",
                      fullscreen ? "h-80 w-52 md:h-[480px] md:w-80" : "h-72 w-48 md:h-[400px] md:w-64"
                    )}
                    style={{
                      transform: `translateX(${pos * 45}%) scale(${
                        isCenter ? 1 : isAdjacent ? 0.85 : 0.7
                      }) rotateY(${pos * -10}deg)`,
                      zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                      opacity: isCenter ? 1 : isAdjacent ? 0.45 : 0,
                      filter: isCenter ? "blur(0px)" : "blur(4px)",
                      visibility: Math.abs(pos) > 1 ? "hidden" : "visible",
                    }}
                    aria-hidden={!isCenter}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={media(image.src)}
                      alt={isCenter ? image.alt : ""}
                      className="h-full w-full rounded-3xl border-2 border-foreground/10 object-cover shadow-2xl"
                      draggable={false}
                    />
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handlePrev}
              aria-label="Image précédente"
              className="absolute left-2 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/70 backdrop-blur-sm transition-colors hover:bg-blue-600 hover:text-white focus-ring sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Image suivante"
              className="absolute right-2 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/70 backdrop-blur-sm transition-colors hover:bg-blue-600 hover:text-white focus-ring sm:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Aller à l'image ${index + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all focus-ring",
                  index === currentIndex ? "w-6 bg-blue-600" : "w-2 bg-border hover:bg-blue-600/50"
                )}
              />
            ))}
          </div>

          {moreHref && (
            <Link
              href={moreHref}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-ring"
            >
              {moreLabel ?? "Voir plus"} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    );
  }
);

HeroCarousel.displayName = "HeroCarousel";
