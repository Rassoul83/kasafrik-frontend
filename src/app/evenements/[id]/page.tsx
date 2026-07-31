"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Clock, Calendar, Users, Ticket, ArrowLeft,
  CheckCircle, CreditCard, Minus, Plus, AlertCircle, X,
  Loader2,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EventCard from "@/components/cards/EventCard";
import { getEvent, getEvents, initiatePayment } from "@/lib/api";
import type { Event } from "@/types";

// ── Données de secours (fallback si API indisponible) ────────────────────────

const MOCK_EVENTS: Record<number, Event> = {
  1: {
    id: 1, user_id: 3,
    title: "Concert Youssou N'Dour — Grand Théâtre",
    description: "Une soirée inoubliable avec la légende de la musique sénégalaise et mondiale. Youssou N'Dour vous transporte dans un voyage musical exceptionnel mêlant mbalax traditionnel, afropop et sonorités mondiales.\n\nCet événement unique réunira les plus grands fans du chanteur dans un décor féérique au Grand Théâtre National de Dakar.\n\nNe manquez pas cette occasion rare de voir la star sur scène dans sa ville natale !",
    category: "musique", city: "Dakar", venue: "Grand Théâtre National",
    address: "Avenue du Président Lamine Guèye, Dakar",
    start_date: "2024-03-15T20:00:00Z", end_date: "2024-03-15T23:00:00Z",
    is_published: true, is_featured: true,
    ticket_types: [
      { id: 1, event_id: 1, name: "Standard", price: 15000, quantity: 500, sold: 230, is_available: true },
      { id: 2, event_id: 1, name: "VIP", price: 45000, quantity: 100, sold: 67, is_available: true },
      { id: 3, event_id: 1, name: "VVIP Golden", price: 100000, quantity: 20, sold: 18, is_available: true },
    ],
    created_at: "2024-01-10T10:00:00Z", updated_at: "2024-01-10T10:00:00Z",
  },
  2: {
    id: 2, user_id: 3,
    title: "Forum Immobilier Dakar 2024",
    description: "Le plus grand forum immobilier d'Afrique de l'Ouest réunit investisseurs, promoteurs, architectes et acteurs du secteur pour 3 jours de conférences, networking et exposition.\n\nAu programme : tables rondes, keynotes d'experts, exposition de projets immobiliers, sessions de matchmaking investisseurs-porteurs de projets.\n\nUne opportunité unique de se connecter avec l'écosystème immobilier africain.",
    category: "business", city: "Dakar", venue: "King Fahd Palace",
    address: "Route de l'Aéroport, Dakar",
    start_date: "2024-04-05T09:00:00Z", end_date: "2024-04-07T18:00:00Z",
    is_published: true, is_featured: false,
    ticket_types: [
      { id: 3, event_id: 2, name: "Standard", price: 5000, quantity: 200, sold: 89, is_available: true },
      { id: 4, event_id: 2, name: "VIP", price: 25000, quantity: 50, sold: 12, is_available: true },
    ],
    created_at: "2024-01-12T10:00:00Z", updated_at: "2024-01-12T10:00:00Z",
  },
};

const FALLBACK_EVENT: Event = {
  id: 0, user_id: 1, title: "Événement Dakar", description: "Un événement exceptionnel à Dakar.",
  category: "musique", city: "Dakar", venue: "À confirmer", address: "Dakar",
  start_date: new Date().toISOString(), end_date: new Date().toISOString(),
  is_published: true, is_featured: false,
  ticket_types: [{ id: 1, event_id: 0, name: "Standard", price: 10000, quantity: 200, sold: 50, is_available: true }],
  created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
};

const SIMILAR_FALLBACK: Event[] = [
  { id: 3, user_id: 4, title: "Nuit Techno Afrique — Club Keur Gui", description: "", category: "musique", city: "Dakar", venue: "Club Keur Gui", address: "Almadies", start_date: "2024-02-24T22:00:00Z", end_date: "2024-02-25T06:00:00Z", is_published: true, is_featured: true, ticket_types: [{ id: 5, event_id: 3, name: "Standard", price: 8000, quantity: 300, sold: 145, is_available: true }], created_at: "2024-01-14T10:00:00Z", updated_at: "2024-01-14T10:00:00Z" },
  { id: 6, user_id: 7, title: "Afrobeats Dakar Festival", description: "", category: "musique", city: "Dakar", venue: "Stade L.S. Senghor", address: "Stade", start_date: "2024-07-20T18:00:00Z", end_date: "2024-07-20T23:00:00Z", is_published: true, is_featured: true, ticket_types: [{ id: 10, event_id: 6, name: "Standard", price: 12000, quantity: 5000, sold: 2340, is_available: true }], created_at: "2024-02-10T10:00:00Z", updated_at: "2024-02-10T10:00:00Z" },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
function fmtTime(s: string) {
  return new Date(s).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}
function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n);
}

const PAYMENT_METHODS = [
  { id: "wave",         label: "Wave",          color: "#1E90FF" },
  { id: "orange_money", label: "Orange Money",   color: "#FF6600" },
  { id: "stripe",       label: "Carte bancaire", color: "#635BFF" },
];

