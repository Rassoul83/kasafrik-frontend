"use client";

import { useEffect, useState } from "react";
import { Search, Calendar, ChevronLeft, ChevronRight, AlertCircle, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EventCard from "@/components/cards/EventCard";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { getEvents } from "@/lib/api";
import type { Event } from "@/types";

const MOCK: Event[] = [
  { id: 1, user_id: 3, title: "Concert Youssou N'Dour — Grand Théâtre", description: "La légende de la musique sénégalaise sur scène.", category: "musique", city: "Dakar", venue: "Grand Théâtre National", address: "Av. Lamine Guèye", start_date: "2024-03-15T20:00:00Z", end_date: "2024-03-15T23:00:00Z", is_published: true, is_featured: true, ticket_types: [{ id: 1, event_id: 1, name: "Standard", price: 15000, quantity: 500, sold: 230, is_available: true }, { id: 2, event_id: 1, name: "VIP", price: 45000, quantity: 100, sold: 67, is_available: true }], created_at: "2024-01-10T10:00:00Z", updated_at: "2024-01-10T10:00:00Z" },
  { id: 2, user_id: 3, title: "Forum Immobilier Dakar 2024", description: "Le plus grand forum immobilier d'Afrique de l'Ouest.", category: "business", city: "Dakar", venue: "King Fahd Palace", address: "Route de l'Aéroport", start_date: "2024-04-05T09:00:00Z", end_date: "2024-04-07T18:00:00Z", is_published: true, is_featured: false, ticket_types: [{ id: 3, event_id: 2, name: "Standard", price: 5000, quantity: 200, sold: 89, is_available: true }, { id: 4, event_id: 2, name: "VIP", price: 25000, quantity: 50, sold: 12, is_available: true }], created_at: "2024-01-12T10:00:00Z", updated_at: "2024-01-12T10:00:00Z" },
  { id: 3, user_id: 4, title: "Nuit Techno Afrique — Club Keur Gui", description: "La plus grande nuit électronique d'Afrique.", category: "musique", city: "Dakar", venue: "Club Keur Gui", address: "Almadies", start_date: "2024-02-24T22:00:00Z", end_date: "2024-02-25T06:00:00Z", is_published: true, is_featured: true, ticket_types: [{ id: 5, event_id: 3, name: "Standard", price: 8000, quantity: 300, sold: 145, is_available: true }, { id: 6, event_id: 3, name: "VIP", price: 20000, quantity: 80, sold: 34, is_available: true }], created_at: "2024-01-14T10:00:00Z", updated_at: "2024-01-14T10:00:00Z" },
  { id: 4, user_id: 5, title: "Festival Cinéma Africain — FESPACO", description: "La biennale du cinéma africain.", category: "culture", city: "Abidjan", venue: "Palais des Congrès", address: "Plateau", start_date: "2024-03-28T14:00:00Z", end_date: "2024-04-06T22:00:00Z", is_published: true, is_featured: false, ticket_types: [{ id: 7, event_id: 4, name: "Standard", price: 3000, quantity: 1000, sold: 567, is_available: true }], created_at: "2024-01-15T10:00:00Z", updated_at: "2024-01-15T10:00:00Z" },
  { id: 5, user_id: 6, title: "Sommet Tech Dakar 2024", description: "Innovation numérique et startups africaines.", category: "business", city: "Dakar", venue: "CESAG", address: "Fann", start_date: "2024-06-10T09:00:00Z", end_date: "2024-06-11T18:00:00Z", is_published: true, is_featured: false, ticket_types: [{ id: 8, event_id: 5, name: "Standard", price: 10000, quantity: 400, sold: 210, is_available: true }, { id: 9, event_id: 5, name: "VIP", price: 35000, quantity: 50, sold: 18, is_available: true }], created_at: "2024-02-01T10:00:00Z", updated_at: "2024-02-01T10:00:00Z" },
  { id: 6, user_id: 7, title: "Afrobeats Dakar Festival", description: "La fête de l'Afrobeats avec les meilleurs artistes.", category: "musique", city: "Dakar", venue: "Stade Léopold Sédar Senghor", address: "Stade L.S. Senghor", start_date: "2024-07-20T18:00:00Z", end_date: "2024-07-20T23:00:00Z", is_published: true, is_featured: true, ticket_types: [{ id: 10, event_id: 6, name: "Standard", price: 12000, quantity: 5000, sold: 2340, is_available: true }, { id: 11, event_id: 6, name: "VIP", price: 50000, quantity: 200, sold: 89, is_available: true }], created_at: "2024-02-10T10:00:00Z", updated_at: "2024-02-10T10:00:00Z" },
  { id: 7, user_id: 8, title: "Exposition Art Contemporain Africain", description: "30 artistes africains contemporains réunis.", category: "culture", city: "Dakar", venue: "Village des Arts", address: "Corniche Ouest", start_date: "2024-05-01T10:00:00Z", end_date: "2024-05-31T18:00:00Z", is_published: true, is_featured: false, ticket_types: [{ id: 12, event_id: 7, name: "Entrée", price: 2000, quantity: 500, sold: 123, is_available: true }], created_at: "2024-02-15T10:00:00Z", updated_at: "2024-02-15T10:00:00Z" },
  { id: 8, user_id: 9, title: "Finale CAN 2024 — Viewing Party", description: "Grande soirée de projection de la finale de la CAN.", category: "sport", city: "Dakar", venue: "Parc de Hann", address: "Hann", start_date: "2024-02-11T20:00:00Z", end_date: "2024-02-11T23:00:00Z", is_published: true, is_featured: false, ticket_types: [{ id: 13, event_id: 8, name: "Entrée", price: 1000, quantity: 2000, sold: 1890, is_available: true }], created_at: "2024-01-20T10:00:00Z", updated_at: "2024-01-20T10:00:00Z" },
  { id: 9, user_id: 10, title: "Match PSG vs OM — Diffusion Live", description: "Le classico français en projection géante au cœur de Dakar.", category: "match", city: "Dakar", venue: "Espace Lamantin", address: "Plateau", start_date: "2024-08-04T20:45:00Z", end_date: "2024-08-04T23:00:00Z", is_published: true, is_featured: true, ticket_types: [{ id: 14, event_id: 9, name: "Entrée", price: 2000, quantity: 500, sold: 312, is_available: true }, { id: 15, event_id: 9, name: "VIP", price: 8000, quantity: 50, sold: 21, is_available: true }], created_at: "2024-03-01T10:00:00Z", updated_at: "2024-03-01T10:00:00Z" },
];

const CATEGORIES = ["Tous", "musique", "business", "culture", "sport", "match"];
const CITIES = ["Toutes les villes", "Dakar", "Abidjan", "Saint-Louis", "Thiès"];
const PER_PAGE = 8;

export default function EvenementsPage() {
  const [events, setEvents] = useState<Event[]>(MOCK);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [city, setCity] = useState("Toutes les villes");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setApiError(null);
    getEvents({ per_page: 50 })
      .then((r) => setEvents(r.data.filter((e) => e.is_published)))
      .catch(() => {
        setApiError("Impossible de charger les événements depuis le serveur. Les données ci-dessous sont des exemples.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = events.filter((e) => {
    if (search && !e.title.toLowerCase().includes(search.toLowerCase()) && !e.city.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== "Tous" && e.category !== category) return false;
    if (city !== "Toutes les villes" && e.city !== city) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const featured = events.filter((e) => e.is_featured);

  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1A1A2E] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
            Événements en <span className="text-[#C8922A]">Afrique</span>
          </h1>
          <p className="text-gray-400 mb-6">Concerts, forums, festivals, expositions — ne ratez rien</p>

          <div className="bg-white rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                placeholder="Titre, ville, lieu…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                icon={<Search className="w-4 h-4" />}
              />
            </div>
            <select
              value={city}
              onChange={(e) => { setCity(e.target.value); setPage(1); }}
              className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white"
            >
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Category tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setPage(1); }}
                className={[
                  "px-5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all shrink-0",
                  category === cat
                    ? "bg-[#C8922A] text-white"
                    : "text-gray-600 hover:bg-[#F5E6C8] hover:text-[#C8922A]",
                ].join(" ")}
              >
                {cat === "Tous" ? "Tous" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured events */}
      {featured.length > 0 && category === "Tous" && !search && (
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-6">
              ★ Événements vedettes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.slice(0, 4).map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All events */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Erreur API */}
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
            <strong className="text-[#1A1A2E]">{filtered.length}</strong> événement{filtered.length > 1 ? "s" : ""}
          </p>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-lg font-medium">Aucun événement trouvé</p>
              <Button variant="outline" size="md" onClick={() => { setSearch(""); setCategory("Tous"); setCity("Toutes les villes"); }} className="mt-4">
                Réinitialiser
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginated.map((e) => <EventCard key={e.id} event={e} />)}
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
