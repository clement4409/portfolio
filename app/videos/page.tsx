import { PageHeader, DemoSection } from "@/components/demo";
import { VideoPlayer } from "@/components/video-player";
import { VideoThumbGrid } from "@/components/video-thumb-grid";
import { videos, assets } from "@/lib/assets";
import { media } from "@/lib/base-path";

export const metadata = { title: "Vidéos" };

export default function VideosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Vidéos"
        title="Donner vie à votre fournil"
        description="Vidéo d'ambiance, lecteur personnalisé, galerie de vidéos, texte par-dessus l'image et intégration YouTube : tout ce qu'on peut faire avec la vidéo."
      />

      {/* EXPLICATION SIMPLE — pour les clients non informaticiens */}
      <DemoSection title="À quoi sert une vidéo sur un site ?" hint="Expliqué simplement, sans terme technique." favorite={false}>
        <div className="grid gap-6 rounded-3xl border border-border bg-card p-8 md:p-12 lg:grid-cols-2">
          <div className="space-y-4 text-muted-foreground">
            <p className="text-lg">
              Une <strong className="text-foreground">vidéo</strong>, c'est ce qui donne vie à
              votre site. Une image, c'est figé ; une vidéo, ça bouge, ça raconte une histoire
              et ça capte tout de suite le regard.
            </p>
            <p>
              C'est un peu comme la <strong className="text-foreground">différence entre une
              photo de votre vitrine et un petit film de votre atelier</strong> : on sent la
              chaleur du four, on voit les gestes, on a presque l'odeur du pain chaud.
            </p>
            <p>
              Selon le besoin, on choisit la bonne forme : une vidéo d'ambiance qui se lance
              toute seule en fond, un lecteur pour présenter votre métier, un témoignage de
              client, ou encore une vidéo déjà publiée sur YouTube qu'on affiche sur votre site.
            </p>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-blue-600/5 p-6">
              <p className="text-sm font-semibold text-blue-600">En une phrase</p>
              <p className="mt-2 text-lg font-medium">
                La vidéo, c'est l'émotion en mouvement : elle donne envie de rester, de regarder,
                et de vous faire confiance.
              </p>
            </div>
            <p className="text-muted-foreground">
              Et ça compte vraiment : on retient bien mieux une vidéo qu'un texte, et les
              visiteurs passent plus de temps sur une page qui en contient une.
            </p>
            <p className="text-muted-foreground">
              Juste en dessous, vous trouverez plusieurs façons d'utiliser la vidéo que nous
              réalisons. Nos exemples mettent en scène une boulangerie, mais le même travail
              s'adapte à n'importe quel métier : restaurant, artisan, commerce, et bien d'autres.
            </p>
          </div>
        </div>
      </DemoSection>

      {/* Hero autoplay loop */}
      <DemoSection title="Vidéo en fond, qui démarre toute seule" hint="Elle se lance automatiquement, en boucle et sans son, pour donner vie à votre page dès l'arrivée." contained={false}>
        <div className="container">
          <div className="relative grid h-[70vh] place-items-center overflow-hidden rounded-3xl text-center">
            <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
              <source src={media(videos.ambiance)} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-pain-dark/45" />
            <div className="relative z-10 px-6 text-creme">
              <h3 className="font-serif text-5xl font-bold md:text-7xl">L'ambiance, en mouvement</h3>
              <p className="mt-4 text-creme/85">La chaleur du fournil capturée en boucle.</p>
            </div>
          </div>
        </div>
      </DemoSection>

      {/* Custom player */}
      <DemoSection title="Lecteur vidéo personnalisé" hint="Un lecteur aux couleurs de votre marque : lecture, son, avancement et plein écran.">
        <VideoPlayer src={videos.maisonFondee} poster={assets[13].src} />
      </DemoSection>

      {/* Thumbnail grid */}
      <DemoSection title="Plusieurs vidéos · cliquez pour lancer" hint="Le visiteur choisit un aperçu, et la vidéo se lance d'un simple clic.">
        <VideoThumbGrid />
      </DemoSection>

      {/* Overlay text */}
      <DemoSection title="Vidéo avec un texte par-dessus" hint="Un message s'affiche directement sur la vidéo pour la présenter." contained={false}>
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl">
            <video autoPlay loop muted playsInline className="aspect-video w-full object-cover">
              <source src={media(videos.texte)} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-pain-dark/85 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex max-w-md flex-col justify-center p-8 text-creme md:p-14">
              <span className="text-sm uppercase tracking-widest text-ble-300">Savoir-faire</span>
              <h3 className="mt-3 font-serif text-3xl font-bold md:text-5xl">Pétri, plié, cuit. À la main.</h3>
              <p className="mt-4 text-creme/85">Chaque geste compte, et ça se voit à l'écran comme dans l'assiette.</p>
            </div>
          </div>
        </div>
      </DemoSection>

      {/* Testimonial video frame */}
      <DemoSection title="Témoignage d'un client en vidéo" hint="La parole d'un client mise en valeur dans un joli cadre.">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-4 shadow-xl">
          <VideoPlayer src={videos.maisonPassion} poster={assets[14].src} />
          <div className="p-5 text-center">
            <p className="font-accent text-lg italic text-muted-foreground">« BoulangeStudio a doublé nos commandes en ligne. »</p>
            <p className="mt-2 text-sm font-medium">Camille R. — La Maison Dorée</p>
          </div>
        </div>
      </DemoSection>

      {/* Embed */}
      <DemoSection title="Vidéo YouTube intégrée au site" hint="Une vidéo déjà publiée sur YouTube, affichée directement sur votre site et adaptée à tous les écrans.">
        <div className="overflow-hidden rounded-3xl">
          <iframe
            className="aspect-video w-full"
            src="https://www.youtube.com/embed/HwoOgtoSrSA"
            title="Vidéo de présentation boulangerie"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </DemoSection>
    </>
  );
}
