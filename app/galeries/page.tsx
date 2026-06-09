import Image from "next/image";
import { PageHeader, DemoSection } from "@/components/demo";
import { LightboxGallery } from "@/components/lightbox-gallery";
import { FilterGallery } from "@/components/filter-gallery";
import { BeforeAfter } from "@/components/before-after";
import InteractiveImageBentoGallery from "@/components/ui/bento-gallery";
import { assets } from "@/lib/assets";

// Vitrine défilante : on fait glisser horizontalement, on clique pour agrandir.
// Disposition bento (cartes de tailles variées sur 2 rangées) + assez d'images pour déborder.
const bentoItems = [
  { id: 1, title: assets[3].alt, desc: "Viennoiseries", url: assets[3].src, span: "md:col-span-2 md:row-span-2" },
  { id: 2, title: assets[0].alt, desc: "Pains", url: assets[0].src, span: "md:row-span-1" },
  { id: 3, title: assets[7].alt, desc: "Pâtisseries", url: assets[7].src, span: "md:row-span-1" },
  { id: 4, title: assets[5].alt, desc: "Viennoiseries", url: assets[5].src, span: "md:row-span-2" },
  { id: 5, title: assets[8].alt, desc: "Pâtisseries", url: assets[8].src, span: "md:row-span-1" },
  { id: 6, title: assets[1].alt, desc: "Pains", url: assets[1].src, span: "md:col-span-2 md:row-span-1" },
  { id: 7, title: assets[6].alt, desc: "Pâtisseries", url: assets[6].src, span: "md:row-span-1" },
  { id: 8, title: assets[4].alt, desc: "Viennoiseries", url: assets[4].src, span: "md:row-span-2" },
];

export const metadata = { title: "Images & Galeries" };

export default function GaleriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Images & Galeries"
        title="Mettre vos produits en vitrine"
        description="Sept façons d'afficher des images : masonry, lightbox, filtres, before/after et chargement progressif."
      />

      {/* EXPLICATION SIMPLE — pour les clients non informaticiens */}
      <DemoSection title="C'est quoi, une « galerie » ?" hint="Expliqué simplement, sans terme technique." code={false} favorite={false}>
        <div className="grid gap-6 rounded-3xl border border-border bg-card p-8 md:p-12 lg:grid-cols-2">
          <div className="space-y-4 text-muted-foreground">
            <p className="text-lg">
              Une <strong className="text-foreground">galerie</strong>, c'est simplement une
              façon d'organiser et de présenter plusieurs photos sur votre site : vos produits,
              vos réalisations, votre boutique, votre équipe…
            </p>
            <p>
              C'est un peu comme un <strong className="text-foreground">album photo</strong> ou
              la <strong className="text-foreground">vitrine d'un magasin</strong> : on veut que
              chaque image soit mise en valeur, et qu'il soit agréable de les parcourir, sur
              ordinateur comme sur téléphone.
            </p>
            <p>
              Selon ce que vous vendez, on choisit la présentation la plus adaptée : une grille
              bien rangée pour un catalogue, un agrandissement au clic pour admirer les détails,
              des filtres pour trier par catégorie, ou encore un « avant / après » pour montrer
              une transformation.
            </p>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-blue-600/5 p-6">
              <p className="text-sm font-semibold text-blue-600">En une phrase</p>
              <p className="mt-2 text-lg font-medium">
                Une galerie, c'est la mise en valeur de vos plus belles photos, pour donner envie
                d'en voir plus — et d'acheter.
              </p>
            </div>
            <p className="text-muted-foreground">
              Et ça compte vraiment : de belles images bien présentées rassurent le visiteur et
              donnent une image soignée et professionnelle de votre activité.
            </p>
            <p className="text-muted-foreground">
              Juste en dessous, vous trouverez plusieurs styles de galeries que nous réalisons.
              Nos exemples mettent en scène une boulangerie, mais le même travail s'adapte à
              n'importe quel métier : restaurant, artisan, commerce, et bien d'autres.
            </p>
          </div>
        </div>
      </DemoSection>

      {/* Masonry */}
      <DemoSection title="Mur de photos « façon magazine »" hint="Les images de tailles différentes s'imbriquent joliment, comme dans un magazine.">
        <div className="columns-2 gap-3 md:columns-3 [&>*]:mb-3">
          {assets.slice(0, 3).map((a, i) => (
            <figure key={a.src} className="group relative overflow-hidden rounded-xl break-inside-avoid">
              <Image
                src={a.src}
                alt={a.alt}
                width={600}
                height={i % 3 === 0 ? 800 : i % 2 === 0 ? 500 : 650}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </DemoSection>

      {/* Uniform 3x3 hover zoom */}
      <DemoSection title="Grille bien alignée · l'image grossit au passage de la souris" hint="Toutes les photos à la même taille, comme un catalogue bien rangé.">
        <div className="grid grid-cols-3 gap-3">
          {[assets[3], assets[4], assets[0]].map((a) => (
            <figure key={a.src} className="group relative aspect-square overflow-hidden rounded-xl">
              <Image src={a.src} alt={a.alt} fill sizes="33vw" className="object-cover transition-transform duration-500 group-hover:scale-125" />
            </figure>
          ))}
        </div>
      </DemoSection>

      {/* Lightbox */}
      <DemoSection title="Cliquez pour agrandir une photo" hint="La photo s'ouvre en grand au centre de l'écran ; on passe de l'une à l'autre, comme un diaporama.">
        <LightboxGallery items={assets.slice(6, 9)} />
      </DemoSection>

      {/* Filtered */}
      <DemoSection title="Trier les photos par catégorie" hint="Le visiteur clique sur un thème (pains, viennoiseries…) et ne voit que les photos correspondantes.">
        <FilterGallery />
      </DemoSection>

      {/* Caption on hover */}
      <DemoSection title="Le nom de la photo apparaît au passage de la souris" hint="Un petit texte glisse par-dessus l'image pour la présenter.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assets.slice(9, 12).map((a) => (
            <figure key={a.src} className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src={a.src} alt={a.alt} fill sizes="33vw" className="object-cover" />
              <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-pain-dark/90 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="translate-y-3 font-serif text-xl text-creme transition-transform duration-300 group-hover:translate-y-0">{a.alt}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </DemoSection>

      {/* Bento gallery défilante */}
      <DemoSection title="Vitrine défilante · glissez puis cliquez" hint="Faites glisser les photos sur le côté, et cliquez sur l'une d'elles pour la voir en grand." contained={false}>
        <InteractiveImageBentoGallery
          imageItems={bentoItems}
          title="Notre vitrine en images"
          description="Glissez pour faire défiler, cliquez sur une photo pour l'agrandir."
        />
      </DemoSection>

      {/* Before/After */}
      <DemoSection title="Avant / Après · faites glisser pour comparer" hint="Déplacez le curseur sur l'image pour passer du « avant » à l'« après » : parfait pour montrer une transformation.">
        <BeforeAfter
          before={assets[13].src}
          after={assets[15].src}
          beforeAlt="Devanture de la boulangerie"
          afterAlt="Étalage de pains et viennoiseries"
        />
      </DemoSection>    </>
  );
}
