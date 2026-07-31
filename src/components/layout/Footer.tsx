import Link from "next/link";
import Image from "next/image";

const columns = [
  {
    title: "Kasafrik",
    links: [
      { label: "À propos",          href: "/a-propos"          },
      { label: "Comment ça marche", href: "/comment-ca-marche" },
      { label: "Blog",              href: "/blog"              },
      { label: "Carrières",         href: "/carrieres"         },
      { label: "Contact",           href: "/contact"           },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Immobilier",            href: "/immobilier" },
      { label: "Hôtels & Guesthouses",  href: "/hotels"     },
      { label: "Événements",            href: "/evenements" },
      { label: "Billetterie",           href: "/billetterie"},
      { label: "Publier une annonce",   href: "/publier"    },
    ],
  },
  {
    title: "Aide",
    links: [
      { label: "Centre d'aide",              href: "/aide"            },
      { label: "Guide vendeur",              href: "/aide/vendeur"    },
      { label: "Politique de remboursement", href: "/remboursement"   },
      { label: "Confidentialité",            href: "/confidentialite" },
      { label: "Conditions d'utilisation",   href: "/conditions"      },
    ],
  },
];

/* ─── Logos paiement — dark theme ─────────────────────────────────────────── */

function WaveLogo() {
  return (
    <svg width="52" height="26" viewBox="0 0 52 26" fill="none" aria-label="Wave">
      <rect width="52" height="26" rx="7" fill="#0A1F2E" />
      <text x="8" y="18" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="800" fill="#1DAEFF" letterSpacing="-0.5">Wave</text>
    </svg>
  );
}

function OrangeMoneyLogo() {
  return (
    <svg width="66" height="26" viewBox="0 0 66 26" fill="none" aria-label="Orange Money">
      <rect width="66" height="26" rx="7" fill="#2A1200" />
      <circle cx="13" cy="13" r="7" fill="#FF6600" />
      <text x="10" y="17" fontFamily="Arial, sans-serif" fontSize="8.5" fontWeight="900" fill="white">O</text>
      <text x="24" y="17" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="700" fill="#FF6600">Orange</text>
    </svg>
  );
}

function StripeLogo() {
  return (
    <svg width="56" height="26" viewBox="0 0 56 26" fill="none" aria-label="Stripe">
      <rect width="56" height="26" rx="7" fill="#0D0D28" />
      <path d="M11 10C11 8.34 12.34 7 14 7C15.66 7 17 8.34 17 10C17 11.2 16.28 12.24 15.24 12.76C16.82 13.18 18 14.66 18 16.4C18 18.39 16.39 20 14.4 20C12.41 20 10.8 18.39 10.8 16.4" stroke="#7B72FF" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <text x="22" y="17" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="700" fill="#7B72FF">Stripe</text>
    </svg>
  );
}

function PayPalLogo() {
  return (
    <svg width="62" height="26" viewBox="0 0 62 26" fill="none" aria-label="PayPal">
      <rect width="62" height="26" rx="7" fill="#050F1E" />
      <text x="7" y="17" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="900" fill="#4A90D9">P</text>
      <text x="14" y="17" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="900" fill="#009CDE">P</text>
      <text x="23" y="17" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="700" fill="#4A90D9">ayPal</text>
    </svg>
  );
}

function CarteLogo() {
  return (
    <svg width="58" height="26" viewBox="0 0 58 26" fill="none" aria-label="Carte bancaire">
      <rect width="58" height="26" rx="7" fill="#0D0D1A" stroke="rgba(200,146,42,0.25)" strokeWidth="1" />
      <rect x="6" y="7" width="13" height="10" rx="2" stroke="#C8922A" strokeWidth="1.2" fill="none" />
      <rect x="8.5" y="9.5" width="4" height="3" rx="0.5" fill="#C8922A" />
      <line x1="6" y1="12.5" x2="19" y2="12.5" stroke="#C8922A" strokeWidth="1" />
      <text x="22" y="17" fontFamily="Arial, sans-serif" fontSize="8.5" fontWeight="700" fill="#C8922A">Carte</text>
    </svg>
  );
}

