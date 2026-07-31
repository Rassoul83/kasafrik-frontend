"use client";

import { useEffect, useState } from "react";
import { Bell, CheckCheck, Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getAdminNotifications, markNotificationRead, markAllNotificationsRead } from "@/lib/api";
import type { Notification } from "@/types";

const MOCK: Notification[] = [
  { id: 1, user_id: 1, title: "Nouvelle annonce en attente", message: "La propriété « Villa moderne 4ch. — Sacré-Cœur » attend votre vérification.", type: "info", is_read: false, created_at: "2024-05-01T09:00:00Z", updated_at: "2024-05-01T09:00:00Z" },
  { id: 2, user_id: 1, title: "Paiement reçu", message: "Un paiement de 450 000 XOF via Wave a été complété (Réservation #1).", type: "success", is_read: false, created_at: "2024-05-01T10:00:00Z", updated_at: "2024-05-01T10:00:00Z" },
  { id: 3, user_id: 1, title: "Nouvel utilisateur inscrit", message: "Ibrahim Diallo (organizer) vient de créer un compte.", type: "info", is_read: false, created_at: "2024-05-02T08:30:00Z", updated_at: "2024-05-02T08:30:00Z" },
  { id: 4, user_id: 1, title: "Tentative de connexion suspecte", message: "Plusieurs tentatives de connexion depuis l'IP 197.240.xx.xx ont été détectées.", type: "warning", is_read: true, created_at: "2024-05-02T14:00:00Z", updated_at: "2024-05-02T14:00:00Z" },
  { id: 5, user_id: 1, title: "Paiement échoué", message: "Le paiement #6 de 200 000 XOF via PayPal a échoué.", type: "error", is_read: true, created_at: "2024-05-03T11:00:00Z", updated_at: "2024-05-03T11:00:00Z" },
  { id: 6, user_id: 1, title: "Événement publié", message: "L'événement « Forum Immobilier Dakar 2024 » a été publié avec succès.", type: "success", is_read: true, created_at: "2024-05-03T13:00:00Z", updated_at: "2024-05-03T13:00:00Z" },
  { id: 7, user_id: 1, title: "Abonnement Pro activé", message: "L'utilisateur Moussa Diallo a souscrit à l'abonnement Pro.", type: "success", is_read: false, created_at: "2024-05-04T09:00:00Z", updated_at: "2024-05-04T09:00:00Z" },
];

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

const typeIcons: Record<string, React.ElementType> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};
const typeVariants: Record<string, "blue" | "green" | "gold" | "red"> = {
  info: "blue", success: "green", warning: "gold", error: "red",
};
const typeColors: Record<string, string> = {
  info: "#3B82F6", success: "#4A7C59", warning: "#C8922A", error: "#C84B2F",
};
const typeBgs: Record<string, string> = {
  info: "#EFF6FF", success: "#D6EDE0", warning: "#F5E6C8", error: "#FAE8E3",
};

export default function AdminNotificationsPage() {
  const [notifs, setNotifs] = useState<Notification[]>(MOCK);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [loading, setLoading] = useState<Record<number, boolean>>({});
  const [markingAll, setMarkingAll] = useState(false);

  useEffect(() => {
    getAdminNotifications({ per_page: 50 }).then((r) => setNotifs(r.data)).catch(() => {});
  }, []);

  const filtered = notifs.filter((n) => {
    if (filter === "unread") return !n.is_read;
    if (filter === "read") return n.is_read;
    return true;
  });

  const unreadCount = notifs.filter((n) => !n.is_read).length;

  async function handleMarkRead(id: number) {
    setLoading((l) => ({ ...l, [id]: true }));
    try {
      await markNotificationRead(id);
      setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, is_read: true } : n));
    } catch { /* silently ignore */ } finally {
      setLoading((l) => ({ ...l, [id]: false }));
    }
  }

  async function handleMarkAll() {
    setMarkingAll(true);
    try {
      await markAllNotificationsRead();
      setNotifs((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch { /* silently ignore */ } finally {
      setMarkingAll(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Notifications</h1>
          <p className="text-sm text-gray-500">
            {unreadCount} non lue{unreadCount > 1 ? "s" : ""}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            loading={markingAll}
            onClick={handleMarkAll}
            className="gap-2"
          >
            <CheckCheck className="w-4 h-4" />
            Tout marquer comme lu
          </Button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(["all", "unread", "read"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={[
              "px-4 py-2 rounded-xl text-sm font-medium transition-all",
              filter === f
                ? "bg-[#C8922A] text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-[#C8922A] hover:text-[#C8922A]",
            ].join(" ")}
          >
            {f === "all" ? "Toutes" : f === "unread" ? "Non lues" : "Lues"}
            {f === "unread" && unreadCount > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/30 text-xs font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <Card className="p-12 text-center text-gray-400">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p>Aucune notification</p>
          </Card>
        ) : (
          filtered.map((n) => {
            const Icon = typeIcons[n.type] ?? Info;
            return (
              <Card
                key={n.id}
                className={`p-4 transition-all ${!n.is_read ? "border-l-4 border-l-[#C8922A]" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: typeBgs[n.type] }}
                  >
                    <Icon className="w-4 h-4" style={{ color: typeColors[n.type] }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-[#1A1A2E]">{n.title}</p>
                        <Badge variant={typeVariants[n.type] ?? "gray"}>
                          {n.type}
                        </Badge>
                        {!n.is_read && (
                          <span className="w-2 h-2 rounded-full bg-[#C8922A] shrink-0" />
                        )}
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                        {fmtDate(n.created_at)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{n.message}</p>
                  </div>
                  {!n.is_read && (
                    <button
                      onClick={() => handleMarkRead(n.id)}
                      disabled={loading[n.id]}
                      title="Marquer comme lu"
                      className="p-1.5 rounded-lg text-gray-400 hover:text-[#4A7C59] hover:bg-[#D6EDE0] transition-colors shrink-0"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
