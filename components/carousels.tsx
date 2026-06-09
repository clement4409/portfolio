"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { assets } from "@/lib/assets";

/* ---------- 1. Fullwidth hero carousel ---------- */
export function HeroCarousel() {
  const slides = [assets[13], assets[16], assets[15]];
  const [i, setI] = useState(0);
  const go = useCallback((d: number) => setI((p) => (p + d + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    const t = setInterval(() => go(1), 4500);
    return () => clearInterval(t);
  }, [go]);

  return (
    <div className="relative h-[60vh] overflow-hidden rounded-3xl">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image src={slides[i].src} alt={slides[i].alt} fill className="object-cover" />
          <div className="absolute inset-0 bg-pain-dark/40" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 grid place-items-center text-center text-creme">
        <h3 className="font-serif text-4xl font-bold md:text-6xl drop-shadow">{slides[i].alt}</h3>
      </div>
      <button onClick={() => go(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-creme/20 text-creme backdrop-blur hover:bg-creme/40 focus-ring" aria-label="Précédent"><ChevronLeft /></button>
      <button onClick={() => go(1)} className="absolute right-4 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-creme/20 text-creme backdrop-blur hover:bg-creme/40 focus-ring" aria-label="Suivant"><ChevronRight /></button>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, d) => (
          <button key={d} onClick={() => setI(d)} className={`h-2 rounded-full transition-all ${d === i ? "w-8 bg-primary" : "w-2 bg-creme/50"}`} aria-label={`Aller à la diapositive ${d + 1}`} />
        ))}
      </div>
    </div>
  );
}

/* ---------- 2. Product cards carousel (scroll-snap, autoplay, pause on hover) ---------- */
export function ProductCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const products = assets.slice(0, 8);
  const paused = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t = setInterval(() => {
      if (paused.current) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + 280, behavior: "smooth" });
    }, 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {products.map((p, idx) => (
        <article key={p.src} className="w-64 shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-card">
          <div className="relative aspect-square">
            <Image src={p.src} alt={p.alt} fill sizes="256px" className="object-cover" />
            {idx === 0 && <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">Pain du jour</span>}
          </div>
          <div className="p-4">
            <h4 className="font-medium">{p.alt}</h4>
            <p className="mt-1 font-serif text-lg text-primary">{(2 + idx * 0.5).toFixed(2)} €</p>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ---------- 3. Testimonials slider ---------- */
const quotes = [
  { name: "Camille R.", role: "La Maison Dorée", text: "Nos commandes en ligne ont doublé en deux mois. Le site est magnifique et rapide." },
  { name: "Julien M.", role: "Le Pétrin du Coin", text: "Enfin un site à la hauteur de nos produits. Les clients adorent le menu du jour." },
  { name: "Sophie L.", role: "Boulangerie Léa", text: "Accompagnement au top, du shooting photo à la mise en ligne. Je recommande." },
];
export function TestimonialSlider() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((p) => (p + d + quotes.length) % quotes.length);
  return (
    <div className="relative mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 text-center md:p-12">
      <Quote className="mx-auto h-10 w-10 text-primary/30" />
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-accent text-xl italic md:text-2xl">« {quotes[i].text} »</p>
          <footer className="mt-6">
            <p className="font-semibold">{quotes[i].name}</p>
            <p className="text-sm text-muted-foreground">{quotes[i].role}</p>
          </footer>
        </motion.blockquote>
      </AnimatePresence>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button onClick={() => go(-1)} className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-primary hover:text-primary focus-ring" aria-label="Précédent"><ChevronLeft className="h-4 w-4" /></button>
        <div className="flex gap-1.5">
          {quotes.map((_, d) => <span key={d} className={`h-2 w-2 rounded-full ${d === i ? "bg-primary" : "bg-border"}`} />)}
        </div>
        <button onClick={() => go(1)} className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-primary hover:text-primary focus-ring" aria-label="Suivant"><ChevronRight className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

/* ---------- 4. Infinite logo marquee ---------- */
export function LogoMarquee() {
  const logos = ["La Maison Dorée", "Le Pétrin", "Boulangerie Léa", "Au Bon Pain", "Fournil & Co", "Le Croissant d'Or"];
  const doubled = [...logos, ...logos];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card py-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-infinite-scroll items-center gap-16 px-8">
        {doubled.map((l, i) => (
          <span key={i} className="whitespace-nowrap font-serif text-2xl font-semibold text-muted-foreground">{l}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------- 5. 3D perspective carousel ---------- */
export function Carousel3D() {
  const items = assets.slice(0, 5);
  const [i, setI] = useState(0);
  return (
    <div className="relative h-80 [perspective:1200px]">
      <div className="absolute inset-0 grid place-items-center [transform-style:preserve-3d]">
        {items.map((item, idx) => {
          const offset = ((idx - i + items.length) % items.length);
          const pos = offset > items.length / 2 ? offset - items.length : offset;
          return (
            <motion.figure
              key={item.src}
              animate={{
                x: pos * 180,
                scale: pos === 0 ? 1 : 0.8,
                rotateY: pos * -25,
                zIndex: 10 - Math.abs(pos),
                opacity: Math.abs(pos) > 2 ? 0 : 1,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="absolute h-64 w-48 overflow-hidden rounded-2xl shadow-2xl"
            >
              <Image src={item.src} alt={item.alt} fill sizes="192px" className="object-cover" />
            </motion.figure>
          );
        })}
      </div>
      <button onClick={() => setI((p) => (p - 1 + items.length) % items.length)} className="absolute left-4 top-1/2 z-20 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-card border border-border hover:text-primary focus-ring" aria-label="Précédent"><ChevronLeft /></button>
      <button onClick={() => setI((p) => (p + 1) % items.length)} className="absolute right-4 top-1/2 z-20 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-card border border-border hover:text-primary focus-ring" aria-label="Suivant"><ChevronRight /></button>
    </div>
  );
}
