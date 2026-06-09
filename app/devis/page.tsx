"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Send, Mail, Heart, Server, Camera, Aperture, Globe, ShoppingBag, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/demo";
import { useFavorites } from "@/components/favorites";

// 👉 Adresse Gmail de l'agence qui reçoit les demandes.
const CONTACT_EMAIL = "acsitesweb@gmail.com";

type Service = { id: string; name: string; price: string; desc: string; icon: typeof Globe };

const services: Service[] = [
  { id: "business", name: "Pack Business", price: "dès 599 €", icon: Globe, desc: "Site vitrine moderne, responsive, contact, Google Maps et SEO local." },
  { id: "premium", name: "Pack Premium", price: "dès 999 €", icon: ShoppingBag, desc: "Tout le Business + boutique en ligne, automatisations et micro-IA." },
  { id: "visuel", name: "Pack visuel premium", price: "dès 299 €", icon: Camera, desc: "Photo & vidéo de vos produits et de vos locaux, clé en main." },
  { id: "hebergement", name: "Hébergement & maintenance", price: "≈ 20 €/mois", icon: Server, desc: "Hébergement Hostinger, mises à jour, sécurité, sauvegardes et support." },
  { id: "shooting", name: "Shooting photo & vidéo", price: "100 à 250 €", icon: Aperture, desc: "Louis se déplace pour photographier et filmer votre commerce." },
];

