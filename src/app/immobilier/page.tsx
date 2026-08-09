"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Search, SlidersHorizontal, X, MapPin,
  ChevronLeft, ChevronRight, Home, AlertCircle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyCard from "@/components/cards/PropertyCard";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { getProperties } from "@/lib/api";
import { useLanguage } from "@/hooks/useLanguage";
import type { Property } from "@/types";

// ── Données de secours ────────────────────────────────────────────────────────

const MOCK: Property[] = [
  { id: 1, user_id: 2, title: "Villa moderne 4ch. — Almadies", description: "Magnifique villa avec piscine, jardin, garage double. Quartier résidentiel prisé.", type: "sale", category: "villa", price: 85000000, currency: "XOF", city: "Dakar", address: "Almadies", bedrooms: 4, bathrooms: 3, surface: 320, is_featured: true, is_verified: true, status: "active", images: [], created_at: "2024-01-15T10:00:00Z", updated_at: "2024-01-15T10:00:00Z" },
  { id: 2, user_id: 2, title: "Appartement F3 meublé — Plateau", description: "Bel appartement meublé au cœur du Plateau. Vue sur mer.", type: "rent", category: "apartment", price: 450000, currency: "XOF", city: "Dakar", address: "Plateau", bedrooms: 3, bathrooms: 2, surface: 95, is_featured: false, is_verified: true, status: "active", images: [], created_at: "2024-01-16T10:00:00Z", updated_at: "2024-01-16T10:00:00Z" },
  { id: 3, user_id: 3, title: "Studio étudiant — Mermoz", description: "Studio idéal pour étudiant, proche université.", type: "rent", category: "studio", price: 120000, currency: "XOF", city: "Dakar", address: "Mermoz", bedrooms: 1, bathrooms: 1, surface: 35, is_featured: false, is_verified: true, status: "active", images: [], created_at: "2024-01-17T10:00:00Z", updated_at: "2024-01-17T10:00:00Z" },
  { id: 4, user_id: 2, title: "Villa duplex 5ch. piscine — Ngor", description: "Splendide villa de luxe avec piscine olympique et vue panoramique.", type: "sale", category: "villa", price: 120000000, currency: "XOF", city: "Dakar", address: "Ngor", bedrooms: 5, bathrooms: 4, surface: 450, is_featured: true, is_verified: true, status: "active", images: [], created_at: "2024-01-18T10:00:00Z", updated_at: "2024-01-18T10:00:00Z" },
  { id: 5, user_id: 4, title: "Terrain constructible 800m² — Thiès", description: "Beau terrain viabilisé en zone résidentielle.", type: "sale", category: "land", price: 25000000, currency: "XOF", city: "Thiès", address: "Centre-ville", surface: 800, is_featured: false, is_verified: true, status: "active", images: [], created_at: "2024-02-01T10:00:00Z", updated_at: "2024-02-01T10:00:00Z" },
  { id: 6, user_id: 5, title: "Bureau moderne 150m² — Plateau", description: "Espace de bureaux de prestige en plein cœur commercial.", type: "rent", category: "office", price: 2000000, currency: "XOF", city: "Dakar", address: "Plateau", surface: 150, is_featured: false, is_verified: true, status: "active", images: [], created_at: "2024-02-05T10:00:00Z", updated_at: "2024-02-05T10:00:00Z" },
  { id: 7, user_id: 6, title: "Maison 3ch. cour arborée — Pikine", description: "Belle maison avec grande cour arborée, quartier calme.", type: "sale", category: "house", price: 35000000, currency: "XOF", city: "Dakar", address: "Pikine", bedrooms: 3, bathrooms: 2, surface: 200, is_featured: false, is_verified: true, status: "active", images: [], created_at: "2024-02-10T10:00:00Z", updated_at: "2024-02-10T10:00:00Z" },
  { id: 8, user_id: 7, title: "Appartement F2 — Liberté 6", description: "Appartement lumineux 2 pièces, immeuble sécurisé.", type: "rent", category: "apartment", price: 280000, currency: "XOF", city: "Dakar", address: "Liberté 6", bedrooms: 2, bathrooms: 1, surface: 65, is_featured: false, is_verified: true, status: "active", images: [], created_at: "2024-02-12T10:00:00Z", updated_at: "2024-02-12T10:00:00Z" },
  { id: 9, user_id: 8, title: "Villa bord de mer — Saly", description: "Villa prestige pieds dans l'eau, accès direct plage.", type: "sale", category: "villa", price: 180000000, currency: "XOF", city: "Saly", address: "Bord de mer", bedrooms: 6, bathrooms: 5, surface: 600, is_featured: true, is_verified: true, status: "active", images: [], created_at: "2024-02-15T10:00:00Z", updated_at: "2024-02-15T10:00:00Z" },
];

