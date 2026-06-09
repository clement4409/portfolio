"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { assets, type Asset } from "@/lib/assets";
import { cn } from "@/lib/utils";

const cats: (Asset["category"] | "Tout")[] = ["Tout", "Pains", "Viennoiseries", "Patisseries", "Salé"];

// On exclut les photos de boutique (devanture, façade, étalage, vitrine) et le café gourmand de cette galerie.
const gallery = assets.filter((a) => a.category !== "Boutique" && !a.src.includes("cafegourmand"));

export function FilterGallery() {
  const [filter, setFilter] = useState<(typeof cats)[number]>("Tout");
  const shown = filter === "Tout" ? gallery : gallery.filter((a) => a.category === filter);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm font-medium transition-colors focus-ring",
              filter === c ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {filter === c && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-primary" />}
            <span className="relative z-10">{c}</span>
          </button>
        ))}
      </div>
      <LayoutGroup>
        <motion.div layout className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {shown.map((item) => (
              <motion.figure
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-square overflow-hidden rounded-xl"
              >
                <Image src={item.src} alt={item.alt} fill sizes="25vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-pain-dark/80 p-3 text-xs text-creme transition-transform group-hover:translate-y-0">
                  {item.alt}
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </div>
  );
}
