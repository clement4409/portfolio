import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { PageHeader, DemoSection } from "@/components/demo";
import { IntroExplainer } from "@/components/intro-explainer";
import { GoogleReviews } from "@/components/google-reviews";
import { TestimonialSlider } from "@/components/carousels";
import { assets } from "@/lib/assets";

export const metadata = { title: "Témoignages & Avis" };

const reviews = [
  { name: "Camille R.", role: "La Maison Dorée", stars: 5, text: "Site magnifique, commandes en ligne doublées. Une équipe à l'écoute du début à la fin.", img: assets[14].src },
  { name: "Julien M.", role: "Le Pétrin du Coin", stars: 5, text: "Enfin un site à la hauteur de nos produits. Le menu du jour est un vrai plus.", img: assets[13].src },
  { name: "Sophie L.", role: "Boulangerie Léa", stars: 5, text: "Du shooting photo à la mise en ligne, accompagnement impeccable.", img: assets[16].src },
  { name: "Karim B.", role: "Au Bon Pain", stars: 4, text: "Très réactifs, design soigné. Nos clients trouvent enfin nos horaires !", img: assets[15].src },
  { name: "Élodie T.", role: "Fournil & Co", stars: 5, text: "Le click & collect a transformé notre activité du week-end.", img: assets[0].src },
  { name: "Paul V.", role: "Le Croissant d'Or", stars: 5, text: "Un site rapide, beau et facile à mettre à jour nous-mêmes.", img: assets[3].src },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} étoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < n ? "fill-primary text-primary" : "text-border"}`} />
      ))}
    </div>
  );
}

export default function TemoignagesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Témoignages & Avis"
        title="Ce que disent nos boulangers"
        description="Grille d'avis notés, slider, avis Google, citation featured et logos clients."
      />

      <IntroExplainer
        title="À quoi servent les témoignages ?"
        intro={
          <>
            <p className="text-lg">
              Les témoignages, ce sont les avis de vos clients affichés sur le site : une phrase,
              une note en étoiles, parfois une photo ou un avis Google.
            </p>
            <p>
              C'est le bouche-à-oreille, version Internet : on fait davantage confiance à un
              commerce quand d'autres en disent du bien.
            </p>
            <p>
              On peut les présenter en grille, en diaporama, ou mettre en avant le plus
              élogieux.
            </p>
          </>
        }
        oneLiner="Les témoignages rassurent les nouveaux visiteurs en montrant que d'autres vous font déjà confiance."
        aside={
          <p>
            Et ça compte : un avis positif bien visible peut faire pencher la balance au moment de
            choisir.
          </p>
        }
      />

      <DemoSection title="Grille de témoignages" hint="Photo, nom, note étoiles et avis.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <article key={r.name} className="rounded-2xl border border-border bg-card p-6">
              <Stars n={r.stars} />
              <p className="mt-4 text-muted-foreground">« {r.text} »</p>
              <footer className="mt-5 flex items-center gap-3">
                <div className="relative h-11 w-11 overflow-hidden rounded-full"><Image src={r.img} alt={r.name} fill sizes="44px" className="object-cover" /></div>
                <div><p className="font-medium">{r.name}</p><p className="text-xs text-muted-foreground">{r.role}</p></div>
              </footer>
            </article>
          ))}
        </div>
      </DemoSection>

      <DemoSection title="Carrousel de témoignages" hint="Un avis à la fois, avec navigation.">
        <TestimonialSlider />
      </DemoSection>

      <DemoSection title="Avis Google (style)" hint="Reproduction de l'encart d'avis Google.">
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <span className="font-serif text-4xl font-bold">4,9</span>
            <div><Stars n={5} /><p className="mt-1 text-sm text-muted-foreground">Basé sur 327 avis Google</p></div>
          </div>
          <div className="mt-4 space-y-2">
            {[{ s: 5, p: 86 }, { s: 4, p: 10 }, { s: 3, p: 3 }, { s: 2, p: 1 }, { s: 1, p: 0 }].map((row) => (
              <div key={row.s} className="flex items-center gap-2 text-sm">
                <span className="w-3 text-muted-foreground">{row.s}</span>
                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted"><div className="h-full bg-primary" style={{ width: `${row.p}%` }} /></div>
                <span className="w-8 text-right text-xs text-muted-foreground">{row.p}%</span>
              </div>
            ))}
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Vrais avis Google · en direct" hint="Les avis sont récupérés automatiquement depuis votre fiche Google Maps, via l'API officielle.">
        <GoogleReviews />
      </DemoSection>

      <DemoSection title="Témoignage featured" hint="Grande citation mise en avant.">
        <figure className="relative overflow-hidden rounded-3xl bg-pain p-10 text-center text-creme md:p-16">
          <Quote className="mx-auto h-12 w-12 text-ble-300/40" />
          <blockquote className="mx-auto mt-6 max-w-3xl font-accent text-2xl italic md:text-4xl">
            « BoulangeStudio n'a pas juste fait un site, ils ont capturé l'âme de notre maison. »
          </blockquote>
          <figcaption className="mt-8 flex items-center justify-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full"><Image src={assets[14].src} alt="Camille R." fill sizes="48px" className="object-cover" /></div>
            <div className="text-left"><p className="font-semibold">Camille Renaud</p><p className="text-sm text-creme/70">Gérante, La Maison Dorée</p></div>
          </figcaption>
        </figure>
      </DemoSection>

      <DemoSection title="Ils nous font confiance" hint="Logos clients en grille sobre.">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
          {["La Maison Dorée", "Le Pétrin", "Boulangerie Léa", "Au Bon Pain", "Fournil & Co", "Le Croissant d'Or"].map((l) => (
            <div key={l} className="grid aspect-video place-items-center bg-card p-4 text-center font-serif text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">{l}</div>
          ))}
        </div>
      </DemoSection>
    </>
  );
}
