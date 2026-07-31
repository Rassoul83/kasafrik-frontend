"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Wallet, Ticket, BarChart3, ArrowUpRight, Search } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { getAdminTickets, getAdminPayments } from "@/lib/api";
import type { Ticket as TicketType, Payment } from "@/types";

const MOCK_TICKETS: TicketType[] = [
  { id: 1, user_id: 3, event_id: 1, ticket_type_id: 1, qr_code: "QR-KAS-001-2024", status: "valid", quantity: 2, total_price: 30000, event: { id: 1, user_id: 3, title: "Concert Youssou N'Dour", description: "", category: "musique", city: "Dakar", venue: "Grand Théâtre", address: "", start_date: "2024-03-15T20:00:00Z", end_date: "2024-03-15T23:00:00Z", is_published: true, is_featured: true, ticket_types: [], created_at: "2024-01-10T10:00:00Z", updated_at: "2024-01-10T10:00:00Z" }, ticket_type: { id: 1, event_id: 1, name: "Standard", price: 15000, quantity: 500, sold: 230, is_available: true }, created_at: "2024-03-15T20:00:00Z", updated_at: "2024-03-15T20:00:00Z" },
  { id: 2, user_id: 4, event_id: 1, ticket_type_id: 2, qr_code: "QR-KAS-002-2024", status: "valid", quantity: 1, total_price: 45000, event: { id: 1, user_id: 3, title: "Concert Youssou N'Dour", description: "", category: "musique", city: "Dakar", venue: "Grand Théâtre", address: "", start_date: "2024-03-15T20:00:00Z", end_date: "2024-03-15T23:00:00Z", is_published: true, is_featured: true, ticket_types: [], created_at: "2024-01-10T10:00:00Z", updated_at: "2024-01-10T10:00:00Z" }, ticket_type: { id: 2, event_id: 1, name: "VIP", price: 45000, quantity: 100, sold: 67, is_available: true }, created_at: "2024-03-15T21:00:00Z", updated_at: "2024-03-15T21:00:00Z" },
  { id: 3, user_id: 5, event_id: 2, ticket_type_id: 3, qr_code: "QR-KAS-003-2024", status: "used", quantity: 1, total_price: 5000, event: { id: 2, user_id: 3, title: "Forum Immobilier Dakar", description: "", category: "business", city: "Dakar", venue: "King Fahd Palace", address: "", start_date: "2024-04-05T09:00:00Z", end_date: "2024-04-07T18:00:00Z", is_published: true, is_featured: false, ticket_types: [], created_at: "2024-01-12T10:00:00Z", updated_at: "2024-01-12T10:00:00Z" }, ticket_type: { id: 3, event_id: 2, name: "Standard", price: 5000, quantity: 200, sold: 89, is_available: true }, created_at: "2024-03-16T10:00:00Z", updated_at: "2024-03-16T10:00:00Z" },
  { id: 4, user_id: 6, event_id: 2, ticket_type_id: 4, qr_code: "QR-KAS-004-2024", status: "cancelled", quantity: 2, total_price: 50000, event: { id: 2, user_id: 3, title: "Forum Immobilier Dakar", description: "", category: "business", city: "Dakar", venue: "King Fahd Palace", address: "", start_date: "2024-04-05T09:00:00Z", end_date: "2024-04-07T18:00:00Z", is_published: true, is_featured: false, ticket_types: [], created_at: "2024-01-12T10:00:00Z", updated_at: "2024-01-12T10:00:00Z" }, ticket_type: { id: 4, event_id: 2, name: "VIP", price: 25000, quantity: 50, sold: 12, is_available: true }, created_at: "2024-03-16T14:00:00Z", updated_at: "2024-03-16T14:00:00Z" },
  { id: 5, user_id: 7, event_id: 4, ticket_type_id: 7, qr_code: "QR-KAS-005-2024", status: "valid", quantity: 3, total_price: 9000, event: { id: 4, user_id: 5, title: "Festival Cinéma Africain", description: "", category: "culture", city: "Abidjan", venue: "Palais des Congrès", address: "", start_date: "2024-03-28T14:00:00Z", end_date: "2024-04-06T22:00:00Z", is_published: true, is_featured: false, ticket_types: [], created_at: "2024-01-15T10:00:00Z", updated_at: "2024-01-15T10:00:00Z" }, ticket_type: { id: 7, event_id: 4, name: "Standard", price: 3000, quantity: 1000, sold: 567, is_available: true }, created_at: "2024-03-17T09:00:00Z", updated_at: "2024-03-17T09:00:00Z" },
  { id: 6, user_id: 8, event_id: 1, ticket_type_id: 1, qr_code: "QR-KAS-006-2024", status: "valid", quantity: 4, total_price: 60000, event: { id: 1, user_id: 3, title: "Concert Youssou N'Dour", description: "", category: "musique", city: "Dakar", venue: "Grand Théâtre", address: "", start_date: "2024-03-15T20:00:00Z", end_date: "2024-03-15T23:00:00Z", is_published: true, is_featured: true, ticket_types: [], created_at: "2024-01-10T10:00:00Z", updated_at: "2024-01-10T10:00:00Z" }, ticket_type: { id: 1, event_id: 1, name: "Standard", price: 15000, quantity: 500, sold: 230, is_available: true }, created_at: "2024-03-18T11:00:00Z", updated_at: "2024-03-18T11:00:00Z" },
];

