"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export type Favorite = { id: string; label: string; href: string };

type FavoritesContextValue = {
  favorites: Favorite[];
  isFavorite: (id: string) => boolean;
  toggle: (item: Favorite) => void;
  remove: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);
const STORAGE_KEY = "ac-favorites";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {
      /* ignore malformed storage */
    }
    setLoaded(true);
  }, []);

  // Persist whenever the list changes (after initial hydration).
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      /* ignore quota errors */
    }
  }, [favorites, loaded]);

  const isFavorite = useCallback(
    (id: string) => favorites.some((f) => f.id === id),
    [favorites]
  );

  const toggle = useCallback((item: Favorite) => {
    setFavorites((prev) =>
      prev.some((f) => f.id === item.id)
        ? prev.filter((f) => f.id !== item.id)
        : [...prev, item]
    );
  }, []);

  const remove = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggle, remove }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites doit être utilisé dans un FavoritesProvider");
  return ctx;
}

/** Small clickable heart that adds/removes the item from favourites. */
export function FavoriteHeart({ id, label, href, className }: Favorite & { className?: string }) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(id);

  return (
    <button
      type="button"
      onClick={() => toggle({ id, label, href })}
      aria-pressed={active}
      title={active ? "Retirer des favoris" : "Ajouter aux favoris"}
      aria-label={active ? `Retirer « ${label} » des favoris` : `Ajouter « ${label} » aux favoris`}
      className={cn(
        "group grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors focus-ring",
        active ? "border-blue-600 bg-blue-600/10" : "border-border hover:border-blue-600",
        className
      )}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-all duration-200",
          active
            ? "scale-110 fill-blue-600 text-blue-600"
            : "text-muted-foreground group-hover:text-blue-600"
        )}
      />
    </button>
  );
}
