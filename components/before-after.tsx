"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import { MoveHorizontal } from "lucide-react";

export function BeforeAfter({
  before, after, beforeAlt, afterAlt,
}: { before: string; after: string; beforeAlt: string; afterAlt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-3xl"
      onMouseMove={(e) => dragging.current && update(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchMove={(e) => update(e.touches[0].clientX)}
    >
      <Image src={after} alt={afterAlt} fill className="object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <div className="relative h-full" style={{ width: ref.current?.offsetWidth ?? "100%" }}>
          <Image src={before} alt={beforeAlt} fill className="object-cover" style={{ maxWidth: "none" }} />
        </div>
      </div>
      <span className="absolute left-3 top-3 rounded-full bg-pain-dark/70 px-3 py-1 text-xs font-medium text-creme">Avant</span>
      <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">Après</span>
      <div className="absolute inset-y-0 w-0.5 bg-creme" style={{ left: `${pos}%` }}>
        <button
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-creme text-pain shadow-lg cursor-ew-resize focus-ring"
          onMouseDown={() => (dragging.current = true)}
          onTouchStart={() => (dragging.current = true)}
          aria-label="Glisser pour comparer"
        >
          <MoveHorizontal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
