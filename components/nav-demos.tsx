"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Home, ChevronRight, ArrowUp, Wheat, Croissant, Cake, Coffee } from "lucide-react";
import { assets } from "@/lib/assets";

/* ---------- Scroll progress bar (grows as you scroll) ---------- */
export function ScrollGrowBarDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      {/* Barre bleue qui grandit selon la progression */}
      <div className="h-1.5 w-full bg-muted">
        <div
          className="h-full rounded-r-full bg-blue-600 transition-[width] duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div ref={ref} onScroll={onScroll} className="h-56 space-y-4 overflow-y-auto p-6 text-muted-foreground">
        <p className="text-sm font-medium text-blue-600">{Math.round(progress)}% lu</p>
        <h4 className="font-serif text-2xl font-semibold text-foreground">Faites défiler cette zone</h4>
        <p>
          La barre bleue en haut grandit à mesure que vous descendez : un repère discret qui montre
          où vous en êtes dans la lecture.
        </p>
        <p>Pratique sur les pages longues : on sait tout de suite si on est au début ou bientôt à la fin.</p>
        <p className="font-medium text-foreground">Encore un peu… la barre est presque pleine. 🥖</p>
      </div>
    </div>
  );
}

/* ---------- Mega menu ---------- */
export function MegaMenuDemo() {
  const [open, setOpen] = useState(false);
  const cols = [
    { icon: Wheat, title: "Pains", items: ["Tradition", "Campagne", "Seigle", "Complet"] },
    { icon: Croissant, title: "Viennoiseries", items: ["Croissant", "Pain au chocolat", "Chausson", "Brioche"] },
    { icon: Cake, title: "Pâtisseries", items: ["Éclair", "Fraisier", "Tarte Tatin", "Mille-feuille"] },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <nav className="flex items-center gap-1">
        <span className="px-3 py-2 font-medium">Accueil</span>
        <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
          <button className="flex items-center gap-1 rounded-full px-3 py-2 font-medium hover:text-primary focus-ring" aria-expanded={open}>
            Produits <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {open && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute left-0 top-full z-20 mt-2 w-[640px] max-w-[90vw] rounded-2xl border border-border bg-card p-6 shadow-2xl">
                <div className="grid grid-cols-3 gap-6">
                  {cols.map((c) => (
                    <div key={c.title}>
                      <p className="mb-3 flex items-center gap-2 font-serif font-semibold text-primary"><c.icon className="h-4 w-4" /> {c.title}</p>
                      <ul className="space-y-1.5 text-sm text-muted-foreground">
                        {c.items.map((it) => <li key={it}><a href="#" className="hover:text-primary focus-ring rounded">{it}</a></li>)}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {assets.slice(3, 5).map((a) => (
                    <a key={a.src} href="#" className="group relative aspect-[2/1] overflow-hidden rounded-xl">
                      <Image src={a.src} alt={a.alt} fill sizes="300px" className="object-cover transition-transform group-hover:scale-105" />
                      <span className="absolute inset-0 grid place-items-center bg-pain-dark/40 text-sm font-medium text-creme">{a.alt}</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <span className="px-3 py-2 font-medium">Contact</span>
      </nav>
    </div>
  );
}

/* ---------- Animated hamburger ---------- */
export function HamburgerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative h-72 overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-4">
        <span className="font-serif font-bold">Menu mobile</span>
        <button onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open} className="relative grid h-10 w-10 place-items-center focus-ring rounded-full">
          <span className={`absolute h-0.5 w-6 bg-foreground transition-all ${open ? "rotate-45" : "-translate-y-2"}`} />
          <span className={`absolute h-0.5 w-6 bg-foreground transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`absolute h-0.5 w-6 bg-foreground transition-all ${open ? "-rotate-45" : "translate-y-2"}`} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4">
            {["Accueil", "Nos pains", "Pâtisseries", "Contact"].map((l, i) => (
              <motion.li key={l} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.06 }} className="border-b border-border py-3 font-medium last:border-0">{l}</motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Sidebar ---------- */
export function SidebarDemo() {
  const [active, setActive] = useState("Tableau de bord");
  const items = [
    { label: "Tableau de bord", icon: Home }, { label: "Produits", icon: Croissant },
    { label: "Commandes", icon: Cake }, { label: "Salon de thé", icon: Coffee },
  ];
  return (
    <div className="flex h-72 overflow-hidden rounded-2xl border border-border">
      <aside className="w-56 bg-pain p-4 text-creme">
        <p className="mb-4 flex items-center gap-2 font-serif font-bold"><Wheat className="h-5 w-5 text-ble-300" /> Espace pro</p>
        <nav className="space-y-1">
          {items.map((it) => (
            <button key={it.label} onClick={() => setActive(it.label)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors focus-ring ${active === it.label ? "bg-primary text-primary-foreground" : "hover:bg-creme/10"}`}>
              <it.icon className="h-4 w-4" /> {it.label}
            </button>
          ))}
        </nav>
      </aside>
      <div className="grid flex-1 place-items-center bg-card text-muted-foreground">{active}</div>
    </div>
  );
}

/* ---------- Breadcrumbs ---------- */
export function BreadcrumbsDemo() {
  const crumbs = ["Accueil", "Produits", "Viennoiseries", "Croissant"];
  return (
    <nav aria-label="Fil d'Ariane" className="rounded-2xl border border-border bg-card p-5">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {crumbs.map((c, i) => (
          <li key={c} className="flex items-center gap-1.5">
            {i === 0 && <Home className="h-4 w-4 text-muted-foreground" />}
            <span className={i === crumbs.length - 1 ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground cursor-pointer"}>{c}</span>
            {i < crumbs.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ---------- Pagination ---------- */
export function PaginationDemo() {
  const [page, setPage] = useState(1);
  const total = 6;
  return (
    <div className="flex items-center justify-center gap-2">
      <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-lg border border-border px-3 py-2 text-sm disabled:opacity-40 hover:border-primary focus-ring">Préc.</button>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <button key={n} onClick={() => setPage(n)} className={`h-10 w-10 rounded-lg text-sm font-medium transition-colors focus-ring ${page === n ? "bg-primary text-primary-foreground" : "border border-border hover:border-primary"}`}>{n}</button>
      ))}
      <button onClick={() => setPage((p) => Math.min(total, p + 1))} disabled={page === total} className="rounded-lg border border-border px-3 py-2 text-sm disabled:opacity-40 hover:border-primary focus-ring">Suiv.</button>
    </div>
  );
}

/* ---------- Floating TOC + scrollspy ---------- */
export function FloatingTOC() {
  const sections = [
    { id: "histoire", label: "Notre histoire" },
    { id: "savoir-faire", label: "Savoir-faire" },
    { id: "equipe", label: "L'équipe" },
    { id: "valeurs", label: "Nos valeurs" },
  ];
  const [active, setActive] = useState(sections[0].id);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <div className="grid gap-6 md:grid-cols-[200px_1fr]">
      <nav aria-label="Sommaire" className="sticky top-24 hidden h-fit md:block">
        <ul className="space-y-2 border-l-2 border-border pl-4">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={`block text-sm transition-colors focus-ring rounded ${active === s.id ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground"}`}>{s.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="space-y-4">
        {sections.map((s, i) => (
          <section key={s.id} id={s.id} className="rounded-2xl border border-border bg-card p-6 scroll-mt-24">
            <h4 className="font-serif text-xl font-semibold">{s.label}</h4>
            <p className="mt-2 text-muted-foreground">{assets[i].alt}. Lorem du fournil : passion, farine de qualité et patience au levain.</p>
          </section>
        ))}
      </div>
    </div>
  );
}

/* ---------- Back to top ---------- */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg hover:brightness-110 focus-ring"
          aria-label="Remonter en haut"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