const MOCK_PAYMENTS: Payment[] = [
  { id: 1, user_id: 3, payable_type: "ticket", payable_id: 1, amount: 30000, currency: "XOF", method: "wave", status: "completed", transaction_id: "WAVE-TKT-001", created_at: "2024-03-15T20:00:00Z", updated_at: "2024-03-15T20:00:00Z" },
  { id: 2, user_id: 4, payable_type: "ticket", payable_id: 2, amount: 45000, currency: "XOF", method: "orange_money", status: "completed", transaction_id: "OM-TKT-002", created_at: "2024-03-15T21:00:00Z", updated_at: "2024-03-15T21:00:00Z" },
  { id: 3, user_id: 5, payable_type: "ticket", payable_id: 3, amount: 5000, currency: "XOF", method: "wave", status: "completed", transaction_id: "WAVE-TKT-003", created_at: "2024-03-16T10:00:00Z", updated_at: "2024-03-16T10:00:00Z" },
  { id: 4, user_id: 6, payable_type: "ticket", payable_id: 4, amount: 50000, currency: "XOF", method: "stripe", status: "completed", transaction_id: "STR-TKT-004", created_at: "2024-03-16T14:00:00Z", updated_at: "2024-03-16T14:00:00Z" },
  { id: 5, user_id: 7, payable_type: "ticket", payable_id: 5, amount: 9000, currency: "XOF", method: "orange_money", status: "completed", transaction_id: "OM-TKT-005", created_at: "2024-03-17T09:00:00Z", updated_at: "2024-03-17T09:00:00Z" },
  { id: 6, user_id: 8, payable_type: "ticket", payable_id: 6, amount: 15000, currency: "XOF", method: "wave", status: "pending", created_at: "2024-03-17T15:00:00Z", updated_at: "2024-03-17T15:00:00Z" },
  { id: 7, user_id: 9, payable_type: "ticket", payable_id: 7, amount: 60000, currency: "XOF", method: "paypal", status: "completed", transaction_id: "PP-TKT-007", created_at: "2024-03-18T11:00:00Z", updated_at: "2024-03-18T11:00:00Z" },
  { id: 8, user_id: 10, payable_type: "ticket", payable_id: 8, amount: 10000, currency: "XOF", method: "wave", status: "failed", created_at: "2024-03-18T16:00:00Z", updated_at: "2024-03-18T16:00:00Z" },
];

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n);
}

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

const METHOD_LABELS: Record<string, string> = {
  wave: "Wave", orange_money: "Orange Money", stripe: "Stripe", paypal: "PayPal",
};

function getRevenueByEvent(tickets: TicketType[]) {
  const map: Record<string, { title: string; city: string; tickets: number; revenue: number }> = {};
  tickets.forEach((t) => {
    if (t.status === "cancelled") return;
    const key = String(t.event_id);
    if (!map[key]) {
      map[key] = { title: t.event?.title ?? "—", city: t.event?.city ?? "", tickets: 0, revenue: 0 };
    }
    map[key].tickets += t.quantity;
    map[key].revenue += t.total_price;
  });
  return Object.values(map).sort((a, b) => b.revenue - a.revenue);
}

function getRevenueByMethod(payments: Payment[]) {
  const map: Record<string, number> = {};
  payments.filter((p) => p.status === "completed" && p.payable_type === "ticket").forEach((p) => {
    map[p.method] = (map[p.method] ?? 0) + p.amount;
  });
  return map;
}

