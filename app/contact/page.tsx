import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { PageHeader, DemoSection } from "@/components/demo";
import { IntroExplainer } from "@/components/intro-explainer";

export const metadata = { title: "Présentation & Contact" };

const infos = [
  { icon: MapPin, label: "Adresse", value: "12 rue du Fournil, 75011 Paris" },
  { icon: Phone, label: "Téléphone", value: "01 23 45 67 89" },
  { icon: Mail, label: "E-mail", value: "bonjour@maison-doree.fr" },
  { icon: Clock, label: "Horaires", value: "Mar – Dim · 7h – 19h30" },
];

const horaires = [
  { jour: "Lundi", h: "Fermé" },
  { jour: "Mardi", h: "7h00 – 19h30" },
  { jour: "Mercredi", h: "7h00 – 19h30" },
  { jour: "Jeudi", h: "7h00 – 19h30" },
  { jour: "Vendredi", h: "7h00 – 19h30" },
  { jour: "Samedi", h: "7h00 – 20h00" },
  { jour: "Dimanche", h: "7h00 – 13h00" },
];

const reseaux = [
  { icon: Instagram, label: "Instagram", handle: "@lamaisondoree", href: "#" },
  { icon: Facebook, label: "Facebook", handle: "La Maison Dorée", href: "#" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Présentation & Contact"
        title="Présenter votre entreprise"
        description="Tous les blocs pour une page « qui sommes-nous » et contact : identité, chiffres, coordonnées, carte, horaires, réseaux, équipe et formulaire. Choisissez ceux que vous voulez."
      />

      <IntroExplainer
        title="À quoi sert une page de présentation ?"
        intro={
          <>
            <p className="text-lg">
              C'est la page « qui sommes-nous » et « contact » : elle raconte votre histoire et
              donne tout ce qu'il faut pour vous joindre ou venir vous voir.
            </p>
            <p>
              C'est comme une carte de visite en grand : votre nom, ce qui vous rend unique, vos
              coordonnées, vos horaires et le visage de votre équipe.
            </p>
            <p>
              Ci-dessous, chaque bloc est un exemple que vous pouvez garder ou non. On assemble
              ensuite ceux que vous préférez.
            </p>
          </>
        }
        oneLiner="Une bonne page de présentation rassure le visiteur et lui donne envie de vous faire confiance — et de vous contacter."
        aside={<p>Et ça compte : c'est souvent la dernière page consultée avant un appel ou une visite.</p>}
      />

      {/* Coordonnées */}
      <DemoSection title="Coordonnées · infos pratiques" hint="Adresse, téléphone, e-mail et horaires, bien présentés avec icônes.">
        <div className="grid gap-4 rounded-3xl border border-border bg-card p-8 sm:grid-cols-2">
          {infos.map((i) => (
            <div key={i.label} className="flex items-start gap-4">
              <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blue-600/10 text-blue-600">
                <i.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{i.label}</p>
                <p className="text-lg font-medium">{i.value}</p>
              </div>
            </div>
          ))}
        </div>
      </DemoSection>

      {/* Carte Google */}
      <DemoSection title="Carte Google · plan d'accès" hint="Une carte interactive intégrée, avec un bouton pour lancer l'itinéraire.">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl border border-border">
            <iframe
              title="Plan d'accès Google Maps"
              src="https://www.google.com/maps?q=12+rue+du+Fournil+Paris+11e&z=15&output=embed"
              className="h-[360px] w-full border-0 md:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=12+rue+du+Fournil+75011+Paris"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-ring"
          >
            <MapPin className="h-4 w-4" /> Itinéraire vers la boutique
          </a>
        </div>
      </DemoSection>

      {/* Horaires */}
      <DemoSection title="Horaires d'ouverture" hint="Le tableau jour par jour, avec les jours de fermeture bien visibles.">
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Clock className="h-5 w-5 text-blue-600" /> Cette semaine
          </h3>
          <ul className="mt-4 divide-y divide-border">
            {horaires.map((h) => (
              <li key={h.jour} className="flex items-center justify-between py-2.5">
                <span className="font-medium">{h.jour}</span>
                <span className={h.h === "Fermé" ? "text-muted-foreground" : "text-foreground"}>{h.h}</span>
              </li>
            ))}
          </ul>
        </div>
      </DemoSection>

      {/* Réseaux sociaux */}
      <DemoSection title="Réseaux sociaux" hint="Des liens vers vos pages pour prolonger la relation après la visite.">
        <div className="grid gap-3 sm:grid-cols-2">
          {reseaux.map((r) => (
            <a
              key={r.label}
              href={r.href}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-blue-600 hover:bg-blue-600/5 focus-ring"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blue-600/10 text-blue-600">
                <r.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-medium">{r.label}</p>
                <p className="text-sm text-muted-foreground">{r.handle}</p>
              </div>
            </a>
          ))}
        </div>
      </DemoSection>


    </>
  );
}
