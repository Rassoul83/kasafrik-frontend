"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  Calendar,
  Ticket,
  CreditCard,
  Star,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  TrendingUp,
  Zap,
  X,
} from "lucide-react";
import { logout } from "@/lib/api";
import type { User } from "@/types";

const navItems = [
  {
    section: "Principal",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Statistiques", href: "/admin/stats", icon: TrendingUp },
    ],
  },
  {
    section: "Contenu",
    items: [
      { label: "Propriétés", href: "/admin/properties", icon: Building2 },
      { label: "Événements", href: "/admin/events", icon: Calendar },
      { label: "Billets", href: "/admin/tickets", icon: Ticket },
    ],
  },
  {
    section: "Utilisateurs",
    items: [
      { label: "Utilisateurs", href: "/admin/users", icon: Users },
      { label: "Abonnements", href: "/admin/subscriptions", icon: Star },
    ],
  },
  {
    section: "Finance",
    items: [
      { label: "Paiements", href: "/admin/payments", icon: CreditCard },
      { label: "Boosts", href: "/admin/boosts", icon: Zap },
    ],
  },
  {
    section: "Système",
    items: [
      { label: "Notifications", href: "/admin/notifications", icon: Bell },
      { label: "Paramètres", href: "/admin/settings", icon: Settings },
    ],
  },
];

interface AdminSidebarProps {
  user: User;
  onClose?: () => void;
}

export default function AdminSidebar({ user, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  async function handleLogout() {
    try {
      await logout();
    } catch {
      // silently ignore API errors on logout
    }
    router.push("/login");
  }

  return (
    <aside className="w-64 min-h-screen bg-[#1A1A2E] flex flex-col shrink-0">
      {/* Logo + close (mobile) */}
      <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
        <Link href="/admin" className="flex items-center" onClick={onClose}>
          <Image src="/logo.png" alt="Kasafrik" width={100} height={50} />
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <p className="px-6 pt-1 pb-3 text-xs text-gray-500 border-b border-white/10">
        Administration
      </p>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-5">
        {navItems.map((section) => (
          <div key={section.section}>
            <p className="px-3 mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              {section.section}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/admin" && pathname.startsWith(item.href));

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={[
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-[#C8922A] text-white shadow-lg shadow-[#C8922A]/20"
                          : "text-gray-400 hover:text-white hover:bg-white/10",
                      ].join(" ")}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {isActive && (
                        <ChevronRight className="w-3.5 h-3.5 opacity-70" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-white/10 space-y-2">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-[#C8922A] flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-white">{initials}</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user.name}</p>
            <p className="text-[10px] text-gray-400 capitalize">{user.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
