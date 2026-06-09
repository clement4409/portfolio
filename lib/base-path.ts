// Préfixe de chemin pour GitHub Pages (dépôt projet servi sous /<repo>).
// next/image et next/link l'ajoutent automatiquement ; PAS les balises brutes
// (<img>, <video>, <source>). On utilise media() pour ces cas-là.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Préfixe un chemin d'asset absolu (commençant par "/") avec le basePath. */
export const media = (path: string) => (path.startsWith("/") ? `${BASE_PATH}${path}` : path);
