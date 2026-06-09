import Link from "next/link";
import Image from "next/image";
import { Camera, Video, Check, Clock, MapPin, ArrowRight, Sparkles, Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/demo";
import { assets } from "@/lib/assets";

export const metadata = {
  title: "Shooting photo & vidéo",
  description: "Louis photographie et filme votre commerce, de 100 à 250 € selon le temps et le nombre de photos.",
};

const inclus = [
  { icon: Camera, title: "Photos retouchées", desc: "Vos produits, votre boutique et votre équipe, mis en valeur et prêts pour le web." },
  { icon: Video, title: "Option vidéo", desc: "De courtes vidéos verticales pour vos réseaux (Instagram, TikTok…)." },
  { icon: Sparkles, title: "Retouche soignée", desc: "Lumière, couleurs et cadrage ajustés pour un rendu professionnel." },
  { icon: MapPin, title: "Déplacement inclus", desc: "Louis vient sur place, dans votre commerce, aux horaires qui vous arrangent." },
];

const formules = [
  {
    name: "Essentiel",
    price: "100 €",
    duree: "≈ 1 h sur place",
    points: ["15 photos retouchées", "Produits ou boutique", "Livraison sous 5 jours"],
    featured: false,
  },
  {
    name: "Standard",
    price: "175 €",
    duree: "≈ 2 h sur place",
    points: ["30 photos retouchées", "Produits + boutique + ambiance", "Livraison sous 5 jours"],
    featured: true,
  },
  {
    name: "Complet",
    price: "250 €",
    duree: "≈ une demi-journée",
    points: ["50 photos retouchées", "Une courte vidéo pour les réseaux", "Produits, boutique, équipe & ambiance"],
    featured: false,
  },
];

const etapes = [
  { n: 1, title: "On échange", desc: "On discute de vos besoins, du lieu et de la date qui vous conviennent." },
  { n: 2, title: "Le jour J", desc: "Louis se déplace dans votre commerce et réalise les prises de vue." },
  { n: 3, title: "La retouche", desc: "Tri et retouche des meilleures images, montage vidéo si choisi." },
  { n: 4, title: "Livraison", desc: "Vous recevez vos photos prêtes à l'emploi, sous quelques jours." },
];

const heroPhotos = [assets[3], assets[7], assets[6], assets[8]];

export default function ShootingPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-slate-100">
        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="container grid items-center gap-14 pt-32 pb-20 md:pt-40 lg:grid-cols-2 lg:pb-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/15 px-4 py-1.5 text-sm font-medium text-blue-300">
              <Camera className="h-4 w-4" /> Photo &amp; vidéo · par Louis
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] text-balance md:text-6xl">
              Des photos qui donnent envie d'entrer
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-slate-300">
              Louis passe dans votre commerce pour photographier et filmer vos produits, votre
              vitrine et votre équipe. De quoi nourrir votre site et vos réseaux, avec de vraies
              images, pas des banques d'images sans âme.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-500">
                <Link href="/#contact">
                  Réserver un shooting <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Link
                href="#tarifs"
                className="text-sm font-medium text-slate-200 underline-offset-4 hover:text-white hover:underline focus-ring rounded"
              >
                Voir les tarifs (dès 100 €)
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-2">
              <a
                href="https://www.youtube.com/@louis_joliveeet"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="La chaîne YouTube de Louis"
                className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-white/15 text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-ring"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/ljvideos_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="L'Instagram de Louis"
                className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-white/15 text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-ring"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <span className="ml-1 text-sm text-slate-400">Voir son travail</span>
            </div>
          </Reveal>

          {/* Collage façon viseur de caméra */}
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="grid grid-cols-2 gap-3 overflow-hidden rounded-3xl">
                {heroPhotos.map((a) => (
                  <div key={a.src} className="relative aspect-square overflow-hidden rounded-2xl ring-1 ring-white/10">
                    <Image src={a.src} alt={a.alt} fill sizes="(min-width:1024px) 25vw, 40vw" className="object-cover" />
                  </div>
                ))}
              </div>
              {/* coins de viseur */}
              <span className="pointer-events-none absolute -left-2 -top-2 h-7 w-7 border-l-2 border-t-2 border-blue-400/70" />
              <span className="pointer-events-none absolute -right-2 -top-2 h-7 w-7 border-r-2 border-t-2 border-blue-400/70" />
              <span className="pointer-events-none absolute -bottom-2 -left-2 h-7 w-7 border-b-2 border-l-2 border-blue-400/70" />
              <span className="pointer-events-none absolute -bottom-2 -right-2 h-7 w-7 border-b-2 border-r-2 border-blue-400/70" />
              {/* HUD */}
              <div className="pointer-events-none absolute inset-x-3 top-3 flex items-center justify-between font-mono text-[11px] text-white/80">
                <span className="flex items-center gap-1.5 rounded bg-black/40 px-2 py-1 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> REC
                </span>
                <span className="rounded bg-black/40 px-2 py-1 backdrop-blur-sm">4K · 60 fps</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* QUI EST LOUIS */}
      <section className="container py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <h2 className="text-3xl font-bold leading-tight text-balance md:text-4xl">
              Un jeune passionné, un regard neuf
            </h2>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Louis</strong> a notre âge et il est encore au
              lycée. La photo et la vidéo, il en fait depuis des années : d'abord pour le plaisir,
              aujourd'hui pour de vrais clients.
            </p>
            <p className="mt-4 max-w-prose leading-relaxed text-muted-foreground">
              Il vient avec son matériel et son œil : des produits qui donnent faim, l'ambiance de
              la boutique, des portraits de l'équipe. Tout ce qui rend votre commerce vivant à
              l'écran. Et comme pour nos sites, le tarif reste{" "}
              <strong className="text-foreground">accessible aux petits commerces</strong>.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 grid-rows-2 gap-3">
              <div className="relative col-span-2 aspect-[2/1] overflow-hidden rounded-2xl">
                <Image src={assets[13].src} alt={assets[13].alt} fill sizes="50vw" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src={assets[5].src} alt={assets[5].alt} fill sizes="25vw" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src={assets[9].src} alt={assets[9].alt} fill sizes="25vw" className="object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CE QUI EST INCLUS */}
      <section className="border-y border-border bg-slate-50 py-24 dark:bg-slate-900/40">
        <div className="container">
          <Reveal>
            <h2 className="text-3xl font-bold text-balance md:text-4xl">Ce qui est inclus</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Tout pour repartir avec des visuels prêts à publier.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {inclus.map((i, idx) => (
              <Reveal key={i.title} delay={(idx % 2) * 0.06}>
                <div className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-600/10 text-blue-600">
                    <i.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{i.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted-foreground">{i.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TARIFS */}
      <section id="tarifs" className="container scroll-mt-24 py-24">
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold text-balance md:text-4xl">Des tarifs clairs, de 100 à 250 €</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Trois formules selon l'ampleur du travail. Le prix exact se fixe ensemble.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl items-center gap-6 lg:grid-cols-3">
          {formules.map((f, idx) => (
            <Reveal key={f.name} delay={idx * 0.07}>
              <div
                className={
                  f.featured
                    ? "relative rounded-3xl bg-slate-950 p-8 text-slate-100 shadow-2xl shadow-blue-950/30 lg:-my-3 lg:p-10"
                    : "relative h-full rounded-3xl border border-border bg-card p-8"
                }
              >
                {f.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                    Le plus choisi
                  </span>
                )}
                <h3 className={f.featured ? "font-semibold text-blue-300" : "font-semibold text-muted-foreground"}>
                  {f.name}
                </h3>
                <p className="mt-3 font-serif text-5xl font-bold">{f.price}</p>
                <p className={"mt-2 flex items-center gap-1.5 text-sm " + (f.featured ? "text-slate-400" : "text-muted-foreground")}>
                  <Clock className="h-4 w-4" /> {f.duree}
                </p>
                <ul className="mt-7 space-y-3">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm">
                      <Check className={"mt-0.5 h-4 w-4 shrink-0 " + (f.featured ? "text-blue-400" : "text-blue-600")} />
                      <span className={f.featured ? "text-slate-200" : ""}>{p}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={f.featured ? "mt-8 w-full bg-blue-600 text-white hover:bg-blue-500" : "mt-8 w-full"}
                  variant={f.featured ? "primary" : "outline"}
                >
                  <Link href="/#contact">Réserver ce shooting</Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* COMMENT ÇA SE PASSE */}
      <section className="border-t border-border bg-slate-50 py-24 dark:bg-slate-900/40">
        <div className="container">
          <Reveal>
            <h2 className="text-3xl font-bold text-balance md:text-4xl">Comment ça se passe ?</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Quatre étapes, du premier message à la livraison.
            </p>
          </Reveal>

          <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* trait reliant les étapes (desktop) */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-border lg:block"
            />
            {etapes.map((e, idx) => (
              <Reveal key={e.n} delay={idx * 0.08}>
                <li className="relative">
                  <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-blue-600 font-serif text-lg font-bold text-white ring-4 ring-slate-50 dark:ring-slate-900/40">
                    {e.n}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{e.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted-foreground">{e.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-24">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-10 text-center text-slate-100 md:p-16">
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold text-balance md:text-4xl">
              Envie de photos qui donnent faim ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Dites-nous ce que vous voulez montrer. On cale une date avec Louis et on fixe le prix
              avant de commencer.
            </p>
            <Button asChild size="lg" className="mt-8 bg-blue-600 text-white hover:bg-blue-500">
              <Link href="/#contact">
                Demander un shooting <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
