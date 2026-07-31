"use client";

import { useEffect, useState } from "react";
import { Search, Zap } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { getAdminBoosts } from "@/lib/api";
import type { Boost } from "@/types";

const MOCK: Boost[] = [
  { id: 1, property_id: 1, user_id: 2, level: "featured", starts_at: "2024-05-01T00:00:00Z", ends_at: "2024-06-01T00:00:00Z", amount: 25000, status: "active", property: { id: 1, user_id: 2, title: "Villa moderne 4ch. — Almadies", description: "", type: "sale", category: "villa", price: 85000000, currency: "XOF", city: "Dakar", address: "Almadies", is_featured: true, is_verified: true, status: "active", images: [], created_at: "", updated_at: "" }, user: { id: 2, name: "Moussa Diallo", email: "moussa.diallo@gmail.com", role: "owner", is_verified: true, is_banned: false, created_at: "", updated_at: "" }, created_at: "2024-05-01T00:00:00Z", updated_at: "2024-05-01T00:00:00Z" },
  { id: 2, property_id: 4, user_id: 2, level: "premium", starts_at: "2024-04-15T00:00:00Z", ends_at: "2024-07-15T00:00:00Z", amount: 75000, status: "active", property: { id: 4, user_id: 2, title: "Villa duplex 5ch. piscine — Ngor", description: "", type: "sale", category: "villa", price: 120000000, currency: "XOF", city: "Dakar", address: "Ngor", is_featured: true, is_verified: true, status: "active", images: [], created_at: "", updated_at: "" }, user: { id: 2, name: "Moussa Diallo", email: "moussa.diallo@gmail.com", role: "owner", is_verified: true, is_banned: false, created_at: "", updated_at: "" }, created_at: "2024-04-15T00:00:00Z", updated_at: "2024-04-15T00:00:00Z" },
  { id: 3, property_id: 2, user_id: 4, level: "standard", starts_at: "2024-03-01T00:00:00Z", ends_at: "2024-04-01T00:00:00Z", amount: 10000, status: "expired", property: { id: 2, user_id: 4, title: "Appartement F3 meublé — Plateau", description: "", type: "rent", category: "apartment", price: 450000, currency: "XOF", city: "Dakar", address: "Plateau", is_featured: false, is_verified: true, status: "active", images: [], created_at: "", updated_at: "" }, user: { id: 4, name: "Amadou Bâ", email: "amadou.ba@yahoo.fr", role: "owner", is_verified: true, is_banned: false, created_at: "", updated_at: "" }, created_at: "2024-03-01T00:00:00Z", updated_at: "2024-03-01T00:00:00Z" },
  { id: 4, property_id: 6, user_id: 5, level: "featured", starts_at: "2024-05-10T00:00:00Z", ends_at: "2024-06-10T00:00:00Z", amount: 25000, status: "pending", property: { id: 6, user_id: 5, title: "Bureau 150m² — Plateau", description: "", type: "rent", category: "office", price: 2000000, currency: "XOF", city: "Dakar", address: "Plateau", is_featured: false, is_verified: true, status: "active", images: [], created_at: "", updated_at: "" }, user: { id: 5, name: "Aïssatou Diop", email: "aissatou.diop@gmail.com", role: "owner", is_verified: false, is_banned: false, created_at: "", updated_at: "" }, created_at: "2024-05-10T00:00:00Z", updated_at: "2024-05-10T00:00:00Z" },
];

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n);
}

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

const levelLabels: Record<string, string> = {
  standard: "Standard", featured: "Featured", premium: "Premium",
};
const levelVariants: Record<string, "gray" | "blue" | "gold"> = {
  standard: "gray", featured: "blue", premium: "gold",
};

export default function AdminBoostsPage() {
  const [boosts, setBoosts] = useState<Boost[]>(MOCK);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  useEffect(() => {
    getAdminBoosts({ per_page: 50 }).then((r) => setBoosts(r.data)).catch(() => {});
  }, []);

  const filtered = boosts.filter((b) => {
    const matchSearch = !search || (b.property?.title ?? "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || b.status === statusFilter;
    const matchLevel = !levelFilter || b.level === levelFilter;
    return matchSearch && matchStatus && matchLevel;
  });

  const totalRevenue = boosts.filter((b) => b.status !== "pending").reduce((acc, b) => acc + b.amount, 0);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Boosts</h1>
        <p className="text-sm text-gray-500">
          {filtered.length} boost{filtered.length > 1 ? "s" : ""} · {fmt(totalRevenue)} XOF encaissés
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Actifs", count: boosts.filter((b) => b.status === "active").length, color: "#4A7C59", bg: "#D6EDE0" },
          { label: "En attente", count: boosts.filter((b) => b.status === "pending").length, color: "#C8922A", bg: "#F5E6C8" },
          { label: "Expirés", count: boosts.filter((b) => b.status === "expired").length, color: "#6B7280", bg: "#F3F4F6" },
        ].map((s) => (
          <Card key={s.label} className="p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Rechercher par propriété…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white"
          >
            <option value="">Tous les niveaux</option>
            <option value="standard">Standard</option>
            <option value="featured">Featured</option>
            <option value="premium">Premium</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white"
          >
            <option value="">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="pending">En attente</option>
            <option value="expired">Expiré</option>
          </select>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["#", "Propriété", "Niveau", "Montant", "Début", "Fin", "Statut"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">
                    <Zap className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    Aucun boost trouvé
                  </td>
                </tr>
              ) : (
                filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400">#{b.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#1A1A2E] max-w-xs truncate">
                        {b.property?.title ?? `Propriété #${b.property_id}`}
                      </p>
                      <p className="text-xs text-gray-400">{b.user?.name}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={levelVariants[b.level] ?? "gray"}>
                        {levelLabels[b.level]}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-semibold whitespace-nowrap">
                      {fmt(b.amount)} XOF
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{fmtDate(b.starts_at)}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{fmtDate(b.ends_at)}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={b.status === "active" ? "green" : b.status === "pending" ? "gold" : "gray"}
                      >
                        {b.status === "active" ? "Actif" : b.status === "pending" ? "En attente" : "Expiré"}
                      </Badge>
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
