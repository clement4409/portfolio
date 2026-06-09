"use client";

import Image from "next/image";
import { ArrowRight, Star, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader, DemoSection } from "@/components/demo";
import { Typewriter } from "@/components/typewriter";
import ElegantCarousel from "@/components/ui/elegant-carousel";
import { ImageAccordion } from "@/components/ui/interactive-image-accordion";
import { videos, assets } from "@/lib/assets";
import { media } from "@/lib/base-path";

export default function HeroesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sections d'accroche"
        title="Le « héros » de votre site"
        description="C'est la toute première chose que vos visiteurs voient. Voici, en clair, à quoi ça sert."
      />

      {/* EXPLICATION SIMPLE — pour les clients non informaticiens */}
      <DemoSection title="C'est quoi, un « héros » ?" hint="Expliqué simplement, sans terme technique." code={false} favorite={false}>
        <div className="grid gap-6 rounded-3xl border border-border bg-card p-8 md:p-12 lg:grid-cols-2">
          <div className="space-y-4 text-muted-foreground">
            <p className="text-lg">
              Quand on arrive sur un site, la première chose qu'on voit, c'est le grand
              bloc tout en haut : une belle image, une phrase, parfois un bouton. C'est ça,
              le <strong className="text-foreground">héros</strong>.
            </p>
            <p>
              C'est un peu comme la <strong className="text-foreground">vitrine de votre
              boutique</strong>. En passant devant, on doit avoir envie d'entrer. Sur Internet,
              c'est pareil : le héros donne la première impression, et c'est elle qui décide
              si le visiteur reste ou s'en va.
            </p>
            <p>
              On y retrouve en général le nom de votre activité, une phrase qui résume ce que
              vous faites, une image ou une vidéo qui donne le ton, et un bouton pour passer à
              l'action (commander, réserver, vous appeler…).
            </p>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-blue-600/5 p-6">
              <p className="text-sm font-semibold text-blue-600">En une phrase</p>
              <p className="mt-2 text-lg font-medium">
                Le héros, c'est votre vitrine numérique : la première impression qui donne
                envie d'aller plus loin.
              </p>
            </div>
            <p className="text-muted-foreground">
              Et ça compte vraiment : on se fait une idée d'un site en moins de trois secondes.
              Un héros clair et soigné, c'est souvent ce qui transforme un simple curieux en
              futur client.
            </p>
            <p className="text-muted-foreground">
              Juste en dessous, vous trouverez plusieurs styles de héros que nous réalisons.
              Nos exemples mettent en scène une boulangerie, mais le même travail s'adapte à
              n'importe quel métier : restaurant, artisan, commerce, et bien d'autres.
            </p>
          </div>
        </div>
      </DemoSection>

      {/* 1. Fullscreen image + overlay + centered */}
      <DemoSection title="Plein écran · image + overlay centré" hint="L'incontournable : impact maximal dès l'arrivée." contained={false}>
        <div className="relative grid h-[100svh] min-h-[560px] place-items-center overflow-hidden text-center">
          <Image src={assets[13].src} alt="Devanture de la boulangerie" fill className="object-cover" />
          <div className="absolute inset-0 bg-pain-dark/60" />
          <div className="relative z-10 max-w-2xl px-6 text-creme">
            <h3 className="font-serif text-5xl font-bold md:text-7xl text-balance">La Maison Dorée</h3>
            <p className="mt-5 text-lg text-creme/85">Boulangerie · Pâtisserie · Salon de thé au cœur du village depuis trois générations.</p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg">Commander en ligne</Button>
              <Button size="lg" variant="outline" className="border-creme text-creme hover:bg-creme hover:text-pain">Nos horaires</Button>
            </div>
          </div>
        </div>
      </DemoSection>

      {/* 2. Split */}
      <DemoSection title="Split · texte à gauche, image à droite" hint="Idéal pour raconter une histoire tout en montrant le produit." contained={false}>
        <div className="grid min-h-[100svh] bg-card lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-16 md:px-12 lg:px-20">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              <Star className="h-4 w-4 fill-primary" /> 4,9/5 · 320 avis
            </span>
            <h3 className="mt-5 font-serif text-4xl font-bold md:text-6xl">Le croissant qui réveille le quartier</h3>
            <p className="mt-5 max-w-md text-muted-foreground">Pur beurre AOP, façonné à la main chaque matin avant l'aube. Feuilletage doré, cœur moelleux.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg">Voir la carte <ArrowRight className="h-4 w-4" /></Button>
              <Button size="lg" variant="ghost">Réserver une table</Button>
            </div>
          </div>
          <div className="relative min-h-[45vh] lg:min-h-[100svh]">
            <Image src={assets[3].src} alt="Croissant pur beurre doré" fill className="object-cover" />
          </div>
        </div>
      </DemoSection>

      {/* 3. Video background */}
      <DemoSection title="Vidéo en arrière-plan" hint="Loop muet et léger pour une ambiance vivante." contained={false} moreHref="/videos" moreLabel="Voir plus de vidéos">
        <div className="relative grid h-[100svh] min-h-[560px] place-items-center overflow-hidden text-center">
          <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src={media(videos.ambianceSlow)} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-pain-dark/55" />
          <div className="relative z-10 max-w-2xl px-6 text-creme">
            <h3 className="font-serif text-5xl font-bold md:text-7xl text-balance">L'odeur du four, en ligne</h3>
            <p className="mt-5 text-lg text-creme/85">Une boutique digitale aussi vivante que votre fournil.</p>
            <Button size="lg" className="mt-8">Découvrir l'atelier</Button>
          </div>
        </div>
      </DemoSection>

      {/* Fullscreen elegant carousel hero (image plein écran) */}
      <DemoSection title="Plein écran · carrousel immersif" hint="L'image occupe tout l'écran ; le texte défile en surimpression." contained={false} moreHref="/carousels" moreLabel="Voir plus de carrousels">
        <ElegantCarousel />
      </DemoSection>

      {/* 4. Animated typewriter */}
      <DemoSection title="Texte animé · machine à écrire" hint="Le mot clé change pour mettre en avant plusieurs spécialités." contained={false} moreHref="/animations" moreLabel="Voir plus d'animations">
        <div className="grid min-h-[100svh] place-items-center bg-pain px-6 text-center text-creme">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-ble-300">Artisan boulanger</p>
            <h3 className="mt-4 font-serif text-4xl font-bold md:text-6xl">
              On fait le meilleur{" "}
              <Typewriter words={["pain", "croissant", "éclair", "kouign-amann"]} className="text-ble-300" />
            </h3>
            <p className="mx-auto mt-5 max-w-md text-creme/80">…de la ville. Et on a les avis pour le prouver.</p>
            <Button size="lg" className="mt-8">Goûtez par vous-même</Button>
          </div>
        </div>
      </DemoSection>

      {/* 6. Minimalist typography */}
      <DemoSection title="Minimaliste · grande typographie" hint="Quand l'élégance prime, peu d'images et beaucoup d'air." contained={false}>
        <div className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-slate-950 px-6 py-24 text-center text-slate-100">
          {/* Ambient blue glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/3 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-3xl" />
          </div>
          <div className="relative z-10">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Pâtisserie fine</p>
            <h3 className="mx-auto mt-6 max-w-4xl font-serif text-5xl font-bold leading-tight md:text-8xl text-balance">
              Le luxe, c'est le <span className="italic text-blue-400">temps</span> qu'on prend.
            </h3>
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-400">
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-blue-400" /> Ouvert 7j/7</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-400" /> 12 rue du Fournil</span>
              <span className="flex items-center gap-2"><Star className="h-4 w-4 text-blue-400" /> Meilleur croissant 2024</span>
            </div>
            <Button size="lg" variant="outline" className="mt-10 border-blue-400 text-blue-300 hover:bg-blue-400 hover:text-slate-900">Prendre rendez-vous</Button>
          </div>
        </div>
      </DemoSection>

      {/* 7. Interactive image accordion */}
      <DemoSection title="Accordéon d'images interactif" hint="Survolez (ou cliquez) une image pour la déployer." contained={false}>
        <ImageAccordion />
      </DemoSection>
    </>
  );
}
