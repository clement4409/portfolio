"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { media } from "@/lib/base-path";

interface AccordionItemData {
  id: number;
  title: string;
  imageUrl: string;
}

const defaultItems: AccordionItemData[] = [
  { id: 1, title: "Sites vitrines", imageUrl: "/assets/images/devanture.jpg" },
  { id: 2, title: "Boutique en ligne", imageUrl: "/assets/images/etalage.jpg" },
  { id: 3, title: "Click & collect", imageUrl: "/assets/images/croissant.jpg" },
  { id: 4, title: "Référencement local", imageUrl: "/assets/images/devanture2.jpg" },
  { id: 5, title: "Photos & vidéos", imageUrl: "/assets/images/fraisier.jpg" },
];

function AccordionItem({
  item,
  isActive,
  onActivate,
}: {
  item: AccordionItemData;
  isActive: boolean;
  onActivate: () => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-pressed={isActive}
      aria-label={item.title}
      className={cn(
        "relative h-[400px] shrink-0 overflow-hidden rounded-2xl transition-all duration-700 ease-in-out focus-ring md:h-[600px]",
        isActive ? "w-[300px] md:w-[520px]" : "w-[64px] md:w-[80px]"
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={media(item.imageUrl)}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <span
        className={cn(
          "absolute whitespace-nowrap text-lg font-semibold text-white transition-all duration-300 ease-in-out",
          isActive
            ? "bottom-6 left-1/2 -translate-x-1/2 rotate-0"
            : "bottom-24 left-1/2 -translate-x-1/2 rotate-90"
        )}
      >
        {item.title}
      </span>
    </button>
  );
}

export function ImageAccordion({
  items = defaultItems,
  title = "Tout ce qu'il faut pour réussir en ligne",
  subtitle = "Un site moderne, une boutique, la réservation, le référencement local et de beaux visuels : nous assemblons les bons ingrédients pour votre activité.",
  ctaHref = "/#contact",
  ctaLabel = "Nous contacter",
}: {
  items?: AccordionItemData[];
  title?: string;
  subtitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-slate-950 py-16 text-slate-100">
      {/* Ambient blue glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[10%] top-1/4 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -right-[5%] bottom-0 h-[420px] w-[420px] rounded-full bg-sky-500/10 blur-3xl" />
      </div>
      <div className="container relative z-10 flex flex-col items-center justify-between gap-12 md:flex-row">
        {/* Left: text */}
        <div className="w-full text-center md:w-1/2 md:text-left">
          <h3 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl text-balance">
            {title}
          </h3>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300 md:mx-0">{subtitle}</p>
          <Link
            href={ctaHref}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3 font-medium text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-500 focus-ring"
          >
            {ctaLabel} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Right: image accordion */}
        <div className="w-full md:w-1/2">
          <div
            className="flex flex-row items-center justify-center gap-3 overflow-x-auto p-2 md:gap-4"
            onMouseLeave={() => setActiveIndex(null)}
          >
            {items.map((item, index) => (
              <AccordionItem
                key={item.id}
                item={item}
                isActive={index === activeIndex}
                onActivate={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
