"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Building2,
  Calendar,
  CreditCard,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  ArrowUp,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { getAdminStats, getAdminProperties, getAdminUsers, getAdminPayments } from "@/lib/api";
import type { AdminStats, Property, User, Payment } from "@/types";

const MOCK_STATS: AdminStats = {
  total_users: 15234,
  total_properties: 1200,
  total_events: 500,
  total_tickets: 8740,
  total_revenue: 45600000,
  pending_properties: 12,
  active_subscriptions: 234,
  this_month_revenue: 4200000,
  this_month_properties: 48,
  this_month_users: 312,
};

const MOCK_PENDING: Property[] = [
  {
    id: 5, user_id: 4, title: "Villa moderne 4ch. — Sacré-Cœur", description: "", type: "sale",
    category: "villa", price: 95000000, currency: "XOF", city: "Dakar", address: "Sacré-Cœur",
    bedrooms: 4, bathrooms: 3, surface: 280, is_featured: false, is_verified: false,
    status: "pending", images: [], created_at: "2024-05-01T09:00:00Z", updated_at: "2024-05-01T09:00:00Z",
  },
  {
    id: 6, user_id: 5, title: "Appartement F4 — Point E", description: "", type: "rent",
    category: "apartment", price: 650000, currency: "XOF", city: "Dakar", address: "Point E",
    bedrooms: 4, bathrooms: 2, surface: 120, is_featured: false, is_verified: false,
    status: "pending", images: [], created_at: "2024-05-02T11:00:00Z", updated_at: "2024-05-02T11:00:00Z",
  },
  {
    id: 7, user_id: 6, title: "Terrain constructible 800m² — Thiès", description: "", type: "sale",
    category: "land", price: 25000000, currency: "XOF", city: "Thiès", address: "Centre",
    is_featured: false, is_verified: false, status: "pending", images: [],
    created_at: "2024-05-03T14:00:00Z", updated_at: "2024-05-03T14:00:00Z",
  },
];

const MOCK_USERS: User[] = [
  { id: 10, name: "Ousmane Faye", email: "ousmane@example.com", role: "owner", is_verified: true, is_banned: false, created_at: "2024-05-01T00:00:00Z", updated_at: "2024-05-01T00:00:00Z" },
  { id: 11, name: "Aïda Ndiaye", email: "aida@example.com", role: "client", is_verified: true, is_banned: false, created_at: "2024-05-02T00:00:00Z", updated_at: "2024-05-02T00:00:00Z" },
  { id: 12, name: "Ibrahim Diallo", email: "ibrahim@example.com", role: "organizer", is_verified: false, is_banned: false, created_at: "2024-05-03T00:00:00Z", updated_at: "2024-05-03T00:00:00Z" },
  { id: 13, name: "Mariama Ba", email: "mariama@example.com", role: "client", is_verified: true, is_banned: false, created_at: "2024-05-04T00:00:00Z", updated_at: "2024-05-04T00:00:00Z" },
];

const MOCK_PAYMENTS: Payment[] = [
  { id: 1, user_id: 10, payable_type: "booking", payable_id: 1, amount: 450000, currency: "XOF", method: "wave", status: "completed", created_at: "2024-05-01T10:00:00Z", updated_at: "2024-05-01T10:00:00Z" },
  { id: 2, user_id: 11, payable_type: "ticket", payable_id: 2, amount: 45000, currency: "XOF", method: "orange_money", status: "completed", created_at: "2024-05-02T12:00:00Z", updated_at: "2024-05-02T12:00:00Z" },
  { id: 3, user_id: 12, payable_type: "subscription", payable_id: 3, amount: 25000, currency: "XOF", method: "stripe", status: "pending", created_at: "2024-05-03T09:00:00Z", updated_at: "2024-05-03T09:00:00Z" },
  { id: 4, user_id: 13, payable_type: "booking", payable_id: 4, amount: 120000, currency: "XOF", method: "wave", status: "completed", created_at: "2024-05-04T16:00:00Z", updated_at: "2024-05-04T16:00:00Z" },
];

function fmt(n: unknown): string {
  const num = Number(n);
  if (!isFinite(num)) return "0";
  return new Intl.NumberFormat("fr-FR").format(num);
}

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

const roleLabels: Record<string, string> = {
  admin: "Admin", owner: "Propriétaire", organizer: "Organisateur", client: "Client",
};

const methodLabels: Record<string, string> = {
  wave: "Wave", orange_money: "Orange Money", stripe: "Stripe", paypal: "PayPal",
};

