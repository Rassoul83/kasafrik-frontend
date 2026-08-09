import { Suspense } from "react";
import Link from "next/link";
import {
  Home,
  Building2,
  Calendar,
  Ticket,
  Shield,
  CheckCircle,
  Globe,
  HeadphonesIcon,
  QrCode,
  ChevronRight,
  Star,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyCard from "@/components/cards/PropertyCard";
import EventCard from "@/components/cards/EventCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import HeroSlider from "@/components/ui/HeroSlider";
import Translate from "@/components/ui/Translate";
import type { Property, Event } from "@/types";

// ── API types (raw backend shape) ───────────────────────────────────────────

type RawImage = { id?: number; image_url: string; is_cover: boolean; sort_order: number };

type RawProperty = {
  id: number;
  user_id?: number;
  title: string;
  description: string;
  type: string;
  category: string;
  price_raw: number;
  currency?: string;
  city: string;
  district?: string;
  bedrooms?: number;
  bathrooms?: number;
  surface_m2?: number;
  is_featured: boolean;
  is_verified?: boolean;
  images?: RawImage[];
  created_at: string;
};

type RawTicketType = {
  id: number;
  name: string;
  price_raw: number;
  total_seats: number;
  seats_sold: number;
  available_seats: number;
};

type RawEvent = {
  id: number;
  user_id?: number;
  title: string;
  description: string;
  category: string;
  city: string;
  venue: string;
  event_date?: string;
  start_time?: string;
  cover_image?: string;
  is_published: boolean;
  is_featured?: boolean;
  ticket_types?: RawTicketType[];
  created_at: string;
};

// ── Mappers ─────────────────────────────────────────────────────────────────

const TYPE_MAP: Record<string, Property["type"]> = {
  vente: "sale", location: "rent", court_sejour: "hotel",
  sale: "sale",  rent: "rent",    hotel: "hotel",
};

function mapProperty(p: RawProperty): Property {
  return {
    id: p.id,
    user_id: p.user_id ?? 0,
    title: p.title,
    description: p.description,
    type: TYPE_MAP[p.type] ?? "sale",
    category: p.category as Property["category"],
    price: p.price_raw,
    currency: (p.currency as Property["currency"]) ?? "XOF",
    city: p.city,
    address: p.district ?? "",
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    surface: p.surface_m2,
    is_featured: p.is_featured,
    is_verified: p.is_verified ?? false,
    status: "active",
    images: (p.images ?? []).map((img, i) => ({
      id: img.id ?? i,
      property_id: p.id,
      url: img.image_url,
      is_primary: img.is_cover,
      order: img.sort_order,
    })),
    created_at: p.created_at,
    updated_at: p.created_at,
  };
}

function mapEvent(e: RawEvent): Event {
  const startDate = e.event_date
    ? `${e.event_date}T${e.start_time ?? "00:00:00"}`
    : new Date().toISOString();
  return {
    id: e.id,
    user_id: e.user_id ?? 0,
    title: e.title,
    description: e.description,
    category: e.category,
    city: e.city,
    venue: e.venue,
    address: "",
    start_date: startDate,
    end_date: startDate,
    image: e.cover_image ?? undefined,
    is_published: e.is_published,
    is_featured: e.is_featured ?? false,
    ticket_types: (e.ticket_types ?? []).map((t) => ({
      id: t.id,
      event_id: e.id,
      name: t.name,
      price: t.price_raw,
      quantity: t.total_seats,
      sold: t.seats_sold,
      is_available: t.available_seats > 0,
    })),
    created_at: e.created_at,
    updated_at: e.created_at,
  };
}

// ── Data fetching ────────────────────────────────────────────────────────────

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

async function fetchProperties(): Promise<Property[]> {
  const url = `${API}/properties?per_page=4&is_featured=true`;
  try {
    console.log("[fetchProperties] GET", url);
    const res = await fetch(url, { next: { revalidate: 60 } });
    console.log("[fetchProperties] status:", res.status, res.statusText);
    if (!res.ok) {
      console.error("[fetchProperties] erreur HTTP — fallback []");
      return [];
    }
    const json = await res.json();
    console.log("[fetchProperties] total reçu:", json.data?.length ?? 0, "items");
    return (json.data as RawProperty[]).map(mapProperty);
  } catch (err) {
    console.error("[fetchProperties] exception:", err);
    return [];
  }
}

async function fetchEvents(): Promise<Event[]> {
  const url = `${API}/events?per_page=4`;
  try {
    console.log("[fetchEvents] GET", url);
    const res = await fetch(url, { next: { revalidate: 60 } });
    console.log("[fetchEvents] status:", res.status, res.statusText);
    if (!res.ok) {
      console.error("[fetchEvents] erreur HTTP — fallback []");
      return [];
    }
    const json = await res.json();
    console.log("[fetchEvents] total reçu:", json.data?.length ?? 0, "items");
    return (json.data as RawEvent[]).map(mapEvent);
  } catch (err) {
    console.error("[fetchEvents] exception:", err);
    return [];
  }
}

// ── Skeleton — chargement annonces ──────────────────────────────────────────

function PropertyCardSkeleton() {
  return (
    <div className="card-premium overflow-hidden">
      <div className="skeleton" style={{ height: 4, borderRadius: 0 }} />
      <div className="skeleton" style={{ height: 208, borderRadius: 0 }} />
      <div className="p-4">
        <div className="skeleton rounded-lg mb-2" style={{ height: 14, width: "75%" }} />
        <div className="skeleton rounded-lg mb-3" style={{ height: 12, width: "50%" }} />
        <div className="skeleton rounded-lg mb-3" style={{ height: 20, width: "65%" }} />
        <div className="flex gap-3 mb-4 pb-3" style={{ borderBottom: "1px solid rgba(200,146,42,0.08)" }}>
          <div className="skeleton rounded" style={{ height: 12, width: 36 }} />
          <div className="skeleton rounded" style={{ height: 12, width: 36 }} />
          <div className="skeleton rounded" style={{ height: 12, width: 36 }} />
        </div>
        <div className="skeleton rounded-lg" style={{ height: 38, width: "100%" }} />
      </div>
    </div>
  );
}

function PropertyGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[0, 1, 2, 3].map((i) => <PropertyCardSkeleton key={i} />)}
    </div>
  );
}

