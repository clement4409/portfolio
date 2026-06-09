// Centralised catalogue of bakery assets available in /public/assets

export type Asset = {
  src: string;
  alt: string;
  category: "Pains" | "Viennoiseries" | "Patisseries" | "Boutique" | "Salé";
};

const img = (file: string) => `/assets/images/${file}`;

export const assets: Asset[] = [
  { src: img("baguette.jpg"), alt: "Baguette tradition croustillante", category: "Pains" },
  { src: img("paindecampagne.jpg"), alt: "Pain de campagne au levain", category: "Pains" },
  { src: img("paindeseigle.jpg"), alt: "Pain de seigle artisanal", category: "Pains" },
  { src: img("croissant.jpg"), alt: "Croissant pur beurre doré", category: "Viennoiseries" },
  { src: img("painchocolat.jpg"), alt: "Pain au chocolat feuilleté", category: "Viennoiseries" },
  { src: img("kouign-amann.jpg"), alt: "Kouign-amann breton caramélisé", category: "Viennoiseries" },
  { src: img("eclair.jpg"), alt: "Éclair au chocolat glacé", category: "Patisseries" },
  { src: img("fraisier.jpg"), alt: "Fraisier crème mousseline", category: "Patisseries" },
  { src: img("tartetatin.jpg"), alt: "Tarte Tatin aux pommes", category: "Patisseries" },
  { src: img("piecemontee.jpg"), alt: "Pièce montée de mariage", category: "Patisseries" },
  { src: img("cafegourmand.jpg"), alt: "Café gourmand et mignardises", category: "Patisseries" },
  { src: img("Quiche-lorraine.jpg"), alt: "Quiche lorraine maison", category: "Salé" },
  { src: img("sandwich.jpg"), alt: "Sandwich baguette garni", category: "Salé" },
  { src: img("devanture.jpg"), alt: "Devanture de la boulangerie", category: "Boutique" },
  { src: img("devanture2.jpg"), alt: "Façade et étal de la boutique", category: "Boutique" },
  { src: img("etalage.jpg"), alt: "Étalage de pains et viennoiseries", category: "Boutique" },
  { src: img("etalage2.jpg"), alt: "Vitrine de la boulangerie", category: "Boutique" },
];

export const videos = {
  ambiance: "/assets/videos/ambiance.mp4",
  ambianceSlow: "/assets/videos/ambiance-slow.mp4",
  maisonPassion: "/assets/videos/maison-passion.mp4",
  maisonFondee: "/assets/videos/maison-fondee.mp4",
  texte: "/assets/videos/ambiance-slow.mp4",
};

export const byCategory = (cat: Asset["category"]) =>
  assets.filter((a) => a.category === cat);

export const hero = img("etalage.jpg");
export const devanture = img("devanture.jpg");