const paymentLogos = [
  { key: "wave",   Logo: WaveLogo        },
  { key: "orange", Logo: OrangeMoneyLogo },
  { key: "stripe", Logo: StripeLogo      },
  { key: "paypal", Logo: PayPalLogo      },
  { key: "carte",  Logo: CarteLogo       },
];

/* ─── Réseaux sociaux ─────────────────────────────────────────────────────── */

const socials = [
  {
    href: "https://facebook.com/kasafrik",
    label: "Facebook",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    href: "https://instagram.com/kasafrik",
    label: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    href: "https://twitter.com/kasafrik",
    label: "X / Twitter",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    href: "https://linkedin.com/company/kasafrik",
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    href: "https://wa.me/221770000000",
    label: "WhatsApp",
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
  },
];

/* ─── Footer ───────────────────────────────────────────────────────────────── */

export default function Footer() {
  return (
    <footer className="relative text-white overflow-hidden" style={{ background: "#0D0D1A" }}>

      {/* ── Ligne gold 2px en haut ────────────────────────────────── */}
      <div className="gold-shimmer" style={{ height: "2px" }} aria-hidden="true" />

      {/* ── Décoration fond ──────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-48 -right-48 w-[400px] h-[400px] rounded-full bg-[#C8922A]/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32  w-[350px] h-[350px] rounded-full bg-[#C84B2F]/4 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* ── Ligne du haut : logo + baseline + réseaux ─────────── */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-14">
          <div className="max-w-sm">
            <div className="mb-5">
              <Image
                src="/logo.png"
                alt="Kasafrik"
                width={120}
                height={60}
                style={{ objectFit: "contain" }}
              />
            </div>
            <p className="text-[14px] text-gray-400 leading-relaxed mb-4">
              La référence immobilière &amp; événementielle en Afrique de l&apos;Ouest.
              Achetez, louez, réservez et participez — tout en un, en toute sécurité.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8922A]/20 bg-[#C8922A]/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A7C59] animate-pulse-dot" />
              <span className="text-[11px] text-gray-400 font-medium">Support 7j/7 · Dakar, Sénégal</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-bold text-gray-600 uppercase tracking-widest">
              Nous suivre
            </p>
            <div className="flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center hover:bg-[#C8922A] hover:border-[#C8922A] transition-all duration-250 group"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-500 group-hover:fill-white transition-colors">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Colonnes de liens ──────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-14">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-bold text-[#C8922A] mb-5 uppercase tracking-widest">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-0 h-px bg-[#C8922A] group-hover:w-3 transition-all duration-200 rounded" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Paiements ─────────────────────────────────────────── */}
        <div className="border-t border-white/6 pt-10">
          <p className="text-[11px] text-gray-600 mb-5 uppercase tracking-widest font-bold">
            Paiements acceptés
          </p>
          <div className="flex flex-wrap gap-3 mb-10 items-center">
            {paymentLogos.map(({ key, Logo }) => (
              <div
                key={key}
                className="hover:scale-105 hover:brightness-110 transition-all duration-200 cursor-default"
              >
                <Logo />
              </div>
            ))}
          </div>

          {/* ── Barre basse ───────────────────────────────────────── */}
          <div className="border-t border-white/6 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-[12px] text-gray-600">
              © {new Date().getFullYear()} Kasafrik · Tous droits réservés ·{" "}
              <span className="text-gray-700">Dakar, Sénégal</span>
            </p>
            <div className="flex gap-5">
              <Link href="/confidentialite" className="text-[12px] text-gray-600 hover:text-[#C8922A] transition-colors">
                Confidentialité
              </Link>
              <Link href="/conditions" className="text-[12px] text-gray-600 hover:text-[#C8922A] transition-colors">
                Conditions
              </Link>
              <Link href="/cookies" className="text-[12px] text-gray-600 hover:text-[#C8922A] transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
