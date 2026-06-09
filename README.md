# 🥖 BoulangeStudio — Portfolio d'agence web

Vitrine complète des fonctionnalités livrables par une agence spécialisée dans
les sites web de **boulangeries artisanales**.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** (tokens sémantiques, dark mode `class`)
- **Framer Motion** (animations, scroll, transitions)
- **Lucide React** (icônes SVG)
- Polices **Playfair Display** (titres), **Inter** (corps), **Lora** (citations) via `next/font`

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
```

## Pages (accessibles depuis la navbar)

| Route | Démonstration |
|-------|---------------|
| `/` | Accueil : hero, expertise, stats animées, previews |
| `/heroes` | 6 variantes de héros (plein écran, split, vidéo, typewriter, minimal, parallaxe) |
| `/galeries` | Masonry, grille 3×3, lightbox, filtres, légendes, before/after, blur-up |
| `/videos` | Autoplay, player custom, grille cliquable, overlay, embed |
| `/carousels` | Hero, produits, témoignages, logos infinis, 3D, before/after |
| `/animations` | Compteurs, reveal au scroll, tilt 3D, micro-interactions, curseur, parallaxe |
| `/formulaires` | Contact validé, multi-étapes, devis, recherche, upload, newsletter |
| `/navigation` | Navbar sticky, mega menu, hamburger, sidebar, breadcrumbs, pagination, TOC, back-to-top |
| `/cartes` | Produits, badges, équipe, services, tarifs, glassmorphism, horizontales |
| `/temoignages` | Grille notée, slider, avis Google, featured, logos |
| `/faq` | Accordéon, tabs, accordéon imbriqué, timeline verticale & horizontale |
| `/footer` | 4 modèles de footers + footer global du site |

## Identité

Palette boulangerie : doré blé `#C8860A`, marron pain `#3D2B1F`, crème `#F5E6C8`.
Mode sombre intégré (toggle dans la navbar).

## Assets

Images et vidéos dans `public/assets/`. Catalogue centralisé dans `lib/assets.ts`.
