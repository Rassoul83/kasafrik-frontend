"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import type { User } from "@/types";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("kasafrik_token");
    const userStr = localStorage.getItem("kasafrik_user");

    if (!token || !userStr) {
      router.replace("/login");
      return;
    }

    try {
      const parsed: User = JSON.parse(userStr);
      if (parsed.role !== "admin") {
        router.replace("/");
        return;
      }
      setUser(parsed);
      setChecking(false);
    } catch {
      router.replace("/login");
    }
  }, [router]);

  if (checking || !user) {
    return (
      <div className="min-h-screen bg-[#F0EFE9] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#C8922A] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Vérification de l&apos;accès…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F0EFE9] overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={[
          "fixed inset-y-0 left-0 z-30 md:relative md:z-auto",
          sidebarOpen ? "flex" : "hidden md:flex",
        ].join(" ")}
      >
        <AdminSidebar user={user} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <AdminTopbar
          user={user}
          onMenuToggle={() => setSidebarOpen((v) => !v)}
        />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
