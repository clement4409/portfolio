"use client";

import { useState } from "react";
import { Check, Star, ShieldCheck, Send, Mail, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/demo";

// 👉 Remplacez par l'adresse Gmail de l'agence qui doit recevoir les demandes.
const CONTACT_EMAIL = "acsitesweb@gmail.com";

type Offer = {
  id: string;
  name: string;
  price: string;
  note?: string;
  intro?: string;
  features: string[];
  featured?: boolean;
};

const offers: Offer[] = [
  {
    id: "business",
    name: "Pack Business",
    price: "599 €",
    note: "à partir de",
    features: [
      "Site vitrine moderne et innovant",
      "Responsive mobile, tablette, ordinateur",
      "Galerie photos",
      "Formulaire de contact",
      "Intégration Google Maps",
      "Réservation en ligne / précommande",
      "SEO local",
      "Emails automatiques pour les commandes",
    ],
  },
  {
    id: "premium",
    name: "Pack Premium",
    price: "999 €",
    note: "à partir de",
    featured: true,
    intro: "Tout le Pack Business +",
    features: [
      "Boutique en ligne + paiement sécurisé",
      "Automatisations",
      "Micro-IA pour guider les demandes des utilisateurs",
    ],
  },
  {
    id: "visuel",
    name: "Pack visuel premium",
    price: "299 €",
    note: "à partir de",
    intro: "Un partenaire d'expérience qui photographie votre boutique",
    features: ["Design photo & vidéo", "Vos produits", "Vos locaux", "Pratique et clé en main"],
  },
  {
    id: "maintenance",
    name: "Hébergement & maintenance",
    price: "≈ 20 €/mois",
    features: ["Hébergement Hostinger", "Mises à jour", "Sécurité & SSL", "Sauvegardes", "Support & modifications"],
  },
  {
    id: "shooting",
    name: "Shooting photo & vidéo",
    price: "100 à 250 €",
    intro: "Photos et vidéo de votre commerce, réalisées par Louis.",
    features: ["Photos de vos produits", "Ambiance de la boutique", "Option vidéo pour les réseaux", "Déplacement inclus"],
  },
];

export function OffersContact() {
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const buildBody = () => {
    const chosen = offers.filter((o) => selected.includes(o.id));
    const lines: string[] = ["Bonjour A&C Agency,", ""];

    if (chosen.length) {
      lines.push("Voici les prestations qui m'intéressent :", "");
      chosen.forEach((o) => {
        lines.push(`${o.name} (${o.note ? o.note + " " : ""}${o.price})`);
        if (o.intro) lines.push(`   ${o.intro}`);
        o.features.forEach((f) => lines.push(`   • ${f}`));
        lines.push("");
      });
    } else {
      lines.push("Je souhaite échanger sur la création de mon site web.", "");
    }

    if (message.trim()) {
      lines.push("Mon message :", message.trim(), "");
    }

    lines.push("Cordialement,");
    if (name.trim()) lines.push(name.trim());
    if (company.trim()) lines.push(company.trim());
    if (email.trim()) lines.push(email.trim());

    return lines.join("\n");
  };

  const buildSubject = () => {
    const chosen = offers.filter((o) => selected.includes(o.id)).map((o) => o.name);
    const who = company.trim() || name.trim();
    const base = chosen.length ? `Demande de devis : ${chosen.join(", ")}` : "Demande de contact";
    return who ? `${base} (${who})` : base;
  };

  const handleSend = () => {
    const subject = encodeURIComponent(buildSubject());
    const body = encodeURIComponent(buildBody());
    const to = encodeURIComponent(CONTACT_EMAIL);
    // Ouvre la fenêtre de rédaction Gmail pré-remplie.
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    buildSubject()
  )}&body=${encodeURIComponent(buildBody())}`;

  return (
    <section id="offres" className="container scroll-mt-24 py-24">
      <Reveal className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold">Nos offres : composez votre demande</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Sélectionnez les formules qui vous intéressent : elles seront ajoutées
          automatiquement à votre message. Puis envoyez-nous votre demande par email.
        </p>
      </Reveal>

      {/* OFFER CARDS (selectable) */}
      <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
        {offers
          .filter((o) => o.id !== "maintenance" && o.id !== "shooting")
          .map((offer, i) => {
            const isSel = selected.includes(offer.id);
            return (
              <Reveal key={offer.id} delay={i * 0.08}>
                <button
                  type="button"
                  onClick={() => toggle(offer.id)}
                  aria-pressed={isSel}
                  className={
                    "relative flex h-full w-full flex-col rounded-3xl border p-8 text-left transition-all hover:-translate-y-1 focus-ring " +
                    (isSel
                      ? "border-blue-600 bg-card ring-2 ring-blue-600 shadow-xl shadow-blue-500/10"
                      : offer.featured
                        ? "border-blue-600/60 bg-card"
                        : "border-border bg-card")
                  }
                >
                  {offer.featured && (
                    <span className="absolute -top-3 left-8 inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                      <Star className="h-3.5 w-3.5" /> Le plus complet
                    </span>
                  )}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold">{offer.name}</h3>
                    <span
                      className={
                        "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors " +
                        (isSel ? "border-blue-600 bg-blue-600 text-white" : "border-border text-transparent")
                      }
                      aria-hidden
                    >
                      <Check className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-blue-600">{offer.price}</span>
                    {offer.note && <span className="text-sm text-muted-foreground">{offer.note}</span>}
                  </div>
                  {offer.intro && <p className="mt-4 text-sm font-medium text-muted-foreground">{offer.intro}</p>}
                  <ul className="mt-6 space-y-3">
                    {offer.features.map((f) => (
                      <li key={f} className="flex gap-3 text-sm">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue-600/10 text-blue-600">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <span
                    className={
                      "mt-8 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors " +
                      (isSel ? "bg-blue-600 text-white" : "border border-border")
                    }
                  >
                    {isSel ? "Sélectionné ✓" : "Sélectionner"}
                  </span>
                </button>
              </Reveal>
            );
          })}
      </div>

      {/* MAINTENANCE (selectable) */}
      {(() => {
        const m = offers.find((o) => o.id === "maintenance")!;
        const isSel = selected.includes(m.id);
        return (
          <Reveal delay={0.1}>
            <button
              type="button"
              onClick={() => toggle(m.id)}
              aria-pressed={isSel}
              className={
                "mt-8 flex w-full flex-col items-start justify-between gap-6 rounded-3xl border p-8 text-left transition-all focus-ring md:flex-row md:items-center " +
                (isSel ? "border-blue-600 ring-2 ring-blue-600 bg-card" : "border-border bg-slate-50 dark:bg-slate-900/40")
              }
            >
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-600/10 text-blue-600">
                  <ShieldCheck className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-xl font-bold">
                    Hébergement &amp; maintenance <span className="text-blue-600">≈ 20 €/mois</span>
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.features.join(" · ")}</p>
                </div>
              </div>
              <span
                className={
                  "inline-flex shrink-0 items-center gap-2 rounded-md px-4 py-2 text-sm font-medium " +
                  (isSel ? "bg-blue-600 text-white" : "border border-border")
                }
              >
                {isSel ? "Ajouté ✓" : "Ajouter"}
              </span>
            </button>
          </Reveal>
        );
      })()}

      {/* SHOOTING PHOTO (selectable) */}
      {(() => {
        const s = offers.find((o) => o.id === "shooting")!;
        const isSel = selected.includes(s.id);
        return (
          <Reveal delay={0.1}>
            <button
              type="button"
              onClick={() => toggle(s.id)}
              aria-pressed={isSel}
              className={
                "mt-4 flex w-full flex-col items-start justify-between gap-6 rounded-3xl border p-8 text-left transition-all focus-ring md:flex-row md:items-center " +
                (isSel ? "border-blue-600 ring-2 ring-blue-600 bg-card" : "border-border bg-slate-50 dark:bg-slate-900/40")
              }
            >
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-600/10 text-blue-600">
                  <Camera className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-xl font-bold">
                    Shooting photo &amp; vidéo <span className="text-blue-600">100 à 250 €</span>
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.features.join(" · ")}</p>
                </div>
              </div>
              <span
                className={
                  "inline-flex shrink-0 items-center gap-2 rounded-md px-4 py-2 text-sm font-medium " +
                  (isSel ? "bg-blue-600 text-white" : "border border-border")
                }
              >
                {isSel ? "Ajouté ✓" : "Ajouter"}
              </span>
            </button>
          </Reveal>
        );
      })()}

      {/* CONTACT FORM */}
      <Reveal delay={0.1}>
        <div id="contact" className="mt-16 scroll-mt-24 rounded-3xl border border-border bg-card p-8 md:p-10">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-2xl font-bold">Envoyez-nous votre demande</h3>
              <p className="text-sm text-muted-foreground">
                {selected.length
                  ? `${selected.length} offre${selected.length > 1 ? "s" : ""} sélectionnée${selected.length > 1 ? "s" : ""} — ajoutée(s) à votre message.`
                  : "Aucune offre sélectionnée pour l'instant (optionnel)."}
              </p>
            </div>
          </div>

          <form
            className="mt-8 grid gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Nom *</label>
                <input
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus-ring"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email *</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus-ring"
                  placeholder="vous@exemple.fr"
                />
              </div>
            </div>
            <div>
              <label htmlFor="company" className="mb-1.5 block text-sm font-medium">Entreprise</label>
              <input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus-ring"
                placeholder="Nom de votre activité (optionnel)"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">Message</label>
              <textarea
                id="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus-ring"
                placeholder="Décrivez votre projet, vos besoins, vos délais…"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" size="lg" className="bg-blue-600 text-white hover:bg-blue-500">
                Envoyer via Gmail <Send className="h-4 w-4" />
              </Button>
              <a
                href={mailtoUrl}
                className="text-sm font-medium text-blue-600 underline-offset-4 hover:underline focus-ring rounded"
              >
                ou via votre application mail
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              Le bouton ouvre Gmail avec votre message déjà rédigé (offres choisies incluses).
              Il vous suffit de cliquer sur « Envoyer ».
            </p>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
