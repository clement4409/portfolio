// Préfixe de chemin pour GitHub Pages (dépôt projet servi sous /<repo>).
// next/image et next/link l'ajoutent automatiquement ; PAS les balises brutes
// (<img>, <video>, <source>). On utilise media() pour ces cas-là.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Préfixe un chemin d'asset absolu ("/...") avec le basePath.
 * Idempotent : ne double pas le préfixe si le chemin l'a déjà.
 */
export const media = (path: string) => {
  if (!path.startsWith("/")) return path; // externe (http…)
  if (BASE_PATH && path.startsWith(`${BASE_PATH}/`)) return path; // déjà préfixé
  return `${BASE_PATH}${path}`;
};
