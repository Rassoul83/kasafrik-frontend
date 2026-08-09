"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Star, MapPin, Wifi, Car, Coffee, Waves, ChevronLeft, ChevronRight, AlertCircle, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { getProperties } from "@/lib/api";
import { useLanguage } from "@/hooks/useLanguage";
import type { Property } from "@/types";

interface Hotel extends Property {
  stars?: number;
  amenities_list?: string[];
  price_per_night?: number;
}

const MOCK_HOTELS: Hotel[] = [
  { id: 101, user_id: 10, title: "Villa Anna Guesthouse — Saly Portudal", description: "Guesthouse de charme en bord de mer, cadre tropical idyllique.", type: "hotel", category: "hotel_room", price: 45000, currency: "XOF", city: "Saly", address: "Saly Portudal", is_featured: true, is_verified: true, status: "active", images: [], stars: 4, amenities_list: ["Piscine", "Wifi", "Petit-déjeuner", "Parking"], price_per_night: 45000, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  { id: 102, user_id: 11, title: "King Fahd Palace — Dakar", description: "Hôtel 5 étoiles en plein cœur de Dakar, luxe absolu.", type: "hotel", category: "hotel_room", price: 150000, currency: "XOF", city: "Dakar", address: "Route de l'Aéroport", is_featured: true, is_verified: true, status: "active", images: [], stars: 5, amenities_list: ["Spa", "Piscine", "Restaurant gastronomique", "Salle de conférence", "Wifi", "Parking valet"], price_per_night: 150000, created_at: "2024-01-05T00:00:00Z", updated_at: "2024-01-05T00:00:00Z" },
  { id: 103, user_id: 12, title: "Radisson Blu Dakar Sea Plaza", description: "Vue imprenable sur l'océan Atlantique, service 5 étoiles.", type: "hotel", category: "hotel_room", price: 120000, currency: "XOF", city: "Dakar", address: "Plateau", is_featured: false, is_verified: true, status: "active", images: [], stars: 5, amenities_list: ["Piscine", "Spa", "Restaurant", "Wifi", "Bar"], price_per_night: 120000, created_at: "2024-01-10T00:00:00Z", updated_at: "2024-01-10T00:00:00Z" },
  { id: 104, user_id: 13, title: "Hôtel Terrou-Bi — Corniche", description: "Hôtel de prestige sur la Corniche, plage privée.", type: "hotel", category: "hotel_room", price: 85000, currency: "XOF", city: "Dakar", address: "Corniche Ouest", is_featured: false, is_verified: true, status: "active", images: [], stars: 4, amenities_list: ["Plage privée", "Piscine", "Restaurant", "Spa", "Wifi"], price_per_night: 85000, created_at: "2024-01-12T00:00:00Z", updated_at: "2024-01-12T00:00:00Z" },
  { id: 105, user_id: 14, title: "Résidence les Almadies — Dakar", description: "Appartements services avec vue mer, idéal long séjour.", type: "hotel", category: "hotel_room", price: 55000, currency: "XOF", city: "Dakar", address: "Almadies", is_featured: false, is_verified: true, status: "active", images: [], stars: 3, amenities_list: ["Cuisinette", "Wifi", "Piscine", "Parking"], price_per_night: 55000, created_at: "2024-01-15T00:00:00Z", updated_at: "2024-01-15T00:00:00Z" },
  { id: 106, user_id: 15, title: "Lamantin Beach Resort & Spa — Saly", description: "Resort de luxe avec spa, plage privée et golf 18 trous.", type: "hotel", category: "hotel_room", price: 200000, currency: "XOF", city: "Saly", address: "Saly Portudal", is_featured: true, is_verified: true, status: "active", images: [], stars: 5, amenities_list: ["Golf", "Spa", "Plage privée", "Piscines", "5 restaurants", "Tennis"], price_per_night: 200000, created_at: "2024-01-20T00:00:00Z", updated_at: "2024-01-20T00:00:00Z" },
];

const AMENITY_ICONS: Record<string, React.ElementType> = {
  "Wifi": Wifi,
  "Parking": Car,
  "Petit-déjeuner": Coffee,
  "Piscine": Waves,
};

const CITIES = ["Dakar", "Saly", "Mbour", "Saint-Louis", "Ziguinchor"];
const PER_PAGE = 6;

function fmt(n: number) {
  if (!isFinite(n) || isNaN(n)) return "—";
  return new Intl.NumberFormat("fr-FR").format(n);
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < count ? "text-[#C8922A] fill-[#C8922A]" : "text-gray-200 fill-gray-200"}`} />
      ))}
    </div>
  );
}

export default function HotelsPage() {
  const { t } = useLanguage();
  const [hotels, setHotels] = useState<Hotel[]>(MOCK_HOTELS);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [starsFilter, setStarsFilter] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setApiError(null);
    // BUG FIX: le backend utilise category=hotel (pas type=hotel)
    getProperties({ category: "hotel", per_page: 12 })
      .then((r) => {
        if (r.data.length > 0) setHotels(r.data as Hotel[]);
      })
      .catch(() => {
        setApiError("Impossible de charger les hôtels depuis le serveur. Les hébergements ci-dessous sont des exemples.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = hotels.filter((h) => {
    if (search && !h.title.toLowerCase().includes(search.toLowerCase()) && !h.city.toLowerCase().includes(search.toLowerCase())) return false;
    if (city && h.city !== city) return false;
    if (starsFilter && (h.stars ?? 0) < Number(starsFilter)) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1A1A2E] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
            {t('hotels_titre')}
          </h1>
          <p className="text-gray-400 mb-6">Réservez votre hébergement idéal partout en Afrique de l&apos;Ouest</p>

          <div className="bg-white rounded-2xl p-4 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="lg:col-span-2">
                <Input
                  placeholder="Nom de l'hôtel, ville…"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  icon={<Search className="w-4 h-4" />}
                />
              </div>
              <div>
                <input
                  type="date"
                  value={checkin}
                  onChange={(e) => setCheckin(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                  placeholder="Arrivée"
                />
              </div>
              <div>
                <input
                  type="date"
                  value={checkout}
                  onChange={(e) => setCheckout(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                  placeholder="Départ"
                />
              </div>
              <Button variant="primary" size="md" className="gap-2">
                <Search className="w-4 h-4" />
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Results */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 mb-6">
            <select
              value={city}
              onChange={(e) => { setCity(e.target.value); setPage(1); }}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
            >
              <option value="">{t('toutes_villes')}</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              value={starsFilter}
              onChange={(e) => { setStarsFilter(e.target.value); setPage(1); }}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
            >
              <option value="">Toutes les étoiles</option>
              <option value="3">3 étoiles +</option>
              <option value="4">4 étoiles +</option>
              <option value="5">5 étoiles</option>
            </select>
          </div>

          {apiError && (
            <div className="flex items-start gap-3 bg-[#FFF8E7] border border-[#C8922A]/35 rounded-xl px-4 py-3 text-sm text-[#8A6118] mb-6">
              <AlertCircle className="w-4 h-4 text-[#C8922A] shrink-0 mt-0.5" />
              <span className="flex-1">{apiError}</span>
              <button onClick={() => setApiError(null)} className="text-[#C8922A] hover:opacity-70 transition-opacity">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <p className="text-sm text-gray-500 mb-6">
            <strong className="text-[#1A1A2E]">{filtered.length}</strong> {t('hebergements_disponibles')}
          </p>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((hotel) => {
                const coverImage = hotel.images?.find((img) => img.is_primary)?.url ?? hotel.images?.[0]?.url;
                const pricePerNight = hotel.price_per_night ?? hotel.price;

                return (
                  <div
                    key={hotel.id}
                    className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-gradient-to-br from-[#1A1A2E] to-[#16213E] overflow-hidden">
                      {coverImage ? (
                        <Image
                          src={coverImage}
                          alt={hotel.title}
                          fill
                          unoptimized
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-5xl select-none">🏨</span>
                        </div>
                      )}
                      {hotel.is_featured && (
                        <div className="absolute top-3 right-3">
                          <Badge variant="gold">★ Recommandé</Badge>
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3">
                        <StarRating count={hotel.stars ?? 3} />
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-[#1A1A2E] mb-1 group-hover:text-[#C8922A] transition-colors line-clamp-2">
                        {hotel.title}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-[#C8922A]" />
                        {hotel.city}
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">{hotel.description}</p>

                      {/* Amenities icons */}
                      {hotel.amenities_list && (
                        <div className="flex gap-2 mb-4">
                          {hotel.amenities_list.slice(0, 4).map((a) => {
                            const Icon = AMENITY_ICONS[a];
                            return Icon ? (
                              <div key={a} title={a} className="w-7 h-7 rounded-lg bg-[#F5E6C8] flex items-center justify-center">
                                <Icon className="w-3.5 h-3.5 text-[#C8922A]" />
                              </div>
                            ) : null;
                          })}
                          {hotel.amenities_list.length > 4 && (
                            <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-medium">
                              +{hotel.amenities_list.length - 4}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold text-[#C8922A]">
                            {fmt(Number(pricePerNight))} XOF
                          </p>
                          <p className="text-xs text-gray-400">/nuit</p>
                        </div>
                        <Link href={`/hotels/${hotel.id}`}>
                          <Button variant="primary" size="sm">{t('reserver')}</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!loading && paginated.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <span className="text-5xl block mb-3">🏨</span>
              <p className="text-lg font-medium">Aucun hébergement trouvé</p>
              <Button variant="outline" size="sm" onClick={() => { setSearch(""); setCity(""); setStarsFilter(""); setPage(1); }} className="mt-4">
                Réinitialiser les filtres
              </Button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-10">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${page === i + 1 ? "bg-[#C8922A] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-[#C8922A]"}`}>
                  {i + 1}
                </button>
              ))}
              <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
