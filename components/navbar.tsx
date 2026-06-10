"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu, X, Heart, ChevronDown, Home, Sparkles, Images, Play,
  GalleryHorizontal, Wand2, ClipboardList, LayoutGrid, Star,
  Store, PanelBottom, type LucideIcon,
} from "lucide-react";
import { featureItems } from "@/lib/nav";
import { cn } from "@/lib/utils";

// Associe le nom d'icône (défini dans lib/nav) au composant Lucide.
const iconMap: Record<string, LucideIcon> = {
  home: Home,
  sparkles: Sparkles,
  images: Images,
  play: Play,
  "gallery-horizontal": GalleryHorizontal,
  wand: Wand2,
  "clipboard-list": ClipboardList,
  menu: Menu,
  "layout-grid": LayoutGrid,
  star: Star,
  store: Store,
  "panel-bottom": PanelBottom,
};

const FEATURES_TITLE = "Ce que l'on peut créer pour vous";
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
        "relative grid h-9 w-9 place-items-center rounded-full transition-colors focus-ring",
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
  const [showFeatures, setShowFeatures] = useState(false);
  const [showProtoDesktop, setShowProtoDesktop] = useState(false);
  const [showProto, setShowProto] = useState(false);
  const [showRes, setShowRes] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const protoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openProto = () => {
    if (protoTimer.current) clearTimeout(protoTimer.current);
    setShowProtoDesktop(true);
    setShowFeatures(false);
  };
  const closeProtoSoon = () => {
    if (protoTimer.current) clearTimeout(protoTimer.current);
    protoTimer.current = setTimeout(() => setShowProtoDesktop(false), 320);
  };
  const featTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openFeatures = () => {
    if (featTimer.current) clearTimeout(featTimer.current);
    setShowFeatures(true);
    setShowProtoDesktop(false);
  };
  const closeFeaturesSoon = () => {
    if (featTimer.current) clearTimeout(featTimer.current);
    featTimer.current = setTimeout(() => setShowFeatures(false), 320);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setShowFeatures(false);
    setShowProtoDesktop(false);
  }, [pathname]);

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
      <nav className="container flex h-14 items-center justify-between gap-3" aria-label="Navigation principale">
        <Link
          href="/"
          className="mr-4 flex items-center rounded-lg focus-ring"
          aria-label="A&C Agency — accueil"
        >
          <span className="inline-flex shrink-0 items-center rounded-lg bg-white p-0.5 shadow-sm ring-1 ring-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={media("/logo-dark.jpg")}
              alt="A&C Agency"
              className="h-8 w-auto rounded-md md:h-9"
            />
          </span>
        </Link>

        {/* Desktop nav : Accueil + fonctionnalités + prototypes + raccourcis. */}
        <div className="hidden min-w-0 items-center gap-0.5 xl:flex">
          <Link
            href="/"
            className={cn(
              "relative shrink-0 whitespace-nowrap rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors focus-ring",
              pathname === "/"
                ? "text-blue-500"
                : onHero
                  ? "text-slate-200 hover:text-white"
                  : "text-muted-foreground hover:text-foreground"
            )}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            Accueil
          </Link>

          {/* Méga-menu des fonctionnalités */}
          <div className="relative" onMouseEnter={openFeatures} onMouseLeave={closeFeaturesSoon}>
          <button
            type="button"
            onClick={() => { setShowFeatures((v) => !v); setShowProtoDesktop(false); }}
            onMouseEnter={openFeatures}
            aria-expanded={showFeatures}
            aria-haspopup="true"
            className={cn(
              "inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors focus-ring",
              showFeatures || featureItems.some((f) => f.href === pathname)
                ? "text-blue-500"
                : onHero
                  ? "text-slate-200 hover:text-white"
                  : "text-muted-foreground hover:text-foreground"
            )}
          >
            {FEATURES_TITLE}
            <ChevronDown className={cn("h-4 w-4 transition-transform", showFeatures && "rotate-180")} />
          </button>

          <AnimatePresence>
            {showFeatures && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                role="menu"
                aria-label={FEATURES_TITLE}
                className="absolute left-0 top-full z-50 mt-2 max-h-[calc(100vh-5rem)] w-[640px] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-2xl border border-blue-500/10 bg-background/95 p-2 shadow-xl shadow-blue-950/10 backdrop-blur-md"
              >
                <p className="px-3 pb-1 pt-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Tout ce que nous pouvons créer pour votre site — cliquez pour voir des exemples réels
                </p>
                <ul className="grid gap-0.5 p-1 sm:grid-cols-2">
                  {featureItems.map((item) => {
                    const Icon = (item.icon && iconMap[item.icon]) || Sparkles;
                    const active = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          role="menuitem"
                          className={cn(
                            "group flex items-start gap-2.5 rounded-xl px-2.5 py-1.5 transition-colors focus-ring",
                            active ? "bg-blue-500/10" : "hover:bg-muted"
                          )}
                        >
                          <span
                            className={cn(
                              "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors",
                              active
                                ? "bg-blue-600 text-white"
                                : "bg-blue-600/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0">
                            <span className={cn("block text-sm font-semibold", active ? "text-blue-500" : "text-foreground")}>
                              {item.label}
                            </span>
                            <span className="block text-xs text-muted-foreground">{item.desc}</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Encore plus de choix — ressources externes */}
                <div className="mt-1 border-t border-border px-1 pt-2">
                  <p className="px-2 pb-0.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Encore plus de choix
                  </p>
                  <ul className="grid gap-0.5 p-1 sm:grid-cols-2">
                    {ressources.map((r) => (
                      <li key={r.label}>
                        <a
                          href={r.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          role="menuitem"
                          className="flex items-baseline gap-2 rounded-lg px-2.5 py-1.5 transition-colors hover:bg-muted focus-ring"
                        >
                          <span className="shrink-0 text-sm font-semibold">{r.label}</span>
                          <span className="truncate text-xs text-muted-foreground">{r.desc}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>

          {/* Menu déroulant : nos prototypes */}
          <div className="relative" onMouseEnter={openProto} onMouseLeave={closeProtoSoon}>
            <button
              type="button"
              onClick={() => { setShowProtoDesktop((v) => !v); setShowFeatures(false); }}
              onMouseEnter={openProto}
              aria-expanded={showProtoDesktop}
              aria-haspopup="true"
              className={cn(
                "inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors focus-ring",
                showProtoDesktop
                  ? "text-blue-500"
                  : onHero
                    ? "text-slate-200 hover:text-white"
                    : "text-muted-foreground hover:text-foreground"
              )}
            >
              Nos prototypes
              <ChevronDown className={cn("h-4 w-4 transition-transform", showProtoDesktop && "rotate-180")} />
            </button>

            <AnimatePresence>
              {showProtoDesktop && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  role="menu"
                  aria-label="Nos prototypes"
                  className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-blue-500/10 bg-background/95 p-2 shadow-xl shadow-blue-950/10 backdrop-blur-md"
                >
                  <ul className="grid gap-1">
                    {prototypes.map((p) => (
                      <li key={p.label}>
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          role="menuitem"
                          className="flex flex-col rounded-xl px-3 py-2.5 transition-colors hover:bg-muted focus-ring"
                        >
                          <span className="text-sm font-semibold">{p.label}</span>
                          <span className="text-xs text-muted-foreground">{p.desc}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Raccourcis directs */}
          <Link
            href="/shooting"
            className={cn(
              "shrink-0 whitespace-nowrap rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors focus-ring",
              pathname === "/shooting"
                ? "text-blue-500"
                : onHero
                  ? "text-slate-200 hover:text-white"
                  : "text-muted-foreground hover:text-foreground"
            )}
          >
            Shooting photo
          </Link>
          <Link
            href="/#contact"
            className={cn(
              "shrink-0 whitespace-nowrap rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors focus-ring",
              onHero ? "text-slate-200 hover:text-white" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Nous contacter
          </Link>
          <Link
            href="/devis"
            className="ml-1 inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-blue-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700 focus-ring"
          >
            Demander un devis
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <FavoritesLink onHero={onHero} />
          <button
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm font-semibold shadow-sm transition-colors focus-ring xl:hidden",
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
              {/* Navigation des pages — masquée quand la barre les affiche déjà (xl+) */}
              <div className="xl:hidden">
                <Link
                  href="/"
                  className={cn(
                    "mb-3 flex items-center gap-3 rounded-xl px-4 py-3 transition-colors focus-ring",
                    pathname === "/" ? "bg-blue-500/10 text-blue-500" : "hover:bg-muted"
                  )}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-600/10 text-blue-600">
                    <Home className="h-[18px] w-[18px]" />
                  </span>
                  <span className="font-medium">Accueil</span>
                </Link>

                <p className="px-1 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {FEATURES_TITLE}
                </p>
                <ul className="grid gap-1">
                  {featureItems.map((item) => {
                    const Icon = (item.icon && iconMap[item.icon]) || Sparkles;
                    const active = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-start gap-3 rounded-xl px-4 py-3 transition-colors focus-ring",
                            active ? "bg-blue-500/10" : "hover:bg-muted"
                          )}
                        >
                          <span
                            className={cn(
                              "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                              active ? "bg-blue-600 text-white" : "bg-blue-600/10 text-blue-600"
                            )}
                          >
                            <Icon className="h-[18px] w-[18px]" />
                          </span>
                          <span className="min-w-0">
                            <span className={cn("block font-medium", active && "text-blue-500")}>{item.label}</span>
                            <span className="block text-xs text-muted-foreground">{item.desc}</span>
                          </span>
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
