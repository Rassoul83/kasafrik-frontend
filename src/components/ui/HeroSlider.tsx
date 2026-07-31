"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const slides = [
  {
    badge: "IMMOBILIER",
    badgeTextColor: "#E0A535",
    badgeBgColor: "rgba(200,146,42,0.22)",
    badgeBorderColor: "rgba(200,146,42,0.45)",
    accentColor: "#C8922A",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    alt: "Villa moderne en Afrique",
    subtitle:
      "Achetez ou louez parmi 1 200+ annonces vérifiées partout en Afrique.",
    href: "/immobilier",
    cta: "Explorer les annonces",
  },
  {
    badge: "HÔTELS",
    badgeTextColor: "#7DE8A0",
    badgeBgColor: "rgba(74,124,89,0.25)",
    badgeBorderColor: "rgba(74,124,89,0.50)",
    accentColor: "#4A7C59",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80",
    alt: "Hôtel de luxe en Afrique",
    subtitle:
      "Réservez votre hébergement dans les meilleurs hôtels et guesthouses.",
    href: "/hotels",
    cta: "Voir les hôtels",
  },
  {
    badge: "ÉVÉNEMENTS",
    badgeTextColor: "#FF8A6E",
    badgeBgColor: "rgba(200,75,47,0.25)",
    badgeBorderColor: "rgba(200,75,47,0.50)",
    accentColor: "#C84B2F",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80",
    alt: "Festival et concert en Afrique",
    subtitle:
      "Concerts, festivals, forums — découvrez les meilleurs événements d'Afrique.",
    href: "/evenements",
    cta: "Voir les événements",
  },
  {
    badge: "BILLETTERIE",
    badgeTextColor: "#D4A84B",
    badgeBgColor: "rgba(138,97,24,0.28)",
    badgeBorderColor: "rgba(138,97,24,0.55)",
    accentColor: "#8A6118",
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1920&q=80",
    alt: "Billetterie événements en ligne",
    subtitle:
      "Achetez vos billets QR Code en ligne en quelques secondes, payez avec Wave ou Orange Money.",
    href: "/billetterie",
    cta: "Acheter des billets",
  },
];

function SearchBar() {
  return (
    <div className="searchbar-premium p-5 md:p-7 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-[11px] font-bold text-[#7A7265] mb-2 uppercase tracking-widest">
            Ville
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C8922A]" />
            <input
              type="text"
              placeholder="Dakar, Abidjan..."
              className="input-premium w-full pl-9 pr-3 py-2.5 text-sm placeholder-gray-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#7A7265] mb-2 uppercase tracking-widest">
            Type de bien
          </label>
          <select className="input-premium w-full px-3 py-2.5 text-sm bg-white">
            <option value="">Tous les types</option>
            <option value="sale">Vente</option>
            <option value="rent">Location</option>
            <option value="hotel">Hôtel</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#7A7265] mb-2 uppercase tracking-widest">
            Budget max
          </label>
          <select className="input-premium w-full px-3 py-2.5 text-sm bg-white">
            <option value="">Pas de limite</option>
            <option value="500000">500 000 FCFA</option>
            <option value="1000000">1 000 000 FCFA</option>
            <option value="5000000">5 000 000 FCFA</option>
            <option value="20000000">20 000 000 FCFA</option>
            <option value="50000000">50 000 000 FCFA</option>
          </select>
        </div>

        <div className="flex items-end">
          <button className="btn-gold w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm">
            <Search className="w-4 h-4" />
            Rechercher
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    []
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + slides.length) % slides.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  const slide = slides[current];

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "100vh", background: "#0D0D1A" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Slides (background layers) ────────────────────────────────── */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            transition: "opacity 700ms ease-in-out",
            zIndex: 0,
          }}
          aria-hidden={i !== current}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.image}
            alt={s.alt}
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
          {/* Dark gradient overlay for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.38) 45%, rgba(0,0,0,0.72) 100%)",
            }}
          />
        </div>
      ))}

      {/* ── Decorative ambient blobs ──────────────────────────────────── */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <div
          className="animate-float absolute -top-56 -right-40 w-[650px] h-[650px] rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(200,146,42,0.22), transparent 65%)",
          }}
        />
        <div
          className="animate-float-slow absolute -bottom-56 -left-40 w-[550px] h-[550px] rounded-full blur-3xl opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(200,74,47,0.18), transparent 65%)",
          }}
        />
      </div>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 md:pt-32 md:pb-28"
        style={{ zIndex: 2 }}
      >
        <div className="text-center mb-12">

          {/* Badges row */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-7">
            {/* Category badge — changes with slide */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
              style={{
                background: slide.badgeBgColor,
                border: `1px solid ${slide.badgeBorderColor}`,
                transition: "all 500ms ease",
              }}
            >
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: slide.badgeTextColor }}
              >
                {slide.badge}
              </span>
            </div>

            {/* Static N°1 badge */}
            <div
              className="animate-slide-down inline-flex items-center gap-2 border rounded-full px-4 py-1.5"
              style={{
                background: "rgba(200,146,42,0.12)",
                borderColor: "rgba(200,146,42,0.28)",
              }}
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#E0A535]" />
              <span className="text-xs font-bold text-[#E0A535] uppercase tracking-wider">
                N°1 en Afrique de l&apos;Ouest
              </span>
            </div>
          </div>

          {/* Fixed main title */}
          <h1 className="font-playfair animate-fade-in-up text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.12] mb-6 max-w-4xl mx-auto delay-100">
            <span className="text-white">La référence </span>
            <span className="gold-shimmer-text">immobilière</span>
            <span className="text-white"> &amp; </span>
            <span className="gold-shimmer-text">événementielle</span>
            <span className="text-white"> en Afrique</span>
          </h1>

          {/* Slide subtitle — fades with slide change */}
          <p
            key={current}
            className="animate-fade-in text-[17px] text-gray-300 max-w-2xl mx-auto mb-10 leading-[1.75]"
          >
            {slide.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <Link href={slide.href}>
              <button className="btn-gold inline-flex items-center gap-2 px-8 py-4 text-base tracking-wide">
                {slide.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/publier">
              <button className="btn-outline-gold px-8 py-4 text-base">
                Publier une annonce
              </button>
            </Link>
          </div>
        </div>

        {/* Search bar */}
        <SearchBar />
      </div>

      {/* ── Prev button ───────────────────────────────────────────────── */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          zIndex: 3,
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.22)",
        }}
        aria-label="Slide précédent"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>

      {/* ── Next button ───────────────────────────────────────────────── */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          zIndex: 3,
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.22)",
        }}
        aria-label="Slide suivant"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      {/* ── Dots navigation ───────────────────────────────────────────── */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2"
        style={{ zIndex: 3 }}
      >
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1} — ${s.badge}`}
            style={{
              width: i === current ? 28 : 8,
              height: 8,
              borderRadius: 4,
              background:
                i === current
                  ? slide.accentColor
                  : "rgba(255,255,255,0.35)",
              transition: "width 300ms ease, background 300ms ease",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      {/* ── Slide counter ─────────────────────────────────────────────── */}
      <div
        className="absolute bottom-6 right-6 text-xs font-bold text-white/50 tabular-nums"
        style={{ zIndex: 3 }}
      >
        {current + 1} / {slides.length}
      </div>
    </section>
  );
}
