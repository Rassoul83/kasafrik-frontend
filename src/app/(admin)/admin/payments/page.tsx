"use client";

import { useEffect, useState } from "react";
import { Search, CreditCard } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { getAdminPayments } from "@/lib/api";
import type { Payment } from "@/types";

const MOCK: Payment[] = [
  { id: 1, user_id: 3, payable_type: "booking", payable_id: 1, amount: 450000, currency: "XOF", method: "wave", status: "completed", transaction_id: "WAVE-2024-001", created_at: "2024-02-01T10:00:00Z", updated_at: "2024-02-01T10:00:00Z" },
  { id: 2, user_id: 4, payable_type: "ticket", payable_id: 2, amount: 45000, currency: "XOF", method: "orange_money", status: "completed", transaction_id: "OM-2024-002", created_at: "2024-02-02T12:00:00Z", updated_at: "2024-02-02T12:00:00Z" },
  { id: 3, user_id: 5, payable_type: "subscription", payable_id: 3, amount: 25000, currency: "XOF", method: "stripe", status: "pending", created_at: "2024-02-03T09:00:00Z", updated_at: "2024-02-03T09:00:00Z" },
  { id: 4, user_id: 6, payable_type: "booking", payable_id: 4, amount: 120000, currency: "XOF", method: "wave", status: "completed", transaction_id: "WAVE-2024-004", created_at: "2024-02-04T16:00:00Z", updated_at: "2024-02-04T16:00:00Z" },
  { id: 5, user_id: 7, payable_type: "ticket", payable_id: 5, amount: 9000, currency: "XOF", method: "orange_money", status: "completed", transaction_id: "OM-2024-005", created_at: "2024-02-05T14:00:00Z", updated_at: "2024-02-05T14:00:00Z" },
  { id: 6, user_id: 8, payable_type: "booking", payable_id: 6, amount: 200000, currency: "XOF", method: "paypal", status: "failed", created_at: "2024-02-06T11:00:00Z", updated_at: "2024-02-06T11:00:00Z" },
  { id: 7, user_id: 3, payable_type: "subscription", payable_id: 7, amount: 50000, currency: "XOF", method: "stripe", status: "completed", transaction_id: "STR-2024-007", created_at: "2024-02-07T10:00:00Z", updated_at: "2024-02-07T10:00:00Z" },
  { id: 8, user_id: 4, payable_type: "booking", payable_id: 8, amount: 350000, currency: "XOF", method: "wave", status: "refunded", transaction_id: "WAVE-2024-008", created_at: "2024-02-08T15:00:00Z", updated_at: "2024-02-08T15:00:00Z" },
];

function fmt(n: unknown): string {
  const num = Number(n);
  if (!isFinite(num)) return "0";
  return new Intl.NumberFormat("fr-FR").format(num);
}

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

const methodLabels: Record<string, string> = {
  wave: "Wave", orange_money: "Orange Money", stripe: "Stripe", paypal: "PayPal",
};
const typeLabels: Record<string, string> = {
  booking: "Réservation", ticket: "Billet", subscription: "Abonnement",
};

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(MOCK);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("");

  useEffect(() => {
    getAdminPayments({ per_page: 50 }).then((r) => {
      const mapped = r.data?.map((p: any) => ({
        ...p,
        amount: (parseFloat(String(p.amount ?? p.total ?? p.price ?? 0)) || 0) * 1000,
      })) ?? [];
      setPayments(mapped);
    }).catch(() => {});
  }, []);

  const filtered = payments.filter((p) => {
    const matchSearch = !search ||
      (p.transaction_id ?? "").toLowerCase().includes(search.toLowerCase()) ||
      p.payable_type.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || p.status === statusFilter;
    const matchMethod = !methodFilter || p.method === methodFilter;
    return matchSearch && matchStatus && matchMethod;
  });

  const totalRevenue = filtered.filter((p) => p.status === "completed").reduce((acc, p) => {
    const amount = parseFloat(String(p.amount ?? 0));
    return acc + (isNaN(amount) ? 0 : amount);
  }, 0);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Paiements</h1>
        <p className="text-sm text-gray-500">
          {filtered.length} transaction{filtered.length > 1 ? "s" : ""} · {fmt(totalRevenue)} XOF complétés
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Complétés", count: payments.filter((p) => p.status === "completed").length, color: "#4A7C59", bg: "#D6EDE0" },
          { label: "En attente", count: payments.filter((p) => p.status === "pending").length, color: "#C8922A", bg: "#F5E6C8" },
          { label: "Échoués", count: payments.filter((p) => p.status === "failed").length, color: "#C84B2F", bg: "#FAE8E3" },
          { label: "Remboursés", count: payments.filter((p) => p.status === "refunded").length, color: "#635BFF", bg: "#F0EFFF" },
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
              placeholder="Rechercher par ID transaction…"
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
            <option value="completed">Complété</option>
            <option value="pending">En attente</option>
            <option value="failed">Échoué</option>
            <option value="refunded">Remboursé</option>
          </select>
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white"
          >
            <option value="">Toutes les méthodes</option>
            <option value="wave">Wave</option>
            <option value="orange_money">Orange Money</option>
            <option value="stripe">Stripe</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["#", "Type", "Transaction ID", "Montant", "Méthode", "Statut", "Date"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">
                    <CreditCard className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    Aucun paiement trouvé
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400">#{p.id}</td>
                    <td className="px-4 py-3 capitalize text-gray-700">
                      {typeLabels[p.payable_type] ?? p.payable_type}
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-xs font-mono text-[#1A1A2E]">
                        {p.transaction_id ?? "—"}
                      </code>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#1A1A2E] whitespace-nowrap">
                      {fmt(p.amount)} {p.currency}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {methodLabels[p.method]}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          p.status === "completed" ? "green" :
                          p.status === "pending" ? "gold" :
                          p.status === "failed" ? "red" : "purple"
                        }
                      >
                        {p.status === "completed" ? "Complété" :
                         p.status === "pending" ? "En attente" :
                         p.status === "failed" ? "Échoué" : "Remboursé"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                      {fmtDate(p.created_at)}
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
