import Link from "next/link";
import {
  CheckCircle,
  Camera,
  FileText,
  CreditCard,
  Bell,
  TrendingUp,
  Shield,
  Star,
  ArrowRight,
  ChevronRight,
  AlertTriangle,
  Package,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Créez votre compte vendeur",
    desc: "Inscrivez-vous gratuitement sur Kasafrik. Complétez votre profil avec votre nom, photo, numéro de téléphone et une pièce d'identité pour accéder au statut Vendeur Vérifié.",
    tips: ["Utilisez votre vrai nom pour inspirer confiance", "Ajoutez une photo de profil professionnelle"],
    color: "#C8922A",
    bg: "#F5E6C8",
  },
  {
    number: "02",
    icon: Camera,
    title: "Préparez votre annonce",
    desc: "Une bonne annonce est claire, complète et illustrée. Rassemblez toutes les informations sur votre bien ou événement avant de commencer la publication.",
    tips: [
      "Minimum 5 photos de haute qualité",
      "Description détaillée et honnête",
      "Prix juste et compétitif",
      "Indiquez tous les équipements disponibles",
    ],
    color: "#4A7C59",
    bg: "#D6EDE0",
  },
  {
    number: "03",
    icon: Package,
    title: "Publiez votre annonce",
    desc: 'Cliquez sur "+ Publier" en haut de la page. Choisissez la catégorie (immobilier, hôtel ou événement), remplissez le formulaire et soumettez. Votre annonce sera modérée dans les 24h ouvrées.',
    tips: [
      "Choisissez la bonne catégorie",
      "Utilisez des mots-clés pertinents dans le titre",
      "Fixez un prix cohérent avec le marché",
    ],
    color: "#635BFF",
    bg: "#F0EFFF",
  },
  {
    number: "04",
    icon: Bell,
    title: "Gérez vos demandes",
    desc: "Recevez des notifications en temps réel pour chaque demande ou message. Répondez rapidement pour maximiser vos chances de conclure.",
    tips: [
      "Répondez dans les 2h pour les clients actifs",
      "Utilisez la messagerie sécurisée Kasafrik",
      "Restez disponible aux horaires demandés",
    ],
    color: "#C84B2F",
    bg: "#FAE8E3",
  },
  {
    number: "05",
    icon: CreditCard,
    title: "Recevez vos paiements",
    desc: "Kasafrik sécurise les transactions. Pour les réservations en ligne, les fonds sont virés sur votre compte Wave, Orange Money ou bancaire après confirmation.",
    tips: [
      "Configurez votre compte de réception",
      "Les virements sont effectués sous 48h",
      "Une facture est automatiquement générée",
    ],
    color: "#1A1A2E",
    bg: "#E8E8F0",
  },
  {
    number: "06",
    icon: TrendingUp,
    title: "Boostez votre visibilité",
    desc: "Utilisez les options de mise en avant (Boost, Annonce Vedette) pour apparaître en tête des résultats de recherche et attirer plus de clients.",
    tips: [
      "Le boost multiplie les vues par 5 en moyenne",
      "Les annonces vedettes apparaissent sur la page d'accueil",
      "Choisissez les périodes stratégiques (weekends, fêtes)",
    ],
    color: "#C8922A",
    bg: "#F5E6C8",
  },
];

const bestPractices = [
  {
    icon: Camera,
    title: "Photos de qualité",
    desc: "Des photos lumineuses et nettes augmentent les vues de 60%. Utilisez la lumière naturelle et photographiez chaque pièce.",
  },
  {
    icon: FileText,
    title: "Description complète",
    desc: "Mentionnez la superficie, le nombre de pièces, les équipements, la proximité des transports et des commerces.",
  },
  {
    icon: Shield,
    title: "Certification vendeur",
    desc: "Les vendeurs vérifiés reçoivent 3x plus de demandes. Soumettez votre pièce d'identité pour obtenir le badge Vérifié.",
  },
  {
    icon: Star,
    title: "Soignez votre réputation",
    desc: "Chaque avis compte. Soyez ponctuel, honnête et professionnel pour maintenir une note élevée.",
  },
];

