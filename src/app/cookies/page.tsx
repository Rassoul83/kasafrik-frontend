import Link from "next/link";
import { Cookie, Calendar, Shield, ToggleRight, Info } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const cookieTypes = [
  {
    id: "essentiels",
    name: "Cookies essentiels",
    required: true,
    icon: Shield,
    color: "#4A7C59",
    bg: "#D6EDE0",
    description:
      "Ces cookies sont indispensables au fonctionnement de la plateforme. Ils ne peuvent pas être désactivés.",
    cookies: [
      {
        name: "ka_session",
        purpose: "Maintien de votre session de connexion",
        duration: "Session (fermée à la déconnexion)",
        provider: "Kasafrik",
      },
      {
        name: "ka_csrf",
        purpose: "Protection contre les attaques CSRF (falsification de requêtes)",
        duration: "Session",
        provider: "Kasafrik",
      },
      {
        name: "ka_lang",
        purpose: "Mémorisation de votre préférence de langue",
        duration: "1 an",
        provider: "Kasafrik",
      },
      {
        name: "ka_consent",
        purpose: "Enregistrement de vos préférences de cookies",
        duration: "13 mois",
        provider: "Kasafrik",
      },
    ],
  },
  {
    id: "analytiques",
    name: "Cookies analytiques",
    required: false,
    icon: ToggleRight,
    color: "#635BFF",
    bg: "#F0EFFF",
    description:
      "Ces cookies nous permettent de mesurer l'audience et d'améliorer nos pages. Ils collectent des données anonymisées.",
    cookies: [
      {
        name: "_ga, _ga_*",
        purpose: "Google Analytics — mesure d'audience et comportement utilisateur (anonymisé)",
        duration: "13 mois",
        provider: "Google LLC",
      },
      {
        name: "_fbp",
        purpose: "Meta Pixel — mesure des conversions publicitaires",
        duration: "3 mois",
        provider: "Meta Platforms",
      },
      {
        name: "ka_perf",
        purpose: "Mesure des performances techniques (temps de chargement, erreurs)",
        duration: "30 jours",
        provider: "Kasafrik",
      },
    ],
  },
  {
    id: "marketing",
    name: "Cookies marketing",
    required: false,
    icon: ToggleRight,
    color: "#C8922A",
    bg: "#F5E6C8",
    description:
      "Ces cookies permettent de vous proposer des publicités personnalisées et de mesurer leur efficacité.",
    cookies: [
      {
        name: "_fbp, fr",
        purpose: "Meta Ads — personnalisation des publicités Facebook/Instagram",
        duration: "3 mois",
        provider: "Meta Platforms",
      },
      {
        name: "IDE, __gads",
        purpose: "Google Ads — publicités personnalisées sur le réseau Google",
        duration: "13 mois",
        provider: "Google LLC",
      },
      {
        name: "ka_retarget",
        purpose: "Retargeting Kasafrik — rappel d'annonces consultées",
        duration: "60 jours",
        provider: "Kasafrik",
      },
    ],
  },
  {
    id: "fonctionnels",
    name: "Cookies fonctionnels",
    required: false,
    icon: ToggleRight,
    color: "#1A1A2E",
    bg: "#E8E8F0",
    description:
      "Ces cookies améliorent votre expérience en mémorisant vos préférences et personnalisations.",
    cookies: [
      {
        name: "ka_prefs",
        purpose: "Mémorisation de vos filtres de recherche (ville, budget, type)",
        duration: "6 mois",
        provider: "Kasafrik",
      },
      {
        name: "ka_wishlist",
        purpose: "Sauvegarde de vos annonces favorites",
        duration: "6 mois",
        provider: "Kasafrik",
      },
      {
        name: "intercom-*",
        purpose: "Chat de support client en temps réel",
        duration: "9 mois",
        provider: "Intercom Inc.",
      },
    ],
  },
];