// ── Skeleton — chargement événements ────────────────────────────────────────

function EventCardSkeleton() {
  return (
    <div className="card-premium overflow-hidden">
      {/* Image sombre */}
      <div className="relative overflow-hidden" style={{ height: 192, background: "#1A1A2E" }}>
        <div className="absolute inset-0 skeleton-dark" />
      </div>
      <div className="p-4">
        <div className="skeleton rounded-lg mb-1.5" style={{ height: 12, width: "70%" }} />
        <div className="skeleton rounded-lg mb-4" style={{ height: 12, width: "45%" }} />
        <div className="flex gap-2 mb-3">
          <div className="skeleton rounded-xl flex-1" style={{ height: 44 }} />
          <div className="skeleton rounded-xl flex-1" style={{ height: 44 }} />
        </div>
        <div className="skeleton rounded-full mb-4" style={{ height: 4, width: "100%" }} />
        <div className="skeleton rounded-xl" style={{ height: 38, width: "100%" }} />
      </div>
    </div>
  );
}

function EventGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[0, 1, 2, 3].map((i) => <EventCardSkeleton key={i} />)}
    </div>
  );
}

// ── État vide ────────────────────────────────────────────────────────────────

function EmptyState({
  message,
  icon: Icon,
  dark = false,
}: {
  message: string;
  icon: React.ElementType;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 col-span-4">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ background: dark ? "rgba(200,146,42,0.10)" : "rgba(200,146,42,0.08)" }}
      >
        <Icon
          className="w-8 h-8"
          style={{ color: "#C8922A", opacity: 0.45 }}
          strokeWidth={1.5}
        />
      </div>
      <p
        className="text-sm font-medium"
        style={{ color: dark ? "rgba(255,255,255,0.40)" : "#7A7265" }}
      >
        {message}
      </p>
    </div>
  );
}