export default function AdminCaissePage() {
  const [tickets, setTickets] = useState<TicketType[]>(MOCK_TICKETS);
  const [payments, setPayments] = useState<Payment[]>(MOCK_PAYMENTS);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAdminTickets({ per_page: 100 }).then((r) => setTickets(r.data)).catch(() => {});
    getAdminPayments({ per_page: 100 }).then((r) => setPayments(r.data)).catch(() => {});
  }, []);

  const ticketPayments = payments.filter((p) => p.payable_type === "ticket");
  const totalRevenue = ticketPayments.filter((p) => p.status === "completed").reduce((a, p) => a + p.amount, 0);
  const pendingRevenue = ticketPayments.filter((p) => p.status === "pending").reduce((a, p) => a + p.amount, 0);
  const soldCount = tickets.filter((t) => t.status !== "cancelled").reduce((a, t) => a + t.quantity, 0);
  const completedCount = ticketPayments.filter((p) => p.status === "completed").length;

  const filteredTickets = tickets.filter((t) =>
    !search ||
    (t.event?.title ?? "").toLowerCase().includes(search.toLowerCase()) ||
    t.qr_code.toLowerCase().includes(search.toLowerCase())
  );

  const byEvent = getRevenueByEvent(tickets);
  const byMethod = getRevenueByMethod(payments);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Caisse billetterie</h1>
        <p className="text-sm text-gray-500">Revenus et ventes de billets en temps réel</p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Revenus total", value: `${fmt(totalRevenue)} XOF`, color: "#4A7C59", bg: "#D6EDE0", icon: Wallet },
          { label: "En attente", value: `${fmt(pendingRevenue)} XOF`, color: "#C8922A", bg: "#F5E6C8", icon: TrendingUp },
          { label: "Billets vendus", value: soldCount, color: "#635BFF", bg: "#F0EFFF", icon: Ticket },
          { label: "Transactions", value: completedCount, color: "#1A1A2E", bg: "#F0F0F0", icon: BarChart3 },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: s.bg }}>
                  <Icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-300" />
              </div>
              <p className="text-lg font-bold text-[#1A1A2E]">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Revenue breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-5">
          <h2 className="font-semibold text-[#1A1A2E] mb-4 text-sm">Par méthode de paiement</h2>
          <div className="space-y-3">
            {Object.keys(byMethod).length === 0 ? (
              <p className="text-sm text-gray-400">Aucun paiement enregistré</p>
            ) : (
              Object.entries(byMethod).map(([method, amount]) => {
                const pct = totalRevenue > 0 ? Math.round((amount / totalRevenue) * 100) : 0;
                return (
                  <div key={method}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{METHOD_LABELS[method] ?? method}</span>
                      <span className="font-medium text-[#1A1A2E]">{fmt(amount)} XOF · {pct}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#C8922A] rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="font-semibold text-[#1A1A2E] mb-4 text-sm">Par événement</h2>
          <div className="space-y-2">
            {byEvent.slice(0, 5).map((ev, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#1A1A2E] truncate">{ev.title}</p>
                  <p className="text-xs text-gray-400">
                    {ev.city} · {ev.tickets} billet{ev.tickets > 1 ? "s" : ""}
                  </p>
                </div>
                <span className="text-sm font-bold text-[#4A7C59] whitespace-nowrap ml-3">
                  {fmt(ev.revenue)} XOF
                </span>
              </div>
            ))}
            {byEvent.length === 0 && (
              <p className="text-sm text-gray-400">Aucune donnée disponible</p>
            )}
          </div>
        </Card>
      </div>

      {/* Ticket transactions */}
      <Card className="p-4">
        <div className="mb-4">
          <Input
            placeholder="Rechercher par événement ou QR code…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["QR Code", "Événement", "Type", "Qté", "Montant", "Statut", "Date"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">
                    <Ticket className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    Aucune vente trouvée
                  </td>
                </tr>
              ) : (
                filteredTickets.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <code className="text-xs font-mono text-[#1A1A2E]">{t.qr_code}</code>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#1A1A2E] max-w-xs truncate">{t.event?.title ?? "—"}</p>
                      <p className="text-xs text-gray-400">{t.event?.city}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{t.ticket_type?.name ?? "—"}</td>
                    <td className="px-4 py-3 text-center font-medium">{t.quantity}</td>
                    <td className="px-4 py-3 font-semibold text-[#1A1A2E] whitespace-nowrap">
                      {fmt(t.total_price)} XOF
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={t.status === "valid" ? "green" : t.status === "used" ? "gold" : "red"}>
                        {t.status === "valid" ? "Valide" : t.status === "used" ? "Utilisé" : "Annulé"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                      {fmtDate(t.created_at)}
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
