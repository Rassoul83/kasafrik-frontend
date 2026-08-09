"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Ticket, QrCode, Calendar, MapPin, Clock,
  Search, CheckCircle, AlertCircle, X,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import { getEvents, getMyTickets } from "@/lib/api";
import { useLanguage } from "@/hooks/useLanguage";
import type { Event, Ticket as TicketType } from "@/types";

const MOCK_EVENTS: Event[] = [
  { id: 1, user_id: 3, title: "Concert Youssou N'Dour — Grand Théâtre", description: "La légende sur scène.", category: "musique", city: "Dakar", venue: "Grand Théâtre National", address: "Av. Lamine Guèye", start_date: "2024-03-15T20:00:00Z", end_date: "2024-03-15T23:00:00Z", is_published: true, is_featured: true, ticket_types: [{ id: 1, event_id: 1, name: "Standard", price: 15000, quantity: 500, sold: 230, is_available: true }, { id: 2, event_id: 1, name: "VIP", price: 45000, quantity: 100, sold: 67, is_available: true }], created_at: "2024-01-10T10:00:00Z", updated_at: "2024-01-10T10:00:00Z" },
  { id: 2, user_id: 3, title: "Forum Immobilier Dakar 2024", description: "", category: "business", city: "Dakar", venue: "King Fahd Palace", address: "Route de l'Aéroport", start_date: "2024-04-05T09:00:00Z", end_date: "2024-04-07T18:00:00Z", is_published: true, is_featured: false, ticket_types: [{ id: 3, event_id: 2, name: "Standard", price: 5000, quantity: 200, sold: 89, is_available: true }, { id: 4, event_id: 2, name: "VIP", price: 25000, quantity: 50, sold: 12, is_available: true }], created_at: "2024-01-12T10:00:00Z", updated_at: "2024-01-12T10:00:00Z" },
  { id: 5, user_id: 6, title: "Sommet Tech Dakar 2024", description: "", category: "business", city: "Dakar", venue: "CESAG", address: "Fann", start_date: "2024-06-10T09:00:00Z", end_date: "2024-06-11T18:00:00Z", is_published: true, is_featured: false, ticket_types: [{ id: 8, event_id: 5, name: "Standard", price: 10000, quantity: 400, sold: 210, is_available: true }, { id: 9, event_id: 5, name: "VIP", price: 35000, quantity: 50, sold: 18, is_available: true }], created_at: "2024-02-01T10:00:00Z", updated_at: "2024-02-01T10:00:00Z" },
  { id: 6, user_id: 7, title: "Afrobeats Dakar Festival", description: "", category: "musique", city: "Dakar", venue: "Stade L.S. Senghor", address: "Stade", start_date: "2024-07-20T18:00:00Z", end_date: "2024-07-20T23:00:00Z", is_published: true, is_featured: true, ticket_types: [{ id: 10, event_id: 6, name: "Standard", price: 12000, quantity: 5000, sold: 2340, is_available: true }, { id: 11, event_id: 6, name: "VIP", price: 50000, quantity: 200, sold: 89, is_available: true }], created_at: "2024-02-10T10:00:00Z", updated_at: "2024-02-10T10:00:00Z" },
  { id: 8, user_id: 9, title: "Finale CAN 2024 — Viewing Party", description: "", category: "sport", city: "Dakar", venue: "Parc de Hann", address: "Hann", start_date: "2024-02-11T20:00:00Z", end_date: "2024-02-11T23:00:00Z", is_published: true, is_featured: false, ticket_types: [{ id: 13, event_id: 8, name: "Entrée", price: 1000, quantity: 2000, sold: 1890, is_available: true }], created_at: "2024-01-20T10:00:00Z", updated_at: "2024-01-20T10:00:00Z" },
];

