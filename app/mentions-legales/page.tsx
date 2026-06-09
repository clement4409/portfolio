import Link from "next/link";

export const metadata = { title: "Mentions légales" };

const sections = [
  {
    title: "Éditeur du site",
    body: (
      <>
        Ce site est édité par <strong className="text-foreground">A&amp;C Agency</strong>, agence
        digitale fondée par Clément &amp; Adam. Contact :{" "}
        <a href="mailto:acsitesweb@gmail.com" className="text-blue-600 underline-offset-4 hover:underline">
          acsitesweb@gmail.com
        </a>
        .
      </>
    ),
  },
  {
    title: "Conception & réalisation",
    body: <>Ce site a été conçu et réalisé par A&amp;C Agency, de A à Z.</>,
  },
  {
    title: "Hébergement",
    body: (
      <>
        Le site est hébergé par Hostinger (
        <a href="https://www.hostinger.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline-offset-4 hover:underline">
          hostinger.com
        </a>
        ).
      </>
    ),
  },
  {
    title: "Propriété intellectuelle",
    body: (
      <>
        Les textes, visuels et éléments graphiques présents sur ce site sont la propriété de
        A&amp;C Agency, sauf mention contraire. Toute reproduction sans autorisation est interdite.
      </>
    ),
  },
  {
    title: "Données personnelles",
    body: (
      <>
        Les formulaires du site ouvrent simplement votre messagerie pour nous écrire : aucune
        donnée n'est collectée ni stockée à votre insu. Pour toute question, écrivez-nous à
        l'adresse ci-dessus.
      </>
    ),
  },
];

export default function MentionsLegalesPage() {
  return (
    <section className="container max-w-2xl pt-32 pb-24 md:pt-40">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Mentions légales</h1>
      <p className="mt-3 text-muted-foreground">Site web réalisé par A&amp;C Agency.</p>

      <div className="mt-12 space-y-10">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{s.title}</h2>
            <p className="mt-2 leading-relaxed text-foreground/90">{s.body}</p>
          </section>
        ))}
      </div>

      <Link href="/" className="mt-14 inline-block text-sm font-medium text-blue-600 underline-offset-4 hover:underline">
        ← Retour à l'accueil
      </Link>
    </section>
  );
}
