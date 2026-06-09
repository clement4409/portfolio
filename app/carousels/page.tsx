import { PageHeader, DemoSection } from "@/components/demo";
import { IntroExplainer } from "@/components/intro-explainer";
import {
  HeroCarousel, ProductCarousel, LogoMarquee, Carousel3D,
} from "@/components/carousels";
import { HeroCarousel as CoverflowCarousel } from "@/components/ui/feature-carousel";
import { assets } from "@/lib/assets";

export const metadata = { title: "Carrousels & Sliders" };

export default function CarouselsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Carrousels & Sliders"
        title="Faire défiler la gourmandise"
        description="Sept carrousels : hero plein écran, cards produits, témoignages, logos infinis, perspective 3D et avant/après."
      />

      <IntroExplainer
        title="C'est quoi, un carrousel ?"
        intro={
          <>
            <p className="text-lg">
              Un carrousel, c'est un espace qui fait défiler plusieurs contenus (photos, produits,
              avis…) les uns après les autres, au même endroit.
            </p>
            <p>
              C'est comme un présentoir tournant en boutique : au lieu de tout afficher d'un coup,
              on montre une chose à la fois, et le visiteur fait défiler à son rythme.
            </p>
            <p>
              Pratique pour mettre en avant plusieurs produits, des avis clients ou des
              partenaires sans allonger la page.
            </p>
          </>
        }
        oneLiner="Un carrousel montre beaucoup de choses dans peu de place, sans surcharger l'écran."
        aside={
          <p>
            Et ça compte : on gagne de la place tout en mettant chaque élément en valeur, tour à
            tour.
          </p>
        }
      />

      <DemoSection title="Carrousel hero plein largeur" hint="Transitions fluides en fondu + zoom, autoplay 4,5 s.">
        <HeroCarousel />
      </DemoSection>

      <DemoSection title="Carrousel de cards produits" hint="Scroll-snap, autoplay avec pause au survol, badge « Pain du jour ».">
        <ProductCarousel />
      </DemoSection>

      <DemoSection title="Carrousel 3D perspective" hint="Effet de profondeur avec rotation et mise à l'échelle.">
        <Carousel3D />
      </DemoSection>

      <DemoSection title="Carrousel coverflow 3D" hint="Visuel central net, voisins floutés en perspective, navigation par flèches et points.">
        <CoverflowCarousel
          title={<>Vos plus belles créations, <span className="text-blue-600">en vitrine</span></>}
          subtitle="Un carrousel immersif pour faire défiler vos produits, réalisations ou photos de boutique."
          images={[
            { src: assets[3].src, alt: assets[3].alt },
            { src: assets[6].src, alt: assets[6].alt },
            { src: assets[7].src, alt: assets[7].alt },
            { src: assets[4].src, alt: assets[4].alt },
            { src: assets[5].src, alt: assets[5].alt },
          ]}
        />
      </DemoSection>

      <DemoSection title="Logos partenaires · défilement infini" hint="Marquee CSS sans coupure, dégradé sur les bords.">
        <LogoMarquee />
      </DemoSection>
    </>
  );
}
