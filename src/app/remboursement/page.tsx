import Link from "next/link";
import {
  RefreshCw,
  Home,
  Ticket,
  Building2,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Mail,
  Calendar,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const policies = [
  {
    id: "billets",
    icon: Ticket,
    title: "Billets d'événements",
    color: "#1A1A2E",
    bg: "#E8E8F0",
    eligible: [
      "Annulation de l'événement par l'organisateur",
      "Report de l'événement à une date non communiquée",
      "Erreur technique sur le billet (QR invalide non résolu)",
      "Double facturation avérée",
    ],
    nonEligible: [
      "Changement d'avis du client",
      "Empêchement personnel (maladie, voyage...)",
      "Billet revendu ou transféré",
      "Demande effectuée après la date de l'événement",
    ],
    delay: "5 à 10 jours ouvrés",
    deadline: "48h après annonce d'annulation",
    note: "En cas d'annulation par l'organisateur, le remboursement est automatique. Aucune démarche nécessaire.",
  },
  {
    id: "immobilier",
    icon: Home,
    title: "Réservations immobilières",
    color: "#C8922A",
    bg: "#F5E6C8",
    eligible: [
      "Annulation par le propriétaire après confirmation",
      "Bien non conforme à la description publiée",
      "Défaut de remise des clés ou accès impossible",
      "Fraude avérée (bien inexistant ou usurpation)",
    ],
    nonEligible: [
      "Annulation client hors délai de rétractation",
      "Non-respect des conditions de location par le locataire",
      "Litiges de voisinage ou de copropriété",
      "Transactions conclues entièrement hors plateforme",
    ],
    delay: "7 à 14 jours ouvrés",
    deadline: "72h après la découverte du problème",
    note: "Un délai de rétractation de 24h s'applique aux réservations en ligne confirmées. Passé ce délai, les conditions du propriétaire s'appliquent.",
  },
  {
    id: "hotels",
    icon: Building2,
    title: "Réservations hôtelières",
    color: "#4A7C59",
    bg: "#D6EDE0",
    eligible: [
      "Annulation par l'hôtel",
      "Chambre non disponible à l'arrivée malgré la réservation",
      "Description trompeuse avérée",
      "Problème technique lors du paiement (double débit)",
    ],
    nonEligible: [
      "No-show (non-présentation sans annulation préalable)",
      "Annulation tardive hors politique hôtelière",
      "Réservations non remboursables clairement mentionnées",
      "Litiges sur la qualité des services après séjour",
    ],
    delay: "5 à 7 jours ouvrés",
    deadline: "Selon la politique de l'hôtel (affichée avant réservation)",
    note: "La politique d'annulation de chaque hôtel est clairement indiquée sur la page de réservation avant tout paiement.",
  },
];

const processSteps = [
  {
    step: "1",
    title: "Contactez le support",
    desc: "Envoyez un email à support@kasafrik.sn ou utilisez le formulaire de contact. Précisez votre numéro de commande.",
    icon: Mail,
  },
  {
    step: "2",
    title: "Instruction du dossier",
    desc: "Notre équipe examine votre demande sous 48h ouvrées et peut vous demander des justificatifs complémentaires.",
    icon: Clock,
  },
  {
    step: "3",
    title: "Décision et traitement",
    desc: "Vous recevez une décision par email. En cas d'accord, le remboursement est initié dans les délais indiqués.",
    icon: CheckCircle,
  },
  {
    step: "4",
    title: "Crédit sur votre compte",
    desc: "Le montant est remboursé sur le moyen de paiement original ou en crédit Kasafrik selon votre choix.",
    icon: RefreshCw,
  },
];

export default function RemboursementPage() {
  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1A1A2E] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#C8922A]/20 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-[#C8922A]" />
            </div>
            <span className="text-xs font-semibold text-[#C8922A] uppercase tracking-wider">
              Politique de remboursement
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Remboursements Kasafrik
          </h1>
          <p className="text-gray-400 leading-relaxed max-w-2xl">
            Votre satisfaction est notre priorité. Découvrez les conditions de
            remboursement applicables à chaque service Kasafrik.
          </p>
          <div className="flex items-center gap-2 mt-6 text-xs text-gray-500">
            <Calendar className="w-3.5 h-3.5" />
            Dernière mise à jour : 1er janvier 2025
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-2 overflow-x-auto">
            {policies.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="shrink-0 text-xs font-medium text-gray-500 hover:text-[#C8922A] px-3 py-1.5 rounded-lg hover:bg-[#F5E6C8] transition-all"
              >
                {p.title}
              </a>
            ))}
            <a
              href="#procedure"
              className="shrink-0 text-xs font-medium text-gray-500 hover:text-[#C8922A] px-3 py-1.5 rounded-lg hover:bg-[#F5E6C8] transition-all"
            >
              Procédure
            </a>
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {policies.map((policy) => {
            const Icon = policy.icon;
            return (
              <div
                key={policy.id}
                id={policy.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden scroll-mt-32"
              >
                {/* Header */}
                <div
                  className="flex items-center gap-4 p-6 border-b border-gray-100"
                  style={{ backgroundColor: policy.bg }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/60"
                  >
                    <Icon className="w-6 h-6" style={{ color: policy.color }} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold" style={{ color: policy.color }}>
                      {policy.title}
                    </h2>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1 text-xs text-gray-600">
                        <Clock className="w-3 h-3" />
                        Délai : {policy.delay}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-600">
                        <Calendar className="w-3 h-3" />
                        Délai de saisine : {policy.deadline}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                    {/* Eligible */}
                    <div>
                      <h3 className="flex items-center gap-2 text-sm font-semibold text-[#4A7C59] mb-3">
                        <CheckCircle className="w-4 h-4" />
                        Cas éligibles au remboursement
                      </h3>
                      <ul className="space-y-2">
                        {policy.eligible.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-gray-600"
                          >
                            <span className="text-[#4A7C59] mt-0.5 shrink-0">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Non eligible */}
                    <div>
                      <h3 className="flex items-center gap-2 text-sm font-semibold text-[#C84B2F] mb-3">
                        <XCircle className="w-4 h-4" />
                        Cas non éligibles
                      </h3>
                      <ul className="space-y-2">
                        {policy.nonEligible.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-gray-600"
                          >
                            <span className="text-[#C84B2F] mt-0.5 shrink-0">✗</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Note */}
                  <div className="flex items-start gap-2 bg-[#F5E6C8] rounded-xl p-4 border border-[#C8922A]/20">
                    <AlertTriangle className="w-4 h-4 text-[#C8922A] shrink-0 mt-0.5" />
                    <p className="text-xs text-[#8A6118]">{policy.note}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section id="procedure" className="py-16 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3">
              Comment demander un remboursement ?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Suivez ces étapes simples pour soumettre votre demande.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="text-center">
                  <div className="relative inline-flex mb-4">
                    <div className="w-14 h-14 bg-[#F5E6C8] rounded-2xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#C8922A]" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#C8922A] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{step.step}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-[#1A1A2E] mb-2 text-sm">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#C8922A] hover:bg-[#8A6118] text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#C8922A]/30"
            >
              <Mail className="w-4 h-4" />
              Demander un remboursement
            </Link>
            <p className="text-xs text-gray-400 mt-3">
              Munissez-vous de votre numéro de commande pour accélérer le traitement.
            </p>
          </div>
        </div>
      </section>

      {/* Moyens de remboursement */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1A1A2E] rounded-2xl p-6 md:p-8">
            <h3 className="text-white font-bold text-lg mb-4">
              Moyens de remboursement
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Moyen original",
                  desc: "Remboursé sur le même moyen de paiement utilisé lors de l'achat (Wave, Orange Money, carte bancaire).",
                  icon: "💳",
                },
                {
                  title: "Crédit Kasafrik",
                  desc: "Crédit instantané sur votre compte Kasafrik, utilisable pour vos prochaines transactions.",
                  icon: "⚡",
                },
                {
                  title: "Virement bancaire",
                  desc: "Pour les montants supérieurs à 50 000 FCFA, un virement bancaire peut être effectué sur demande.",
                  icon: "🏦",
                },
              ].map((m, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-xl p-5"
                >
                  <div className="text-2xl mb-2">{m.icon}</div>
                  <h4 className="text-white font-semibold text-sm mb-1">
                    {m.title}
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
