"use client";

import { useEffect, useState } from "react";
import { Search, CheckCircle, Star, Trash2, Home, AlertCircle } from "lucide-react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { getAdminProperties, verifyProperty, featureProperty, deletePropertyAdmin } from "@/lib/api";
import type { Property } from "@/types";

const MOCK: Property[] = [
  { id: 1, user_id: 3, title: "Villa 5 chambres — Almadies", description: "Magnifique villa moderne avec piscine", type: "sale", category: "villa", price: 85000000, currency: "XOF", city: "Dakar", address: "Almadies", is_featured: true, is_verified: true, status: "active", images: [], created_at: "2024-01-10T10:00:00Z", updated_at: "2024-01-10T10:00:00Z" },
  { id: 2, user_id: 4, title: "Terrain de Football — Medina", description: "[Football] Terrain 7x7 éclairé avec vestiaires", type: "rent", category: "land", price: 25000, currency: "XOF", city: "Dakar", address: "Médina", is_featured: false, is_verified: false, status: "pending", images: [], created_at: "2024-01-12T10:00:00Z", updated_at: "2024-01-12T10:00:00Z" },
  { id: 3, user_id: 5, title: "Appartement 3 pièces — Plateau", description: "Bel appartement lumineux vue sur mer", type: "rent", category: "apartment", price: 300000, currency: "XOF", city: "Dakar", address: "Plateau", is_featured: false, is_verified: true, status: "active", images: [], created_at: "2024-01-14T10:00:00Z", updated_at: "2024-01-14T10:00:00Z" },
  { id: 4, user_id: 6, title: "Terrain Multisport — Kaloum", description: "[Multisport] Complexe polyvalent couvert", type: "rent", category: "land", price: 40000, currency: "XOF", city: "Conakry", address: "Kaloum", is_featured: false, is_verified: false, status: "pending", images: [], created_at: "2024-01-15T10:00:00Z", updated_at: "2024-01-15T10:00:00Z" },
  { id: 5, user_id: 7, title: "Studio meublé — Liberté 6", description: "Studio tout équipé, clim, parking", type: "rent", category: "studio", price: 200000, currency: "XOF", city: "Dakar", address: "Liberté 6", is_featured: false, is_verified: false, status: "pending", images: [], created_at: "2024-01-16T10:00:00Z", updated_at: "2024-01-16T10:00:00Z" },
  { id: 6, user_id: 8, title: "Terrain de Tennis — Almadies", description: "[Tennis] Court en dur éclairé, 2 courts disponibles", type: "rent", category: "land", price: 30000, currency: "XOF", city: "Dakar", address: "Almadies", is_featured: false, is_verified: false, status: "pending", images: [], created_at: "2024-01-17T10:00:00Z", updated_at: "2024-01-17T10:00:00Z" },
  { id: 7, user_id: 9, title: "Bureau 80m² — Zone Industrielle", description: "Bureau moderne open space avec salle de réunion", type: "rent", category: "office", price: 500000, currency: "XOF", city: "Dakar", address: "Zone Industrielle", is_featured: false, is_verified: true, status: "inactive", images: [], created_at: "2024-01-18T10:00:00Z", updated_at: "2024-01-18T10:00:00Z" },
  { id: 8, user_id: 10, title: "Terrain de Basketball — Ratoma", description: "[Basketball] Salle couverte avec gradins", type: "rent", category: "land", price: 35000, currency: "XOF", city: "Conakry", address: "Ratoma", is_featured: false, is_verified: false, status: "pending", images: [], created_at: "2024-01-19T10:00:00Z", updated_at: "2024-01-19T10:00:00Z" },
];

type TabFilter = "all" | "pending" | "active" | "terrain";

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n);
}

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

const TYPE_LABELS: Record<string, string> = {
  sale: "Vente", rent: "Location", hotel: "Hôtel",
};

const CAT_LABELS: Record<string, string> = {
  villa: "Villa", apartment: "Appartement", house: "Maison", studio: "Studio",
  office: "Bureau", land: "Terrain", hotel_room: "Chambre",
};

function isTerrain(p: Property) {
  return p.category === "land" && p.type === "rent";
}