export default function DashboardPage() {
  const [stats, setStats] = useState<AdminStats>(MOCK_STATS);
  const [pending, setPending] = useState<Property[]>(MOCK_PENDING);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [payments, setPayments] = useState<Payment[]>(MOCK_PAYMENTS);

  useEffect(() => {
    getAdminStats().then((r) => setStats(r.data)).catch(() => {});
    getAdminProperties({ status: "pending", per_page: 3 }).then((r) => setPending(r.data.slice(0, 3))).catch(() => {});
    getAdminUsers({ per_page: 4, sort: "created_at_desc" }).then((r) => setUsers(r.data.slice(0, 4))).catch(() => {});
    getAdminPayments({ per_page: 4, sort: "created_at_desc" }).then((r) => {
      const mapped = r.data?.map((p: any) => ({
        ...p,
        amount: parseFloat(String(p.amount ?? p.total ?? p.price ?? 0)) || 0,
      })) ?? [];
      setPayments(mapped.slice(0, 4));
    }).catch(() => {});
  }, []);

  const kpis = [
    {
      label: "Utilisateurs", value: fmt(stats.total_users), sub: `+${stats.this_month_users} ce mois`,
      icon: Users, color: "#C8922A", bg: "#F5E6C8", link: "/admin/users",
    },
    {
      label: "Propriétés", value: fmt(stats.total_properties), sub: `+${stats.this_month_properties} ce mois`,
      icon: Building2, color: "#4A7C59", bg: "#D6EDE0", link: "/admin/properties",
    },
    {
      label: "Événements", value: fmt(stats.total_events), sub: `${stats.total_tickets} billets vendus`,
      icon: Calendar, color: "#635BFF", bg: "#F0EFFF", link: "/admin/events",
    },
    {
      label: "Revenus", value: `${fmt(stats.total_revenue)} XOF`, sub: `${fmt(stats.this_month_revenue)} XOF ce mois`,
      icon: CreditCard, color: "#C84B2F", bg: "#FAE8E3", link: "/admin/payments",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Tableau de bord</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        {stats.pending_properties > 0 && (
          <Link href="/admin/properties?status=pending">
            <div className="flex items-center gap-2 bg-[#FAE8E3] border border-[#C84B2F]/30 text-[#C84B2F] text-sm font-medium px-4 py-2 rounded-xl">
              <AlertCircle className="w-4 h-4" />
              {stats.pending_properties} annonce{stats.pending_properties > 1 ? "s" : ""} en attente
            </div>
          </Link>
        )}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Link key={kpi.label} href={kpi.link}>
              <Card hover className="p-5 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: kpi.bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color: kpi.color }} />
                  </div>
                  <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                    <ArrowUp className="w-3 h-3" />
                    +12%
                  </span>
                </div>
                <p className="text-2xl font-bold text-[#1A1A2E] leading-none">{kpi.value}</p>
                <p className="text-sm text-gray-500 mt-1">{kpi.label}</p>
                <p className="text-xs text-gray-400 mt-1">{kpi.sub}</p>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending verifications */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C84B2F]" />
              <h2 className="text-sm font-semibold text-[#1A1A2E]">
                En attente de vérification
              </h2>
            </div>
            <Link href="/admin/properties?status=pending">
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                Tout voir <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {pending.length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-green-600 py-4">
                <CheckCircle className="w-4 h-4" />
                Aucune annonce en attente
              </div>
            ) : (
              pending.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#1A1A2E] truncate">
                      {p.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {p.city} · {fmt(p.price)} {p.currency} · {fmtDate(p.created_at)}
                    </p>
                  </div>
                  <Link href={`/admin/properties`}>
                    <Button variant="outline" size="sm" className="shrink-0 text-xs ml-3">
                      Vérifier
                    </Button>
                  </Link>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Recent users */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#C8922A]" />
              <h2 className="text-sm font-semibold text-[#1A1A2E]">
                Nouveaux utilisateurs
              </h2>
            </div>
            <Link href="/admin/users">
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                Tout voir <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {users.map((u) => {
              const initials = u.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
              return (
                <div key={u.id} className="flex items-center gap-3 py-1">
                  <div className="w-8 h-8 rounded-full bg-[#F5E6C8] flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-[#C8922A]">{initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1A1A2E] truncate">{u.name}</p>
                    <p className="text-xs text-gray-400 truncate">{u.email}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Badge variant={u.role === "admin" ? "red" : u.role === "owner" ? "gold" : u.role === "organizer" ? "blue" : "gray"}>
                      {roleLabels[u.role]}
                    </Badge>
                    {!u.is_verified && (
                      <Badge variant="gray">Non vérifié</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Recent payments */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#4A7C59]" />
            <h2 className="text-sm font-semibold text-[#1A1A2E]">
              Paiements récents
            </h2>
          </div>
          <Link href="/admin/payments">
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              Tout voir <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">#</th>
                <th className="text-left pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">Type</th>
                <th className="text-left pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">Montant</th>
                <th className="text-left pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">Méthode</th>
                <th className="text-left pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">Statut</th>
                <th className="text-left pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="py-2.5 text-gray-400">#{p.id}</td>
                  <td className="py-2.5 capitalize text-gray-700">{p.payable_type}</td>
                  <td className="py-2.5 font-medium text-[#1A1A2E]">
                    {fmt(p.amount)} {p.currency}
                  </td>
                  <td className="py-2.5 text-gray-600">{methodLabels[p.method]}</td>
                  <td className="py-2.5">
                    <Badge
                      variant={
                        p.status === "completed" ? "green" :
                        p.status === "pending" ? "gold" :
                        p.status === "failed" ? "red" : "gray"
                      }
                    >
                      {p.status === "completed" ? "Complété" : p.status === "pending" ? "En attente" : p.status === "failed" ? "Échoué" : "Remboursé"}
                    </Badge>
                  </td>
                  <td className="py-2.5 text-gray-400 text-xs">{fmtDate(p.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
