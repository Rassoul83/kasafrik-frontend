"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Ticket, Users } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/i18n";
import type { Event } from "@/types";

interface EventCardProps {
  event: Event;
}

const localeMap: Record<string, string> = { fr: "fr-FR", en: "en-US", ar: "ar-SA" };

function formatDate(dateStr: string, lang: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString(localeMap[lang] ?? "fr-FR", { day: "numeric", month: "short" });
}

function formatTime(dateStr: string, lang: string): string {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleTimeString(localeMap[lang] ?? "fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function hasTranslation(key: string): key is keyof typeof translations.fr {
  return key in translations.fr;
}

function isRecentlyAdded(dateStr: string): boolean {
  const created = new Date(dateStr);
  const diffDays = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays < 14;
}

const categoryColors: Record<string, string> = {
  musique:    "#C8922A",
  concert:    "#C8922A",
  business:   "#4A7C59",
  sport:      "#8A6118",
  football:   "#8A6118",
  festival:   "#C84B2F",
  culture:    "#C84B2F",
  kermesse:   "#E0A535",
  conference: "#4A7C59",
  tech:       "#7A7265",
  match:      "#8A6118",
};

export default function EventCard({ event }: EventCardProps) {
  const { convert } = useCurrency();
  const { t, lang } = useLanguage();
  const dateLabel = formatDate(event.start_date, lang);
  const timeLabel = formatTime(event.start_date, lang);
  const isNew     = isRecentlyAdded(event.created_at);
  const catKey    = event.category?.toLowerCase() ?? "";
  const catColor  = categoryColors[catKey] ?? "#C8922A";
  const catLabel  = hasTranslation(catKey) ? t(catKey) : (event.category ?? "");

  const standardTicket = event.ticket_types?.find(
    (t) => t.name.toLowerCase().includes("standard") || t.name.toLowerCase().includes("normal") || t.name.toLowerCase().includes("populaire") || t.name.toLowerCase().includes("journée")
  );
  const vipTicket = event.ticket_types?.find((t) => t.name.toLowerCase().includes("vip") || t.name.toLowerCase().includes("loge") || t.name.toLowerCase().includes("or"));
  const cheapestTicket = event.ticket_types?.reduce(
    (min, t) => (!min || t.price < min.price ? t : min),
    null as typeof event.ticket_types[0] | null
  );

  const totalQuantity = event.ticket_types?.reduce((s, t) => s + t.quantity, 0) ?? 0;
  const totalSold     = event.ticket_types?.reduce((s, t) => s + t.sold,     0) ?? 0;
  const soldPct       = totalQuantity > 0 ? Math.round((totalSold / totalQuantity) * 100) : 0;
  const remaining     = totalQuantity - totalSold;

  const progressColor =
    soldPct >= 85 ? "#C84B2F" :
    soldPct >= 60 ? "#C8922A" :
    "#4A7C59";

  return (
    <div className="card-premium group">
      {/* ── Header avec cover image ou dégradé catégorie ────────────── */}
      <div
        className="relative h-48 overflow-hidden"
        style={{
          background: event.image
            ? undefined
            : `linear-gradient(150deg, ${catColor} 0%, ${catColor}CC 45%, ${catColor}88 100%)`,
        }}
      >
        {/* Cover image réelle */}
        {event.image && (
          <Image
            src={event.image}
            alt={event.title}
            fill
            unoptimized
            style={{ objectFit: "cover" }}
          />
        )}

        {/* Overlay bas pour lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Texture tissus africain */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "18px 18px",
          }}
        />

        {/* Reflet lumière solaire */}
        <div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(circle, #FFC947, transparent)" }}
        />

        {/* Badge date */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 text-center shadow-xl border border-white/20">
          <p className="text-sm font-black leading-none whitespace-nowrap" style={{ color: catColor }}>
            {dateLabel}
          </p>
        </div>

        {/* Catégorie + badges */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
            style={{
              background: "rgba(0,0,0,0.40)",
              backdropFilter: "blur(8px)",
              border: `1px solid rgba(255,255,255,0.15)`,
            }}
          >
            {catLabel}
          </span>
          {event.is_featured ? (
            <span className="badge-popular">🔥 {t('vedette')}</span>
          ) : isNew ? (
            <span className="badge-new"><span className="dot" />{t('nouveau')}</span>
          ) : null}
        </div>

        {/* Titre sur l'image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-bold text-white text-sm leading-tight line-clamp-2 group-hover:text-[#F5E6C8] transition-colors duration-200">
            {event.title}
          </h3>
        </div>
      </div>

      {/* ── Contenu ───────────────────────────────────────────────── */}
      <div className="p-4">
        {/* Lieu + heure */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-1.5 text-[#7A7265] text-xs">
            <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: catColor }} />
            <span className="truncate font-medium text-[#1A1A2E]">{event.venue}, {event.city}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#7A7265] text-xs">
            <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: catColor }} />
            <span>{timeLabel}</span>
          </div>
        </div>

        {/* Prix billets */}
        {event.ticket_types && event.ticket_types.length > 0 && (
          <div className="flex gap-2 mb-3">
            {standardTicket && (
              <div
                className="flex-1 rounded-xl p-2.5 text-center border transition-colors"
                style={{
                  background: `${catColor}0A`,
                  borderColor: `${catColor}20`,
                }}
              >
                <p className="text-[9px] font-bold mb-0.5 uppercase tracking-wider" style={{ color: catColor }}>Standard</p>
                <p className="text-xs font-bold text-[#1A1A2E]">{convert(standardTicket.price)}</p>
              </div>
            )}
            {vipTicket && (
              <div
                className="flex-1 rounded-xl p-2.5 text-center relative overflow-hidden"
                style={{ background: "#1A1A2E" }}
              >
                <div
                  className="absolute inset-0 opacity-15"
                  style={{ background: `linear-gradient(135deg, ${catColor}, transparent)` }}
                />
                <p className="relative text-[9px] font-bold mb-0.5 uppercase tracking-wider" style={{ color: catColor }}>VIP</p>
                <p className="relative text-xs font-bold text-white">{convert(vipTicket.price)}</p>
              </div>
            )}
            {!standardTicket && !vipTicket && cheapestTicket && (
              <div className="flex-1 bg-[#F5E6C8] rounded-xl p-2.5 text-center">
                <p className="text-[9px] text-[#8A6118] uppercase font-bold mb-0.5 tracking-wider">{t('a_partir_de')}</p>
                <p className="text-xs font-bold text-[#C8922A]">{convert(cheapestTicket.price)}</p>
              </div>
            )}
          </div>
        )}

        {/* Barre disponibilité */}
        {totalQuantity > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-[#7A7265] flex items-center gap-1">
                <Users className="w-3 h-3" />
                {remaining > 0 ? (
                  <span>
                    <span className="font-semibold text-[#1A1A2E]">{remaining.toLocaleString("fr-FR")}</span> {t('places')}
                  </span>
                ) : (
                  <span className="font-semibold text-[#C84B2F]">Complet</span>
                )}
              </span>
              <span className="text-[10px] font-bold" style={{ color: progressColor }}>{soldPct}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${soldPct}%`, backgroundColor: progressColor }} />
            </div>
          </div>
        )}

        {/* CTA coloré par catégorie */}
        <Link href={`/evenements/${event.id}`}>
          <button
            className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-250 hover:-translate-y-0.5 hover:opacity-90"
            style={{
              background: `linear-gradient(135deg, ${catColor} 0%, ${catColor}CC 100%)`,
              boxShadow: `0 4px 16px ${catColor}45`,
            }}
          >
            <Ticket className="w-3.5 h-3.5" />
            {t('acheter_billets')}
          </button>
        </Link>
      </div>
    </div>
  );
}
