"use client";

import { useEffect, useState } from "react";
import { Search, Trash2, Calendar, Eye, EyeOff } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { getAdminEvents, publishEvent, deleteEventAdmin } from "@/lib/api";
import type { Event } from "@/types";

const MOCK: Event[] = [
  { id: 1, user_id: 3, title: "Concert Youssou N'Dour — Grand Théâtre", description: "Légende de la musique sénégalaise", category: "musique", city: "Dakar", venue: "Grand Théâtre National", address: "Av. Lamine Guèye", start_date: "2024-03-15T20:00:00Z", end_date: "2024-03-15T23:00:00Z", is_published: true, is_featured: true, ticket_types: [{ id: 1, event_id: 1, name: "Standard", price: 15000, quantity: 500, sold: 230, is_available: true }, { id: 2, event_id: 1, name: "VIP", price: 45000, quantity: 100, sold: 67, is_available: true }], created_at: "2024-01-10T10:00:00Z", updated_at: "2024-01-10T10:00:00Z" },
  { id: 2, user_id: 3, title: "Forum Immobilier Dakar 2024", description: "Le plus grand forum immobilier d'AOF", category: "business", city: "Dakar", venue: "King Fahd Palace", address: "Route de l'Aéroport", start_date: "2024-04-05T09:00:00Z", end_date: "2024-04-07T18:00:00Z", is_published: true, is_featured: false, ticket_types: [{ id: 3, event_id: 2, name: "Standard", price: 5000, quantity: 200, sold: 89, is_available: true }], created_at: "2024-01-12T10:00:00Z", updated_at: "2024-01-12T10:00:00Z" },
  { id: 3, user_id: 4, title: "Nuit Techno Afrique — Club Keur Gui", description: "La plus grande nuit électronique", category: "musique", city: "Dakar", venue: "Club Keur Gui", address: "Almadies", start_date: "2024-02-24T22:00:00Z", end_date: "2024-02-25T06:00:00Z", is_published: false, is_featured: false, ticket_types: [], created_at: "2024-01-14T10:00:00Z", updated_at: "2024-01-14T10:00:00Z" },
  { id: 4, user_id: 5, title: "Festival Cinéma Africain", description: "La biennale du cinéma africain", category: "culture", city: "Abidjan", venue: "Palais des Congrès", address: "Plateau", start_date: "2024-03-28T14:00:00Z", end_date: "2024-04-06T22:00:00Z", is_published: true, is_featured: false, ticket_types: [{ id: 7, event_id: 4, name: "Standard", price: 3000, quantity: 1000, sold: 567, is_available: true }], created_at: "2024-01-15T10:00:00Z", updated_at: "2024-01-15T10:00:00Z" },
  { id: 5, user_id: 6, title: "Sommet Tech Dakar 2024", description: "Innovation et numérique en Afrique", category: "business", city: "Dakar", venue: "CESAG", address: "Fann", start_date: "2024-06-10T09:00:00Z", end_date: "2024-06-11T18:00:00Z", is_published: false, is_featured: false, ticket_types: [], created_at: "2024-02-01T10:00:00Z", updated_at: "2024-02-01T10:00:00Z" },
  { id: 6, user_id: 9, title: "Finale CAN 2024 — Viewing Party", description: "Projection de la finale de la CAN", category: "sport", city: "Dakar", venue: "Parc de Hann", address: "Hann", start_date: "2024-02-11T20:00:00Z", end_date: "2024-02-11T23:00:00Z", is_published: true, is_featured: false, ticket_types: [{ id: 13, event_id: 6, name: "Entrée", price: 1000, quantity: 2000, sold: 1890, is_available: true }], created_at: "2024-01-20T10:00:00Z", updated_at: "2024-01-20T10:00:00Z" },
  { id: 7, user_id: 10, title: "Match PSG vs OM — Diffusion Live", description: "Le classico français en projection géante", category: "match", city: "Dakar", venue: "Espace Lamantin", address: "Plateau", start_date: "2024-08-04T20:45:00Z", end_date: "2024-08-04T23:00:00Z", is_published: true, is_featured: true, ticket_types: [{ id: 14, event_id: 7, name: "Entrée", price: 2000, quantity: 500, sold: 312, is_available: true }], created_at: "2024-03-01T10:00:00Z", updated_at: "2024-03-01T10:00:00Z" },
];

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

