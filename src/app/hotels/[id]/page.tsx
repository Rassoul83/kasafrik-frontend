"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin, Star, Wifi, Car, Coffee, Waves, Dumbbell, UtensilsCrossed,
  CheckCircle, Calendar, Users, ArrowLeft, Home, Shield, Phone, Mail,
  ChevronLeft, ChevronRight, AlertCircle, X, Loader2,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { getProperty, getProperties, createBooking } from "@/lib/api";
import type { Property } from "@/types";

interface HotelDetail extends Property {
  stars?: number;
  amenities_list?: string[];
  price_per_night?: number;
}

const MOCK_HOTELS: Record<number, HotelDetail> = {
  101: {
    id: 101, user_id: 10,
    title: "Villa Anna Guesthouse — Saly Portudal",
    description: "Guesthouse de charme en bord de mer, cadre tropical idyllique. Niché au cœur de Saly Portudal, à quelques mètres de la plage, Villa Anna vous accueille dans un cadre tropical de toute beauté.\n\nNos chambres spacieuses et climatisées s'ouvrent sur des jardins luxuriants ou directement sur la piscine. Le petit-déjeuner sénégalais et continental est servi chaque matin sur la terrasse.\n\nIdéal pour les couples en escapade romantique, les familles et les voyageurs d'affaires cherchant un havre de paix.",
    type: "hotel", category: "hotel_room", price: 45000, currency: "XOF",
    city: "Saly", address: "Saly Portudal, Mbour",
    is_featured: true, is_verified: true, status: "active", images: [],
    stars: 4,
    amenities_list: ["Piscine", "Wifi", "Petit-déjeuner", "Parking", "Climatisation", "Restaurant", "Bar", "Jardins tropicaux"],
    price_per_night: 45000,
    created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z",
  },
  102: {
    id: 102, user_id: 11,
    title: "King Fahd Palace — Dakar",
    description: "Hôtel 5 étoiles en plein cœur de Dakar, luxe absolu. Le King Fahd Palace est le fleuron de l'hôtellerie de luxe sénégalaise.\n\nSes chambres et suites somptueuses offrent une vue imprenable sur l'Atlantique ou sur le centre-ville de Dakar. Le complexe dispose d'un centre de conférences de 2 000 places, idéal pour vos événements d'entreprise.\n\nRestaurant gastronomique, spa complet, piscine olympique et service de conciergerie 24h/24 font de cet établissement une adresse incontournable.",
    type: "hotel", category: "hotel_room", price: 150000, currency: "XOF",
    city: "Dakar", address: "Route de l'Aéroport, Dakar",
    is_featured: true, is_verified: true, status: "active", images: [],
    stars: 5,
    amenities_list: ["Spa", "Piscine", "Restaurant gastronomique", "Salle de conférence", "Wifi", "Parking valet", "Fitness", "Bar"],
    price_per_night: 150000,
    created_at: "2024-01-05T00:00:00Z", updated_at: "2024-01-05T00:00:00Z",
  },
  103: {
    id: 103, user_id: 12,
    title: "Radisson Blu Dakar Sea Plaza",
    description: "Vue imprenable sur l'océan Atlantique, service 5 étoiles. Situé sur la corniche Ouest de Dakar, le Radisson Blu offre une expérience de séjour inoubliable.\n\nSes 247 chambres et suites ultra-modernes disposent toutes d'un accès wifi haut débit, d'un minibar et d'une vue sur l'océan ou la ville. Le restaurant Le Boukarou vous propose une cuisine internationale et sénégalaise raffinée.\n\nPiscine à débordement, spa Shine, centre de fitness et plusieurs espaces de réunion complètent l'offre de cet établissement de premier ordre.",
    type: "hotel", category: "hotel_room", price: 120000, currency: "XOF",
    city: "Dakar", address: "Corniche Ouest, Plateau, Dakar",
    is_featured: false, is_verified: true, status: "active", images: [],
    stars: 5,
    amenities_list: ["Piscine", "Spa", "Restaurant", "Wifi", "Bar", "Fitness", "Parking"],
    price_per_night: 120000,
    created_at: "2024-01-10T00:00:00Z", updated_at: "2024-01-10T00:00:00Z",
  },
  106: {
    id: 106, user_id: 15,
    title: "Lamantin Beach Resort & Spa — Saly",
    description: "Resort de luxe avec spa, plage privée et golf 18 trous. Le Lamantin Beach est le resort le plus prisé de Saly, s'étendant sur 12 hectares de végétation tropicale en bord de mer.\n\nLe domaine comprend 5 restaurants aux cuisines du monde, un spa Nuxe sur 1 200 m², un parcours de golf 18 trous dessiné par Peter Alliss, 4 piscines dont une olympique, et une plage privée de 300 mètres.\n\nLes 178 bungalows et villas sont disséminés dans les jardins, chacun avec terrasse privée et accès direct aux espaces communs.",
    type: "hotel", category: "hotel_room", price: 200000, currency: "XOF",
    city: "Saly", address: "Saly Portudal, Mbour",
    is_featured: true, is_verified: true, status: "active", images: [],
    stars: 5,
    amenities_list: ["Golf", "Spa", "Plage privée", "Piscines", "5 restaurants", "Tennis", "Fitness", "Bar", "Parking", "Wifi"],
    price_per_night: 200000,
    created_at: "2024-01-20T00:00:00Z", updated_at: "2024-01-20T00:00:00Z",
  },
};

