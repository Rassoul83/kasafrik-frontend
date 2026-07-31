"use client";

import { useEffect, useState } from "react";
import {
  Search,
  CheckCircle,
  Star,
  Trash2,
  Building2,
  Filter,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import {
  getAdminProperties,
  verifyProperty,
  featureProperty,
  deletePropertyAdmin,
} from "@/lib/api";
import type { Property } from "@/types";

const MOCK: Property[] = [
  { id: 1, user_id: 2, title: "Villa moderne 4ch. — Almadies", description: "Magnifique villa", type: "sale", category: "villa", price: 85000000, currency: "XOF", city: "Dakar", address: "Almadies", bedrooms: 4, bathrooms: 3, surface: 320, is_featured: true, is_verified: true, status: "active", images: [], created_at: "2024-01-15T10:00:00Z", updated_at: "2024-01-15T10:00:00Z" },
  { id: 2, user_id: 2, title: "Appartement F3 meublé — Plateau", description: "Bel appart", type: "rent", category: "apartment", price: 450000, currency: "XOF", city: "Dakar", address: "Plateau", bedrooms: 3, bathrooms: 2, surface: 95, is_featured: false, is_verified: true, status: "active", images: [], created_at: "2024-01-16T10:00:00Z", updated_at: "2024-01-16T10:00:00Z" },
  { id: 3, user_id: 3, title: "Studio étudiant — Mermoz", description: "Studio idéal", type: "rent", category: "studio", price: 120000, currency: "XOF", city: "Dakar", address: "Mermoz", bedrooms: 1, bathrooms: 1, surface: 35, is_featured: false, is_verified: false, status: "pending", images: [], created_at: "2024-01-17T10:00:00Z", updated_at: "2024-01-17T10:00:00Z" },
  { id: 4, user_id: 2, title: "Villa duplex 5ch. piscine — Ngor", description: "Villa luxe", type: "sale", category: "villa", price: 120000000, currency: "XOF", city: "Dakar", address: "Ngor", bedrooms: 5, bathrooms: 4, surface: 450, is_featured: true, is_verified: true, status: "active", images: [], created_at: "2024-01-18T10:00:00Z", updated_at: "2024-01-18T10:00:00Z" },
  { id: 5, user_id: 4, title: "Terrain 800m² — Thiès", description: "Terrain constructible", type: "sale", category: "land", price: 25000000, currency: "XOF", city: "Thiès", address: "Centre", is_featured: false, is_verified: false, status: "pending", images: [], created_at: "2024-02-01T10:00:00Z", updated_at: "2024-02-01T10:00:00Z" },
  { id: 6, user_id: 5, title: "Bureau 150m² — Plateau", description: "Bureau prestige", type: "rent", category: "office", price: 2000000, currency: "XOF", city: "Dakar", address: "Plateau", surface: 150, is_featured: false, is_verified: true, status: "active", images: [], created_at: "2024-02-05T10:00:00Z", updated_at: "2024-02-05T10:00:00Z" },
];

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n);
}

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

const typeLabels: Record<string, string> = { sale: "Vente", rent: "Location", hotel: "Hôtel" };
const catLabels: Record<string, string> = { apartment: "Appartement", house: "Maison", villa: "Villa", studio: "Studio", office: "Bureau", land: "Terrain", hotel_room: "Chambre" };

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(MOCK);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Property | null>(null);
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    getAdminProperties({ per_page: 50 })
      .then((r) => setProperties(r.data))
      .catch(() => {});
  }, []);

  const filtered = properties.filter((p) => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.city.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || p.status === statusFilter || (statusFilter === "verified" && p.is_verified) || (statusFilter === "unverified" && !p.is_verified);
    const matchType = !typeFilter || p.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  async function handleVerify(p: Property) {
    setLoading((l) => ({ ...l, [`v${p.id}`]: true }));
    try {
      await verifyProperty(p.id);
      setProperties((prev) => prev.map((x) => x.id === p.id ? { ...x, is_verified: true, status: "active" } : x));
    } catch { /* silently ignore */ } finally {
      setLoading((l) => ({ ...l, [`v${p.id}`]: false }));
    }
  }

  async function handleFeature(p: Property) {
    setLoading((l) => ({ ...l, [`f${p.id}`]: true }));
    try {
      await featureProperty(p.id, !p.is_featured);
      setProperties((prev) => prev.map((x) => x.id === p.id ? { ...x, is_featured: !x.is_featured } : x));
    } catch { /* silently ignore */ } finally {
      setLoading((l) => ({ ...l, [`f${p.id}`]: false }));
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deletePropertyAdmin(deleteTarget.id);
      setProperties((prev) => prev.filter((x) => x.id !== deleteTarget.id));
    } catch { /* silently ignore */ } finally {
      setDeleteTarget(null);
    }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Propriétés</h1>
          <p className="text-sm text-gray-500">{filtered.length} annonce{filtered.length > 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Filters */}
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white"
          >
            <option value="">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="pending">En attente</option>
            <option value="inactive">Inactif</option>
            <option value="verified">Vérifié</option>
            <option value="unverified">Non vérifié</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white"
          >
            <option value="">Tous les types</option>
            <option value="sale">Vente</option>
            <option value="rent">Location</option>
            <option value="hotel">Hôtel</option>
          </select>
          {(search || statusFilter || typeFilter) && (
            <Button variant="ghost" size="md" onClick={() => { setSearch(""); setStatusFilter(""); setTypeFilter(""); }}>
              <Filter className="w-4 h-4" /> Réinitialiser
            </Button>
          )}
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["#", "Titre", "Type", "Prix", "Ville", "Statut", "Vérifié", "Featured", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-gray-400">
                    <Building2 className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    Aucune propriété trouvée
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400">#{p.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#1A1A2E] max-w-xs truncate">{p.title}</p>
                      <p className="text-xs text-gray-400">{catLabels[p.category] ?? p.category}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={p.type === "sale" ? "gold" : p.type === "rent" ? "blue" : "green"}>
                        {typeLabels[p.type]}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-medium whitespace-nowrap">
                      {fmt(p.price)} {p.currency}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{p.city}</td>
                    <td className="px-4 py-3">
                      <Badge variant={p.status === "active" ? "green" : p.status === "pending" ? "gold" : "gray"}>
                        {p.status === "active" ? "Actif" : p.status === "pending" ? "En attente" : "Inactif"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {p.is_verified ? (
                        <span className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle className="w-3.5 h-3.5" /> Oui
                        </span>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          loading={loading[`v${p.id}`]}
                          onClick={() => handleVerify(p)}
                          className="text-xs"
                        >
                          Vérifier
                        </Button>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleFeature(p)}
                        disabled={loading[`f${p.id}`]}
                        className={`p-1.5 rounded-lg transition-colors ${p.is_featured ? "text-[#C8922A] bg-[#F5E6C8]" : "text-gray-400 hover:text-[#C8922A] hover:bg-[#F5E6C8]"}`}
                        title={p.is_featured ? "Retirer featured" : "Mettre en featured"}
                      >
                        <Star className="w-4 h-4" fill={p.is_featured ? "currentColor" : "none"} />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setDeleteTarget(p)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#C84B2F] hover:bg-[#FAE8E3] transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Delete confirmation modal */}
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
          <Button
            variant="primary"
            className="bg-[#C84B2F] hover:bg-[#A03820]"
            onClick={handleDelete}
          >
            Supprimer
          </Button>
        </div>
      </Modal>
    </div>
  );
}