const rights = [
  {
    title: "Consentement",
    desc: 'Lors de votre première visite, un bandeau vous permet d\'accepter, refuser ou personnaliser les cookies non essentiels. Cliquez sur "Gérer mes cookies" pour modifier vos choix.',
  },
  {
    title: "Paramètres navigateur",
    desc: "Vous pouvez configurer votre navigateur pour refuser tous les cookies ou être averti avant leur dépôt. Consultez l'aide de votre navigateur : Chrome, Firefox, Safari, Edge.",
  },
  {
    title: "Opt-out tiers",
    desc: "Pour les cookies Google Analytics, utilisez le module complémentaire de désactivation : tools.google.com/dlpage/gaoptout. Pour Meta : facebook.com/settings?tab=ads.",
  },
  {
    title: "Conséquences du refus",
    desc: "Le refus des cookies analytiques et marketing n'altère pas votre accès aux fonctionnalités essentielles de Kasafrik. Seule la personnalisation de votre expérience sera réduite.",
  },
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1A1A2E] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#C8922A]/20 flex items-center justify-center">
              <Cookie className="w-5 h-5 text-[#C8922A]" />
            </div>
            <span className="text-xs font-semibold text-[#C8922A] uppercase tracking-wider">
              Politique cookies
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Gestion des cookies
          </h1>
          <p className="text-gray-400 leading-relaxed max-w-2xl">
            Kasafrik utilise des cookies pour assurer le bon fonctionnement de
            la plateforme et améliorer votre expérience. Cette page détaille
            les cookies utilisés et vous explique comment les gérer.
          </p>
          <div className="flex items-center gap-2 mt-6 text-xs text-gray-500">
            <Calendar className="w-3.5 h-3.5" />
            Dernière mise à jour : 1er janvier 2025
          </div>
        </div>
      </section>

      {/* Qu'est-ce qu'un cookie */}
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#F5E6C8] rounded-xl flex items-center justify-center shrink-0">
                <Info className="w-5 h-5 text-[#C8922A]" />
              </div>
              <div>
                <h2 className="font-bold text-[#1A1A2E] mb-2">
                  Qu&apos;est-ce qu&apos;un cookie ?
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Un cookie est un petit fichier texte déposé sur votre
                  appareil (ordinateur, téléphone, tablette) lors de votre
                  visite sur un site web. Les cookies permettent au site de
                  mémoriser des informations sur votre visite, comme votre
                  langue préférée et d&apos;autres paramètres. Cela peut faciliter
                  votre prochaine visite et rendre le site plus utile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie types */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {cookieTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div
                key={type.id}
                id={type.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between p-5 border-b border-gray-100"
                  style={{ backgroundColor: type.bg }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white/60 rounded-xl flex items-center justify-center">
                      <Icon className="w-4 h-4" style={{ color: type.color }} />
                    </div>
                    <div>
                      <h2
                        className="font-bold text-sm"
                        style={{ color: type.color }}
                      >
                        {type.name}
                      </h2>
                      <p className="text-xs text-gray-500">{type.description}</p>
                    </div>
                  </div>
                  <div>
                    {type.required ? (
                      <span className="text-xs font-semibold px-3 py-1 bg-[#4A7C59] text-white rounded-full">
                        Toujours actifs
                      </span>
                    ) : (
                      <span className="text-xs font-semibold px-3 py-1 bg-gray-200 text-gray-600 rounded-full">
                        Optionnels
                      </span>
                    )}
                  </div>
                </div>

                {/* Cookie table */}
                <div className="p-5">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="text-left font-semibold text-gray-400 pb-2 pr-4">
                            Nom
                          </th>
                          <th className="text-left font-semibold text-gray-400 pb-2 pr-4">
                            Finalité
                          </th>
                          <th className="text-left font-semibold text-gray-400 pb-2 pr-4">
                            Durée
                          </th>
                          <th className="text-left font-semibold text-gray-400 pb-2">
                            Émetteur
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {type.cookies.map((cookie, i) => (
                          <tr key={i}>
                            <td className="py-2.5 pr-4 font-mono text-[#1A1A2E] font-medium">
                              {cookie.name}
                            </td>
                            <td className="py-2.5 pr-4 text-gray-600 leading-relaxed">
                              {cookie.purpose}
                            </td>
                            <td className="py-2.5 pr-4 text-gray-500 whitespace-nowrap">
                              {cookie.duration}
                            </td>
                            <td className="py-2.5 text-gray-500 whitespace-nowrap">
                              {cookie.provider}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Manage cookies */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-6">
            Comment gérer vos cookies ?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rights.map((right, i) => (
              <div
                key={i}
                className="bg-[#F7F2EA] rounded-xl p-5 border border-gray-100"
              >
                <h3 className="font-semibold text-[#1A1A2E] text-sm mb-2">
                  {right.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {right.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button className="inline-flex items-center gap-2 bg-[#C8922A] hover:bg-[#8A6118] text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm shadow-lg shadow-[#C8922A]/30">
              <Cookie className="w-4 h-4" />
              Gérer mes préférences de cookies
            </button>
          </div>
        </div>
      </section>

      {/* Legal base */}
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1A1A2E] rounded-2xl p-6">
            <h3 className="text-white font-bold mb-3">Base légale</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              La présente politique de cookies est établie conformément à la{" "}
              <strong className="text-gray-300">
                Loi sénégalaise n° 2008-12 sur la protection des données
                personnelles
              </strong>{" "}
              et aux{" "}
              <strong className="text-gray-300">
                recommandations de la CNIL (France)
              </strong>{" "}
              et du{" "}
              <strong className="text-gray-300">
                Comité Européen de la Protection des Données (CEPD)
              </strong>
              .
            </p>
            <p className="text-gray-500 text-xs">
              Des questions ?{" "}
              <Link
                href="/contact"
                className="text-[#C8922A] hover:underline"
              >
                Contactez notre DPO
              </Link>{" "}
              à privacy@kasafrik.sn — Voir aussi notre{" "}
              <Link
                href="/confidentialite"
                className="text-[#C8922A] hover:underline"
              >
                politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