const catVariant: Record<string, "gold" | "green" | "blue" | "purple" | "red" | "gray"> = {
  musique: "purple",
  business: "blue",
  culture: "green",
  sport: "red",
  match: "gold",
  default: "gray",
};

const CATEGORIES_LIST = ["musique", "business", "culture", "sport", "match"];

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>(MOCK);
  const [search, setSearch] = useState("");
  const [publishedFilter, setPublishedFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Event | null>(null);
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    getAdminEvents({ per_page: 50 }).then((r) => setEvents(r.data)).catch(() => {});
  }, []);

  const filtered = events.filter((e) => {
    const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.city.toLowerCase().includes(search.toLowerCase());
    const matchPublished = !publishedFilter || (publishedFilter === "published" && e.is_published) || (publishedFilter === "draft" && !e.is_published);
    const matchCat = !categoryFilter || e.category === categoryFilter;
    return matchSearch && matchPublished && matchCat;
  });


  async function handlePublish(e: Event) {
    setLoading((l) => ({ ...l, [e.id]: true }));
    try {
      await publishEvent(e.id, !e.is_published);
      setEvents((prev) => prev.map((x) => x.id === e.id ? { ...x, is_published: !x.is_published } : x));
    } catch { /* silently ignore */ } finally {
      setLoading((l) => ({ ...l, [e.id]: false }));
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteEventAdmin(deleteTarget.id);
      setEvents((prev) => prev.filter((x) => x.id !== deleteTarget.id));
    } catch { /* silently ignore */ } finally {
      setDeleteTarget(null);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Événements</h1>
        <p className="text-sm text-gray-500">{filtered.length} événement{filtered.length > 1 ? "s" : ""}</p>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Rechercher par titre, ville…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          <select
            value={publishedFilter}
            onChange={(e) => setPublishedFilter(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white"
          >
            <option value="">Tous les statuts</option>
            <option value="published">Publié</option>
            <option value="draft">Brouillon</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white"
          >
            <option value="">Toutes catégories</option>
            {CATEGORIES_LIST.map((c) => (
              <option key={c} value={c} className="capitalize">{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["#", "Titre", "Catégorie", "Ville", "Date", "Billets", "Statut", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400">
                    <Calendar className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    Aucun événement trouvé
                  </td>
                </tr>
              ) : (
                filtered.map((ev) => {
                  const totalSold = ev.ticket_types.reduce((acc, t) => acc + t.sold, 0);
                  const totalQty = ev.ticket_types.reduce((acc, t) => acc + t.quantity, 0);
                  return (
                    <tr key={ev.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-400">#{ev.id}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-[#1A1A2E] max-w-xs truncate">{ev.title}</p>
                        <p className="text-xs text-gray-400 truncate">{ev.venue}</p>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={catVariant[ev.category] ?? "gray"} className="capitalize">
                          {ev.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{ev.city}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                        {fmtDate(ev.start_date)}
                      </td>
                      <td className="px-4 py-3 text-xs">
                        {totalQty > 0 ? (
                          <span>{totalSold} / {totalQty}</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={ev.is_published ? "green" : "gray"}>
                          {ev.is_published ? "Publié" : "Brouillon"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handlePublish(ev)}
                            disabled={loading[ev.id]}
                            title={ev.is_published ? "Dépublier" : "Publier"}
                            className={`p-1.5 rounded-lg transition-colors ${ev.is_published ? "text-gray-400 hover:text-[#C84B2F] hover:bg-[#FAE8E3]" : "text-gray-400 hover:text-[#4A7C59] hover:bg-[#D6EDE0]"}`}
                          >
                            {ev.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => setDeleteTarget(ev)}
                            title="Supprimer"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-[#C84B2F] hover:bg-[#FAE8E3] transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Confirmer la suppression"
        size="sm"
      >
        <p className="text-sm text-gray-600 mb-5">
          Supprimer <strong>{deleteTarget?.title}</strong> ? Cette action est irréversible.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Annuler</Button>
          <Button variant="primary" className="bg-[#C84B2F] hover:bg-[#A03820]" onClick={handleDelete}>
            Supprimer
          </Button>
        </div>
      </Modal>
    </div>
  );
}
