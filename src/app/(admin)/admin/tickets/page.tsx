"use client";

import { useEffect, useState } from "react";
import { Search, Ticket, QrCode } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { getAdminTickets } from "@/lib/api";
import type { Ticket as TicketType } from "@/types";

const MOCK: TicketType[] = [
  { id: 1, user_id: 3, event_id: 1, ticket_type_id: 1, qr_code: "QR-KAS-001-2024", status: "valid", quantity: 2, total_price: 30000, event: { id: 1, user_id: 3, title: "Concert Youssou N'Dour", description: "", category: "musique", city: "Dakar", venue: "Grand Théâtre", address: "", start_date: "2024-03-15T20:00:00Z", end_date: "2024-03-15T23:00:00Z", is_published: true, is_featured: true, ticket_types: [], created_at: "2024-01-10T10:00:00Z", updated_at: "2024-01-10T10:00:00Z" }, ticket_type: { id: 1, event_id: 1, name: "Standard", price: 15000, quantity: 500, sold: 230, is_available: true }, created_at: "2024-02-01T10:00:00Z", updated_at: "2024-02-01T10:00:00Z" },
  { id: 2, user_id: 4, event_id: 1, ticket_type_id: 2, qr_code: "QR-KAS-002-2024", status: "valid", quantity: 1, total_price: 45000, event: { id: 1, user_id: 3, title: "Concert Youssou N'Dour", description: "", category: "musique", city: "Dakar", venue: "Grand Théâtre", address: "", start_date: "2024-03-15T20:00:00Z", end_date: "2024-03-15T23:00:00Z", is_published: true, is_featured: true, ticket_types: [], created_at: "2024-01-10T10:00:00Z", updated_at: "2024-01-10T10:00:00Z" }, ticket_type: { id: 2, event_id: 1, name: "VIP", price: 45000, quantity: 100, sold: 67, is_available: true }, created_at: "2024-02-02T10:00:00Z", updated_at: "2024-02-02T10:00:00Z" },
  { id: 3, user_id: 5, event_id: 2, ticket_type_id: 3, qr_code: "QR-KAS-003-2024", status: "used", quantity: 1, total_price: 5000, event: { id: 2, user_id: 3, title: "Forum Immobilier Dakar", description: "", category: "business", city: "Dakar", venue: "King Fahd Palace", address: "", start_date: "2024-04-05T09:00:00Z", end_date: "2024-04-07T18:00:00Z", is_published: true, is_featured: false, ticket_types: [], created_at: "2024-01-12T10:00:00Z", updated_at: "2024-01-12T10:00:00Z" }, ticket_type: { id: 3, event_id: 2, name: "Standard", price: 5000, quantity: 200, sold: 89, is_available: true }, created_at: "2024-02-10T10:00:00Z", updated_at: "2024-02-10T10:00:00Z" },
  { id: 4, user_id: 6, event_id: 2, ticket_type_id: 4, qr_code: "QR-KAS-004-2024", status: "cancelled", quantity: 2, total_price: 50000, event: { id: 2, user_id: 3, title: "Forum Immobilier Dakar", description: "", category: "business", city: "Dakar", venue: "King Fahd Palace", address: "", start_date: "2024-04-05T09:00:00Z", end_date: "2024-04-07T18:00:00Z", is_published: true, is_featured: false, ticket_types: [], created_at: "2024-01-12T10:00:00Z", updated_at: "2024-01-12T10:00:00Z" }, ticket_type: { id: 4, event_id: 2, name: "VIP", price: 25000, quantity: 50, sold: 12, is_available: true }, created_at: "2024-02-12T10:00:00Z", updated_at: "2024-02-12T10:00:00Z" },
  { id: 5, user_id: 7, event_id: 4, ticket_type_id: 7, qr_code: "QR-KAS-005-2024", status: "valid", quantity: 3, total_price: 9000, event: { id: 4, user_id: 5, title: "Festival Cinéma Africain", description: "", category: "culture", city: "Abidjan", venue: "Palais des Congrès", address: "", start_date: "2024-03-28T14:00:00Z", end_date: "2024-04-06T22:00:00Z", is_published: true, is_featured: false, ticket_types: [], created_at: "2024-01-15T10:00:00Z", updated_at: "2024-01-15T10:00:00Z" }, ticket_type: { id: 7, event_id: 4, name: "Standard", price: 3000, quantity: 1000, sold: 567, is_available: true }, created_at: "2024-02-20T10:00:00Z", updated_at: "2024-02-20T10:00:00Z" },
];

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n);
}

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<TicketType[]>(MOCK);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    getAdminTickets({ per_page: 50 }).then((r) => setTickets(r.data)).catch(() => {});
  }, []);

  const filtered = tickets.filter((t) => {
    const matchSearch = !search ||
      t.qr_code.toLowerCase().includes(search.toLowerCase()) ||
      t.event?.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = filtered.reduce((acc, t) => acc + t.total_price, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Billets</h1>
          <p className="text-sm text-gray-500">
            {filtered.length} billet{filtered.length > 1 ? "s" : ""} · {fmt(totalRevenue)} XOF total
          </p>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Valides", count: tickets.filter((t) => t.status === "valid").length, color: "#4A7C59", bg: "#D6EDE0" },
          { label: "Utilisés", count: tickets.filter((t) => t.status === "used").length, color: "#C8922A", bg: "#F5E6C8" },
          { label: "Annulés", count: tickets.filter((t) => t.status === "cancelled").length, color: "#C84B2F", bg: "#FAE8E3" },
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
              placeholder="Rechercher par QR code, événement…"
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
            <option value="valid">Valide</option>
            <option value="used">Utilisé</option>
            <option value="cancelled">Annulé</option>
          </select>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["#", "QR Code", "Événement", "Type", "Qté", "Montant", "Statut", "Date"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400">
                    <Ticket className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    Aucun billet trouvé
                  </td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400">#{t.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <QrCode className="w-4 h-4 text-gray-400 shrink-0" />
                        <code className="text-xs font-mono text-[#1A1A2E]">{t.qr_code}</code>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#1A1A2E] max-w-xs truncate">
                        {t.event?.title ?? "—"}
                      </p>
                      <p className="text-xs text-gray-400">{t.event?.city}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      {t.ticket_type?.name ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-center font-medium">
                      {t.quantity}
                    </td>
                    <td className="px-4 py-3 font-medium whitespace-nowrap">
                      {fmt(t.total_price)} XOF
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={t.status === "valid" ? "green" : t.status === "used" ? "gold" : "red"}
                      >
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
