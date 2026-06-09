import { Star } from "lucide-react";

/** Un avis tel que renvoyé par l'API Google Places (v1). */
type GoogleReview = {
  authorAttribution?: { displayName?: string; photoUri?: string };
  rating?: number;
  text?: { text?: string };
  relativePublishingTimeDescription?: string;
};

type PlaceData = {
  name?: string;
  rating?: number;
  total?: number;
  reviews: GoogleReview[];
};

/**
 * Jeu d'avis de démonstration (boulangerie parisienne fictive) affiché tant que
 * l'API Google n'est pas configurée. Noms et textes inventés mais crédibles.
 */
const sampleData: PlaceData = {
  name: "Maison Lefèvre — Boulangerie (Paris 11e)",
  rating: 4.9,
  total: 487,
  reviews: [
    {
      authorAttribution: { displayName: "Camille Dubois" },
      rating: 5,
      text: { text: "La meilleure baguette tradition du quartier, croustillante à souhait. On fait un peu la queue le matin, mais ça vaut largement le coup !" },
      relativePublishingTimeDescription: "il y a 2 semaines",
    },
    {
      authorAttribution: { displayName: "Thomas Renaud" },
      rating: 5,
      text: { text: "Croissants pur beurre incroyables, feuilletage parfait et bien dorés. L'accueil est toujours chaleureux et souriant." },
      relativePublishingTimeDescription: "il y a 1 mois",
    },
    {
      authorAttribution: { displayName: "Léa Moreau" },
      rating: 5,
      text: { text: "Le pain au levain est exceptionnel et se conserve plusieurs jours. Une vraie boulangerie artisanale comme on en trouve trop peu." },
      relativePublishingTimeDescription: "il y a 3 semaines",
    },
  ],
};

/**
 * Récupère les avis réels depuis l'API Google Places.
 * Nécessite deux variables d'environnement :
 *  - GOOGLE_PLACES_API_KEY : clé API Google (Places API "New" activée)
 *  - GOOGLE_PLACE_ID       : identifiant de la fiche établissement
 * Renvoie null si la configuration est absente ou si l'appel échoue.
 */
async function fetchGoogleReviews(): Promise<PlaceData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?languageCode=fr`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        // Met les avis en cache 24 h pour ne pas appeler l'API à chaque visite.
        next: { revalidate: 86400 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      rating: data.rating,
      total: data.userRatingCount,
      reviews: (data.reviews ?? []) as GoogleReview[],
    };
  } catch {
    return null;
  }
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={i < n ? "h-4 w-4 fill-yellow-400 text-yellow-400" : "h-4 w-4 text-muted-foreground/40"}
        />
      ))}
    </div>
  );
}

export async function GoogleReviews() {
  // Vraie API si configurée, sinon avis de démonstration.
  const data = (await fetchGoogleReviews()) ?? sampleData;

  if (data.reviews.length === 0) {
    return <p className="text-sm text-muted-foreground">Aucun avis Google pour l'instant.</p>;
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {typeof data.rating === "number" && (
          <>
            <span className="font-serif text-4xl font-bold">{data.rating.toFixed(1)}</span>
            <div>
              <Stars n={Math.round(data.rating)} />
              <p className="mt-1 text-sm text-muted-foreground">
                {data.name ? `${data.name} · ` : ""}
                {data.total ?? data.reviews.length} avis Google
              </p>
            </div>
          </>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {data.reviews.map((r, i) => {
          const name = r.authorAttribution?.displayName ?? "Client Google";
          const initials = name
            .split(" ")
            .map((w) => w[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
          return (
            <article key={i} className="rounded-2xl border border-border bg-card p-6">
              <Stars n={Math.round(r.rating ?? 0)} />
              <p className="mt-4 text-muted-foreground">« {r.text?.text ?? ""} »</p>
              <footer className="mt-5 flex items-center gap-3">
                {r.authorAttribution?.photoUri ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={r.authorAttribution.photoUri}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-blue-600/10 text-sm font-semibold text-blue-600">
                    {initials}
                  </span>
                )}
                <div>
                  <p className="text-sm font-medium">{name}</p>
                  {r.relativePublishingTimeDescription && (
                    <p className="text-xs text-muted-foreground">{r.relativePublishingTimeDescription}</p>
                  )}
                </div>
              </footer>
            </article>
          );
        })}
      </div>
    </div>
  );
}