const faqs = [
  {
    q: "Combien coûte la publication d'une annonce ?",
    a: "La publication est gratuite jusqu'à 3 annonces actives. Les formules Pro (9 900 FCFA/mois) et Premium (24 900 FCFA/mois) offrent un nombre illimité d'annonces avec des fonctionnalités avancées.",
  },
  {
    q: "Quelle est la commission Kasafrik ?",
    a: "Kasafrik prélève une commission de 3% sur les transactions réalisées via la plateforme. Aucune commission n'est prélevée sur les annonces de contact direct.",
  },
  {
    q: "Combien de temps pour valider mon annonce ?",
    a: "Les annonces sont modérées dans les 24h ouvrées (souvent bien plus vite). Vous recevrez une notification par email et SMS dès validation.",
  },
  {
    q: "Comment supprimer ou modifier une annonce ?",
    a: "Rendez-vous dans votre tableau de bord > Mes annonces > sélectionnez l'annonce et cliquez sur Modifier ou Supprimer. La modification est disponible à tout moment.",
  },
  {
    q: "Mon annonce peut-elle être refusée ?",
    a: "Oui, si elle ne respecte pas nos CGU : contenu trompeur, photos non conformes, prix inexact, annonce en double, etc. Vous recevrez les raisons du refus et pourrez corriger et resoumettre.",
  },
];

export default function AideVendeurPage() {
  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1A1A2E] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#C8922A]/20 border border-[#C8922A]/30 rounded-full px-4 py-1.5 mb-6">
              <Package className="w-3.5 h-3.5 text-[#C8922A]" />
              <span className="text-xs font-semibold text-[#C8922A] uppercase tracking-wider">
                Guide vendeur
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Vendez mieux avec Kasafrik
            </h1>
            <p className="text-gray-400 leading-relaxed mb-6">
              Tout ce que vous devez savoir pour publier, gérer et optimiser vos
              annonces immobilières, hôtelières ou événementielles sur Kasafrik.
            </p>
            <Link
              href="/publier"
              className="inline-flex items-center gap-2 bg-[#C8922A] hover:bg-[#8A6118] text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#C8922A]/30"
            >
              Publier une annonce <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-3">
              6 étapes pour vendre sur Kasafrik
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Suivez ce guide étape par étape pour maximiser vos résultats.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8"
                >
                  <div className="flex items-start gap-6">
                    <div className="shrink-0">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: step.bg }}
                      >
                        <Icon className="w-6 h-6" style={{ color: step.color }} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-md"
                          style={{ backgroundColor: step.bg, color: step.color }}
                        >
                          Étape {step.number}
                        </span>
                        <h3 className="text-lg font-bold text-[#1A1A2E]">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {step.desc}
                      </p>
                      <ul className="space-y-1.5">
                        {step.tips.map((tip, j) => (
                          <li
                            key={j}
                            className="flex items-center gap-2 text-xs text-gray-500"
                          >
                            <CheckCircle
                              className="w-3.5 h-3.5 shrink-0"
                              style={{ color: step.color }}
                            />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Best practices */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3">
              Bonnes pratiques
            </h2>
            <p className="text-gray-500">
              Les conseils des meilleurs vendeurs Kasafrik.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestPractices.map((bp) => {
              const Icon = bp.icon;
              return (
                <div
                  key={bp.title}
                  className="bg-[#F7F2EA] rounded-xl p-5 border border-gray-100"
                >
                  <div className="w-10 h-10 bg-[#F5E6C8] rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#C8922A]" />
                  </div>
                  <h3 className="font-semibold text-[#1A1A2E] mb-2 text-sm">
                    {bp.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{bp.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Warning */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 bg-[#FAE8E3] border border-[#C84B2F]/20 rounded-xl p-5">
            <AlertTriangle className="w-5 h-5 text-[#C84B2F] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#C84B2F] mb-1">
                Attention aux arnaques
              </p>
              <p className="text-sm text-[#C84B2F]/80">
                Ne demandez jamais de paiements en dehors de la plateforme.
                Kasafrik ne vous demandera jamais vos mots de passe ou codes
                OTP. Signalez tout comportement suspect au support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-8">
            Questions fréquentes — Vendeurs
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
              >
                <div className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 text-[#C8922A] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A2E] mb-2">
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
      <section className="py-12 bg-gradient-to-r from-[#C8922A] to-[#8A6118]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Prêt à publier votre première annonce ?
          </h2>
          <p className="text-white/80 mb-6">
            Rejoignez des milliers de vendeurs qui font confiance à Kasafrik.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/publier">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#C8922A] font-bold rounded-xl hover:bg-[#F5E6C8] transition-all shadow-lg">
                + Publier une annonce
              </button>
            </Link>
            <Link href="/contact">
              <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all">
                Contacter un conseiller
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
