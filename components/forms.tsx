"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Upload, Search, Loader2, CheckCircle2, ArrowRight, ArrowLeft, X } from "lucide-react";

const field = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus-ring transition-colors";
const label = "block text-sm font-medium mb-1.5";

/* ---------- Contact with realtime validation ---------- */
export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);

  const errors = {
    name: values.name.trim().length < 2 ? "Au moins 2 caractères." : "",
    email: !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email) ? "E-mail invalide." : "",
    message: values.message.trim().length < 10 ? "Au moins 10 caractères." : "",
  };
  const valid = !errors.name && !errors.email && !errors.message;

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (valid) setSent(true); }}
      className="space-y-5 rounded-3xl border border-border bg-card p-6 md:p-8"
      noValidate
    >
      {(["name", "email", "message"] as const).map((f) => (
        <div key={f}>
          <label htmlFor={`c-${f}`} className={label}>
            {f === "name" ? "Nom" : f === "email" ? "E-mail" : "Message"} <span className="text-primary">*</span>
          </label>
          {f === "message" ? (
            <textarea id={`c-${f}`} rows={4} className={field} value={values[f]}
              onChange={(e) => setValues((v) => ({ ...v, [f]: e.target.value }))}
              onBlur={() => setTouched((t) => ({ ...t, [f]: true }))} aria-invalid={!!(touched[f] && errors[f])} />
          ) : (
            <input id={`c-${f}`} type={f === "email" ? "email" : "text"} className={field} value={values[f]}
              onChange={(e) => setValues((v) => ({ ...v, [f]: e.target.value }))}
              onBlur={() => setTouched((t) => ({ ...t, [f]: true }))} aria-invalid={!!(touched[f] && errors[f])} />
          )}
          {touched[f] && errors[f] && <p role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors[f]}</p>}
          {touched[f] && !errors[f] && <p className="mt-1 flex items-center gap-1 text-xs text-green-700 dark:text-green-400"><Check className="h-3 w-3" /> Parfait</p>}
        </div>
      ))}
      <button disabled={sent} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 font-medium text-primary-foreground transition hover:brightness-110 disabled:opacity-70 focus-ring">
        {sent ? <><CheckCircle2 className="h-5 w-5" /> Message envoyé !</> : "Envoyer le message"}
      </button>
    </form>
  );
}

/* ---------- Multi-step ---------- */
export function MultiStepForm() {
  const [step, setStep] = useState(0);
  const steps = ["Vos infos", "Votre projet", "Confirmation"];
  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
      <div className="mb-8 flex items-center">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center last:flex-none">
            <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-medium transition-colors ${i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            {i < steps.length - 1 && <div className={`h-0.5 flex-1 transition-colors ${i < step ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
          <h3 className="font-serif text-xl font-semibold">{steps[step]}</h3>
          {step === 0 && (
            <div className="mt-4 space-y-4">
              <div><label className={label}>Nom de la boulangerie</label><input className={field} placeholder="La Maison Dorée" /></div>
              <div><label className={label}>E-mail</label><input type="email" className={field} placeholder="contact@…" /></div>
            </div>
          )}
          {step === 1 && (
            <div className="mt-4 space-y-4">
              <div><label className={label}>Type de projet</label>
                <select className={field}><option>Nouveau site vitrine</option><option>Boutique en ligne</option><option>Refonte</option></select>
              </div>
              <div><label className={label}>Budget envisagé</label>
                <select className={field}><option>1 000 – 3 000 €</option><option>3 000 – 6 000 €</option><option>6 000 € +</option></select>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="mt-4 rounded-2xl bg-primary/5 p-6 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
              <p className="mt-3 font-medium">Tout est prêt !</p>
              <p className="mt-1 text-sm text-muted-foreground">Cliquez sur « Envoyer » et nous vous recontactons sous 24 h.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="mt-8 flex justify-between">
        <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground disabled:opacity-40 hover:text-foreground focus-ring"><ArrowLeft className="h-4 w-4" /> Retour</button>
        <button onClick={() => setStep((s) => Math.min(2, s + 1))} className="inline-flex items-center gap-1 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:brightness-110 focus-ring">
          {step === 2 ? "Envoyer" : "Suivant"} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ---------- Quote with styled checkboxes ---------- */
export function QuoteForm() {
  const options = ["Site vitrine", "Click & collect", "Menu du jour dynamique", "Réservation de table", "Galerie photo", "Avis Google", "Newsletter", "Blog recettes"];
  const [selected, setSelected] = useState<string[]>(["Site vitrine"]);
  const toggle = (o: string) => setSelected((s) => (s.includes(o) ? s.filter((x) => x !== o) : [...s, o]));
  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
      <p className={label}>Quelles fonctionnalités vous intéressent ?</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((o) => {
          const on = selected.includes(o);
          return (
            <button key={o} type="button" onClick={() => toggle(o)} className={`flex items-center gap-3 rounded-xl border-2 p-3 text-left text-sm transition-colors focus-ring ${on ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
              <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition-colors ${on ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
                {on && <Check className="h-3.5 w-3.5" />}
              </span>
              {o}
            </button>
          );
        })}
      </div>
      <p className="mt-5 text-sm text-muted-foreground">{selected.length} option(s) sélectionnée(s) — estimation : <span className="font-semibold text-primary">{1000 + selected.length * 650} €</span></p>
    </div>
  );
}

