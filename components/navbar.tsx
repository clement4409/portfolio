"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Heart, ChevronDown } from "lucide-react";
import { navItems } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { useFavorites } from "./favorites";
import { media } from "@/lib/base-path";

function FavoritesLink({ onHero }: { onHero: boolean }) {
  const { favorites } = useFavorites();
  const count = favorites.length;
  return (
    <Link
      href="/favoris"
      aria-label={`Favoris${count ? ` (${count})` : ""}`}
      className={cn(
        "relative grid h-10 w-10 place-items-center rounded-full transition-colors focus-ring",
        onHero ? "text-slate-100 hover:bg-white/10" : "hover:bg-muted"
      )}
    >
      <Heart className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-blue-600 px-1 text-[10px] font-semibold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}

// Prototypes en ligne.
const prototypes = [
  { label: "Prototype 1", href: "https://clement4409.github.io/boulangerie2/", desc: "Prototype en ligne" },
  { label: "Prototype 2", href: "https://clement4409.github.io/boulangerie/", desc: "Prototype en ligne" },
  { label: "Prototype 3", href: "https://artisan-dore-bakery.base44.app", desc: "Prototype en ligne" },
  { label: "Prototype 4", href: "https://prototype4.base44.app", desc: "Prototype en ligne" },
];

// Sources d'inspiration et bibliothèques de composants (encore plus de choix).
const ressources = [
  { label: "React Bits", href: "https://reactbits.de", desc: "Composants animés prêts à l'emploi" },
  { label: "21st.dev", href: "https://21st.dev/", desc: "Bibliothèque de composants UI" },
  { label: "Magic UI", href: "https://magicui.design/", desc: "Effets et composants premium" },
  { label: "Motion Sites", href: "https://motionsites.ai/", desc: "Sites animés générés par IA" },
];

// Liens pratiques inventés, utiles dans un menu.
const liensUtiles = [
  { label: "Nous contacter", href: "/#contact", desc: "En bas de la page d'accueil" },
  { label: "Demander un devis", href: "/devis", desc: "Prestations, favoris, message" },
  { label: "Shooting photo", href: "/shooting", desc: "Photos & vidéo par Louis, dès 100 €" },
  { label: "Où sont hébergés vos sites", href: "https://www.hostinger.com/", desc: "Hébergement Hostinger, géré par nos soins" },
];

export function Navbar() {
  const pathname = usePathname();
  const { favorites } = useFavorites();
  const favCount = favorites.length;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showProto, setShowProto] = useState(false);
  const [showRes, setShowRes] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Ferme le menu quand on clique ailleurs ou qu'on appuie sur Échap.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Light text is only correct over the dark hero, which exists on the home
  // page. On every other page the top of the page is light, so we use the
  // normal foreground colours even before scrolling.
  const onHero = pathname === "/" && !scrolled && !open;

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-blue-500/10 bg-background/80 shadow-sm shadow-blue-950/5 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="container flex h-16 items-center justify-between gap-4" aria-label="Navigation principale">
        <Link
          href="/"
          className="mr-8 flex items-center rounded-lg focus-ring xl:mr-14"
          aria-label="A&C Agency — accueil"
        >
          <span className="inline-flex shrink-0 items-center rounded-lg bg-white p-0.5 shadow-sm ring-1 ring-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={media("/logo-dark.jpg")}
              alt="A&C Agency"
              className="h-10 w-auto rounded-md md:h-11"
            />
          </span>
        </Link>

        {/* Desktop nav: condensed list */}
        <div className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3 py-2 text-sm font-medium transition-colors focus-ring",
                  active
                    ? "text-blue-500"
                    : onHero
                      ? "text-slate-200 hover:text-white"
                      : "text-muted-foreground hover:text-foreground"
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-blue-500"
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <FavoritesLink onHero={onHero} />
          <button
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold shadow-sm transition-colors focus-ring",
              open
                ? "border-blue-600 bg-blue-600 text-white"
                : onHero
                  ? "border-white/40 bg-white/10 text-white hover:bg-white/20"
                  : "border-blue-600/30 bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white"
            )}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
            <span className="hidden sm:inline">Menu</span>
          </button>
          <ThemeToggle />
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-blue-500/10 bg-background"
          >
            <div className="container max-h-[75vh] space-y-6 overflow-y-auto py-5">
              {/* Navigation des pages — uniquement sur petits écrans */}
              <div className="xl:hidden">
                <p className="px-1 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Navigation</p>
                <ul className="grid gap-1">
                  {navItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex flex-col rounded-xl px-4 py-3 transition-colors focus-ring",
                            active ? "bg-blue-500/10 text-blue-500" : "hover:bg-muted"
                          )}
                        >
                          <span className="font-medium">{item.label}</span>
                          <span className="text-xs text-muted-foreground">{item.desc}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Vos favoris */}
              <div>
                <p className="px-1 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Vos favoris</p>
                <Link
                  href="/favoris"
                  className="flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-muted focus-ring"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <Heart className="h-4 w-4 text-blue-600" /> Voir mes favoris
                  </span>
                  {favCount > 0 && (
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-blue-600 px-1.5 text-xs font-semibold text-white">
                      {favCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* Nos prototypes (dépliable) */}
              <div>
                <button
                  onClick={() => setShowProto((v) => !v)}
                  aria-expanded={showProto}
                  className="flex w-full items-center justify-between rounded-lg px-1 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground focus-ring"
                >
                  Nos prototypes
                  <ChevronDown className={cn("h-4 w-4 transition-transform", showProto && "rotate-180")} />
                </button>
                <AnimatePresence initial={false}>
                  {showProto && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="grid gap-1 overflow-hidden pt-1 sm:grid-cols-2"
                    >
                      {prototypes.map((p) => (
                        <li key={p.label}>
                          <a
                            href={p.href}
                            target={p.href.startsWith("http") ? "_blank" : undefined}
                            rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="flex flex-col rounded-xl px-4 py-3 transition-colors hover:bg-muted focus-ring"
                          >
                            <span className="font-medium">{p.label}</span>
                            <span className="text-xs text-muted-foreground">{p.desc}</span>
                          </a>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Encore plus de choix (dépliable) */}
              <div>
                <button
                  onClick={() => setShowRes((v) => !v)}
                  aria-expanded={showRes}
                  className="flex w-full items-center justify-between rounded-lg px-1 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground focus-ring"
                >
                  Encore plus de choix
                  <ChevronDown className={cn("h-4 w-4 transition-transform", showRes && "rotate-180")} />
                </button>
                <AnimatePresence initial={false}>
                  {showRes && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="grid gap-1 overflow-hidden pt-1 sm:grid-cols-2"
                    >
                      {ressources.map((r) => (
                        <li key={r.label}>
                          <a
                            href={r.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col rounded-xl px-4 py-3 transition-colors hover:bg-muted focus-ring"
                          >
                            <span className="font-medium">{r.label}</span>
                            <span className="text-xs text-muted-foreground">{r.desc}</span>
                          </a>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Liens utiles */}
              <div>
                <p className="px-1 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Liens utiles</p>
                <ul className="grid gap-1 sm:grid-cols-2">
                  {liensUtiles.map((l) => {
                    const external = l.href.startsWith("http");
                    const inner = (
                      <>
                        <span className="font-medium">{l.label}</span>
                        <span className="text-xs text-muted-foreground">{l.desc}</span>
                      </>
                    );
                    return (
                      <li key={l.label}>
                        {external ? (
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col rounded-xl px-4 py-3 transition-colors hover:bg-muted focus-ring"
                          >
                            {inner}
                          </a>
                        ) : (
                          <Link
                            href={l.href}
                            className="flex flex-col rounded-xl px-4 py-3 transition-colors hover:bg-muted focus-ring"
                          >
                            {inner}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
