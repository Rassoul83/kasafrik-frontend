import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Heart,
  Zap,
  Globe,
  Users,
  Code2,
  Megaphone,
  HeadphonesIcon,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const offers = [
  {
    id: 1,
    title: "Développeur Full-Stack Senior",
    department: "Technique",
    location: "Dakar, Sénégal",
    type: "CDI",
    level: "Senior",
    icon: Code2,
    color: "#C8922A",
    bg: "#F5E6C8",
    description:
      "Rejoignez l'équipe tech de Kasafrik pour construire la plateforme immobilière et événementielle de référence en Afrique.",
    skills: ["Next.js", "TypeScript", "Laravel/PHP", "PostgreSQL", "AWS"],
    posted: "Il y a 3 jours",
  },
  {
    id: 2,
    title: "Growth Marketing Manager",
    department: "Marketing",
    location: "Dakar, Sénégal",
    type: "CDI",
    level: "Confirmé",
    icon: TrendingUp,
    color: "#4A7C59",
    bg: "#D6EDE0",
    description:
      "Pilotez la croissance de Kasafrik en Afrique de l'Ouest : acquisition, rétention, campagnes digitales et partenariats stratégiques.",
    skills: ["SEO/SEA", "Meta Ads", "Google Analytics", "Email Marketing"],
    posted: "Il y a 5 jours",
  },
  {
    id: 3,
    title: "Commercial(e) B2B — Immobilier",
    department: "Commercial",
    location: "Dakar, Sénégal",
    type: "CDI",
    level: "Junior/Confirmé",
    icon: Briefcase,
    color: "#1A1A2E",
    bg: "#E8E8F0",
    description:
      "Développez notre portefeuille de propriétaires, agences immobilières et promoteurs partenaires au Sénégal et en Côte d'Ivoire.",
    skills: ["Prospection B2B", "Négociation", "CRM", "Immobilier"],
    posted: "Il y a 1 semaine",
  },
  {
    id: 4,
    title: "Community Manager",
    department: "Marketing",
    location: "Dakar, Sénégal (Télétravail partiel)",
    type: "CDI",
    level: "Junior",
    icon: Megaphone,
    color: "#635BFF",
    bg: "#F0EFFF",
    description:
      "Animez nos communautés sur Instagram, Facebook, TikTok et WhatsApp. Créez du contenu engageant sur l'immobilier et les événements en Afrique.",
    skills: ["Création de contenu", "Réseaux sociaux", "Canva/Figma", "Copywriting"],
    posted: "Il y a 2 semaines",
  },
  {
    id: 5,
    title: "Chargé(e) de Support Client",
    department: "Support",
    location: "Dakar, Sénégal",
    type: "CDI",
    level: "Junior",
    icon: HeadphonesIcon,
    color: "#C84B2F",
    bg: "#FAE8E3",
    description:
      "Accompagnez nos utilisateurs (vendeurs, acheteurs, organisateurs) avec réactivité et bienveillance via chat, email et WhatsApp.",
    skills: ["Service client", "Zendesk", "Français", "Wolof/Anglais apprécié"],
    posted: "Il y a 2 semaines",
  },
  {
    id: 6,
    title: "Business Developer — Événements",
    department: "Commercial",
    location: "Dakar & Abidjan",
    type: "CDI",
    level: "Confirmé",
    icon: Globe,
    color: "#C8922A",
    bg: "#F5E6C8",
    description:
      "Signez de nouveaux partenariats avec des organisateurs d'événements, salles de spectacle, festivals et promoteurs culturels en Afrique.",
    skills: ["Partenariats", "Événementiel", "Négociation", "Réseau Afrique"],
    posted: "Il y a 3 semaines",
  },
];

const perks = [
  {
    icon: Heart,
    title: "Impact réel",
    desc: "Contribuez à numériser l'économie africaine et à créer de la valeur pour des millions de personnes.",
  },
  {
    icon: Zap,
    title: "Croissance rapide",
    desc: "Startup en forte croissance : responsabilités élargies, évolution accélérée, actionnariat possible.",
  },
  {
    icon: Globe,
    title: "Ambition panafricaine",
    desc: "Travailler sur un projet à vocation continentale, depuis Dakar, avec une équipe multiculturelle.",
  },
  {
    icon: Users,
    title: "Équipe passionnée",
    desc: "Des collègues engagés, bienveillants et compétents qui partagent la même vision de l'Afrique.",
  },
];

const departments = ["Tous", "Technique", "Marketing", "Commercial", "Support"];