/* ---------- Search with suggestions ---------- */
export function SearchField() {
  const all = ["Baguette tradition", "Croissant", "Pain au chocolat", "Éclair café", "Kouign-amann", "Tarte Tatin", "Quiche lorraine", "Fraisier"];
  const [q, setQ] = useState("");
  const matches = q ? all.filter((x) => x.toLowerCase().includes(q.toLowerCase())) : [];
  return (
    <div className="relative mx-auto max-w-md">
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un produit…" className={`${field} pl-11`} aria-label="Rechercher" />
      <AnimatePresence>
        {matches.length > 0 && (
          <motion.ul initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-border bg-card shadow-xl">
            {matches.map((m) => (
              <li key={m}><button onClick={() => setQ(m)} className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-muted focus-ring"><Search className="h-3.5 w-3.5 text-muted-foreground" /> {m}</button></li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Drag & drop upload ---------- */
export function FileUpload() {
  const [files, setFiles] = useState<string[]>([]);
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const add = (list: FileList | null) => { if (list) setFiles((f) => [...f, ...Array.from(list).map((x) => x.name)]); };
  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); add(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`grid cursor-pointer place-items-center rounded-3xl border-2 border-dashed p-10 text-center transition-colors focus-ring ${over ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
        role="button" tabIndex={0}
      >
        <Upload className={`h-10 w-10 transition-colors ${over ? "text-primary" : "text-muted-foreground"}`} />
        <p className="mt-3 font-medium">Glissez vos photos ici</p>
        <p className="text-sm text-muted-foreground">ou cliquez pour parcourir</p>
        <input ref={inputRef} type="file" multiple className="hidden" onChange={(e) => add(e.target.files)} />
      </div>
      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((f, i) => (
            <li key={i} className="flex items-center justify-between rounded-xl bg-muted px-4 py-2.5 text-sm">
              {f}
              <button onClick={() => setFiles((x) => x.filter((_, idx) => idx !== i))} aria-label="Retirer" className="text-muted-foreground hover:text-red-500 focus-ring rounded"><X className="h-4 w-4" /></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------- Newsletter w/ success ---------- */
export function NewsletterForm() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  return (
    <div className="rounded-3xl bg-pain p-8 text-center text-creme md:p-12">
      <h3 className="font-serif text-2xl font-bold">Recevez nos meilleures recettes digitales</h3>
      <p className="mt-2 text-creme/70">Une newsletter par mois, zéro spam.</p>
      <AnimatePresence mode="wait">
        {state === "done" ? (
          <motion.div key="done" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground">
            <CheckCircle2 className="h-5 w-5" /> Inscription confirmée !
          </motion.div>
        ) : (
          <motion.form key="form" exit={{ opacity: 0 }} onSubmit={(e) => { e.preventDefault(); setState("loading"); setTimeout(() => setState("done"), 1100); }} className="mx-auto mt-6 flex max-w-md gap-2">
            <input type="email" required placeholder="Votre e-mail" aria-label="E-mail" className="min-w-0 flex-1 rounded-full bg-creme/10 px-5 py-3 placeholder:text-creme/40 focus-ring" />
            <button disabled={state === "loading"} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground focus-ring">
              {state === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : "S'inscrire"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
