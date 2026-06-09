"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Asset } from "@/lib/assets";

export function LightboxGallery({ items }: { items: Asset[] }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const go = useCallback(
    (dir: number) => setActive((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, go]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {items.map((item, i) => (
          <button
            key={item.src}
            onClick={() => setActive(i)}
            className="group relative aspect-square overflow-hidden rounded-xl focus-ring"
            aria-label={`Agrandir : ${item.alt}`}
          >
            <Image src={item.src} alt={item.alt} fill sizes="33vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
            <span className="absolute inset-0 bg-pain-dark/0 transition-colors group-hover:bg-pain-dark/30" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-pain-dark/90 p-4 backdrop-blur"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={items[active].alt}
          >
            <button onClick={close} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-creme/10 text-creme hover:bg-creme/20 focus-ring" aria-label="Fermer">
              <X />
            </button>
            <button onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-4 grid h-11 w-11 place-items-center rounded-full bg-creme/10 text-creme hover:bg-creme/20 focus-ring" aria-label="Précédent">
              <ChevronLeft />
            </button>
            <button onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-4 top-1/2 grid h-11 w-11 place-items-center rounded-full bg-creme/10 text-creme hover:bg-creme/20 focus-ring" aria-label="Suivant">
              <ChevronRight />
            </button>
            <motion.figure
              key={active}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[85vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[3/2] w-full">
                <Image src={items[active].src} alt={items[active].alt} fill sizes="90vw" className="rounded-2xl object-contain" />
              </div>
              <figcaption className="mt-3 text-center text-creme/90">{items[active].alt}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