const FALLBACK: HotelDetail = {
  id: 0, user_id: 1,
  title: "Hôtel à Dakar",
  description: "Hébergement confortable à Dakar.",
  type: "hotel", category: "hotel_room", price: 60000, currency: "XOF",
  city: "Dakar", address: "Dakar, Sénégal",
  is_featured: false, is_verified: true, status: "active", images: [],
  stars: 3,
  amenities_list: ["Wifi", "Parking", "Climatisation"],
  price_per_night: 60000,
  created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z",
};

const SIMILAR_FALLBACK: HotelDetail[] = [
  { id: 104, user_id: 13, title: "Hôtel Terrou-Bi — Corniche", description: "", type: "hotel", category: "hotel_room", price: 85000, currency: "XOF", city: "Dakar", address: "Corniche Ouest", is_featured: false, is_verified: true, status: "active", images: [], stars: 4, price_per_night: 85000, created_at: "2024-01-12T00:00:00Z", updated_at: "2024-01-12T00:00:00Z" },
  { id: 105, user_id: 14, title: "Résidence les Almadies — Dakar", description: "", type: "hotel", category: "hotel_room", price: 55000, currency: "XOF", city: "Dakar", address: "Almadies", is_featured: false, is_verified: true, status: "active", images: [], stars: 3, price_per_night: 55000, created_at: "2024-01-15T00:00:00Z", updated_at: "2024-01-15T00:00:00Z" },
  { id: 101, user_id: 10, title: "Villa Anna Guesthouse — Saly", description: "", type: "hotel", category: "hotel_room", price: 45000, currency: "XOF", city: "Saly", address: "Saly Portudal", is_featured: true, is_verified: true, status: "active", images: [], stars: 4, price_per_night: 45000, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
];

const AMENITY_ICONS: Record<string, React.ElementType> = {
  Wifi, Parking: Car, "Petit-déjeuner": Coffee, Piscine: Waves,
  Fitness: Dumbbell, Restaurant: UtensilsCrossed, "5 restaurants": UtensilsCrossed,
};

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n);
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < count ? "text-[#C8922A] fill-[#C8922A]" : "text-gray-200 fill-gray-200"}`} />
      ))}
    </div>
  );
}

function nightsBetween(a: string, b: string) {
  if (!a || !b) return 0;
  const diff = new Date(b).getTime() - new Date(a).getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function ImageSkeleton() {
  return (
    <div className="relative rounded-2xl overflow-hidden h-64 md:h-96 shadow-xl">
      <div className="skeleton w-full h-full" />
      <div className="absolute top-4 left-4 flex gap-2">
        <div className="skeleton-dark w-28 h-6 rounded-full" />
      </div>
    </div>
  );
}

export default function HotelDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const [hotel, setHotel] = useState<HotelDetail>(MOCK_HOTELS[id] ?? FALLBACK);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [similar, setSimilar] = useState<HotelDetail[]>(SIMILAR_FALLBACK);

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [checkin, setCheckin] = useState(today);
  const [checkout, setCheckout] = useState(tomorrow);
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState("");
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setFetchError(null);
    getProperty(id)
      .then((r) => {
        setHotel(r.data as HotelDetail);
        return getProperties({ type: "hotel", per_page: 5 });
      })
      .then((r) => {
        const others = (r.data as HotelDetail[]).filter((h) => h.id !== id);
        if (others.length > 0) setSimilar(others);
      })
      .catch(() => {
        setFetchError("Impossible de charger les informations depuis le serveur. Les données affichées sont des exemples.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const nights = nightsBetween(checkin, checkout);
  const pricePerNight = hotel.price_per_night ?? hotel.price;
  const total = nights * pricePerNight;
  const images = hotel.images ?? [];

  async function handleBook(e: React.FormEvent) {
    e.preventDefault();
    if (nights <= 0) { setBookingError("La date de départ doit être après la date d'arrivée."); return; }
    setBookingError(null);
    setBooking(true);
    try {
      await createBooking({ property_id: hotel.id, check_in: checkin, check_out: checkout, guests, notes });
      setBooked(true);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        ?? "La réservation a échoué. Veuillez réessayer.";
      setBookingError(msg);
    } finally {
      setBooking(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#C8922A]"><Home className="w-4 h-4" /></Link>
          <span>/</span>
          <Link href="/hotels" className="hover:text-[#C8922A]">Hôtels</Link>
          <span>/</span>
          <span className="text-[#1A1A2E] font-medium truncate">{hotel.title}</span>
        </div>

        {/* Error banner */}
        {fetchError && (
          <div className="flex items-start gap-3 bg-[#FFF8E7] border border-[#C8922A]/35 rounded-xl px-4 py-3 text-sm text-[#8A6118] mb-6">
            <AlertCircle className="w-4 h-4 text-[#C8922A] shrink-0 mt-0.5" />
            <span className="flex-1">{fetchError}</span>
            <button onClick={() => setFetchError(null)} className="text-[#C8922A] hover:opacity-70 transition-opacity">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero image / gallery */}
            {loading ? (
              <ImageSkeleton />
            ) : (
              <div className="relative rounded-2xl overflow-hidden h-64 md:h-96 shadow-xl bg-gradient-to-br from-[#1A1A2E] to-[#16213E]">
                {images.length > 0 ? (
                  <>
                    <Image
                      src={images[imgIndex]?.url}
                      alt={`${hotel.title} — photo ${imgIndex + 1}`}
                      fill
                      unoptimized
                      style={{ objectFit: "cover" }}
                      priority={imgIndex === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => setImgIndex((i) => (i - 1 + images.length) % images.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setImgIndex((i) => (i + 1) % images.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {images.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setImgIndex(i)}
                              className={`h-1.5 rounded-full transition-all ${i === imgIndex ? "w-5 bg-white" : "w-1.5 bg-white/50"}`}
                            />
                          ))}
                        </div>
                        <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                          {imgIndex + 1} / {images.length}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <div className="text-7xl mb-3">🏨</div>
                    <p className="text-white/40 text-sm">Photos à venir</p>
                  </div>
                )}
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                  {hotel.is_featured && <Badge variant="gold">★ Recommandé</Badge>}
                  {hotel.is_verified && (
                    <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Vérifié
                    </span>
                  )}
                </div>
                <div className="absolute bottom-4 left-4">
                  <StarRating count={hotel.stars ?? 3} />
                </div>
              </div>
            )}

            {/* Title + price */}
            {loading ? (
              <div className="space-y-2">
                <div className="skeleton h-7 w-3/4 rounded-xl" />
                <div className="skeleton h-4 w-1/3 rounded-xl" />
              </div>
            ) : (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-[#1A1A2E] leading-tight">{hotel.title}</h1>
                  <div className="shrink-0 text-right">
                    <p className="text-2xl font-extrabold text-[#C8922A]">
                      {fmt(pricePerNight)} XOF
                    </p>
                    <p className="text-xs text-gray-400">/nuit</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 text-[#C8922A] shrink-0" />
                  <span>{hotel.address}</span>
                </div>
              </div>
            )}

            {/* Quick specs */}
            {loading ? (
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="skeleton h-24 rounded-2xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Star, label: "Étoiles", value: `${hotel.stars ?? 3} ★` },
                  { icon: Users, label: "Capacité", value: "1–6 pers." },
                  { icon: Shield, label: "Statut", value: hotel.is_verified ? "Vérifié" : "En attente" },
                ].map((spec) => {
                  const Icon = spec.icon;
                  return (
                    <div key={spec.label} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                      <Icon className="w-5 h-5 text-[#C8922A] mx-auto mb-2" />
                      <p className="text-base font-bold text-[#1A1A2E]">{spec.value}</p>
                      <p className="text-xs text-gray-400">{spec.label}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Description */}
            {loading ? (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-2">
                <div className="skeleton h-3 w-24 rounded" />
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-5/6 rounded" />
                <div className="skeleton h-4 w-4/5 rounded" />
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-sm font-semibold text-[#1A1A2E] mb-3 uppercase tracking-wide">Description</h2>
                <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {hotel.description || "Description disponible sur demande."}
                </div>
              </div>
            )}

            {/* Amenities */}
            {!loading && hotel.amenities_list && hotel.amenities_list.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-sm font-semibold text-[#1A1A2E] mb-4 uppercase tracking-wide">Équipements & Services</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {hotel.amenities_list.map((a) => {
                    const Icon = AMENITY_ICONS[a] ?? CheckCircle;
                    return (
                      <div key={a} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-7 h-7 rounded-lg bg-[#F5E6C8] flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5 text-[#C8922A]" />
                        </div>
                        {a}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Location */}
            {!loading && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-sm font-semibold text-[#1A1A2E] mb-3 uppercase tracking-wide">Localisation</h2>
                <div className="h-40 bg-[#F0EFE9] rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
                  <div className="text-center text-gray-400">
                    <MapPin className="w-8 h-8 mx-auto mb-1 text-[#C8922A]" />
                    <p className="text-sm font-medium">{hotel.address}</p>
                    <p className="text-xs">{hotel.city}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar — Booking */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sticky top-4">
              {booked ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A2E] mb-1">Réservation confirmée !</h3>
                  <p className="text-sm text-gray-500 mb-1">
                    {nights} nuit{nights > 1 ? "s" : ""} · {fmt(total)} XOF
                  </p>
                  <p className="text-xs text-gray-400 mb-4">
                    Du {new Date(checkin).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })} au{" "}
                    {new Date(checkout).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}
                  </p>
                  <div className="bg-[#F5E6C8] rounded-xl p-3 text-xs text-[#8A6118] mb-4">
                    Vous recevrez une confirmation par email. L'hôtel vous contactera sous 24h.
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setBooked(false)} className="w-full">
                    Modifier la réservation
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-base font-semibold text-[#1A1A2E] mb-1">Réserver</h2>
                  <p className="text-2xl font-extrabold text-[#C8922A] mb-4">
                    {fmt(pricePerNight)} <span className="text-sm font-normal text-gray-400">XOF/nuit</span>
                  </p>

                  <form onSubmit={handleBook} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-gray-500 font-medium block mb-1">Arrivée</label>
                        <input
                          type="date"
                          value={checkin}
                          min={today}
                          onChange={(e) => setCheckin(e.target.value)}
                          required
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 font-medium block mb-1">Départ</label>
                        <input
                          type="date"
                          value={checkout}
                          min={checkin || today}
                          onChange={(e) => setCheckout(e.target.value)}
                          required
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-500 font-medium block mb-1">Voyageurs</label>
                      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setGuests((g) => Math.max(1, g - 1))}
                          className="px-3 py-2.5 text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="flex-1 text-center text-sm font-medium text-[#1A1A2E]">
                          <Users className="w-3.5 h-3.5 inline mr-1 text-[#C8922A]" />
                          {guests} personne{guests > 1 ? "s" : ""}
                        </div>
                        <button
                          type="button"
                          onClick={() => setGuests((g) => Math.min(6, g + 1))}
                          className="px-3 py-2.5 text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-500 font-medium block mb-1">Demandes spéciales</label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Arrivée tardive, chambre vue mer…"
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A] resize-none"
                      />
                    </div>

                    {bookingError && (
                      <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 text-xs text-red-700">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span className="flex-1">{bookingError}</span>
                        <button type="button" onClick={() => setBookingError(null)} className="text-red-400 hover:opacity-70">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {nights > 0 && (
                      <div className="bg-[#F7F2EA] rounded-xl p-3 space-y-1 text-sm">
                        <div className="flex justify-between text-gray-600">
                          <span>{fmt(pricePerNight)} × {nights} nuit{nights > 1 ? "s" : ""}</span>
                          <span>{fmt(pricePerNight * nights)} XOF</span>
                        </div>
                        <div className="flex justify-between font-bold text-[#1A1A2E] border-t border-gray-200 pt-1">
                          <span>Total</span>
                          <span className="text-[#C8922A]">{fmt(total)} XOF</span>
                        </div>
                      </div>
                    )}

                    <Button type="submit" variant="primary" size="md" disabled={booking} className="w-full gap-2">
                      {booking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calendar className="w-4 h-4" />}
                      {booking ? "Réservation en cours…" : "Réserver maintenant"}
                    </Button>
                  </form>

                  <p className="text-xs text-gray-400 text-center mt-3">
                    Aucun frais débité maintenant · Annulation gratuite
                  </p>
                </>
              )}
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h3 className="text-sm font-semibold text-[#1A1A2E] mb-3">Contacter l'hôtel</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Phone className="w-4 h-4" />
                  Appeler
                </Button>
                <Button variant="ghost" size="sm" className="w-full gap-2">
                  <Mail className="w-4 h-4" />
                  Envoyer un message
                </Button>
              </div>
            </div>

            {/* Trust badge */}
            <div className="bg-[#F5E6C8] rounded-2xl p-4 text-center">
              <Shield className="w-6 h-6 text-[#C8922A] mx-auto mb-2" />
              <p className="text-sm font-medium text-[#8A6118]">Hébergement vérifié par Kasafrik</p>
              <p className="text-xs text-[#8A6118]/70 mt-1">Paiement sécurisé · Support 24h/24</p>
            </div>

            <Link href="/hotels">
              <Button variant="ghost" size="sm" className="gap-2 w-full">
                <ArrowLeft className="w-4 h-4" /> Retour aux hôtels
              </Button>
            </Link>
          </div>
        </div>

        {/* Similar hotels */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-6">Hébergements similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similar.filter((h) => h.id !== id).slice(0, 3).map((h) => (
              <Link key={h.id} href={`/hotels/${h.id}`}>
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                  <div className="relative h-36 bg-gradient-to-br from-[#1A1A2E] to-[#16213E] overflow-hidden">
                    {h.images && h.images.length > 0 ? (
                      <Image
                        src={h.images[0].url}
                        alt={h.title}
                        fill
                        unoptimized
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl">🏨</span>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-3">
                      <div className="flex gap-0.5">
                        {Array.from({ length: h.stars ?? 3 }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-[#C8922A] fill-[#C8922A]" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-sm text-[#1A1A2E] group-hover:text-[#C8922A] transition-colors line-clamp-1 mb-1">{h.title}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                      <MapPin className="w-3 h-3 text-[#C8922A]" /> {h.city}
                    </div>
                    <p className="text-sm font-bold text-[#C8922A]">{fmt(h.price_per_night ?? h.price)} XOF <span className="text-xs font-normal text-gray-400">/nuit</span></p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
