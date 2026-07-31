"use client";

import { useEffect, useState } from "react";
import { Search, Star } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { getAdminSubscriptions } from "@/lib/api";
import type { Subscription } from "@/types";

type SubWithUser = Subscription & { user?: { name: string; email: string } };

const MOCK: SubWithUser[] = [
  { id: 1, user_id: 2, plan: "pro", status: "active", starts_at: "2024-01-01T00:00:00Z", ends_at: "2025-01-01T00:00:00Z", created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z", user: { name: "Moussa Diallo", email: "moussa.diallo@gmail.com" } },
  { id: 2, user_id: 4, plan: "starter", status: "active", starts_at: "2024-02-01T00:00:00Z", ends_at: "2024-08-01T00:00:00Z", created_at: "2024-02-01T00:00:00Z", updated_at: "2024-02-01T00:00:00Z", user: { name: "Amadou Bâ", email: "amadou.ba@yahoo.fr" } },
  { id: 3, user_id: 5, plan: "enterprise", status: "active", starts_at: "2024-01-15T00:00:00Z", ends_at: "2025-01-15T00:00:00Z", created_at: "2024-01-15T00:00:00Z", updated_at: "2024-01-15T00:00:00Z", user: { name: "Aïssatou Diop", email: "aissatou.diop@gmail.com" } },
  { id: 4, user_id: 6, plan: "pro", status: "cancelled", starts_at: "2023-06-01T00:00:00Z", ends_at: "2024-06-01T00:00:00Z", created_at: "2023-06-01T00:00:00Z", updated_at: "2024-01-20T00:00:00Z", user: { name: "Ibrahima Fall", email: "ibrahima.fall@hotmail.com" } },
  { id: 5, user_id: 7, plan: "starter", status: "expired", starts_at: "2023-09-01T00:00:00Z", ends_at: "2024-03-01T00:00:00Z", created_at: "2023-09-01T00:00:00Z", updated_at: "2024-03-01T00:00:00Z", user: { name: "Khady Niang", email: "khady.niang@gmail.com" } },
  { id: 6, user_id: 8, plan: "free", status: "active", starts_at: "2024-03-01T00:00:00Z", ends_at: "2099-01-01T00:00:00Z", created_at: "2024-03-01T00:00:00Z", updated_at: "2024-03-01T00:00:00Z", user: { name: "Seydou Traoré", email: "seydou.traore@gmail.com" } },
];

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

const planLabels: Record<string, string> = {
  free: "Gratuit", starter: "Starter", pro: "Pro", enterprise: "Enterprise",
};
const planVariants: Record<string, "gray" | "blue" | "gold" | "purple"> = {
  free: "gray", starter: "blue", pro: "gold", enterprise: "purple",
};

export default function AdminSubscriptionsPage() {
  const [subs, setSubs] = useState<SubWithUser[]>(MOCK);
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    getAdminSubscriptions({ per_page: 50 }).then((r) => setSubs(r.data as SubWithUser[])).catch(() => {});
  }, []);

  const filtered = subs.filter((s) => {
    const matchSearch = !search ||
      (s.user?.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (s.user?.email ?? "").toLowerCase().includes(search.toLowerCase());
    const matchPlan = !planFilter || s.plan === planFilter;
    const matchStatus = !statusFilter || s.status === statusFilter;
    return matchSearch && matchPlan && matchStatus;
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Abonnements</h1>
        <p className="text-sm text-gray-500">{filtered.length} abonnement{filtered.length > 1 ? "s" : ""}</p>
      </div>

      {/* Stats par plan */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {(["free", "starter", "pro", "enterprise"] as const).map((plan) => {
          const count = subs.filter((s) => s.plan === plan && s.status === "active").length;
          return (
            <Card key={plan} className="p-4 text-center">
              <p className="text-2xl font-bold text-[#1A1A2E]">{count}</p>
              <p className="text-xs text-gray-500 mt-0.5">{planLabels[plan]}</p>
            </Card>
          );
        })}
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Rechercher par nom, email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white"
          >
            <option value="">Tous les plans</option>
            <option value="free">Gratuit</option>
            <option value="starter">Starter</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white"
          >
            <option value="">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="cancelled">Annulé</option>
            <option value="expired">Expiré</option>
          </select>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["#", "Utilisateur", "Plan", "Début", "Fin", "Statut"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    <Star className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    Aucun abonnement trouvé
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400">#{s.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#1A1A2E]">{s.user?.name ?? `User #${s.user_id}`}</p>
                      <p className="text-xs text-gray-400">{s.user?.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={planVariants[s.plan] ?? "gray"}>
                        {planLabels[s.plan]}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{fmtDate(s.starts_at)}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {s.plan === "free" ? "Illimité" : fmtDate(s.ends_at)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={s.status === "active" ? "green" : s.status === "cancelled" ? "red" : "gray"}
                      >
                        {s.status === "active" ? "Actif" : s.status === "cancelled" ? "Annulé" : "Expiré"}
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
