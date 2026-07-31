import Link from "next/link";
import {
  Home,
  Building2,
  Ticket,
  Search,
  UserPlus,
  CreditCard,
  Star,
  Camera,
  Bell,
  QrCode,
  Shield,
  ArrowRight,
  CheckCircle,
  Play,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const profiles = [
  {
    id: "acheteur",
    label: "Acheteur / Locataire",
    icon: Search,
    color: "#C8922A",
    bg: "#F5E6C8",
    tagline: "Trouvez le bien idéal en quelques clics",
    steps: [
      {
        icon: UserPlus,
        title: "Créez votre compte",
        desc: "Inscription gratuite en moins de 2 minutes. Email, Google ou numéro de téléphone.",
      },
      {
        icon: Search,
        title: "Recherchez & filtrez",
        desc: "Utilisez nos filtres avancés : ville, type de bien, budget, surface, nombre de pièces.",
      },
      {
        icon: Bell,
        title: "Contactez le vendeur",
        desc: "Envoyez un message sécurisé directement depuis la fiche annonce. Aucun numéro de téléphone à trouver.",
      },
      {
        icon: CreditCard,
        title: "Réservez & payez",
        desc: "Pour les hôtels et billets d'événements, payez en ligne via Wave, Orange Money ou carte bancaire.",
      },
    ],
    cta: { label: "Explorer les annonces", href: "/immobilier" },
  },
  {
    id: "vendeur",
    label: "Vendeur / Bailleur",
    icon: Home,
    color: "#4A7C59",
    bg: "#D6EDE0",
    tagline: "Publiez et vendez plus vite",
    steps: [
      {
        icon: UserPlus,
        title: "Créez votre profil vendeur",
        desc: "Inscription gratuite. Complétez votre profil avec une photo et une pièce d'identité pour le badge Vérifié.",
      },
      {
        icon: Camera,
        title: "Publiez votre annonce",
        desc: "Titre accrocheur, description complète, 5+ photos de qualité. L'annonce est validée en moins de 24h.",
      },
      {
        icon: Bell,
        title: "Gérez vos demandes",
        desc: "Recevez les messages des acheteurs/locataires et répondez directement depuis votre tableau de bord.",
      },
      {
        icon: CreditCard,
        title: "Encaissez en sécurité",
        desc: "Pour les réservations en ligne, les fonds sont virés sur votre compte Mobile Money ou bancaire.",
      },
    ],
    cta: { label: "Publier une annonce", href: "/publier" },
  },
  {
    id: "organisateur",
    label: "Organisateur d'événements",
    icon: Ticket,
    color: "#C84B2F",
    bg: "#FAE8E3",
    tagline: "Vendez vos billets et gérez votre billetterie",
    steps: [
      {
        icon: UserPlus,
        title: "Créez votre compte organisateur",
        desc: "Inscription gratuite. Soumettez les informations de votre structure pour accéder au module billetterie.",
      },
      {
        icon: Camera,
        title: "Créez votre événement",
        desc: "Renseignez la date, le lieu, l'affiche et créez vos types de billets (Standard, VIP, Table...) avec vos tarifs.",
      },
      {
        icon: QrCode,
        title: "Billets QR automatiques",
        desc: "Chaque billet acheté génère un QR code unique envoyé automatiquement par email et disponible dans l'app.",
      },
      {
        icon: Star,
        title: "Scannez à l'entrée",
        desc: "Utilisez notre scanner intégré pour valider les billets à l'entrée. Temps réel, zéro fraude.",
      },
    ],
    cta: { label: "Créer un événement", href: "/publier" },
  },
];

const features = [
  {
    icon: Shield,
    title: "Annonces vérifiées",
    desc: "Modération manuelle de toutes les annonces. Badge Vérifié pour les propriétaires identifiés.",
  },
  {
    icon: CreditCard,
    title: "Paiements sécurisés",
    desc: "Wave, Orange Money, Stripe (carte). Argent conservé en escrow jusqu'à confirmation de la transaction.",
  },
  {
    icon: QrCode,
    title: "Billets QR uniques",
    desc: "Chaque billet est unique, nominatif et infalsifiable. Scan en temps réel à l'entrée de l'événement.",
  },
  {
    icon: Bell,
    title: "Messagerie sécurisée",
    desc: "Échangez directement entre vendeurs et acheteurs sans partager vos coordonnées personnelles.",
  },
  {
    icon: Search,
    title: "Recherche géolocalisée",
    desc: "Trouvez des biens et événements autour de vous grâce à la carte interactive et aux filtres avancés.",
  },
  {
    icon: Star,
    title: "Avis et notation",
    desc: "Système d'avis vérifiés pour vendeurs, hôteliers et organisateurs. La réputation au cœur du service.",
  },
];

const faqs = [
  {
    q: "L'inscription est-elle gratuite ?",
    a: "Oui, la création de compte est entièrement gratuite. La publication d'annonces est gratuite jusqu'à 3 annonces actives simultanées.",
  },
  {
    q: "Kasafrik prend-il une commission ?",
    a: "Kasafrik prélève 3% sur les transactions réalisées via la plateforme (réservations hôtelières, billets d'événements). La mise en relation immobilière est gratuite.",
  },
  {
    q: "Dans quels pays Kasafrik est-il disponible ?",
    a: "Kasafrik est actuellement disponible au Sénégal, en Côte d'Ivoire, au Cameroun et au Mali. L'expansion continue en 2025.",
  },
  {
    q: "Que faire en cas de problème avec une transaction ?",
    a: "Contactez notre support dans les 48h via contact@kasafrik.sn ou WhatsApp. Consultez notre politique de remboursement pour connaître vos droits.",
  },
];

export default function CommentCaMarchePage() {
  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1A1A2E] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#C8922A]/20 border border-[#C8922A]/30 rounded-full px-4 py-1.5 mb-6">
            <Play className="w-3.5 h-3.5 text-[#C8922A]" />
            <span className="text-xs font-semibold text-[#C8922A] uppercase tracking-wider">
              Comment ça marche
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5">
            Kasafrik,{" "}
            <span className="text-[#C8922A]">simple comme bonjour</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Que vous soyez acheteur, vendeur ou organisateur d&apos;événements,
            Kasafrik vous accompagne à chaque étape — en 4 étapes maximum.
          </p>

          {/* Profile tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {profiles.map((p) => {
              const Icon = p.icon;
              return (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all"
                >
                  <Icon className="w-4 h-4" style={{ color: p.color }} />
                  {p.label}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Profiles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {profiles.map((profile, profileIndex) => {
            const ProfileIcon = profile.icon;
            return (
              <div key={profile.id} id={profile.id} className="scroll-mt-24">
                {/* Profile header */}
                <div className="flex items-center gap-4 mb-10">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: profile.bg }}
                  >
                    <ProfileIcon className="w-7 h-7" style={{ color: profile.color }} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-0.5"
                      style={{ color: profile.color }}
                    >
                      Pour les {profile.label.toLowerCase()}s
                    </p>
                    <h2 className="text-2xl font-bold text-[#1A1A2E]">
                      {profile.tagline}
                    </h2>
                  </div>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {profile.steps.map((step, i) => {
                    const StepIcon = step.icon;
                    return (
                      <div key={i} className="relative">
                        {/* Connector line */}
                        {i < profile.steps.length - 1 && (
                          <div
                            className="hidden lg:block absolute top-6 left-full w-full h-px z-0"
                            style={{
                              background: `linear-gradient(to right, ${profile.color}40, transparent)`,
                            }}
                          />
                        )}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative z-10 hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3 mb-4">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: profile.bg }}
                            >
                              <StepIcon
                                className="w-5 h-5"
                                style={{ color: profile.color }}
                              />
                            </div>
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                              style={{ backgroundColor: profile.color }}
                            >
                              {i + 1}
                            </div>
                          </div>
                          <h3 className="font-bold text-[#1A1A2E] mb-2 text-sm">
                            {step.title}
                          </h3>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Link href={profile.cta.href}>
                  <button
                    className="inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-xl transition-all text-white text-sm"
                    style={{ backgroundColor: profile.color }}
                  >
                    {profile.cta.label} <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>

                {profileIndex < profiles.length - 1 && (
                  <div className="mt-20 border-t border-gray-200" />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3">
              Ce qui nous différencie
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Kasafrik est conçu pour la réalité africaine : mobile-first,
              paiements locaux, support francophone.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="flex items-start gap-4 p-5 rounded-xl bg-[#F7F2EA] border border-gray-100"
                >
                  <div className="w-10 h-10 bg-[#F5E6C8] rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#C8922A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A2E] text-sm mb-1">
                      {f.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-8 text-center">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#C8922A] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1A1A2E] text-sm mb-1.5">
                      {faq.q}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#C8922A] to-[#8A6118]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Créez votre compte gratuitement et rejoignez 15 000+ utilisateurs
            qui font confiance à Kasafrik.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <button className="px-8 py-3 bg-white text-[#C8922A] font-bold rounded-xl hover:bg-[#F5E6C8] transition-all shadow-xl">
                Créer un compte gratuit
              </button>
            </Link>
            <Link href="/aide">
              <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all">
                Centre d&apos;aide
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
