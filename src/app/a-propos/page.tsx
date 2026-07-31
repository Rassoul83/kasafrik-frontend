import Image from "next/image";
import Link from "next/link";
import {
  Target,
  Heart,
  Shield,
  Globe,
  Users,
  TrendingUp,
  MapPin,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const values = [
  {
    icon: Shield,
    title: "Confiance",
    desc: "Chaque annonce est vérifiée. Chaque transaction est sécurisée. Votre confiance est notre priorité absolue.",
    color: "#C8922A",
    bg: "#F5E6C8",
  },
  {
    icon: Globe,
    title: "Accessibilité",
    desc: "Kasafrik est conçu pour tous — que vous soyez à Dakar, Abidjan, Douala ou en diaspora.",
    color: "#4A7C59",
    bg: "#D6EDE0",
  },
  {
    icon: Heart,
    title: "Impact Local",
    desc: "Nous croyons au potentiel économique africain. Notre mission : créer de la valeur pour les communautés locales.",
    color: "#C84B2F",
    bg: "#FAE8E3",
  },
  {
    icon: Target,
    title: "Innovation",
    desc: "QR codes, paiements mobile, géolocalisation — nous apportons la tech au service de l'Afrique.",
    color: "#1A1A2E",
    bg: "#E8E8F0",
  },
];

const team = [
  {
    name: "Rassoul Diallo",
    role: "Fondateur & CEO",
    origin: "Dakar, Sénégal",
    initials: "RD",
    color: "#C8922A",
  },
  {
    name: "Équipe Technique",
    role: "Développement & Produit",
    origin: "Dakar, Sénégal",
    initials: "ET",
    color: "#4A7C59",
  },
  {
    name: "Équipe Commerciale",
    role: "Ventes & Partenariats",
    origin: "Dakar & Abidjan",
    initials: "EC",
    color: "#1A1A2E",
  },
  {
    name: "Support Client",
    role: "Assistance 7j/7",
    origin: "Dakar, Sénégal",
    initials: "SC",
    color: "#C84B2F",
  },
];

const stats = [
  { value: "2024", label: "Année de création" },
  { value: "15 000+", label: "Utilisateurs inscrits" },
  { value: "1 200+", label: "Annonces actives" },
  { value: "4+", label: "Pays couverts" },
];

const milestones = [
  { year: "2024", event: "Création de Kasafrik à Dakar par Rassoul Diallo" },
  { year: "2024", event: "Lancement du module immobilier et hôtels" },
  { year: "2024", event: "Intégration Wave & Orange Money pour les paiements" },
  { year: "2025", event: "Lancement de la billetterie avec QR codes" },
  { year: "2025", event: "Expansion vers la Côte d'Ivoire et le Cameroun" },
];

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#1A1A2E] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#C8922A]/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#C8922A]/5 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#C8922A]/20 border border-[#C8922A]/30 rounded-full px-4 py-1.5 mb-6">
              <MapPin className="w-3.5 h-3.5 text-[#C8922A]" />
              <span className="text-xs font-semibold text-[#C8922A] uppercase tracking-wider">
                Dakar, Sénégal — Afrique de l&apos;Ouest
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              La plateforme immobilière &{" "}
              <span className="text-[#C8922A]">événementielle</span> de
              référence en Afrique
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
              Kasafrik réunit l&apos;immobilier, les hôtels, les événements et
              la billetterie en une seule plateforme de confiance. Née à Dakar,
              pensée pour toute l&apos;Afrique.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold text-[#C8922A] mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#1A1A2E] mb-4">
                Notre mission
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-base">
                Kasafrik est né d&apos;une conviction simple : l&apos;Afrique mérite une
                plateforme numérique à la hauteur de son dynamisme. Une
                plateforme où acheter, louer, réserver et participer est simple,
                sécurisé et accessible à tous.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 text-base">
                Fondée à Dakar en 2024, Kasafrik connecte propriétaires,
                locataires, hôteliers, organisateurs d&apos;événements et
                particuliers autour d&apos;une expérience numérique unifiée et de
                confiance.
              </p>
              <ul className="space-y-3">
                {[
                  "Annonces vérifiées et modérées",
                  "Paiements sécurisés (Wave, Orange Money, Stripe)",
                  "Support client 7 jours sur 7",
                  "Billets QR uniques et infalsifiables",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-[#C8922A] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#C8922A]" />
                Notre parcours
              </h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />
                <div className="space-y-6">
                  {milestones.map((m, i) => (
                    <div key={i} className="pl-10 relative">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-[#F5E6C8] border-2 border-[#C8922A] flex items-center justify-center">
                        <span className="text-xs font-bold text-[#C8922A]">
                          {m.year.slice(2)}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[#C8922A] mb-0.5">
                        {m.year}
                      </p>
                      <p className="text-sm text-gray-600">{m.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A1A2E] mb-3">
              Nos valeurs
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Ce qui nous guide chaque jour dans la construction de Kasafrik.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="bg-[#F7F2EA] rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                    style={{ backgroundColor: v.bg }}
                  >
                    <Icon className="w-6 h-6" style={{ color: v.color }} />
                  </div>
                  <h3 className="font-bold text-[#1A1A2E] mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A1A2E] mb-3">
              L&apos;équipe Kasafrik
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Une équipe passionnée, basée à Dakar, dédiée à votre expérience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-extrabold text-white mx-auto mb-4"
                  style={{ backgroundColor: member.color }}
                >
                  {member.initials}
                </div>
                <h3 className="font-bold text-[#1A1A2E] mb-1">{member.name}</h3>
                <p className="text-sm text-[#C8922A] font-medium mb-1">
                  {member.role}
                </p>
                <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {member.origin}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#C8922A] to-[#8A6118]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Rejoignez la communauté Kasafrik
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            15 000+ utilisateurs nous font déjà confiance. Créez votre compte
            gratuitement et publiez votre première annonce.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <button className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#C8922A] font-bold rounded-xl hover:bg-[#F5E6C8] transition-all shadow-xl">
                Créer un compte gratuit <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/contact">
              <button className="inline-flex items-center gap-2 px-8 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all">
                <Users className="w-4 h-4" />
                Nous contacter
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
