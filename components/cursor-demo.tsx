"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Croissant } from "lucide-react";
import { cn } from "@/lib/utils";

const shapes = [
  { id: "rond", label: "Rond" },
  { id: "croissant", label: "Croissant" },
  { id: "point", label: "Point" },
  { id: "carre", label: "Carré" },
] as const;
type ShapeId = (typeof shapes)[number]["id"];

function Cursor({ shape }: { shape: ShapeId }) {
  switch (shape) {
    case "croissant":
      return <Croissant className="h-12 w-12 text-primary drop-shadow" />;
    case "point":
      return <div className="h-4 w-4 rounded-full bg-primary mix-blend-difference" />;
    case "carre":
      return <div className="h-11 w-11 rounded-lg bg-primary mix-blend-difference" />;
    default:
      return (
        <div className="grid h-12 w-12 place-items-center rounded-full bg-primary mix-blend-difference">
          <span className="text-xs font-bold text-primary-foreground">miam</span>
        </div>
      );
  }
}

export function CursorDemo() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 28 });
  const sy = useSpring(y, { stiffness: 400, damping: 28 });
  const [active, setActive] = useState(false);
  const [shape, setShape] = useState<ShapeId>("rond");

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm text-muted-foreground">Forme du curseur :</span>
        {shapes.map((s) => (
          <button
            key={s.id}
            onClick={() => setShape(s.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-ring",
              shape === s.id
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - r.left);
          y.set(e.clientY - r.top);
        }}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        className="relative grid h-64 cursor-none place-items-center overflow-hidden rounded-3xl border border-border bg-pain text-creme"
      >
        <p className="pointer-events-none font-serif text-2xl">Survolez cette zone</p>
        <motion.div
          style={{ x: sx, y: sy }}
          animate={{ scale: active ? 1 : 0 }}
          className="pointer-events-none absolute left-0 top-0"
        >
          <div className="-translate-x-1/2 -translate-y-1/2">
            <Cursor shape={shape} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
