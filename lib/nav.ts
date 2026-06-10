export type NavItem = { href: string; label: string; desc: string; icon?: string };

// Page d'accueil — toujours accessible directement.
export const homeItem: NavItem = {
  href: "/",
  label: "Accueil",
  desc: "L'agence en un coup d'œil",
  icon: "home",
};

// Les fonctionnalités que l'on peut intégrer à votre site. Libellés et
// descriptions volontairement orientés « bénéfice client » : chaque page est
// une démonstration concrète de ce que nous savons faire pour vous.
export const featureItems: NavItem[] = [
  { href: "/heroes", label: "Sections d'accroche", desc: "Bannières d'accueil percutantes qui captent l'attention", icon: "sparkles" },
  { href: "/galeries", label: "Galeries photo", desc: "Mosaïques, zoom plein écran, comparatif avant/après", icon: "images" },
  { href: "/videos", label: "Vidéos", desc: "Lecteurs intégrés, lecture auto, YouTube & Vimeo", icon: "play" },
  { href: "/carousels", label: "Carrousels", desc: "Diaporamas fluides et effets 3D pour vos produits", icon: "gallery-horizontal" },
  { href: "/animations", label: "Animations", desc: "Effets au défilement, compteurs animés, interactions", icon: "wand" },
  { href: "/formulaires", label: "Formulaires", desc: "Contact, multi-étapes, demande de devis", icon: "clipboard-list" },
  { href: "/navigation", label: "Menus & navigation", desc: "Barres de menu, méga-menus, ancres de page", icon: "menu" },
  { href: "/cartes", label: "Cartes & blocs", desc: "Fiches produits, équipe, grilles tarifaires", icon: "layout-grid" },
  { href: "/temoignages", label: "Avis clients", desc: "Notes, témoignages, preuves de confiance", icon: "star" },
  { href: "/contact", label: "Page présentation", desc: "Identité, carte, horaires, équipe, contact", icon: "store" },
  { href: "/footer", label: "Pieds de page", desc: "4 modèles de bas de page complets", icon: "panel-bottom" },
];

// Conservé pour compatibilité : l'ensemble accueil + fonctionnalités.
export const navItems: NavItem[] = [homeItem, ...featureItems];
