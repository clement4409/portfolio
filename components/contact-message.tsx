"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Send, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/demo";

// 👉 Adresse Gmail de l'agence qui reçoit les messages.
const CONTACT_EMAIL = "acsitesweb@gmail.com";

export function ContactMessage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const subject = encodeURIComponent(
    name.trim() ? `Message de ${name.trim()}` : "Demande de contact"
  );
  const body = encodeURIComponent(
    [
      "Bonjour A&C Agency,",
      "",
      message.trim() || "Je souhaite échanger sur mon projet.",
      "",
      "Cordialement,",
      name.trim(),
      email.trim(),
    ]
      .filter(Boolean)
      .join("\n")
  );

  const handleSend = () => {
    const to = encodeURIComponent(CONTACT_EMAIL);
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

  return (
    <section id="contact" className="container scroll-mt-24 py-24">
      <Reveal className="text-center">
        <h2 className="text-3xl font-bold text-balance md:text-5xl">Une question, un projet ?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Écrivez-nous un mot, ou composez directement votre devis avec les prestations qui vous
          intéressent.
        </p>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-stretch">
        {/* Message rapide */}
        <Reveal>
          <div className="h-full rounded-3xl border border-border bg-card p-8 md:p-10">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white">
                <Mail className="h-5 w-5" />
              </span>
              <h3 className="text-xl font-bold">Nous envoyer un message</h3>
            </div>
            <form
              className="mt-6 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="cm-name" className="mb-1.5 block text-sm font-medium">Nom *</label>
                  <input id="cm-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom" className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm focus-ring" />
                </div>
                <div>
                  <label htmlFor="cm-email" className="mb-1.5 block text-sm font-medium">Email *</label>
                  <input id="cm-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.fr" autoComplete="email" className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm focus-ring" />
                </div>
              </div>
              <div>
                <label htmlFor="cm-message" className="mb-1.5 block text-sm font-medium">Message</label>
                <textarea id="cm-message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Dites-nous en quelques mots ce dont vous avez besoin…" className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus-ring" />
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button type="submit" size="lg" className="bg-blue-600 text-white hover:bg-blue-500">
                  Envoyer via Gmail <Send className="h-4 w-4" />
                </Button>
                <a href={mailtoUrl} className="text-sm font-medium text-blue-600 underline-offset-4 hover:underline focus-ring rounded">
                  ou via votre application mail
                </a>
              </div>
            </form>
          </div>
        </Reveal>

        {/* Créer un devis */}
        <Reveal delay={0.1}>
          <div className="flex h-full flex-col justify-center rounded-3xl bg-slate-950 p-8 text-slate-100 md:p-10">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 text-white">
              <FileText className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-2xl font-bold">Besoin d'un chiffrage ?</h3>
            <p className="mt-2 text-slate-400">
              Choisissez vos prestations (site, hébergement, shooting…), ajoutez vos favoris, et
              recevez une proposition.
            </p>
            <Button asChild size="lg" className="mt-6 bg-blue-600 text-white hover:bg-blue-500">
              <Link href="/devis">
                Créer un devis <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