export default function CarrieresPage() {
  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#1A1A2E] overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#C8922A]/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#C8922A]/5 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#C8922A]/20 border border-[#C8922A]/30 rounded-full px-4 py-1.5 mb-6">
              <Briefcase className="w-3.5 h-3.5 text-[#C8922A]" />
              <span className="text-xs font-semibold text-[#C8922A] uppercase tracking-wider">
                Rejoignez l&apos;aventure Kasafrik
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
              Construisons ensemble{" "}
              <span className="text-[#C8922A]">l&apos;Afrique numérique</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-2xl">
              Kasafrik / Dalitech recrute des talents passionnés par l&apos;Afrique,
              la tech et l&apos;entrepreneuriat. Vous construisez votre carrière, nous
              construisons le continent.
            </p>
            <div className="flex items-center gap-6">
              <a href="#offres">
                <button className="inline-flex items-center gap-2 bg-[#C8922A] hover:bg-[#8A6118] text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#C8922A]/30">
                  Voir les offres <ArrowRight className="w-4 h-4" />
                </button>
              </a>
              <div className="text-sm text-gray-400">
                <span className="text-[#C8922A] font-bold text-lg">
                  {offers.length}
                </span>{" "}
                postes ouverts
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-2">
              Pourquoi rejoindre Kasafrik ?
            </h2>
            <p className="text-gray-500 text-sm">
              Plus qu&apos;un emploi, une mission.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk) => {
              const Icon = perk.icon;
              return (
                <div
                  key={perk.title}
                  className="bg-[#F7F2EA] rounded-2xl p-6 border border-gray-100"
                >
                  <div className="w-10 h-10 bg-[#F5E6C8] rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#C8922A]" />
                  </div>
                  <h3 className="font-bold text-[#1A1A2E] mb-2 text-sm">
                    {perk.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{perk.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job offers */}
      <section id="offres" className="py-16 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1">
                Offres d&apos;emploi
              </h2>
              <p className="text-gray-500 text-sm">
                {offers.length} postes disponibles — Dakar, Sénégal
              </p>
            </div>
            <div className="hidden md:flex gap-2">
              {departments.map((dep) => (
                <span
                  key={dep}
                  className="text-xs font-medium px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-600 cursor-pointer hover:border-[#C8922A] hover:text-[#C8922A] transition-all"
                >
                  {dep}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {offers.map((offer) => {
              const Icon = offer.icon;
              return (
                <div
                  key={offer.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#C8922A]/30 transition-all p-6 group"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: offer.bg }}
                    >
                      <Icon className="w-6 h-6" style={{ color: offer.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-[#1A1A2E] text-sm leading-snug group-hover:text-[#C8922A] transition-colors">
                          {offer.title}
                        </h3>
                        <span
                          className="shrink-0 text-xs font-semibold px-2 py-0.5 rounded-md"
                          style={{ backgroundColor: offer.bg, color: offer.color }}
                        >
                          {offer.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {offer.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {offer.posted}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed mb-3">
                        {offer.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {offer.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <a
                        href={`mailto:rh@kasafrik.sn?subject=Candidature — ${offer.title}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C8922A] hover:text-[#8A6118] transition-colors group-hover:gap-2"
                      >
                        Postuler maintenant <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Spontaneous application */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1A1A2E] rounded-2xl p-8 text-center">
            <div className="w-12 h-12 bg-[#C8922A]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-[#C8922A]" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">
              Candidature spontanée
            </h3>
            <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
              Vous ne trouvez pas le poste idéal mais vous croyez au projet
              Kasafrik ? Envoyez-nous votre CV et une lettre de motivation.
              Nous lisons chaque candidature.
            </p>
            <a
              href="mailto:rh@kasafrik.sn?subject=Candidature spontanée"
              className="inline-flex items-center gap-2 bg-[#C8922A] hover:bg-[#8A6118] text-white font-semibold px-6 py-3 rounded-xl transition-all"
            >
              rh@kasafrik.sn <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-gray-500 text-xs mt-4">
              Réponse garantie sous 5 jours ouvrés.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-6">
            Notre processus de recrutement
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { step: "1", label: "Candidature", desc: "Envoi du CV + lettre de motivation par email" },
              { step: "2", label: "Entretien RH", desc: "Appel de 30 min pour mieux vous connaître" },
              { step: "3", label: "Test technique", desc: "Cas pratique ou test métier selon le poste" },
              { step: "4", label: "Offre", desc: "Réponse définitive sous 48h après le dernier entretien" },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#F5E6C8] rounded-full flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-[#C8922A]">{s.step}</span>
                </div>
                <div>
                  <p className="font-semibold text-[#1A1A2E] text-sm mb-0.5">{s.label}</p>
                  <p className="text-xs text-gray-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
