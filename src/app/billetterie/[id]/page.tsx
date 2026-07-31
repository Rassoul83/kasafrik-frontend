"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Ticket, Calendar, MapPin, Clock, ArrowLeft, Home,
  CheckCircle, AlertCircle, X, Minus, Plus, CreditCard,
  Loader2, QrCode, Users,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { getEvent, initiatePayment } from "@/lib/api";
import type { Event } from "@/types";

// ── Fallback ─────────────────────────────────────────────────────────────────

const FALLBACK_EVENT: Event = {
  id: 0, user_id: 1, title: "Événement Dakar", description: "Un événement exceptionnel à Dakar.",
  category: "musique", city: "Dakar", venue: "À confirmer", address: "Dakar",
  start_date: new Date().toISOString(), end_date: new Date().toISOString(),
  is_published: true, is_featured: false,
  ticket_types: [{ id: 1, event_id: 0, name: "Standard", price: 10000, quantity: 200, sold: 50, is_available: true }],
  created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
};

const PAYMENT_METHODS = [
  { id: "wave",         label: "Wave",          desc: "Paiement mobile rapide",   color: "#1E90FF", emoji: "📱" },
  { id: "orange_money", label: "Orange Money",  desc: "Via votre compte Orange",  color: "#FF6600", emoji: "🟠" },
  { id: "stripe",       label: "Carte bancaire", desc: "Visa, Mastercard, etc.",  color: "#635BFF", emoji: "💳" },
];

const catColors: Record<string, string> = {
  musique: "#635BFF", business: "#C8922A", culture: "#4A7C59",
  sport: "#C84B2F", match: "#1E90FF",
};

