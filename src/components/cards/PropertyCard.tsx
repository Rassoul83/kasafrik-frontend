"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Bed, Bath, Maximize, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { useCurrency } from "@/hooks/useCurrency";
import type { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
}

const typeLabels: Record<string, { label: string; variant: "gold" | "green" | "red" }> = {
  sale:  { label: "Vente",    variant: "gold"  },
  rent:  { label: "Location", variant: "green" },
  hotel: { label: "Hôtel",    variant: "red"   },
};

const typeBorder: Record<string, string> = {
  sale:  "#C8922A",
  rent:  "#4A7C59",
  hotel: "#C84B2F",
};

function isRecentlyAdded(dateStr: string): boolean {
  const created = new Date(dateStr);
  const diffDays = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays < 14;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { convert }  = useCurrency();
  const typeInfo    = typeLabels[property.type] ?? { label: property.type, variant: "gold" as const };
  const isNew       = isRecentlyAdded(property.created_at);
  const borderColor = typeBorder[property.type] ?? "#C8922A";
  // Cherche d'abord l'image marquée primaire, sinon la première du tableau
  const imageUrl    = property.images?.find((img) => img.is_primary)?.url
    || property.images?.[0]?.url
    || null;

  return (
    <div className="card-premium group">
      {/* ── Bordure top 4px colorée ───────────────────────────────── */}
      <div
        style={{
          height: "4px",
          background: `linear-gradient(90deg, ${borderColor}BB, ${borderColor}, ${borderColor}BB)`,
        }}
      />

      {/* ── Image ──────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden h-52" style={{ background: "#1A1200" }}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            unoptimized
            style={{ objectFit: "cover" }}
            className="transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-12 h-12"
                  fill="none"
                  stroke="#C8922A"
                  strokeWidth={1.25}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: 0.40 }}
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <p className="text-xs font-medium" style={{ color: "rgba(200,146,42,0.45)" }}>Aucune photo</p>
            </div>
          </div>
        )}

        {/* Overlay hover bas */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge type */}
        <div className="absolute top-3 left-3">
          <Badge variant={typeInfo.variant as "gold" | "green" | "red" | "blue" | "gray" | "purple"}>
            {typeInfo.label}
          </Badge>
        </div>

        {/* Featured / Nouveau */}
        {property.is_featured ? (
          <div className="absolute top-3 right-3">
            <span className="badge-popular">🔥 Populaire</span>
          </div>
        ) : isNew ? (
          <div className="absolute top-3 right-3">
            <span className="badge-new"><span className="dot" />Nouveau</span>
          </div>
        ) : null}

        {/* Badge vérifié */}
        {property.is_verified && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/92 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
            <svg className="w-3 h-3 text-[#4A7C59]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-[10px] font-bold text-[#4A7C59] uppercase tracking-wide">Vérifié</span>
          </div>
        )}
      </div>

      {/* ── Contenu ────────────────────────────────────────────────── */}
      <div className="p-4">
        <h3 className="font-semibold text-[#1A1A2E] text-sm leading-snug mb-1.5 line-clamp-2 group-hover:text-[#C8922A] transition-colors duration-200">
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-[#7A7265] text-xs mb-3">
          <MapPin className="w-3.5 h-3.5 shrink-0 text-[#C8922A]" />
          <span className="truncate font-medium">
            {property.city}{property.address ? `, ${property.address}` : ""}
          </span>
        </div>

        {/* Prix */}
        <div className="flex items-baseline gap-1 mb-3">
          <p className="text-xl font-extrabold text-[#C8922A] leading-none">
            {property.price && !isNaN(property.price) && property.price > 0
              ? convert(property.price)
              : "Prix sur demande"}
          </p>
          {property.type === "rent" && (
            <span className="text-xs font-medium text-[#7A7265]">/mois</span>
          )}
        </div>

        {/* Caractéristiques */}
        {(property.bedrooms || property.bathrooms || property.surface) ? (
          <div className="flex items-center gap-4 text-xs text-[#7A7265] mb-4 pb-3 border-b border-[#C8922A]/8">
            {property.bedrooms !== undefined && property.bedrooms > 0 && (
              <span className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-[#C8922A]/60" />
                <span className="font-semibold text-[#1A1A2E]">{property.bedrooms}</span> ch.
              </span>
            )}
            {property.bathrooms !== undefined && property.bathrooms > 0 && (
              <span className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-[#C8922A]/60" />
                <span className="font-semibold text-[#1A1A2E]">{property.bathrooms}</span> sdb.
              </span>
            )}
            {property.surface && (
              <span className="flex items-center gap-1">
                <Maximize className="w-3.5 h-3.5 text-[#C8922A]/60" />
                <span className="font-semibold text-[#1A1A2E]">{property.surface}</span> m²
              </span>
            )}
          </div>
        ) : <div className="mb-4" />}

        {/* CTA */}
        <Link href={`/immobilier/${property.id}`}>
          <button className={`w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-[8px] group/btn btn-property-${property.type}`}>
            Voir l&apos;annonce
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </button>
        </Link>
      </div>
    </div>
  );
}
