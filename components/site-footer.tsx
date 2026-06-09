import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { navItems } from "@/lib/nav";
import { media } from "@/lib/base-path";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 bg-slate-950 text-slate-100">
      {/* wave separator */}
      <div className="absolute -top-px left-0 w-full overflow-hidden leading-none rotate-180" aria-hidden>
        <svg className="relative block h-[60px] w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22,103.59,32.05,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,30.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" className="text-background" />
        </svg>
      </div>

      <div className="container grid gap-12 pt-20 pb-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="inline-flex items-center focus-ring rounded-lg" aria-label="A&C Agency — accueil">
            <Image src={media("/logo.png")} alt="A&C Agency" width={160} height={56} className="h-12 w-auto" />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-slate-400">
            Agence digitale fondée par Clément &amp; Adam. Nous rendons le numérique
            accessible aux petites entreprises avec des sites modernes et sur-mesure.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { Icon: Instagram, href: "https://www.instagram.com/acagency44/", label: "Instagram" },
              { Icon: Facebook, href: "#", label: "Facebook" },
              { Icon: Linkedin, href: "#", label: "LinkedIn" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-blue-600 hover:text-white focus-ring"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Pages" >
          <h3 className="font-serif text-lg">Navigation</h3>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-400">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-blue-400 focus-ring rounded">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-serif text-lg">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-400" /> France</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-blue-400" /> Sur demande</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-blue-400" /> acsitesweb@gmail.com</li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg">Un projet ?</h3>
          <p className="mt-4 text-sm text-slate-400">
            Votre activité mérite plus qu'un simple site web. Construisons ensemble
            votre présence numérique.
          </p>
          <Link
            href="/#contact"
            className="mt-4 inline-flex rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 focus-ring"
          >
            Demander un devis
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} A&amp;C Agency · Clément &amp; Adam.</p>
          <div className="flex items-center gap-4">
            <Link href="/mentions-legales" className="transition-colors hover:text-slate-300">
              Mentions légales
            </Link>
            <p>Conçu avec Next.js, Tailwind &amp; Framer Motion.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