export default function DevisPage() {
  const { favorites, remove } = useFavorites();
  const [chosen, setChosen] = useState<string[]>([]);
  // Favoris : cochés par défaut ; on stocke uniquement ceux explicitement décochés.
  const [unchecked, setUnchecked] = useState<Record<string, boolean>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const toggleService = (id: string) =>
    setChosen((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const favIncluded = favorites.filter((f) => !unchecked[f.id]);
  const toggleFav = (id: string) => setUnchecked((p) => ({ ...p, [id]: !p[id] }));

  const buildSubject = () => {
    const names = services.filter((s) => chosen.includes(s.id)).map((s) => s.name);
    const who = company.trim() || name.trim();
    const base = names.length ? `Demande de devis : ${names.join(", ")}` : "Demande de devis";
    return who ? `${base} (${who})` : base;
  };

  const buildBody = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const chosenServices = services.filter((s) => chosen.includes(s.id));
    const lines: string[] = ["Bonjour A&C Agency,", ""];

    if (chosenServices.length) {
      lines.push("Les prestations qui m'intéressent :", "");
      chosenServices.forEach((s) => lines.push(`• ${s.name} (${s.price})`));
      lines.push("");
    }

    if (favIncluded.length) {
      lines.push("Les exemples (favoris) que j'aime sur votre site :", "");
      favIncluded.forEach((f) => lines.push(`• ${f.label} — ${origin}${f.href}`));
      lines.push("");
    }

    if (!chosenServices.length && !favIncluded.length) {
      lines.push("Je souhaite échanger sur mon projet.", "");
    }

    if (message.trim()) lines.push("Mon message :", message.trim(), "");

    lines.push("Cordialement,");
    if (name.trim()) lines.push(name.trim());
    if (company.trim()) lines.push(company.trim());
    if (email.trim()) lines.push(email.trim());

    return lines.join("\n");
  };

  const handleSend = () => {
    const to = encodeURIComponent(CONTACT_EMAIL);
    const su = encodeURIComponent(buildSubject());
    const body = encodeURIComponent(buildBody());
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${body}`, "_blank", "noopener,noreferrer");
  };

  const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(buildSubject())}&body=${encodeURIComponent(buildBody())}`;

  return (
    <>
      <PageHeader
        eyebrow="Devis & contact"
        title="Composez votre demande"
        description="Choisissez les prestations, ajoutez les exemples que vous avez aimés (vos favoris), laissez-nous un mot : on vous répond avec une proposition."
      />

      <div className="container grid gap-10 pb-24 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        {/* COLONNE PRINCIPALE */}
        <div className="min-w-0 space-y-12">
          {/* 1. Prestations */}
          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-600 text-sm text-white">1</span>
              Vos prestations
            </h2>
            <p className="mt-2 text-muted-foreground">Sélectionnez ce qui vous intéresse (vous pouvez en choisir plusieurs).</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {services.map((s) => {
                const sel = chosen.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleService(s.id)}
                    aria-pressed={sel}
                    className={
                      "flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-all focus-ring " +
                      (sel ? "border-blue-600 bg-blue-600/5 ring-1 ring-blue-600" : "border-border bg-card hover:border-blue-600/40")
                    }
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-600/10 text-blue-600">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-semibold">{s.name}</span>
                        <span
                          className={
                            "grid h-5 w-5 shrink-0 place-items-center rounded-full border " +
                            (sel ? "border-blue-600 bg-blue-600 text-white" : "border-border text-transparent")
                          }
                          aria-hidden
                        >
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      </span>
                      <span className="mt-0.5 block text-sm font-medium text-blue-600">{s.price}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{s.desc}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 2. Favoris */}
          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-600 text-sm text-white">2</span>
              Vos favoris
            </h2>
            <p className="mt-2 text-muted-foreground">
              Les exemples que vous avez aimés sur le site (cœur ❤). Ils seront joints à votre message pour qu'on sache ce qui vous plaît.
            </p>

            {favorites.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-border bg-muted/40 p-6 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Aucun favori pour l'instant.</p>
                <p className="mt-1">
                  Parcourez le site et cliquez sur le <Heart className="inline h-4 w-4 -translate-y-0.5 text-blue-600" /> à côté
                  d'un exemple pour l'enregistrer ici.{" "}
                  <Link href="/heroes" className="font-medium text-blue-600 underline-offset-4 hover:underline">
                    Voir des exemples
                  </Link>
                </p>
              </div>
            ) : (
              <ul className="mt-6 space-y-2">
                {favorites.map((f) => {
                  const included = !unchecked[f.id];
                  return (
                    <li key={f.id}>
                      <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 pl-4">
                        <button
                          type="button"
                          onClick={() => toggleFav(f.id)}
                          aria-pressed={included}
                          aria-label={included ? `Retirer ${f.label} de la demande` : `Ajouter ${f.label} à la demande`}
                          className={
                            "grid h-6 w-6 shrink-0 place-items-center rounded-md border transition-colors " +
                            (included ? "border-blue-600 bg-blue-600 text-white" : "border-border text-transparent")
                          }
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <Link href={f.href} className="min-w-0 flex-1 truncate font-medium hover:text-blue-600">
                          {f.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => remove(f.id)}
                          aria-label={`Supprimer ${f.label} des favoris`}
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-ring"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          {/* 3. Coordonnées */}
          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-600 text-sm text-white">3</span>
              Vos coordonnées
            </h2>
            <form
              className="mt-6 grid gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Nom *</label>
                  <input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom" className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm focus-ring" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email *</label>
                  <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.fr" autoComplete="email" className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm focus-ring" />
                </div>
              </div>
              <div>
                <label htmlFor="company" className="mb-1.5 block text-sm font-medium">Entreprise</label>
                <input id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Nom de votre activité (optionnel)" className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm focus-ring" />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">Votre projet</label>
                <textarea id="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Décrivez votre activité, vos besoins, vos délais…" className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus-ring" />
              </div>
            </form>
          </section>
        </div>

        {/* RÉCAP STICKY */}
        <aside className="lg:sticky lg:top-24">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white">
                <Mail className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-bold">Votre demande</h2>
            </div>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Prestations</dt>
                <dd className="font-semibold">{chosen.length}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Favoris joints</dt>
                <dd className="font-semibold">{favIncluded.length}</dd>
              </div>
            </dl>

            <div className="mt-6 space-y-3">
              <Button onClick={handleSend} size="lg" className="w-full bg-blue-600 text-white hover:bg-blue-500">
                Envoyer via Gmail <Send className="h-4 w-4" />
              </Button>
              <a href={mailtoUrl} className="block text-center text-sm font-medium text-blue-600 underline-offset-4 hover:underline focus-ring rounded">
                ou via votre application mail
              </a>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              On ouvre un e-mail déjà rédigé (prestations + favoris + message). Il ne reste qu'à cliquer sur « Envoyer ».
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