export default function AdminAnnoncesPage() {
  const [properties, setProperties] = useState<Property[]>(MOCK);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<TabFilter>("all");
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  useEffect(() => {
    getAdminProperties({ per_page: 50 }).then((r) => setProperties(r.data)).catch(() => {});
  }, []);

  const filtered = properties.filter((p) => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase());
    const matchTab =
      tab === "all" ||
      (tab === "pending" && p.status === "pending") ||
      (tab === "active" && p.status === "active") ||
      (tab === "terrain" && isTerrain(p));
    return matchSearch && matchTab;
  });

  const pendingTerrains = properties.filter((p) => isTerrain(p) && !p.is_verified);

  async function handleVerify(id: number) {
    setActionLoading(id);
    try {
      const res = await verifyProperty(id);
      setProperties((prev) => prev.map((p) => p.id === id ? res.data : p));
    } catch {
      setProperties((prev) =>
        prev.map((p) => p.id === id ? { ...p, is_verified: true, status: "active" as const } : p)
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function handleFeature(id: number, featured: boolean) {
    setActionLoading(id);
    try {
      const res = await featureProperty(id, featured);
      setProperties((prev) => prev.map((p) => p.id === id ? res.data : p));
    } catch {
      setProperties((prev) => prev.map((p) => p.id === id ? { ...p, is_featured: featured } : p));
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Supprimer cette annonce définitivement ?")) return;
    setActionLoading(id);
    try {
      await deletePropertyAdmin(id);
    } catch {
      // proceed anyway on mock
    } finally {
      setProperties((prev) => prev.filter((p) => p.id !== id));
      setActionLoading(null);
    }
  }

  const tabs: { id: TabFilter; label: string; count: number }[] = [
    { id: "all", label: "Toutes", count: properties.length },
    { id: "pending", label: "En attente", count: properties.filter((p) => p.status === "pending").length },
    { id: "active", label: "Actives", count: properties.filter((p) => p.status === "active").length },
    { id: "terrain", label: "Terrains", count: properties.filter(isTerrain).length },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Annonces</h1>
        <p className="text-sm text-gray-500">
          {filtered.length} annonce{filtered.length > 1 ? "s" : ""} · validation et modération
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Actives", count: properties.filter((p) => p.status === "active").length, color: "#4A7C59", bg: "#D6EDE0" },
          { label: "En attente", count: properties.filter((p) => p.status === "pending").length, color: "#C8922A", bg: "#F5E6C8" },
          { label: "Terrains", count: properties.filter(isTerrain).length, color: "#635BFF", bg: "#F0EFFF" },
          { label: "Mises en avant", count: properties.filter((p) => p.is_featured).length, color: "#C8922A", bg: "#F5E6C8" },
        ].map((s) => (
          <Card key={s.label} className="p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Tabs + Search */}
      <Card className="p-4 space-y-4">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={[
                "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                tab === t.id
                  ? "bg-[#C8922A] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200",
              ].join(" ")}
            >
              {t.label}
              <span className={[
                "text-xs px-1.5 py-0.5 rounded-full",
                tab === t.id ? "bg-white/20 text-white" : "bg-gray-200 text-gray-500",
              ].join(" ")}>
                {t.count}
              </span>
            </button>
          ))}
        </div>
        <Input
          placeholder="Rechercher par titre ou ville…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="w-4 h-4" />}
        />
      </Card>

      {/* Terrain validation alert */}
      {tab === "terrain" && pendingTerrains.length > 0 && (
        <div className="flex items-start gap-3 bg-[#F5E6C8] border border-[#C8922A]/30 rounded-xl p-4">
          <AlertCircle className="w-5 h-5 text-[#8A6118] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-[#8A6118]">
              {pendingTerrains.length} terrain{pendingTerrains.length > 1 ? "s" : ""} en attente de validation
            </p>
            <p className="text-xs text-[#8A6118] mt-0.5">
              Vérifiez les informations (capacité, tarif horaire, équipements) avant de valider.
            </p>
          </div>
        </div>
      )}

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["#", "Annonce", "Type", "Prix", "Ville", "Statut", "Date", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400">
                    <Home className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    Aucune annonce trouvée
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr
                    key={p.id}
                    className={[
                      "hover:bg-gray-50 transition-colors",
                      isTerrain(p) ? "border-l-2 border-l-[#635BFF]" : "",
                    ].join(" ")}
                  >
                    <td className="px-4 py-3 text-gray-400">#{p.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-start gap-1.5 min-w-0">
                        <div className="min-w-0">
                          <p className="font-medium text-[#1A1A2E] truncate max-w-[200px]">{p.title}</p>
                          <p className="text-xs text-gray-400">{CAT_LABELS[p.category] ?? p.category}</p>
                        </div>
                        {p.is_featured && (
                          <Star className="w-3.5 h-3.5 text-[#C8922A] shrink-0 mt-0.5 fill-current" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">
                      {TYPE_LABELS[p.type] ?? p.type}
                    </td>
                    <td className="px-4 py-3 font-medium whitespace-nowrap text-[#1A1A2E]">
                      {fmt(p.price)} {p.currency}
                      {isTerrain(p) && <span className="text-xs text-gray-400">/h</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{p.city}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          p.status === "active" ? "green" :
                          p.status === "pending" ? "gold" : "red"
                        }
                      >
                        {p.status === "active" ? "Active" : p.status === "pending" ? "En attente" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                      {fmtDate(p.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {!p.is_verified && (
                          <button
                            onClick={() => handleVerify(p.id)}
                            disabled={actionLoading === p.id}
                            title="Valider l'annonce"
                            className="p-1.5 rounded-lg text-[#4A7C59] hover:bg-[#D6EDE0] transition-colors disabled:opacity-50"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleFeature(p.id, !p.is_featured)}
                          disabled={actionLoading === p.id}
                          title={p.is_featured ? "Retirer la mise en avant" : "Mettre en avant"}
                          className={[
                            "p-1.5 rounded-lg transition-colors disabled:opacity-50",
                            p.is_featured
                              ? "text-[#C8922A] bg-[#F5E6C8]"
                              : "text-gray-400 hover:bg-gray-100",
                          ].join(" ")}
                        >
                          <Star className="w-4 h-4" />
                        </button>
                        <Link
                          href={`/immobilier/${p.id}`}
                          target="_blank"
                          title="Voir l'annonce"
                          className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
                        >
                          <Home className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={actionLoading === p.id}
                          title="Supprimer"
                          className="p-1.5 rounded-lg text-[#C84B2F] hover:bg-[#FAE8E3] transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
