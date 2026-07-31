"use client";

import { useEffect, useState } from "react";
import { Search, Ban, CheckCircle, Users } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { getAdminUsers, banUser, unbanUser } from "@/lib/api";
import type { User } from "@/types";

const MOCK: User[] = [
  { id: 1, name: "Administrateur Kasafrik", email: "admin@kasafrik.sn", role: "admin", is_verified: true, is_banned: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  { id: 2, name: "Moussa Diallo", email: "moussa.diallo@gmail.com", phone: "+221 77 123 45 67", role: "owner", is_verified: true, is_banned: false, created_at: "2024-01-10T00:00:00Z", updated_at: "2024-01-10T00:00:00Z" },
  { id: 3, name: "Fatou Sow", email: "fatou.sow@outlook.com", role: "client", is_verified: true, is_banned: false, created_at: "2024-01-15T00:00:00Z", updated_at: "2024-01-15T00:00:00Z" },
  { id: 4, name: "Amadou Bâ", email: "amadou.ba@yahoo.fr", phone: "+221 70 234 56 78", role: "organizer", is_verified: true, is_banned: false, created_at: "2024-01-20T00:00:00Z", updated_at: "2024-01-20T00:00:00Z" },
  { id: 5, name: "Aïssatou Diop", email: "aissatou.diop@gmail.com", role: "client", is_verified: false, is_banned: false, created_at: "2024-02-01T00:00:00Z", updated_at: "2024-02-01T00:00:00Z" },
  { id: 6, name: "Ibrahima Fall", email: "ibrahima.fall@hotmail.com", role: "owner", is_verified: true, is_banned: true, created_at: "2024-02-05T00:00:00Z", updated_at: "2024-02-05T00:00:00Z" },
  { id: 7, name: "Khady Niang", email: "khady.niang@gmail.com", role: "client", is_verified: true, is_banned: false, created_at: "2024-02-10T00:00:00Z", updated_at: "2024-02-10T00:00:00Z" },
  { id: 8, name: "Seydou Traoré", email: "seydou.traore@gmail.com", role: "organizer", is_verified: false, is_banned: false, created_at: "2024-02-15T00:00:00Z", updated_at: "2024-02-15T00:00:00Z" },
];

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

const roleLabels: Record<string, string> = {
  admin: "Admin", owner: "Propriétaire", organizer: "Organisateur", client: "Client",
};
const roleVariants: Record<string, "red" | "gold" | "blue" | "gray"> = {
  admin: "red", owner: "gold", organizer: "blue", client: "gray",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(MOCK);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [banTarget, setBanTarget] = useState<User | null>(null);
  const [loading, setLoading] = useState<Record<number, boolean>>({});

  useEffect(() => {
    getAdminUsers({ per_page: 50 }).then((r) => setUsers(r.data)).catch(() => {});
  }, []);

  const filtered = users.filter((u) => {
    const matchSearch = !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = !roleFilter || u.role === roleFilter;
    const matchStatus = !statusFilter ||
      (statusFilter === "verified" && u.is_verified) ||
      (statusFilter === "unverified" && !u.is_verified) ||
      (statusFilter === "banned" && u.is_banned);
    return matchSearch && matchRole && matchStatus;
  });

  async function handleBanToggle() {
    if (!banTarget) return;
    setLoading((l) => ({ ...l, [banTarget.id]: true }));
    try {
      if (banTarget.is_banned) {
        await unbanUser(banTarget.id);
      } else {
        await banUser(banTarget.id);
      }
      setUsers((prev) =>
        prev.map((u) => u.id === banTarget.id ? { ...u, is_banned: !u.is_banned } : u)
      );
    } catch { /* silently ignore */ } finally {
      setLoading((l) => ({ ...l, [banTarget.id]: false }));
      setBanTarget(null);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Utilisateurs</h1>
        <p className="text-sm text-gray-500">{filtered.length} utilisateur{filtered.length > 1 ? "s" : ""}</p>
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
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white"
          >
            <option value="">Tous les rôles</option>
            <option value="admin">Admin</option>
            <option value="owner">Propriétaire</option>
            <option value="organizer">Organisateur</option>
            <option value="client">Client</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white"
          >
            <option value="">Tous les statuts</option>
            <option value="verified">Vérifié</option>
            <option value="unverified">Non vérifié</option>
            <option value="banned">Banni</option>
          </select>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["#", "Utilisateur", "Rôle", "Téléphone", "Vérifié", "Statut", "Inscription", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              ) : (
                filtered.map((u) => {
                  const initials = u.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
                  return (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-400">#{u.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#F5E6C8] flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-[#C8922A]">{initials}</span>
                          </div>
                          <div>
                            <p className="font-medium text-[#1A1A2E]">{u.name}</p>
                            <p className="text-xs text-gray-400">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={roleVariants[u.role] ?? "gray"}>
                          {roleLabels[u.role] ?? u.role}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {u.phone ?? "—"}
                      </td>
                      <td className="px-4 py-3">
                        {u.is_verified ? (
                          <span className="flex items-center gap-1 text-xs text-green-600">
                            <CheckCircle className="w-3.5 h-3.5" /> Oui
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">Non</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {u.is_banned ? (
                          <Badge variant="red">Banni</Badge>
                        ) : (
                          <Badge variant="green">Actif</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                        {fmtDate(u.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        {u.role !== "admin" && (
                          <button
                            onClick={() => setBanTarget(u)}
                            disabled={loading[u.id]}
                            title={u.is_banned ? "Débannir" : "Bannir"}
                            className={`p-1.5 rounded-lg transition-colors ${u.is_banned ? "text-green-500 hover:bg-[#D6EDE0]" : "text-gray-400 hover:text-[#C84B2F] hover:bg-[#FAE8E3]"}`}
                          >
                            {u.is_banned ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        open={!!banTarget}
        onClose={() => setBanTarget(null)}
        title={banTarget?.is_banned ? "Débannir cet utilisateur" : "Bannir cet utilisateur"}
        size="sm"
      >
        <p className="text-sm text-gray-600 mb-5">
          {banTarget?.is_banned
            ? `Débannir ${banTarget?.name} ? L'utilisateur pourra à nouveau se connecter.`
            : `Bannir ${banTarget?.name} ? L'utilisateur ne pourra plus se connecter.`}
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={() => setBanTarget(null)}>Annuler</Button>
          <Button
            variant="primary"
            className={banTarget?.is_banned ? "" : "bg-[#C84B2F] hover:bg-[#A03820]"}
            onClick={handleBanToggle}
          >
            {banTarget?.is_banned ? "Débannir" : "Bannir"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