const MOCK_TICKETS: TicketType[] = [
  { id: 1, user_id: 1, event_id: 1, ticket_type_id: 1, qr_code: "QR-KAS-001-2024", status: "valid", quantity: 2, total_price: 30000, event: MOCK_EVENTS[0], ticket_type: { id: 1, event_id: 1, name: "Standard", price: 15000, quantity: 500, sold: 230, is_available: true }, created_at: "2024-02-01T10:00:00Z", updated_at: "2024-02-01T10:00:00Z" },
  { id: 2, user_id: 1, event_id: 6, ticket_type_id: 10, qr_code: "QR-KAS-002-2024", status: "valid", quantity: 1, total_price: 12000, event: MOCK_EVENTS[3], ticket_type: { id: 10, event_id: 6, name: "Standard", price: 12000, quantity: 5000, sold: 2340, is_available: true }, created_at: "2024-03-01T10:00:00Z", updated_at: "2024-03-01T10:00:00Z" },
];

// BUG FIX: garde contre NaN/Invalid Date
function safeNum(n: unknown): number {
  const v = Number(n);
  return isFinite(v) ? v : 0;
}

function fmt(n: unknown) {
  const v = safeNum(n);
  return new Intl.NumberFormat("fr-FR").format(v);
}

function fmtDate(s: string | undefined | null) {
  if (!s) return "—";
  const d = new Date(s);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

function fmtTime(s: string | undefined | null) {
  if (!s) return "—";
  const d = new Date(s);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

const catColors: Record<string, string> = {
  musique: "#635BFF", business: "#C8922A", culture: "#4A7C59", sport: "#C84B2F", match: "#1E90FF",
};

const catEmoji: Record<string, string> = {
  musique: "🎵", business: "💼", culture: "🎨", sport: "⚽", match: "🏆",
};

function EventRowSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-28 skeleton h-24 sm:h-auto shrink-0" />
        <div className="flex-1 p-5 space-y-3">
          <div className="skeleton h-4 w-3/4 rounded" />
          <div className="skeleton h-3 w-1/2 rounded" />
          <div className="flex gap-2">
            <div className="skeleton h-6 w-20 rounded-lg" />
            <div className="skeleton h-6 w-20 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BilletteriePage() {
  const { t } = useLanguage();
  const CATEGORIES = [
    { id: "all", label: t('tous') },
    { id: "musique", label: t('musique') },
    { id: "business", label: t('business') },
    { id: "culture", label: t('culture') },
    { id: "sport", label: t('sport') },
    { id: "match", label: t('match') },
  ];

  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [loading, setLoading] = useState(false);
  const [myTickets, setMyTickets] = useState<TicketType[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [activeTab, setActiveTab] = useState<"upcoming" | "mytickets">("upcoming");
  const [hasAccount] = useState(false);

  useEffect(() => {
    setLoading(true);
    setApiError(null);
    getEvents({ per_page: 50 })
      .then((r) => {
        const published = r.data.filter((e) => e.is_published);
        if (published.length > 0) setEvents(published);
      })
      .catch(() => {
        setApiError("Impossible de charger les événements. Les données affichées sont des exemples.");
      })
      .finally(() => setLoading(false));

    const token = typeof window !== "undefined" ? localStorage.getItem("kasafrik_token") : null;
    if (token) {
      getMyTickets()
        .then((r) => setMyTickets(r.data))
        .catch(() => setMyTickets(MOCK_TICKETS));
    }
  }, []);

  const filteredEvents = events.filter((e) => {
    if (search && !e.title.toLowerCase().includes(search.toLowerCase()) && !e.city.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== "all" && e.category !== category) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1A1A2E] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Ticket className="w-8 h-8 text-[#C8922A]" />
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">{t('billetterie_titre')}</h1>
          </div>
          <p className="text-gray-400 mb-6">Achetez vos billets QR et accédez à vos événements en toute sécurité</p>

          {/* Tabs */}
          <div className="flex gap-3">
            {(["upcoming", "mytickets"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={[
                  "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all",
                  activeTab === tab ? "bg-[#C8922A] text-white" : "bg-white/10 text-gray-300 hover:bg-white/20",
                ].join(" ")}
              >
                {tab === "upcoming" ? "Événements à venir" : "Mes billets"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category tabs */}
      {activeTab === "upcoming" && (
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={[
                    "px-5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all shrink-0",
                    category === cat.id
                      ? "bg-[#C8922A] text-white"
                      : "text-gray-600 hover:bg-[#F5E6C8] hover:text-[#C8922A]",
                  ].join(" ")}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {apiError && (
          <div className="flex items-start gap-3 bg-[#FFF8E7] border border-[#C8922A]/35 rounded-xl px-4 py-3 text-sm text-[#8A6118] mb-6">
            <AlertCircle className="w-4 h-4 text-[#C8922A] shrink-0 mt-0.5" />
            <span className="flex-1">{apiError}</span>
            <button onClick={() => setApiError(null)} className="text-[#C8922A] hover:opacity-70 transition-opacity">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {activeTab === "upcoming" ? (
          <div className="space-y-6">
            <div className="max-w-lg">
              <Input
                placeholder="Rechercher un événement…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />
            </div>

            <p className="text-sm text-gray-500">
              <strong className="text-[#1A1A2E]">{filteredEvents.length}</strong> événement{filteredEvents.length > 1 ? "s" : ""}
              {category !== "all" && (
                <span className="ml-1 text-[#C8922A] font-medium">
                  · {CATEGORIES.find((c) => c.id === category)?.label}
                </span>
              )}
            </p>

            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => <EventRowSkeleton key={i} />)}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEvents.map((ev) => {
                  const prices = ev.ticket_types.map((t) => safeNum(t.price)).filter((p) => p > 0);
                  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
                  const available = ev.ticket_types.some((t) => safeNum(t.quantity) > safeNum(t.sold));
                  const totalRemaining = ev.ticket_types.reduce(
                    (acc, t) => acc + Math.max(0, safeNum(t.quantity) - safeNum(t.sold)),
                    0
                  );
                  const catColor = catColors[ev.category] ?? "#6B7280";

                  return (
                    <Card key={ev.id} className="p-0 overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="flex flex-col sm:flex-row">
                        {/* Image ou placeholder catégorie */}
                        <div
                          className="relative sm:w-28 h-28 sm:h-auto shrink-0 overflow-hidden"
                          style={{ backgroundColor: `${catColor}18` }}
                        >
                          {ev.image ? (
                            <Image
                              src={ev.image}
                              alt={ev.title}
                              fill
                              unoptimized
                              style={{ objectFit: "cover" }}
                            />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                              <span className="text-3xl">{catEmoji[ev.category] ?? "🎟️"}</span>
                              <p
                                className="text-2xl font-black leading-none"
                                style={{ color: catColor }}
                              >
                                {new Date(ev.start_date).getDate().toString().padStart(2, "0")}
                              </p>
                              <p
                                className="text-[10px] font-bold uppercase tracking-wider"
                                style={{ color: catColor }}
                              >
                                {fmtDate(ev.start_date).split(" ")[2] ?? ""}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 p-4 sm:p-5">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="gray" className="capitalize text-[10px]">{ev.category}</Badge>
                                {ev.is_featured && <Badge variant="gold" className="text-[10px]">Vedette</Badge>}
                              </div>
                              <h3 className="font-bold text-[#1A1A2E] mb-2 leading-tight">{ev.title}</h3>
                              <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-[#C8922A]" />
                                  {ev.venue}, {ev.city}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-[#C8922A]" />
                                  {fmtTime(ev.start_date)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-[#C8922A]" />
                                  {fmtDate(ev.start_date)}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-2 shrink-0">
                              <div className="text-right">
                                <p className="text-xs text-gray-400">À partir de</p>
                                <p className="text-xl font-extrabold text-[#C8922A]">{fmt(minPrice)} XOF</p>
                              </div>
                              {available ? (
                                <div className="text-right">
                                  <p className="text-xs text-green-600 font-medium">{totalRemaining} places</p>
                                  <Link href={`/billetterie/${ev.id}`}>
                                    <Button variant="primary" size="sm" className="gap-1.5">
                                      <Ticket className="w-3.5 h-3.5" />
                                      {t('acheter_billets')}
                                    </Button>
                                  </Link>
                                </div>
                              ) : (
                                <Badge variant="red">Complet</Badge>
                              )}
                            </div>
                          </div>

                          {/* Ticket types preview */}
                          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
                            {ev.ticket_types.map((t) => (
                              <div key={t.id} className="flex items-center gap-1.5 bg-[#F7F2EA] rounded-lg px-2.5 py-1">
                                <Ticket className="w-3 h-3 text-[#C8922A]" />
                                <span className="text-xs font-medium text-gray-700">{t.name}</span>
                                <span className="text-xs text-[#C8922A] font-bold">{fmt(t.price)} XOF</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}

                {filteredEvents.length === 0 && (
                  <div className="text-center py-16 text-gray-400">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-lg font-medium">Aucun événement trouvé</p>
                    <Button variant="outline" size="sm" onClick={() => { setSearch(""); setCategory("all"); }} className="mt-4">
                      Réinitialiser
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-[#1A1A2E]">Mes billets</h2>

            {!hasAccount && myTickets.length === 0 ? (
              <div className="text-center py-16">
                <QrCode className="w-16 h-16 mx-auto mb-4 text-[#C8922A] opacity-50" />
                <h3 className="text-lg font-semibold text-[#1A1A2E] mb-2">Aucun billet</h3>
                <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
                  Connectez-vous pour voir vos billets ou achetez-en depuis la liste des événements.
                </p>
                <div className="flex gap-3 justify-center">
                  <Link href="/login">
                    <Button variant="outline" size="md">Se connecter</Button>
                  </Link>
                  <Button variant="primary" size="md" onClick={() => setActiveTab("upcoming")}>
                    Voir les événements
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {(myTickets.length > 0 ? myTickets : MOCK_TICKETS).map((ticket) => (
                  <div key={ticket.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="bg-[#1A1A2E] p-4">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant={ticket.status === "valid" ? "green" : ticket.status === "used" ? "gold" : "red"}>
                          {ticket.status === "valid" ? "Valide" : ticket.status === "used" ? "Utilisé" : "Annulé"}
                        </Badge>
                        <span className="text-xs text-gray-400">#{ticket.id}</span>
                      </div>
                      <h3 className="font-bold text-white text-sm leading-tight">{ticket.event?.title ?? "Événement"}</h3>
                      <p className="text-xs text-gray-400 mt-1">{ticket.event?.venue}</p>
                    </div>

                    <div className="flex items-center justify-center py-6 border-b border-dashed border-gray-200">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-[#F0EFE9] rounded-xl flex items-center justify-center mx-auto mb-2">
                          <QrCode className="w-10 h-10 text-[#1A1A2E]" />
                        </div>
                        <code className="text-[10px] text-gray-400 font-mono">{ticket.qr_code}</code>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Type</span>
                        <span className="font-medium text-[#1A1A2E]">{ticket.ticket_type?.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Quantité</span>
                        <span className="font-medium text-[#1A1A2E]">{ticket.quantity}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total</span>
                        <span className="font-bold text-[#C8922A]">{fmt(ticket.total_price)} XOF</span>
                      </div>
                    </div>

                    {ticket.status === "valid" && (
                      <div className="px-4 pb-4">
                        <div className="flex items-center gap-2 text-xs text-green-600 bg-[#D6EDE0] rounded-lg px-3 py-2">
                          <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                          Billet valide — présentez le QR à l&apos;entrée
                        </div>
                      </div>
                    )}
                    {ticket.status === "used" && (
                      <div className="px-4 pb-4">
                        <div className="flex items-center gap-2 text-xs text-amber-600 bg-[#F5E6C8] rounded-lg px-3 py-2">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          Billet déjà scanné
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
