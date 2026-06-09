"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { media } from "@/lib/base-path";

interface SlideData {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  imageUrl: string;
  alt: string;
}

const defaultSlides: SlideData[] = [
  {
    title: "La Maison Dorée",
    subtitle: "Boulangerie · Pâtisserie",
    description:
      "Trois générations de savoir-faire artisanal, désormais mises en valeur sur un site moderne et accueillant.",
    accent: "#2563EB",
    imageUrl: "/assets/images/devanture.jpg",
    alt: "Devanture de la boulangerie",
  },
  {
    title: "Le croissant signature",
    subtitle: "Viennoiseries pur beurre",
    description:
      "Façonné à la main chaque matin avant l'aube. Un visuel plein écran qui donne envie dès la première seconde.",
    accent: "#0EA5E9",
    imageUrl: "/assets/images/croissant.jpg",
    alt: "Croissant pur beurre doré",
  },
  {
    title: "Pâtisseries de saison",
    subtitle: "Créations sucrées",
    description:
      "Des desserts qui changent au rythme des saisons, présentés comme dans une vitrine élégante.",
    accent: "#6366F1",
    imageUrl: "/assets/images/fraisier.jpg",
    alt: "Fraisier crème mousseline",
  },
  {
    title: "Au cœur de la boutique",
    subtitle: "Click & collect",
    description:
      "Commandez en ligne, retirez en boutique. Le numérique au service de votre commerce de proximité.",
    accent: "#38BDF8",
    imageUrl: "/assets/images/etalage.jpg",
    alt: "Étalage de pains et viennoiseries",
  },
];

const SLIDE_DURATION = 6000;

export default function ElegantCarousel({
  slides = defaultSlides,
  className,
}: {
  slides?: SlideData[];
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goNext = useCallback(
    () => setCurrentIndex((i) => (i + 1) % slides.length),
    [slides.length]
  );
  const goPrev = useCallback(
    () => setCurrentIndex((i) => (i - 1 + slides.length) % slides.length),
    [slides.length]
  );
  const goTo = (i: number) => setCurrentIndex(i);

  useEffect(() => {
    if (isPaused) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    setProgress(0);
    const step = 100 / (SLIDE_DURATION / 50);
    const progressTimer = setInterval(
      () => setProgress((p) => Math.min(p + step, 100)),
      50
    );
    const slideTimer = setInterval(goNext, SLIDE_DURATION);
    return () => {
      clearInterval(progressTimer);
      clearInterval(slideTimer);
    };
  }, [currentIndex, isPaused, goNext]);

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) (diff > 0 ? goNext : goPrev)();
  };

  const current = slides[currentIndex];

  return (
    <section
      className={cn(
        "relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-slate-950 text-white",
        className
      )}
      aria-roledescription="carrousel"
      aria-label="Exemples de sites plein écran"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(e) => (touchStartX.current = e.targetTouches[0].clientX)}
      onTouchMove={(e) => (touchEndX.current = e.targetTouches[0].clientX)}
      onTouchEnd={handleTouchEnd}
    >
      {/* Full-bleed images (crossfade) */}
      {slides.map((slide, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={slide.imageUrl}
          src={media(slide.imageUrl)}
          alt={i === currentIndex ? slide.alt : ""}
          aria-hidden={i !== currentIndex}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out",
            i === currentIndex ? "opacity-100" : "opacity-0"
          )}
        />
      ))}

      {/* Legibility scrims */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 75% 50%, ${current.accent}22 0%, transparent 70%)` }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container">
          <div key={currentIndex} className="max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ backgroundColor: current.accent }} />
              <span className="text-sm tracking-widest text-white/80">
                {String(currentIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-5 font-serif text-5xl font-bold leading-tight md:text-7xl text-balance">
              {current.title}
            </h3>
            <p className="mt-3 text-lg font-medium" style={{ color: current.accent }}>
              {current.subtitle}
            </p>
            <p className="mt-5 max-w-md text-white/85">{current.description}</p>

            <div className="mt-9 flex items-center gap-3">
              <button
                onClick={goPrev}
                aria-label="Diapositive précédente"
                className="grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm transition-colors hover:bg-white hover:text-slate-900 focus-ring"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goNext}
                aria-label="Diapositive suivante"
                className="grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm transition-colors hover:bg-white hover:text-slate-900 focus-ring"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicators */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container grid gap-3 pb-8 sm:grid-cols-2 lg:grid-cols-4">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              onClick={() => goTo(index)}
              aria-label={`Aller à : ${slide.title}`}
              aria-current={index === currentIndex}
              className="group text-left focus-ring rounded"
            >
              <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full transition-[width] duration-75 ease-linear"
                  style={{
                    width:
                      index === currentIndex ? `${progress}%` : index < currentIndex ? "100%" : "0%",
                    backgroundColor: index === currentIndex ? current.accent : "rgba(255,255,255,0.5)",
                  }}
                />
              </div>
              <span
                className={cn(
                  "mt-2 block text-xs transition-colors",
                  index === currentIndex ? "text-white" : "text-white/50 group-hover:text-white/80"
                )}
              >
                {slide.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
