"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Users, Building2, CreditCard, Calendar } from "lucide-react";
import Card from "@/components/ui/Card";
import { getAdminStats } from "@/lib/api";
import type { AdminStats } from "@/types";

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

const MONTHLY_REVENUE = [
  { month: "Jan", value: 2800000 },
  { month: "Fév", value: 3200000 },
  { month: "Mar", value: 2600000 },
  { month: "Avr", value: 4100000 },
  { month: "Mai", value: 4200000 },
  { month: "Juin", value: 3800000 },
];

const PROPERTIES_BY_CITY = [
  { city: "Dakar", count: 680 },
  { city: "Thiès", count: 210 },
  { city: "Saint-Louis", count: 145 },
  { city: "Abidjan", count: 98 },
  { city: "Autres", count: 67 },
];

const EVENTS_BY_CATEGORY = [
  { category: "Musique", count: 180, color: "#635BFF" },
  { category: "Business", count: 142, color: "#C8922A" },
  { category: "Culture", count: 98, color: "#4A7C59" },
  { category: "Sport", count: 54, color: "#C84B2F" },
  { category: "Autres", count: 26, color: "#6B7280" },
];

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n);
}

function fmtRevenue(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
  return fmt(n);
}

export default function AdminStatsPage() {
  const [stats, setStats] = useState<AdminStats>(MOCK_STATS);

  useEffect(() => {
    getAdminStats().then((r) => setStats(r.data)).catch(() => {});
  }, []);

  const maxRevenue = Math.max(...MONTHLY_REVENUE.map((m) => m.value));
  const maxCity = PROPERTIES_BY_CITY[0].count;
  const totalEvents = EVENTS_BY_CATEGORY.reduce((a, c) => a + c.count, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Statistiques</h1>
        <p className="text-sm text-gray-500">Vue d&apos;ensemble des performances de la plateforme</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Utilisateurs", value: fmt(stats.total_users), sub: `+${stats.this_month_users} ce mois`, color: "#C8922A", bg: "#F5E6C8" },
          { icon: Building2, label: "Propriétés", value: fmt(stats.total_properties), sub: `${stats.pending_properties} en attente`, color: "#4A7C59", bg: "#D6EDE0" },
          { icon: Calendar, label: "Événements", value: fmt(stats.total_events), sub: `${fmt(stats.total_tickets)} billets`, color: "#635BFF", bg: "#F0EFFF" },
          { icon: CreditCard, label: "Revenus totaux", value: `${fmtRevenue(stats.total_revenue)} XOF`, sub: `${fmtRevenue(stats.this_month_revenue)} ce mois`, color: "#C84B2F", bg: "#FAE8E3" },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="p-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: kpi.bg }}
              >
                <Icon className="w-5 h-5" style={{ color: kpi.color }} />
              </div>
              <p className="text-2xl font-bold text-[#1A1A2E] leading-none">{kpi.value}</p>
              <p className="text-sm text-gray-500 mt-1">{kpi.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{kpi.sub}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue chart */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-4 h-4 text-[#C8922A]" />
            <h2 className="text-sm font-semibold text-[#1A1A2E]">Revenus mensuels (XOF)</h2>
          </div>
          <div className="flex items-end gap-3 h-40">
            {MONTHLY_REVENUE.map((m) => {
              const pct = (m.value / maxRevenue) * 100;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] text-gray-500">{fmtRevenue(m.value)}</span>
                  <div className="w-full relative flex items-end" style={{ height: "80px" }}>
                    <div
                      className="w-full rounded-t-lg bg-[#C8922A] transition-all duration-500"
                      style={{ height: `${pct}%`, minHeight: "4px" }}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-gray-500">{m.month}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Properties by city */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="w-4 h-4 text-[#4A7C59]" />
            <h2 className="text-sm font-semibold text-[#1A1A2E]">Propriétés par ville</h2>
          </div>
          <div className="space-y-4">
            {PROPERTIES_BY_CITY.map((item) => {
              const pct = (item.count / maxCity) * 100;
              return (
                <div key={item.city}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-700">{item.city}</span>
                    <span className="text-sm font-semibold text-[#1A1A2E]">{item.count}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4A7C59] rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Events by category */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-4 h-4 text-[#635BFF]" />
            <h2 className="text-sm font-semibold text-[#1A1A2E]">Événements par catégorie</h2>
          </div>
          <div className="space-y-4">
            {EVENTS_BY_CATEGORY.map((item) => {
              const pct = (item.count / totalEvents) * 100;
              return (
                <div key={item.category}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-700">{item.category}</span>
                    </div>
                    <span className="text-sm font-semibold text-[#1A1A2E]">
                      {item.count} ({pct.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Subscriptions */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-4 h-4 text-[#C8922A]" />
            <h2 className="text-sm font-semibold text-[#1A1A2E]">Abonnements actifs</h2>
          </div>
          <div className="space-y-4">
            {[
              { plan: "Enterprise", count: 12, color: "#635BFF", bg: "#F0EFFF" },
              { plan: "Pro", count: 87, color: "#C8922A", bg: "#F5E6C8" },
              { plan: "Starter", count: 135, color: "#4A7C59", bg: "#D6EDE0" },
              { plan: "Gratuit", count: 14988, color: "#6B7280", bg: "#F3F4F6" },
            ].map((item) => (
              <div
                key={item.plan}
                className="flex items-center justify-between p-3 rounded-xl"
                style={{ backgroundColor: item.bg }}
              >
                <span className="text-sm font-medium" style={{ color: item.color }}>
                  {item.plan}
                </span>
                <span className="text-sm font-bold" style={{ color: item.color }}>
                  {fmt(item.count)} utilisateurs
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
