"use client";

import Image from "next/image";
import { useRef, useState, MouseEvent } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Croissant, RotateCcw } from "lucide-react";
import { Counter } from "@/components/counter";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GetStartedButton } from "@/components/ui/get-started-button";
import { assets } from "@/lib/assets";

/* ---------- Counter stats (with replay button) ---------- */
const counterStats = [
  { to: 48, suffix: "", label: "sites livrés" },
  { to: 100, suffix: "%", label: "satisfaction" },
  { to: 12, suffix: "", label: "partenaires" },
  { to: 9800, suffix: "+", label: "viennoiseries/jour" },
];

export function CounterStats() {
  // Changer cette clé remonte les compteurs → le comptage rejoue depuis zéro.
  const [runId, setRunId] = useState(0);
  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setRunId((n) => n + 1)}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-ring"
        >
          <RotateCcw className="h-4 w-4" /> Réessayer
        </button>
      </div>
      <div key={runId} className="grid grid-cols-2 gap-8 rounded-3xl bg-pain p-10 text-center text-creme md:grid-cols-4">
        {counterStats.map((s) => (
          <div key={s.label}>
            <div className="font-serif text-4xl font-bold text-ble-300 md:text-5xl">
              <Counter to={s.to} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-sm uppercase tracking-wide text-creme/70">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 3D tilt card ---------- */
export function TiltCard({ src, alt, title }: { src: string; alt: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  const onMove = (e: MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 16);
    rx.set(-py * 16);
  };
  const reset = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className="relative aspect-[4/5] overflow-hidden rounded-2xl [perspective:800px]"
    >
      <Image src={src} alt={alt} fill sizes="33vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-pain-dark/80 to-transparent" />
      <span style={{ transform: "translateZ(40px)" }} className="absolute bottom-4 left-4 font-serif text-xl font-semibold text-creme">{title}</span>
    </motion.div>
  );
}

/* ---------- Ripple / pulse / morph buttons ---------- */
export function MicroButtons() {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const addRipple = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
    setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 600);
  };
  return (
    <div className="flex flex-wrap gap-4">
      <button onClick={addRipple} className="relative overflow-hidden rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground focus-ring">
        Effet ripple
        {ripples.map((r) => (
          <span key={r.id} className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 animate-[ping_0.6s_ease-out] rounded-full bg-creme/50" style={{ left: r.x, top: r.y }} />
        ))}
      </button>
      <button className="rounded-full bg-pain px-6 py-3 font-medium text-creme transition-transform hover:animate-pulse focus-ring dark:bg-creme dark:text-pain">Pulse au survol</button>
      <button className="group relative rounded-full border-2 border-primary px-6 py-3 font-medium text-primary transition-all hover:px-10 focus-ring">
        <span className="transition-all group-hover:tracking-wider">Morphing →</span>
      </button>
      <MagneticButton>
        <button className="rounded-full bg-pain-dark px-6 py-3 font-medium text-creme transition-colors hover:bg-pain focus-ring dark:bg-creme dark:text-pain">
          Bouton magnétique
        </button>
      </MagneticButton>
      <GetStartedButton />
    </div>
  );
}

/* ---------- Croissant loader ---------- */
export function CroissantLoader() {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <Croissant className="h-12 w-12 animate-spin-slow text-primary" />
      <p className="text-sm text-muted-foreground">Préparation en cours…</p>
    </div>
  );
}

/* ---------- Word-by-word scroll reveal ---------- */
export function WordReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.25"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="mx-auto max-w-3xl text-center font-serif text-3xl font-semibold leading-snug md:text-5xl">
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{w}</Word>;
      })}
    </p>
  );
}
function Word({ children, progress, range }: any) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }} className="mr-2 inline-block">{children}</motion.span>;
}

/* ---------- Parallax multi-layer ---------- */
export function ParallaxLayers() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["-5%", "25%"]);
  return (
    <div ref={ref} className="relative h-[70vh] overflow-hidden rounded-3xl bg-pain">
      <motion.div style={{ y: y1 }} className="absolute left-[5%] top-[10%] h-40 w-40 overflow-hidden rounded-2xl shadow-2xl">
        <Image src={assets[3].src} alt="" fill className="object-cover" />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute right-[8%] top-[20%] h-56 w-44 overflow-hidden rounded-2xl shadow-2xl">
        <Image src={assets[6].src} alt="" fill className="object-cover" />
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute bottom-[12%] left-[30%] h-48 w-48 overflow-hidden rounded-2xl shadow-2xl">
        <Image src={assets[5].src} alt="" fill className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 grid place-items-center">
        <h3 className="font-serif text-4xl font-bold text-creme md:text-6xl drop-shadow-lg">Profondeur & mouvement</h3>
      </div>
    </div>
  );
}

/* ---------- Stagger grid ---------- */
export function StaggerGrid() {
  // Changer cette clé remonte la grille → l'animation en cascade rejoue depuis le début.
  const [runId, setRunId] = useState(0);
  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setRunId((n) => n + 1)}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-ring"
        >
          <RotateCcw className="h-4 w-4" /> Réessayer
        </button>
      </div>
      <motion.div
        key={runId}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        {assets.slice(0, 8).map((a) => (
          <motion.figure
            key={a.src}
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square overflow-hidden rounded-xl"
          >
            <Image src={a.src} alt={a.alt} fill sizes="25vw" className="object-cover" />
          </motion.figure>
        ))}
      </motion.div>
    </div>
  );
}