const catEmoji: Record<string, string> = {
  musique: "🎵", business: "💼", culture: "🎨", sport: "⚽", match: "🏆",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function safeNum(n: unknown): number {
  const v = Number(n);
  return isFinite(v) ? v : 0;
}

function fmt(n: unknown) {
  return new Intl.NumberFormat("fr-FR").format(safeNum(n));
}

function fmtDate(s: string | undefined | null) {
  if (!s) return "—";
  const d = new Date(s);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function fmtTime(s: string | undefined | null) {
  if (!s) return "—";
  const d = new Date(s);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

// ── Skeletons ─────────────────────────────────────────────────────────────────

function BannerSkeleton() {
  return (
    <div className="h-52 bg-[#1A1A2E] flex items-end">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
        <div className="skeleton-dark rounded-full mb-3" style={{ height: 22, width: 90 }} />
        <div className="skeleton-dark rounded-xl" style={{ height: 28, width: "55%" }} />
      </div>
    </div>
  );
}

function ContentSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton h-20 rounded-2xl" />
        ))}
      </div>
      <div className="skeleton h-36 rounded-2xl" />
      <div className="skeleton h-48 rounded-2xl" />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BilletteriDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const [event, setEvent] = useState<Event>(FALLBACK_EVENT);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [paymentMethod, setPaymentMethod] = useState("wave");
  const [buying, setBuying] = useState(false);
  const [bought, setBought] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setFetchError(null);
    getEvent(id)
      .then((r) => setEvent(r.data))
      .catch(() => {
        setFetchError("Impossible de charger l'événement depuis le serveur. Les informations affichées peuvent ne pas être à jour.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  function setQty(ticketId: number, delta: number, max: number) {
    setQuantities((q) => {
      const cur = q[ticketId] ?? 0;
      const next = Math.min(max, Math.max(0, cur + delta));
      return { ...q, [ticketId]: next };
    });
  }

  const totalAmount = event.ticket_types.reduce((acc, t) => acc + (quantities[t.id] ?? 0) * safeNum(t.price), 0);
  const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0);

  async function handleBuy() {
    if (totalTickets === 0) return;
    setBuying(true);
    setPayError(null);

    const items = event.ticket_types
      .filter((t) => (quantities[t.id] ?? 0) > 0)
      .map((t) => ({ ticket_type_id: t.id, quantity: quantities[t.id] ?? 0 }));

    try {
      const res = await initiatePayment({
        event_id: event.id,
        items,
        payment_method: paymentMethod,
        amount: totalAmount,
      });

      if (res.data?.payment_url) {
        window.location.href = res.data.payment_url;
      } else {
        setBought(true);
      }
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        ?? "Une erreur est survenue. Veuillez réessayer.";
      setPayError(msg);
    } finally {
      setBuying(false);
    }
  }

  const catColor = catColors[event.category] ?? "#C8922A";

  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <Navbar />

      {/* ── Banner ──────────────────────────────────────────────────────────── */}
      {loading ? (
        <BannerSkeleton />
      ) : (
        <div className="relative h-52 flex items-end overflow-hidden bg-[#1A1A2E]">
          {event.image ? (
            <Image
              src={event.image}
              alt={event.title}
              fill
              unoptimized
              style={{ objectFit: "cover", opacity: 0.4 }}
              priority
            />
          ) : (
            <>
              <div
                className="absolute inset-0 opacity-10"
                style={{ background: `linear-gradient(135deg, ${catColor} 0%, #1A1A2E 100%)` }}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-20 text-[120px] select-none">
                {catEmoji[event.category] ?? "🎟️"}
              </div>
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/50 to-transparent" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="gold" className="capitalize">{event.category}</Badge>
              {event.is_featured && <Badge variant="gold">★ Vedette</Badge>}
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-white leading-tight max-w-2xl">
              {event.title}
            </h1>
          </div>
        </div>
      )}

      {/* ── Error banner ─────────────────────────────────────────────────────── */}
      {fetchError && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="flex items-start gap-3 bg-[#FFF8E7] border border-[#C8922A]/35 rounded-xl px-4 py-3 text-sm text-[#8A6118]">
            <AlertCircle className="w-4 h-4 text-[#C8922A] shrink-0 mt-0.5" />
            <span className="flex-1">{fetchError}</span>
            <button onClick={() => setFetchError(null)} className="text-[#C8922A] hover:opacity-70 transition-opacity shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <ContentSkeleton />
      ) : (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#C8922A]"><Home className="w-4 h-4" /></Link>
            <span>/</span>
            <Link href="/billetterie" className="hover:text-[#C8922A]">Billetterie</Link>
            <span>/</span>
            <span className="text-[#1A1A2E] font-medium truncate">{event.title}</span>
          </div>

          {/* Infos rapides */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${catColor}15` }}>
                <Calendar className="w-5 h-5" style={{ color: catColor }} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Date</p>
                <p className="text-sm font-semibold text-[#1A1A2E] capitalize leading-tight">{fmtDate(event.start_date)}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${catColor}15` }}>
                <Clock className="w-5 h-5" style={{ color: catColor }} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Heure</p>
                <p className="text-sm font-semibold text-[#1A1A2E]">{fmtTime(event.start_date)} — {fmtTime(event.end_date)}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${catColor}15` }}>
                <MapPin className="w-5 h-5" style={{ color: catColor }} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Lieu</p>
                <p className="text-sm font-semibold text-[#1A1A2E] leading-tight">{event.venue}</p>
                <p className="text-xs text-gray-400">{event.city}</p>
              </div>
            </div>
          </div>

          {/* ── Checkout card ─────────────────────────────────────────────────── */}
          {bought ? (
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-10 text-center">
              <div className="w-20 h-20 rounded-full bg-[#D6EDE0] flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-10 h-10 text-[#4A7C59]" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#1A1A2E] mb-2">Commande confirmée !</h2>
              <p className="text-gray-500 mb-1">
                {totalTickets} billet{totalTickets > 1 ? "s" : ""} · <span className="font-bold text-[#C8922A]">{fmt(totalAmount)} XOF</span>
              </p>
              <p className="text-sm text-gray-400 mb-6">{event.title}</p>

              <div className="flex items-center justify-center gap-3 bg-[#F5E6C8] rounded-2xl px-5 py-4 mb-6 max-w-sm mx-auto">
                <QrCode className="w-8 h-8 text-[#C8922A] shrink-0" />
                <p className="text-sm text-[#8A6118] text-left">
                  Vos billets QR ont été envoyés par email. Présentez-les à l&apos;entrée.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/billetterie">
                  <Button variant="outline" size="md" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Retour à la billetterie
                  </Button>
                </Link>
                <Link href="/billetterie">
                  <Button variant="primary" size="md" className="gap-2">
                    <Ticket className="w-4 h-4" />
                    Mes billets
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Sélection billets */}
              <div className="lg:col-span-3 space-y-4">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-base font-bold text-[#1A1A2E] mb-5 flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-[#C8922A]" />
                    Choisir vos billets
                  </h2>

                  <div className="space-y-3">
                    {event.ticket_types.map((t) => {
                      const remaining = Math.max(0, safeNum(t.quantity) - safeNum(t.sold));
                      const qty = quantities[t.id] ?? 0;
                      const pct = safeNum(t.quantity) > 0 ? Math.round((safeNum(t.sold) / safeNum(t.quantity)) * 100) : 0;
                      const isSoldOut = remaining === 0;

                      return (
                        <div
                          key={t.id}
                          className={`border rounded-2xl p-4 transition-all ${
                            isSoldOut
                              ? "border-gray-100 bg-gray-50 opacity-60"
                              : qty > 0
                              ? "border-[#C8922A] bg-[#FFF8EC]"
                              : "border-gray-100 hover:border-[#C8922A]/40"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-bold text-[#1A1A2E]">{t.name}</p>
                                {t.description && (
                                  <span className="text-xs text-gray-400">— {t.description}</span>
                                )}
                              </div>
                              <p className="text-xl font-extrabold text-[#C8922A]">{fmt(t.price)} XOF</p>
                            </div>

                            {isSoldOut ? (
                              <Badge variant="red">Complet</Badge>
                            ) : (
                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  onClick={() => setQty(t.id, -1, remaining)}
                                  disabled={qty === 0}
                                  className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-8 text-center text-sm font-bold text-[#1A1A2E]">{qty}</span>
                                <button
                                  onClick={() => setQty(t.id, 1, remaining)}
                                  disabled={qty >= Math.min(remaining, 10)}
                                  className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Progress bar */}
                          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mb-1">
                            <div className="h-full bg-[#C8922A]/60 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-400 flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {remaining} place{remaining > 1 ? "s" : ""} restante{remaining > 1 ? "s" : ""}
                            </p>
                            {qty > 0 && (
                              <p className="text-xs font-bold text-[#C8922A]">
                                {qty} × {fmt(t.price)} = {fmt(qty * t.price)} XOF
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mode de paiement */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-base font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#C8922A]" />
                    Mode de paiement
                  </h2>

                  <div className="space-y-2">
                    {PAYMENT_METHODS.map((pm) => (
                      <label
                        key={pm.id}
                        className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all ${
                          paymentMethod === pm.id
                            ? "border-[#C8922A] bg-[#FFF8EC]"
                            : "border-gray-100 hover:border-[#C8922A]/40 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={pm.id}
                          checked={paymentMethod === pm.id}
                          onChange={() => setPaymentMethod(pm.id)}
                          className="accent-[#C8922A] w-4 h-4 shrink-0"
                        />
                        <span className="text-xl">{pm.emoji}</span>
                        <div className="flex-1">
                          <p className="text-sm font-bold" style={{ color: pm.color }}>{pm.label}</p>
                          <p className="text-xs text-gray-400">{pm.desc}</p>
                        </div>
                        {paymentMethod === pm.id && (
                          <CheckCircle className="w-4 h-4 text-[#C8922A] shrink-0" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Récapitulatif */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sticky top-4">
                  <h2 className="text-base font-bold text-[#1A1A2E] mb-4">Récapitulatif</h2>

                  {totalTickets === 0 ? (
                    <div className="text-center py-6 text-gray-400">
                      <Ticket className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">Sélectionnez au moins un billet</p>
                    </div>
                  ) : (
                    <div className="space-y-3 mb-5">
                      {event.ticket_types
                        .filter((t) => (quantities[t.id] ?? 0) > 0)
                        .map((t) => (
                          <div key={t.id} className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {t.name} × {quantities[t.id]}
                            </span>
                            <span className="font-medium text-[#1A1A2E]">
                              {fmt((quantities[t.id] ?? 0) * t.price)} XOF
                            </span>
                          </div>
                        ))}

                      <div className="border-t border-gray-100 pt-3">
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                          <span>Frais de service</span>
                          <span>Inclus</span>
                        </div>
                        <div className="flex justify-between font-bold text-[#1A1A2E]">
                          <span>Total</span>
                          <span className="text-xl text-[#C8922A]">{fmt(totalAmount)} XOF</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {payError && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 text-xs text-red-700 mb-4">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span className="flex-1">{payError}</span>
                      <button onClick={() => setPayError(null)} className="text-red-400 hover:opacity-70">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <Button
                    variant="primary"
                    size="md"
                    className="w-full gap-2"
                    disabled={totalTickets === 0 || buying}
                    onClick={handleBuy}
                  >
                    {buying ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Traitement en cours…</>
                    ) : totalTickets === 0 ? (
                      <><Ticket className="w-4 h-4" /> Choisir des billets</>
                    ) : (
                      <><Ticket className="w-4 h-4" /> Payer {fmt(totalAmount)} XOF</>
                    )}
                  </Button>

                  <p className="text-xs text-gray-400 text-center mt-3">
                    Billets QR envoyés par email instantanément
                  </p>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link href="/billetterie">
                      <Button variant="ghost" size="sm" className="w-full gap-2 text-gray-400">
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Retour à la billetterie
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}
