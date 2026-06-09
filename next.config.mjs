/** @type {import('next').NextConfig} */
// Sur GitHub Pages (dépôt projet), le site est servi sous /<nom-du-repo>.
// Le workflow CI renseigne NEXT_PUBLIC_BASE_PATH (ex: "/portfolio").
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  // Export 100% statique pour GitHub Pages (pas de serveur Node).
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    // GitHub Pages ne peut pas exécuter l'optimiseur d'images de Next.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
