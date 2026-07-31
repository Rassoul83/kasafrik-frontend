import Link from "next/link";
import { Shield, Calendar } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const sections = [
  {
    id: "collecte",
    title: "1. Données collectées",
    content: [
      {
        subtitle: "Données d'identification",
        text: "Lors de la création d'un compte, nous collectons votre nom complet, adresse email, numéro de téléphone et, si applicable, votre numéro d'identification nationale.",
      },
      {
        subtitle: "Données de navigation",
        text: "Nous collectons automatiquement des données techniques : adresse IP, type de navigateur, pages visitées, durée de session, identifiant de cookie. Ces données sont utilisées à des fins d'analyse et d'amélioration du service.",
      },
      {
        subtitle: "Données de transaction",
        text: "Les informations de paiement (numéro de téléphone Mobile Money, données de carte via Stripe) transitent par des prestataires sécurisés certifiés PCI-DSS. Kasafrik ne stocke jamais vos données bancaires complètes.",
      },
      {
        subtitle: "Contenu utilisateur",
        text: "Les annonces, photos, descriptions et messages que vous publiez sur la plateforme sont collectés et stockés sur nos serveurs sécurisés.",
      },
    ],
  },
  {
    id: "finalites",
    title: "2. Finalités du traitement",
    content: [
      {
        subtitle: "Fourniture du service",
        text: "Vos données sont utilisées pour créer et gérer votre compte, traiter vos annonces et réservations, effectuer les paiements, émettre les billets QR et gérer vos communications.",
      },
      {
        subtitle: "Sécurité et lutte contre la fraude",
        text: "Nous analysons les comportements suspects pour protéger la plateforme et ses utilisateurs. Tout abus peut entraîner la suspension du compte concerné.",
      },
      {
        subtitle: "Communication",
        text: "Avec votre consentement, nous pouvons vous envoyer des notifications sur les nouvelles annonces, événements ou promotions correspondant à vos préférences.",
      },
      {
        subtitle: "Amélioration du service",
        text: "Les données agrégées et anonymisées nous permettent d'analyser l'usage de la plateforme et d'améliorer nos fonctionnalités.",
      },
    ],
  },
  {
    id: "bases",
    title: "3. Bases légales du traitement",
    content: [
      {
        subtitle: "Exécution du contrat",
        text: "Le traitement des données nécessaires à la fourniture du service Kasafrik est fondé sur l'exécution du contrat conclu lors de votre inscription.",
      },
      {
        subtitle: "Consentement",
        text: "Pour les communications marketing et les cookies non essentiels, le traitement est fondé sur votre consentement, que vous pouvez retirer à tout moment.",
      },
      {
        subtitle: "Intérêt légitime",
        text: "La sécurisation de la plateforme, la prévention des fraudes et l'amélioration du service constituent des intérêts légitimes de Kasafrik.",
      },
      {
        subtitle: "Obligation légale",
        text: "Certains traitements sont nécessaires au respect de nos obligations légales, notamment en matière fiscale et comptable.",
      },
    ],
  },
  {
    id: "partage",
    title: "4. Partage des données",
    content: [
      {
        subtitle: "Prestataires de paiement",
        text: "Stripe, Wave et Orange Money traitent vos paiements de façon sécurisée. Ces prestataires sont soumis à leurs propres politiques de confidentialité et obligations réglementaires.",
      },
      {
        subtitle: "Hébergement",
        text: "Nos données sont hébergées sur des serveurs sécurisés. Nous mettons en œuvre des mesures techniques et organisationnelles conformes aux standards de l'industrie.",
      },
      {
        subtitle: "Autorités compétentes",
        text: "Kasafrik peut être contraint de divulguer vos données aux autorités compétentes sur demande légale conforme à la législation sénégalaise et internationale.",
      },
      {
        subtitle: "Pas de vente",
        text: "Kasafrik ne vend jamais vos données personnelles à des tiers à des fins commerciales.",
      },
    ],
  },
  {
    id: "cookies",
    title: "5. Cookies",
    content: [
      {
        subtitle: "Cookies essentiels",
        text: "Nécessaires au fonctionnement de la plateforme (authentification, panier, préférences de session). Ils ne peuvent pas être désactivés.",
      },
      {
        subtitle: "Cookies analytiques",
        text: "Avec votre consentement, nous utilisons des outils d'analyse (ex. Google Analytics) pour mesurer l'audience et améliorer nos pages.",
      },
      {
        subtitle: "Cookies marketing",
        text: "Avec votre consentement, des cookies publicitaires peuvent être utilisés pour vous proposer des annonces pertinentes.",
      },
      {
        subtitle: "Gestion des cookies",
        text: "Vous pouvez gérer vos préférences de cookies via le bandeau affiché lors de votre première visite, ou dans les paramètres de votre navigateur.",
      },
    ],
  },
  {
    id: "droits",
    title: "6. Vos droits (RGPD & Loi 2008-12)",
    content: [
      {
        subtitle: "Droit d'accès",
        text: "Vous pouvez demander à consulter l'ensemble des données personnelles que nous détenons vous concernant.",
      },
      {
        subtitle: "Droit de rectification",
        text: "Vous pouvez demander la correction des données inexactes ou incomplètes.",
      },
      {
        subtitle: "Droit à l'effacement",
        text: "Vous pouvez demander la suppression de vos données, sous réserve de nos obligations légales de conservation.",
      },
      {
        subtitle: "Droit à la portabilité",
        text: "Vous pouvez demander à recevoir vos données dans un format structuré et lisible par machine.",
      },
      {
        subtitle: "Droit d'opposition",
        text: "Vous pouvez vous opposer au traitement de vos données pour des raisons tenant à votre situation particulière.",
      },
      {
        subtitle: "Exercice des droits",
        text: "Pour exercer ces droits, contactez notre DPO à : privacy@kasafrik.sn. Nous répondrons dans un délai maximum de 30 jours.",
      },
    ],
  },
  {
    id: "conservation",
    title: "7. Durée de conservation",
    content: [
      {
        subtitle: "Données de compte",
        text: "Conservées pendant toute la durée de vie de votre compte, puis 3 ans après la dernière activité.",
      },
      {
        subtitle: "Données de transaction",
        text: "Conservées 10 ans conformément aux obligations comptables et fiscales sénégalaises.",
      },
      {
        subtitle: "Logs de navigation",
        text: "Conservés 12 mois maximum.",
      },
      {
        subtitle: "Données de cookies",
        text: "Conservées au maximum 13 mois conformément aux recommandations de la CNIL.",
      },
    ],
  },
  {
    id: "securite",
    title: "8. Sécurité",
    content: [
      {
        subtitle: "Mesures techniques",
        text: "Chiffrement SSL/TLS, hachage des mots de passe (bcrypt), accès restreint aux données sensibles, audits de sécurité réguliers.",
      },
      {
        subtitle: "En cas de violation",
        text: "En cas de violation de données susceptible d'engendrer un risque pour vos droits, nous vous en informerons dans les meilleurs délais conformément à la réglementation applicable.",
      },
    ],
  },
];

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1A1A2E] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#C8922A]/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#C8922A]" />
            </div>
            <span className="text-xs font-semibold text-[#C8922A] uppercase tracking-wider">
              Politique de confidentialité
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Protection de vos données personnelles
          </h1>
          <p className="text-gray-400 leading-relaxed max-w-2xl">
            Kasafrik s&apos;engage à protéger vos données personnelles
            conformément à la Loi sénégalaise n° 2008-12 sur la protection des
            données et au Règlement Général sur la Protection des Données (RGPD)
            applicable en Union Européenne.
          </p>
          <div className="flex items-center gap-2 mt-6 text-xs text-gray-500">
            <Calendar className="w-3.5 h-3.5" />
            Dernière mise à jour : 1er janvier 2025
          </div>
        </div>
      </section>

      {/* Navigation rapide */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="shrink-0 text-xs font-medium text-gray-500 hover:text-[#C8922A] px-3 py-1.5 rounded-lg hover:bg-[#F5E6C8] transition-all"
              >
                {s.title.replace(/^\d+\.\s/, "")}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong className="text-[#1A1A2E]">Responsable du traitement :</strong> Kasafrik,
              société enregistrée à Dakar, Sénégal.{" "}
              <strong className="text-[#1A1A2E]">Contact DPO :</strong>{" "}
              <a href="mailto:privacy@kasafrik.sn" className="text-[#C8922A] hover:underline">
                privacy@kasafrik.sn
              </a>
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 scroll-mt-32"
              >
                <h2 className="text-xl font-bold text-[#1A1A2E] mb-6 pb-4 border-b border-gray-100">
                  {section.title}
                </h2>
                <div className="space-y-5">
                  {section.content.map((item, i) => (
                    <div key={i}>
                      <h3 className="text-sm font-semibold text-[#C8922A] mb-1.5">
                        {item.subtitle}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact DPO */}
          <div className="mt-8 bg-[#1A1A2E] rounded-2xl p-6 text-center">
            <Shield className="w-8 h-8 text-[#C8922A] mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">
              Une question sur vos données ?
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Contactez notre Délégué à la Protection des Données
            </p>
            <a
              href="mailto:privacy@kasafrik.sn"
              className="inline-flex items-center gap-2 bg-[#C8922A] hover:bg-[#8A6118] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
            >
              privacy@kasafrik.sn
            </a>
            <p className="text-gray-500 text-xs mt-4">
              Vous avez également le droit de saisir la{" "}
              <strong className="text-gray-400">Commission des Données Personnelles (CDP)</strong>{" "}
              du Sénégal.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
