import { PageHeader, DemoSection } from "@/components/demo";
import { IntroExplainer } from "@/components/intro-explainer";
import {
  ContactForm, MultiStepForm, QuoteForm, SearchField, FileUpload, NewsletterForm,
} from "@/components/forms";

export const metadata = { title: "Formulaires & Contact" };

export default function FormulairesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Formulaires & Contact"
        title="Convertir les visiteurs en clients"
        description="Contact avec validation en temps réel, devis multi-étapes, recherche, upload drag & drop et newsletter."
      />

      <IntroExplainer
        title="À quoi sert un formulaire ?"
        intro={
          <>
            <p className="text-lg">
              Un formulaire, ce sont les champs à remplir pour vous envoyer un message : contact,
              demande de devis, inscription à la newsletter, recherche…
            </p>
            <p>
              C'est comme un bon de commande ou un cahier de réservations : le visiteur écrit ce
              qu'il veut, et vous recevez l'information proprement, prête à traiter.
            </p>
            <p>
              Bien fait, il guide la personne, signale les erreurs au fur et à mesure et confirme
              que le message est bien parti.
            </p>
          </>
        }
        oneLiner="Un formulaire transforme un simple visiteur en contact concret : message, devis ou commande."
        aside={
          <p>
            Et ça compte : c'est souvent le pont entre « je regarde » et « je vous contacte ».
          </p>
        }
      />

      <DemoSection title="Contact · validation en temps réel" hint="Messages d'erreur et de succès sous chaque champ, à la sortie du focus.">
        <div className="mx-auto max-w-xl"><ContactForm /></div>
      </DemoSection>

      <DemoSection title="Formulaire multi-étapes" hint="Indicateur de progression et navigation avant/arrière.">
        <div className="mx-auto max-w-xl"><MultiStepForm /></div>
      </DemoSection>

      <DemoSection title="Devis · options stylisées" hint="Cases à cocher personnalisées et estimation en direct.">
        <div className="mx-auto max-w-2xl"><QuoteForm /></div>
      </DemoSection>

      <DemoSection title="Recherche avec suggestions" hint="Auto-complétion à la frappe.">
        <SearchField />
      </DemoSection>

      <DemoSection title="Upload drag & drop" hint="Zone de dépôt avec retour visuel et liste des fichiers.">
        <div className="mx-auto max-w-xl"><FileUpload /></div>
      </DemoSection>

      <DemoSection title="Newsletter · animation de succès" hint="État de chargement puis confirmation animée.">
        <NewsletterForm />
      </DemoSection>
    </>
  );
}
