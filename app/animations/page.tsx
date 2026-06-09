import { PageHeader, DemoSection } from "@/components/demo";
import { IntroExplainer } from "@/components/intro-explainer";
import { CursorDemo } from "@/components/cursor-demo";
import {
  CounterStats, MicroButtons, CroissantLoader, WordReveal, StaggerGrid,
} from "@/components/animations";
import TiltedCard from "@/components/ui/tilted-card";
import { VideoText } from "@/components/ui/video-text";
import { ScrollVelocity } from "@/components/ui/scroll-velocity";
import { assets, videos } from "@/lib/assets";

export const metadata = { title: "Animations & Interactions" };

export default function AnimationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Animations & Interactions"
        title="Le mouvement qui donne faim"
        description="Compteurs, révélations au scroll, tilt 3D, micro-interactions, curseur custom et parallaxe multi-couches."
      />

      <IntroExplainer
        title="À quoi servent les animations ?"
        intro={
          <>
            <p className="text-lg">
              Les animations, ce sont les petits mouvements qui rendent un site vivant : un
              chiffre qui défile, une image qui apparaît en douceur quand on descend, un bouton
              qui réagit quand on le survole.
            </p>
            <p>
              C'est la différence entre une vitrine figée et une vitrine où quelque chose attire
              l'œil. Bien dosées, elles guident le regard et donnent une impression de qualité.
            </p>
            <p>
              Trop, c'est fatigant ; trop peu, c'est plat. Tout l'art est de les utiliser au bon
              endroit, au bon moment.
            </p>
          </>
        }
        oneLiner="Les animations donnent du rythme à votre site et rendent la visite plus agréable et mémorable."
        aside={
          <p>
            Et ça compte : un site qui « bouge » juste ce qu'il faut paraît plus soigné et retient
            l'attention plus longtemps.
          </p>
        }
      />

      <DemoSection title="Compteurs animés au scroll" hint="S'incrémentent quand ils entrent dans le viewport.">
        <CounterStats />
      </DemoSection>

      <DemoSection title="Texte révélé mot par mot" hint="L'opacité de chaque mot suit la progression du scroll.">
        <div className="py-16">
          <WordReveal text="Du levain au pixel, nous façonnons des expériences qui donnent envie de pousser la porte de votre boulangerie." />
        </div>
      </DemoSection>

      <DemoSection title="Cards 3D · tilt au survol" hint="La carte s'incline en suivant la souris (effet de profondeur).">
        <div className="grid place-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { src: assets[3].src, alt: assets[3].alt, title: "Croissant" },
            { src: assets[6].src, alt: assets[6].alt, title: "Éclair" },
            { src: assets[5].src, alt: assets[5].alt, title: "Kouign-amann" },
          ].map((c) => (
            <TiltedCard
              key={c.src}
              imageSrc={c.src}
              altText={c.alt}
              captionText={c.title}
              containerHeight="300px"
              containerWidth="100%"
              imageHeight="300px"
              imageWidth="300px"
              rotateAmplitude={12}
              scaleOnHover={1.1}
              showMobileWarning={false}
              showTooltip
              displayOverlayContent
              overlayContent={
                <span className="ml-4 mt-4 inline-block rounded-full bg-pain-dark/80 px-4 py-1.5 font-serif text-lg text-creme">
                  {c.title}
                </span>
              }
            />
          ))}
        </div>
      </DemoSection>

      <DemoSection title="Boutons · micro-interactions" hint="Ripple au clic, pulse et morphing au survol.">
        <MicroButtons />
      </DemoSection>

      <DemoSection title="Loader custom · croissant qui tourne" hint="Indicateur de chargement à l'identité de l'agence.">
        <div className="rounded-3xl border border-border bg-card">
          <CroissantLoader />
        </div>
      </DemoSection>

      <DemoSection title="Curseur custom" hint="Un curseur sur-mesure dans une zone dédiée (mix-blend).">
        <CursorDemo />
      </DemoSection>

      <DemoSection title="Apparition en cascade (stagger)" hint="Les éléments entrent les uns après les autres au scroll.">
        <StaggerGrid />
      </DemoSection>

      <DemoSection title="Texte rempli par une vidéo" hint="Le mot est « découpé » dans une vidéo : on voit la vidéo bouger à travers les lettres.">
        <div className="relative h-64 w-full overflow-hidden rounded-3xl bg-pain md:h-80">
          <VideoText src={videos.texte} fontSize={7}>
            BOULANGERIE
          </VideoText>
        </div>
      </DemoSection>

      <DemoSection title="Texte défilant au scroll" hint="Les mots défilent en continu, et accélèrent quand on fait défiler la page." contained={false}>
        <ScrollVelocity
          texts={["Pain frais tous les jours", "Fait maison • Artisanal"]}
          velocity={80}
          className="px-4 text-primary !text-xl md:!text-3xl"
        />
      </DemoSection>
    </>
  );
}
