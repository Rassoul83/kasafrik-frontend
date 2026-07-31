"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, Home, ChevronRight } from "lucide-react";
import type { User } from "@/types";

interface AdminTopbarProps {
  user: User;
  onMenuToggle: () => void;
}

const pathLabels: Record<string, string> = {
  admin: "Dashboard",
  stats: "Statistiques",
  properties: "Propriétés",
  events: "Événements",
  tickets: "Billets",
  users: "Utilisateurs",
  subscriptions: "Abonnements",
  payments: "Paiements",
  boosts: "Boosts",
  notifications: "Notifications",
  settings: "Paramètres",
};

export default function AdminTopbar({ user, onMenuToggle }: AdminTopbarProps) {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((seg, i) => ({
    label: pathLabels[seg] ?? seg,
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center gap-3 px-4 md:px-6 shrink-0">
      {/* Mobile toggle */}
      <button
        onClick={onMenuToggle}
        className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
        aria-label="Ouvrir menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm flex-1 min-w-0" aria-label="Fil d'Ariane">
        <Link
          href="/admin"
          className="text-gray-400 hover:text-[#C8922A] transition-colors shrink-0"
        >
          <Home className="w-4 h-4" />
        </Link>
        {crumbs.map((crumb) => (
          <span key={crumb.href} className="flex items-center gap-1 min-w-0">
            <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
            {crumb.isLast ? (
              <span className="font-semibold text-[#1A1A2E] truncate">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="text-gray-500 hover:text-[#C8922A] transition-colors truncate"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href="/admin/notifications"
          className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-[#C8922A] transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C84B2F] rounded-full" />
        </Link>

        <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-[#C8922A] flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-white">{initials}</span>
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold text-[#1A1A2E] leading-none">
              {user.name}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5 capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
