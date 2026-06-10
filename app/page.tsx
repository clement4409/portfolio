import Link from "next/link";
import {
  ArrowRight, Smartphone, Tablet, Monitor, Wallet, HeartHandshake,
  Sparkles, Zap, Camera, Aperture, Youtube, Instagram,
  Server, RefreshCw, ShieldCheck, Database, LifeBuoy, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/demo";
import { Counter } from "@/components/counter";
import { AnimatedHero } from "@/components/ui/animated-hero-section";
import { ContactMessage } from "@/components/contact-message";

const devices = [
  { icon: Smartphone, label: "Téléphone" },
  { icon: Tablet, label: "Tablette" },
  { icon: Monitor, label: "Ordinateur" },
];

const reasons = [
  { icon: Wallet, title: "Tarifs accessibles", desc: "Des solutions professionnelles pensées pour le budget des petites entreprises." },
  { icon: HeartHandshake, title: "Accompagnement personnalisé", desc: "Un suivi humain, de la première idée à la mise en ligne et au-delà." },
  { icon: Sparkles, title: "Sites modernes", desc: "Des designs soignés, innovants et adaptés à tous les appareils." },
  { icon: Zap, title: "Réactivité", desc: "Des réponses rapides et des modifications réalisées sans attendre." },
  { icon: Camera, title: "Des photos qui donnent faim", desc: "Un shooting photo et vidéo par Louis pour mettre vos produits et votre boutique en valeur." },
  { icon: Server, title: "On s'occupe de tout", desc: "Hébergement, mises à jour, sécurité et sauvegardes : votre site reste en ligne, vous gardez l'esprit tranquille." },
];

const stats = [
  { to: 599, prefix: "", suffix: " €", label: "Site web, à partir de" },
  { to: 3, suffix: "", label: "Formules au choix" },
  { to: 20, prefix: "≈ ", suffix: " €/mois", label: "Hébergement géré, tout compris" },
  { to: 100, suffix: "%", label: "Responsive, tous écrans" },
];

const packs = [
  {
    name: "Pack Business",
    price: "599 €",
    note: "à partir de",
    desc: "Pour être visible et inspirer confiance en ligne.",
    featured: false,
    features: [
      "Site vitrine moderne & responsive",
      "Galerie photos",
      "Formulaire de contact",
      "Google Maps & SEO local",
      "Réservation / précommande",
      "E-mails automatiques",
    ],
  },
  {
    name: "Pack Premium",
    price: "999 €",
    note: "à partir de",
    desc: "Pour vendre directement en ligne.",
    featured: true,
    features: [
      "Tout le Pack Business",
      "Boutique en ligne + paiement sécurisé",
      "Automatisations",
      "Micro-IA pour guider vos clients",
    ],
  },
  {
    name: "Pack visuel premium",
    price: "299 €",
    note: "à partir de",
    desc: "Vos visuels mis en valeur et intégrés à votre site.",
    featured: false,
    features: ["Intégration de vos photos & vidéos", "Retouche & optimisation web", "Mise en valeur de vos produits", "Clé en main"],
  },
];

const hosting = [
  { icon: Server, title: "Hébergement rapide & fiable", tag: "99,9 % en ligne", desc: "Vos sites tournent sur l'infrastructure Hostinger, performante et toujours en ligne." },
  { icon: RefreshCw, title: "Mises à jour régulières", tag: "Automatique", desc: "On garde votre site à jour et fonctionnel, sans que vous ayez à y penser." },
  { icon: ShieldCheck, title: "Sécurité & certificat SSL", tag: "HTTPS", desc: "Connexion HTTPS, surveillance et protection contre les menaces courantes." },
  { icon: Database, title: "Sauvegardes automatiques", tag: "Quotidien", desc: "Vos données sont sauvegardées et récupérables en cas de souci." },
  { icon: LifeBuoy, title: "Support réactif", tag: "Inclus", desc: "Une question ou une modification ? On s'en occupe rapidement." },
];

export default function Home() {
  return (
    <>
      {/* HERO — animated pong canvas */}
      <AnimatedHero />

      {/* HISTOIRE / MISSION */}
      <section className="container grid items-start gap-12 py-24 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            Deux élèves passionnés, une agence digitale
          </h2>
          <p className="mt-5 text-muted-foreground">
            A&amp;C Agency est une agence digitale fondée par Adam et Clément, deux
            élèves de Première spécialité NSI passionnés par l'informatique, le
            développement web et les nouvelles technologies.
          </p>
          <p className="mt-4 text-muted-foreground">
            Nous avons créé cette agence pour financer nos études, acquérir une
            expérience professionnelle concrète et aider les entreprises locales à
            développer leur présence sur Internet.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-border bg-card p-8">
            <h3 className="text-2xl font-bold">Notre mission : rendre le numérique accessible aux petites entreprises</h3>
            <p className="mt-4 text-muted-foreground">
              Aujourd'hui, de nombreux commerces et artisans ne disposent pas d'un
              site web moderne ou sont peu visibles sur Internet. Notre objectif est
              de leur proposer des solutions professionnelles, modernes et accessibles
              afin de développer leur visibilité et leur activité.
            </p>
          </div>
        </Reveal>
      </section>

      {/* CE QUE NOUS FAISONS */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-24">
        <div className="container text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-balance">Des sites web qui mettent votre image en valeur</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Conception de sites modernes, rapides et adaptés à tous les appareils.
              Chaque site est pensé pour valoriser votre entreprise et attirer de
              nouveaux clients.
            </p>
          </Reveal>
          <div className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-4">
            {devices.map((d, i) => (
              <Reveal key={d.label} delay={i * 0.08}>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-6 py-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600/10 text-blue-600">
                    <d.icon className="h-5 w-5" />
                  </span>
                  <span className="font-semibold">{d.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI NOUS CHOISIR */}
      <section className="container py-24">
        <Reveal className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-balance">Pourquoi nous choisir comme partenaire</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 0.06}>
              <div className="group h-full rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-600/10 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <r.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{r.title}</h3>
                <p className="mt-2 text-muted-foreground">{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HÉBERGEMENT GÉRÉ */}
      <section className="border-y border-border bg-slate-50 py-24 dark:bg-slate-900/40">
        <div className="container grid items-center gap-x-16 gap-y-12 lg:grid-cols-[1fr_1.05fr]">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-4 py-1.5 text-sm font-medium text-blue-600">
              <Server className="h-4 w-4" /> Hébergement &amp; maintenance
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-tight text-balance md:text-4xl">
              On met votre site en ligne, et on s'occupe de tout
            </h2>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-muted-foreground">
              Une fois votre site terminé, on l'héberge sur{" "}
              <a
                href="https://www.hostinger.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 underline-offset-4 hover:underline"
              >
                Hostinger
              </a>{" "}
              et on gère tout pour vous : mises à jour, sécurité, sauvegardes et petites
              modifications. Vous n'avez rien d'autre à faire que votre métier.
            </p>

            <div className="mt-8 flex items-baseline gap-2">
              <span className="font-serif text-5xl font-bold tabular-nums text-blue-600">≈ 20 €</span>
              <span className="text-muted-foreground">/ mois, tout compris, sans engagement.</span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-500">
                <Link href="/devis">
                  Créer un devis <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://www.hostinger.com/" target="_blank" rel="noopener noreferrer">
                  <Server className="h-4 w-4" /> Voir Hostinger
                </a>
              </Button>
            </div>
          </Reveal>

          {/* Garanties — liste claire, sans encadré */}
          <Reveal delay={0.1}>
            <ul className="divide-y divide-border">
              {hosting.map((h) => (
                <li key={h.title} className="flex items-center gap-4 py-4 first:pt-0">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-blue-600/10 text-blue-600">
                    <h.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold">{h.title}</h3>
                    <p className="mt-0.5 leading-snug text-muted-foreground">{h.desc}</p>
                  </div>
                  <span className="hidden shrink-0 rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-medium text-blue-600 sm:inline">
                    {h.tag}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* SHOOTING PHOTO — service de Louis */}
      <section className="relative overflow-hidden border-y border-blue-600/10 bg-blue-600/[0.04] py-28 dark:bg-blue-600/[0.07] md:py-32">
        <div className="pointer-events-none absolute -right-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="container relative grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-4 py-1.5 text-sm font-medium text-blue-600">
              <Camera className="h-4 w-4" /> Nouveau service · Photo &amp; vidéo
            </span>
            <h2 className="mt-6 text-4xl font-bold leading-tight text-balance md:text-5xl">
              Vos produits méritent de belles photos
            </h2>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-muted-foreground">
              Louis a notre âge et il est encore au lycée, mais il photographie et filme depuis des
              années. Il passe dans votre commerce et capte ce qui donne envie d'entrer : le
              croissant qui sort du four, votre vitrine, les visages derrière le comptoir.
            </p>
            <p className="mt-4 max-w-prose leading-relaxed text-muted-foreground">
              Comptez entre <strong className="text-foreground">100 et 250 €</strong>, selon le
              temps sur place et le nombre de photos. Le prix se fixe ensemble, avant de commencer.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-500">
                <Link href="/shooting">
                  Voir les formules et tarifs <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.youtube.com/@louis_joliveeet"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="La chaîne YouTube de Louis"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-blue-600 hover:text-blue-600 focus-ring"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/ljvideos_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="L'Instagram de Louis"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-blue-600 hover:text-blue-600 focus-ring"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="hidden lg:block">
            <div className="relative flex aspect-square flex-col overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl ring-1 ring-white/10 md:p-8">
              {/* lueur bleue centrale */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/25 blur-3xl" />
              {/* coins de viseur */}
              <span className="absolute left-5 top-5 h-6 w-6 border-l-2 border-t-2 border-white/30" />
              <span className="absolute right-5 top-5 h-6 w-6 border-r-2 border-t-2 border-white/30" />
              <span className="absolute bottom-5 left-5 h-6 w-6 border-b-2 border-l-2 border-white/30" />
              <span className="absolute bottom-5 right-5 h-6 w-6 border-b-2 border-r-2 border-white/30" />

              {/* HUD haut */}
              <div className="relative flex items-center justify-between font-mono text-xs text-white/60">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500" /> REC
                </span>
                <span>4K · 60 fps</span>
              </div>

              {/* objectif */}
              <div className="relative grid flex-1 place-items-center">
                <div className="grid h-28 w-28 place-items-center rounded-full ring-2 ring-white/20">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-blue-600/20 ring-1 ring-white/15">
                    <Aperture className="h-9 w-9 text-blue-300" />
                  </div>
                </div>
              </div>

              {/* légende */}
              <div className="relative">
                <p className="font-serif text-2xl font-bold">Photo &amp; vidéo, sur place</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Produits", "Vitrine", "Équipe", "Réseaux"].map((t) => (
                    <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAITS — bande éditoriale */}
      <section className="bg-slate-950 py-20 text-slate-100">
        <div className="container grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-balance">
              Une agence jeune, des engagements concrets.
            </h2>
            <p className="mt-4 max-w-md text-slate-400">
              Pas de promesses floues : des sites livrés rapidement, à un prix juste,
              et un suivi assuré par les deux fondateurs eux-mêmes.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="divide-y divide-white/10">
              {stats.map((s) => (
                <div key={s.label} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="text-slate-400">{s.label}</dt>
                  <dd className="font-serif text-3xl font-bold text-blue-400">
                    <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* NOS FORMULES */}
      <section id="offres" className="scroll-mt-24 container py-24">
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold text-balance md:text-5xl">Nos formules</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Des offres claires, sans surprise. Le prix final dépend de vos besoins ; on le fixe
            ensemble, avant de commencer.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl items-stretch gap-6 lg:grid-cols-3">
          {packs.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.07}>
              <div
                className={
                  p.featured
                    ? "relative flex h-full flex-col rounded-3xl bg-slate-950 p-8 text-slate-100 shadow-2xl shadow-blue-950/30 lg:-my-3 lg:p-10"
                    : "relative flex h-full flex-col rounded-3xl border border-border bg-card p-8"
                }
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                    Le plus complet
                  </span>
                )}
                <h3 className={p.featured ? "font-semibold text-blue-300" : "font-semibold text-muted-foreground"}>
                  {p.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-bold tabular-nums">{p.price}</span>
                  <span className={"text-sm " + (p.featured ? "text-slate-400" : "text-muted-foreground")}>{p.note}</span>
                </div>
                <p className={"mt-3 text-sm " + (p.featured ? "text-slate-300" : "text-muted-foreground")}>{p.desc}</p>
                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className={"mt-0.5 h-4 w-4 shrink-0 " + (p.featured ? "text-blue-400" : "text-blue-600")} />
                      <span className={p.featured ? "text-slate-200" : ""}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={p.featured ? "mt-8 w-full bg-blue-600 text-white hover:bg-blue-500" : "mt-8 w-full"}
                  variant={p.featured ? "primary" : "outline"}
                >
                  <Link href="/devis">Créer un devis</Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          + Hébergement &amp; maintenance dès ≈ 20 €/mois, tout compris.
        </p>
      </section>

      {/* CONTACT + DEVIS */}
      <ContactMessage />

      {/* VISION + SLOGAN CTA */}
      <section className="relative overflow-hidden bg-slate-950 py-24 text-slate-100">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        </div>
        <div className="container relative z-10 text-center">
          <Reveal>
            <p className="mx-auto max-w-2xl text-lg text-slate-300">
              Notre vision : devenir une agence de confiance, capable d'accompagner
              les entreprises locales dans leur développement numérique. Notre
              ambition : construire des solutions utiles, accessibles et durables.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className="mx-auto mt-10 max-w-3xl text-3xl md:text-5xl font-bold text-balance">
              Construisons ensemble votre{" "}
              <span className="text-blue-400">présence numérique</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <Button asChild size="lg" className="mt-9 bg-blue-600 text-white hover:bg-blue-500">
              <Link href="#contact">Démarrer mon projet <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
