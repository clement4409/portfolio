import Image from "next/image";
import {
  Check, Star, Croissant, Cake, Wheat, Instagram, Linkedin, ShoppingBag, Truck, Smartphone, ArrowRight,
} from "lucide-react";
import { PageHeader, DemoSection } from "@/components/demo";
import { IntroExplainer } from "@/components/intro-explainer";
import { Button } from "@/components/ui/button";
import { assets } from "@/lib/assets";

export const metadata = { title: "Cartes & Tarifs" };

const products = [
  { ...assets[0], price: "1,30 €", badge: null },
  { ...assets[3], price: "1,20 €", badge: "Populaire" },
  { ...assets[6], price: "3,50 €", badge: "Nouveau" },
  { ...assets[5], price: "4,20 €", badge: "Saison" },
];

const team = [
  { name: "Léa Fournier", role: "Cheffe boulangère", img: assets[14].src },
  { name: "Marc Dubois", role: "Pâtissier", img: assets[13].src },
  { name: "Inès Caron", role: "Responsable boutique", img: assets[16].src },
];

const services = [
  { icon: ShoppingBag, title: "Click & Collect", desc: "Commande en ligne, retrait en boutique sans attente." },
  { icon: Truck, title: "Livraison locale", desc: "Vos pains livrés frais dans tout le quartier." },
  { icon: Smartphone, title: "Menu du jour", desc: "Mise à jour quotidienne des disponibilités en un clic." },
];

const tiers = [
  { name: "Starter", price: "1 290", popular: false, features: ["Site vitrine 1 page", "Galerie photo", "Formulaire de contact", "Optimisation mobile"] },
  { name: "Pro", price: "2 890", popular: true, features: ["Jusqu'à 6 pages", "Menu du jour dynamique", "Click & collect", "Avis Google intégrés", "SEO local"] },
  { name: "Premium", price: "5 490", popular: false, features: ["Pages illimitées", "Boutique en ligne complète", "Réservation de table", "Shooting photo inclus", "Maintenance 1 an"] },
];

const badgeColor: Record<string, string> = {
  Populaire: "bg-primary text-primary-foreground",
  Nouveau: "bg-green-600 text-white",
  Saison: "bg-pain text-creme",
};

export default function CartesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cartes & Tarifs"
        title="Vos produits et offres, présentés en cartes"
        description="Cards produits, badges, équipe, services, tableau de tarifs, glassmorphism et cards horizontales."
      />

      <IntroExplainer
        title="C'est quoi, une « carte » ?"
        intro={
          <>
            <p className="text-lg">
              Une carte (ou « card »), c'est un petit bloc qui regroupe une information : une
              photo, un titre, un prix, un bouton. On les aligne pour présenter des produits, une
              équipe, des services ou des tarifs.
            </p>
            <p>
              C'est comme une fiche produit ou une étiquette soignée : tout ce qu'il faut savoir,
              présenté proprement et toujours au même format.
            </p>
            <p>
              C'est la base d'un catalogue, d'une page « nos offres » ou d'une grille de tarifs
              claire.
            </p>
          </>
        }
        oneLiner="Les cartes rangent vos infos en blocs clairs et réguliers, faciles à comparer d'un coup d'œil."
        aside={
          <p>
            Et ça compte : un client comprend tout de suite ce que vous proposez, et à quel prix.
          </p>
        }
      />

      <DemoSection title="Cards produits" hint="Image, titre, prix et CTA — la base d'une carte e-commerce.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <article key={p.src} className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-square">
                <Image src={p.src} alt={p.alt} fill sizes="25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                {p.badge && <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ${badgeColor[p.badge]}`}>{p.badge}</span>}
              </div>
              <div className="p-4">
                <h3 className="font-medium">{p.alt}</h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-serif text-lg text-primary">{p.price}</span>
                  <Button size="sm" variant="outline">Ajouter</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </DemoSection>

      <DemoSection title="Cards d'équipe" hint="Photo, nom, rôle et réseaux sociaux.">
        <div className="grid gap-6 sm:grid-cols-3">
          {team.map((m) => (
            <article key={m.name} className="overflow-hidden rounded-2xl border border-border bg-card text-center">
              <div className="relative aspect-[4/3]"><Image src={m.img} alt={m.name} fill sizes="33vw" className="object-cover" /></div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold">{m.name}</h3>
                <p className="text-sm text-primary">{m.role}</p>
                <div className="mt-3 flex justify-center gap-2">
                  {[Instagram, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors focus-ring" aria-label="Réseau social"><Icon className="h-4 w-4" /></a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </DemoSection>

      <DemoSection title="Cards de services" hint="Icône, titre, description — pour présenter une offre.">
        <div className="grid gap-6 sm:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className="rounded-2xl border border-border bg-card p-7">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary"><s.icon className="h-6 w-6" /></div>
              <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.desc}</p>
            </article>
          ))}
        </div>
      </DemoSection>

      <DemoSection title="Tableau comparatif de tarifs" hint="Trois formules avec mise en avant de l'offre recommandée.">
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <article key={t.name} className={`relative rounded-3xl border-2 bg-card p-8 ${t.popular ? "border-primary shadow-xl lg:scale-105" : "border-border"}`}>
              {t.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">Recommandé</span>}
              <h3 className="font-serif text-2xl font-bold">{t.name}</h3>
              <p className="mt-4"><span className="font-serif text-4xl font-bold">{t.price} €</span></p>
              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm"><Check className="h-5 w-5 shrink-0 text-primary" /> {f}</li>
                ))}
              </ul>
              <Button className="mt-8 w-full" variant={t.popular ? "primary" : "outline"}>Choisir {t.name}</Button>
            </article>
          ))}
        </div>
      </DemoSection>

      <DemoSection title="Cards glassmorphism" hint="Effet verre dépoli sur un fond imagé." contained={false}>
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl p-8 md:p-14">
            <Image src={assets[15].src} alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-pain-dark/40" />
            <div className="relative grid gap-6 sm:grid-cols-3">
              {[Wheat, Croissant, Cake].map((Icon, i) => (
                <div key={i} className="rounded-2xl border border-creme/20 bg-creme/10 p-6 backdrop-blur-md text-creme">
                  <Icon className="h-8 w-8 text-ble-300" />
                  <h3 className="mt-4 font-serif text-xl font-semibold">{["Fait maison", "Chaque matin", "Sur-mesure"][i]}</h3>
                  <p className="mt-2 text-sm text-creme/80">{["Des recettes transmises de génération en génération.", "Cuisson démarrée avant l'aube, fraîcheur garantie.", "Commandes spéciales pour vos événements."][i]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Cards horizontales" hint="Image à gauche, contenu à droite — parfait pour des articles.">
        <div className="grid gap-5 lg:grid-cols-2">
          {assets.slice(7, 9).map((a) => (
            <article key={a.src} className="flex overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative w-2/5 shrink-0"><Image src={a.src} alt={a.alt} fill sizes="200px" className="object-cover" /></div>
              <div className="flex flex-col justify-center p-6">
                <span className="flex items-center gap-1 text-xs text-primary"><Star className="h-3.5 w-3.5 fill-primary" /> Spécialité maison</span>
                <h3 className="mt-2 font-serif text-xl font-semibold">{a.alt}</h3>
                <p className="mt-2 text-sm text-muted-foreground">Préparé avec des ingrédients sélectionnés, chaque jour dans notre atelier.</p>
                <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">En savoir plus <ArrowRight className="h-4 w-4" /></a>
              </div>
            </article>
          ))}
        </div>
      </DemoSection>
    </>
  );
}
