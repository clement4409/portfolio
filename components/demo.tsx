"use client";

import { motion } from "framer-motion";
import { Code2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { FavoriteHeart } from "./favorites";

/** Turn a section title into a stable, URL-safe anchor id. */
function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Scroll-triggered reveal wrapper used across all demo pages. */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Page intro header for every demo category page. */
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="container pt-32 pb-12 md:pt-40 md:pb-16 text-center">
      <Reveal>
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-balance">
          {title}
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground text-balance">
          {description}
        </p>
      </Reveal>
    </header>
  );
}

/** Wraps a single feature demonstration with an explanatory label. */
export function DemoSection({
  title,
  hint,
  children,
  className,
  contained = true,
  code = false,
  favorite = true,
  moreHref,
  moreLabel,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
  className?: string;
  contained?: boolean;
  code?: boolean;
  favorite?: boolean;
  moreHref?: string;
  moreLabel?: string;
}) {
  const pathname = usePathname();
  const slug = slugify(title);
  const id = `${pathname}#${slug}`;

  return (
    <section id={slug} className={cn("scroll-mt-24 py-10 md:py-14", className)}>
      <div className="container">
        <Reveal>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4">
            <div className="flex items-start gap-3">
              {favorite && (
                <FavoriteHeart id={id} label={title} href={`${pathname}#${slug}`} className="mt-0.5" />
              )}
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
                {hint && <p className="mt-1 text-sm text-muted-foreground">{hint}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {moreHref && (
                <Link
                  href={moreHref}
                  className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-500 focus-ring"
                >
                  {moreLabel ?? "Voir plus"} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
              {code && (
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary hover:border-primary focus-ring"
                >
                  <Code2 className="h-3.5 w-3.5" /> Voir le code
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
      {contained ? (
        <div className="container">
          <Reveal>{children}</Reveal>
        </div>
      ) : (
        children
      )}
    </section>
  );
}
