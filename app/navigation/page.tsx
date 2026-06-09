import { PageHeader, DemoSection } from "@/components/demo";
import { IntroExplainer } from "@/components/intro-explainer";
import {
  ScrollGrowBarDemo, MegaMenuDemo, HamburgerDemo, SidebarDemo, BreadcrumbsDemo, PaginationDemo, FloatingTOC, BackToTop,
} from "@/components/nav-demos";

export const metadata = { title: "Menus & Navigation" };

export default function NavigationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Menus & Navigation"
        title="Guider sans jamais perdre"
        description="Navbar sticky, mega menu, hamburger animé, sidebar, fil d'Ariane, pagination, sommaire flottant et retour en haut."
      />

      <IntroExplainer
        title="À quoi sert la navigation ?"
        intro={
          <>
            <p className="text-lg">
              La navigation, ce sont les menus et repères qui permettent de circuler sur le site :
              la barre du haut, le menu, le fil d'Ariane, le bouton « retour en haut »…
            </p>
            <p>
              C'est comme la signalétique d'un magasin : des panneaux clairs pour que chacun
              trouve son rayon sans se perdre.
            </p>
            <p>
              Une bonne navigation est presque invisible : on trouve ce qu'on cherche sans même y
              penser.
            </p>
          </>
        }
        oneLiner="La navigation guide le visiteur partout sur le site, sans jamais le laisser perdu."
        aside={
          <p>Et ça compte : un visiteur qui trouve vite reste ; un visiteur perdu s'en va.</p>
        }
      />

      <DemoSection title="Barre de progression en haut" hint="Une fine barre bleue se remplit au fur et à mesure qu'on descend : on voit d'un coup d'œil où on en est dans la page.">
        <ScrollGrowBarDemo />
      </DemoSection>

      <DemoSection title="Mega menu déroulant" hint="Colonnes thématiques + visuels au survol de « Produits ».">
        <MegaMenuDemo />
      </DemoSection>

      <DemoSection title="Menu hamburger animé" hint="Les trois traits se transforment en croix.">
        <div className="mx-auto max-w-sm"><HamburgerDemo /></div>
      </DemoSection>

      <DemoSection title="Sidebar navigation" hint="Idéale pour un espace pro / back-office boulangerie.">
        <SidebarDemo />
      </DemoSection>

      <DemoSection title="Fil d'Ariane (breadcrumbs)" hint="Repère la position dans l'arborescence.">
        <BreadcrumbsDemo />
      </DemoSection>

      <DemoSection title="Pagination stylisée" hint="Navigation par pages avec état actif.">
        <PaginationDemo />
      </DemoSection>

      <DemoSection title="Sommaire flottant (scrollspy)" hint="Surligne automatiquement la section visible.">
        <FloatingTOC />
      </DemoSection>

      <DemoSection title="Bouton retour en haut" hint="Apparaît après 400 px de scroll (en bas à droite).">
        <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center text-muted-foreground">
          Le bouton flotte en bas à droite dès que vous descendez. ↘
        </div>
      </DemoSection>

      <BackToTop />
    </>
  );
}
