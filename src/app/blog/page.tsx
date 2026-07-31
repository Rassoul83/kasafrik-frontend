import Link from "next/link";
import {
  BookOpen,
  Clock,
  Tag,
  ArrowRight,
  TrendingUp,
  Home,
  Calendar,
  Building2,
  Globe,
  Lightbulb,
  User,
  MapPin,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const categories = [
  { label: "Tous", icon: Globe, count: 15 },
  { label: "Immobilier", icon: Home, count: 8, color: "#C8922A" },
  { label: "Événements", icon: Calendar, count: 4, color: "#C84B2F" },
  { label: "Hôtels", icon: Building2, count: 2, color: "#4A7C59" },
  { label: "Tendances", icon: TrendingUp, count: 1, color: "#635BFF" },
  { label: "Conseils", icon: Lightbulb, count: 2, color: "#1A1A2E" },
];

const featured = {
  id: "marche-immobilier-dakar-2026",
  category: "Immobilier",
  categoryColor: "#C8922A",
  categoryBg: "#F5E6C8",
  title: "Le marché immobilier à Dakar en 2026 : tendances et opportunités",
  excerpt:
    "Le marché immobilier dakarois entre dans une nouvelle ère. La pression foncière dans les quartiers centraux pousse les acheteurs vers des zones périphériques en plein essor comme Diamniadio, Thiès et Saly. Prix au m², quartiers à privilégier, rendements locatifs : notre analyse complète du marché 2026.",
  author: "Équipe Kasafrik",
  authorRole: "Analyse marché",
  date: "10 janvier 2026",
  readTime: "8 min",
  tags: ["Dakar", "Investissement", "Prix immobilier"],
  gradient: "from-[#1A1A2E] to-[#16213E]",
};

/* ─── Placeholder image component ─────────────────────────────────────────── */

type PlaceholderProps = {
  category: string;
  categoryColor: string;
  categoryBg: string;
  icon?: React.ElementType;
  tall?: boolean;
};

function ArticleImage({
  category,
  categoryColor,
  categoryBg,
  icon: Icon = BookOpen,
  tall = false,
}: PlaceholderProps) {
  return (
    <div
      className={`${tall ? "h-52" : "h-40"} flex flex-col items-center justify-center gap-2 relative overflow-hidden`}
      style={{ backgroundColor: categoryBg }}
    >
      {/* Décoratif */}
      <div
        className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-20"
        style={{ backgroundColor: categoryColor }}
      />
      <div
        className="absolute -top-4 -left-4 w-16 h-16 rounded-full opacity-10"
        style={{ backgroundColor: categoryColor }}
      />
      <Icon className="w-9 h-9 relative z-10" style={{ color: categoryColor }} />
      <span
        className="text-xs font-bold uppercase tracking-wider relative z-10"
        style={{ color: categoryColor }}
      >
        {category}
      </span>
    </div>
  );
}

/* ─── Articles data ────────────────────────────────────────────────────────── */

const newArticles = [
  {
    id: "marche-immobilier-dakar-2026",
    category: "Immobilier",
    categoryColor: "#C8922A",
    categoryBg: "#F5E6C8",
    icon: Home,
    title: "Le marché immobilier à Dakar en 2026 : tendances et opportunités",
    excerpt:
      "La pression foncière dans les quartiers centraux pousse les acheteurs vers des zones périphériques en plein essor. Prix au m², quartiers à privilégier, rendements locatifs : notre analyse complète du marché 2026.",
    author: "Équipe Kasafrik",
    date: "10 janv. 2026",
    readTime: "8 min",
    location: "Dakar",
  },
  {
    id: "vendre-terrain-senegal-guide",
    category: "Immobilier",
    categoryColor: "#C8922A",
    categoryBg: "#F5E6C8",
    icon: Home,
    title: "Comment vendre son terrain au Sénégal : guide complet",
    excerpt:
      "Titre foncier, bornage, procédure notariale, fiscalité... La vente d'un terrain au Sénégal comporte des étapes incontournables. Ce guide vous explique la procédure complète pour vendre rapidement et en toute légalité.",
    author: "Équipe Kasafrik",
    date: "5 janv. 2026",
    readTime: "7 min",
    location: "Sénégal",
  },
  {
    id: "diamniadio-investir-maintenant-ou-attendre",
    category: "Immobilier",
    categoryColor: "#C8922A",
    categoryBg: "#F5E6C8",
    icon: Building2,
    title: "Diamniadio, la nouvelle ville : investir maintenant ou attendre ?",
    excerpt:
      "Centre international de conférences, Arena, zones industrielles, autoroutes... Diamniadio s'impose comme le pari immobilier de la décennie. Analyse des prix actuels, des risques et des opportunités pour les investisseurs avisés.",
    author: "Équipe Kasafrik",
    date: "28 déc. 2025",
    readTime: "6 min",
    location: "Diamniadio",
  },
  {
    id: "location-vs-achat-dakar-2026",
    category: "Conseils",
    categoryColor: "#1A1A2E",
    categoryBg: "#E8E8F0",
    icon: Lightbulb,
    title: "Location vs achat à Dakar : que choisir en 2026 ?",
    excerpt:
      "Loyers en hausse, taux bancaires, apport personnel... L'équation financière entre louer et acheter à Dakar n'a jamais été aussi complexe. Notre analyse et nos conseils pour prendre la bonne décision selon votre profil.",
    author: "Équipe Kasafrik",
    date: "20 déc. 2025",
    readTime: "5 min",
    location: "Dakar",
  },
  {
    id: "quartiers-prises-dakar-investir",
    category: "Immobilier",
    categoryColor: "#C8922A",
    categoryBg: "#F5E6C8",
    icon: MapPin,
    title: "Les quartiers les plus prisés de Dakar pour investir en 2026",
    excerpt:
      "Almadies, Plateau, Mermoz, Sacré-Cœur, Point E, Fann Résidence... Chaque quartier dakarois a ses spécificités en termes de prix et de rendement locatif. Notre classement des meilleures zones d'investissement.",
    author: "Équipe Kasafrik",
    date: "15 déc. 2025",
    readTime: "7 min",
    location: "Dakar",
  },
  {
    id: "organiser-evenement-senegal-guide",
    category: "Événements",
    categoryColor: "#C84B2F",
    categoryBg: "#FAE8E3",
    icon: Calendar,
    title: "Organiser un événement au Sénégal : tout ce qu'il faut savoir",
    excerpt:
      "Autorisations préfectorales, choix de la salle, billetterie digitale, sécurité, communication... L'organisation d'un événement public au Sénégal obéit à des règles précises. Notre guide complet pour réussir votre événement.",
    author: "Équipe Kasafrik",
    date: "8 déc. 2025",
    readTime: "9 min",
    location: "Sénégal",
  },
];

const moreArticles = [
  {
    id: "guide-location-appartement-dakar",
    category: "Immobilier",
    categoryColor: "#C8922A",
    categoryBg: "#F5E6C8",
    icon: Home,
    title: "Guide complet : louer un appartement à Dakar",
    excerpt:
      "Contrat de bail, caution, état des lieux, droits du locataire... Tout ce que vous devez savoir avant de signer.",
    author: "Kasafrik",
    date: "10 mai 2025",
    readTime: "6 min",
    location: "Dakar",
  },
  {
    id: "top-evenements-dakar-ete-2025",
    category: "Événements",
    categoryColor: "#C84B2F",
    categoryBg: "#FAE8E3",
    icon: Calendar,
    title: "Top 10 des événements à ne pas manquer à Dakar",
    excerpt:
      "Concerts, festivals, forums business : notre sélection des meilleurs événements de la saison en Afrique de l'Ouest.",
    author: "Kasafrik",
    date: "5 mai 2025",
    readTime: "4 min",
    location: "Dakar",
  },
  {
    id: "investir-immobilier-senegal-diaspora",
    category: "Immobilier",
    categoryColor: "#C8922A",
    categoryBg: "#F5E6C8",
    icon: Globe,
    title: "Investir dans l'immobilier au Sénégal : ce que la diaspora doit savoir",
    excerpt:
      "Procédures, pièges à éviter, zones prometteuses... Le guide indispensable pour investir depuis l'étranger en toute sécurité.",
    author: "Kasafrik",
    date: "28 avr. 2025",
    readTime: "10 min",
    location: "Sénégal",
  },
  {
    id: "billetterie-digitale-afrique",
    category: "Tendances",
    categoryColor: "#635BFF",
    categoryBg: "#F0EFFF",
    icon: TrendingUp,
    title: "La révolution de la billetterie digitale en Afrique de l'Ouest",
    excerpt:
      "QR codes, paiements mobile, anti-fraude... Comment la technologie transforme l'accès aux événements sur le continent.",
    author: "Kasafrik",
    date: "12 avr. 2025",
    readTime: "7 min",
    location: "Afrique de l'Ouest",
  },
  {
    id: "guesthouses-dakar-alternatives-hotels",
    category: "Hôtels",
    categoryColor: "#4A7C59",
    categoryBg: "#D6EDE0",
    icon: Building2,
    title: "Guesthouses à Dakar : les meilleures alternatives aux hôtels",
    excerpt:
      "Confort, prix, localisation... Découvrez pourquoi les guesthouses s'imposent comme la solution d'hébergement privilégiée.",
    author: "Kasafrik",
    date: "20 avr. 2025",
    readTime: "5 min",
    location: "Dakar",
  },
  {
    id: "hotels-saint-louis",
    category: "Hôtels",
    categoryColor: "#4A7C59",
    categoryBg: "#D6EDE0",
    icon: Building2,
    title: "Saint-Louis du Sénégal : les meilleures adresses pour votre séjour",
    excerpt:
      "Hôtels historiques, guesthouses cosy, restaurants sur le fleuve... Notre guide de la ville aux mille couleurs.",
    author: "Kasafrik",
    date: "1 mars 2025",
    readTime: "4 min",
    location: "Saint-Louis",
  },
];

/* ─── ArticleCard ──────────────────────────────────────────────────────────── */

type Article = (typeof newArticles)[0];

function ArticleCard({ article }: { article: Article }) {
  const Icon = article.icon;
  return (
    <Link href={`/blog/${article.id}`}>
      <article className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
        <ArticleImage
          category={article.category}
          categoryColor={article.categoryColor}
          categoryBg={article.categoryBg}
          icon={Icon}
        />

        <div className="p-5 flex flex-col flex-1">
          {/* Meta */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-md"
              style={{
                backgroundColor: article.categoryBg,
                color: article.categoryColor,
              }}
            >
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-[#1A1A2E] text-sm leading-snug mb-2 group-hover:text-[#C8922A] transition-colors flex-1">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
            {article.excerpt}
          </p>

          {/* Footer */}
          <div className="mt-auto pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-[#F5E6C8] rounded-full flex items-center justify-center">
                  <User className="w-2.5 h-2.5 text-[#C8922A]" />
                </div>
                <div>
                  <span className="text-xs text-gray-500">{article.author}</span>
                  <span className="text-gray-300 mx-1">·</span>
                  <span className="text-xs text-gray-400">{article.date}</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#C8922A] flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                Lire <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1A1A2E] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#C8922A]/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#C8922A]" />
            </div>
            <span className="text-xs font-semibold text-[#C8922A] uppercase tracking-wider">
              Blog Kasafrik
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Actualités & Conseils
          </h1>
          <p className="text-gray-400 max-w-xl">
            Immobilier, événements, voyages, conseils pratiques — restez
            informé sur l&apos;Afrique qui bouge.
          </p>
        </div>
      </section>

      {/* Featured article */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={`/blog/${featured.id}`}>
            <div
              className={`group relative bg-gradient-to-br ${featured.gradient} rounded-2xl overflow-hidden p-8 md:p-12 hover:shadow-2xl transition-shadow duration-300 cursor-pointer`}
            >
              {/* Déco */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#C8922A]/10 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#C8922A]/5 blur-2xl" />
              </div>

              {/* Image placeholder côté droit */}
              <div
                className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:flex items-center justify-center"
                style={{ background: "linear-gradient(to left, rgba(200,146,42,0.1), transparent)" }}
              >
                <div className="text-center">
                  <Home className="w-16 h-16 text-[#C8922A]/40 mx-auto mb-2" />
                  <MapPin className="w-6 h-6 text-[#C8922A]/30 mx-auto" />
                </div>
              </div>

              <div className="relative max-w-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-lg"
                    style={{
                      backgroundColor: featured.categoryBg,
                      color: featured.categoryColor,
                    }}
                  >
                    {featured.category}
                  </span>
                  <span className="text-xs text-gray-400 bg-white/10 px-2.5 py-1 rounded-lg">
                    À la une
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {featured.readTime} de lecture
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight group-hover:text-[#F5E6C8] transition-colors">
                  {featured.title}
                </h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {featured.excerpt}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 bg-[#C8922A] rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300">{featured.author}</span>
                    </div>
                    <span>{featured.date}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C8922A] group-hover:gap-2.5 transition-all">
                    Lire l&apos;article complet <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-5">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 bg-white/10 text-gray-400 rounded-lg"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Category filters */}
      <section className="pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.label}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-600 hover:border-[#C8922A] hover:text-[#C8922A] transition-all"
                >
                  <Icon className="w-3 h-3" />
                  {cat.label}
                  <span className="text-gray-400">({cat.count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* New articles — 6 articles demandés */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[#1A1A2E]">
              Articles récents
            </h2>
            <span className="text-xs text-gray-400">
              {newArticles.length} articles
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
            Articles précédents
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      </div>

      {/* More articles */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {moreArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {/* Load more */}
          <div className="text-center mt-10">
            <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#C8922A] text-[#C8922A] font-semibold rounded-xl hover:bg-[#F5E6C8] transition-all text-sm">
              Charger plus d&apos;articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-[#1A1A2E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 bg-[#C8922A]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Tag className="w-6 h-6 text-[#C8922A]" />
          </div>
          <h3 className="text-white font-bold text-xl mb-2">Restez informé</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            Recevez chaque semaine les meilleurs articles Kasafrik sur
            l&apos;immobilier et les événements en Afrique.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="votre@email.com"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
            />
            <button className="px-5 py-3 bg-[#C8922A] hover:bg-[#8A6118] text-white font-semibold rounded-xl transition-all text-sm whitespace-nowrap">
              S&apos;abonner
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-3">
            Pas de spam. Désabonnement en 1 clic.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
