"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Home,
  Building2,
  Ticket,
  CreditCard,
  User,
  MessageSquare,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const categories = [
  { label: "Immobilier", icon: Home, color: "#C8922A", bg: "#F5E6C8" },
  { label: "Hôtels", icon: Building2, color: "#4A7C59", bg: "#D6EDE0" },
  { label: "Billetterie", icon: Ticket, color: "#1A1A2E", bg: "#E8E8F0" },
  { label: "Paiements", icon: CreditCard, color: "#635BFF", bg: "#F0EFFF" },
  { label: "Mon compte", icon: User, color: "#C84B2F", bg: "#FAE8E3" },
];

const faqs: Array<{ category: string; question: string; answer: string }> = [
  {
    category: "Immobilier",
    question: "Comment publier une annonce immobilière ?",
    answer:
      'Cliquez sur "+ Publier" dans la barre de navigation, sélectionnez "Bien immobilier", remplissez le formulaire avec les informations de votre bien (titre, description, prix, photos) et soumettez. Votre annonce sera examinée dans les 24h ouvrées.',
  },
  {
    category: "Immobilier",
    question: "Comment contacter un propriétaire ?",
    answer:
      "Sur chaque annonce, vous trouverez un bouton \"Contacter le vendeur\". Vous devez être connecté pour envoyer un message. Vos échanges restent sécurisés via la messagerie intégrée Kasafrik.",
  },
  {
    category: "Immobilier",
    question: "Comment vérifier l'authenticité d'une annonce ?",
    answer:
      "Les annonces certifiées affichent un badge bleu \"Vérifié\". Kasafrik vérifie les titres de propriété et l'identité des vendeurs pour ces annonces. Évitez tout paiement en dehors de la plateforme.",
  },
  {
    category: "Billetterie",
    question: "Comment acheter un billet d'événement ?",
    answer:
      "Rendez-vous sur la page de l'événement, sélectionnez le type de billet (Standard ou VIP), choisissez la quantité et procédez au paiement. Votre billet QR sera envoyé par email et disponible dans votre compte.",
  },
  {
    category: "Billetterie",
    question: "Mon billet QR est-il transférable ?",
    answer:
      "Non, les billets Kasafrik sont nominatifs et liés à votre compte. Chaque QR code est unique et ne peut être utilisé qu'une seule fois. Tout billet revendu ou transféré sera automatiquement invalidé.",
  },
  {
    category: "Billetterie",
    question: "Puis-je obtenir un remboursement si l'événement est annulé ?",
    answer:
      "Oui. En cas d'annulation par l'organisateur, vous serez automatiquement remboursé dans un délai de 5 à 10 jours ouvrés sur le moyen de paiement utilisé. Consultez notre politique de remboursement pour plus de détails.",
  },
  {
    category: "Paiements",
    question: "Quels modes de paiement sont acceptés ?",
    answer:
      "Kasafrik accepte Wave, Orange Money, Free Money, Stripe (Visa, Mastercard), et PayPal. Tous les paiements sont sécurisés et chiffrés.",
  },
  {
    category: "Paiements",
    question: "Pourquoi mon paiement a-t-il été refusé ?",
    answer:
      "Un paiement peut être refusé pour plusieurs raisons : solde insuffisant, problème de réseau mobile, plafond de transaction dépassé, ou données de carte incorrectes. Vérifiez ces points et réessayez, ou contactez votre opérateur.",
  },
  {
    category: "Paiements",
    question: "Mes données bancaires sont-elles sécurisées ?",
    answer:
      "Oui. Kasafrik ne stocke jamais vos données bancaires complètes. Les paiements par carte transitent par Stripe, certifié PCI-DSS niveau 1. Les paiements Mobile Money sont traités directement par Wave et Orange Money.",
  },
  {
    category: "Mon compte",
    question: "Comment modifier mon mot de passe ?",
    answer:
      "Rendez-vous dans Paramètres > Sécurité > Changer le mot de passe. Si vous avez oublié votre mot de passe, utilisez le lien \"Mot de passe oublié\" sur la page de connexion.",
  },
  {
    category: "Mon compte",
    question: "Comment supprimer mon compte ?",
    answer:
      "Contactez notre support à support@kasafrik.sn avec la demande de suppression depuis votre adresse email enregistrée. Nous traiterons votre demande dans les 30 jours conformément au RGPD.",
  },
  {
    category: "Mon compte",
    question: "Puis-je avoir plusieurs annonces actives simultanément ?",
    answer:
      "Oui. Selon votre abonnement, vous pouvez publier plusieurs annonces simultanément. L'abonnement Gratuit permet 3 annonces actives. Les formules Pro et Premium offrent un nombre illimité d'annonces.",
  },
];

