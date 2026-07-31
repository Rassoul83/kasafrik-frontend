import Link from "next/link";
import { FileText, Calendar, AlertTriangle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const sections = [
  {
    id: "objet",
    title: "1. Objet et acceptation",
    content: `Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation de la plateforme Kasafrik, accessible à l'adresse kasafrik.sn, exploitée par la société Kasafrik, enregistrée à Dakar, Sénégal.

En créant un compte ou en utilisant la plateforme, vous acceptez sans réserve les présentes CGU dans leur intégralité. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser la plateforme.

Kasafrik se réserve le droit de modifier ces CGU à tout moment. Les modifications entrent en vigueur dès leur publication. L'utilisation continue de la plateforme après modification vaut acceptation des nouvelles conditions.`,
  },
  {
    id: "services",
    title: "2. Description des services",
    content: `Kasafrik est une plateforme multi-services dédiée à l'Afrique de l'Ouest offrant :

• **Immobilier** : Publication et consultation d'annonces de vente et location de biens immobiliers (villas, appartements, studios, terrains).

• **Hôtels & Guesthouses** : Réservation d'hébergements auprès de partenaires hôteliers en Afrique de l'Ouest.

• **Événements** : Publication, promotion et gestion d'événements (concerts, festivals, forums, soirées).

• **Billetterie** : Achat et vente de billets électroniques avec QR code unique, vérifiable à l'entrée.

Kasafrik agit en qualité d'intermédiaire de mise en relation entre vendeurs/prestataires et acheteurs/locataires. Kasafrik n'est pas partie aux transactions entre utilisateurs sauf mention contraire.`,
  },
  {
    id: "comptes",
    title: "3. Comptes utilisateurs",
    content: `**Création de compte** : L'inscription nécessite la fourniture d'informations exactes et à jour. Vous êtes responsable de la confidentialité de vos identifiants.

**Types de comptes** : Kasafrik distingue plusieurs profils utilisateurs : Particulier, Propriétaire/Bailleur, Organisateur d'événements, Hôtelier et Administrateur. Chaque profil dispose de droits et fonctionnalités spécifiques.

**Responsabilité du compte** : Vous êtes seul responsable des actions effectuées depuis votre compte. Signalez immédiatement tout accès non autorisé à support@kasafrik.sn.

**Suspension/Résiliation** : Kasafrik se réserve le droit de suspendre ou résilier tout compte en cas de violation des présentes CGU, d'activité frauduleuse ou de comportement préjudiciable à la communauté.`,
  },
  {
    id: "annonces",
    title: "4. Publication d'annonces",
    content: `**Exactitude** : Toute annonce doit être exacte, complète et correspondre à la réalité. Les annonces trompeuses ou frauduleuses sont strictement interdites.

**Modération** : Kasafrik se réserve le droit de modérer, modifier ou supprimer toute annonce ne respectant pas nos standards de qualité ou les présentes CGU.

**Contenu interdit** : Sont prohibés : les annonces de biens inexistants ou non disponibles, la duplication d'annonces, la publicité mensongère, le contenu à caractère illégal, offensant ou discriminatoire.

**Vérification** : Kasafrik peut exiger des justificatifs de propriété ou d'identité pour valider certaines annonces premium ou certifiées.

**Responsabilité du vendeur** : Le vendeur ou bailleur assume l'entière responsabilité du contenu de ses annonces et des informations communiquées aux acheteurs/locataires.`,
  },
  {
    id: "paiements",
    title: "5. Paiements et commissions",
    content: `**Moyens de paiement** : Kasafrik accepte Wave, Orange Money, Free Money, Stripe (carte bancaire internationale) et PayPal.

**Commissions** : Kasafrik perçoit une commission sur certaines transactions. Les montants des commissions sont affichés clairement avant toute confirmation de paiement.

**Sécurité** : Tous les paiements transitent par des prestataires certifiés PCI-DSS. Kasafrik ne stocke jamais vos données bancaires complètes.

**Factures** : Une facture électronique est émise pour chaque transaction. Elle est accessible dans votre espace personnel.

**Litiges de paiement** : En cas de litige, contactez le support dans les 48h suivant la transaction. Consultez notre politique de remboursement pour plus de détails.`,
  },
  {
    id: "comportement",
    title: "6. Comportement des utilisateurs",
    content: `**Obligations** : En utilisant Kasafrik, vous vous engagez à respecter la loi applicable, les droits des tiers et les présentes CGU.

**Interdictions** : Sont strictement interdits :
• L'usurpation d'identité ou la création de faux profils
• La publication de contenus illégaux, frauduleux ou trompeurs
• Le harcèlement, les menaces ou le comportement abusif envers d'autres utilisateurs
• L'utilisation de robots ou scripts automatisés pour consulter ou publier des annonces
• Toute tentative de contourner les mesures de sécurité de la plateforme
• La revente de billets à des prix abusifs (scalping)

**Signalement** : Vous pouvez signaler tout contenu ou comportement inapproprié via le bouton "Signaler" disponible sur chaque annonce ou profil.`,
  },
  {
    id: "propriete",
    title: "7. Propriété intellectuelle",
    content: `**Droits de Kasafrik** : La marque Kasafrik, le logo, le code source, la charte graphique, les textes et tout autre élément constituant la plateforme sont la propriété exclusive de Kasafrik et protégés par le droit sénégalais et international de la propriété intellectuelle.

**Contenu utilisateur** : En publiant du contenu (photos, descriptions, avis) sur Kasafrik, vous concédez à Kasafrik une licence mondiale, non exclusive, gratuite d'utilisation, reproduction et affichage de ce contenu aux fins de la fourniture du service.

**Respect des droits tiers** : Vous garantissez détenir tous les droits nécessaires sur les contenus que vous publiez et qu'ils ne violent aucun droit de tiers.`,
  },
  {
    id: "responsabilite",
    title: "8. Limitation de responsabilité",
    content: `**Rôle d'intermédiaire** : Kasafrik agit en qualité d'intermédiaire de mise en relation. Kasafrik ne garantit pas la qualité, la disponibilité ou la légalité des biens et services proposés par les utilisateurs.

**Disponibilité** : Kasafrik s'efforce de maintenir la plateforme disponible 24h/24 mais ne garantit pas une disponibilité continue. Des maintenances planifiées peuvent interrompre le service.

**Responsabilité limitée** : Dans la limite permise par la loi applicable, Kasafrik ne saurait être tenu responsable des dommages indirects, consécutifs ou immatériels résultant de l'utilisation de la plateforme.

**Force majeure** : Kasafrik n'est pas responsable des défaillances résultant d'événements de force majeure (catastrophes naturelles, pannes de réseau, actes gouvernementaux, etc.).`,
  },
  {
    id: "loi",
    title: "9. Loi applicable et juridiction",
    content: `**Droit applicable** : Les présentes CGU sont régies par le droit sénégalais, notamment la Loi n° 2008-08 sur les transactions électroniques et la Loi n° 2008-12 sur la protection des données personnelles.

**Résolution amiable** : En cas de litige, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire. Contactez support@kasafrik.sn.

**Juridiction compétente** : À défaut de résolution amiable, tout litige sera soumis à la compétence exclusive des tribunaux de Dakar, Sénégal.

**Version de référence** : En cas de contradiction entre la version française et toute traduction des présentes CGU, la version française fait foi.`,
  },
];

export default function ConditionsPage() {
  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1A1A2E] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#C8922A]/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#C8922A]" />
            </div>
            <span className="text-xs font-semibold text-[#C8922A] uppercase tracking-wider">
              Conditions générales
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Conditions Générales d&apos;Utilisation
          </h1>
          <p className="text-gray-400 leading-relaxed max-w-2xl">
            Ces conditions régissent l&apos;utilisation de la plateforme Kasafrik.
            En vous inscrivant, vous acceptez les présentes conditions dans leur
            intégralité.
          </p>
          <div className="flex items-center gap-2 mt-6 text-xs text-gray-500">
            <Calendar className="w-3.5 h-3.5" />
            Dernière mise à jour : 1er janvier 2025 — Version 2.0
          </div>
        </div>
      </section>

      {/* Navigation rapide */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-1 overflow-x-auto">
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
          {/* Alerte */}
          <div className="flex items-start gap-3 bg-[#F5E6C8] border border-[#C8922A]/30 rounded-xl p-4 mb-8">
            <AlertTriangle className="w-5 h-5 text-[#C8922A] shrink-0 mt-0.5" />
            <p className="text-sm text-[#8A6118]">
              <strong>Important :</strong> La création d&apos;un compte sur Kasafrik
              implique l&apos;acceptation intégrale et sans réserve des présentes
              CGU. Lisez attentivement ce document avant toute utilisation de la
              plateforme.
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 scroll-mt-32"
              >
                <h2 className="text-xl font-bold text-[#1A1A2E] mb-4 pb-3 border-b border-gray-100">
                  {section.title}
                </h2>
                <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {section.content.split("\n").map((line, i) => {
                    if (line.startsWith("**") && line.endsWith("**")) {
                      return (
                        <p key={i} className="font-semibold text-[#1A1A2E] mt-4 mb-1.5 first:mt-0">
                          {line.replace(/\*\*/g, "")}
                        </p>
                      );
                    }
                    if (line.startsWith("**") && line.includes("**")) {
                      return (
                        <p key={i} className="mb-2">
                          {line.split("**").map((part, j) =>
                            j % 2 === 1 ? (
                              <strong key={j} className="text-[#1A1A2E]">
                                {part}
                              </strong>
                            ) : (
                              part
                            )
                          )}
                        </p>
                      );
                    }
                    if (line.startsWith("•")) {
                      return (
                        <p key={i} className="flex items-start gap-2 mb-1.5 pl-2">
                          <span className="text-[#C8922A] mt-0.5">•</span>
                          <span>{line.slice(2)}</span>
                        </p>
                      );
                    }
                    if (line.trim() === "") return <div key={i} className="h-2" />;
                    return <p key={i} className="mb-2">{line}</p>;
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-8 bg-[#1A1A2E] rounded-2xl p-6 text-center">
            <FileText className="w-8 h-8 text-[#C8922A] mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">
              Des questions sur nos conditions ?
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Notre équipe juridique est disponible pour vous répondre.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#C8922A] hover:bg-[#8A6118] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
            >
              Nous contacter
            </Link>
            <p className="text-gray-500 text-xs mt-4">
              Voir aussi :{" "}
              <Link href="/confidentialite" className="text-[#C8922A] hover:underline">
                Politique de confidentialité
              </Link>{" "}
              ·{" "}
              <Link href="/remboursement" className="text-[#C8922A] hover:underline">
                Politique de remboursement
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