// ── Constantes ────────────────────────────────────────────────────────────────

const CITIES = ["Dakar", "Thiès", "Saint-Louis", "Ziguinchor", "Saly", "Mbour", "Abidjan"];

const CATEGORIES = [
  { value: "", label: "Tous types" },
  { value: "villa", label: "Villa" },
  { value: "apartment", label: "Appartement" },
  { value: "studio", label: "Studio" },
  { value: "house", label: "Maison" },
  { value: "office", label: "Bureau" },
  { value: "land", label: "Terrain" },
];

const PER_PAGE = 9;

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ImmobilierPage() {
  const { t } = useLanguage();
  const TYPES = [
    { value: "", label: t('vente_location') },
    { value: "sale", label: t('vente') },
    { value: "rent", label: t('location') },
    { value: "court_sejour", label: t('court_sejour') },
  ];

  const [properties, setProperties] = useState<Property[]>(MOCK);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(MOCK.length);
  const [totalPages, setTotalPages] = useState(1);

  // Filtres
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [bedroomsMin, setBedroomsMin] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  // Debounce ref pour les champs texte/prix
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch depuis l'API à chaque changement de filtre (avec debounce sur search + prix)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const needsDebounce = search.length > 0 || priceMin.length > 0 || priceMax.length > 0;
    const delay = needsDebounce ? 450 : 0;

    debounceRef.current = setTimeout(() => {
      const params: Record<string, string | number> = {
        per_page: PER_PAGE,
        page,
      };
      if (search)     params.search = search;
      if (type)       params.type = type;
      if (category)   params.category = category;
      if (city)       params.city = city;
      if (priceMin)   params.price_min = Number(priceMin);
      if (priceMax)   params.price_max = Number(priceMax);
      if (bedroomsMin) params.bedrooms_min = Number(bedroomsMin);

      setLoading(true);
      setApiError(null);

      getProperties(params)
        .then((r) => {
          setProperties(r.data.filter((p) => p.type !== "hotel"));
          setTotalCount(r.meta?.total ?? r.data.length);
          setTotalPages(r.meta?.last_page ?? 1);
        })
        .catch(() => {
          setApiError("Impossible de contacter le serveur. Les annonces ci-dessous sont des exemples.");
          // Fallback local si première erreur (données déjà en place)
        })
        .finally(() => setLoading(false));
    }, delay);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, type, category, city, priceMin, priceMax, bedroomsMin, page]);

  // Reset page quand un filtre change (pas sur page elle-même)
  function applyFilter(setter: (v: string) => void) {
    return (v: string) => { setter(v); setPage(1); };
  }

  const hasFilters = !!(search || type || category || city || priceMin || priceMax || bedroomsMin);

  function resetFilters() {
    setSearch(""); setType(""); setCategory(""); setCity("");
    setPriceMin(""); setPriceMax(""); setBedroomsMin(""); setPage(1);
  }

  // Pour l'affichage du nombre de pages dans la pagination côté client
  // (si l'API ne renvoie pas de meta, on pagine localement comme fallback)
  const effectiveTotalPages = totalPages > 1 ? totalPages : Math.ceil(properties.length / PER_PAGE);
  const displayedProperties = totalPages > 1
    ? properties                                          // déjà paginés côté serveur
    : properties.slice((page - 1) * PER_PAGE, page * PER_PAGE); // fallback local

  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1A1A2E] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
            {t('immobilier_titre')}
          </h1>
          <p className="text-gray-400 mb-6">
            {totalCount.toLocaleString("fr-FR")} {t('annonces_disponibles')}
          </p>

          {/* Barre de recherche principale */}
          <div className="bg-white rounded-2xl p-4 flex flex-col sm:flex-row gap-3 shadow-xl">
            <div className="flex-1">
              <Input
                placeholder="Titre, ville, quartier…"
                value={search}
                onChange={(e) => applyFilter(setSearch)(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />
            </div>
            <select
              value={type}
              onChange={(e) => applyFilter(setType)(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white"
            >
              {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
            <select
              value={city}
              onChange={(e) => applyFilter(setCity)(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white"
            >
              <option value="">{t('toutes_villes')}</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <Button
              variant="ghost"
              size="md"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="gap-2 border border-gray-200 shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {t('filtres')}
              {hasFilters && <span className="w-2 h-2 rounded-full bg-[#C8922A]" />}
            </Button>
          </div>

          {/* Filtres avancés */}
          {filtersOpen && (
            <div className="bg-white rounded-2xl p-4 mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4 shadow-lg">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Catégorie</label>
                <select
                  value={category}
                  onChange={(e) => applyFilter(setCategory)(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white"
                >
                  {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Prix min (XOF)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={priceMin}
                  onChange={(e) => applyFilter(setPriceMin)(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Prix max (XOF)</label>
                <input
                  type="number"
                  placeholder="Illimité"
                  value={priceMax}
                  onChange={(e) => applyFilter(setPriceMax)(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Chambres min</label>
                <select
                  value={bedroomsMin}
                  onChange={(e) => applyFilter(setBedroomsMin)(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white"
                >
                  <option value="">N&apos;importe</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Résultats */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Bannière erreur API */}
          {apiError && (
            <div className="flex items-start gap-3 bg-[#FFF8E7] border border-[#C8922A]/35 rounded-xl px-4 py-3 text-sm text-[#8A6118] mb-6">
              <AlertCircle className="w-4 h-4 text-[#C8922A] shrink-0 mt-0.5" />
              <span className="flex-1">{apiError}</span>
              <button onClick={() => setApiError(null)} className="text-[#C8922A] hover:opacity-70 transition-opacity">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Filtres actifs */}
          {hasFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm text-gray-500">Filtres actifs :</span>
              {type && (
                <Badge variant="gold" className="gap-1 cursor-pointer" onClick={() => applyFilter(setType)("")}>
                  {TYPES.find((t) => t.value === type)?.label}
                  <X className="w-3 h-3" />
                </Badge>
              )}
              {category && (
                <Badge variant="blue" className="gap-1 cursor-pointer" onClick={() => applyFilter(setCategory)("")}>
                  {CATEGORIES.find((c) => c.value === category)?.label}
                  <X className="w-3 h-3" />
                </Badge>
              )}
              {city && (
                <Badge variant="green" className="gap-1 cursor-pointer" onClick={() => applyFilter(setCity)("")}>
                  <MapPin className="w-3 h-3" />{city}
                  <X className="w-3 h-3" />
                </Badge>
              )}
              {(priceMin || priceMax) && (
                <Badge variant="gray" className="gap-1 cursor-pointer" onClick={() => { applyFilter(setPriceMin)(""); applyFilter(setPriceMax)(""); }}>
                  {priceMin ? `${Number(priceMin).toLocaleString("fr-FR")} XOF` : "0"} — {priceMax ? `${Number(priceMax).toLocaleString("fr-FR")} XOF` : "∞"}
                  <X className="w-3 h-3" />
                </Badge>
              )}
              {bedroomsMin && (
                <Badge variant="gray" className="gap-1 cursor-pointer" onClick={() => applyFilter(setBedroomsMin)("")}>
                  {bedroomsMin}+ ch.
                  <X className="w-3 h-3" />
                </Badge>
              )}
              <button onClick={resetFilters} className="text-xs text-[#C84B2F] hover:underline ml-1">
                Tout réinitialiser
              </button>
            </div>
          )}

          {/* Compteur + bouton publier */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              {loading ? (
                <span className="inline-block skeleton h-4 w-24 rounded align-middle" />
              ) : (
                <><strong className="text-[#1A1A2E]">{totalCount}</strong> résultat{totalCount > 1 ? "s" : ""}</>
              )}
            </p>
            <Link href="/publier">
              <Button variant="primary" size="sm">+ {t('publier_annonce')}</Button>
            </Link>
          </div>

          {/* Grille */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: PER_PAGE }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : displayedProperties.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Home className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-lg font-medium mb-2">Aucune propriété trouvée</p>
              <p className="text-sm">Essayez de modifier vos critères de recherche.</p>
              <Button variant="outline" size="md" onClick={resetFilters} className="mt-4">
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProperties.map((p) => <PropertyCard key={p.id} property={p} />)}
            </div>
          )}

          {/* Pagination */}
          {!loading && effectiveTotalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-10">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {/* Affiche max 7 boutons de pages avec ellipsis */}
              {Array.from({ length: effectiveTotalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === effectiveTotalPages || Math.abs(p - page) <= 2)
                .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                  if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("…");
                  acc.push(p);
                  return acc;
                }, [])
                .map((item, i) =>
                  item === "…" ? (
                    <span key={`ellipsis-${i}`} className="w-9 text-center text-gray-400 text-sm">…</span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => setPage(item as number)}
                      className={[
                        "w-9 h-9 rounded-xl text-sm font-medium transition-all",
                        page === item
                          ? "bg-[#C8922A] text-white"
                          : "bg-white text-gray-600 border border-gray-200 hover:border-[#C8922A]",
                      ].join(" ")}
                    >
                      {item}
                    </button>
                  )
                )}

              <Button
                variant="outline"
                size="sm"
                disabled={page === effectiveTotalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Infos page */}
          {!loading && effectiveTotalPages > 1 && (
            <p className="text-center text-xs text-gray-400 mt-4">
              Page {page} sur {effectiveTotalPages} · {totalCount} annonce{totalCount > 1 ? "s" : ""}
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
