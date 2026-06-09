import { Wheat, Instagram, Facebook, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import { PageHeader, DemoSection } from "@/components/demo";
import { IntroExplainer } from "@/components/intro-explainer";

export const metadata = { title: "Exemples de Footers" };

export default function FooterPage() {
  return (
    <>
      <PageHeader
        eyebrow="Exemples de Footers"
        title="Soigner le bas de page"
        description="Quatre modèles de pied de page : multi-colonnes complet, minimaliste centré, avec carte et avec vague SVG. (Le footer du site est visible plus bas.)"
      />

      <IntroExplainer
        title="C'est quoi, un « footer » ?"
        intro={
          <>
            <p className="text-lg">
              Le footer, c'est le bas de page : la bande qu'on retrouve tout en bas de chaque page
              du site. (Celui de ce site est visible tout en bas.)
            </p>
            <p>
              C'est un peu la carte de visite du site : on y met les coordonnées, les horaires, les
              liens utiles, les réseaux sociaux et les mentions légales.
            </p>
            <p>
              Discret, mais essentiel : c'est souvent là qu'on cherche un numéro de téléphone ou
              une adresse.
            </p>
          </>
        }
        oneLiner="Le footer regroupe en bas de page tout ce qu'on cherche en dernier : contact, horaires et liens utiles."
        aside={
          <p>
            Et ça compte : un bas de page clair inspire confiance et facilite la prise de contact.
          </p>
        }
      />

      {/* 1. Multi-column complete */}
      <DemoSection title="Footer complet multi-colonnes" hint="Liens, contact, réseaux et newsletter.">
        <footer className="rounded-3xl bg-pain p-10 text-creme">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <p className="flex items-center gap-2 font-serif text-lg font-bold"><Wheat className="h-5 w-5 text-ble-300" /> La Maison Dorée</p>
              <p className="mt-3 text-sm text-creme/70">Boulangerie artisanale depuis 1947.</p>
              <div className="mt-4 flex gap-2">
                {[Instagram, Facebook, Linkedin].map((I, i) => <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-creme/10 hover:bg-primary hover:text-pain transition-colors focus-ring" aria-label="Réseau"><I className="h-4 w-4" /></a>)}
              </div>
            </div>
            {[
              { t: "Produits", l: ["Pains", "Viennoiseries", "Pâtisseries", "Salé"] },
              { t: "Maison", l: ["Notre histoire", "L'équipe", "Recrutement", "Blog"] },
              { t: "Infos", l: ["Horaires", "Contact", "Livraison", "CGV"] },
            ].map((c) => (
              <div key={c.t}>
                <h3 className="font-serif">{c.t}</h3>
                <ul className="mt-3 space-y-2 text-sm text-creme/70">
                  {c.l.map((x) => <li key={x}><a href="#" className="hover:text-primary focus-ring rounded">{x}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-creme/10 pt-6 text-xs text-creme/50">© 2026 La Maison Dorée. Tous droits réservés.</div>
        </footer>
      </DemoSection>

      {/* 2. Minimalist centered */}
      <DemoSection title="Footer minimaliste centré" hint="Sobre et élégant pour les sites épurés.">
        <footer className="rounded-3xl border border-border bg-card py-12 text-center">
          <p className="flex items-center justify-center gap-2 font-serif text-xl font-bold"><Wheat className="h-5 w-5 text-primary" /> La Maison Dorée</p>
          <nav className="mt-5 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {["Accueil", "Produits", "Histoire", "Contact"].map((l) => <a key={l} href="#" className="hover:text-primary focus-ring rounded">{l}</a>)}
          </nav>
          <div className="mt-5 flex justify-center gap-3">
            {[Instagram, Facebook].map((I, i) => <a key={i} href="#" className="text-muted-foreground hover:text-primary focus-ring rounded" aria-label="Réseau"><I className="h-5 w-5" /></a>)}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">© 2026 — Fait avec passion.</p>
        </footer>
      </DemoSection>

      {/* 3. With map */}
      <DemoSection title="Footer avec carte intégrée" hint="Pratique pour qu'on trouve la boutique.">
        <footer className="grid overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-2">
          <div className="p-10">
            <p className="flex items-center gap-2 font-serif text-lg font-bold"><Wheat className="h-5 w-5 text-primary" /> La Maison Dorée</p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> 12 rue du Fournil, 75011 Paris</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> 01 23 45 67 89</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> bonjour@maisondoree.fr</li>
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">Ouvert du mardi au dimanche, 7h–20h.</p>
          </div>
          <iframe
            title="Carte de localisation"
            className="h-64 w-full lg:h-full"
            loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=2.36%2C48.85%2C2.39%2C48.87&layer=mapnik"
          />
        </footer>
      </DemoSection>

      {/* 4. Wave SVG */}
      <DemoSection title="Footer avec vague SVG" hint="Séparateur ondulé pour une transition douce." contained={false}>
        <div className="container">
          <div className="relative">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block h-16 w-full text-pain" aria-hidden>
              <path d="M0,0V46.29c47.79,22,103.59,32.05,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,30.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" fill="currentColor" />
            </svg>
            <footer className="rounded-b-3xl bg-pain px-10 pb-10 text-center text-creme">
              <p className="flex items-center justify-center gap-2 font-serif text-xl font-bold"><Wheat className="h-5 w-5 text-ble-300" /> La Maison Dorée</p>
              <p className="mt-3 text-sm text-creme/70">Le goût du vrai, depuis 1947.</p>
              <p className="mt-6 text-xs text-creme/50">© 2026 La Maison Dorée.</p>
            </footer>
          </div>
        </div>
      </DemoSection>
    </>
  );
}