// ── Sections async (streaming SSR) ──────────────────────────────────────────

async function PropertiesSection() {
  const properties = await fetchProperties();

  if (properties.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <EmptyState message="Aucune annonce disponible" icon={Home} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {properties.map((property, i) => (
        <div key={property.id} className={`fade-in-up delay-${(i + 1) * 100}`}>
          <PropertyCard property={property} />
        </div>
      ))}
    </div>
  );
}

async function EventsSection() {
  const events = await fetchEvents();

  if (events.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <EmptyState message="Aucun événement disponible" icon={Calendar} dark />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {events.map((event, i) => (
        <div key={event.id} className={`fade-in-up delay-${(i + 1) * 100}`}>
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
}

/* Stats — palette africaine chaude */
const stats = [
  { value: "1 200+",  label: "Annonces actives",     icon: Home,     iconColor: "#C8922A", shadowColor: "rgba(200,146,42,0.35)"  },
  { value: "85+",     label: "Hôtels & Guesthouses",  icon: Building2, iconColor: "#4A7C59", shadowColor: "rgba(74,124,89,0.35)"  },
  { value: "500+",    label: "Événements publiés",    icon: Calendar, iconColor: "#C84B2F", shadowColor: "rgba(200,75,47,0.35)"  },
  { value: "15 000+", label: "Utilisateurs inscrits", icon: Star,     iconColor: "#E0A535", shadowColor: "rgba(224,165,53,0.35)"  },
];

/* Modules — palette chaude uniquement */
const modules = [
  {
    title: "Immobilier",
    desc:  "Achetez ou louez appartements, villas, studios dans toute l'Afrique.",
    icon:  Home,
    href:  "/immobilier",
    color: "#C8922A",
    bg:    "#F5E6C8",
  },
  {
    title: "Hôtels & Guesthouses",
    desc:  "Réservez votre hébergement idéal partout en Afrique de l'Ouest.",
    icon:  Building2,
    href:  "/hotels",
    color: "#4A7C59",
    bg:    "#D6EDE0",
  },
  {
    title: "Billetterie",
    desc:  "Achetez vos billets QR pour concerts, festivals et événements.",
    icon:  Ticket,
    href:  "/billetterie",
    color: "#C84B2F",
    bg:    "#FAE8E3",
  },
  {
    title: "Événements",
    desc:  "Découvrez et organisez des événements mémorables en Afrique.",
    icon:  Calendar,
    href:  "/evenements",
    color: "#8A6118",
    bg:    "#F5E0C0",
  },
];

/* Garanties — palette africaine chaude */
const trustItems = [
  { icon: CheckCircle,    title: "Annonces vérifiées",  desc: "Modération manuelle et badge Vérifié pour les propriétaires identifiés.", color: "#4A7C59"  },
  { icon: Shield,         title: "Paiement sécurisé",   desc: "Wave, Orange Money, Stripe, PayPal. Argent conservé jusqu'à confirmation.", color: "#C8922A"  },
  { icon: Globe,          title: "Géolocalisation",     desc: "Trouvez des biens et événements autour de vous via la carte interactive.", color: "#C84B2F"  },
  { icon: HeadphonesIcon, title: "Support 7j/7",        desc: "Notre équipe est disponible 7 jours sur 7 pour vous accompagner.", color: "#8A6118"  },
  { icon: QrCode,         title: "QR Code billets",     desc: "Billets numériques uniques, vérifiables à l'entrée en temps réel.", color: "#E0A535"  },
];

const paymentMethods = [
  { name: "Wave",          color: "#1DAEFF", bg: "#0A1F2E", emoji: "💙" },
  { name: "Orange Money",  color: "#FF6600", bg: "#2A1200", emoji: "🧡" },
  { name: "Stripe",        color: "#7B72FF", bg: "#0D0D28", emoji: "💜" },
  { name: "PayPal",        color: "#4A90D9", bg: "#050F1E", emoji: "💛" },
  { name: "Carte bancaire",color: "#C8922A", bg: "#0D0D1A", emoji: "💳" },
];

// ── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: "#F7F2EA" }}>
      <ScrollReveal />
      <Navbar />

      {/* ═══════════════════════════════════════════ HERO ══════════════════════════════════════ */}
      <HeroSlider />

      {/* ═══════════════════════════════════════════ STATS ═════════════════════════════════════ */}
      <section style={{ background: "#FFFFFF", borderTop: "1px solid rgba(200,146,42,0.10)", borderBottom: "1px solid rgba(200,146,42,0.10)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#C8922A]/10">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`fade-in-up delay-${(i + 1) * 100} flex flex-col items-center text-center py-12 px-6 group`}
                >
                  {/* Icône avec halo coloré */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `${stat.iconColor}14`,
                      boxShadow: `0 0 0 1px ${stat.iconColor}28, 0 6px 20px ${stat.shadowColor}`,
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: stat.iconColor }} strokeWidth={1.75} />
                  </div>

                  {/* Chiffre gold */}
                  <p className="font-playfair text-[56px] font-bold text-[#C8922A] leading-none mb-2">
                    {stat.value}
                  </p>

                  {/* Label terre */}
                  <p className="text-[13px] text-[#6B5B3E] leading-relaxed">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ ANNONCES RÉCENTES ════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-in-up flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] font-bold text-[#C8922A] uppercase tracking-widest mb-2">
                Immobilier
              </p>
              <h2 className="section-title"><Translate k="annonces_recentes" /></h2>
              <p className="section-subtitle mt-1.5">
                Villas, appartements, studios — trouvez votre logement idéal
              </p>
            </div>
            <Link href="/immobilier" className="voir-tout-link hidden md:inline-flex">
              <Translate k="voir_tout" /> <span>→</span>
            </Link>
          </div>

          {/* Suspense : skeleton pendant le fetch, état vide si tableau vide */}
          <Suspense fallback={<PropertyGridSkeleton />}>
            <PropertiesSection />
          </Suspense>

          <div className="mt-8 text-center md:hidden">
            <Link href="/immobilier" className="voir-tout-link">
              Voir toutes les annonces <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ ÉVÉNEMENTS ════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ background: "#1A1A2E" }}>

        {/* Décors chaleur nocturne */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="animate-glow-gold absolute -top-32 -right-32 w-[380px] h-[380px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(200,146,42,0.10), transparent)" }}
          />
          <div
            className="absolute -bottom-32 -left-32 w-[320px] h-[320px] rounded-full blur-3xl opacity-60"
            style={{ background: "radial-gradient(circle, rgba(200,74,47,0.08), transparent)" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-in-up flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] font-bold text-[#C8922A] uppercase tracking-widest mb-2">
                Billetterie
              </p>
              <h2 className="section-title-light"><Translate k="evenements_venir" /></h2>
              <p className="text-[15px] text-gray-500 mt-1.5 leading-relaxed">
                Concerts, festivals, forums, soirées — ne ratez rien
              </p>
            </div>
            <Link href="/evenements" className="voir-tout-link-light hidden md:inline-flex">
              <Translate k="voir_tout" /> <span>→</span>
            </Link>
          </div>

          {/* Suspense : skeleton pendant le fetch, état vide si tableau vide */}
          <Suspense fallback={<EventGridSkeleton />}>
            <EventsSection />
          </Suspense>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ MODULES ═══════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-in-up text-center mb-12">
            <p className="text-[11px] font-bold text-[#C8922A] uppercase tracking-widest mb-2">
              Plateforme
            </p>
            <h2 className="section-title">Tout ce dont vous avez besoin</h2>
            <p className="section-subtitle mt-2 max-w-xl mx-auto">
              Une seule plateforme pour l&apos;immobilier, l&apos;hébergement,
              les événements et la billetterie en Afrique.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <Link key={mod.title} href={mod.href}>
                  <div className={`fade-in-up delay-${(i + 1) * 100} card-premium group p-6 h-full cursor-pointer`}>
                    <div
                      className="inline-flex items-center justify-center w-13 h-13 rounded-2xl mb-4 transition-transform group-hover:scale-110 duration-300"
                      style={{ backgroundColor: mod.bg }}
                    >
                      <Icon className="w-7 h-7" style={{ color: mod.color }} />
                    </div>
                    <h3 className="font-bold text-[#1A1A2E] mb-2 group-hover:text-[#C8922A] transition-colors duration-200 text-[15px]">
                      {mod.title}
                    </h3>
                    <p className="text-[13px] text-[#7A7265] leading-relaxed mb-4">{mod.desc}</p>
                    <span
                      className="text-[12px] font-semibold flex items-center gap-1 group-hover:gap-2.5 transition-all duration-200"
                      style={{ color: mod.color }}
                    >
                      Explorer <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ GARANTIES ═════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ background: "#1A1A2E" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="animate-glow-gold absolute top-0    left-1/4  w-96 h-96 rounded-full bg-[#C8922A]/12 blur-3xl" />
          <div className="animate-glow-gold absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#C84B2F]/8  blur-3xl delay-500" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-in-up text-center mb-12">
            <p className="text-[11px] font-bold text-[#C8922A] uppercase tracking-widest mb-2">
              Garanties
            </p>
            <h2 className="section-title-light">Pourquoi choisir Kasafrik ?</h2>
            <p className="text-[15px] text-gray-500 mt-2 max-w-xl mx-auto leading-relaxed">
              Des milliers d&apos;utilisateurs nous font confiance chaque jour.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {trustItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`fade-in-up delay-${(i + 1) * 100} card-trust p-6 text-center group`}
                >
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `${item.color}1E` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <h3 className="font-semibold text-white text-[13px] mb-2 leading-snug">{item.title}</h3>
                  <p className="text-[12px] text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ PAIEMENTS ═════════════════════════════════ */}
      <section className="py-12 relative overflow-hidden" style={{ background: "#0D0D1A", borderTop: "1px solid rgba(200,146,42,0.10)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-in-up text-center mb-8">
            <p className="text-[11px] font-bold text-gray-600 uppercase tracking-widest">
              Modes de paiement acceptés
            </p>
          </div>
          <div className="fade-in-up flex flex-wrap items-center justify-center gap-4">
            {paymentMethods.map((pm) => (
              <div
                key={pm.name}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl transition-all duration-200 cursor-default hover:scale-105"
                style={{
                  backgroundColor: pm.bg,
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span className="text-xl">{pm.emoji}</span>
                <span className="text-[13px] font-bold" style={{ color: pm.color }}>
                  {pm.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ CTA FINAL ═════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        {/* Fond or rayonnant */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #C8922A 0%, #E0A535 35%, #D4AF37 55%, #C8922A 75%, #8A6118 100%)",
          }}
        />
        {/* Texture lumière solaire */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(255,255,255,0.4), transparent)",
          }}
        />
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/8 blur-2xl" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/6 blur-2xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/15 border border-white/20">
            <Star className="w-3.5 h-3.5 text-white" fill="white" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Plateforme N°1 en Afrique de l&apos;Ouest
            </span>
          </div>

          <h2 className="fade-in-up font-playfair text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Prêt à publier votre annonce ?
          </h2>
          <p className="fade-in-up text-white/80 text-[16px] mb-10 max-w-lg mx-auto leading-relaxed delay-100">
            Rejoignez 15 000+ utilisateurs qui font confiance à Kasafrik pour
            leurs projets immobiliers et événementiels.
          </p>
          <div className="fade-in-up flex flex-col sm:flex-row gap-4 justify-center delay-200">
            <Link href="/register">
              <button
                className="px-8 py-4 font-bold rounded-[8px] transition-all duration-200 shadow-2xl hover:-translate-y-0.5 text-[15px]"
                style={{ background: "white", color: "#8A6118" }}
              >
                Créer un compte gratuit
              </button>
            </Link>
            <Link href="/immobilier">
              <button
                className="px-8 py-4 font-bold rounded-[8px] transition-all duration-200 text-[15px]"
                style={{
                  border: "2px solid rgba(255,255,255,0.55)",
                  color: "white",
                  background: "rgba(255,255,255,0.08)",
                }}
              >
                <Translate k="explorer" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
