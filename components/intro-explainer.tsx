import type { ReactNode } from "react";
import { DemoSection } from "@/components/demo";

/**
 * Bloc de présentation grand public placé en intro de chaque page de démos.
 * Sans cœur (favorite={false}) : c'est une explication, pas un exemple à mettre en favori.
 */
export function IntroExplainer({
  title,
  intro,
  oneLiner,
  aside,
}: {
  title: string;
  intro: ReactNode; // paragraphes de la colonne de gauche
  oneLiner: ReactNode; // l'accroche « En une phrase »
  aside?: ReactNode; // paragraphe complémentaire (« Et ça compte… »)
}) {
  return (
    <DemoSection title={title} hint="Expliqué simplement, sans terme technique." favorite={false}>
      <div className="grid gap-6 rounded-3xl border border-border bg-card p-8 md:p-12 lg:grid-cols-2">
        <div className="space-y-4 text-muted-foreground">{intro}</div>
        <div className="space-y-4">
          <div className="rounded-2xl bg-blue-600/5 p-6">
            <p className="text-sm font-semibold text-blue-600">En une phrase</p>
            <p className="mt-2 text-lg font-medium text-foreground">{oneLiner}</p>
          </div>
          {aside && <div className="space-y-4 text-muted-foreground">{aside}</div>}
          <p className="text-muted-foreground">
            Juste en dessous, vous trouverez plusieurs exemples que nous réalisons. Nos exemples
            mettent en scène une boulangerie, mais le même travail s'adapte à n'importe quel
            métier : restaurant, artisan, commerce, et bien d'autres.
          </p>
        </div>
      </div>
    </DemoSection>
  );
}