function FAQItem({ item }: { item: (typeof faqs)[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:border-[#C8922A]/30 transition-all"
    >
      <div className="flex items-center justify-between gap-4 p-5">
        <span className="font-medium text-[#1A1A2E] text-sm leading-snug">
          {item.question}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-[#C8922A] shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
        )}
      </div>
      {open && (
        <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
          {item.answer}
        </div>
      )}
    </button>
  );
}

export default function AidePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");

  const allCategories = ["Tous", ...categories.map((c) => c.label)];

  const filtered = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "Tous" || faq.category === activeCategory;
    const matchesSearch =
      !search ||
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1A1A2E] py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#C8922A]/20 mb-6">
            <BookOpen className="w-6 h-6 text-[#C8922A]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Centre d&apos;aide Kasafrik
          </h1>
          <p className="text-gray-400 mb-8">
            Trouvez des réponses à vos questions sur l&apos;immobilier, la
            billetterie, les paiements et votre compte.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une question..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C8922A] focus:border-[#C8922A] backdrop-blur-sm"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.label}
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === cat.label ? "Tous" : cat.label
                    )
                  }
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                    activeCategory === cat.label
                      ? "border-[#C8922A] bg-[#F5E6C8]"
                      : "border-gray-100 bg-[#F7F2EA] hover:border-[#C8922A]/40"
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: cat.bg }}
                  >
                    <Icon className="w-4 h-4" style={{ color: cat.color }} />
                  </div>
                  <span className="text-xs font-medium text-[#1A1A2E]">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex gap-2 flex-wrap">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                  activeCategory === cat
                    ? "bg-[#C8922A] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-[#F5E6C8] hover:text-[#C8922A]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-10 h-10 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">
                Aucun résultat pour &quot;{search}&quot;
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Essayez d&apos;autres mots-clés ou contactez le support
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-5">
                {filtered.length} question{filtered.length > 1 ? "s" : ""} trouvée
                {filtered.length > 1 ? "s" : ""}
                {activeCategory !== "Tous" && ` dans "${activeCategory}"`}
              </p>
              <div className="space-y-3">
                {filtered.map((faq, i) => (
                  <FAQItem key={i} item={faq} />
                ))}
              </div>
            </>
          )}

          {/* Liens utiles */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/aide/vendeur"
              className="group flex items-center justify-between bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:border-[#C8922A]/40 hover:shadow-md transition-all"
            >
              <div>
                <p className="font-semibold text-[#1A1A2E] mb-1">
                  Guide vendeur
                </p>
                <p className="text-xs text-gray-500">
                  Tout savoir sur la publication d&apos;annonces
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#C8922A] group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/remboursement"
              className="group flex items-center justify-between bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:border-[#C8922A]/40 hover:shadow-md transition-all"
            >
              <div>
                <p className="font-semibold text-[#1A1A2E] mb-1">
                  Politique de remboursement
                </p>
                <p className="text-xs text-gray-500">
                  Conditions et délais de remboursement
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#C8922A] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Support CTA */}
          <div className="mt-8 bg-[#1A1A2E] rounded-2xl p-6 text-center">
            <MessageSquare className="w-8 h-8 text-[#C8922A] mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">
              Vous n&apos;avez pas trouvé votre réponse ?
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Notre support est disponible 7j/7, de 8h à 20h (WAT).
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#C8922A] hover:bg-[#8A6118] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
            >
              Contacter le support
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