// ── Skeleton banner ──────────────────────────────────────────────────────────

function BannerSkeleton() {
  return (
    <div className="h-64 md:h-80 bg-[#1A1A2E] flex items-end">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
        <div className="skeleton-dark rounded-full mb-3" style={{ height: 24, width: 100 }} />
        <div className="skeleton-dark rounded-lg" style={{ height: 32, width: "60%" }} />
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function EventDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const [event, setEvent] = useState<Event>(MOCK_EVENTS[id] ?? FALLBACK_EVENT);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [similar, setSimilar] = useState<Event[]>(SIMILAR_FALLBACK);

  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [paymentMethod, setPaymentMethod] = useState("wave");
  const [buying, setBuying] = useState(false);
  const [bought, setBought] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoadingEvent(true);
    setFetchError(null);
    let fetchedCategory = "";
    getEvent(id)
      .then((r) => {
        setEvent(r.data);
        fetchedCategory = r.data.category;
        return getEvents({ per_page: 6, category: fetchedCategory });
      })
      .then((r) => {
        const others = r.data.filter((e) => e.id !== id);
        if (others.length > 0) setSimilar(others);
      })
      .catch(() => {
        setFetchError("Impossible de charger les données depuis le serveur. Les informations affichées peuvent ne pas être à jour.");
        setEvent(MOCK_EVENTS[id] ?? FALLBACK_EVENT);
      })
      .finally(() => setLoadingEvent(false));
  }, [id]);

  function setQty(ticketId: number, delta: number, max: number) {
    setQuantities((q) => {
      const cur = q[ticketId] ?? 0;
      const next = Math.min(max, Math.max(0, cur + delta));
      return { ...q, [ticketId]: next };
    });
  }

  const totalAmount = event.ticket_types.reduce((acc, t) => acc + (quantities[t.id] ?? 0) * t.price, 0);
  const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0);

  async function handleBuy() {
    if (totalTickets === 0) return;
    setBuying(true);
    setPayError(null);

    const items = event.ticket_types
      .filter((t) => (quantities[t.id] ?? 0) > 0)
      .map((t) => ({ ticket_type_id: t.id, quantity: quantities[t.id] ?? 0 }));

    try {
      const res = await initiatePayment({
        event_id: event.id,
        items,
        payment_method: paymentMethod,
        amount: totalAmount,
      });

      if (res.data?.payment_url) {
        window.location.href = res.data.payment_url;
      } else {
        setBought(true);
      }
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        ?? "Une erreur est survenue. Veuillez réessayer.";
      setPayError(msg);
    } finally {
      setBuying(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <Navbar />

      {/* ── Bannière avec cover image ─────────────────────────────────────── */}
      {loadingEvent ? (
        <BannerSkeleton />
      ) : (
        <div className="relative h-64 md:h-80 flex items-end overflow-hidden bg-[#1A1A2E]">
          {/* Cover image si disponible */}
          {event.image ? (
            <Image
              src={event.image}
              alt={event.title}
              fill
              unoptimized
              style={{ objectFit: "cover", opacity: 0.45 }}
              priority
            />
          ) : (
            <div className="absolute inset-0 opacity-[0.06] flex items-center justify-center text-[200px] select-none">
              🎵
            </div>
          )}

          {/* Dégradé bas pour lisibilité du titre */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/40 to-transparent" />

          {/* Contenu */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="gold" className="capitalize">{event.category}</Badge>
              {event.is_featured && <Badge variant="gold">★ Vedette</Badge>}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight max-w-3xl">
              {event.title}
            </h1>
          </div>
        </div>
      )}

      {/* ── Alerte si API indisponible ────────────────────────────────────── */}
      {fetchError && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="flex items-start gap-3 bg-[#FFF8E7] border border-[#C8922A]/35 rounded-xl px-4 py-3 text-sm text-[#8A6118]">
            <AlertCircle className="w-4 h-4 text-[#C8922A] shrink-0 mt-0.5" />
            <span className="flex-1">{fetchError}</span>
            <button onClick={() => setFetchError(null)} className="text-[#C8922A] hover:opacity-70 transition-opacity shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Contenu principal ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Colonne principale ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Infos rapides */}
            {loadingEvent ? (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="skeleton w-5 h-5 rounded-lg shrink-0" />
                      <div className="flex-1 space-y-1">
                        <div className="skeleton h-3 w-16 rounded" />
                        <div className="skeleton h-4 w-full rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-[#C8922A] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Date</p>
                      <p className="text-sm font-medium text-[#1A1A2E] capitalize">{fmtDate(event.start_date)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#C8922A] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Heure</p>
                      <p className="text-sm font-medium text-[#1A1A2E]">
                        {fmtTime(event.start_date)} — {fmtTime(event.end_date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#C8922A] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Lieu</p>
                      <p className="text-sm font-medium text-[#1A1A2E]">{event.venue}</p>
                      <p className="text-xs text-gray-400">{event.city}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            {loadingEvent ? (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-2">
                <div className="skeleton h-3 w-20 rounded" />
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-5/6 rounded" />
                <div className="skeleton h-4 w-4/5 rounded" />
                <div className="skeleton h-4 w-full rounded" />
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-sm font-semibold text-[#1A1A2E] mb-3 uppercase tracking-wide">À propos</h2>
                <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {event.description || "Aucune description disponible."}
                </div>
              </div>
            )}

            {/* Types de billets — info */}
            {loadingEvent ? (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
                <div className="skeleton h-3 w-28 rounded" />
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="skeleton h-20 rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-sm font-semibold text-[#1A1A2E] mb-4 uppercase tracking-wide">Types de billets</h2>
                <div className="space-y-3">
                  {event.ticket_types.map((t) => {
                    const remaining = t.quantity - t.sold;
                    const pct = Math.round((t.sold / t.quantity) * 100);
                    return (
                      <div key={t.id} className="border border-gray-100 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold text-[#1A1A2E]">{t.name}</p>
                            <p className="text-lg font-bold text-[#C8922A]">{fmt(t.price)} XOF</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={remaining < 20 ? "red" : remaining < 50 ? "gold" : "green"}>
                              {remaining === 0 ? "Complet" : `${remaining} restants`}
                            </Badge>
                          </div>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#C8922A] rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <Users className="w-3 h-3" /> {t.sold} vendus / {t.quantity}
                          </p>
                          <p className="text-xs text-gray-400">{pct}% rempli</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar achat ── */}
          <div>
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sticky top-4">
              {bought ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-[#D6EDE0] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-[#4A7C59]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">Commande confirmée !</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Vos billets QR ont été envoyés par email. Retrouvez-les dans votre espace.
                  </p>
                  <Link href="/billetterie">
                    <Button variant="outline" size="md" className="w-full">Mes billets</Button>
                  </Link>
                </div>
              ) : (
                <>
                  <h2 className="text-base font-semibold text-[#1A1A2E] mb-4 flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-[#C8922A]" />
                    Acheter des billets
                  </h2>

                  {/* Sélecteur quantités */}
                  <div className="space-y-3 mb-5">
                    {event.ticket_types.map((t) => {
                      const remaining = t.quantity - t.sold;
                      const qty = quantities[t.id] ?? 0;
                      return (
                        <div key={t.id} className="border border-gray-100 rounded-xl p-3">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <p className="text-sm font-medium text-[#1A1A2E]">{t.name}</p>
                              <p className="text-sm font-bold text-[#C8922A]">{fmt(t.price)} XOF</p>
                            </div>
                            {remaining === 0 ? (
                              <Badge variant="red">Complet</Badge>
                            ) : (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setQty(t.id, -1, remaining)}
                                  disabled={qty === 0}
                                  className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 transition-colors"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-6 text-center text-sm font-medium">{qty}</span>
                                <button
                                  onClick={() => setQty(t.id, 1, remaining)}
                                  disabled={qty >= Math.min(remaining, 10)}
                                  className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                          {qty > 0 && (
                            <p className="text-xs text-right text-[#C8922A] font-semibold mt-1">
                              = {fmt(qty * t.price)} XOF
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Récapitulatif & paiement */}
                  {totalTickets > 0 && (
                    <>
                      <div className="border-t border-gray-100 pt-4 mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">
                            {totalTickets} billet{totalTickets > 1 ? "s" : ""}
                          </span>
                          <span className="font-bold text-[#1A1A2E]">{fmt(totalAmount)} XOF</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Mode de paiement</p>
                        <div className="space-y-2">
                          {PAYMENT_METHODS.map((pm) => (
                            <label
                              key={pm.id}
                              className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                              <input
                                type="radio"
                                name="payment"
                                value={pm.id}
                                checked={paymentMethod === pm.id}
                                onChange={() => setPaymentMethod(pm.id)}
                                className="accent-[#C8922A]"
                              />
                              <span className="text-sm font-medium" style={{ color: pm.color }}>
                                {pm.label}
                              </span>
                              <CreditCard className="w-4 h-4 ml-auto text-gray-300" />
                            </label>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {totalTickets === 0 && (
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-4 bg-gray-50 rounded-xl p-3">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      Sélectionnez au moins un billet
                    </div>
                  )}

                  {/* Erreur paiement */}
                  {payError && (
                    <div className="flex items-start gap-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl p-3 mb-3">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span className="flex-1">{payError}</span>
                      <button onClick={() => setPayError(null)} className="text-red-400 hover:opacity-70">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <Button
                    variant="primary"
                    size="md"
                    className="w-full gap-2"
                    disabled={totalTickets === 0 || buying}
                    onClick={handleBuy}
                  >
                    {buying ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Traitement en cours…
                      </>
                    ) : (
                      <>
                        <Ticket className="w-4 h-4" />
                        {totalTickets === 0 ? "Choisir des billets" : `Payer ${fmt(totalAmount)} XOF`}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-400 text-center mt-3">
                    Billets QR envoyés par email immédiatement
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Événements similaires */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-6">Événements similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similar.filter((e) => e.id !== id).slice(0, 4).map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <Link href="/evenements">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Retour aux événements
          </Button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
