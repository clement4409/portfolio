"use client";

import Link from "next/link";
import { Heart, ArrowRight, X } from "lucide-react";
import { useFavorites } from "@/components/favorites";

// Jolis libellés de page à partir du chemin (/heroes -> Héros, etc.)
const pageLabels: Record<string, string> = {
  "/": "Accueil",
  "/heroes": "Héros",
  "/galeries": "Images & Galeries",
  "/videos": "Vidéos",
  "/carousels": "Carrousels",
  "/animations": "Animations",
  "/formulaires": "Formulaires",
  "/navigation": "Navigation",
  "/cartes": "Tarifs",
  "/temoignages": "Témoignages",
  "/contact": "Présentation",
  "/footer": "Footers",
};

export default function FavorisPage() {
  const { favorites, remove } = useFavorites();

  return (
    <section className="container min-h-[70vh] pt-32 pb-24 md:pt-40">
      <header className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-4 py-1.5 text-sm font-medium text-blue-600">
          <Heart className="h-4 w-4 fill-blue-600" /> Vos favoris
        </span>
        <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-balance">
          Les démos que vous avez aimées
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          Cliquez sur le cœur à côté de n'importe quel exemple du site pour le retrouver ici.
        </p>
      </header>

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
          <h2 className="mt-5 text-xl font-semibold">Aucun favori pour l'instant</h2>
          <p className="mt-2 text-muted-foreground">
            Parcourez nos démonstrations et ajoutez celles qui vous plaisent.
          </p>
          <Link
            href="/heroes"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-ring"
          >
            Découvrir les héros <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <ul className="mx-auto mt-14 grid max-w-3xl gap-4">
          {favorites.map((f) => {
            const page = f.href.split("#")[0];
            return (
              <li
                key={f.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-md"
              >
                <Link href={f.href} className="group flex min-w-0 flex-1 items-center gap-4 focus-ring rounded">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-600/10 text-blue-600">
                    <Heart className="h-4 w-4 fill-blue-600" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-semibold group-hover:text-blue-600">{f.label}</span>
                    <span className="block text-sm text-muted-foreground">{pageLabels[page] ?? page}</span>
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
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
