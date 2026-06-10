"use client";

import Link from "next/link";
import { Heart, ArrowRight, X, MousePointerClick, Send } from "lucide-react";
import { useFavorites } from "@/components/favorites";
import { navItems } from "@/lib/nav";

// Libellés de page alignés sur la navbar (« Ce que l'on peut créer pour vous »).
const pageLabels: Record<string, string> = Object.fromEntries(
  navItems.map((item) => [item.href, item.label])
);

// Comment ça marche, en trois étapes.
const steps = [
  {
    icon: MousePointerClick,
    title: "Repérez ce qui vous plaît",
    desc: "Parcourez « Ce que l'on peut créer pour vous » : galeries, carrousels, formulaires… Chaque exemple est une fonctionnalité réelle, intégrable à votre site.",
  },
  {
    icon: Heart,
    title: "Ajoutez-le à vos favoris",
    desc: "Un clic sur le cœur à côté d'un exemple le met de côté ici. Composez petit à petit le site qui vous ressemble.",
  },
  {
    icon: Send,
    title: "Envoyez-nous votre sélection",
    desc: "Votre liste de favoris devient la base de votre demande de devis : on sait exactement ce que vous voulez, et on le chiffre.",
  },
];

export default function FavorisPage() {
  const { favorites, remove } = useFavorites();

  return (
    <section className="container min-h-[70vh] pt-32 pb-24 md:pt-40">
      <header className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-4 py-1.5 text-sm font-medium text-blue-600">
          <Heart className="h-4 w-4 fill-blue-600" /> Vos favoris
        </span>
        <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-balance">
          Composez le site qui vous ressemble
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          Partout sur le site, chaque exemple est une fonctionnalité qu'on peut intégrer à
          <strong className="font-semibold text-foreground"> votre</strong> site. Gardez ici
          celles qui vous plaisent : votre sélection devient le point de départ de votre projet.
        </p>
      </header>

      {/* Comment ça marche */}
      <ol className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-600/10 text-blue-600">
                <s.icon className="h-5 w-5" />
              </span>
              <span className="font-serif text-sm font-bold text-blue-600">Étape {i + 1}</span>
            </div>
            <h2 className="mt-4 font-semibold">{s.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
          </li>
        ))}
      </ol>

      {favorites.length > 0 && (
        <div className="mt-8 text-center">
          <Link
            href="/devis"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-ring"
          >
            Partager mes favoris dans une demande <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {favorites.length === 0 ? (
        <div className="mx-auto mt-16 max-w-md rounded-3xl border border-border bg-card p-10 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-blue-600/10 text-blue-600">
            <Heart className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-xl font-semibold">Votre sélection est vide</h2>
          <p className="mt-2 text-muted-foreground">
            Explorez les fonctionnalités et cliquez sur le cœur de celles que vous
            aimeriez retrouver sur votre site.
          </p>
          <Link
            href="/heroes"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-ring"
          >
            Explorer les fonctionnalités <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <ul className="mx-auto mt-10 grid max-w-3xl gap-4">
          {favorites.map((f) => {
            const page = f.href.split("#")[0];
            return (
              <li
                key={f.id}
                className="flex min-w-0 items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-md"
              >
                <Link href={f.href} className="group flex min-w-0 flex-1 items-center gap-4 focus-ring rounded">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-600/10 text-blue-600">
                    <Heart className="h-4 w-4 fill-blue-600" />
                  </span>
                  <span className="block min-w-0 flex-1">
                    <span className="block truncate font-semibold group-hover:text-blue-600">{f.label}</span>
                    <span className="block truncate text-sm text-muted-foreground">{pageLabels[page] ?? page}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
                <button
                  type="button"
                  onClick={() => remove(f.id)}
                  aria-label={`Retirer « ${f.label} » des favoris`}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-red-500 hover:text-red-500 focus-ring"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
